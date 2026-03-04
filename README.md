# Lumora by Camlightshop

A lightweight e-commerce catalog application built for a client to showcase and manage her product collection.

## Overview

Lumora is a modern, responsive e-commerce platform designed to display products with an intuitive user interface. Built with cutting-edge web technologies, it provides a seamless shopping experience with secure authentication and efficient image management.

## Tech Stack

### Frontend
- **React** - UI library for building interactive components
- **Vite** - Fast build tool and dev server for optimized development

### Backend & Services
- **Firebase** - Authentication and real-time database
- **Cloudinary** - Image storage and optimization

## Features

- 📦 Product catalog display
- 🔐 Secure user authentication via Firebase
- 🖼️ Optimized image management with Cloudinary
- 📱 Responsive design for mobile and desktop
- ⚡ Fast performance with Vite
- 🎨 Modern and clean UI

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project credentials
- Cloudinary account credentials

### Installation

1. Clone the repository
```bash
 git clone https://github.com/TrevorTunner1/Lumora-by-Camlightshop.git
 cd Lumora-by-Camlightshop
```

2. Install dependencies
```bash
 npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory and add your credentials:
```
 VITE_FIREBASE_API_KEY=your_firebase_api_key
 VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
 VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
 VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
 VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
 VITE_FIREBASE_APP_ID=your_firebase_app_id

 VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
 VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

4. Start the development server
```bash
 npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
 Lumora-by-Camlightshop/
 ├── src/
 │   ├── components/     # React components
 │   ├── pages/          # Page components
 │   ├── services/       # Firebase and API services
 │   ├── App.jsx         # Main App component
 │   └── main.jsx        # Entry point
 ├── public/             # Static assets
 ├── .env.local          # Environment variables (not in repo)
 ├── vite.config.js      # Vite configuration
 └── package.json        # Dependencies
```

## Deployment

The application is deployed on [Vercel](https://lumora-by-camlightshop.vercel.app)

To deploy your own version:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy with a single click

## Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password or other methods)
3. Set up Firestore Database or Realtime Database
4. Generate and add your API credentials to `.env.local`

## Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name and create an upload preset
3. Add credentials to `.env.local`

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## License

This project is created for a client and is not open for public modification without permission.

## Support

For questions or issues, please contact the project owner.

---

**Live Demo:** [Lumora by Camlightshop](https://lumora-by-camlightshop.vercel.app)