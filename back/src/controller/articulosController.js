import { ArticulosResponseDTO } from "../dto/articulos-dto.js";

export class ArticulosController{
    constructor({articulosService}){
        this.articulosService = articulosService;
    }

    getAll = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.articulosService.getAll(req.criteria);
            console.log(result);

            const limit = Number(req.criteria?.limit) || 5;
            const totalRegistros = result.length > 0 && result[0].total_registros 
                ? parseInt(result[0].total_registros, 10) 
                : result.length;
            const totalPaginas = Math.ceil(totalRegistros / limit) || 1;
            const paginaActual = Number(req.criteria?.page) || (Math.floor(Number(req.criteria?.offset || 0) / limit) + 1);

            const articulosDTO = result.map(articulo => new ArticulosResponseDTO(articulo));

            res.json({
                articulos: articulosDTO,
                paginacion: {
                    totalPaginas,
                    paginaActual,
                    totalRegistros,
                    limitePorPagina: limit
                }
            });
        } catch (error) {
            console.error("Error en articulos getAll:", error);
            res.status(500).json({ error: error.message || "Error al obtener artículos" });
        }
    }

    getByID = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.articulosService.getByID(req.criteria);
            console.log(result);
            if (!result) return res.status(404).json({ error: "Artículo no encontrado" });
            res.json(new ArticulosResponseDTO(result));
        } catch (error) {
            console.error("Error en articulos getByID:", error);
            res.status(500).json({ error: error.message || "Error al obtener artículo" });
        }
    }

    update = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.articulosService.update(req.criteria);
            console.log(result);
            res.json(new ArticulosResponseDTO(result));
        } catch (error) {
            console.error("Error en articulos update:", error);
            res.status(500).json({ error: error.message || "Error al actualizar artículo" });
        }
    }

    create = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.articulosService.create(req.criteria);
            console.log(result);
            res.json(new ArticulosResponseDTO(result));
        } catch (error) {
            console.error("Error en articulos create:", error);
            res.status(500).json({ error: error.message || "Error al crear artículo" });
        }
    }

    delete = async (req, res) => {
        try {
            const result = await this.articulosService.delete(req.criteria);
            console.log(result);
            res.json(new ArticulosResponseDTO(result));
        } catch (error) {
            console.error("Error en articulos delete:", error);
            res.status(500).json({ error: error.message || "Error al dar de baja artículo" });
        }
    }

    reactivar = async (req, res) => {
        try {
            const result = await this.articulosService.reactivar(req.criteria);
            res.json(result);
        } catch (error) {
            console.error("Error en articulos reactivar:", error);
            res.status(500).json({ error: error.message || "Error al reactivar artículo" });
        }
    }

    deleteDefinitivo = async (req, res) => {
        try {
            const result = await this.articulosService.eliminarDefinitivo(req.criteria);
            res.json(result);
        } catch (error) {
            console.error("Error al borrar definitivamente artículo:", error);
            res.status(500).json({ error: "No se puede borrar porque está vinculado a una o más incidencias históricas." });
        }
    }
}