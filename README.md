# 🐾 PawMart - Pet Adoption & Supply Portal

A modern, community-driven platform connecting pet owners, breeders, and shops with people looking to adopt pets or purchase pet-related products.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Pages & Routes](#pages--routes)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

PawMart is a full-stack web application that facilitates pet adoption and pet product sales. It allows users to:

- **Browse** pets available for adoption and pet-related products
- **List** their pets for adoption or products for sale
- **Connect** directly with pet owners and buyers
- **Manage** their listings and orders
- **Download** order reports as PDF

## ✨ Features

### Public Features
- ✅ **Home Page** with banner carousel, categories, recent listings, and success stories
- ✅ **Browse Listings** - View all available pets and products
- ✅ **Category Filtering** - Filter by Pets, Food, Accessories, or Care Products
- ✅ **Search Functionality** - Search listings by name
- ✅ **Listing Details** - View complete information about any listing
- ✅ **User Authentication** - Login/Register with Email-Password or Google

### Private Features (After Login)
- ✅ **Add Listing** - Create new pet adoption or product listings
- ✅ **My Listings** - Manage your own listings (view, edit, delete)
- ✅ **My Orders** - View all your adoption requests and orders
- ✅ **Order Placement** - Place orders for pets or products
- ✅ **PDF Export** - Download order reports as PDF

### Bonus Features
- ✅ **Dark/Light Mode Toggle** (Ready for implementation)
- ✅ **Animations** - Smooth Framer Motion animations throughout
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Loading States** - Spinner animations during API calls
- ✅ **Toast Notifications** - User-friendly success/error messages
- ✅ **404 Page** - Custom error page

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **React Router 7.9.5** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.4.7** - Component library for Tailwind
- **Framer Motion 12.23.24** - Animation library
- **Firebase 12.5.0** - Authentication (Email/Password + Google)
- **Axios 1.13.2** - HTTP client
- **React Hot Toast 11.0.5** - Toast notifications
- **React Icons 5.5.0** - Icon library
- **jsPDF 3.0.3** - PDF generation
- **jsPDF-AutoTable 5.0.2** - PDF table generation

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB 7.0.0** - NoSQL database
- **CORS 2.8.5** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Firebase account (for authentication)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pawmart
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure MongoDB**
   - Update connection string in `server/index.js`
   - Or create `.env` file:
     ```
     MONGODB_URI=mongodb://localhost:27017
     PORT=5000
     ```

5. **Configure Firebase**
   - Set up Firebase project
   - Update `client/src/firebase/firebase.config.js`
   - Enable Email/Password and Google authentication

6. **Start the development server**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

### Listings
- `GET /listings` - Get all listings
  - Query params: `?limit=6&category=Pets&email=user@email.com`
- `GET /listings/:id` - Get single listing
- `POST /listings` - Create new listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Orders
- `GET /orders` - Get all orders
  - Query params: `?email=user@email.com`
- `POST /orders` - Create new order

## 📄 Pages & Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/pets-supplies` - Browse all listings
- `/category-filtered-product/:categoryName` - Filtered listings
- `/listing-details/:id` - Single listing details

### Private Routes (Requires Authentication)
- `/add-listing` - Create new listing
- `/my-listings` - Manage your listings
- `/my-orders` - View your orders

### Error Pages
- `/*` - 404 Not Found page

## 🗄️ Database Schema

### Collection: `listings`
```javascript
{
  _id: ObjectId,
  name: String,
  category: String, // "Pets" | "Food" | "Accessories" | "Care Products"
  price: Number, // 0 for adoption
  location: String,
  description: String,
  image: String, // URL
  email: String, // Owner's email
  date: String, // Pick up date
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `orders`
```javascript
{
  _id: ObjectId,
  productId: String, // Reference to listing _id
  productName: String,
  buyerName: String,
  email: String, // Buyer's email
  quantity: Number, // 1 for pets
  price: Number,
  address: String,
  phone: String,
  date: String, // Pick up date
  additionalNotes: String,
  createdAt: Date
}
```
### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017
PORT=5000
```

### Client (firebase.config.js)
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  // ... other config
};

**Made with ❤️ for pet lovers everywhere 🐾**
