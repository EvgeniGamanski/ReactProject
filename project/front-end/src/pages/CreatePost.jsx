import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from 'react-icons/im'
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Navigate, useNavigate } from "react-router-dom"

const CreatePost = () => {
 
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    const [cat, setCat ]=useState("")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const deleteCategory=(i)=>{
        let updatedCats=[...cats]
        updatedCats.splice(i)
        setCats(updatedCats) 
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const handleCreate=async (e)=>{
        e.preventDefault()
        const post={
            title,
            desc,
            username:user.username,
            userId:user._id,
            categories:cats
        }

        if(file){
            const data=new FormData() 
            const filename=Date.now()+file.name
            data.append("img",filename)
            data.append("file",file)
            post.photo=filename
            //img upload
            try {
                const imgUpload=await axios.post(URL+"/api/upload",data)
            } catch (error) {
                console.error(error.response.data);
            }
        }
        //post upload
        try{
            const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
            navigate("/posts/post/"+res.data._id)
        }
        catch(err){
            console.log(err)
        }
        
    }
    const [formData,setFormData]=useState({
        title:'',
        fileImg:null,
        desc:''
    })

    const [errors, setErrors]= useState({})

    const handleChange = (e) => {
        const {title, value}=e.target;
        setFormData({
            ...formData, [title] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if(!formData.title.trim()) {
            validationErrors.title = "title is required"
        } else if(formData.title.length<3){
            validationErrors.title = "Title is too short ( must be at least 3 characters )!"
        }

        if(!formData.fileImg){
            validationErrors.fileImg="File of the image is required!"
        }
        
        if(!formData.desc.trim()) {
            validationErrors.desc = "Description is required"
        }
        else if(formData.desc.length<3){
            validationErrors.desc = "Description is too short ( must be at least 3 characters )!"
        }

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length == 0){
            alert("Submitted successfully!")
        }
    }   

    return (
        <div>
            <Navbar/>
            <div className="px-6 md:px-[200px] mt-8">
            <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                <input onChange={handleChange ((e)=>setTitle(e.target.value))} type="text" name="title" placeholder="Enter post title" className="px-4 py-2 outline-none"  />
                <input onChange={(e)=>setFile(e.target.files[0])} type="fileImg" name="file" className="px-4"/>
                <div className="flex flex-col">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <input value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-2 outline-none" placeholder="Enter post category" type="text"/>
                        <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
                    </div>

                    {/* categories */}
                    <div className="flex px-4 mt-3">
                    {cats?.map((c,i)=>( 
                        <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                        <p>{c}</p>
                        <p onClick={()=>deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross/></p>
                    </div>
                    ))}
                    

                    </div>
                </div>
                <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className="px-4 py-2 outline-none" name="desc" placeholder="Enter post description"/>
                <button onClick={handleCreate} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">Create</button>
            </form>

            </div>
            <Footer/>
        </div>
    )
}

export default CreatePost
