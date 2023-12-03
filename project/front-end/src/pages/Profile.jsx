import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { IF, URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
    const param=useParams().id
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {user, setUser}=useContext(UserContext)
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    const [updated,setUpdated]=useState(false)
    const [noResults,setNoResults]=useState(false)

    const fetchProfile=async ()=>{
        try {
            const res=await axios.get(URL+"/api/users/"+user._id)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)

        } catch (error) {
            console.log(error)
        }
    }

    // const handleUserUpdate=async()=>{
    //     setUpdated(false)
    //     try{
    //         const res=await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
    //         // console.log(res.data)
    //         setUpdated(true)
    //     }
    //     catch(error){
    //         console.log(error.response.data)
    //         setUpdated(false)
    //     }
    // }

    // const handleUserDelete=async()=>{
    //     try {
    //         const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
    //         setUser(null)
    //         navigate("/")
    //         // console.log(res.data)
    //     } catch (error) {
    //         console.log(error.response.data)
    //     }
    // }

    const fetchUserPosts=async()=>{
        try {
            const res=await axios.get(URL+"/api/posts/user/"+user._id)
            setPosts(res.data)
            if(res.data.length==0){
                setNoResults(true)
            }
            else{
                setNoResults(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchProfile()
    },[param])

    useEffect(()=>{
        fetchUserPosts()
    },[param])

    return (
        <div>
            <Navbar/>
            <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-bold mb-4" >Your posts:</h1>
                    {!noResults?posts?.map((p)=>(
                        <ProfilePosts key={p._id} p={p} />
                    )):<h3 className="text-center font-bold mt-16">No posts yet!</h3>}
                </div>
                <div className="md:sticky md:top-14 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
                    <div className="flex flex-col space-y-4 items-start border border-black-500 p-10 shadow-xl">
                    <h1 className="text-xl font-bold mx-4">Profile</h1>
                    <ul>
                    <p className="outline-none px-4 py-1 text-black font-bold" type="text">Username:</p>
                    <p className="outline-none px-4 py-1 text-gray-500" type="text">{username}</p>
                    <p className="outline-none px-4 py-1 text-black font-bold" type="text">Email:</p>
                    <p className="outline-none px-4 py-2 text-gray-500" type="text">{email}</p>
                    </ul>
                    <div className="flex items-center space-x-4 mt-8">
                        {/* <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                        <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button> */}
                    </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile