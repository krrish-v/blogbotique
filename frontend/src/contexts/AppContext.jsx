import React, { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [summary, setSummary] = useState("")
    const [keywords, setKeywords] = useState([])
    const [selectedKeywords, setSelectedKeywords] = useState([])
    const [titles, setTitles] = useState([])
    const [blog, setBlog] = useState("")

    return (
        <AppContext.Provider value={{ summary, setSummary, keywords, setKeywords, selectedKeywords, setSelectedKeywords, titles, setTitles, blog, setBlog }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
