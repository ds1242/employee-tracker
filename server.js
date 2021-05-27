const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start the Server Connection
db.connect(err => {
    if (err) throw err;
    console.log('Database Connected');
    app.listen(PORT, () => {
        console.log(`Server Running on Port ${PORT}`);
    });
});

// module.exports = server;