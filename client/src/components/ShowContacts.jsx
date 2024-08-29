import EditButton from "./EditButton";
import { ContactContext } from "../ContactContext";
import { useContext } from "react";

export default function ShowContacts() {
    const {contacts, deleteContact } = useContext(ContactContext)

    return (
        <div className='contactForm'>
            <h1>Contacts list</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <EditButton contact={contact} />
                                <button onClick={() => deleteContact(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



