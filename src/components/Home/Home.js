import { useNavigate } from "react-router-dom";
import videoHomePage from "../../assets/video/video-homepage.mp4"
import { useSelector } from "react-redux";
const Home = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop className="video">
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="main_title">There's a better way to ask</div>
        <div className="main_desc">You don't want to make a boring form. And your audience won't answer  one. Create  a typeform instead-and make everyone happy.</div>
        <div className="main_btn">
        {isAuthenticated === true ? <button onClick={() => {navigate("/login")}}>Get's stated. It's free</button> : <button onClick={() => {navigate("/users")}}>Doing Quiz Now</button>}
        </div>
      </div>
    </div>
  )
}

export default Home;