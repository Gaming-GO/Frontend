import { useDispatch } from "react-redux"
import { approveUser, disapproveUser } from "../store/action/actionCreator"
import { Link } from "react-router-dom"

export default function TableUser({el, index}){
    const dispatch = useDispatch()
    // console.log(props)
    const approvalHandler = (e) => {
        e.preventDefault()
        dispatch(approveUser(el.id))
    }

    const disapproveHandler = (e) => {
        e.preventDefault()
        dispatch(disapproveUser(el.id))
    }


    return (
        <tr className="table-secondary">
            <td>{index + 1}</td>
            <td>{el.email}</td>
            <td>{el.role}</td>
            <td>{el.approved ? 'Approved' : 'Not Approved'}</td>
            <td>
                <Link to={`/users/${el.id}`} className="btn btn-warning" style={{
                'marginRight': '0px'
                }}>
                Details
                </Link>
                {/* <ModalEdit name='Edit' el={el} /> */}
                <button onClick={approvalHandler} className="btn btn-success" style={{
                'marginLeft': '10px'
                }}>Approve</button>
                <button onClick={disapproveHandler} className="btn btn-danger" style={{
                'marginLeft': '10px'
                }}>Disapprove</button>
            </td>
        </tr>
    )
}