# Kimberly Dao's 24th Birthday Website

A beautiful, single-page birthday celebration website built with vanilla HTML, CSS, and JavaScript. Designed to be hosted on GitHub Pages.

## 🎉 Features

- **Landing Screen**: Beautiful entrance with "Enter" button and confetti animation
- **Hero Section**: "The Best Things About 24" with customizable highlights
- **Video Section**: Featured birthday video with responsive player
- **Photo Gallery**: 2-column grid (desktop) / 1-column (mobile) with lightbox viewer
- **Smooth Animations**: Gentle transitions and scroll-triggered reveals
- **Mobile Responsive**: Optimized for all screen sizes
- **Accessible**: Keyboard navigation, screen reader support, proper focus management

## 📁 File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
├── README.md           # This file
└── assets/
    ├── photos/         # Gallery images (photo01.jpg - photo20.jpg)
    ├── video/          # Featured video and poster
    │   ├── kimberly-24.mp4
    │   └── poster.jpg
    ├── meta/           # SEO and social media assets
    │   ├── favicon.png
    │   └── og-cover.jpg
    └── icons/          # Optional SVG icons
```

## 🚀 GitHub Pages Setup

1. **Upload Files**: Copy all files to your GitHub repository
2. **Enable Pages**: 
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save
3. **Access Site**: Your site will be available at `https://[username].github.io/[repository-name]`

## 📝 Content Customization

### Replacing Images

**Gallery Photos** (`assets/photos/`):
- Name your photos `photo01.jpg` through `photo20.jpg`
- Recommended size: 800px+ width for best quality
- The script automatically generates the gallery from these filenames

**Featured Video** (`assets/video/`):
- Replace `kimberly-24.mp4` with your video file
- Replace `poster.jpg` with a video thumbnail (recommended: 800x450px)
- Supported formats: MP4, WebM, OGV

**Meta Assets** (`assets/meta/`):
- `favicon.png`: Website icon (32x32px or 64x64px)
- `og-cover.jpg`: Social media preview image (1200x630px)

### Editing Text Content

**Main Titles** (in `index.html`):
```html
<!-- Landing screen -->
<h1 class="landing-title">Happy 24th, Kimberly!</h1>
<p class="landing-subtitle">A celebration of you and all the amazing things about 24</p>

<!-- Hero section -->
<h1 class="hero-title">The Best Things About 24</h1>
<p class="hero-subtitle">This year is going to be incredible, and here's why</p>
```

**Highlights List** (in `index.html`):
Find the `<ul class="highlights-list">` section and modify the list items:
```html
<li>🌟 Your custom highlight here</li>
<li>💝 Another amazing thing about 24</li>
<!-- Add or remove items as needed -->
```

**About Section** (in `index.html`):
```html
<p class="about-text">
    Your custom message here...
    <em>— From your loving family</em>
</p>
```

**SEO & Social Media** (in `index.html` `<head>`):
- Update `<title>` and meta descriptions
- Change Open Graph URLs and descriptions
- Update `og:image` path to your cover image

### Color Customization

All colors are defined as CSS variables in `styles.css`. Edit these in the `:root` section:

```css
:root {
    --primary-color: #ff6b9d;      /* Main pink color */
    --secondary-color: #a8e6cf;    /* Mint green accent */
    --accent-color: #ffd93d;       /* Yellow highlights */
    --text-color: #2c3e50;         /* Dark text */
    --text-light: #7f8c8d;         /* Light text */
    --background: #fefefe;          /* Main background */
    --card-background: #ffffff;     /* Card backgrounds */
}
```

### Font Changes

The site uses Inter from Google Fonts. To change fonts:

1. Update the Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. Update the font family in `styles.css`:
```css
--font-family: 'YourFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

## 🎨 Advanced Customization

### Adding More Photos
The gallery supports any number of photos. To add more:
1. Add images as `photo21.jpg`, `photo22.jpg`, etc.
2. Update the `photoCount` variable in `script.js`:
```javascript
const photoCount = 30; // Increase this number
```

### Customizing Animations
- Confetti: Modify `createConfetti()` function in `script.js`
- Transitions: Adjust CSS `--transition` variable and animation durations
- Entrance animations: Edit `@keyframes fadeInUp` in `styles.css`

### Mobile Optimization
The site is fully responsive, but you can adjust breakpoints in `styles.css`:
```css
@media (max-width: 768px) {
    /* Tablet styles */
}

@media (max-width: 480px) {
    /* Mobile styles */
}
```

## 🔧 Technical Notes

- **No Build Process**: Pure HTML/CSS/JS - just upload and go
- **Performance**: Images are lazy-loaded, scripts are deferred
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Browser Support**: Modern browsers (Chrome 60+, Firefox 60+, Safari 12+)
- **File Size**: Keep images under 2MB each for best loading performance

## 🎁 Additional Ideas

- Add more interactive elements (hover effects, micro-animations)
- Include a "Birthday Wishes" section with messages from friends
- Add background music (with user controls)
- Create a timeline of memories throughout the year
- Include a photo carousel instead of static grid

## 🐛 Troubleshooting

**Images not loading**: Check file paths and ensure images are in `assets/photos/`
**Video not playing**: Verify MP4 format and file size (recommend <50MB)
**Site not updating**: Clear browser cache or check GitHub Pages build status
**Layout issues**: Ensure all CSS files are properly linked

---

Made with ❤️ for Kimberly's 24th Birthday