const express = require("express");
const User = require("../models/UserSchema")
const DeletedUser = require("../models/DeletedUserSchema")
const Device = require("../models/DeviceSchema")

export const router = express.Router()

// Post method
router.post('/register', (req: any, res: any) => {
    const user = new User({
        email:req.body.email,
        name:req.body.name
    })
    user.save(function (err: any, res: any) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
        }
    })
})

// Get all method

// Get one method
router.get('/account', (req: any, res: any) => {
    User.findOne({email: req.headers.email}, function(err: any, result: any) {
        if (err) {
            res.json({success: false, message: 'Invalid credentials'})
            console.log(err)
        }
        else if (result === null) {
            res.json({success: false, message: "User doesn't exist"})
            console.log("The result is: ", result, " no ", req.header.email)
        }
        else {
            res.json({success: true, message: "Successful", result: result})
            console.log("The result is: ", result)
        }
    });
})

// Update one

// Delete one

router.delete('/deleteAccount/:email', (req:any, res:any) => {
    console.log(req.params.email);
    User.deleteOne({email: req.params.email},  (err:any, res:any) => {
        if (err) {
            console.log(err);
        }else{
            console.log("Account deleted");
        }
    });
});

// Delete all

// Get Device by Uuid
router.get('/devices/search/:uuid', (req:any, res:any) => {
    Device.findOne({ uuid: req.params.uuid }, (err:any, device:any) => {
      if (err) {
        console.log(err);
      }
      res.send(device);
    });
});

// Patch Device to Account
router.patch('/accounts/:email/add-device', (req:any, res:any) => {
    User.findOneAndUpdate({email: req.params.email}, { $push: { devicesLinked: req.body.deviceId } }, (err:any, account:any) => {
      if (err) {
        console.log(err);
      }
      res.send(account);
    });
});


// Delete account
router.post('/transferDeletedAccount', (req: any, res: any) => {
    const deletedUser = new DeletedUser({
        _id: req.body._id,
        creationDate: req.body.creationDate,
        lastUpdated: new Date(), 
        email:req.body.email,
        name:req.body.name,
        devicesLinked: req.body.devicesLinked
    })
    deletedUser.save(function (err: any, res: any) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
        }
    })
})

module.exports = router

