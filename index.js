import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import User from './schema/user.schema.js';
import { searchList } from './utils/search.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://netbeau:netbeauPass@netbeau.jj4alvo.mongodb.net/test')
    .then(() => console.log('Connected to mongo.'))
    .catch(err => console.error(err));

//GET ALL USERS FROM DB
app.get('/users', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//GET USER BY ID
app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const data = await User.findById(id);
        if (!data) {
            res.status(404).send('User not found');
        } else {
            res.json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//GET USER BY QUERY
app.get('/user', async (req, res) => {
    try {
        const query = req.query;
        const searchCriteria = {};
        if (query.first_name) {
            searchCriteria.first_name = { $regex: query.first_name, $options: 'i' };
        }
        if (query.last_name) {
            searchCriteria.last_name = { $regex: query.last_name, $options: 'i' };
        }
        if (query.age) {
            searchCriteria.age = { $gte: Number(query.age) };
        }

        const user = await User.findOne(searchCriteria);

        user ? res.json(user) : res.status(500).send('User not found!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


//CREATE A NEW USER
app.post('/user', async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const newData = await User.create(data);
        res.status(201).json(newData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//UPDATE USER DATA
app.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    try {
        const data = await User.findByIdAndUpdate(id, newData, { new: true });
        if (!data) {
            res.status(404).send('User not found');
        } else {
            res.json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//DELETE USER
app.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        user ? res.json(user) : res.status(500).send('User not found!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search', async (req, res) => {
    try {
        const query = req.query.query?.toLowerCase() ?? ''
        const results = query === '' ? searchList : searchList.filter(item => item.toLowerCase().includes(query));
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});