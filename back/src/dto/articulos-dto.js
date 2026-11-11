export class ArticulosResponseDTO{
    constructor(input){
        this.id_articulo = input.id_articulo;
        this.id_area = input.id_area !== undefined && input.id_area !== null ? Number(input.id_area) : null;
        this.area = input.area || input.descripcion_area || 'Desconocida';
        this.id_categoria = input.id_categoria !== undefined && input.id_categoria !== null ? Number(input.id_categoria) : null;
        this.categoria = input.categoria || input.descripcion_categoria || 'Desconocida';
        this.descripcion = input.descripcion || '';
        this.activo = input.activo !== undefined && input.activo !== null ? Number(input.activo) : 1;
    }
}