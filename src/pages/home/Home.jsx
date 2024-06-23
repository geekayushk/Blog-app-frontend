import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default function Home() {
  const [posts,setPosts]=useState([]);
  const {search}=useLocation();  //search is an attribute defined on main link.i.e the value after ? in main link

  useEffect(()=>{
    const fetchPosts=async()=>{
     const res= await axios.get("/posts"+search)
     setPosts(res.data)
    }
    fetchPosts()
  },[search])
  return (
    <>
    <Header/>
    <div className="home">
         {/*passing posts as props */}
        <Posts posts={posts}/>  
        <Sidebar/>
        
    </div>
    </>
  )
}
