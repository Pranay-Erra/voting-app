import express from 'express';
import cors from 'cors';
import { db, connectToDB } from "./db.js";
import { ObjectId } from 'mongodb';
import multer from 'multer';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());
app.use(cors());

connectToDB(() => {
  app.listen(8000, () => {
    console.log('Server started at 8000');
  });
});

app.get('/', (req, res) => {
  res.send("Server Running Successfully ✅");
});

app.post('/voter-reg/:name/:age/:aadharNumber/:address/:district/:qualification/:caste/:phoneNum/:email/:NRI', async (req, res) => {
  try {
    const { name, age, aadharNumber, address, district, qualification, caste, phoneNum, NRI } = req.params;
    const result = await db.collection('voter_details').insertOne({
      name,
      age,
      aadharNumber,
      address,
      district,
      qualification,
      caste,
      phoneNum,
      email,
      NRI
    });
    res.json(result);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

const candidateSchema = new mongoose.Schema({
  name: String,
  age: Number,
  aadhaarNumber: String,
  address: String,
  district: String,
  qualification: String,
  caste: String,
  phone: String,
  party: String,
  partySymbol: Buffer,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// app.post('/candidate-reg', upload.single('partySymbol'), async (req, res) => {
//   try {
//     const { name, age, aadhaarNumber, address, district, qualification, caste, phone, party } = req.body;
    
//     if (!name || !age || !aadhaarNumber || !address || !district || !qualification || !caste || !phone || !party) {
//       return res.status(400).send('All fields are required');
//     }

//     if (!req.file) {
//       return res.status(400).send('Party symbol image is required');
//     }

//     const partySymbol = req.file.buffer;

//     const candidate = new Candidate({
//       name,
//       age,
//       aadhaarNumber,
//       address,
//       district,
//       qualification,
//       caste,
//       phone,
//       party,
//       partySymbol,
//     });

//     await candidate.save();
//     res.status(200).send('Candidate registered successfully');
//   } catch (error) {
//     console.error('Error registering candidate:', error);
//     res.status(500).send('Error registering candidate');
//   }
// });

app.post('/candidate-reg', upload.single('partySymbol'), async (req, res) => {
  try {
    // Request body parameters
    const { name, age, aadhaarNumber, address, district, qualification, caste, phone, party } = req.body;

    // Check if all fields are provided
    if (!name || !age || !aadhaarNumber || !address || !district || !qualification || !caste || !phone || !party) {
      return res.status(400).send('All fields are required');
    }

    // Check if party symbol image is provided
    if (!req.file) {
      return res.status(400).send('Party symbol image is required');
    }

    // Retrieve party symbol from request buffer
    const partySymbol = req.file.buffer;

    // Create new Candidate document using Mongoose model
    const candidate = new Candidate({
      name,
      age,
      aadhaarNumber,
      address,
      district,
      qualification,
      caste,
      phone,
      party,
      partySymbol,
    });

    // Save candidate document to MongoDB
    await candidate.save();
    res.status(200).send('Candidate registered successfully');
  } catch (error) {
    console.error('Error registering candidate:', error);
    res.status(500).send('Error registering candidate');
  }
});


app.get('/display-candidate', async (req, res) => {
  const { name, party, district } = req.query;
  const query = {};
  if (name) query.name = name;
  if (party) query.party = party;
  if (district) query.district = district;
  try {
    const details = await db.collection("candidates").find(query).toArray();

    // Convert binary data to base64 string
    const modifiedDetails = details.map(candidate => {
      if (candidate.partySymbol) {
        candidate.partySymbol = candidate.partySymbol.toString('base64');
      }
      return candidate;
    });

    res.json(modifiedDetails);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});


app.get('/dashboard', async (req, res) => {
  const { name, party } = req.query;
  const query = {};
  if (name) query.name = name;
  if (party) query.party = party;
  try {
    const details = await db.collection("candidates").find(query).toArray();
    res.json(details);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.post('/vote', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.collection("candidates").updateOne(
      { name: name },
      { $inc: { votes: 1 } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).send("Vote registered successfully");
    } else {
      res.status(404).send("Candidate not found");
    }
  } catch (error) {
    console.error("Error updating vote count:", error);
    res.status(500).send("Error updating vote count");
  }
});

app.get('/login/:name/:aadharNumber/:district', async (req, res) => {
  const result = await db.collection('voter_details').findOne({
    name: req.params.name,
    aadharNumber: req.params.aadharNumber,
    district: req.params.district
  });
  res.json(result);
});

app.get('/admin-candidates', async (req, res) => {
  try {
    const candidates = await db.collection("candidates").aggregate([
      {
        $group: {
          _id: "$district",
          candidates: { $push: "$$ROOT" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Fetch party symbol data for each candidate
    for (const group of candidates) {
      for (const candidate of group.candidates) {
        const partySymbolData = await db.collection("candidates").findOne(
          { _id: candidate._id },
          { projection: { partySymbol: 1 } }
        );
        candidate.partySymbol = partySymbolData.partySymbol;
      }
    }

    res.json(candidates);
  } catch (error) {
    console.error("Error fetching grouped candidates:", error);
    res.status(500).send("Error fetching data");
  }
});


app.delete('/remove-candidate/:id', async (req, res) => {
  const candidateId = req.params.id;
  try {
    const result = await db.collection("candidates").deleteOne({ _id: new ObjectId(candidateId) });
    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Candidate removed successfully" });
    } else {
      res.status(404).send({ message: "Candidate not found" });
    }
  } catch (error) {
    console.error("Error removing candidate:", error);
    res.status(500).send("Error removing candidate");
  }
});




app.get('/admin-voter', async (req, res) => {
  try {
    const voters = await db.collection("voter_details").aggregate([
      {
        $group: {
          _id: "$district",
          voters: { $push: "$$ROOT" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    res.json(voters);
  } catch (error) {
    console.error("Error fetching grouped voters:", error);
    res.status(500).send("Error fetching data");
  }
});

app.delete('/remove-voter/:id', async (req, res) => {
  const voterId = req.params.id;
  try {
    const result = await db.collection("voter_details").deleteOne({ _id: new ObjectId(voterId) });
    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Voter removed successfully" });
    } else {
      res.status(404).send({ message: "Voter not found" });
    }
  } catch (error) {
    console.error("Error removing voter:", error);
    res.status(500).send("Error removing voter");
  }
});

app.get('/admin-login/:name/:password', async (req, res) => {
  const result = await db.collection('admin').findOne({
    name: req.params.name,
    password: req.params.password
  });
  res.json(result);
});


let otpStore = {}; // Temporary store for OTPs

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'pranayerra2003@gmail.com',
      pass: 'hqia xwbl pzzp zlso'
  },
  tls: {
      rejectUnauthorized: false
  }
});

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const mailOptions = {
        from: 'pranayerra2003@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true });
        }
    });
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] == otp) {
        delete otpStore[email]; // OTP is valid, remove it from store
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
}); 