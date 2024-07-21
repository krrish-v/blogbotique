import { useNavigate } from "react-router-dom"

function NavBar() {

    const navigate = useNavigate()

    const Home = () => {
        navigate('/')
    }

    return (
        <div className=" bg-white h-16 w-full rounded-b-xl drop-shadow-lg flex items-center">
            <h1 className=" font-poppins font-semibold text-xl pl-10 tracking-wide">Scribbs.AI</h1>
            <div className="absolute right-4 flex justify-center items-center h-full w-[20%] space-x-5">
                <button onClick={Home} className=" text-custom-gray font-poppins text-md text-end font-normal">Home</button>
                <button className=" text-custom-gray font-poppins text-xl font-bold">Dashboard</button>
                <div className=" h-10 w-10 rounded-full bg-blue-800 flex justify-center items-center">
                    <h1 className=" text-white font-poppins text-xl font-bold">P</h1>
                </div>
            </div>
        </div>
    )
}

export default NavBar