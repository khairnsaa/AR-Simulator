import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="home">
            <Link to='/adminLogin' className="route-btn btn-edited">Login Admin</Link>
            <Link to='/ARApp' className="route-btn btn-edited">AR Application</Link>
        </div>
    );
}
 
export default Home;