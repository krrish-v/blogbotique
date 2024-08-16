import { useState, useEffect } from "react"
import TypingEffect from "./TypingEffect"
import SwitchOutput from "./TypeSwitch"
import CodeDisplay from "./CodeDisplay"
import Loading from "./loading"
import Popup from "./PopUp"
import { useAppContext } from "../contexts/AppContext"

function BlogBoard() {
    const { blog, setBlog, html, setHtml, jsx, setJsx, setHasTyped } = useAppContext()
    const [custom_prompt, setPrompt] = useState("")
    const [selectedContent, setSelectedContent] = useState('text')
    const [Content, setContent] = useState(blog.blog)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    useEffect(() => {
        const updateContent = () => {
            if (selectedContent === 'text') {
                setContent(blog.blog)
            } else {
                fetchContent(selectedContent)
            }
        }
        updateContent()
    }, [selectedContent, blog, html, jsx])


    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const fetchContent = async (type) => {
        switch (type) {
            case 'text':
                setContent(blog.blog)
                return
            case 'html':
                if (!html) {
                    setLoading(true)
                    try {
                        const response = await fetch("https://nervous-zebra-54.telebit.io/api/getcode", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({ blog })
                        })

                        if (response.ok) {
                            const responseData = await response.json()
                            console.log(responseData)
                            setHtml(responseData.code)
                            setContent(responseData.code)
                        } else {
                            const errorResponse = await response.json()
                            console.error('Failed to get response')
                            triggerPopup(errorResponse.message)
                        }
                    } catch (error) {
                        console.error('Error:', error)
                        triggerPopup('Failed due to Bad Connection. Try Again')
                    } finally {
                        setLoading(false)
                    }
                } else {
                    setContent(html)
                }
                break

            case 'jsx':
                if (!jsx) {
                    setLoading(true)
                    try {
                        const response = await fetch("https://nervous-zebra-54.telebit.io/api/getcode", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({ blog })
                        })

                        if (response.ok) {
                            const responseData = await response.json()
                            console.log(responseData)
                            setJsx(responseData.code)
                            setContent(responseData.code)
                        } else {
                            const errorResponse = await response.json()
                            console.error('Failed to get response')
                            triggerPopup(errorResponse.message)
                        }
                    } catch (error) {
                        console.error('Error:', error)
                        triggerPopup('Failed due to Bad Connection. Try Again')
                    } finally {
                        setLoading(false)
                    }
                } else {
                    setContent(jsx)
                    return
                }
                break
            default:
                setContent(blog.blog)
                return
        }
    }

    const GivePrompt = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('https://nervous-zebra-54.telebit.io/api/enhanceblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ blog, custom_prompt })
            })

            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                setBlog(prevState => ({
                    ...prevState,
                    blog: Response.blog
                }))
                setContent(blog)
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

    const Enchance = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('https://nervous-zebra-54.telebit.io/api/enhanceblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ blog, custom_prompt })
            })

            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                setBlog(prevState => ({
                    ...prevState,
                    blog: Response.blog
                }))
                setContent(blog)
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

    const handleSelect = (type) => {
        setSelectedContent(type)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(Content)
            .then(() => {
                alert('Content copied to clipboard!')
            })
            .catch(err => {
                console.error('Failed to copy:', err)
                alert('Failed to copy content.')
            })
    }

    const toggleEdit = async () => {
        if (isEditing) {
            try {
                setLoading(true)
                let updatedBlog = { ...blog }

                if (selectedContent === 'text') {
                    updatedBlog.blog = editContent
                } else if (selectedContent === 'html') {
                    setHtml(editContent)
                } else if (selectedContent === 'jsx') {
                    setJsx(editContent)
                }

                const response = await fetch('http://127.0.0.1:8080/api/saveblog', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(updatedBlog)
                });

                if (response.ok) {
                    const Response = await response.json()
                    setBlog(updatedBlog)
                    setContent(editContent)
                    setHasTyped(false)
                } else {
                    const errorResponse = await response.json()
                    triggerPopup('Failed to Save the Blog. Try Again')
                }
            } catch (error) {
                triggerPopup('Failed due to Bad Connection. Try Again')
            } finally {
                setLoading(false)
            }
        }
        setIsEditing(!isEditing)
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
            <h2 className="py-1 px-4 font-poppins font-semibold text-lg tracking-wide">Generated Blog</h2>
            <div className="relative w-full h-16">
                <SwitchOutput selectedContent={selectedContent} onSelect={handleSelect} />
                <div className="absolute right-4 top-2 space-x-2">
                    <button
                        onClick={toggleEdit}
                        className={`pl-4 py-2 rounded-md ${isEditing ? 'bg-cyan-700 text-custom-white' : 'bg-custom-white text-custom-gray'}  font-poppins font-semibold hover:bg-custom-gray hover:text-custom-white transition-colors `}
                    >
                        {isEditing ? 'Save' : 'Edit'}<li className="bx bx-pencil px-1 text-lg"></li>
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="  px-4 py-2 bg-custom-white text-custom-gray font-poppins font-semibold  rounded-md hover:bg-custom-gray hover:text-custom-white transition-colors"
                    >
                        Copy<i className="bx bx-copy-alt px-1 text-center"></i>
                    </button>
                </div>
            </div>
            <div className="py-5 h-[65%] w-full  border-8 border-custom-white rounded-3xl ">
                {loading ? (
                    <Loading />
                ) : (
                    isEditing ? (
                        <textarea
                            value={editContent}
                            onChange={handleContentChange}
                            className="w-full h-full p-4 border border-gray-300 rounded-lg"
                        />
                    ) : selectedContent === 'text' ? (
                        <TypingEffect text={Content} />
                    ) : (
                        <div className="h-full w-full">
                            <CodeDisplay code={Content} />
                        </div>
                    )
                )}
            </div>
            <div className=" relative h-fit w-full flex flex-col justify-center items-center">
                <button onClick={Enchance} className="absolute flex items-center top-2 left-4 text-sm font-poppins text-center space-x-1"><box-icon type='solid' name='magic-wand' size="sm" animation="tada"></box-icon><p>AI enchance</p></button>
                <form
                    onSubmit={GivePrompt}
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
