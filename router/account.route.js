//***************PACKAGE-IMPORTS***************
const express = require('express')
//****************FILE-IMPORTS*****************
const account_fnc = require('../functions/account.fnc');

//******************SCRIPT*********************
const router = express.Router();

router.post('/account/register', (req, res)=> {
    account_fnc.register_account(
        req,
        req.body.username,
        req.body.password,
        req.body.firstname,
        req.body.lastname,
        req.body.birthday,
        req.body.street,
        req.body.number,
        req.body.city,
        req.body.plz,
        req.body.email,
        req.body.tel_mobil,
        req.body.tel_work,
        req.body.tel_home,
        req.body.instagram,
        req.body.facebook,
        req.body.twitter,
        req.body.snapchat,
        res
    )
})
router.post('/account/login', (req, res) => {
    account_fnc.credential_login(
        req,
        req.body.username,
        req.body.password,
        res
    )
})

router.post('/account/key_login', (req, res) => {
    account_fnc.key_login(
        req,
        req.body.uid,
        req.body.key,
        res
    )
})

module.exports = router;