
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from './loading'

const TypingEffect = ({ text, speed = 20 }) => {
    const [displayText, setDisplayText] = React.useState('')

    React.useEffect(() => {
        if (text) {
            let index = 0
            const timer = setInterval(() => {
                setDisplayText(text.slice(0, index + 1))
                index += 1
                if (index >= text.length) clearInterval(timer)
            }, speed)

            return () => clearInterval(timer)
        }
    }, [text, speed])

    return (
        <div className='h-full w-full overflow-y-auto px-10 pb-10  scroll-container'>
            <ReactMarkdown className="whitespace-pre-wrap typing-effect">
                {displayText}
            </ReactMarkdown>
        </div>
    )
}

export default TypingEffect
