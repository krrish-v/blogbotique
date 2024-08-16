import { useState } from "react"
import { useAppContext } from "../contexts/AppContext"
import Loading from "../components/loading"
import Popup from "./PopUp"

function AddProject({ closeAddProject }) {
    const { setProjects, setNumOfProj, setNumOfBlogs } = useAppContext()
    const [projectName, setProjectName] = useState("")
    const [company, setCompany] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const addtoMyproj = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('authToken')
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8080/api/addproject', {
                method: 'POST',
                headers: {
                    'x-access-token': token
                },
                credentials: 'include',
                body: JSON.stringify({ projectName, company })
            })
            if (response.ok) {
                const Response = await response.json()
                setNumOfBlogs(Response.blogsnumber)
                setNumOfProj(Response.projects.length)
                setProjects(Response.projects)
                closeAddProject()
            } else {
                console.error(Response.message)
                triggerPopup("Failed to add the project! Please try again")
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup("Failed to add the project due to bad Connection!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed my-4 py-10 px-5 md:p-20 right-0 top-14 z-10 w-1/3 h-[87%] bg-white border-2 border-custom-gray rounded-l-3xl ">
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            <h1 className=" font-poppins text-3xl font-bold text-center">Add Project</h1>
            <button onClick={closeAddProject} className="absolute top-3 right-3">✗</button>
            {loading ? (
                <Loading />
            ) : (
                <form onSubmit={addtoMyproj} className="py-10 px-5 w-full space-y-8 flex flex-col items-center">
                    <div className="flex flex-col w-full">
                        <label htmlFor="ProjectName" className="text-lg font-poppins font-semibold py-2">Project Name</label>
                        <input
                            type="text"
                            className="border-2 border-custom-gray px-4 py-2 rounded-lg"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="Company" className="text-lg font-poppins font-semibold py-2">Company</label>
                        <input
                            type="text"
                            className="border-2 border-custom-gray px-4 py-2 rounded-lg"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <button className="my-8 px-8 py-2 w-fit rounded-xl bg-custom-gray border-2 border-black text-white hover:scale-105 transition-transform">
                        Create
                    </button>
                </form>
            )}
        </div>
    )
}

export default AddProject