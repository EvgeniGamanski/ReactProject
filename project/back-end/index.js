const express=require('express')
const app=express()

console.log("hi");

app.listen(5000,()=>{
    console.log("app is running on port 5000")
})