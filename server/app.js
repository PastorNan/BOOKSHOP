import express from 'express'
import cors from 'cors'
import { PORT, MongoDburl } from './config.js'
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"
const app = express()

app.use(cors())
app.use(express.json())

const client = new MongoClient(MongoDburl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const booksDB = client.db("myBookShop")
const myBooks = booksDB.collection("bookscollection")

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Hello There My Sexy Baby!!</h1>")
})

app.get('/shop', (req, res) => {
    //return  res.status(232).send("<a href= '/'> Home</a>")

    myBooks.find().toArray()
        .then(response => {
            //console.log(response)
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
    //return res.status(232).send(`<a href = '/'>Home ${data.id}</a>`)

})

app.get('/shop/:id', (req, res) => {
    const data = req.params

    const filter = {
        "_id": new ObjectId(data.id)

    }

    myBooks.findOne(filter)
        .then(response => {
            //console.log(response)
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
    //return res.status(232).send(`<a href = '/'>Home ${data.id}</a>`)
})

app.post('/admin/savebook', (req, res) => {
    const data = req.body
    if (!data.title)
        return res.status(400).send({ message: "No Title Found" })
    if (!data.author)
        return res.status(400).send({ message: "No Author Found" })
    if (!data.price)
        return res.status(400).send({ message: "No Price Found" })

    myBooks.insertOne(data)
        .then(response => {
            return res.status(201).send(JSON.stringify(response))
        })
        .catch(err => console.log(err))

})

app.delete('/admin/remove/:id', (req, res) => {
    const data = req.params
    const filter = {
        '_id': new ObjectId(data.id)
    }
    myBooks.deleteOne(filter)
        .then(response => {
            //console.log(response)
            if (response.deletedCount)
                return res.status(200).send({ message: "Book Deleted Successfully" })
            else
                return res.status(500).send({ message: "Opps! Something went wrong" })
        })
        .catch(err => console.log(err))
})

app.put('/admin/update/:id', (req, res) => {
    const data = req.params
    const docdata = req.body

    const filter = {
        "_id": new ObjectId(data.id)
    }

    const updDoc = {
        $set: {
            "price": data.price
        }
    }

    myBooks.updateOne(filter, updDoc)
        .then(response => {
            //console.log(response)
            res.status(200).send(response)
        })
        .catch(err => console.log(err))

})
