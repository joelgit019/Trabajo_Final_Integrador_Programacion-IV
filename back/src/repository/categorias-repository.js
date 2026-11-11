import {pool} from '../config/db.js';

export class CategoriasRepository{
    static async getAll(input){
        console.log("Repository");

        const {id_categoria, descripcion, activo
            , order_column, direction, limit, offset} = input;

        const sql = `
            SELECT id_categoria, descripcion, activo, COUNT(*) OVER() as total_registros
            FROM categorias
            WHERE ($1::text IS NULL OR id_categoria = $1::int)
            AND ($2::text IS NULL OR descripcion ILIKE '%' || $2::text || '%')
            AND ($3::text IS NULL OR activo = $3::int)
            ORDER BY $4 ${direction}
            LIMIT $5 OFFSET $6;
        `;
        console.log(sql);

        const {rows} = await pool.query(sql, [id_categoria ?? null, descripcion ?? null
            , activo ?? null, order_column, limit, offset]);
        
        console.log(rows);

        return rows;
    }

    static async getByID(input){
        const {id_categoria} = input;
        console.log("Repository");
        console.log(id_categoria);
        const sql = `
            SELECT id_categoria, descripcion, activo
            FROM categorias
            WHERE id_categoria = $1;
        `;

        console.log(sql);

        const {rows} = await pool.query(sql, [id_categoria]);
        console.log(rows);
        return rows[0];

    }

    static async update(input){
        console.log("Repository");
        console.log(input);

        const {id_categoria, descripcion} = input;
        console.log(id_categoria);

        const sql = `
            UPDATE categorias
            SET descripcion = $1
            WHERE id_categoria = $2
            RETURNING *;
        `
        console.log(sql);

        const {rows} = await pool.query(sql, [descripcion, id_categoria]);
        console.log(rows);
        return rows[0];
    }

    static async create(input){
        console.log("Repository");
        const {descripcion, activo} = input;

        const sql = `
            INSERT INTO categorias(descripcion, activo)
            VALUES ($1, $2)
            RETURNING *;
        `;
        console.log(sql);
        const {rows} = await pool.query(sql, [descripcion, activo]);
        console.log(rows);
        return rows[0];
    }

    static async delete(input){
        console.log("Repository");

        const {id_categoria} = input;
        console.log(id_categoria);

        const sql = `
            UPDATE categorias
            SET activo = 0
            WHERE id_categoria = $1
            RETURNING *;
        `;
        console.log(sql);

        const {rows} = await pool.query(sql, [id_categoria]);
        console.log(rows);

        return rows[0];
        
    }

    static async reactivar(input) {
        console.log("Repository reactivar");
        const { id_categoria } = input;

        const sql = `
            UPDATE categorias
            SET activo = 1
            WHERE id_categoria = $1
            RETURNING *;
        `;
        const { rows } = await pool.query(sql, [id_categoria]);
        return rows[0];
    }

    static async eliminarDefinitivo(input) {
        console.log("Repository eliminarDefinitivo");
        const { id_categoria } = input;

        // Verificar si hay artículos vinculados a esta categoría
        const checkSql = `SELECT COUNT(*) as total FROM articulos WHERE id_categoria = $1;`;
        const { rows: checkRows } = await pool.query(checkSql, [id_categoria]);
        const total = parseInt(checkRows[0].total, 10);

        if (total > 0) {
            throw new Error(`La categoría tiene ${total} artículo(s) vinculado(s) y no se puede eliminar definitivamente.`);
        }

        const sql = `
            DELETE FROM categorias
            WHERE id_categoria = $1
            RETURNING *;
        `;
        const { rows } = await pool.query(sql, [id_categoria]);
        return rows[0];
    }
}