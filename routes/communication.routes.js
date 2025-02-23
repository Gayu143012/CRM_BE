import express from "express";
import { Router } from "express";
import { getAllCommunications, getCommunicationByCustomer, createCommunication, updateCommunication, deleteCommunication,getQueriesByCustomer,getAllQueries
} from "../controllers/communication.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', verifyToken, getAllCommunications);
router.post('/', verifyToken, createCommunication);
router.put('/:id', verifyToken, updateCommunication);
router.delete('/:id', verifyToken, deleteCommunication);
router.get('/customer/:customerId', verifyToken, getCommunicationByCustomer);
router.get('/queries', verifyToken, getAllQueries);
router.get('/queries/:customerId', verifyToken, getQueriesByCustomer);

export default router;