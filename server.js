const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
app.use( express.static( 'public' ));

// Express App Config
app.use(bodyParser.json());
app.use(session({
    secret: 'finel proj',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


const prodRoutes = require('./api/product/product.routes')



// routes
app.use('/api/product', prodRoutes)


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});

