import express from "express";
import homeController from "../controllers/homeController";
import { route } from "express/lib/router";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/info', homeController.getInfoPage);
    router.get('/crud', homeController.getCRUDPage);
    router.post('/post-crud', homeController.postCRUD);
    router.post('/put-cauthu', homeController.postCauThu);
    router.get('/get-CRUD', homeController.displayGetCRUD);
    router.get('/edit-CRUD', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.delCRUD);
    router.get('/deleteCauThu', homeController.delCauThu);
    router.post('/login', homeController.loginCRUD);
    router.get('/manager', homeController.getManager);
    router.get('/banquanly', homeController.getBanQuanLy);
    router.post('/post-teaminf', homeController.postTeam);
    router.get('/admin', homeController.getAdmin);
    router.post('/postDienBien', homeController.postDienBien);
    router.get('/editCauThu', homeController.editCauThu)
    router.get('/logout',homeController.logout);
    router.post('/postLapLich', homeController.postLapLich);
    router.get('/addCauThu', homeController.themCauThu);
    router.post('/updateuser', homeController.updateUser);
    router.post('/themCauThu', homeController.themCauThuVuaNhap);
    return app.use("/", router);
}

module.exports = initWebRoutes;