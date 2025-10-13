# 🚀 Pierre-Paul G. - Developer Portfolio

Welcome to my personal portfolio website! This site showcases my skills, projects, and experience as a developer.

## 🌐 Live Website

**Coming Soon**: [pierre-paulg.ca](https://pierre-paulg.ca)

## ✨ Features

- 🌍 **Bilingual Support**: Available in English and French
- ♿ **Accessibility First**: 
  - ADHD-friendly design with clear spacing and structure
  - Colorblind-safe color palette
  - Full screen reader support with ARIA labels
  - Keyboard navigation friendly
- 🎨 **Modern Design**:
  - Smooth section transitions and animations
  - Distinct visual design for each section
  - Clear hover states on all interactive elements
  - Responsive layout for all devices
- ⚡ **Performance Optimized**:
  - Clean, semantic HTML5
  - Efficient CSS with no frameworks
  - Vanilla JavaScript (no dependencies)
  - Fast loading times

## 🛠️ Technologies Used

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom styling with modern features (Grid, Flexbox, Gradients)
- **JavaScript** - Vanilla JS for interactivity
- **Cloudinary** - CDN for image optimization and delivery

## 🎨 Design Principles

### Color Palette
- **Deep Navy** (#1a2332) - Primary text and navigation
- **Vibrant Teal** (#00b4d8) - Primary accent (colorblind-safe)
- **Warm Coral** (#ff6b6b) - Secondary accent
- **Soft Cream** (#f8f9fa) - Background base
- **Slate** (#495057) - Body text

All colors meet WCAG AA contrast standards and work for all types of colorblindness.

### Accessibility Features
- High contrast text and backgrounds
- Clear focus indicators for keyboard navigation
- Descriptive ARIA labels throughout
- Semantic HTML structure
- Support for reduced motion preferences
- Generous spacing to reduce cognitive load (ADHD-friendly)

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
└── README.md          # This file
```

## 🚀 Getting Started

### View Locally

1. Clone this repository:
```bash
git clone https://github.com/your-username/portfolio.git
```

2. Open `index.html` in your browser:
```bash
# On Mac
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

That's it! No build process or dependencies required.

## 📝 Customization Guide

### Update Personal Information

1. **Name**: Change "Pierre-Paul G." in the navigation logo
2. **About Section**: Edit the paragraphs in the About section
3. **Projects**: Add your own projects by copying the project card structure
4. **Contact**: Update email and LinkedIn links in the footer

### Add New Projects

Copy this structure in the projects section:

```html
<article class="project-card" aria-labelledby="projectX-title">
    <div class="project-header">
        <h3 id="projectX-title" class="project-title" 
            data-en="Your Project Name" 
            data-fr="Nom de votre projet">
            Your Project Name
        </h3>
        <span class="project-type" 
              data-en="Web App" 
              data-fr="App Web">
            Web App
        </span>
    </div>
    <p class="project-description" 
       data-en="Your English description" 
       data-fr="Votre description française">
        Your project description here.
    </p>
    <div class="project-tags">
        <span class="tag">Technology 1</span>
        <span class="tag">Technology 2</span>
    </div>
    <div class="project-links">
        <a href="#" class="btn btn-primary">View Demo</a>
        <a href="#" class="btn btn-secondary">View Code</a>
    </div>
    <div class="project-hover-indicator"></div>
</article>
```

### Update Skill Logos

Replace the SVG placeholders with actual logo images or use Cloudinary URLs:

```html
<div class="skill-icon">
    <img src="your-logo-url.png" alt="Technology name logo" loading="lazy">
</div>
```

## 🌐 Deployment

### GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Select branch: `main`
4. Click **Save**
5. Your site will be live at: `https://your-username.github.io/portfolio`

### Custom Domain (pierre-paulg.ca)

1. In your domain provider, add a CNAME record pointing to: `your-username.github.io`
2. In GitHub repository settings → Pages → Custom domain
3. Enter: `pierre-paulg.ca`
4. Click **Save**

## 🔄 Updates & Maintenance

### Adding French Translations

Every text element uses `data-en` and `data-fr` attributes:

```html
<element data-en="English text" data-fr="Texte français">English text</element>
```

The language toggle button switches between these automatically.

## 📊 Performance

- **No external dependencies** - Pure HTML/CSS/JS
- **Lazy loading** - Images load as needed
- **Optimized animations** - Respects user motion preferences
- **Mobile-first** - Responsive on all devices

## 🤝 Connect With Me

- 💼 LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- 📧 Email: your-email@example.com
- 🌐 Website: pierre-paulg.ca

## 📄 Copyright

© 2025 Pierre-Paul G. All rights reserved.

This portfolio is personal work showcasing my skills and projects. Feel free to draw inspiration from the design and accessibility features, but please create your own unique implementation.

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Accessibility guidelines from WCAG 2.1
- Color palette designed for maximum accessibility
- Icons: [Simple Icons](https://simpleicons.org) (when implemented)

---

**Built with ❤️ by Pierre-Paul G.**

*Last Updated: January 2025*