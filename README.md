# 🍳 Recipe Book Application

A modern, full-featured recipe management application built with React, Redux, and JSON Server.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Recipe Management**: Create, read, update, and delete recipes
- **Recipe Details**: View detailed recipe information including ingredients and cooking instructions
- **Search Functionality**: Easily search through recipes
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Data Persistence**: Recipes stored in JSON Server database (with localStorage fallback)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone/Download the project
2. Install dependencies:
```bash
npm install
```

### Running the Application

**Option 1: With JSON Server (Recommended)**

Open two terminals:

Terminal 1 - Start JSON Server:
```bash
npm run dev:server
```
The server runs on `http://localhost:3001`

Terminal 2 - Start the app:
```bash
npm run dev
```
The app opens on `http://localhost:5173`

**Option 2: Without JSON Server (Uses localStorage)**

Just run:
```bash
npm run dev
```

## 📱 Pages & Features

### 🏠 Home Page
- View all recipes in a beautiful grid layout
- Search recipes by name
- Click "View Details" to see full recipe information
- Edit/Delete your own recipes
- Add new recipes button

### 🔐 Login Page
- Demo credentials provided
- Email: `demo@example.com`
- Password: `demo123`

### 📝 Register Page
- Create a new account
- Join the recipe community

### 🍳 Add Recipe Page
- Add new recipes with:
  - Recipe name
  - Description
  - Image URL
  - Ingredients (comma-separated)
  - Cooking instructions
- Auto-saves to database

### 📄 Recipe Detail Page
- Full recipe information
- Ingredients list
- Step-by-step cooking instructions
- Author information
- Back to home button

### ✏️ Edit Recipe Page
- Modify your existing recipes
- Update name, description, and image

## 🎨 UI/UX Highlights

- Modern gradient design with vibrant colors
- Smooth animations and transitions
- Hover effects on interactive elements
- Responsive grid layout for recipes
- Clean, intuitive forms
- Loading states and helpful messages
- Emoji icons for better visual communication

## 🛠️ Tech Stack

- **Frontend**: React 19
- **State Management**: Redux
- **Routing**: React Router v7
- **Styling**: CSS3 with modern features
- **Backend**: JSON Server (for database)
- **Build Tool**: Vite

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Start JSON Server
npm run dev:server

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 💾 Data Storage

### With JSON Server
- Recipes are stored in `db.json`
- Persistent storage across sessions
- Syncs across all instances

### Without JSON Server
- Recipes stored in browser's localStorage
- Data persists until browser cache is cleared
- Single browser only

## 📝 Demo Data

The application comes with sample recipes:
- **Doro Wat**: Ethiopian chicken stew
- **Injera**: Ethiopian flatbread

Feel free to add, edit, and delete recipes!

## 🎯 Project Structure

```
src/
├── components/        # React components
│   ├── Home.jsx
│   ├── AddRecipe.jsx
│   ├── EditRecipe.jsx
│   ├── RecipeDetail.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Navbar.jsx
├── redux/            # State management
│   ├── actions.js
│   ├── reducers.js
│   └── store.js
├── services/         # API service layer
│   └── recipeService.js
├── App.jsx           # Main app component
└── App.css           # Global styles
```

## 🔒 Security Notes

- This is a demo application
- Passwords are stored in plain text (not recommended for production)
- Always use proper authentication in production
- Implement HTTPS for production deployments

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to extend this project with:
- Recipe ratings and reviews
- User profiles
- Recipe categories/tags
- Difficulty levels
- Cooking time estimates
- Nutritional information

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy Cooking!

Start adding your favorite recipes and sharing them with others!
