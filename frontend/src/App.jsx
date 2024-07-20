import NavBar from "./components/NavBar"
import LeftBar from "./components/LeftBar"
import { AppProvider } from '../src/contexts/AppContext'

function App() {

  return (
    <AppProvider>
      <div className=" bg-custom-white h-screen w-screen">
        <NavBar />
        <div className="pt-2 h-[90%] w-full">
          <LeftBar />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
