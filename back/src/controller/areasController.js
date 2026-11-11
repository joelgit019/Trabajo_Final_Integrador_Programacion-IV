export class AreasController {
    constructor({ areasService }) {
        this.areasService = areasService;
    }

    getAll = async (req, res) => {
        try {
            const activo = req.query.activo !== undefined ? Number(req.query.activo) : null;
            const result = await this.areasService.getAll({ activo });
            res.json({ areas: result });
        } catch (error) {
            console.error("Error al obtener áreas:", error);
            res.status(500).json({ error: "Error interno al obtener áreas" });
        }
    };

    getByID = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await this.areasService.getByID(id);
            if (!result) return res.status(404).json({ error: "Área no encontrada" });
            res.json({ area: result });
        } catch (error) {
            console.error("Error al obtener área:", error);
            res.status(500).json({ error: "Error interno al obtener área" });
        }
    };
}

