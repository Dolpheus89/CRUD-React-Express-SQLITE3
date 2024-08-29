import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import AddForm from './components/AddForm.jsx';
import ShowContacts from './components/ShowContacts.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:"/contact/create",
        element: <AddForm/>
      },{
        path:"/contact/read",
        element:<ShowContacts/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < RouterProvider router={router} />
  </StrictMode>,
)
