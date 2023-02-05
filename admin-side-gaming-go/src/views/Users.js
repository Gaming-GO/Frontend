import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUser } from "../store/action/actionCreator"
import TableUser from "../components/TableUsers"

export default function Users(){

    const users = useSelector(state => {
      return state.users.users
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
      }, [])


    return (
      <div style={{
              'backgroundColor': 'lightgrey',
              'textAlign': "center",
              'height': '100vh',
              'paddingTop': '65px'
          }}>
          <div>
            <h1>User Lists</h1>
          </div><br></br>
          <div>
              <table className="table table-hover table-bordered" style={{
                  'width': '1000px',
                  'marginLeft': 'auto',
                  'marginRight': 'auto'
                  
              }}>
                  <thead>
                      <tr className="table-dark">
                          <th scope="col">No.</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          users.map((el, index) => <TableUser key={el.id} index={index} el={el} />)
                      }
                  </tbody>
              </table> 
          </div>
      </div>
    )
}
