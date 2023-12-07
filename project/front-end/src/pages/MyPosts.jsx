import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import HomePosts from "../components/HomePosts"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"

const MyPosts = () => {
    
  const {search}=useLocation()
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  let PostPosition=1;

  const fetchPosts=async()=>{
    setLoader(true)
    try {
      const userID=localStorage.getItem("id")
      const res=await axios.get(URL+"/api/posts/user/"+userID)
      setPosts(res.data)
      if(res.data.length==0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    } catch (err) {
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])

    return (
        <div>
            <Navbar/>
            <div className="px-8 md:px-[200px] min-h-[80vh]">
            {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
       posts.map((post)=>(
        <div key={PostPosition++}>
        <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
        </Link>
        </div>

       )):<h3 className="text-center font-bold mt-16">No posts yet!</h3>}
       </div>
            <Footer/>
        </div>
    )
}

export default MyPosts