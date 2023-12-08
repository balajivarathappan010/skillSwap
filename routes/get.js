const express = require('express');
const userControl = require('../controllers/register');
const fs = require('fs');
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('login');
})

router.get('/experienced', (req, res)=>{
    res.render('experienced');
})

router.get('/fresher', (req, res)=>{
    res.render('fresher');
})

router.get('/Home', (req, res)=>{
    res.render('Home');
})

router.get('/signup', (req, res)=>{
    res.render('signup');
})

router.get('/arts', (req, res)=>{
    res.render('arts');
})

router.get('/engineering', (req, res)=>{
    res.render('engineering');
})

router.get('/singleMaterials',(req, res)=>{
    res.render('singleMaterials');
})

router.get('/welcome', (req, res)=>{
    res.render('welcome');
})

router.get('/data', async(req, res)=>{
    res.render('data');
})
router.get('/download/:file', (req, res) => {
    const filePath = `./uploads/${req.params.file}`;
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${req.params.file}`);
    fileStream.pipe(res);
  });
router.get(userControl.getItems);

module.exports = router;