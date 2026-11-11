import { CategoriaResponseDTO } from "../dto/categorias-dto.js";


export class CategoriasController{
    constructor({categoriasService}){
        this.categoriasService = categoriasService;
    }

    getAll = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.categoriasService.getAll(req.criteria);
            console.log(result);

            const limit = Number(req.criteria?.limit) || 5;
            const totalRegistros = result.length > 0 && result[0].total_registros 
                ? parseInt(result[0].total_registros, 10) 
                : result.length;
            const totalPaginas = Math.ceil(totalRegistros / limit) || 1;
            const paginaActual = Number(req.criteria?.page) || (Math.floor(Number(req.criteria?.offset || 0) / limit) + 1);

            const dtoCategorias = result.map(categoria => new CategoriaResponseDTO(categoria));

            res.json({
                categorias: dtoCategorias,
                paginacion: {
                    totalPaginas,
                    paginaActual,
                    totalRegistros,
                    limitePorPagina: limit
                }
            });
        } catch (error) {
            console.error("Error en categorias getAll:", error);
            res.status(500).json({ error: error.message || "Error al obtener categorías" });
        }
    }

    getByID = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.categoriasService.getByID(req.criteria);
            console.log(result);
            if (!result) return res.status(404).json({ error: "Categoría no encontrada" });
            res.json(new CategoriaResponseDTO(result));
        } catch (error) {
            console.error("Error en categorias getByID:", error);
            res.status(500).json({ error: error.message || "Error al obtener categoría" });
        }
    }

    update = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.categoriasService.update(req.criteria);
            console.log(result);
            res.json(new CategoriaResponseDTO(result));
        } catch (error) {
            console.error("Error en categorias update:", error);
            res.status(500).json({ error: error.message || "Error al actualizar categoría" });
        }
    }

    create = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.categoriasService.create(req.criteria);
            console.log(result);
            res.json(new CategoriaResponseDTO(result));
        } catch (error) {
            console.error("Error en categorias create:", error);
            res.status(500).json({ error: error.message || "Error al crear categoría" });
        }
    }

    delete = async (req, res) => {
        try {
            console.log("Controller");
            console.log(req.criteria);
            const result = await this.categoriasService.delete(req.criteria);
            console.log(result);
            res.json(new CategoriaResponseDTO(result));
        } catch (error) {
            console.error("Error en categorias delete:", error);
            res.status(500).json({ error: error.message || "Error al dar de baja categoría" });
        }
    }

    reactivar = async (req, res) => {
        try {
            console.log("Controller reactivar");
            const result = await this.categoriasService.reactivar(req.criteria);
            res.json(result);
        } catch (error) {
            console.error("Error en categorias reactivar:", error);
            res.status(500).json({ error: error.message || "Error al reactivar categoría" });
        }
    }

    deleteDefinitivo = async (req, res) => {
        console.log("Controller deleteDefinitivo");
        try {
            const result = await this.categoriasService.eliminarDefinitivo(req.criteria);
            res.json(result);
        } catch (error) {
            console.error("Error al borrar definitivamente:", error);
            res.status(400).json({ error: error.message || "No se puede borrar la categoría." });
        }
    }
}