import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"
import { Context } from "../../context/Context"
import axios from "axios"


export default function Settings() {
  const[file,setFile]=useState(null)
  const[username,setUserName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const {user}=useContext(Context)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const updatedUser={
      userId:user._id,
      username,
      email,
      password,
    };
    if(file){
      const data= new FormData();
      // FormData Provides a way to easily construct a set of key/value pairs representing form fields and their values
      const filename=Date.now()+file.name;
      data.append("name",filename)
      data.append("file",file)
      updatedUser.profilePic=filename;
      try{
        await axios.post("/upload",data)
      }catch(err){

      }
    }
    try{
      await axios.put("/users"+user._id,updatedUser)
      
    }
    catch(err){

    }
    
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={user.profilePic}
            alt=""
            />
            <label htmlFor="fileInput">
            <i class="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file" 
            id="fileInput" 
            style={{display:"none"}}
            onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onchange={e=>setUserName(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.email}onchange={e=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" onchange={e=>setPassword(e.target.value)}/>
          <button className="settingsSubmit" type="submit">Update</button>
        </form>
      </div>
      <Sidebar/>
    </div>
  )
}
