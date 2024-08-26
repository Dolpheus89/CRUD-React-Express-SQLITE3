import {Contact} from "../models/contactModel.js"

export const createContact = async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

export const readAllContact = async (req,res) => {
    try {
        const contacts = await Contact.readAll()
        res.status(200).json(contacts)
    } catch (err) {
        res.status(500).json(`Fail to load contacts : ${err}`)
    }
 }

 export const updateContact = async (req,res) => {
    try {
        const id = req.params.id
        const datas = req.body
        await Contact.update(id,datas)
        res.status(202).send(`update contact with id ${id} was successfuly`)
    } catch (err) {
        res.status(500).json(`Fail to update contact: ${err.message}`)
    }
 }

 export const deleteContact = async (req,res) => {
    try {
        const id = req.params.id
        await Contact.delete(id)
        res.status(202).send(`delete contact with id ${id} was successfuly`)
    } catch (err) {
        res.status(500).json(`Fail to load contacts : ${err}`)
    }
 }