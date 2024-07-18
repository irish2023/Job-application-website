import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import CreateJob from '../pages/CreateJob.jsx';
import MyJob from '../pages/MyJob.jsx';
import SalaryPage from '../pages/SalaryPage.jsx';
import UpdateJob from '../pages/UpdateJob.jsx';
import Login from '../pages/Login.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <Home /> },
            {path: "/post-job", element: <CreateJob /> },
            {path: "/my-job", element: <MyJob /> },
            {path: "/salary", element: <SalaryPage /> },
            {path: "edit-job/:id", element: <UpdateJob />,loader: ({params}) => fetch(`http://localhost:9000/all-job/${params.id}`) }
            
        ]
        ,
    },
    {
        path: "/login",
    element: <Login />
    }
]);

export default router;