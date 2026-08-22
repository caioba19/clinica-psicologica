import { Router } from 'express';
import { PatientController } from '../controllers/patientController';
import { NodePatientService } from '../services/NodePatientService';
import { PatientRepository } from '../repositories/PatientRepository';

const patientRoutes = Router();

const repository = new PatientRepository();
const service = new NodePatientService(repository);
const controller = new PatientController(service);

patientRoutes.get('/patients', controller.getAll);
patientRoutes.get('/patients/:id', controller.getById);
patientRoutes.post('/patients', controller.create);
patientRoutes.patch('/patients/:id', controller.update);

export { patientRoutes };