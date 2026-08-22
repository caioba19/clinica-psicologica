import { Request, Response } from 'express';
import { NodePatientService } from '../services/NodePatientService';

export class PatientController {
  constructor(private patientService: NodePatientService) {}

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const patients = await this.patientService.getAllPatients();
      return res.status(200).json(patients);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const patient = await this.patientService.getPatientById(id);

      if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado.' });
      }

      return res.status(200).json(patient);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { nome, cpf, email } = req.body;

      if (!nome || !cpf || !email) {
        return res.status(400).json({ error: 'Nome, CPF e e-mail são obrigatórios.' });
      }

      const newPatient = await this.patientService.createPatient(req.body);
      return res.status(201).json(newPatient);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedPatient = await this.patientService.updatePatient(id, req.body);
      return res.status(200).json(updatedPatient);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}