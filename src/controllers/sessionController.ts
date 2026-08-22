import { Request, Response } from 'express';
import { NodeSessionService } from '../services/NodeSessionService';

export class SessionController {
  constructor(private sessionService: NodeSessionService) {}

  getByPatient = async (req: Request, res: Response): Promise<Response> => {
    try {
      const pacienteId = Array.isArray(req.params.pacienteId)
        ? req.params.pacienteId[0]
        : req.params.pacienteId;

      const sessions = await this.sessionService.getSessionsByPatient(pacienteId);
      return res.status(200).json(sessions);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newSession = await this.sessionService.createSession(req.body);
      return res.status(201).json(newSession);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}