import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from '../Pages/Layouts/DefaultLayout'
import Login from '../Pages/Login'
import Register from '../Pages/Register'


export const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [

        ],

    },{
        path: "/login",
        element: <Login />
    },{

        path: "register",
        element: <Register />

    }
])