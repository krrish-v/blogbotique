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

    const generateProjectID = (company, projectName) => {
        let combinedString = company + projectName

        combinedString = combinedString.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

        if (combinedString.length > 8) {
            return combinedString.substring(0, 8)
        } else {
            return combinedString.padEnd(8, 'X')
        }
    }

    const addtoMyproj = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('authToken')
        const Pid = generateProjectID(company, projectName)
        const formData = { id: token, project: projectName, company: company, project_id: Pid }
        console.log(formData)
        setLoading(true)
        try {
            const response = await fetch('https://tender-snake-4.telebit.io/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                // setNumOfBlogs(Response.blogsnumber)
                // setNumOfProj(Response.projects.length)
                // setProjects(Response.projects)
                closeAddProject()
                window.location.reload()
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