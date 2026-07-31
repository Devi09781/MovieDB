<div align="center">

# 🎬 MovieDB

### Enterprise-Grade Movie Discovery Platform

*A modern IMDb × TMDb × Netflix inspired movie platform built with Next.js 15, React Server Components, TypeScript, Firebase, and modern frontend architecture.*

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=for-the-badge&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

**Production-Ready • Responsive • Accessible • Offline First • High Performance**

</div>

---

# 📖 Overview

CineVerse is a **production-ready movie discovery platform** inspired by IMDb, TMDb, Netflix, and Letterboxd.

The application showcases modern frontend engineering practices including **React Server Components**, **App Router**, **Incremental Static Regeneration**, **Streaming UI**, **Edge Runtime**, **Offline-first architecture**, **Optimistic Updates**, **Advanced Caching**, and **Performance Optimization**.

The goal of this project is to demonstrate how a large-scale, enterprise frontend application is architected using modern React and Next.js technologies.

---

# ✨ Features

## 🎥 Movie Discovery

- Trending Movies
- Top Rated Movies
- Upcoming Releases
- Popular Movies
- Award Winning Movies
- Genre Browsing
- Advanced Search
- Infinite Scrolling
- Personalized Recommendations

---

## 🎭 Actor Profiles

Each actor profile includes:

- Biography
- Filmography
- Awards
- Known For
- Gallery
- Social Links
- Similar Actors
- Career Timeline
- Upcoming Projects
- Production Companies

---

## 🎬 Movie Details

Movie pages include:

- Hero Banner
- Backdrop Images
- Posters
- Ratings
- Genres
- Runtime
- Languages
- Budget & Revenue
- Cast & Crew
- Official Trailer
- Reviews
- Gallery
- Awards
- Similar Movies
- Recommendations

---

## ❤️ Watchlist

Enterprise-grade watchlist featuring:

- Offline Support
- LocalStorage Cache
- IndexedDB Cache
- Firebase Synchronization
- Background Sync
- BroadcastChannel Sync
- Optimistic Updates
- Rollback Handling
- Conflict Resolution
- Cross Device Synchronization

---

## ✍️ Review System

- Authentication
- Create/Edit/Delete Reviews
- Draft Auto Save
- Offline Drafts
- Background Sync
- Live Updates
- Helpful Voting
- Review Ranking
- Moderation
- Revision History
- Undo Delete

---

## 🌎 Internationalization

Supports multiple languages including:

- English
- Hindi
- Telugu
- Tamil
- Kannada
- Malayalam

---

## 🎨 Theme Engine

- Light Theme
- Dark Theme
- High Contrast Theme
- Auto Theme
- Cookie Persistence
- Cross Device Sync
- Flash-free SSR Rendering

---

# 🏗️ Architecture

The project follows **Clean Architecture** and **Feature-Based Design**.

```
Presentation Layer
│
├── App Router
├── React Server Components
├── Client Components
├── UI Components
└── Feature Modules

Business Layer
│
├── Repository Pattern
├── Services
├── Hooks
├── Context Providers
└── Validation

Data Layer
│
├── Firebase Firestore
├── TMDb API
├── OMDb API
├── LocalStorage
├── IndexedDB
└── Cache Layer
```

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Lucide Icons

### Data Fetching

- TanStack Query
- React Server Components
- Suspense
- Streaming UI

### Backend Services

- Firebase Authentication
- Firestore Database
- Firebase Storage

### Storage

- IndexedDB
- LocalStorage
- Firestore

### APIs

- TMDb API
- OMDb API

### Validation

- Zod

### Testing

- Playwright
- Jest
- React Testing Library

---

# 📁 Project Structure

```
src
│
├── app
│   ├── (home)
│   ├── movies
│   ├── actors
│   ├── reviews
│   ├── search
│   ├── watchlist
│   ├── settings
│   ├── profile
│   ├── api
│   ├── loading.tsx
│   ├── error.tsx
│   └── layout.tsx
│
├── components
│
├── features
│
├── repositories
│
├── services
│
├── providers
│
├── contexts
│
├── firebase
│
├── hooks
│
├── schemas
│
├── lib
│
├── utils
│
├── types
│
├── middleware
│
├── workers
│
├── locales
│
├── store
│
└── tests
```

---

# 🚀 Performance

The application is optimized for production with:

- React Server Components
- Streaming SSR
- Incremental Static Regeneration
- Edge Runtime
- On-Demand Revalidation
- Image Optimization
- Request Deduplication
- Route Prefetching
- Query Prefetching
- Virtualized Lists
- Lazy Loading
- Dynamic Imports
- Skeleton Screens

### Lighthouse Goals

| Metric | Target |
|---------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | < 1.2 s |
| CLS | < 0.05 |
| TTI | < 2 s |

---

# 🔒 Security

- Firebase Authentication
- Firestore Security Rules
- Content Security Policy (CSP)
- Zod Validation
- Route Protection
- Rate Limiting
- Secure Environment Variables
- Repository Policy Layer
- Input Sanitization

---

# ♿ Accessibility

The application follows WCAG guidelines and includes:

- Keyboard Navigation
- Focus Management
- ARIA Labels
- ARIA Live Regions
- Screen Reader Support
- Reduced Motion
- High Contrast Mode
- Accessible Carousel

---

# 📊 Data Flow

```
TMDb API
        │
OMDb API
        │
Firestore
        │
Repository Layer
        │
Caching Layer
        │
TanStack Query
        │
React Server Components
        │
Client Components
        │
User Interface
```

---

# 🔄 Watchlist Synchronization

```
User Action
      │
Optimistic Update
      │
LocalStorage
      │
IndexedDB
      │
Background Sync
      │
Firestore
      │
BroadcastChannel
      │
Other Browser Tabs
```

---

# 🧪 Testing Strategy

The project includes:

- Unit Tests
- Component Tests
- Repository Tests
- Integration Tests
- End-to-End Tests
- Accessibility Tests
- Offline Tests
- Service Worker Tests
- Performance Tests
- Error Handling Tests
- Retry Logic Tests

---

# 🌍 Data Sources

The application integrates with:

- TMDb API
- OMDb API
- Firebase Firestore

Movie posters, metadata, trailers, cast information, and actor profiles are retrieved from official APIs.

---

# 📈 Future Roadmap

- AI Movie Recommendations
- AI Review Summarization
- Voice Search
- Personalized Feed
- Streaming Provider Comparison
- User Collections
- Movie Discussion Forums
- Notification Center
- Analytics Dashboard
- Admin CMS

---

# 👨‍💻 Author

**Devi Jetta**

Computer Science Engineering (AI & ML)

Full Stack Developer | Frontend Engineer | AI Enthusiast

---

# 📄 License

This project is licensed under the **MIT License**.

Movie metadata, posters, and related assets are provided through **TMDb** and **OMDb** APIs and remain subject to their respective licensing terms.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star.

**Designed and Developed with ❤️ using Next.js 15**

</div>
