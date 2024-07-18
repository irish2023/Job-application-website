import express from "express";
import cors from "cors"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Job } from "./Models/jobModel.js";
import { ObjectId } from "mongodb";
//import {jobSchema} from '../jobModel.js'
const app = express();

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=> {
  console.log(req)
  return res.status(234).send("welcome to MERN stack Tutorial")
})

//Route for save a job

/*app.post('/post-job', async (req,res) => {
  const body = req.body;
  body.createAt = new Date();

  const result = await Job.create(body);
  if(result.createId){
    return res.status(200).send(result);
  }else{
    return res.status(404).send({
      message: " can not insert",
      status: false
    })
  }
}) */

app.post('/post-job', async (req,res) => {
  const body = req.body;
  try {
if(
  !body.companyName || !body.jobTitle || !body.postingDate || !body.salaryType || !body.minPrice || !body.maxPrice ||
  !body.companyLogo || !body.experienceLevel || !body.employmentType || !body.description || !body.jobLocation || !body.postedBy
  ){
    return res.status(509).send({message: "send all required fields: companyName, jobTitle, postingDate, salaryType, e.t.c ",
  status: false})
  }
  const newJob = {
    companyName: body.companyName, jobTitle: body.jobTitle, postingDate: body.postingDate, salaryType: body.salaryType,
    companyLogo: body.companyLogo, experienceLevel: body.experienceLevel, employmentType: body.employmentType, postedBy: body.postedBy,
    jobLocation: body.jobLocation, maxPrice: body.maxPrice, minPrice: body.minPrice, description: body.description
  };

  const job = await Job.create(newJob);
  return res.status(201).send(job)
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message})
  }
}) 



app.get('/all-job', async(req,res) =>{
  const jobs = await Job.find({})
  res.send(jobs)
})


// get jobs by email
app.get("/myJobs/:email", async (req,res) =>{
  //console.log(req.params.email)
  const jobs = await Job.find({postedBy: req.params.email})
  res.send(jobs)
})

// route for getting specific job
app.get("/all-job/:id", async(req,res) =>{
const id = req.params.id;
const job = await Job.findOne({
  _id: new ObjectId(id)
})
res.send(job)
})

// route for an update
app.put("/update-job/:id", async(req,res) =>{
const {id} = req.params.id;
const jobData = req.body;
const filter = {_id: new ObjectId(id)};
const options = { upsert: true};
const updateDoc = { $set: {...jobData}}
const result = await Job.updateOne(filter,updateDoc,options)
res.send(result);
})


// delete jobs by id
app.delete("/job/:id", async(req,res) =>{

try {
  const { id } = req.params;
  const result = await Job.findByIdAndDelete(id)
  if(!result){
      res.status(404).json({message: 'job not found'})
  }
  return res.status(200).json({message: 'job deleted successfully'})
  
} catch (error) {
  console.log(error.message)
  res.status(500).json({message: error.message
  })
}
})


mongoose
.connect(mongoDBURL)
.then(() => {console.log("app connected to db");
app.listen(PORT,()=>{
  console.log(`App is listening to : ${PORT}`);
})
})

.catch((err) => {
  console.log(err)
})