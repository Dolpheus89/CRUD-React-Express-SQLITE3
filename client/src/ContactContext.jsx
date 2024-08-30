import { createContext , useState , useEffect} from "react";
import axios from "axios"


export const ContactContext = createContext()


export const ContactProvider = ({children}) => {

    const [ contacts , setContacts] = useState([])

    useEffect(() => {
        getContacts()
    },[])

    const getContacts = () => {
        axios.get("http://localhost:5000/api/contacts/")
        .then(response =>  setContacts(response.data))
        .catch(error => console.error("erreur lors de la récupération des contacts", error)
        )
    }

    const addContact = (contact) => {
        axios.post("http://localhost:5000/api/contacts/", contact )
        .then(() =>  {
            getContacts()
        })
        .catch(error => console.error("erreur lors de l'ajout du contact", error)
        )
    }

    const updateContact = (id , updatedContact) => {
        axios.put(`http://localhost:5000/api/contacts/${id}`, updatedContact)
        .then(() =>  {
            getContacts()
        })
        .catch(error => console.error("erreur lors de la modification du contact", error)
        )
    }

    const deleteContact = (id) => {
        axios.delete(`http://localhost:5000/api/contacts/${id}`)
        .then(() =>  {
            getContacts()
        })
        .catch(error => console.error("erreur lors de la suppression du contact", error)
        )
    }


    return (
        <ContactContext.Provider value={{contacts, addContact , updateContact, deleteContact}}>
           {children} 
        </ContactContext.Provider>
    )
}