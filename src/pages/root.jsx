import React from "react"
import { Outlet, useNavigation } from "react-router"
import Footer from "../components/Footer"

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <>
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
    </>
  )
}