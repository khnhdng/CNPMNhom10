import { render } from "ejs";
import express, { application } from 'express'
import db from "../models/index";
import CRUDSevice from "../sevices/CRUDSevice";
import { json } from "body-parser";
import doibong from "../models/doibong";
import allcode from "../models/allcode";

let getHomePage = async (req, res) => {
    try {
        let dataLichThiDau = await CRUDSevice.getAllLichThiDau({
            raw: true,
        })
        let dataCauThu = await CRUDSevice.getAllCauThu({
            raw: true,
        })
        let dataTongKet = await CRUDSevice.getAllTongKet({
            raw: true,
        });
        let login = await CRUDSevice.getLogin({
            raw: true,
        })
        let data = await CRUDSevice.getAllUser({
            raw: true,
        });
        let dataDoiBong = await CRUDSevice.getALLDoiBong({
            raw: true,
        });
        let dataLichChuaThiDau = await CRUDSevice.getAllLichChuaThiDau({
            raw: true,
        });
        let dataLichDaThiDau = await CRUDSevice.getAllLichDaThiDau({
            raw: true,
        });
        let dataKetQua = await CRUDSevice.getAllKetQua({
            raw: true,
        })
        let dataTranDau = await CRUDSevice.getAllTranDau({
            raw: true,
        })
        console.log(dataDoiBong);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
            dataF: data,
            dataTongKet: dataTongKet,
            dataCauThu: dataCauThu,
            dataDoiBong: dataDoiBong,
            dataLichThiDau: dataLichThiDau,
            dataLichChuaThiDau: dataLichChuaThiDau,
            dataLichDaThiDau: dataLichDaThiDau,
            dataKetQua: dataKetQua,
            dataTranDau: dataTranDau,
            login: login,
            Login: JSON.stringify(login),
        });
    } catch (e) {
        console.log(e);
    }
}

let getInfoPage = (req, res) => {
    return res.render('infopage.ejs');
}

let getCRUDPage = (req, res) => {
    return res.render('CRUD.ejs');
}

let postCRUD = async (req, res) => {
    let mes = await CRUDSevice.createNewUser(req.body);
    console.log(mes);
    res.redirect('/');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDSevice.getAllUser({
        raw: true,
    });
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDSevice.getUserInfoById(userId);
        if (userData) {
            return res.render('edit-CRUD.ejs', {
                user: userData
            })
        }
    } else {
        return res.send('User not found!');
    }
}

let editCauThu = async (req, res) => {
    let maCauThu = req.query.maCauThu;
    if (maCauThu) {
        let cauThuData = await CRUDSevice.getCauThuByMaCauThu(maCauThu);
        if (cauThuData) {
            let login = await CRUDSevice.getLogin({
                raw: true,
            })
            let data = await CRUDSevice.getAllUser({
                raw: true,
            });
            let allcode = await CRUDSevice.getAllCode(login[0].userId);
            return res.render('edit-CRUD.ejs' ,{
                cauThu: cauThuData,
                dataF: data,
                login: login,
                doiBong : allcode.tenDoiBong
            })
        }
    }
    else {
        return res.send('Cầu thủ không tìm thấy!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDSevice.editUser(data);
    let allUsers = await db.User.findAll();
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });
}

let postCauThu = async (req, res) => {
    let data = req.body;
    await CRUDSevice.editCauThu(data);
    res.redirect('/manager');
}

let delCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDSevice.deleteUserById(userId);
        res.redirect('/admin')
    } else {
        return res.send('User not found!');
    }
}

let delCauThu = async (req, res) => {
    let maCauThu = req.query.maCauThu;
    if (maCauThu) {
        await CRUDSevice.deleteCauThuById(maCauThu);
        res.redirect('/manager');
    } else {
        return res.send('User not found!');
    }
}

let logout = async (req,res) => {
    await CRUDSevice.logoutCRUD();
    res.redirect('/')
}

let loginCRUD = async(req, res) => {
    let mes = await CRUDSevice.createNewLogin(req.body);
    console.log(mes);
    let login = await CRUDSevice.getLogin({ raw: true});
    if (login[0].roleId === 'guest')
    {
        res.redirect('/');
    }
    if (login[0].roleId == 'manager')
    {
        res.redirect('/manager');
    }
    if (login[0].roleId == 'banquanly')
    {
        res.redirect('/banquanly');

    }
    if (login[0].roleId == 'admin')
    {   
        res.redirect('/admin');
    }
}

let getManager = async(req, res) => 
{
    let login = await CRUDSevice.getLogin({
        raw: true
    })
    if (login.length> 0)
    {
        if (login[0].roleId === 'manager') {
            try{
                let allcode = await CRUDSevice.getAllCode(login[0].userId);
                let dataLichThiDau = await CRUDSevice.getAllLichThiDau({
                    raw: true,
                })
                let dataCauThu = await CRUDSevice.getAllCauThu({
                    raw: true,
                })
                let dataTongKet = await CRUDSevice.getAllTongKet({
                    raw: true,
                });
                let data = await CRUDSevice.getAllUser({
                    raw: true,
                });
                let dataDoiBong = await CRUDSevice.getALLDoiBong({
                    raw: true,
                });
                let dataLichChuaThiDau = await CRUDSevice.getAllLichChuaThiDau({
                    raw: true,
                });
                let dataKetQua = await CRUDSevice.getAllKetQua({
                    raw: true,
                });
                let dataTranDau = await CRUDSevice.getAllTranDau({
                    raw: true,
                });
                return res.render('Manager.ejs', {
                    data: JSON.stringify(data),
                    dataF: data,
                    dataTongKet: dataTongKet,
                    dataCauThu: dataCauThu,
                    dataDoiBong: dataDoiBong,
                    dataLichThiDau: dataLichThiDau,
                    dataLichChuaThiDau: dataLichChuaThiDau,
                    dataKetQua: dataKetQua,
                    dataTranDau: dataTranDau,
                    doiBong: allcode.tenDoiBong,
                    login: login,
                    Login: JSON.stringify(login)
                });
            } catch (e) {
                console.log(e);
            }
        }
        else
        {
        if (login[0].roleId === 'banquanly')  
            res.redirect('/banquanly');
        if (login[0].roleId === 'guest')  
            res.redirect('/');
        if (login[0].roleId === 'admin')  
            res.redirect('/admin');
        }
    }
    else
    {
        res.redirect('/');
    }
}

let getBanQuanLy = async(req, res) => 
{
    let login = await CRUDSevice.getLogin({
        raw: true
    });
    if (login.length> 0)
    {
        if (login[0].roleId === 'banquanly') {
            try{
                let data = await CRUDSevice.getAllUser({
                    raw :   true,
                });
                let dataDoiBong = await CRUDSevice.getALLDoiBong({
                    raw :   true,
                })
                let dataThamSo = await CRUDSevice.getAllThamSo({
                    raw :   true,
                })
                let dataCauThu = await CRUDSevice.getAllCauThu({
                    raw :   true,
                })  
                let dataLichDaThiDau = await CRUDSevice.getAllLichDaThiDau({
                    raw: true,
                });
                let dataLichChuaThiDau = await CRUDSevice.getAllLichChuaThiDau({
                    raw: true,
                });
                let dataLichThiDau = await CRUDSevice.getAllLichThiDau({
                    raw: true,
                })
                let dataKetQua = await CRUDSevice.getAllKetQua({
                    raw: true,
                });
                let dataTranDau = await CRUDSevice.getAllTranDau({
                    raw: true,
                });
                let dataTongKet = await CRUDSevice.getAllTongKet({
                    raw: true,
                });
                return res.render('BanQuanLy.ejs', {
                    data: JSON.stringify(data),
                    dataF: data,
                    dataDoiBong: dataDoiBong,
                    dataThamSo: dataThamSo,
                    dataCauThu: dataCauThu,
                    parseCauThu: JSON.stringify(dataCauThu),
                    parseDataDoiBong: JSON.stringify(dataDoiBong),
                    parseDataThamSo: JSON.stringify(dataThamSo),
                    dataLichDaThiDau: dataLichDaThiDau,
                    dataLichChuaThiDau: dataLichChuaThiDau,
                    dataKetQua: dataKetQua,
                    dataTranDau: dataTranDau,
                    dataTongKet: dataTongKet,
                    dataLichThiDau: dataLichThiDau,
                    pharsedataLichThiDau: JSON.stringify(dataLichThiDau),
                    login: login,
                    Login: JSON.stringify(login)
                });
            } catch (e) {
                console.log(e);
            }
        }
        if (login[0].roleId === 'manager')  
            res.redirect('/manager');
        if (login[0].roleId === 'guest')  
            res.redirect('/');
        if (login[0].roleId === 'admin')  
            res.redirect('/admin');
    } else
    {
        res.redirect('/');
    }
}


let postTeam = async (req, res) => {
    console.log(req.body.playerData.length);
    let mes = await CRUDSevice.createTeam(req.body);
    res.redirect('/banquanly');
}

let postLapLich = async (req, res) => {
    console.log(req.body);
    let lich = await CRUDSevice.getAllLichThiDau();
    console.log(req.body.teamName1.length);
    for (let i = 0; i < req.body.teamName1.length; i++) {
        let checkDB = false;
        for (let k = 0; k < lich.length; k++) {
            if (req.body.teamName1[i] === lich[k].tenDoiBong1 && req.body.teamName2[i] === lich[k].tenDoiBong2) {
                checkDB = true;
                let mes1 = await CRUDSevice.updateLichThiDau(req.body, i);
            }
        }
        if (!checkDB) {
            let mes2 = await CRUDSevice.createLichThiDau(req.body, i);
            console.log(lich.length);
        }
    }
    res.redirect('/banquanly');
}

let postDienBien = async (req,res) => {
    let data = req.body;  
    console.log(data);
    data.dienBien = JSON.parse(data.dienBien);
    let mes1 = await CRUDSevice.createDienBien(data);
    let mes2 = await CRUDSevice.createKetQua(data);
    res.redirect('/banquanly');
}

let getAdmin = async(req, res) => 
{
    let login = await CRUDSevice.getLogin({
        raw: true
    });
    if (login.length> 0)
    {
        if (login[0].roleId === 'admin') {
            try{
                let data = await CRUDSevice.getAllUser({
                    raw :   true,
                });
                let dataDoiBong = await CRUDSevice.getALLDoiBong({
                    raw :   true,
                })
                let dataThamSo = await CRUDSevice.getAllThamSo({
                    raw :   true,
                })
                let dataCauThu = await CRUDSevice.getAllCauThu({
                    raw :   true,
                })  
                let dataLichDaThiDau = await CRUDSevice.getAllLichDaThiDau({
                    raw: true,
                });
                let dataLichChuaThiDau = await CRUDSevice.getAllLichChuaThiDau({
                    raw: true,
                });
                let dataLichThiDau = await CRUDSevice.getAllLichThiDau({
                    raw: true,
                })
                let dataKetQua = await CRUDSevice.getAllKetQua({
                    raw: true,
                });
                let dataTranDau = await CRUDSevice.getAllTranDau({
                    raw: true,
                });
                let dataTongKet = await CRUDSevice.getAllTongKet({
                    raw: true,
                });
                let allcode = await CRUDSevice.getAllAllCode();
                return res.render('Admin.ejs', {
                    data: JSON.stringify(data),
                    dataF: data,
                    dataDoiBong: dataDoiBong,
                    dataThamSo: dataThamSo,
                    dataCauThu: dataCauThu,
                    parseDataDoiBong: JSON.stringify(dataDoiBong),
                    parseDataThamSo: JSON.stringify(dataThamSo),
                    dataLichDaThiDau: dataLichDaThiDau,
                    dataLichChuaThiDau: dataLichChuaThiDau,
                    dataKetQua: dataKetQua,
                    dataTranDau: dataTranDau,
                    dataTongKet: dataTongKet,
                    dataLichThiDau: dataLichThiDau,
                    pharsedataLichThiDau: JSON.stringify(dataLichThiDau),
                    login: login,
                    Login: JSON.stringify(login),
                    allcode: JSON.stringify(allcode)
                    
                });
            } catch (e) {
                console.log(e);
            }
        }
        if (login[0].roleId === 'manager')  
            res.redirect('/manager');
        if (login[0].roleId === 'guest')  
            res.redirect('/');
        if (login[0].roleId === 'banquanly')  
            res.redirect('/banquanly');
    } else
    {
        res.redirect('/');
    }
}

let themCauThu = async (req,res) => {
    let login = await CRUDSevice.getLogin({ raw: true});
    let allcode = await CRUDSevice.getAllCode(login[0].userId);
    let data = await CRUDSevice.getAllUser({
        raw: true,
    });
    return res.render('themCauThu.ejs', {
        dataF: data,
        doiBong : allcode.tenDoiBong,
        login: login
    });
}

let themCauThuVuaNhap = async (req,res) => {
    let mes = await CRUDSevice.createCauThu(req.body);
    res.redirect('/manager');
}

let updateUser = async (req,res) => {
    let mes = await CRUDSevice.updateUserRole(req.body);
    res.redirect('/admin');
}

module.exports = {
    getHomePage: getHomePage,
    getInfoPage: getInfoPage,
    getCRUDPage: getCRUDPage,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    delCRUD: delCRUD,
    loginCRUD: loginCRUD,
    getManager: getManager,
    getBanQuanLy: getBanQuanLy,
    postTeam: postTeam,
    getAdmin: getAdmin,
    postDienBien: postDienBien,
    logout: logout,
    postLapLich: postLapLich,
    editCauThu: editCauThu,
    postCauThu: postCauThu,
    delCauThu: delCauThu,
    themCauThu: themCauThu,
    themCauThuVuaNhap: themCauThuVuaNhap,
    updateUser: updateUser
}
