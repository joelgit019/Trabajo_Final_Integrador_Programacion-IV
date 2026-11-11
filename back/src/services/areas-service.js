import { AreasRepository } from "../repository/areas-repository.js";

export class AreasService {
    static async getAll(input) {
        return await AreasRepository.getAll(input);
    }

    static async getByID(input) {
        return await AreasRepository.getByID(input);
    }
}

