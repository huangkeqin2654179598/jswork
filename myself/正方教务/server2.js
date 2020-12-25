const express = require('express')
const app = express()
const port = 8080
app.get('/helloworld',(request,response)=>{
    response.send('helloworld.')
})
app.get('/world',(request,response)=>{
    response.send('world.')
})
app.listen(port,()=>console.log(`express server running on port${port}`))