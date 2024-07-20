import { useState, useEffect } from "react"
import TypingEffect from "./TypingEffect"
import SwitchOutput from "./TypeSwitch"
import CodeDisplay from "./CodeDisplay"
import { useAppContext } from "../contexts/AppContext"

function BlogBoard() {
    const { blog, setBlog, html, setHtml, jsx, setJsx } = useAppContext()
    const [selectedContent, setSelectedContent] = useState('text')
    const [Content, setContent] = useState(blog)

    const fetchContent = async (type) => {
        let url = ''
        let setter = null

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

        if (url && setter) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ type })
                })

                if (response.ok) {
                    const responseData = await response.json()
                    console.log(responseData)
                    setter(responseData.blog)
                    setContent(responseData.blog)
                } else {
                    const errorResponse = await response.json()
                    console.error('Failed to get response')
                    alert(errorResponse.message)
                }
            } catch (error) {
                console.error('Error:', error)
                alert('Failed due to Bad Connection. Try Again')
            }
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

    return (
        <div className="h-full w-3/5 overflow-x-hidden bg-white rounded-2xl drop-shadow-xl">
            <h2 className="pt-8 px-10 font-poppins font-semibold text-lg tracking-wide">Generated Blog</h2>
            <div className="relative w-full h-16">
                <SwitchOutput selectedContent={selectedContent} onSelect={handleSelect} />
            </div>
            <div className="py-5 h-auto w-full">
                {selectedContent === 'text' ? (
                    <TypingEffect text={Content} />
                ) : (
                    <CodeDisplay code={Content} />
                )}
            </div>
        </div>
    )
}

export default BlogBoard
