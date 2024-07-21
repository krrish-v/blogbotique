import React, { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [summary, setSummary] = useState("")
    const [keywords, setKeywords] = useState([])
    const [selectedKeywords, setSelectedKeywords] = useState([])
    const [titles, setTitles] = useState([])
    const [blog, setBlog] = useState("")
    const [html, setHtml] = useState("")
    const [jsx, setJsx] = useState("")
    const [tags, setTags] = useState(["Personal", "Technology", "Food", "Fashion", "Creative", "Health"])
    const [hasTyped, setHasTyped] = useState(false)

    return (
        <AppContext.Provider value={{ summary, setSummary, keywords, setKeywords, selectedKeywords, setSelectedKeywords, titles, setTitles, blog, setBlog, html, setHtml, jsx, setJsx, tags, setTags, hasTyped, setHasTyped }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
