import "../styles/Form.css"
import { ContactContext } from "../ContactContext";
import { useState, useContext } from "react";

export default function AddForm() {

    const [formData, setFormData] = useState({ name: '', phone: '' });
    const { addContact} = useContext(ContactContext);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(formData); // 
        setFormData({ name: '', phone: '' }); 
    };

    return (
        <div className='contactForm'>
        <h1>Add Contact</h1>
        <form>
            <div>
            <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
            />
            <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                onChange={handleChange}
            />
            </div>
            <button type="submit" onClick={handleSubmit}>Add Contact</button>
        </form>
    </div>
    )
}
