const connectToMongo=require('./db')
var cors=require('cors');
const express = require('express')
connectToMongo();
const app = express()
app.use(cors()); 
app.use(express.json());

const port = 5000
//Available Routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello Harsh!')
})

app.listen(port, () => {
  console.log(`Inotebook backend listening on port ${port}`)
})
