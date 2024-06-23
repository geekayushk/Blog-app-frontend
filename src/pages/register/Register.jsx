import { useState } from "react"
import "./register.css"
import { Link } from "react-router-dom"
import axios from "axios"
export default function Register() {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false);
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    //so that it doesnt referesh on form submission
    setError(false);
    try{
    const res= await axios.post("/auth/register",{
      username,
      email,
      password,
    });
    res.data && window.location.replace("/login")
    // alert("User registration successfull");
  }
    catch(err){
      setError(true)
    }
  };
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label className="registerLabel">Username</label>
            <input 
            type="text" 
            placeholder="Enter your Username..."
            onChange={e=>setUsername(e.target.value)}
            />
            <label className="registerLabel">Email</label>
            <input 
            type="text" 
            placeholder="Enter your Email..."
            onChange={e=>setEmail(e.target.value)}
            />
            <label className="registerLabel">Password</label>
            <input 
            type="password" 
            placeholder="Enter your password..."
            onChange={e=>setPassword(e.target.value)}

            />
            <button className="registerButton" type="submit">Register</button>
        </form>
        <span className="b3">Already registered?
        <button className="registerLoginButton">
        <Link className="link" to="/login">Login</Link>
        </button>
       {error && <span style={{color:"red",display:"block",marginTop:"10px"}}>Something went wrong</span>}
        </span>
    </div>
  )
}
