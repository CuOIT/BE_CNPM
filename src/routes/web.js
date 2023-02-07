import express from "express";
import userController from "../controllers/userController"
import voucherController from "../controllers/voucherController"

let router = express.Router();

let initRoutes = (app) => {

    //usercontroller
    router.get('/api/login', userController.handleUserLogin); //OK
    router.post('/api/create-new-user', userController.handleCreateNewUser); //OK
    router.delete('/api/delete-user', userController.handleDeleteUser); //OK
    router.put('/api/edit-user-info-by-phone', userController.handleEditUserInfoByPhone);//OK
    router.get('/api/get-all-users', userController.handleGetAllUsers);//OK
    router.get('/api/get-user-by-id', userController.handleGetUserById);//OK
    router.get('/api/get-user-by-phone', userController.handleGetUserByPhone);//OK

    //vouchercontroller
    router.post('/api/create-new-voucher', voucherController.handleCreateNewVoucher); // OK
    router.delete('/api/delete-voucher', voucherController.handleDeleteVoucher); //OK
    router.put('/api/edit-voucher-info-by-id', voucherController.handleEditVoucherById); //OK
    router.get('/api/get-all-vouchers', voucherController.handleGetAllVouchers);//OK
    router.get('/api/get-voucher-info-by-id', voucherController.handleGetVoucherById);//
    router.get('/api/get-voucher-info-by-code', voucherController.handleGetVoucherByCode);//

    return app.use("/", router);
}


module.exports = initRoutes;