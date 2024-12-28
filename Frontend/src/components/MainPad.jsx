import TitleBar from "./TitleBar"
import BlogBoard from "./BlogBoard"

function MainPad() {
    return (
        <div className=" w-[75.5%] bg-white h-full rounded-l-3xl shadow-lg flex">
            <TitleBar />
            <BlogBoard />
        </div>
    )
}

export default MainPad