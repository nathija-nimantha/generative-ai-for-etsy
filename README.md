Here's the `README.md` file in proper markdown format:  

```markdown
# 🛍️ E-Commerce AI Agent

This project is an AI-powered tool for generating **SEO tags, product descriptions, and marketing content** for Etsy and other e-commerce platforms. It features a **FastAPI backend** and a **Next.js frontend**, integrating the **Groq API** for AI-driven content generation.

---

## 🚀 Features

- ✅ **AI-Powered Text Generation** using Groq API.
- 🎨 **User-Friendly Frontend** built with Next.js.
- ⚡ **FastAPI Backend** for seamless API handling.
- 🌎 **SEO Optimization** to boost product visibility.
- 🔄 **Dark/Light Theme Switching** for UI customization.

---

## 📂 Project Structure

### 🖥️ Backend (FastAPI)
```plaintext
backend/
├── config.py               # Configuration settings
├── main.py                 # FastAPI application
├── models.py               # Pydantic models for API requests
├── requirements.txt        # Dependencies for backend
├── services.py             # AI content generation logic
└── test_main.http          # API testing file
```

### 🌐 Frontend (Next.js)
```plaintext
frontend/
├── app/
│   ├── components/
│   │   ├── mode-toggle.tsx
│   │   ├── navbar.tsx
│   ├── marketing-content/
│   │   └── page.tsx
│   ├── product-description/
│   │   └── page.tsx
│   ├── seo-tags/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   └── toggle.tsx
│   └── theme-provider.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles/
│   └── globals.css
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Installation Guide

### 🔧 Backend Setup (FastAPI)
1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/ecommerce-ai-agent.git
   cd ecommerce-ai-agent/backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

4. **Set up API key**:
   - Create a `.env` file and add your **GROQ_API_KEY**.

5. **Run the server**:
   ```sh
   uvicorn main:app --reload
   ```

6. **Test API endpoints**:
   - Open `test_main.http` in an API client like **VS Code REST Client** or **Postman**.

---

### 🌐 Frontend Setup (Next.js)
1. **Navigate to the frontend folder**:
   ```sh
   cd ../frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

4. **Open the application**:
   - Go to `http://localhost:3000` in your browser.

---

## 🛠️ API Endpoints

### ➤ Generate Product Description
- **POST** `/generate_description`
- **Request:**
  ```json
  {
    "name": "Smart Watch",
    "category": "Electronics",
    "details": "Waterproof, Bluetooth 5.0, Heart Rate Monitor"
  }
  ```
- **Response:**
  ```json
  {
    "description": "Discover the Smart Watch - a waterproof, Bluetooth 5.0-enabled device with a built-in heart rate monitor..."
  }
  ```

### ➤ Generate SEO Tags
- **POST** `/generate_tags`
- **Request:**
  ```json
  {
    "keywords": ["smart watch", "fitness tracker", "wearable tech"]
  }
  ```
- **Response:**
  ```json
  {
    "tags": "#SmartWatch #FitnessTracker #WearableTech"
  }
  ```

### ➤ Generate Marketing Content
- **POST** `/generate_marketing_content`
- **Request:**
  ```json
  {
    "audience": "Tech Enthusiasts",
    "platform": "Instagram"
  }
  ```
- **Response:**
  ```json
  {
    "marketing_content": "Upgrade your fitness journey with the latest Smart Watch! #WearableTech"
  }
  ```

---

## 🔒 Security & Best Practices

- **Store API keys securely** in environment variables.
- **Enable CORS** to prevent unauthorized API access.
- **Validate input data** using Pydantic models.
- **Use HTTPS** for secure API communication.

---

## 🎯 Future Enhancements

- 🔹 **AI Model Tuning** - Improve accuracy and relevance.
- 🔹 **Multilingual Support** - Generate content in multiple languages.
- 🔹 **Integration with E-Commerce Platforms** - Shopify, WooCommerce, etc.
- 🔹 **Voice Input Support** - Generate content via speech commands.

---

## 📜 License
This project is **open-source** and available under the [MIT License](LICENSE).
