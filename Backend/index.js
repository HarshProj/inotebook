const connectToMongo=require('./db')
const express = require('express')
connectToMongo();
const app = express()
app.use(express.json());

const port = 3000
//Available Routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello Harsh!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
