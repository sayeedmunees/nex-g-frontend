# NEX-G Ecommerce Website

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, full-stack ecommerce platform built with the React and Json server as part of my web development course.

• **[Live Demo]** •

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Learning Outcomes](#learning-outcomes)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

## 🎯 About

NEX-G is a complete ecommerce solution built from scratch using the MERN stack (MongoDB, Express.js, React, Node.js). This project was developed as part of my MERN stack course to demonstrate full-stack development capabilities, from database design to frontend user experience.

The application features a modern, responsive design with real-time cart management, product catalog, wishlist functionality, and an intuitive user interface.

## ✨ Features

### 🛍️ Core Shopping Features
- **Product Catalog** - Browse products with grid layout
- **Product Details** - Comprehensive product pages with image galleries
- **Shopping Cart** - Add, update, and manage cart items
- **Wishlist** - Save favorite products for later
- **Stock Management** - Real-time inventory validation

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach works on all devices
- **Modern UI** - Clean, professional interface with Tailwind CSS
- **Toast Notifications** - Non-intrusive feedback system
- **Loading States** - Smooth loading indicators
- **Error Handling** - Graceful error management

### 🔧 Technical Features
- **RESTful APIs** - Clean API architecture
- **State Management** - Efficient React state handling
- **Component Reusability** - Modular component design
- **Real-time Updates** - Instant cart and wishlist updates

## 🛠️ Tech Stack

### Frontend
- **React** - Component-based UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **VS Code** - Code editor
- **Postman** - API testing
- **Git** - Version control
- **npm** - Package management

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sayeedmunees/nex-g-frontend
   cd nex-g-frontend

   # Install dependencies
   npm install

   # Start the development server
   npm start
   ```

2. **Access the Application**
   - Frontend: http://localhost:5173

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products?category=:category` | Get products by category |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:id` | Update cart item |
| DELETE | `/api/cart/:id` | Remove from cart |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Get wishlist items |
| POST | `/api/wishlist` | Add to wishlist |
| DELETE | `/api/wishlist/:id` | Remove from wishlist |

## 📁 Project Structure

```
nexg-ecommerce/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       │   ├── ProductCard.jsx
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── Pnf.jsx (404 page)
│       ├── pages/         # Page components
│       │   ├── HomePage.jsx
│       │   ├── ViewPage.jsx
│       │   └── ...
│       ├── services/      # API services
│       │   └── allAPI.js
│       └── App.js         # Main app component
├── server/                # Node.js backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Server entry point
└── README.md
```

## 🎓 Learning Outcomes

This project significantly enhanced my skills in:

### Frontend Development
- **React Hooks** - useState, useEffect, useParams
- **Component Architecture** - Reusable and maintainable components
- **State Management** - Efficient state handling without external libraries
- **React Router** - Single Page Application navigation
- **API Integration** - Connecting frontend with backend services
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Backend Development
- **RESTful API Design** - Clean and structured API endpoints
- **MongoDB & Mongoose** - Database modeling and operations
- **CRUD Operations** - Create, Read, Update, Delete functionality
- **Middleware Implementation** - Error handling and request processing
- **API Documentation** - Clear endpoint definitions

### Full-Stack Integration
- **Data Flow Management** - Efficient data transfer between frontend and backend
- **Error Handling** - Comprehensive error management across the stack
- **Performance Optimization** - Optimized API calls and rendering
- **Project Architecture** - Scalable and maintainable code structure

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication and authorization
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Order management system
- [ ] Product reviews and ratings
- [ ] Advanced search and filtering
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Product recommendations

### Technical Improvements
- [ ] Implement Redux for state management
- [ ] Add testing (Jest, React Testing Library)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Performance optimization
- [ ] PWA features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@sayeedmunees](https://github.com/sayeedmunees)
- LinkedIn: [Sayeed Munees](https://linkedin.com/in/sayeedmunees)


## 🙏 Acknowledgments

- MERN stack documentation and community support
- Course instructors and mentors
- Open source libraries and tools
- Design inspiration from modern ecommerce platforms

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

*Built with ❤️ as part of my MERN stack learning journey*

</div>

[Live Demo]: https://nex-g-iota.vercel.app/
