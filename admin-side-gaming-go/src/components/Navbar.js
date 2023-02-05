import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()

    const logoutHandler = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigate('/login')
    }

    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div>
                <img src="/gg-logo-white.png" alt="gglogo" style={{
                    width: "165px",
                    height: "40px"
                }}/>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link to="/" className="btn btn-secondary" style={{'marginRight': '10px', 'marginLeft': '20px'}}>Home</Link>
                        {/* <Link to="/categories" className="btn btn-secondary" style={{'marginRight': '10px'}}>Categories</Link> */}
                        <Link to="/users" className="btn btn-secondary" style={{'marginRight': '10px'}}>Users</Link>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={logoutHandler} style={{
                        'marginLeft': '1100px'
                    }}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}