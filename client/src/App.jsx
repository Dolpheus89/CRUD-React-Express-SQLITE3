import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom";
import { ContactProvider } from "./ContactContext";


function App() {


  return (
    <ContactProvider>
     <NavBar/>
     <Outlet/>
    </ContactProvider>
  )
}

export default App
