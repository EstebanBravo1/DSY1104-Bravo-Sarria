import React from "react"
import { Outlet, useNavigation } from "react-router"
import Header from "../components/Header"

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <>
      <main>
        <Header />
        {isLoading ? (
          <div className="loading-container">
            <p>Cargando...</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  )
}