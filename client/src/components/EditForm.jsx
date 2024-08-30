import { useState } from "react";
import "../styles/Form.css"

export default function EditForm({ contact, onSave }) {
    const [formData, setFormData] = useState({
        name: contact?.name || '',
        phone: contact?.phone || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className='editContactForm'>
            <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Save Change</button>
            </form>
            </div>
        </div>
    );
}