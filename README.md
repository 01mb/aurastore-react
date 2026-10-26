# 🛍️ AuraStore — Modern E-Commerce Platform

A production-ready, feature-dense e-commerce storefront built with **React**, **Vite**, and **Tailwind CSS**. Designed with a modular component-driven architecture, global state management via the Context API, and modern UX patterns.

---

## 🌟 Key Features

- **Dynamic Catalog & Filtering**:
  - Real-time search across product titles and descriptions.
  - Category pill filtering (Electronics, Wearables, Footwear, Accessories).
  - Price range slider and multi-criteria sorting (Price, Rating, Popularity).
- **Interactive Shopping Bag Drawer**:
  - Slide-over cart drawer with animated counter badges.
  - Per-item quantity modification and instant item removal.
  - Interactive coupon validation system (e.g., `SAVE20`, `FIRST10`).
  - Dynamic Free Shipping progress threshold meter.
- **Product Details & Quick View**:
  - Modal overlay with high-resolution image previews.
  - Dynamic variant pickers for colors and sizes with live active states.
  - Live stock countdown and customer review metrics.
- **Multi-Step Checkout Flow**:
  - **Step 1: Shipping**: Address details and form validation.
  - **Step 2: Payment**: Multi-option payment simulator (Cards, UPI, Net Banking, COD).
  - **Step 3: Confirmation**: Dynamic Order ID generation and comprehensive receipt summary.
- **Global Wishlist & Toast Notifications**:
  - Persistent favorite item toggling.
  - Non-blocking, animated toast feedback for cart and wishlist interactions.

---

## 🏗️ Architecture & Folder Structure

The project follows a clean separation of concerns:

```text
aurastore_ecommerce/
├── public/                  # Static media assets
├── src/
│   ├── components/
│   │   ├── cart/            # Cart drawer, items, checkout wizard
│   │   │   ├── CartDrawer.jsx
│   │   │   └── CheckoutModal.jsx
│   │   ├── common/          # Global UI elements
│   │   │   ├── PromoBanner.jsx
│   │   │   └── Toast.jsx
│   │   ├── layout/          # Application shell
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── shop/            # Storefront & catalog components
│   │       ├── FilterBar.jsx
│   │       ├── HeroBanner.jsx
│   │       ├── ProductCard.jsx
│   │       ├── ProductGrid.jsx
│   │       ├── QuickViewModal.jsx
│   │       └── ValueProps.jsx
│   ├── context/             # React Context global state providers
│   │   └── CartContext.jsx
│   ├── data/                # Mock catalog & category definitions
│   │   └── products.js
│   ├── App.jsx              # Application coordinator / entry route
│   ├── index.css            # Tailwind directives and base styles
│   └── main.jsx             # React DOM root render
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Tech Stack

- **UI Library**: [React](https://react.dev/)
- **Bundler / Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure [Node.js](https://nodejs.org/) (version 18.x or later) is installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aurastore-ecommerce.git
   cd aurastore_ecommerce
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Install Lucide icons** (if setting up fresh):
   ```bash
   npm install lucide-react
   ```

4. **Launch the development server**:
   ```bash
   npm run dev
   ```

5. **View in browser**:
   Navigate to `http://localhost:5173`.

---

## 💡 Promotional Codes for Demo

Try these promo codes inside the Cart drawer:
- **`SAVE20`**: Applies a 20% discount on cart subtotal.
- **`FIRST10`**: Applies a 10% introductory discount.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).