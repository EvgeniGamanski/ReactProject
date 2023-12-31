import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState()
    useEffect(()=>{
        getUser()
    },[]);

    const getUser=async()=>{
   
        try{
            const res=await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
            setUser(res.data)
            localStorage.setItem("id", res.data._id);
        }
        catch(error){
            console.log("User is not logged in yet!");
        }
    }

    return (<UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>)
}