import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { NodeAuthService } from '../services/NodeAuthService.js';
import { UserRepository } from '../repositories/UserRepository.js';

const authRoutes = Router();

const repository = new UserRepository();
const service = new NodeAuthService(repository);
const controller = new AuthController(service);

authRoutes.post('/auth/login', controller.login);
authRoutes.get('/users', controller.getUsers);

export { authRoutes };