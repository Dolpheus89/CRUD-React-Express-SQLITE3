import { useState } from "react";
import EditForm from "./EditForm";

export default function EditButton({ contact }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(!showModal);
    };


    return (
        <>
            <button onClick={handleOpenModal}>Edit</button>
            {showModal && (
                <EditForm
                    contact={contact}
                />
            )}
        </>
    );
}