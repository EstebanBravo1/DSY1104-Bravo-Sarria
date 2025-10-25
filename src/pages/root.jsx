import React from "react"
import { Outlet, useNavigation } from "react-router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { CartProvider } from "../context/CartContext"

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <CartProvider>
      <Header />
      <main>
        {isLoading ? (
          <div className="loading-container">
            <p>Cargando...</p>
          </div>
        ) : (
          <Outlet />
        )}
        <Footer />
      </main>
    </CartProvider>
  )
}