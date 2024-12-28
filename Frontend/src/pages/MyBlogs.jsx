import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsShareFill, BsDownload } from "react-icons/bs"
import { Document, Packer, Paragraph, TextRun } from "docx"
import { saveAs } from "file-saver"
import Loading from "../components/loading"
import NavBar from "../components/NavBar"
import Popup from "../components/PopUp"
import { useAppContext } from "../contexts/AppContext"

function MyBlogs() {
    const [ProjectBlogs, setProjectBlogs] = useState([])
    const { setBlog, blog, SelectedProject, setSelectedBlogTitle, setTitles } = useAppContext()
    const [loading, setLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        FetchBlogs()
    }, [])

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const Download = (title, blogContent) => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [new TextRun({ text: title, bold: true, size: 24 })],
                        }),
                        new Paragraph({
                            children: [new TextRun({ text: blogContent, size: 20 })],
                        }),
                    ],
                },
            ],
        })

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${title}.docx`)
        })
    }

    const createDocxAndShare = async (title, blogContent) => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [new TextRun({ text: title, bold: true, size: 24 })],
                        }),
                        new Paragraph({
                            children: [new TextRun({ text: blogContent, size: 20 })],
                        }),
                    ],
                },
            ],
        })

        try {
            const blob = await Packer.toBlob(doc);
            const file = new File([blob], `${title}.docx`, { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: title,
                    text: 'Check out this blog content!',
                })
                triggerPopup('Content shared successfully!')
            } else {
                triggerPopup('Web Share API is not supported or file sharing is not possible.')
            }
        } catch (error) {
            console.error('Error sharing content:', error)
            triggerPopup(`Error sharing content: ${error.message}`)
        }
    }

    // {
    //     "project_id": "", "titles": [], "data": { }, "user_id": "")
    //     { "<title1>": { "initial": "<blog1>", "<enhance_prompt>": "<blog2>"....}, "<title2>": { "initial": "<blog1>", "<enhance_prompt>": "<blog2>".....}.....}
    // http://127.0.0.1:8000/


    const FetchBlogs = async () => {
        const token = localStorage.getItem('authToken')
        try {
            const response = await fetch('http://127.0.0.1:8000/projects/saved/allblogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ project_id: SelectedProject.projectId, user_id: token })
            })
            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                if (Response.titles === null && Response.all_data === null) {
                    handleDashboardClick()
                } else {
                    const blogsArray = []

                    for (const title in Response.all_data.data) {
                        if (Response.all_data.data.hasOwnProperty(title)) {
                            const firstPrompt = Object.keys(Response.all_data.data[title])[0]
                            const firstBlog = Response.all_data.data[title][firstPrompt]
                            blogsArray.push({ title: title, blog: firstBlog })
                        }
                    }

                    setProjectBlogs(blogsArray)
                    setBlog(prevDetails => ({
                        ...prevDetails,
                        titles: Response.all_data.titles,
                        data: Response.all_data.data
                    }))
                }
            } else {
                console.error(Response.message)
                triggerPopup(Response.message)
                setProjectBlogs([])
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup("Failed to due to bad connection")
            setProjectBlogs([])
        } finally {
            setLoading(false)
        }
    }

    console.log(ProjectBlogs)

    const handleHomeClick = () => {
        navigate('/MyProjects')
    }

    const handleDashboardClick = () => {
        setBlog(prevDetails => ({
            ...prevDetails,
            data: null
        }))
        setTimeout(() => {
            navigate('/dashboard')
        }, 300)
    }

    const buttons = [
        { label: SelectedProject.projectName, className: "text-custom-gray font-poppins text-xl font-semibold absolute left-1/2 transform -translate-x-1/2" },
        { label: 'Home', onClick: handleHomeClick, className: "text-custom-gray font-poppins text-lg font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: 'Saved blogs', className: "text-custom-gray font-poppins text-xl font-semibold" },
        { label: 'New Blog', onClick: handleDashboardClick, className: "text-custom-gray font-poppins text-xl font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" }
    ]

    const cutContent = (content, wordLimit = 20) => {
        if (!content) {
            return "Content not available"
        }
        const words = content.split(' ')
        if (words.length > wordLimit) {
            const cutWords = words.slice(0, wordLimit).join(' ')
            return `${cutWords}...`
        }
        return content
    }


    const onSelectBlog = (title) => {
        setSelectedBlogTitle(title)
        setTitles(blog.titles)
        setTimeout(() => {
            navigate('/dashboard')
        }, 300)
    }

    return (
        <div>
            <NavBar buttons={buttons} />
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            {loading ? (
                <div className="w-full h-auto flex flex-col justify-center overflow-hidden">
                    <Loading />
                </div>
            ) : (
                <div className="mt-16 px-10 md:px-28 w-full h-auto py-10 space-y-8">
                    {ProjectBlogs.length > 0 ? (
                        ProjectBlogs.map((item, index) => {
                            const { title, blog } = item
                            return (
                                <div key={index} className="relative h-20 md:h-28 w-full border-2 border-custom-black rounded-xl flex flex-row hover:scale-95 transition-transform">
                                    <button
                                        onClick={() => onSelectBlog(title)}
                                        className="h-full w-10/12 flex flex-col justify-center"
                                    >
                                        <h1 className="px-6 font-poppins font-semibold text-xl tracking-wide text-left">
                                            {title}
                                        </h1>
                                        <p className="px-6 pt-2 font-poppins font-thin text-md text-left tracking-wide">
                                            {cutContent(blog, 10)}
                                        </p>
                                    </button>
                                    <div className="h-full w-2/12 flex justify-center text-xl space-x-4">
                                        <button onClick={() => Download(title, blog)} >
                                            <BsDownload />
                                        </button>
                                        <button onClick={() => createDocxAndShare(title, blog)} >
                                            <BsShareFill />
                                        </button>
                                    </div>

                                </div>
                            )
                        })
                    ) : (
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="font-poppins font-normal text-2xl tracking-wide">
                                No Blogs Available!
                            </h1>
                            <button onClick={handleDashboardClick} className="mt-10 px-5 py-2 flex justify-center items-center bg-custom-gray text-white text-xl font-bold font-poppins rounded-lg hover:scale-75 transition-transform">Create Blog</button>
                        </div>
                    )}
                </div>
            )
            }
        </div >
    )
}

export default MyBlogs