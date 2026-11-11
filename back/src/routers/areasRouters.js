import { Router } from "express";
import { AreasController } from "../controller/areasController.js";

export const createAreasRouter = ({ areasService }) => {
    const router = Router();
    const controller = new AreasController({ areasService });

    router.get('/', controller.getAll);
    router.get('/:id', controller.getByID);

    return router;
};

