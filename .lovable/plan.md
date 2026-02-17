

## 🎨 Premium Gallery Portfolio — Complete Build Plan

A minimal, premium, gallery-style personal portfolio with smooth animations, warm/bright design, and bilingual support (EN + JA).

---

### Phase 1: Foundation & Design System

**Global Styling**
- Warm, bright color palette with off-white/cream backgrounds
- Soft amber/coral accent color, muted sage secondary
- Clean typography system (modern sans-serif for EN, readable font for JA)
- Generous spacing and strong visual hierarchy

**Layout Components**
- Fixed header with logo, navigation, and language toggle (EN | 日本語)
- Minimal footer with bio, social links, and copyright
- Responsive container system with ample whitespace

**Animation System**
- Framer Motion integration for smooth transitions
- Fade-in, slide-up, and gentle scale effects (max 1.02)
- Consistent timing (0.3-0.5s duration)
- Page transitions between routes

---

### Phase 2: Multilingual System

**Language Context**
- Global language state with React Context
- Language preference saved to localStorage
- Instant toggle without page reload

**Content Structure**
- All text content supports `{ en: "", ja: "" }` format
- Language-aware components for seamless switching

---

### Phase 3: Core Pages

**Home Page (Gallery Entry)**
- Minimal intro text (bilingual)
- Featured gallery preview grid (6-9 items)
- Mix of photos and videos with uniform aspect ratios
- Hover effects: slight zoom + caption fade-in
- Clear CTA to full gallery

**Gallery Page (Hero Feature)**
- Full-width masonry/grid layout
- Category filter pills: All, Work, Events, Travel, Personal, Creative
- Media cards with hover overlays and captions
- Lightbox viewer with smooth open/close animations
- Swipe support on mobile
- Video: muted preview on hover, full playback in lightbox

**Journey Page**
- Vertical chronological storytelling layout
- Each entry: date, title (EN+JA), story text, optional media
- Fade + slide animations on scroll

**Projects Page**
- Image-first card layout
- Soft hover lift effects
- Clean edges, plenty of whitespace

**Blogs Page**
- Editorial/magazine-style layout
- Focus on readability with calm typography
- Large titles, comfortable reading width

---

### Phase 4: Firebase Integration

**Firebase Setup**
- Firebase Authentication for admin access
- Firestore database for content management
- Collections: `media`, `journey`, `projects`, `blogs`, `settings`

**Data Models**
- Media: url, type (photo/video), category, caption {en, ja}, createdAt
- Journey: date, title {en, ja}, content {en, ja}, mediaUrl
- Projects: title {en, ja}, description {en, ja}, imageUrl, link
- Blogs: title {en, ja}, content {en, ja}, excerpt, publishedAt

---

### Phase 5: Cloudinary Integration

**Upload Flow**
- Unsigned uploads from admin dashboard
- Automatic URL generation and optimization
- Support for both images and videos

**Display Optimization**
- Lazy loading for all media
- Cloudinary transformations for responsive images
- Video thumbnail generation

---

### Phase 6: Admin Dashboard

**Protected Routes**
- Firebase Authentication guard
- Email/password login for admin

**Content Management**
- Media upload with category assignment and bilingual captions
- Journey entry management
- Project management
- Blog post editor
- Simple, functional UI (no animations needed)

---

### Phase 7: Performance & Polish

**Optimization**
- Lazy loading for images and videos
- Route-based code splitting
- SEO meta tags per language
- Smooth page transitions

**Final Touches**
- Mobile-responsive across all pages
- Accessibility considerations
- Error handling and loading states

---

### 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # Header, Footer, Container
│   ├── gallery/       # GalleryGrid, MediaCard, Lightbox
│   ├── common/        # LanguageToggle, AnimatedSection
│   └── admin/         # Upload forms, content editors
├── contexts/
│   └── LanguageContext.tsx
├── hooks/
│   └── useFirestore.ts
├── lib/
│   ├── firebase.ts
│   └── cloudinary.ts
├── pages/
│   ├── Index.tsx      # Home
│   ├── Gallery.tsx
│   ├── Journey.tsx
│   ├── Projects.tsx
│   ├── Blogs.tsx
│   └── Admin.tsx
└── styles/
    └── animations.ts
```

---

### ⚠️ Requirements After Implementation

You'll need to provide:
1. **Firebase config** — Project credentials from Firebase Console
2. **Cloudinary cloud name** — For unsigned uploads

I'll guide you through setting these up when we reach that phase!

