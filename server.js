const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Site server starting http://localhost:3000`)
})
