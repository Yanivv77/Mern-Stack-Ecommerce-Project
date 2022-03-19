import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './components/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
