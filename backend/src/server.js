import express,{json} from 'express';
import cors from 'cors';
import {db,connectToDB} from "./db.js";
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

app.post('/voter-reg/:name/:age/:address/:district/:qualification/:caste/:phoneNum/:NRI', async (req, res) => {
    try {
        // Read parameters from the request
        const { name, age, address, district, qualification, caste, phoneNum, NRI } = req.params;

        // Insert data into the database
        const result = await db.collection('voter_details').insertOne({
            name,
            age,
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

