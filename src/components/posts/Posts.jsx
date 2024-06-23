import Post from "../post/Post"
import { useState, useEffect } from "react";
import axios from "axios";
import "./posts.css"

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const res = await axios.get("https://blog-app-backend-production-57da.up.railway.app/api/posts")
    setPosts(res.data)
  }
  useEffect(() => {
    fetchPosts();
  }, [])
  // console.log(posts);
  return (
    <div className="posts">
      {posts?.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  )
}
