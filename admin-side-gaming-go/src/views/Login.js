import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { LoginHandler } from "../store/action/actionCreator";
import { Link } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })
    
    const changeHandler = (e) => {
        const { name, value } = e.target

        const obj = {
            ...formLogin,
            [name]: value
        }

        setFormLogin(obj)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        LoginHandler(formLogin).then(() => navigate('/'))
    }

    return (
        <div style={{
            'backgroundColor': 'lightgrey',
            'height': '100vh',
        }}>
            <div className="container" style={{
            'width': '550px'
            }}>
                <img src="/gg-logo-black.png" alt="" style={{
                'height': '90px',
                'width': '300px',
                'marginRight': 'auto',
                'marginLeft': 'auto'
            }}></img>
                <h1>Admin Sign In</h1>
                <form onSubmit={submitHandler}>
                    <div className="input-group input-group-lg">
                        {/* <label>Username</label> */}
                        <input name="email" type="text" onChange={changeHandler} value={formLogin.username} className="form-control" placeholder="input your email"></input>
                    </div><br></br>
                    <div className="input-group input-group-lg">
                        {/* <label>Password</label><br></br> */}
                        <input name="password" type="password" onChange={changeHandler} value={formLogin.password} className="form-control" placeholder="input your password"></input>
                    </div><br></br>
                    <div style={{ 'marginBottom': '5px'}}>
                        don't have an account? <Link to={'/register'}>Register Here</Link>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </div>
    )
}