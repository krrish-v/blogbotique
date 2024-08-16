import { useState } from "react"
import Summary from "./Summary"
import Keywords from "./keywords"
import Loading from "./loading"
import Popup from "./PopUp"
import { useAppContext } from "../contexts/AppContext"

function LeftBar() {
    const [link, setLink] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const { summary, setSummary, keywords, setKeywords, selectedKeywords, setTitles } = useAppContext()
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const triggerPopup = (message) => {
        setPopupMessage(message)
        setShowPopup(true)
    }

    const GenerateSummary = async (event) => {
        event.preventDefault()

        if (!link && !file) {
            triggerPopup('Please provide a link or upload a file before proceeding.')
            return
        }

        setLoading(true)

        const formData = new FormData()

        if (file) {
            formData.append('file', file)
        } else if (link) {
            formData.append('link', link)
        }

        try {
            const response = await fetch('https://nervous-zebra-54.telebit.io/upload/url', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                setSummary(Response.summary || "Generated summary here.")
                setKeywords(Response.keywords || [])
            } else {
                const errorResponse = await response.json()
                console.error(errorResponse)
                triggerPopup('Failed to get Responce')
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup('Failed due to Bad Connection. Try Again')
        } finally {
            setLoading(false)
        }
    }

    const GenerateTitles = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8080/api/generatetitles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ summary, selectedKeywords })
            })

            if (response.ok) {
                const Response = await response.json()
                setTitles(Response.titles)
                console.log(Response)
            } else {
                const errorResponse = await response.json()
                console.error(errorResponse)
                triggerPopup('Failed to get response')
            }
        } catch (error) {
            console.error('Error:', error)
            triggerPopup('Failed due to Bad Connection. Try Again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full w-[22.5%] bg-white rounded-r-3xl shadow-xl">
            <Popup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
            <div className="relative flex flex-col justify-center w-full h-1/2 border-b-2 ">
                {summary ? (
                    <Summary />
                ) : (
                    <div>
                        <div className="px-10 pt-2 pb-2">
                            <h2 className="py-2 font-poppins font-semibold text-md tracking-wide">AI Magic</h2>
                            <p className="font-poppins text-[12px] tracking-wide">Let our AI understand your website, doc, pdf and generate a <strong>summary</strong></p>
                        </div>
                        <form method="post" className="px-10 " onSubmit={GenerateSummary}>
                            <label htmlFor="weblink" className="font-poppins font-normal text-sm tracking-wide text-left">Website Link</label>
                            <div className="flex flex-col justify-center items-center">
                                <input
                                    type="text"
                                    name="link"
                                    id="weblink"
                                    value={link}
                                    onChange={(e) => {
                                        setLink(e.target.value)
                                        setFile(null)
                                    }}
                                    className="border border-gray-300 rounded-lg px-4 py-1 w-full mt-1 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out"
                                    placeholder="https://www.blogs.ai/"
                                />
                                <div className="my-1">or</div>
                            </div>
                            <label htmlFor="Docupload" className="font-poppins font-normal text-sm tracking-wide text-left">Add a pdf, doc or a txt file</label>
                            <div className="flex flex-col justify-center ">
                                <label htmlFor="fileInput" className="mt-2 px-3 py-1 h-fit w-fit text-sm text-custom-black rounded-xl border-2 border-custom-gray hover:bg-custom-gray hover:text-white transition-colors">
                                    Choose File
                                </label>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    id="fileInput"
                                    onChange={(e) => {
                                        setFile(e.target.files[0])
                                        setLink("")
                                    }}
                                    className="hidden"
                                />
                            </div>
                            <div className=" flex flex-col justify-center items-center">
                                <button type="submit" className="mt-2 px-3 py-[2px] h-fit w-fit hover:text-custom-black rounded-xl border-2 hover:bg-custom-white border-custom-gray bg-custom-gray text-white transition-colors">Generate</button>
                            </div>
                        </form>
                    </div>
                )}
            </div >
            <div className="w-full h-1/2 flex flex-col justify-center items-center flex-grow px-10">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="relative h-full flex flex-col justify-center items-center">
                        <Keywords keywords={keywords} />
                        <button onClick={GenerateTitles} className="absolute bottom-5 px-4 py-1 text-custom-black rounded-xl border-2 border-custom-gray hover:bg-custom-gray hover:text-white transition-colors">
                            Generate Titles
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}

export default LeftBar
