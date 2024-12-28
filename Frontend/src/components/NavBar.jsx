import { useNavigate } from "react-router-dom"
import Dropdown from "./Dropdown"

function NavBar({ buttons }) {
    const navigate = useNavigate()

    return (
        <div className="absolute z-10 min-w-[1000px] top-0 bg-white h-16 w-full rounded-b-xl drop-shadow-lg flex items-center justify-between px-10">
            <h1 className="font-poppins font-semibold text-xl tracking-wide">Scribz</h1>
            <div className="flex justify-center items-center h-full space-x-5">
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
