const express = require('express');
const router = express.Router();
const firestoreController = require('../controller/firestoreController');
const userController = require('../controller/userController');
const { getAllBanhCuon, addBanhCuon, updateBanhCuon, deleteBanhCuon, getBanhCuonById } = require('../controller/banhcuonController');
const { getAllCom, addCom, getComById, updateCom, deleteCom} = require('../controller/comController');
const { getAllHaisan, getHaisanById, addHaisan, updateHaisan, deleteHaisan} = require('../controller/haisan');
const { getAllGaboHeo, getGaboHeoById, createGaboHeo, deleteGaboHeo, updateGaboHeo } = require('../controller/gaboheo');
const {getAllMonSoi, getMonSoiById, deleteMonSoi, addMonSoi, updateMonSoi} = require('../controller/monsoiController');

// Route để thêm một tài liệu mới vào một collection
router.post('/add', firestoreController.addDocument);

// Route để lấy các tài liệu từ một collection
router.get('/data', firestoreController.getDocuments);

// login
router.post('/login', userController.login);
router.post('/register', userController.register);

// lấy tất cả bánh cuốn
router.get('/banhcuon', getAllBanhCuon);
router.post('/addBanhCuon', addBanhCuon);
router.delete('/deleteBanhCuon/:id', deleteBanhCuon);
router.put('/updateBanhCuon/:id', updateBanhCuon);
router.get('/getBanhCuon/:id', getBanhCuonById);

// Lấy tất cả món cơm
router.get('/com', getAllCom);
router.post('/com', addCom);
router.get('/com/:id', getComById);
router.put('/com/:id', updateCom);
router.delete('/com/:id', deleteCom);

// Hải sản
router.get('/haisan', getAllHaisan);
router.get('/haisan/:id', getHaisanById);
router.post('/haisan', addHaisan);
router.put('/haisan/:id', updateHaisan);
router.delete('/haisan/:id', deleteHaisan);

// gà bò heo
router.get('/gaboheo/:id', getGaboHeoById);
router.post('/gaboheo', createGaboHeo);
router.put('/gaboheo/:id', updateGaboHeo);
router.delete('/gaboheo/:id', deleteGaboHeo);
router.get('/gaboheo', getAllGaboHeo);

// món sợi
router.get('/monsoi', getAllMonSoi);
router.get('/monsoi/:id', getMonSoiById);
router.post('/monsoi', addMonSoi);
router.put('/monsoi/:id', updateMonSoi);
router.delete('/monsoi/:id', deleteMonSoi);

module.exports = router;