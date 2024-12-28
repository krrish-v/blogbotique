import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"

function Welcome() {
    const navigate = useNavigate()

    const handleMyProjectsclick = () => {
        navigate('/MyProjects')
    }

    const handleHomeClick = () => {
        navigate('/MyProjects')
    }


    const buttons = [
        { label: 'Home', onClick: handleHomeClick, className: "text-custom-gray font-poppins text-lg font-thin hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" },
        { label: 'Get Started', onClick: handleMyProjectsclick, className: "text-custom-gray font-poppins text-xl font-semibold hover:text-sky-300 hover:drop-shadow-md shadow-sky-800 transition-all" }
    ]

    return (
        <div className="h-svh w-screen flex flex-col justify-center items-center">
            <NavBar buttons={buttons} />
            <h1 className="mt-10 py-1 font-poppins font-extrabold text-3xl tracking-normal"> Welcome to Scribz</h1>
            <p className=" font-poppins font-thin text-md tracking-wide"> Lets Create amazing blogs</p>
            <div className="mt-6 h-3/5 w-1/4 min-w-40 px-10 border-2 border-custom-gray rounded-3xl drop-shadow-xl flex flex-col items-center">
                <h1 className="mt-10 py-1 font-poppins font-extrabold text-xl tracking-normal text-center"> Watch a tutorial</h1>
                <button className="mt-10 w-4/5 h-1/3 bg-gray-100 rounded-2xl flex justify-center items-center group" ><box-icon type='logo' name='youtube' size="40px"></box-icon></button>
                <p className="p-5 font-poppins text-center">How to create a amazing blog using Scribz</p>
                <p className="absolute bottom-4 right-8 font-poppins text-center">5 mins</p>
            </div>
            <button onClick={handleMyProjectsclick} className=" mt-5 font-poppins underline underline-offset-4 tracking-widest text-gray-800 hover:tracking-tight hover:decoration-cyan-700 transition-all ">Skip and go to Home</button>
        </div>
    )
}

export default Welcome