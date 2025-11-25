<?php
/**
 * Contact Form Handler for pierre-paulg.ca
 * This script processes contact form submissions and sends emails
 * using the Web Host Canada email service
 */

// Security: Start session for rate limiting
session_start();

// Configuration
define('CONTACT_EMAIL', 'contact@pierre-paulg.ca');
define('SITE_NAME', 'Pierre-Paul G. Portfolio');
define('RATE_LIMIT_SECONDS', 60); // Minimum seconds between submissions from same user

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// Check referer to prevent external form submissions
$allowed_domains = ['pierre-paulg.ca', 'www.pierre-paulg.ca', 'localhost'];
$referer = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : '';
$is_valid_referer = in_array($referer, $allowed_domains) ||
                    (strpos($referer, 'localhost') !== false) ||
                    (strpos($referer, '127.0.0.1') !== false);

if (!$is_valid_referer && $referer !== '') {
    http_response_code(403);
    die(json_encode(['success' => false, 'message' => 'Invalid request origin']));
}

// Rate limiting: Check if user submitted recently
if (isset($_SESSION['last_submission_time'])) {
    $time_since_last = time() - $_SESSION['last_submission_time'];
    if ($time_since_last < RATE_LIMIT_SECONDS) {
        http_response_code(429);
        die(json_encode([
            'success' => false,
            'message' => 'Please wait ' . (RATE_LIMIT_SECONDS - $time_since_last) . ' seconds before submitting again.'
        ]));
    }
}

// Get and sanitize form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name is required and must be at least 2 characters.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($subject) || strlen($subject) < 3) {
    $errors[] = 'Subject is required and must be at least 3 characters.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message is required and must be at least 10 characters.';
}

// Check for spam patterns
$spam_keywords = ['viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations'];
$combined_text = strtolower($name . ' ' . $subject . ' ' . $message);
foreach ($spam_keywords as $keyword) {
    if (strpos($combined_text, $keyword) !== false) {
        $errors[] = 'Your message appears to contain spam content.';
        break;
    }
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(400);
    die(json_encode([
        'success' => false,
        'message' => implode(' ', $errors)
    ]));
}

// Sanitize input for email
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Prepare email
$email_subject = "[Contact Form] " . $subject;
$email_body = "New contact form submission from " . SITE_NAME . "\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Subject: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message . "\n\n";
$email_body .= "---\n";
$email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
$email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "\n";

// Email headers
$headers = [
    'From: ' . SITE_NAME . ' <noreply@pierre-paulg.ca>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mail_sent = mail(
    CONTACT_EMAIL,
    $email_subject,
    $email_body,
    implode("\r\n", $headers)
);

if ($mail_sent) {
    // Update rate limiting timestamp
    $_SESSION['last_submission_time'] = time();

    // Optional: Log successful submission
    error_log("Contact form submission from: " . $email);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! I will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again or contact me via LinkedIn.'
    ]);
}
?>
