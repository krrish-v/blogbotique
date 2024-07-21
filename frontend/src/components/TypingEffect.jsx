import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useAppContext } from '../contexts/AppContext'

const TypingEffect = ({ text, speed = 5 }) => {
    const [displayText, setDisplayText] = useState('')
    const { hasTyped, setHasTyped } = useAppContext()

    useEffect(() => {
        if (text && !hasTyped) {
            let index = 0
            const timer = setInterval(() => {
                setDisplayText(text.slice(0, index + 1))
                index += 1;
                if (index >= text.length) {
                    clearInterval(timer)
                    setHasTyped(true)
                }
            }, speed)

            return () => clearInterval(timer)
        }
        if (text && hasTyped) {
            setDisplayText(text)
        }
    }, [text, speed, hasTyped])

    return (
        <div className='h-full w-full overflow-y-auto px-10 pb-10 scroll-smooth scroll-container'>
            <ReactMarkdown className="whitespace-pre-wrap typing-effect">
                {displayText}
            </ReactMarkdown>
        </div>
    )
}

export default TypingEffect
