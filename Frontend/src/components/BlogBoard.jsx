import { useState, useEffect } from "react"
import { BsCaretLeftFill, BsCaretRightFill, BsCheck2, BsCopy, BsFillPencilFill, BsSaveFill } from "react-icons/bs"
import TypingEffect from "./TypingEffect"
// import SwitchOutput from "./TypeSwitch"
import CodeDisplay from "./CodeDisplay"
import Loading from "./loading"
import Popup from "./PopUp"
import { useAppContext } from "../contexts/AppContext"

function BlogBoard() {
    const { blog, setBlog, html, setHtml, jsx, setJsx, setHasTyped, SelectedBlogTitle } = useAppContext()
    const [custom_prompt, setPrompt] = useState("")
    const [selectedContent, setSelectedContent] = useState('text')
    const [currentBlogPrompt, setCurrentBlogPrompt] = useState("")
    const [Content, setContent] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    console.log(SelectedBlogTitle)

    useEffect(() => {
        if (SelectedBlogTitle && blog.data && blog.data[SelectedBlogTitle]) {
            const prompts = Object.keys(blog.data[SelectedBlogTitle])
            if (prompts.length > 0) {
                const lastPrompt = prompts[prompts.length - 1]
                setCurrentBlogPrompt(lastPrompt)
                setContent(blog.data[SelectedBlogTitle][lastPrompt])
            }
        }
    }, [SelectedBlogTitle, blog])

    useEffect(() => {
        if (SelectedBlogTitle && currentBlogPrompt && blog.data && blog.data[SelectedBlogTitle]) {
            setContent(blog.data[SelectedBlogTitle][currentBlogPrompt])
        }
    }, [currentBlogPrompt, SelectedBlogTitle, blog])

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }


    //  *** to be used in Later versions for switching into text - html - jsx ***

    // const fetchContent = async (type) => {
    //     switch (type) {
    //         case 'text':
    //             setContent(blog.blog)
    //             return
    //         case 'html':
    //             if (!html) {
    //                 setLoading(true)
    //                 try {
    //                     const response = await fetch("http://127.0.0.1:8000/api/getcode", {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         },
    //                         credentials: 'include',
    //                         body: JSON.stringify({ blog })
    //                     })

    //                     if (response.ok) {
    //                         const responseData = await response.json()
    //                         console.log(responseData)
    //                         setHtml(responseData.code)
    //                         setContent(responseData.code)
    //                     } else {
    //                         const errorResponse = await response.json()
    //                         console.error('Failed to get response')
    //                         triggerPopup(errorResponse.message)
    //                     }
    //                 } catch (error) {
    //                     console.error('Error:', error)
    //                     triggerPopup('Failed due to Bad Connection. Try Again')
    //                 } finally {
    //                     setLoading(false)
    //                 }
    //             } else {
    //                 setContent(html)
    //             }
    //             break

    //         case 'jsx':
    //             if (!jsx) {
    //                 setLoading(true)
    //                 try {
    //                     const response = await fetch("http://127.0.0.1:8000/api/getcode", {
    //                         method: 'POST',
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         },
    //                         credentials: 'include',
    //                         body: JSON.stringify({ blog })
    //                     })

    //                     if (response.ok) {
    //                         const responseData = await response.json()
    //                         console.log(responseData)
    //                         setJsx(responseData.code)
    //                         setContent(responseData.code)
    //                     } else {
    //                         const errorResponse = await response.json()
    //                         console.error('Failed to get response')
    //                         triggerPopup(errorResponse.message)
    //                     }
    //                 } catch (error) {
    //                     console.error('Error:', error)
    //                     triggerPopup('Failed due to Bad Connection. Try Again')
    //                 } finally {
    //                     setLoading(false)
    //                 }
    //             } else {
    //                 setContent(jsx)
    //                 return
    //             }
    //             break
    //         default:
    //             setContent(blog.blog)
    //             return
    //     }
    // }

    // const handleSelect = (type) => {
    //     setSelectedContent(type)
    // }

    const Enchance = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/projects/api/enhanceblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blog: blog.data[SelectedBlogTitle][currentBlogPrompt], custom_prompt })
            })

            if (response.ok) {
                const Response = await response.json()
                console.log(Response.blog)
                setBlog(prevBlogs => ({
                    ...prevBlogs,
                    data: {
                        ...prevBlogs.data,
                        [SelectedBlogTitle]: {
                            ...prevBlogs.data[SelectedBlogTitle],
                            [custom_prompt]: Response.blog
                        }
                    }
                }))
                setCurrentBlogPrompt(custom_prompt)
                setContent(Response.blog)
                setHasTyped(false)
            } else {
                const errorResponse = await response.json()
                console.error(errorResponse.message)
                triggerPopup('Failed to get response')
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup('Failed due to Bad Connection. Try Again')
        } finally {
            setLoading(false)
        }
    }

    const SaveBlog = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('http://127.0.0.1:8000/projects/blogs/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blog)
            })

            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                triggerPopup('Blog saved successfully!')
            } else {
                console.error('Error:', Response.message)
                triggerPopup('Failed to save blog.')
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup('Error occurred while saving blog.')
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(Content)
            .then(() => {
                triggerPopup('Content copied to clipboard!')
            })
            .catch(err => {
                console.error('Failed to copy:', err)
                triggerPopup('Failed to copy content.')
            })
    }

    const toggleEdit = async () => {
        if (isEditing) {
            try {
                const updatedBlogs = { ...blog, [currentBlogPrompt]: editContent }
                setBlog(updatedBlogs)
                setContent(editContent)
                setHasTyped(false)
                setIsEditing(false)
            } catch (error) {
                triggerPopup('Failed to Save the Changes. Try Again')
            }
        } else {
            setIsEditing(true)
        }
        setLoading(false)
    }

    console.log(blog)

    const handleBlogSwitch = (direction) => {
        const prompts = Object.keys(blog.data[SelectedBlogTitle])
        const currentIndex = prompts.indexOf(currentBlogPrompt)

        let newIndex
        if (direction === "prev") {
            newIndex = (currentIndex - 1 + prompts.length) % prompts.length
        } else if (direction === "next") {
            newIndex = (currentIndex + 1) % prompts.length
        }

        const newPrompt = prompts[newIndex]
        setCurrentBlogPrompt(newPrompt)
        // setContent(blog.data[SelectedBlogTitle][newPrompt])
    }

    const handleContentChange = (e) => {
        setEditContent(e.target.value)
    }

    useEffect(() => {
        setEditContent(Content)
    }, [Content])

    return (
        <div className="h-full w-3/5 px-2 overflow-x-hidden bg-white rounded-2xl drop-shadow-md">
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            <div className="relative w-full h-12">
                <h2 className="mt-5 py-1 px-4 font-poppins font-semibold text-lg tracking-wide">Generated Blog</h2>
                {/* <SwitchOutput selectedContent={selectedContent} onSelect={handleSelect} /> [ ** switch to toggle between text, html, jsx ** ] */}
                <div className="absolute right-4 top-2 space-x-2">
                    <button
                        onClick={toggleEdit}
                        className={`px-4 py-2 rounded-md ${isEditing ? 'bg-cyan-700 text-custom-white' : 'bg-custom-white text-custom-gray'}  font-poppins font-semibold hover:bg-custom-gray hover:text-custom-white transition-colors `}
                    >
                        {isEditing ? <BsSaveFill /> : <BsFillPencilFill />}
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="  px-4 py-2 bg-custom-white text-custom-gray font-poppins font-semibold  rounded-md hover:bg-custom-gray hover:text-custom-white transition-colors"
                    >
                        <BsCopy />
                    </button>
                    <button
                        onClick={SaveBlog}
                        className="px-4 py-2 rounded-md bg-cyan-700 text-custom-white font-poppins font-semibold hover:bg-custom-gray hover:text-custom-white transition-colors"
                    >
                        <BsCheck2 />
                    </button>
                </div>
            </div>
            <div className="py-5 h-[68%] w-full border-8 border-custom-white rounded-3xl">
                {loading ? (
                    <Loading />
                ) : isEditing ? (
                    <textarea
                        value={editContent}
                        onChange={handleContentChange}
                        className="w-full h-full p-4 border border-gray-300 rounded-lg"
                    />
                ) : Content ? (
                    selectedContent === 'text' ? (
                        <TypingEffect text={Content} />
                    ) : (
                        <div className="h-full w-full">
                            <CodeDisplay code={Content} />
                        </div>
                    )
                ) : (
                    <p className=" text-center font-poppins font-lg font-semibold ">Generate your blog </p>
                )}
            </div>
            <div className="flex justify-center pt-2 space-x-3">
                <button
                    onClick={() => handleBlogSwitch("prev")}
                    className="px-1 rounded text-gray-700 hover:scale-125"
                >
                    <BsCaretLeftFill />
                </button>
                <button
                    onClick={() => handleBlogSwitch("next")}
                    className="px-1 rounded text-gray-700 hover:scale-125"
                >
                    <BsCaretRightFill />
                </button>
            </div>
            <div className=" relative h-fit w-full flex flex-col justify-center items-center">
                <button className="absolute flex items-center top-2 left-4 text-sm font-poppins text-center space-x-1"><box-icon type='solid' name='magic-wand' size="sm" animation="tada"></box-icon><p>AI enchance</p></button>
                <form
                    onSubmit={Enchance}
                    className=" mt-10 mx-2 flex justify-center items-center space-x-3 bg-white border-2  p-1 rounded-xl w-full mb-4"
                >
                    <input
                        type="text"
                        id="prompt"
                        name="prompt"
                        value={custom_prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a Prompt"
                        className=" appearance-none rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button
                        type="submit"
                        className="w-fit absolute right-0 bg-custom-gray hover:bg-blue-700 font-poppins text-white text-sm font-semibold py-2 px-3 rounded-xl focus:outline-none focus:shadow-outline"
                    >
                        Generate Again
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BlogBoard
