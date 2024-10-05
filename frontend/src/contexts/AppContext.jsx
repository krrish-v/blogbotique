import React, { createContext, useState, useEffect, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [summary, setSummary] = useState(() => {
        const savedSummary = sessionStorage.getItem('summary')
        return savedSummary ? savedSummary : ""
    })

    const [keywords, setKeywords] = useState(() => {
        const savedKeywords = sessionStorage.getItem('keywords')
        return savedKeywords ? JSON.parse(savedKeywords) : []
    })

    const [selectedKeywords, setSelectedKeywords] = useState(() => {
        const savedSelectedKeywords = sessionStorage.getItem('selectedKeywords')
        return savedSelectedKeywords ? JSON.parse(savedSelectedKeywords) : []
    })

    const [titles, setTitles] = useState(() => {
        const savedTitles = sessionStorage.getItem('titles')
        return savedTitles ? JSON.parse(savedTitles) : []
    })

    const [blog, setBlog] = useState(() => {
        const savedBlog = sessionStorage.getItem('blog')
        return savedBlog ? JSON.parse(savedBlog) : {
            project_id: "",
            titles: [],
            data: {},
            user_id: ""
        }
    })

    const [html, setHtml] = useState(() => {
        const savedHtml = sessionStorage.getItem('html')
        return savedHtml ? savedHtml : ""
    })

    const [jsx, setJsx] = useState(() => {
        const savedJsx = sessionStorage.getItem('jsx')
        return savedJsx ? savedJsx : ""
    })

    const [tags, setTags] = useState(() => {
        const savedTags = sessionStorage.getItem('tags')
        return savedTags ? JSON.parse(savedTags) : []
    })

    const [hasTyped, setHasTyped] = useState(() => {
        const savedHasTyped = sessionStorage.getItem('hasTyped')
        return savedHasTyped ? JSON.parse(savedHasTyped) : false
    })

    const [projects, setProjects] = useState(() => {
        const savedProjects = sessionStorage.getItem('projects')
        return savedProjects ? JSON.parse(savedProjects) : []
    })

    const [SelectedProject, setSelectedProject] = useState(() => {
        const savedSelectedProject = sessionStorage.getItem('SelectedProject')
        return savedSelectedProject ? JSON.parse(savedSelectedProject) : { projectName: '', projectId: '', summary }
    })

    const [SelectedBlogTitle, setSelectedBlogTitle] = useState(() => {
        const savedSelectedProject = sessionStorage.getItem('SelectedProject')
        return savedSelectedProject ? JSON.parse(savedSelectedProject) : {}
    })

    useEffect(() => {
        sessionStorage.setItem('summary', summary)
    }, [summary])

    useEffect(() => {
        sessionStorage.setItem('keywords', JSON.stringify(keywords))
    }, [keywords])

    useEffect(() => {
        sessionStorage.setItem('selectedKeywords', JSON.stringify(selectedKeywords))
    }, [selectedKeywords])

    useEffect(() => {
        sessionStorage.setItem('titles', JSON.stringify(titles))
    }, [titles])

    useEffect(() => {
        sessionStorage.setItem('blog', JSON.stringify(blog))
    }, [blog])

    useEffect(() => {
        sessionStorage.setItem('html', html)
    }, [html])

    useEffect(() => {
        sessionStorage.setItem('jsx', jsx)
    }, [jsx])

    useEffect(() => {
        sessionStorage.setItem('tags', JSON.stringify(tags))
    }, [tags])

    useEffect(() => {
        sessionStorage.setItem('hasTyped', JSON.stringify(hasTyped))
    }, [hasTyped])

    useEffect(() => {
        sessionStorage.setItem('projects', JSON.stringify(projects))
    }, [projects])

    useEffect(() => {
        sessionStorage.setItem('SelectedProject', JSON.stringify(SelectedProject))
    }, [SelectedProject])

    useEffect(() => {
        sessionStorage.setItem('SelectedBlogTitle', JSON.stringify(SelectedBlogTitle))
    }, [SelectedBlogTitle])

    return (
        <AppContext.Provider value={{
            summary, setSummary,
            keywords, setKeywords,
            selectedKeywords, setSelectedKeywords,
            titles, setTitles,
            blog, setBlog,
            html, setHtml,
            jsx, setJsx,
            tags, setTags,
            hasTyped, setHasTyped,
            projects, setProjects,
            SelectedProject, setSelectedProject,
            SelectedBlogTitle, setSelectedBlogTitle
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
