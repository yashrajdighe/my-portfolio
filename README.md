# Static Portfolio Website

This is a professional cloud engineering portfolio website converted to a static HTML/CSS/JavaScript format suitable for hosting on AWS S3, Netlify, or any static hosting service.

## Files Structure

```
static/
├── index.html          # Main website file with all sections
├── script.js          # JavaScript functionality
├── README.md          # This file
```

## Features

- **Fully Responsive Design** - Works on all devices
- **Professional Portfolio Sections**:
  - Hero section with introduction
  - About section with professional journey
  - Projects showcase with 3 featured projects
  - Skills & expertise with certifications
  - Blog section linking to Medium articles
  - Dual contact forms (general connect + hire me)
  - Resume download section
  - Footer with social links

- **Interactive Elements**:
  - Mobile-responsive navigation menu
  - Smooth scrolling between sections
  - Form validation and submission handling
  - Toast notifications for user feedback
  - Hover animations and visual effects

## Deployment Options

### AWS S3 Static Website Hosting

1. Create an S3 bucket with public read access
2. Enable static website hosting
3. Upload `index.html`, `script.js`, and any assets
4. Set `index.html` as the index document

### Netlify (Recommended)

1. Connect your Git repository or drag & drop the static folder
2. Netlify will automatically detect it as a static site
3. Forms will work automatically with Netlify Forms

### Other Static Hosts

- Vercel
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting

## Customization

### Personal Information
Edit the following in `index.html`:
- Name and title in hero section
- About section content
- Projects (replace with your actual projects)
- Skills and certifications
- Contact information
- Social media links

### Form Integration
The forms currently show success messages. To enable real form submission:

1. **Netlify Forms** (if using Netlify):
   - Add `netlify` attribute to form tags
   - Forms will automatically work

2. **EmailJS**:
   - Sign up at emailjs.com
   - Add EmailJS configuration to `script.js`
   - Uncomment EmailJS integration code

3. **Formspree**:
   - Sign up at formspree.io
   - Replace form action with Formspree endpoint

### Adding Your Resume
1. Add your PDF resume file to the static folder
2. Update the download/preview button handlers in `script.js`
3. Update the file paths to point to your resume

### Blog Integration
Currently shows placeholder blog posts. To connect with Medium:
1. Replace blog post links with your actual Medium articles
2. Update images and descriptions
3. Consider using Medium's RSS feed for dynamic content

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Optimized images from Unsplash CDN
- Minimal external dependencies (only Tailwind CSS and Lucide icons)
- Efficient CSS animations
- Lazy loading ready structure

## SEO Optimized

- Semantic HTML structure
- Meta tags for social media sharing
- Descriptive alt texts for images
- Proper heading hierarchy
- Fast loading times

## Development

To make changes:
1. Edit `index.html` for content and structure
2. Edit `script.js` for functionality
3. Use browser developer tools for testing
4. Test on multiple devices and browsers before deploying

## License

This template is open source and available under the MIT License.
