import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import LeftBar from "../components/LeftBar"
import MainPad from "../components/MainPad"
import LogIn from "./Login"
import Popup from "../components/PopUp"
import { useAuthContext } from "../contexts/AuthContext"
import { useState } from "react"
import { useAppContext } from "../contexts/AppContext"

function Dashboard() {
    const { isAuthenticated } = useAuthContext()
    const { SelectedProject } = useAppContext()
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const navigate = useNavigate()

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleDashboardClick = () => {
        navigate('/dashboard')
    }

    const handleBlogsClick = async () => {
        const token = localStorage.getItem('authToken')
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8080/api/getprojectsblogs', {
                method: 'GET',
                headers: {
                    'x-access-token': token
                },
                credentials: 'include',
            })
            if (response.ok) {
                const Response = await response.json()
                console.log(Response.projectblogs)
                navigate('/MyBlogs', {
                    state: {
                        ProjectBlogs: Response.projectblogs,
                        ProjectName: SelectedProject.projectName
                    }
                })
            } else {
                console.error(Response.message)
                triggerPopup(Response.message)
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup("Failed to due to bad connection")
        } finally {
            setLoading(false)
        }
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
        <div className=" bg-custom-white h-screen w-screen overflow-hidden min-w-[1000px]">
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            <NavBar buttons={buttons} />
            <div className="mt-16 pt-2 h-[92%] w-full flex gap-6">
                <LeftBar />
                < MainPad />
            </div>
        </div>
    )
}

export default Dashboard