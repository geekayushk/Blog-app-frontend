import { useRef, useState } from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../CONST";
import toast from "react-hot-toast";


export default function Login() {
  const navigate = useNavigate()
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      setIsLoading(true)
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        //passing data in post
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate('/')
      toast.success("Logged in Succesfully")
    } catch (err) {
      toast.error("Can't Login")
      dispatch({ type: "LOGIN_FAILURE" });

    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginLabel">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your Username..."
          ref={userRef}
        />
        <label className="loginLabel">Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>{isLoading ? "Loading.." : "Login"}</button>

      </form>
      <span className="b3">New user?
        <button className="loginRegisterButton">
          <Link className="link" to="/register">Register</Link>
        </button>
      </span>
    </div>
  )
}
