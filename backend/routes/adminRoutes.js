import express from 'express';
import { getUsers, deleteUserById, updateUserRoleById, getReports, verifyReportById, rejectReportById, getUserCount, getAllReports } from '../controllers/admin.controller.js';
import {authMiddleware} from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const adminRouter = express.Router();
adminRouter.get('/users', [authMiddleware, admin], getUsers);
adminRouter.delete('/users/:id', [authMiddleware, admin], deleteUserById);
adminRouter.put('/users/:id/role', [authMiddleware, admin], updateUserRoleById);
adminRouter.put('/users/count', [authMiddleware, admin], getUserCount);
adminRouter.get('/reports', [authMiddleware, admin], getReports);
adminRouter.get('/reports/all', getAllReports);
adminRouter.put('/reports/:id/verify', [authMiddleware, admin], verifyReportById);
adminRouter.put('/reports/:id/reject', [authMiddleware, admin], rejectReportById);
export default adminRouter;