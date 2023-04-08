const express = require('express');
const { MongoClient,ObjectId} = require("mongodb");

const app = express();
const port = 3000; // Change this to the port you want to use

async function readDocuments(client, databaseName, collectionName, query = {}) {
    const result = await client.db(databaseName).collection(collectionName).find(query).toArray();
    return result;
}
async function createDocument(client, databaseName, collectionName, document) {
	const result = await client.db(databaseName).collection(collectionName).insertOne(document);
	console.log(`Created document with _id: ${result.insertedId}`);
}


// Enable CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/Rooms', async (req, res) => {
    const uri = "mongodb+srv://kishor:Kishor55@cluster0.hcjogvm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await readDocuments(client, "Question_Forum", "Rooms");
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});
app.get('/Rooms/:id', async (req, res) => {
    const uri = "mongodb+srv://kishor:Kishor55@cluster0.hcjogvm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        let query = {_id: new ObjectId(req.params.id)};
        console.log(query);
        const result = await client.db("Question_Forum").collection("Rooms").findOne(query);
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.use(express.json());

app.post('/Rooms', async (req, res) => {
    const uri = "mongodb+srv://kishor:Kishor55@cluster0.hcjogvm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await createDocument(client, "Question_Forum", "Rooms",req.body);
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


