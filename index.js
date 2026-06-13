import 'dotenv/config' // this is the fixed way of how you import the dotenv in your server 
import express from 'express'


// this app is a powerful "object" which will provide us with many features of the express library
const app = express()
const port = process.env.PORT || 3000
app.use(express.json()) // here we are telling the server that any data that comes up in the json format, we will accept that

let teaData = []
let nextId = 1

// post is generally used to post or provide some data to the server using the http request 
// add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body // it will automatically extract the given fields from the request object and store it 
    const newTea = {id: nextId++, name, price} // creating an object using the data from the http request object 
    teaData.push(newTea) // storing the newly created object in the array 
    res.status(201).send(newTea) 
})

// get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// this syntax is used to provide some data in the url itself called the params
// get a specific tea based on the id provided
app.get('/teas/:id', (req, res) => {
    const requiredTea = teaData.find(t => t.id === parseInt(req.params.id)) // we are using the find method of the array and matching each element's id with the id provided in the url params and since everything that comes up in the params is in the string format so we have to convert or parse it into the integer format  
    if (!requiredTea) {
       return res.status(404).send("Tea not found") 
    }
    res.status(200).send(requiredTea)
})

// update tea
app.put('/teas/:id', (req, res) => {
    const requiredTea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!requiredTea) {
       return res.status(404).send("Tea not found") 
    }
    const {name, price} = req.body
    requiredTea.name = name
    requiredTea.price = price
    res.status(200).send(requiredTea)
})

// delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("tea not found")
    }
    teaData.splice(index, 1)
    res.status(20).send("tea deleted successfully")
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
})
// till here is the boiler plate code for creating a server using expressjs 