const express = require('express');
const router = express.Router();
const User = require('../Model/User.js')

router.get('/',async(req,res)=>{
    const data= await User.find()
       res.json(data)
})

router.post('/',async(req,res)=>{
    const { title, desc } = req.body;
    const newdata = new User({ title, desc });
    const savedata = await newdata.save();    
    res.send(savedata)    
})

router.put("/:id",async (req,res)=>{
    const {title , desc}  = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { title, desc },
        { new: true } 
    );
    res.json(updatedUser)
});

router.delete("/:id", async(req,res)=>{
    const deletedata = await User.findByIdAndDelete(req.params.id)

    if (!deletedata) {
        return res.status(404).json({ message: "data not found" });
    }
    res.status(200).json({ message: "data deleted successfully" });})

module.exports = router;