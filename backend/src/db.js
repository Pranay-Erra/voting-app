import {MongoClient} from "mongodb";

let db; 

async function connectToDB(cb){
    const url = "mongodb+srv://pranayerra2003:Pranay@cluster0.gmrrjw4.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("VOTING_APP");
    cb();
}

export {db,connectToDB};