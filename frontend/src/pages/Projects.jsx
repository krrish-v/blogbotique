import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import AddProject from "../components/AddProject"
import Loading from "../components/loading"
import { useAppContext } from "../contexts/AppContext"
import { useAuthContext } from "../contexts/AuthContext"
import LogIn from "./Login"
import Popup from "../components/PopUp"

function ProjectsPage() {
    const { isAuthenticated } = useAuthContext()
    const { projects, setProjects, setSelectedProject, setSummary, setTitles, setBlog, setKeywords } = useAppContext()
    const [NumOfProj, setNumOfProj] = useState(0)
    const [NumOfBlogs, setNumOfBlogs] = useState(0)
    const [fetchError, setFetchError] = useState(false)
    const [showAddProject, setShowAddProject] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const handleHomeClick = () => {
        navigate('/MyProjects')
    }

    const handleAddProject = () => {
        setShowAddProject(!showAddProject)
    }

    const buttons = [
        { label: 'Home', onClick: handleHomeClick, className: "text-custom-gray font-poppins text-lg font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: <box-icon name='plus' color="white" size="30px"></box-icon>, onClick: handleAddProject, className: " flex justify-center items-center bg-custom-gray h-8 w-8 font-poppins rounded-sm hover:scale-90 transition-transform" }
    ]

    // console.log(projects)

    const FetchProjects = async () => {
        // console.log("function called")
        setLoading(true)
        const token = localStorage.getItem('authToken')
        setBlog(prevDetails => ({
            ...prevDetails,
            user_id: token,
        }))

        try {
            const response = await fetch('http://127.0.0.1:8000/projects/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: token }),
            })

            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                // setNumOfBlogs(Response.blogsnumber)
                const projectsData = Response.projects
                const projectIDs = Object.keys(projectsData)
                const Projects = projectIDs.map(id => ({
                    id: id,
                    company: projectsData[id].company,
                    projectName: projectsData[id].project_name,
                    titles: projectsData[id].titles,
                }))

                setNumOfProj(projectIDs.length)
                setProjects(Projects)
            } else {
                console.log("Request failed.")
                console.log("Status code:", Response.status)
                triggerPopup(Response.message)
                setFetchError(true)
            }
        } catch (error) {
            console.error("Error:", error)
            triggerPopup('Error:', error)
            setFetchError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        FetchProjects()
        console.log("fetching")
    }, [])

    const toggleAddProject = () => {
        setShowAddProject(!showAddProject)
    }

    const closeAddProject = () => {
        setShowAddProject(false)
    }

    const OpenProject = (projectName, projectId, summary) => {
        setSelectedProject({ projectName, projectId })

        setSummary(summary)
        setTitles(null)
        setKeywords(null)
        setBlog(prevDetails => ({
            ...prevDetails,
            project_id: projectId,
        }))

        setTimeout(() => {
            navigate('/MyBlogs')
        }, 300)
    }

    if (fetchError) {
        return (
            <div className="relative h-svh w-screen overflow-hidden">
                <NavBar buttons={buttons} />
                <div className="mt-32 ">
                    <div className="flex justify-center items-center h-full w-full">
                        <h1 className="pl-10 md:pl-28 px-10 font-poppins font-normal text-2xl tracking-wide">
                            Failed to Fetch your Projects! Please Try Again
                        </h1>
                    </div>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <LogIn />
        )
    }

    return (
        <div className="h-svh w-full">
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            <NavBar buttons={buttons} />
            {showAddProject && <AddProject closeAddProject={closeAddProject} />}
            {loading ? (
                <div className="w-full h-auto flex flex-col justify-center overflow-hidden">
                    <Loading />
                </div>
            ) : (
                <>
                    {/* <div className="mt-20 w-full h-2/6 flex flex-col justify-center space-y-4">
                        <h1 className=" pl-10 md:pl-28 px-10 font-poppins font-normal text-2xl tracking-wide">Total Projects : {NumOfProj}</h1>
                        <h1 className=" pl-10 md:pl-28 px-10 font-poppins font-normal text-2xl tracking-wide">Total saved blogs : {NumOfBlogs}</h1>
                    </div> */}
                    <div className="px-10 mt-20 md:px-28 w-full h-auto py-10 space-y-8 flex flex-wrap">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <button onClick={() => OpenProject(project.projectName, project.id, project.summary)}
                                    key={project.id}
                                    className="relative h-20 md:h-28 w-full border-2 border-custom-black rounded-xl flex flex-col justify-center hover:scale-95 transition-transform">
                                    <h1 className=" px-6 font-poppins font-semibold text-2xl tracking-wide">{project.projectName}</h1>
                                    <p className=" px-6 font-poppins font-thin text-md tracking-wide">{project.company}</p>
                                    <p className=" absolute bottom-3 right-4 px-6 font-poppins font-thin text-sm tracking-wide">Last Worked at yesterday {project.status}</p>
                                </button>
                            ))
                        ) : (
                            <div className="w-full flex flex-col justify-center items-center">
                                <h1 className="font-poppins font-normal text-2xl tracking-wide">
                                    Create Your First Project!
                                </h1>
                                <button onClick={toggleAddProject} className="mt-10 flex justify-center items-center bg-custom-gray h-28 w-28 font-poppins rounded-lg hover:scale-75 transition-transform"><box-icon name='plus' color="white" size="92px"></box-icon></button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div >
    )
}

export default ProjectsPage