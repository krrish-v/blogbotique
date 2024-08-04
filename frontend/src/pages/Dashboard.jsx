import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import LeftBar from "../components/LeftBar"
import MainPad from "../components/MainPad"
import LogIn from "./Login"
import { useAuthContext } from "../contexts/AuthContext"

function Dashboard() {
    const { isAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleDashboardClick = () => {
        navigate('/dashboard')
    }

    const buttons = [
        { label: 'Home', onClick: handleHomeClick, className: "text-custom-gray font-poppins text-lg font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: 'Dashboard', onClick: handleDashboardClick, className: "text-custom-gray font-poppins text-xl font-semibold" }
    ]

    if (!isAuthenticated) {
        return (
            <LogIn />
        )
    }

    return (
        <div className=" bg-custom-white h-screen w-screen overflow-hidden">
            <NavBar buttons={buttons} />
            <div className="mt-16 pt-2 h-[90%] w-full flex gap-6">
                <LeftBar />
                < MainPad />
            </div>
        </div>
    )
}

export default Dashboard