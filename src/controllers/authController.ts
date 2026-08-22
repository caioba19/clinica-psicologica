import { Request, Response } from 'express';
import { NodeAuthService } from '../services/NodeAuthService';

export class AuthController {
  constructor(private authService: NodeAuthService) {}

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'O e-mail é obrigatório.' });
      }

      const result = await this.authService.login(email);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.authService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
}