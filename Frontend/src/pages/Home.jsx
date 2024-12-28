import { useNavigate } from "react-router-dom"
import Displayimg from '/DisplayIMG.png'

function Home() {
    const navigate = useNavigate()

    const steps = [
        {
            number: "01",
            title: "Describe",
            description: "Paste your website link or any document about which you wish to write your blogs. Our AI will understand and summarize it."
        },
        {
            number: "02",
            title: "Generate",
            description: "Based on your topics, our AI will generate relevant blog titles for you. Select the title, add keywords and generate your blog!"
        },
        {
            number: "03",
            title: "Grow",
            description: "Create multiple projects, save your blogs and share it for approvals. Get the best in class dashboard to tweak your blogs!"
        }
    ]

    const Login = () => {
        navigate('/Login')
    }

    const Signin = () => {
        navigate('/Signup')
    }


    return (
        <div className=" bg-custom-white h-full w-full">
            <nav className="relative p-10 flex justify-center items-center">
                <h1 className="absolute left-10  font-poppins font-extrabold text-2xl text-custom-black tracking-tight">Scribz</h1>
                <div className=" space-x-16">
                    <button className=" font-poppins text-lg font-thin text-custom-gray">Home</button>
                    <button className=" font-poppins text-lg font-thin text-custom-gray">About</button>
                    <button className=" font-poppins text-lg font-thin text-custom-gray">Pricing</button>
                </div>
                <div className=" absolute right-10 space-x-2">
                    <button onClick={Login} className=" px-4 py-1 rounded-xl bg-white border-2 border-black text-custom-gray hover:scale-105 transition-transform">Login</button>
                    <button onClick={Signin} className=" px-4 py-1 rounded-xl bg-custom-gray border-2 border-black text-white hover:scale-105 transition-transform">signup</button>
                </div>
            </nav>
            <div className="relative p-10 flex flex-col justify-center items-center">
                <h1 className="py-3 font-poppins font-extrabold text-5xl tracking-normal">Transform Your Workflow</h1>
                <h5 className="py-3 font-poppins font-thin text-3xl tracking-normal">Create and Ship Blogs 10X Faster using AI</h5>
                <button onClick={Login} className="my-8 px-4 py-2 rounded-xl bg-custom-gray border-2 border-black text-white hover:scale-105 transition-transform">Get Started</button>
            </div>
            <div className="pb-20 w-full h-auto flex flex-col justify-center items-center">
                <img src={Displayimg} alt="Scribz" className=" w-3/5 h-auto border-4 border-black rounded-3xl" />
                <p className="mt-6 py-4 font-poppins text-3xl"><strong>For</strong> startups who wish to jump into seo</p>
                <p className=" py-4 font-poppins text-3xl"><strong>For</strong> agencies to improve thier efficiency</p>
                <p className=" py-4 font-poppins text-3xl"> <strong>For</strong> freelancers to level up thier productivity</p>
            </div>
            <div className="w-full h-auto bg-white flex flex-col items-center py-16">
                <h1 className="text-5xl font-extralight text-center mb-16">How It Works</h1>
                <div className="w-full max-w-[1000px] flex flex-col items-center space-y-12">
                    {steps.map((step, index) => (
                        <div key={index} className="grid grid-cols-1 w-4/5 gap-6 md:grid-cols-2 items-start">
                            <div className=" flex flex-col items-end pr-8">
                                <h3 className="text-3xl font-bold">{step.number}</h3>
                                <h3 className="text-6xl font-bold mb-2 tracking-wide">{step.title}</h3>
                            </div>
                            <div className="flex flex-col">

                                <p className="text-xl">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={Login} className="my-8 px-4 py-2 rounded-xl bg-custom-gray border-2 border-black text-white hover:scale-105 transition-transform">
                    Get started
                </button>
            </div>
            <footer className="relative bg-black h-96 w-full flex flex-col justify-center items-center space-y-10">
                <div className="h-2/3 flex flex-row justify-around w-full">
                    <div className="flex flex-col space-y-5">
                        <a href="" className="text-white text-xl font-poppins">Home</a>
                        <a href="" className="text-white text-xl font-poppins">About</a>
                        <a href="" className="text-white text-xl font-poppins">How it Works</a>
                        <a href="" className="text-white text-xl font-poppins">Pricing</a>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <a href="" className="text-white text-xl font-poppins">Socials</a>
                        <div className="flex space-x-2">
                            <li className="bx bxl-youtube text-white text-5xl"></li>
                            <li className="bx bxl-instagram text-white text-5xl"></li>
                            <li className="bx bxl-linkedin text-white text-5xl"></li>
                        </div>
                    </div>
                </div>
                <h1 className="text-white">2024. ALL rights reserved.</h1>
            </footer>

        </div>
    )
}

export default Home