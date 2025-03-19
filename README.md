# 🚀 Generative AI for Etsy - Frontend

## 🌟 Overview

This is the **frontend** for the AI-powered Etsy content generator. The application provides an intuitive **Next.js** interface for generating:

- 🔍 **SEO Tags**
- 📝 **Product Descriptions**
- 📢 **Marketing Content**

It includes **theme switching**, a detailed guide on how to use the AI tool, and dedicated pages for generating each type of content.

---

## 🏗️ Tech Stack

- ⚛️ **Next.js** - Modern React framework
- 🎨 **Tailwind CSS** - Styling and layout
- 🌗 **Dark Mode Support** - Theme switcher
- 🔄 **API Integration** - Connects with FastAPI backend

---

## 📂 Project Structure

```
frontend/
├── app/                # Main application pages
│   ├── components/     # Core UI components
│   ├── marketing-content/  # Marketing content generation page
│   ├── product-description/ # Product description generation page
│   ├── seo-tags/            # SEO tag generation page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Layout structure
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
│   ├── ui/             # UI elements (buttons, inputs, tooltips, etc.)
│   └── theme-provider.tsx # Theme switcher
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets (logos, images)
├── styles/             # CSS styles
├── next.config.mjs     # Next.js configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🛠️ Installation & Setup

### **1️⃣ Install Dependencies**
```bash
npm install
```

### **2️⃣ Run the Development Server**
```bash
npm run dev
```
This will start the frontend at **`http://localhost:3000`**.

---

## 🚀 Features

✅ **SEO-Optimized Product Descriptions**  
✅ **AI-Generated Marketing Content**  
✅ **Customizable UI with Theme Switching**  
✅ **Responsive and User-Friendly Interface**  

---

## 🔧 Configuration

- Make sure your **FastAPI backend** is running and configured correctly.
- Update the **API endpoint** in `services/api.ts` if needed.

---

## 🎉 Contributing

Feel free to contribute! Open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.
