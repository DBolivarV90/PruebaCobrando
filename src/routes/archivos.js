const express = require('express');
const router = express.Router();
const xlsx= require('xlsx');


router.get('/archivos',(req,res)=>{
    res.render('archivos');
});
/*
router.post('/archivos',(req,res)=>{
    const workbook=xlsx.readFile(req.ruta);
    const workbookSheets=workbook.SheetNames;
    console.log(workbookSheets);
});
*/

module.exports = router;