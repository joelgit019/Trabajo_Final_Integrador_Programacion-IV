import { pool } from "../config/db.js";

export class AreasRepository {
    static async getAll(input = {}) {
        const { activo } = input;
        const sql = `
            SELECT id_area, descripcion, activo
            FROM areas
            WHERE ($1::text IS NULL OR activo = $1::int)
            ORDER BY id_area ASC;
        `;
        const { rows } = await pool.query(sql, [activo !== undefined && activo !== null ? activo : null]);
        return rows;
    }

    static async getByID(input) {
        const id = typeof input === 'object' && input !== null ? (input.id_area ?? input.id) : input;
        const sql = `
            SELECT id_area, descripcion, activo
            FROM areas
            WHERE id_area = $1;
        `;
        const { rows } = await pool.query(sql, [id]);
        return rows[0];
    }
}

