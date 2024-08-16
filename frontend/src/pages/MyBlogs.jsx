import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Loading from "../components/loading"
import NavBar from "../components/NavBar"
import { useAppContext } from "../contexts/AppContext"

function MyBlogs() {
    const location = useLocation()
    const { ProjectBlogs, ProjectName } = location.state || {}
    const { setBlog } = useAppContext()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/')
    }

    const handleDashboardClick = () => {
        navigate('/dashboard')
    }

    const buttons = [
        { label: ProjectName, className: "text-custom-gray font-poppins text-xl font-semibold absolute left-1/2 transform -translate-x-1/2" },
        { label: 'Home', onClick: handleHomeClick, className: "text-custom-gray font-poppins text-lg font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: 'Saved blogs', className: "text-custom-gray font-poppins text-xl font-semibold" },
        { label: 'Dashboard', onClick: handleDashboardClick, className: "text-custom-gray font-poppins text-xl font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" }
    ]

    const cutContent = (content, wordLimit = 20) => {
        const words = content.split(' ');
        if (words.length > wordLimit) {
            const cutWords = words.slice(0, wordLimit).join(' ')
            return `${cutWords}...`
        }
        return content
    }

    const onSelectBlog = (blog, projectName, blogId) => {
        setLoading(true)
        setBlog({ blogId, ProjectName: projectName, blog })
        setTimeout(() => {
            navigate('/dashboard')
        }, 300)
    }

    return (
        <div>
            <NavBar buttons={buttons} />
            {loading ? (
                <div className="w-full h-auto flex flex-col justify-center overflow-hidden">
                    <Loading />
                </div>
            ) : (
                <div className="mt-16 px-10 md:px-28 w-full h-auto py-10 space-y-8">
                    {ProjectBlogs.length > 0 ? (
                        ProjectBlogs.map((blog) => (
                            <button
                                key={blog.id}
                                onClick={() => onSelectBlog(blog.blog, ProjectName, blog.id)}
                                className="relative h-20 md:h-28 w-full border-2 border-custom-black rounded-xl flex flex-col justify-center hover:scale-95 transition-transform"
                            >
                                <h1 className="px-6 font-poppins font-semibold text-2xl tracking-wide">
                                    {blog.title}
                                </h1>
                                <p className="px-6 font-poppins font-thin text-md tracking-wide">
                                    {cutContent(blog.blog, 10)}
                                </p>
                            </button>
                        ))
                    ) : (
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="font-poppins font-normal text-2xl tracking-wide">
                                No Blogs Available!
                            </h1>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default MyBlogs