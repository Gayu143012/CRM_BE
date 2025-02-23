import express from "express";
import { Router } from "express";
import { getAllContacts, getUserContacts, getContactById, createContact, updateContact, deleteContact } from "../controllers/contact.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router = Router();

router.get('/user', verifyToken, getUserContacts);
router.get('/', verifyToken, getAllContacts);
router.get('/:id', verifyToken, getContactById);
router.post('/', verifyToken, createContact);
router.put('/:id', verifyToken, updateContact);
router.delete('/:id', verifyToken, deleteContact);



export default router