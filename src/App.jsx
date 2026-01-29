import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import store from './redux/store'
import { setUser } from './redux/actions'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AddRecipe from './components/AddRecipe'
import EditRecipe from './components/EditRecipe'
import RecipeDetail from './components/RecipeDetail'
import './App.css'

function AppContent() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)))
    }
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/add" element={user ? <AddRecipe /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={user ? <EditRecipe /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
