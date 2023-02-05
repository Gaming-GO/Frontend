import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserDetails(){
    const params = useParams()
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/admin/users/' + params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            }
        })
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(err => setUsers(err))
      }, [])
    
    // console.log('>>>>>>>>>>>>', users, '<<<<<<<<<<<')

    return (
        <div class="container" style={{
            "textAlign": 'center',
            'backgroundColor': 'lightgrey',
            'height': '100vh',
            'paddingTop': '65px'
        }}> 
            <div>
                <h1>USER DETAILS</h1>
                <div>
                    {/* <div>
                        <img src={meals.imgUrl} alt="" className="rounded" style={{
                          'width': '350px'
                        }}></img>
                    </div> */}
                    <div>
                        <h5>{users.email}</h5>
                        <p>Roles: {users.role}</p>
                        <p>NIK: {users.nik} </p>
                        <p style={{'textDecoration': 'overline'}}>*ADDRESS*</p>
                        <p>{users.address}</p>
                    </div>
                    <div>
                        <Link to='/users' className="btn btn-warning">Back to Menu</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}