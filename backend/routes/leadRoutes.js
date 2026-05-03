const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.get("/", async (req,res)=>{
    const leads = await Lead.find();
    res.json(leads);
});

router.post("/", async (req,res)=>{
    try{
    const lead = new Lead(req.body);
    const savedLead = await lead.save();
    res.json(savedLead);
    }
    catch(error){
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req,res)=>{

  await Lead.findByIdAndDelete(req.params.id);

  res.json({message:"Lead deleted"});

});

router.put("/:id", async (req,res)=>{

  try{

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedLead);

  }
  catch(error){
    res.status(500).json(error);
  }

});

router.post("/bulk", async (req, res) => {

  try{

    const leads = req.body;

    await Lead.insertMany(leads);

    res.json({ message: "Bulk upload successful" });

  }
  catch(error){
    res.status(500).json(error);
  }

});

module.exports = router;