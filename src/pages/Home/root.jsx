import { Outlet, useNavigation } from "react-router"
import NavBarRoot from "../../components/root/NavBarRoot"

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <>
      <main>
        <NavBarRoot />
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