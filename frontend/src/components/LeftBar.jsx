import { useState } from "react"
import Summary from "./Summary"
import Keywords from "./keywords"
import Loading from "./loading"
import { useAppContext } from "../contexts/AppContext"

function LeftBar() {
    const [link, setLink] = useState("")
    const [loading, setLoading] = useState(false)
    const { summary, setSummary, keywords, setKeywords, selectedKeywords, setTitles } = useAppContext()

    const GiveLink = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('https://nervous-zebra-54.telebit.io/upload/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ link })
            })

            if (response.ok) {
                const Response = await response.json()
                console.log(Response)
                setSummary("ASG Eye Hospitals is a network of super specialty eye hospitals in India, providing a comprehensive range of services for Retina, Cataract, Cornea, LASIK, Oculoplasty, Glaucoma, IC Lens, Squint, and Pediatric ophthalmology treatments and surgeries.")
                setKeywords(Response.keywords || [])
            } else {
                const errorResponse = await response.json()
                console.error(errorResponse)
                alert('Failed to get response')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Failed due to Bad Connection. Try Again')
        } finally {
            setLoading(false)
        }
    }

    const GenerateTitles = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('https://nervous-zebra-54.telebit.io/api/generatetitles', {
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
                alert('Failed to get response')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Failed due to Bad Connection. Try Again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full w-[22.5%] bg-white rounded-r-3xl shadow-xl">
            <div className="px-10 pt-8 pb-2">
                <h2 className="py-2 font-poppins font-semibold text-md tracking-wide">AI Magic</h2>
                <p className="font-poppins text-[12px] tracking-wide">Let our AI understand your website and generate relevant blog titles for you</p>
            </div>
            <form method="post" className="px-10 " onSubmit={GiveLink}>
                <label htmlFor="weblink" className="font-poppins font-normal text-sm tracking-wide text-left">Website Link</label>
                <div className="flex flex-col justify-center items-center">
                    <input
                        type="text"
                        name="link"
                        id="weblink"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-1 w-full mt-1 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 ease-in-out"
                        placeholder="https://www.blogs.ai/"
                        required
                    />
                    <button type="submit" className="mt-2 px-3 py-[2px] text-custom-black rounded-xl border-2 border-custom-gray hover:bg-custom-gray hover:text-white transition-colors">Go</button>
                </div>
            </form>
            <div className=" flex flex-col justify-center items-center flex-grow px-10">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="h-1/2 w-full flex flex-col">
                        <div className={summary ? "h-full flex flex-col justify-between items-center" : "hidden"}>
                            <Summary />
                            <Keywords keywords={keywords} />
                            <button onClick={GenerateTitles} className=" mt-2 px-4 py-1 text-custom-black rounded-xl border-2 border-custom-gray hover:bg-custom-gray hover:text-white transition-colors">
                                Generate Titles
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default LeftBar
