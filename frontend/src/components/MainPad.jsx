import TitleBar from "./TitleBar"
import { useAppContext } from "../contexts/AppContext"
import TypingEffect from "./TypingEffect"

function MainPad() {
    const { blog, setBlog } = useAppContext()

    return (
        <div className=" w-[75.5%] bg-white h-full rounded-l-3xl shadow-lg flex">
            <TitleBar />
            <TypingEffect text={blog} />
        </div>
    )
}

export default MainPad