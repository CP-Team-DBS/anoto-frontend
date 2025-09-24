# Anoto Frontend - Local Development Guide

## Overview
Anoto adalah aplikasi frontend untuk deteksi kesehatan mental yang dibangun dengan **React 19** dan **Next.js 15**. Guide ini akan membantu Anda memahami cara setup dan menggunakan aplikasi untuk development lokal.

## Prerequisites

### System Requirements
- **Node.js**: Version 18.x atau lebih tinggi (recommended: 20.x)
- **npm**: Version 9.x atau lebih tinggi
- **Git**: Untuk version control

### Verifikasi Prerequisites
```bash
node --version    # Should be >= 18.0.0
npm --version     # Should be >= 9.0.0
git --version     # Any recent version
```

## Setup Development Environment

### 1. Clone Repository
```bash
git clone https://github.com/CP-Team-DBS/anoto-frontend.git
cd anoto-frontend
```

### 2. Install Dependencies
```bash
npm install
```

**Note**: Jika Anda mengalami error dengan lucide-react dan React 19, pastikan package.json menggunakan versi yang kompatibel:
- `lucide-react`: ^0.511.0 atau lebih tinggi
- `react`: ^19.0.0
- `next`: ^15.0.0

### 3. Environment Variables (Optional)
Buat file `.env.local` di root directory untuk konfigurasi development:
```bash
cp .env.example .env.local  # Jika ada file example
```

Atau buat manual:
```env
# .env.local
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Running the Application

### Development Mode
```bash
npm run dev
```

Aplikasi akan berjalan di:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

### Production Build (Testing)
```bash
npm run build
npm start
```

## Local Data Storage untuk Development

### 1. JSON Files (Simple Approach)
Untuk development lokal, data disimpan dalam format JSON files:

#### Structure:
```
src/
├── data/
│   ├── testimonials.json      # Data testimoni pengguna
│   ├── test-results.json      # Hasil tes kecemasan
│   └── users.json             # Data pengguna (jika diperlukan)
```

#### Contoh testimonials.json:
```json
{
  "testimonials": [
    {
      "id": "1",
      "name": "Anonymous User",
      "text": "Aplikasi ini sangat membantu untuk memahami kondisi mental saya",
      "rating": 5,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Contoh test-results.json:
```json
{
  "results": [
    {
      "id": "test-1",
      "userId": "user-1",
      "scores": [1, 2, 1, 0, 2, 1, 3],
      "totalScore": 10,
      "level": "normal",
      "result": "Normal",
      "description": "Kamu tidak merasakan kecemasan yang signifikan.",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Browser LocalStorage (Client-side)
Untuk data yang hanya diperlukan di browser:

```javascript
// Simpan data
localStorage.setItem('anoto_user_preferences', JSON.stringify({
  theme: 'light',
  notifications: true
}));

// Ambil data
const preferences = JSON.parse(localStorage.getItem('anoto_user_preferences') || '{}');
```

### 3. API Routes untuk Development
Next.js menyediakan API routes untuk simulasi backend:

#### Buat file API:
```javascript
// src/app/api/testimonials/route.ts
export async function GET() {
  // Baca dari file JSON atau return hardcoded data
  return Response.json({
    testimonials: [
      // data testimoni
    ]
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Simulasi penyimpanan ke file atau array
  return Response.json({ success: true, id: Date.now() });
}
```

## Development Workflow

### 1. Struktur Project
```
anoto-frontend/
├── src/
│   ├── app/                   # Next.js 15 App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── test/              # Test anxiety pages
│   │   └── journal/           # Journal pages
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── test/              # Test-specific components
│   │   └── journal/           # Journal-specific components
│   ├── lib/                   # Utility functions
│   ├── data/                  # Local JSON data files
│   └── styles/                # Global styles
├── public/                    # Static assets
└── docs/                      # Documentation
```

### 2. Development Commands
```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### 3. Hot Reload
Next.js 15 dengan Turbopack menyediakan hot reload yang sangat cepat. Perubahan akan langsung terlihat di browser.

## Common Development Tasks

### 1. Menambah Halaman Baru
```bash
# Buat file di src/app/
touch src/app/new-page/page.tsx
```

```tsx
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

### 2. Menambah Komponen Baru
```bash
# Buat komponen di src/components/
touch src/components/my-component.tsx
```

### 3. Styling dengan Tailwind CSS
Project menggunakan Tailwind CSS v4:
```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Content
</div>
```

## Debugging

### 1. Browser DevTools
- **Console**: Untuk melihat console.log dan errors
- **Network**: Untuk memonitor API calls
- **React DevTools**: Install extension untuk debugging React

### 2. Next.js DevTools
Next.js menyediakan informasi debug di console saat development mode.

### 3. VS Code Extensions (Recommended)
```
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint
```

## Testing

### Run Tests (if available)
```bash
npm test
```

### Manual Testing
1. Test form submissions
2. Test responsive design di berbagai screen size
3. Test navigasi antar halaman
4. Test API endpoints di `/api/*`

## Build Optimization

### 1. Bundle Analysis
```bash
npm run build
```

### 2. Performance Testing
- Gunakan Chrome DevTools Lighthouse
- Test loading speed
- Test Core Web Vitals

## Deployment Preparation

### 1. Environment Variables
Pastikan semua environment variables sudah di-set untuk production:
```env
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### 2. Build Test
```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues

#### 1. Dependency Conflicts
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScript Errors
```bash
# Check TypeScript
npx tsc --noEmit
```

#### 3. ESLint Issues
```bash
# Fix auto-fixable issues
npm run lint -- --fix
```

#### 4. React 19 Compatibility Issues
Pastikan semua dependencies kompatibel dengan React 19:
- Update lucide-react ke versi terbaru
- Check peer dependencies
- Use `npm ls` untuk melihat dependency tree

## Performance Tips

1. **Code Splitting**: Next.js melakukan ini otomatis
2. **Image Optimization**: Gunakan `next/image`
3. **Font Optimization**: Gunakan `next/font`
4. **Bundle Size**: Monitor dengan `npm run build`

## Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Support

Jika mengalami masalah:
1. Check dokumentasi di atas
2. Search di GitHub Issues
3. Create new issue dengan detail lengkap
4. Contact development team

---

**Happy Coding! 🚀**