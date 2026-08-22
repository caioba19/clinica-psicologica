import { Router } from 'express';
import { SessionController } from '../controllers/sessionController';
import { NodeSessionService } from '../services/NodeSessionService';
import { SessionRepository } from '../repositories/SessionRepository';

const sessionRoutes = Router();

const repository = new SessionRepository();
const service = new NodeSessionService(repository);
const controller = new SessionController(service);

sessionRoutes.get('/sessions/patient/:pacienteId', controller.getByPatient);
sessionRoutes.post('/sessions', controller.create);

export { sessionRoutes };