import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import LeftBar from "../components/LeftBar"
import MainPad from "../components/MainPad"
import LogIn from "./Login"
import { useAuthContext } from "../contexts/AuthContext"
import { useAppContext } from "../contexts/AppContext"

function Dashboard() {
    const { isAuthenticated } = useAuthContext()
    const { SelectedProject } = useAppContext()
    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/MyProjects')
    }

    const handleDashboardClick = () => {
        navigate('/dashboard')
    }

    const handleBlogsClick = () => {
        navigate('/MyBlogs')
    }


    const buttons = [
        { label: SelectedProject.projectName, id: SelectedProject.projectId, className: "text-custom-gray font-poppins text-xl font-semibold absolute left-1/2 transform -translate-x-1/2" },
        { label: 'Home', onClick: handleHomeClick, className: "text-custom-gray font-poppins text-lg font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: 'Saved blogs', onClick: handleBlogsClick, className: "text-custom-gray font-poppins text-xl font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: 'Dashboard', onClick: handleDashboardClick, className: "text-custom-gray font-poppins text-xl font-semibold" }
    ]

    if (!isAuthenticated) {
        return (
            <LogIn />
        )
    }

    return (
        <div className=" bg-custom-white h-svh w-screen overflow-hidden min-w-[1000px]">
            <NavBar buttons={buttons} />
            <div className="mt-16 pt-2 h-[92%] w-full flex gap-6">
                <LeftBar />
                < MainPad />
            </div>
        </div>
    )
}

export default Dashboard