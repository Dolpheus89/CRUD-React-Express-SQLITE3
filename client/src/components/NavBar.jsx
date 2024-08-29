import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <p>React CRUD</p>
            <ul>
                <li><Link to={"/contact/create"}>CREATE CONTACT</Link></li>
                <li><Link to={"/contact/read"}>SHOW CONTACTS</Link></li>
            </ul>
        </nav>
    )
}

