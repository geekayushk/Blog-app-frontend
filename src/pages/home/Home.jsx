import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"

export default function Home() {

  // const {search}=useLocation();
  //search is an attribute defined on main link.i.e the value after ? in main link


  return (
    <>
      <Header />
      <div className="home">
        {/*passing posts as props */}
        <Posts />
        <Sidebar />

      </div>
    </>
  )
}
