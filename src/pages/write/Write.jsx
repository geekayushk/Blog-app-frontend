import { useContext, useState } from "react"
import "./write.css"
import axios from "axios"
import { Context } from "../../context/Context"
import { BACKEND_URL } from "../../CONST"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function Write() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      // FormData Provides a way to easily construct a set of key/value pairs representing form fields and their values
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename;
      try {
        await axios.post(`${BACKEND_URL}/upload`, data)
      } catch (err) {

      }
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${BACKEND_URL}/posts`, newPost)
      // window.location.replace("/post/" + res.data._id)
      navigate(`/post/${res.data._id}`)
      toast.success("Post Published Succesfully")
    }
    catch (err) {
      console.log(err)
      toast.error("Post Not Published")
    }
    finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type='file'
            id="fileInput"
            style={{ display: "none" }}
            onChange={e => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Title"
            className='writeInput'
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}

          />

        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder='write your blog here...'
            type="text"
            className='writeInput writeText'
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : 'Publish'}</button>
      </form>
    </div>
  )
}
