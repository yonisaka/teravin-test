const query = require('../db/db.config');
const { multipleColumnSet } = require('../utils/common.utils');

class EmployeeModel {
    tableName = 'employee';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ id, name, email, mobile, birth_date }) => {
        const sql = `INSERT INTO ${this.tableName}
        (id, name, email, mobile, birth_date) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [id, name, email, mobile, birth_date]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    
    listAlamat = async ({ id }) => {
        let sql = `SELECT * FROM alamat
        WHERE id_employee = ?`;

        const result = await query(sql, [ id ]);

        return result;
    }

    createAlamat = async ({ id_employee, alamat }) => {
        const sql = `INSERT INTO alamat
        ( id_employee, alamat ) VALUES (?,?)`;

        const result = await query(sql, [ id_employee, alamat ]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    deleteAlamat = async (id) => {
        const sql = `DELETE FROM alamat
        WHERE id_employee = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    getNewId = async ({ prefix }) => {
        const sql = `SELECT RIGHT(id,4)+1 AS id FROM ${this.tableName}
        WHERE LEFT(id,4) = ?
        ORDER BY id DESC LIMIT 1`;

        const result = await query(sql, [ prefix ]);

        var num = result[0] ? result[0].id.toString() : '1';
        while(num.length < 4){
            num = "0" + num;
        }
        return num;
    }
}

module.exports = new EmployeeModel;