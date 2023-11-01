const express = require('express')
const { products } = require('./data/products')
const app = express()
const jwt = require('jsonwebtoken')

const jwtKey = "istanbul"

app.use(express.json())

app.use((req,res,next) => {

    //publi api url
    if(req.url == '/token'){
        next()
    }
    else{
        //Bearer 9f313f1h129fn1f1mf
        try {
            let token = req.headers.authorization.split(' ')[1]

            jwt.verify(token, jwtKey)
            next()

        } catch (error) {
            res.status(401).json({"message": "Auth error"})
        }
      
    }

})


app.get('/', (req, res) => {
    res.send('OK!')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})


//Bu endpoint react tarafına token üretecektir.
app.post('/token', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == "cagatay@mail.com" && password == "123") {

        let token = jwt.sign({ email: email }, jwtKey, {
            expiresIn: 999999,
            issuer: "tatilbudur"
        })

        res.json({ token: token })

    }
    else {
        res.status(401).json({ "message": "EMail or password wrong!" })
    }

})



app.listen(3002, () => {
    console.log('Server is running...');
})