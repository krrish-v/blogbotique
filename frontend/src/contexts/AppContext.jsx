import React, { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [summary, setSummary] = useState("")
    const [keywords, setKeywords] = useState([])

    return (
        <AppContext.Provider value={{ summary, setSummary, keywords, setKeywords }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
