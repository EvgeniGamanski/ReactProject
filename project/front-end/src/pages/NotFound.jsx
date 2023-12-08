import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const NotFound = () => {
    return (
        <div>
            <Navbar/>
            <div className="m-[150px] mx-[650px]">
            <h1 className="text-8xl">404</h1>
            <h1 className="text-3xl text-bold">Not Found!</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default NotFound;