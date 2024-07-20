
import React from 'react'
import ReactMarkdown from 'react-markdown'

const TypingEffect = ({ text, speed = 20 }) => {
    const [displayText, setDisplayText] = React.useState('')

    React.useEffect(() => {
        let index = 0
        const timer = setInterval(() => {
            setDisplayText(text.slice(0, index + 1))
            index += 1
            if (index >= text.length) clearInterval(timer)
        }, speed)

        return () => clearInterval(timer)
    }, [text, speed])

    return (
        <div className='h-full w-3/5 overflow-y-auto px-10 py-10'>
            <ReactMarkdown className="whitespace-pre-wrap typing-effect">
                {displayText}
            </ReactMarkdown>
        </div>
    )
}

export default TypingEffect
