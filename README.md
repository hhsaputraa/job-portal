# 🚀 JobsSukabumi - Portal Lowongan Kerja

Portal lowongan kerja modern yang dibangun khusus untuk wilayah Sukabumi dengan teknologi terdepan. Platform ini menghubungkan pencari kerja dengan perusahaan-perusahaan terbaik di Sukabumi.

![JobsSukabumi Banner](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=JobsSukabumi)

## ✨ Fitur Utama

### 👥 Untuk Pencari Kerja

- **Pencarian Lowongan** - Filter berdasarkan kategori, lokasi, dan gaji
- **Profil Lengkap** - Upload CV dan portfolio
- **Lamaran Online** - Apply langsung melalui platform
- **Notifikasi Email** - Update status lamaran otomatis
- **Bookmark Jobs** - Simpan lowongan favorit
- **Company Following** - Follow perusahaan yang diminati

### 🏢 Untuk Perusahaan

- **Dashboard Admin** - Kelola lowongan dan lamaran
- **Company Profile** - Showcase perusahaan dengan detail
- **AI-Powered Content** - Generate deskripsi dengan Google Gemini
- **Applicant Management** - Review dan kelola pelamar
- **Email Templates** - Notifikasi otomatis ke pelamar

### 🔧 Fitur Teknis

- **Authentication** - Secure login dengan Clerk
- **File Upload** - CV dan dokumen ke Firebase Storage
- **Email Service** - Automated email dengan Nodemailer
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - Dynamic content updates

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components
- **React Hook Form** - Form management
- **Framer Motion** - Smooth animations

### Backend & Database

- **Prisma** - Type-safe database ORM
- **MongoDB** - NoSQL database
- **Clerk** - Authentication & user management
- **Firebase Storage** - File storage solution

### AI & Services

- **Google Gemini AI** - Content generation
- **Nodemailer** - Email service
- **Handlebars** - Email templating

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database
- Clerk account
- Firebase project
- Google Gemini API key

### Installation

1. **Clone repository**

```bash
git clone https://github.com/yourusername/jobs-sukabumi.git
cd jobs-sukabumi
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Isi file `.env.local`:

```env
# Database
DATABASE_URL="your_mongodb_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Firebase Storage
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# Email Service
SMTP_EMAIL="your_email@gmail.com"
SMTP_PASSWORD="your_app_password"
```

4. **Setup database**

```bash
npx prisma generate
npx prisma db push
```

5. **Run development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🎯 Demo Accounts

Untuk testing, gunakan akun demo berikut:

### Admin Account

- **Email**: `admin@demo.com`
- **Password**: `Admin123!`
- **Access**: Full dashboard access

### User Account

- **Email**: `user@demo.com`
- **Password**: `User123!`
- **Access**: Regular user features

## 📁 Project Structure

```
jobs-sukabumi/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   └── ...               # Custom components
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   ├── mail.ts          # Email service
│   └── utils.ts         # Helper functions
├── prisma/              # Database schema
├── config/              # Configuration files
└── public/              # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy ke Vercel**

- Import project di [Vercel Dashboard](https://vercel.com)
- Tambahkan environment variables
- Deploy otomatis

### Environment Variables di Vercel

Pastikan semua environment variables dari `.env.local` ditambahkan di Vercel dashboard.

## 📱 Screenshots

### Homepage

![Homepage](https://via.placeholder.com/600x400/10B981/FFFFFF?text=Homepage)

### Job Search

![Job Search](https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Job+Search)

### Admin Dashboard

![Admin Dashboard](https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Admin+Dashboard)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://prisma.io/) - Database ORM
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

Jika ada pertanyaan atau masalah:

- 📧 Email: support@jobssukabumi.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/jobs-sukabumi/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/jobs-sukabumi/discussions)

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk komunitas Sukabumi</p>
  <p>© 2024 JobsSukabumi. All rights reserved.</p>
</div>
