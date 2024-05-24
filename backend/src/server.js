import express,{json} from 'express';
import cors from 'cors';
import {db,connectToDB} from "./db.js";
import { ObjectId } from 'mongodb';
const app=express()

app.use(express.json())

app.use(cors())

connectToDB(()=>
{
    app.listen(8000,()=>
    {
        console.log('server started at 8000');
    });
})

app.get('/',(req,res)=>{
    res.send("Server Running Successfully ✅");
    });


// app.post('/voter-reg/:name/:age/:address/:district/:qualification/:caste/:phoneNum/:NRI',async(req,res)=>
// {
//     const cred_s=await db.collection('voter_details').insertOne(
//     {
//     age:req.params.age,
//     address:req.params.address,
//     district:req.params.district,
//     qualification:req.params.qualification,
//     caste:req.params.caste,
//     phoneNum:req.params.phoneNum,
//     NRI:req.params.NRI
//     }
//     );
//     res.json(cred_s)
// })

app.post('/voter-reg/:name/:age/:aadharNumber/:address/:district/:qualification/:caste/:phoneNum/:NRI', async (req, res) => {
    try {
        // Read parameters from the request
        const { name, age,aadharNumber, address, district, qualification, caste, phoneNum, NRI } = req.params;

        // Insert data into the database
        const result = await db.collection('voter_details').insertOne({
            name,
            age,
            aadharNumber,
            address,
            district,
            qualification,
            caste,
            phoneNum,
            NRI
        });

        // Return the result as a JSON response
        res.json(result);
    } catch (error) {
        // Handle any errors that may occur
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.post('/candidate-reg/:name/:age/:aadharNumber/:address/:district/:qualification/:caste/:phoneNum/:party', async (req, res) => {
    try {
        // Read parameters from the request
        const { name, age,aadharNumber ,address, district, qualification, caste, phoneNum, party } = req.params;

        // Insert data into the database
        const result = await db.collection('candidate_details').insertOne({
            name,
            age,
            aadharNumber,
            address,
            district,
            qualification,
            caste,
            phoneNum,
            party
        });

        // Return the result as a JSON response
        res.json(result);
    } catch (error) {
        // Handle any errors that may occur
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

//fetch the data of candidates
// app.get('/display-candidate',async(req,res)=>
//     {
//         const details=await db.collection("candidate_details").find(
//             {name:req.params.name},
//             {party:req.params.party}
//             ).toArray();
//         res.json(details);
//     }
//     )

// app.get('/display-candidate', async (req, res) => {
//     try {
//       const details = await db.collection("candidate_details").find().toArray();
//       res.json(details);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).send("Error fetching data");
//     }
//   });

// app.get('/display-candidate', async (req, res) => {
//     const { name, party } = req.query;
//     const query = {};
//     if (name) query.name = name;
//     if (party) query.party = party;
    
//     try {
//       const details = await db.collection("candidate_details").find(query).toArray();
//       res.json(details);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).send("Error fetching data");
//     }
//   });

app.get('/display-candidate', async (req, res) => {
  const { name, party, district } = req.query; // Extract place from query parameters
  const query = {};

  if (name) query.name = name;
  if (party) query.party = party;
  if (district) query.district = district; // Add place to the query if it exists

  try {
    const details = await db.collection("candidate_details").find(query).toArray();
    res.json(details);
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
      const details = await db.collection("candidate_details").find(query).toArray();
      res.json(details);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  });



  //vote to increment count 
  app.post('/vote', async (req, res) => {
    const { name } = req.body;
  
    try {
      const result = await db.collection("candidate_details").updateOne(
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
  

//login 
app.get('/login/:name/:aadharNumber/:district',async(req,res)=>
  {
      const result=await db.collection('voter_details').findOne(
      {name:req.params.name,
      aadharNumber:req.params.aadharNumber,
      district:req.params.district}
      );
      res.json(result)
  })  
  

app.get('/admin-candidates', async (req, res) => {
    try {
      const candidates = await db.collection("candidate_details").aggregate([
        {
          $group: {
            _id: "$district", // Group by place
            candidates: { $push: "$$ROOT" } // Push all candidate details to an array
          }
        },
        {
          $sort: { _id: 1 } // Sort the groups by place name 
        }
      ]).toArray();
  
      res.json(candidates);
    } catch (error) {
      console.error("Error fetching grouped candidates:", error);
      res.status(500).send("Error fetching data");
    }
});
  

app.delete('/remove-candidate/:id', async (req, res) => {
  const candidateId = req.params.id;

  try {
    const result = await db.collection("candidate_details").deleteOne({ _id: new ObjectId(candidateId) });

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
    const candidates = await db.collection("voter_details").aggregate([
      {
        $group: {
          _id: "$district", // Group by place
          candidates: { $push: "$$ROOT" } // Push all candidate details to an array
        }
      },
      {
        $sort: { _id: 1 } // Sort the groups by place name 
      }
    ]).toArray();

    res.json(candidates);
  } catch (error) {
    console.error("Error fetching grouped candidates:", error);
    res.status(500).send("Error fetching data");
  }
});

app.delete('/remove-voter/:id', async (req, res) => {
  const voterId = req.params.id;

  try {
    const result = await db.collection("voter_details").deleteOne({ _id: new ObjectId(voterId) });

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


app.get('/admin-login/:name/:password',async(req,res)=>
  {
      const result=await db.collection('admin').findOne(
      {name:req.params.name,
      password:req.params.password
      }
      );
      res.json(result)
  })  