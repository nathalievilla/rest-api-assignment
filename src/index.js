const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = [];

//create a user
app.post('/users', (req, res) => {
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({error : 'name and email are required'});
    }

    const newUser = {id: uuidv4(), name, email};
    users.push(newUser); //add user to array
    res.status(201).json(newUser);
});

//retrieve a user
app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id);

    if(!user){
        return res.status(404).json({error: 'user not found'});
    }

    res.status(200).json(user);

});

//update a user
app.put('/users/:id', (req, res) => {
    const {name, email} = req.body;
    const user = users.find(u => u.id === req.params.id);

    if(!user){
        return res.status(404).json({error: 'user not found'});
    }

    if(!name || !email){
        return res.status(400).json({error: 'name and email are required'});
    }

    user.name = name;
    user.email = email;

    res.status(200).json(user);
});

//delete a user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if(userIndex === -1){
        return res.status(404).json({error: 'user not found'});
    }        

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing