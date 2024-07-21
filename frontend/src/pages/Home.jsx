import { useNavigate } from "react-router-dom"
import Displayimg from '/DisplayIMG.png'

function Home() {
    const navigate = useNavigate()

    const Dashboard = () => {
        navigate('/Dashboard')
    }


    return (
        <div className=" bg-custom-white h-full w-full">
            <nav className="relative p-10 flex justify-center items-center">
                <h1 className="absolute left-10  font-poppins font-extrabold text-2xl text-custom-black tracking-tight">scribbs.ai</h1>
                <div className=" space-x-16">
                    <button className=" font-poppins text-lg font-thin text-custom-gray">home</button>
                    <button className=" font-poppins text-lg font-thin text-custom-gray">about</button>
                    <button className=" font-poppins text-lg font-thin text-custom-gray">pricing</button>
                </div>
                <div className=" absolute right-10 space-x-2">
                    <button className=" px-4 py-1 rounded-xl bg-white border-2 border-black text-custom-gray ">Login</button>
                    <button className=" px-4 py-1 rounded-xl bg-custom-gray border-2 border-black text-white ">signup</button>
                </div>
            </nav>
            <div className="relative p-10 flex flex-col justify-center items-center">
                <h1 className="py-3 font-poppins font-extrabold text-5xl tracking-normal">Transform Your Workflow</h1>
                <h5 className="py-3 font-poppins font-thin text-3xl tracking-normal">Create and Ship Blogs 10X Faster using AI</h5>
                <button onClick={Dashboard} className="my-8 px-4 py-2 rounded-xl bg-custom-gray border-2 border-black text-white ">Get Started</button>
            </div>
            <div className="pb-20 w-full h-auto flex flex-col justify-center items-center">
                <img src={Displayimg} alt="Scribbs.ai" className=" w-3/5 h-auto border-4 border-black rounded-3xl" />
                <p className="mt-6 py-4 font-poppins text-3xl"><strong>For</strong> startups who wish to jump into seo</p>
                <p className=" py-4 font-poppins text-3xl"><strong>For</strong> agencies to improve thier efficiency</p>
                <p className=" py-4 font-poppins text-3xl"> <strong>For</strong> freelancers to level up thier productivity</p>
            </div>
            <div className=" w-full h-auto bg-white shadow-lg flex flex-col justify-center items-center">
                <h1 className="py-10 font-poppins font-extrabold text-5xl tracking-normal">How it Works</h1>
                <div className=" pb-16 flex justify-center space-x-16 w-2/5 ">
                    <h1 className="font-poppins text-xl font-semibold">1. Get titles from our AI </h1>
                    <h1 className="font-poppins text-xl font-semibold">2. Choose your favourite LLM</h1>
                    <h1 className="font-poppins text-xl font-semibold">3. Generate and ship</h1>
                </div>
                <button onClick={Dashboard} className="my-8 px-4 py-2 rounded-xl bg-custom-gray border-2 border-black text-white ">Get Started</button>
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