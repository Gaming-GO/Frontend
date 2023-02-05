import { createBrowserRouter } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import Users from '../views/Users'
import Layout from '../views/Layout'
import UserDetails from '../views/UserDetails'
import Landing from '../views/Landing'
import Login from '../views/Login'
import Register from '../views/Register'

const router = createBrowserRouter([
    {
        path: '/login',
        loader: () => {
            const token = localStorage.getItem('access_token')
            if(token){
                throw redirect('/')
            }
            return null
        },
        element: (
            <Login />
        )
    },
    {
        path: '/register',
        loader: () => {
            const token = localStorage.getItem('access_token')
            if(token){
                throw redirect('/')
            }
            return null
        },
        element: (
            <Register />
        )
    },
    {
        element:<Layout />,
        loader: () => {
            const token = localStorage.getItem('access_token')
            if(!token){
                throw redirect('/login')
            }
            return null
        },
        children: [
            {
                path: '/',
                element: (
                    <Landing />
                )
            },
            {
                path: '/users',
                element: (
                    <Users />
                )
            },
            {
                path: '/users/:id',
                element: (
                    <UserDetails />
                )
            }
        ]
    },
    {
        path: '*',
        element: <h1>404 not found</h1>
    }
])

export default router