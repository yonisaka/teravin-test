const { EPERM } = require('constants');
var path = require('path')
const EmployeeModel = require('../models/employee.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

class EmployeeController {
    index = async (req, res, next) => {
        res.render(path.join(__dirname, '../views/employee/index'), {
            title : 'List Employee'
        });   
    }
    
    datatable = async (req, res, next) => {
        let employeeList = await EmployeeModel.find();

        res.status(200).json({ data : employeeList });
    }

    create = async (req, res, next) => {
        const validate = this.checkValidation(req);
        if(validate.status == 'error'){
            res.status(200).json({ status_code: 400, msg: validate.errors }); res.end();
            return false;
        }
        // generate prefix
        var dateObj = new Date();
        var year = dateObj.getFullYear().toString().substr(-2);
        var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        var prefix = year+""+month
        // get new id
        const new_id = await EmployeeModel.getNewId({prefix});
        var id = prefix+""+new_id;
        var alamat = req.body['alamat[]'];
        if (alamat instanceof Array){
            for (var i = 0; i < alamat.length; i++) {
                var params = {
                    id_employee : id,
                    alamat : alamat[i]
                };
                await EmployeeModel.createAlamat(params)
            }
        } else {
            var params = {
                id_employee : id,
                alamat : alamat
            };
            await EmployeeModel.createAlamat(params)
        }
        
        var params = {
            id : id,
            name : req.body.name,
            email : req.body.email,
            mobile : req.body.mobile,
            birth_date : req.body.birth_date
        }
        const result = await EmployeeModel.create(params);
       
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(200).json({ status_code: 200, notif_st: true, notif_msg: "Berhasil mendaftar" }); res.end();
        return false;
    };

    update = async (req, res, next) => {
        const validate = this.checkValidation(req);
        if(validate.status == 'error'){
            res.status(200).json({ status_code: 400, msg: validate.errors }); res.end();
            return false;
        }

        const { ...restOfUpdates } = req.body;
        var params = {
            name : restOfUpdates.name,
            email : restOfUpdates.email,
            mobile : restOfUpdates.mobile,
            birth_date : restOfUpdates.birth_date
        }
        const result = await EmployeeModel.update(params, req.params.id);

        const deleteAlamat = await EmployeeModel.deleteAlamat(req.params.id);

        var id = req.params.id;
        var alamat = req.body['alamat[]'];
        if (alamat instanceof Array){
            for (var i = 0; i < alamat.length; i++) {
                var params = {
                    id_employee : id,
                    alamat : alamat[i]
                };
                await EmployeeModel.createAlamat(params)
            }
        } else {
            var params = {
                id_employee : id,
                alamat : alamat
            };
            await EmployeeModel.createAlamat(params)
        }
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        res.status(200).json({ status_code: 200, notif_st: true, notif_msg: "Berhasil update" }); res.end();
        return false;
    }

    delete = async (req, res, next) => {
        const result = await EmployeeModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }
        res.status(200).json({ status_code: 200, notif_st: true, notif_msg: "Berhasil delete" }); res.end();
        return false;
    };

    getById = async (req, res, next) => {
        const result = await EmployeeModel.findOne({ id: req.params.id });
        const alamat = await EmployeeModel.listAlamat({ id: req.params.id });
        if (!result) {
            throw new HttpException(404, 'Employee not found');
        }

        res.status(200).json({ status_code: 200, notif_st: true, notif_msg: "Berhasil mendaftar, silahkan tunggu verifikasi dari admin.", data: result, alamat: alamat }); res.end();
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let res = {
                status: 'error',
                errors
            };
            return res
            // throw new HttpException(400, 'Validation failed', errors);
        }
        let res = {
            status: 'success',
        };
        return res
    }
}

module.exports = new EmployeeController;