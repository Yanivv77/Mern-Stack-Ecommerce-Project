const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.listen(5000, console.log('Server running onn port 5000'))
