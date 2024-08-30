import { useState } from "react";
import EditForm from "./EditForm";

export default function EditButton({ contact, onSave }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = (updatedContact) => {
        onSave(updatedContact);
        handleCloseModal();     
    };

    return (
        <>
            <button onClick={handleOpenModal}>Edit</button>
            {showModal && (
                <EditForm
                    contact={contact}
                    onSave={handleSave}
                />
            )}
        </>
    );
}