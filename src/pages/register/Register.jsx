import { useState } from "react"
import "./register.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../../CONST"
import toast from "react-hot-toast"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    //so that it doesnt referesh on form submission
    setError(false);
    try {
      setIsLoading(true)
      const res = await axios.post(`${BACKEND_URL}/auth/register`, {
        username,
        email,
        password,
      });
      // res.data && window.location.replace("/login")
      // alert("User registration successfull");
      res.data && navigate("/login")
      toast.success("User Registered")
    }
    catch (err) {
      setError(true)
      toast.error("Error while registering")
    }
    finally {
      setIsLoading(false)
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
          onChange={e => setUsername(e.target.value)}
        />
        <label className="registerLabel">Email</label>
        <input
          type="text"
          placeholder="Enter your Email..."
          onChange={e => setEmail(e.target.value)}
        />
        <label className="registerLabel">Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}

        />
        <button className="registerButton" type="submit">{isLoading ? "Loading..." : "Register"}</button>
      </form>
      <span className="b3">Already registered?
        <button className="registerLoginButton">
          <Link className="link" to="/login">Login</Link>
        </button>
        {error && <span style={{ color: "red", display: "block", marginTop: "10px" }}>Something went wrong</span>}
      </span>
    </div>
  )
}
