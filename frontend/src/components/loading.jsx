import { XlviLoader } from "react-awesome-loaders"

function Loading() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <XlviLoader
                boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
                style={{ marginBottom: "20px" }}
                desktopSize={"60px"}
                mobileSize={"80px"}
            />
        </div>
    )
}

export default Loading
