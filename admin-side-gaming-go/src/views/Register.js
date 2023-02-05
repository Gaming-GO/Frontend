import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerHandler } from "../store/action/actionCreator";

export default function Register(){
    const navigate = useNavigate()

    const [formRegister, setFormRegister] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        const {name, value} = e.target

        const obj = {
            ...formRegister,
            [name]: value
        }

        setFormRegister(obj)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        registerHandler(formRegister).then(() => navigate('/'))
    }

    return(
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
                <h1>Register Here</h1>
                <form onSubmit={submitHandler}>
                    <div className="input-group input-group-lg">
                        <input name="email" type="text" onChange={changeHandler} value={formRegister.username} className="form-control" placeholder="input your email"></input>
                    </div><br></br>
                    <div className="input-group input-group-lg">
                        <input name="password" type="password" onChange={changeHandler} value={formRegister.password} className="form-control" placeholder="input your password"></input>
                    </div><br></br>
                    <Link className='btn btn-danger' to={'/login'}>Cancel</Link>
                    <button type="submit" className="btn btn-primary" style={{ 'marginLeft': '10px' }}>Register</button>
                </form>
            </div>
        </div>
    )
}