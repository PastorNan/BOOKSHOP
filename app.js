import express from 'express'
const app = express()

const PORT = 3000

app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

app.get('/',(req, res)=> {
    res.status(212).send("<h1>Hello There My Sexy Baby!!</h1>")
})

app.get('/shop',(req, res)=> {
    res.status(232).send("<a href= '/'> Home</a>")
})

app.get('/shop/:id',(req, res)=> { 
    const data = req.params
    res.status(232).send(`<a href = '/'>Home ${data.id}</a>`)
})