import { useState, useEffect } from "react"
import TypingEffect from "./TypingEffect"
import SwitchOutput from "./TypeSwitch"
import CodeDisplay from "./CodeDisplay"
import { useAppContext } from "../contexts/AppContext"

function BlogBoard() {
    const { blog, setBlog, html, setHtml, jsx, setJsx } = useAppContext()
    const [selectedContent, setSelectedContent] = useState('text')
    const [Content, setContent] = useState(blog)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')

    const fetchContent = async (type) => {
        switch (type) {
            case 'text':
                setContent(blog)
                return
            case 'html':
                if (!html) {
                    try {
                        const response = await fetch("http://127.0.0.1:8080/api/GenerateBlogHtml", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({ type })
                        })

                        if (response.ok) {
                            const responseData = await response.json()
                            setHtml(responseData.html)
                            setContent(responseData.html)
                        } else {
                            const errorResponse = await response.json()
                            console.error('Failed to get response')
                            alert(errorResponse.message)
                        }
                    } catch (error) {
                        console.error('Error:', error)
                        alert('Failed due to Bad Connection. Try Again')
                    }
                } else {
                    setContent(html)
                }
                break

            case 'jsx':
                if (!jsx) {
                    try {
                        const response = await fetch("http://127.0.0.1:8080/api/GenerateBlogJsx", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({ type })
                        })

                        if (response.ok) {
                            const responseData = await response.json()
                            setJsx(responseData.jsx)
                            setContent(responseData.jsx)
                        } else {
                            const errorResponse = await response.json()
                            console.error('Failed to get response')
                            alert(errorResponse.message)
                        }
                    } catch (error) {
                        console.error('Error:', error)
                        alert('Failed due to Bad Connection. Try Again')
                    }
                } else {
                    setContent(jsx)
                    return
                }
                break
            default:
                setContent(blog)
                return
        }
    }

    useEffect(() => {
        if (selectedContent === 'text') {
            setContent(blog)
        } else {
            fetchContent(selectedContent)
        }
    }, [selectedContent, blog, html, jsx])

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

    const toggleEdit = () => {
        if (isEditing) {
            if (selectedContent === 'text') {
                setBlog(editContent)
            } else if (selectedContent === 'html') {
                setHtml(editContent)
            } else if (selectedContent === 'jsx') {
                setJsx(editContent)
            }
            setContent(editContent)
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
        <div className="h-full w-3/5 overflow-x-hidden bg-white rounded-2xl drop-shadow-md">
            <h2 className="pt-8 px-10 font-poppins font-semibold text-lg tracking-wide">Generated Blog</h2>
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
                        Copy<i class="bx bx-copy-alt px-1 text-center"></i>
                    </button>
                </div>
            </div>
            <div className="py-5 h-auto w-full">
                {isEditing ? (
                    <textarea
                        value={editContent}
                        onChange={handleContentChange}
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg"
                    />
                ) : selectedContent === 'text' ? (
                    <TypingEffect text={Content} />
                ) : (
                    <CodeDisplay code={Content} />
                )}
            </div>
        </div>
    )
}

export default BlogBoard