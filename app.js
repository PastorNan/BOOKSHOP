import express from 'express'
import {PORT, MongoDburl} from './config.js'
import { MongoClient, ServerApiVersion } from "mongodb"
const app = express()

app.use(express.json()) 

const client = new MongoClient(MongoDburl,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const booksDB = client.db("myBookShop")
const myBooks = booksDB.collection("bookscollection")

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

app.get('/',(req, res)=> {
   return res.status(200).send("<h1>Hello There My Sexy Baby!!</h1>")
})

app.get('/shop',(req, res)=> {
  return  res.status(232).send("<a href= '/'> Home</a>")
})

app.get('/shop/:id',(req, res)=> { 
    const data = req.params
   return res.status(232).send(`<a href = '/'>Home ${data.id}</a>`)
}) 

app.post('/savebook',(req,res)=>{
    const data = req.body 
    if(!data.title)
    return res.status(400).send("No Title Found")
    if(!data.author)
    return res.status(400).send("No Author Found")
    if(!data.price)
    return res.status(400).send("No Price Found") 

    myBooks.insertOne(data, (error, response)=>{
        if(error){
            console.log("An error occured!")
            return res.sendStatus(500)
        }
    })

    return res.status(201).send(JSON.stringify (data))
})