## 3.  Intégration d'une API avec axios et useContext dans React

### Comprendre `useContext` dans React

#### Qu'est-ce que `useContext` ?

`useContext` est un hook de React qui permet de partager des données entre plusieurs composants sans avoir à les passer manuellement à chaque niveau de la hiérarchie de composants via des props. Il simplifie la gestion des états globaux (comme les thèmes, les utilisateurs authentifiés, ou dans notre cas, une liste de contacts) en fournissant un moyen de rendre ces données accessibles à n'importe quel composant dans l'arbre de composants.

#### Pourquoi utiliser `useContext` ?

Imaginons que vous avez plusieurs composants imbriqués dans votre application. Si vous devez passer les mêmes données ou les mêmes fonctions de gestion d'état à plusieurs niveaux de composants, cela peut devenir très compliqué et difficile à maintenir. C'est là que `useContext` intervient :

1. **Simplification** : Il élimine le besoin de "prop drilling", c'est-à-dire de passer des props à travers plusieurs niveaux de composants juste pour qu'un composant enfant puisse les utiliser.
  
2. **Réutilisation** : Les données partagées sont gérées à un endroit centralisé, ce qui facilite la réutilisation du code et la gestion des états globaux.

#### Comment fonctionne `useContext` ?

L'utilisation de `useContext` se fait en deux étapes principales :

1. **Création du Contexte** : Vous définissez un contexte avec `createContext`. Cela génère un objet qui peut être utilisé pour partager des données.

2. **Utilisation du Contexte** : Les composants enfants utilisent `useContext` pour accéder aux données partagées.

Voici comment cela fonctionne en pratique.

### Étape 1 : Créer un Contexte

Créez un fichier pour gérer votre contexte. Par exemple, `ContactContext.jsx` dans votre dossier src Ce fichier contiendra à la fois la création du Context et le composant Provider.


```javascript
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du Contexte
export const ContactContext = createContext();

// Composant Provider pour encapsuler les composants enfants
export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    // Charger les contacts depuis l'API au chargement du composant
    useEffect(() => {
        getContacts();
    }, []);

    // Fonction pour récupérer les contacts depuis l'API
    const getContacts = () => {
        axios.get('http://localhost:5000/api/contacts/')
            .then(response => setContacts(response.data))
            .catch(error => console.error("Erreur lors de la récupération des contacts !", error));
    };

    // Méthode pour ajouter un contact
    const addContact = (contact) => {
        axios.post('http://localhost:5000/api/contacts/', contact)
            .then(() => {
                // Récupérer tous les contacts après l'ajout
                getContacts();
            })
            .catch(error => console.error("Erreur lors de l'ajout du contact !", error));
    };

    // Méthode pour mettre à jour un contact
    const updateContact = (id, updatedContact) => {
        axios.put(`http://localhost:5000/api/contacts/${id}`, updatedContact)
            .then(() => {
                // Récupérer tous les contacts après la mise à jour
                getContacts();
            })
            .catch(error => console.error("Erreur lors de la modification du contact !", error));
    };

    // Méthode pour supprimer un contact
    const deleteContact = (id) => {
        axios.delete(`http://localhost:5000/api/contacts/${id}`)
            .then(() => {
                // Récupérer tous les contacts après la suppression
                getContacts();
            })
            .catch(error => console.error("Erreur lors de la suppression du contact !", error));
    };

    // Fournir les données et les méthodes aux composants enfants via le contexte
    return (
        <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
            {children}
        </ContactContext.Provider>
    );
};
```

Dans ce fichier :

- **`createContext()`** crée un contexte vide pour les contacts.
- **`ContactProvider`** est un composant qui fournit les contacts et les méthodes de gestion (ajout, mise à jour, suppression) aux composants enfants via la prop `value`.

### Étape 2 : Utiliser le `Provider` dans votre Application

Encapsulez les composants qui ont besoin des données du contexte avec le `ContactProvider`.

```javascript
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { ContactProvider } from './ContactContext';

function App() {
  return (
    <ContactProvider>
      <NavBar />
      <Outlet />
    </ContactProvider>
  );
}

export default App;

```

### Étape 3 : Consommer le Contexte dans les Composants

Vous pouvez maintenant accéder aux données du contexte dans n'importe quel composant enfant en utilisant le hook `useContext`.

#### Exemple : AddContact

```javascript
import { useState, useContext } from 'react';
import { ContactContext } from './ContactContext';

export default function AddContact() {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const { addContact } = useContext(ContactContext);// Utilisez useContext pour accéder aux données


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(formData); // Ajouter un contact via le contexte
        setFormData({ name: '', phone: '' }); 
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit" onClick={handleSubmit}>Add Contact</button>
        </form>
    );
}
```


### Conclusion

En intégrant  `useContext` pour la gestion des états globaux dans votre application React, vous établissez une approche cohérente et efficace pour manipuler les données et les partager entre différents composants. Voici un récapitulatif des étapes clés :


1. **Créer et utiliser le Contexte avec `useContext`** : Définissez un `ContactContext` pour centraliser l'état des contacts et fournissez-le à vos composants via un `ContactProvider`. Cela simplifie la gestion et l'accès aux données des contacts à travers toute l'application.

2. **Envelopper les Composants avec le `Provider`** : Placez le `ContactProvider` autour des composants principaux de votre application pour garantir que les données contextuelles sont accessibles où nécessaire.

3. **Consommer le Contexte dans les Composants** : Utilisez le hook `useContext` pour accéder et manipuler les données des contacts dans vos composants, facilitant ainsi la gestion des états globaux sans avoir à passer les props manuellement.

En suivant ces étapes, vous créez une application React bien structurée, où les données sont gérées de manière centralisée et accessible. Cela rend votre code plus propre, modulaire et facile à maintenir.

Pour plus d'informations sur React, y compris les hooks et la gestion du contexte, consultez la [documentation officielle de React](https://fr.react.dev/reference/react/useContext).