# COMPREHENSIVE PROMPT FOR PORTFOLIO WEBSITE DESIGN

## PROJECT OVERVIEW
Create a professional, modern portfolio website for a student designer with a clean, minimalist design using pink and white theme colors with a dark mode toggle feature.

## CLIENT INFORMATION
- **Name**: Nguyễn Thị Khánh Huyền
- **Profession**: Student - IT Department, Digital Graphic Design
- **Career Goal**: UI/UX Designer / Graphic Designer Professional
- **Personal Tagline**: "Nghệ thuật nằm ở cách tôi nhìn thế giới" (Art lies in how I see the world)
- **Contact Email**: hn357046@gmail.com
- **Social Media**: Facebook, Instagram, TikTok

---

## DESIGN SPECIFICATIONS

### Typography Requirements
**Heading Fonts (Bold, Prominent):**
- Primary: Poppins (font-weight: 700)
- Secondary: Montserrat (font-weight: 600)
- Tertiary: Inter (font-weight: 700)

**Body Fonts (Readable, Clean):**
- Primary: Open Sans (font-weight: 400, 500)
- Secondary: Roboto (font-weight: 400, 500)
- Tertiary: Inter (font-weight: 500)

### Color Palette
**Primary Colors:**
- Primary Pink: #FF6B9D
- Light Pink: #FFD6E8
- Dark Pink: #E85A8A
- White: #FFFFFF

**Secondary Colors:**
- Light Gray: #F5F5F5
- Dark Gray: #333333
- Text Light: #666666

**Dark Mode:**
- Background: #1a1a1a
- Text Primary: #FFFFFF
- Text Secondary: #CCCCCC
- Border: #333333

### Theme Toggle Feature
- **Location**: Top-right corner of header/navigation bar
- **Style**: Circular gradient button (pink to dark pink)
- **Icons**: Moon icon for light mode, Sun icon for dark mode
- **Functionality**: Toggle between light (pink/white) and dark (dark bg/light text) themes
- **Persistence**: Save user preference to localStorage

---

## WEBSITE SECTIONS

### 1. HEADER & NAVIGATION
- Sticky navigation bar with logo "KH Huyền"
- Navigation links: Home | About | Projects | Skills | Contact
- Theme toggle button (circular, gradient)
- Shadow effect on scroll
- Responsive mobile menu ready

### 2. HERO SECTION / LANDING AREA
- Large, bold title: "Nguyễn Thị Khánh Huyền"
- Subtitle: "UI/UX Designer | Graphic Designer"
- Personal tagline: "Nghệ thuật nằm ở cách tôi nhìn thế giới."
- Call-to-action button: "Liên hệ tôi" (Contact Me)
- Decorative design element (gradient circle on right side)
- Background gradient (subtle pink to light pink)

### 3. ABOUT ME SECTION
- **Title**: "Về tôi" (About Me)
- **Introduction**: Sinh viên khoa CNTT - Đồ họa kĩ thuật số
- **Personal Description**: Comprehensive bio about passion for design and transition to professional UX/UI Design
- **Career Goals** (bulleted list):
  - Trở thành UI/UX Designer / Graphic Designer chuyên nghiệp
  - Phát triển khả năng thiết kế sáng tạo kết hợp công nghệ
  - Xây dựng danh tiếng và kinh nghiệm trong lĩnh vực thiết kế
- Background color: Light gray (lighter than main background)
- Checkmark icons for goals list

### 4. PROJECTS / PORTFOLIO SECTION
Display 4 featured projects in a grid (2x2 or responsive grid):

**Project 1: Website Portfolio**
- Icon: Globe
- Title: Thiết kế & Xây dựng Website Giới thiệu
- Role: Thiết kế UI, Code HTML/CSS
- Description: Create responsive personal portfolio website with modern UI design

**Project 2: 5G Project**
- Icon: WiFi
- Title: Dự án 5G
- Role: Thiết kế UI
- Description: UI design for advanced 5G technology application

**Project 3: 6G Project**
- Icon: Wave Square
- Title: Dự án 6G
- Role: Thiết kế Graphic
- Description: Visual and branding design for next-generation 6G technology

**Project 4: AI Automation**
- Icon: Robot
- Title: AI cho Tự động hóa
- Role: Thiết kế UX
- Description: User-friendly interface design for AI automation system

**Card Features:**
- Light background with top pink border
- Hover effect: lift up with shadow increase
- Icon, title, role, description
- Smooth transitions and animations

### 5. SKILLS / EXPERIENCE SECTION
Display 4 main skills with progress bars:

1. **Adobe Photoshop**: 90%
2. **Adobe Illustrator**: 80%
3. **Figma**: 70%
4. **HTML/CSS**: 60%

**Features:**
- Icon for each skill
- Skill name
- Progress bar (gradient pink to dark pink)
- Percentage displayed on bar
- Grid layout (responsive, 1-4 columns)
- Background: Subtle gradient (very light pink)

### 6. CONTACT SECTION
- Title: "Liên hệ" (Contact)
- Intro text: "Hãy được kết nối với tôi trên các nền tảng dưới đây"
- Contact methods in cards:
  - Email (Gmail icon): hn357046@gmail.com
  - Facebook (Facebook icon)
  - Instagram (Instagram icon)
  - TikTok (TikTok icon)
- Each contact item includes:
  - Application icon (Font Awesome)
  - Platform name or contact info
  - Hover effect: lift up with pink shadow
- Clickable links with target="_blank" for social media

### 7. FOOTER
- Copyright text: "&copy; 2024 Nguyễn Thị Khánh Huyền. Tất cả quyền được bảo lưu."
- Dark gray background
- Light text color
- Centered alignment

---

## TECHNICAL REQUIREMENTS

### HTML5 Structure
- Semantic HTML5 elements (header, nav, section, footer)
- Meta tags for responsiveness (viewport)
- Font imports from Google Fonts
- Font Awesome icon library integration
- Proper document structure with lang="vi"

### CSS Features
- **CSS Variables** for color management
- **Flexbox & Grid** for layout
- **Gradient backgrounds** for visual appeal
- **Box shadows** for depth
- **Transitions & animations** for smooth interactions
- **Responsive design**: mobile-first approach
  - Breakpoints: 768px (tablet), 480px (mobile)
  - Flexible grid layouts
  - Touch-friendly button sizes
- **Dark mode support**: 
  - body.dark-mode class
  - All colors adjust automatically
  - Smooth transitions between themes

### JavaScript Functionality
- Theme toggle button event listener
- localStorage for theme persistence
- Smooth scroll behavior for navigation links
- Intersection Observer API for scroll animations
- Fade-in and slide-up animations for cards on scroll

### Additional Features
- **Smooth scrolling** for anchor links
- **Animation on scroll**: Elements fade in and slide up as user scrolls
- **Hover effects**: Subtle transitions on all interactive elements
- **Mobile responsive**: Works seamlessly on all device sizes
- **Accessibility**: Proper semantic HTML, alt text consideration, ARIA labels if needed

---

## DESIGN PRINCIPLES

1. **Color Harmony**: Pink primary color with white/light backgrounds for light mode
2. **Typography Hierarchy**: Poppins for main titles, Open Sans/Roboto for body text
3. **User Experience**: Clear navigation, intuitive layout, accessible design
4. **Modern Aesthetic**: Gradient elements, smooth animations, clean spacing
5. **Brand Consistency**: Pink theme throughout, professional yet creative feel
6. **Responsive First**: Mobile-friendly from the start
7. **Performance**: Optimized CSS, minimal code bloat

---

## FILE STRUCTURE
```
project/
├── index.html          # Main HTML file with all sections
├── style.css           # Complete styling with light/dark modes
├── script.js           # JavaScript for interactions and animations
└── README.md           # Project documentation (optional)
```

---

## DELIVERABLES
1. ✅ Complete HTML5 portfolio website
2. ✅ Professional CSS styling with dark mode
3. ✅ Interactive JavaScript features
4. ✅ Responsive design for all devices
5. ✅ Social media integration
6. ✅ Smooth animations and transitions
7. ✅ Theme persistence with localStorage

---

## NOTES FOR DEVELOPERS
- Use modern CSS techniques (CSS Grid, Flexbox)
- Ensure semantic HTML structure
- Optimize for performance (minimize reflows)
- Test responsive design on multiple devices
- Verify all links and social media connections
- Ensure dark mode works smoothly across all sections
- Add proper spacing and padding for visual hierarchy
- Use consistent sizing and spacing system (multiples of 0.5rem)
- Implement proper z-index management for layered elements
