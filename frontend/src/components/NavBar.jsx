import { useNavigate } from "react-router-dom"
import Dropdown from "./Dropdown"

function NavBar({ buttons }) {
    const navigate = useNavigate()

    return (
        <div className="absolute z-10 top-0 bg-white h-16 w-full rounded-b-xl drop-shadow-lg flex items-center">
            <h1 className="font-poppins font-semibold text-xl pl-10 tracking-wide">Scribbs.AI</h1>
            <div className="absolute right-4 flex justify-center items-center h-full w-fit space-x-5">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        className={button.className}
                    >
                        {button.label}
                    </button>
                ))}
                <div className="h-10 w-10 rounded-full bg-blue-800 flex justify-center items-center">
                    <Dropdown />
                </div>
            </div>
        </div>
    )
}

export default NavBar
