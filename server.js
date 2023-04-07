// import { MongoClient } from "mongodb";

// async function listCollections(client, databaseName) {
// 	const collectionsList = await client.db(databaseName).listCollections().toArray();

// 	console.log(`Collections in ${databaseName}:`);
// 	collectionsList.forEach((collection) => console.log(` - ${collection.name}`));
// }

// async function createDocument(client, databaseName, collectionName, document) {
// 	const result = await client.db(databaseName).collection(collectionName).insertOne(document);
// 	console.log(`Created document with _id: ${result.insertedId}`);
// }

// async function readDocuments(client, databaseName, collectionName, query = {}) {
// 	const result = await client.db(databaseName).collection(collectionName).find(query).toArray();
// 	console.log(`Found ${result.length} documents:`);
// 	console.log(result);
//     return result;
// }

// export default async function main() {
// 	/**
// 	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
// 	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
// 	 */
// 	const uri =
// 		"mongodb+srv://kishor:Kishor55@cluster0.hcjogvm.mongodb.net/?retryWrites=true&w=majority";
// 	const client = new MongoClient(uri);

// 	try {
// 		// Connect to the MongoDB cluster
// 		await client.connect();

// 		// Make the appropriate DB calls
// 		await listCollections(client, "Question_Forum");

// 		// Create a document
// 		// const document = { 
//         //     "id": "b4f4be31b87d94e1",
//         //     "first_name": "Kishor",
//         //     "last_name": "M",
//         //     "name": "Kishor M",
//         //     "role": "user",
//         //     "dob": "2023-03-01",
//         //     "phone_number": "",
//         //     "age": 0,
//         //     "isActive": true,
//         //     "username": "kmuruganandham@fssa.freshworks.com",
//         //     "password": "12345kishor",
//         //     "profile": "https://ui-avatars.com/api/?name=KishorM&rounded=true&uppercase=false&background=random",
//         //     "favourites": ["3bfef6182e62a991"]
//         // };
// 		// await createDocument(client, "Question_Forum", "Rooms", document);
//        return await readDocuments(client, "Question_Forum", "Rooms",{id:"b4f4be31b87d94e1"});
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		await client.close();
// 	}
// }

// main().catch(console.error);

const express = require('express');
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000; // Change this to the port you want to use

async function readDocuments(client, databaseName, collectionName, query = {}) {
    const result = await client.db(databaseName).collection(collectionName).find(query).toArray();
    return result;
}

// Enable CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/your-endpoint', async (req, res) => {
    const uri = "mongodb+srv://kishor:Kishor55@cluster0.hcjogvm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await readDocuments(client, "Question_Forum", "Rooms", {id: "b4f4be31b87d94e1"});
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


