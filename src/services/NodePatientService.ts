import { PatientRepository } from '../repositories/PatientRepository';
import { Paciente } from '../types';

export class NodePatientService {
  constructor(private patientRepository: PatientRepository) {}

  async getAllPatients(): Promise<Paciente[]> {
    return await this.patientRepository.findAll();
  }

  async getPatientById(id: string): Promise<Paciente | null> {
    return await this.patientRepository.findById(id);
  }

  async createPatient(data: Partial<Paciente>): Promise<Paciente> {
    return await this.patientRepository.create(data);
  }

  async updatePatient(id: string, data: Partial<Paciente>): Promise<Paciente> {
    const updated = await this.patientRepository.update(id, data);
    if (!updated) {
      throw new Error('Paciente não encontrado');
    }
    return updated;
  }
}