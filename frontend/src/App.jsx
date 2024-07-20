import NavBar from "./components/NavBar"
import LeftBar from "./components/LeftBar"
import MainPad from "./components/MainPad"
import { AppProvider } from '../src/contexts/AppContext'

function App() {

  return (
    <AppProvider>
      <div className=" bg-custom-white h-screen w-screen">
        <NavBar />
        <div className="pt-2 h-[90%] w-full flex gap-6">
          <LeftBar />
          < MainPad />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
