import { useState, useContext } from "react";
import { ContactContext } from "../ContactContext";
import "../styles/Form.css"

export default function EditForm({ contact}) {
    const [formData, setFormData] = useState({
        name: contact?.name || '',
        phone: contact?.phone || ''
    });
    const { updateContact } = useContext(ContactContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateContact( contact.id, formData);
        setFormData({ name: '', phone: '' })
    };

    return (
        <div className='editContactForm'>
            <div>
            <h1>Edit Contact</h1>
            <form >
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        placeholder="Phone"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Save Change</button>
            </form>
            </div>
        </div>
    );
}