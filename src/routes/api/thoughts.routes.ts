import express from 'express';
import { Thoghts } from '../../models/index.js';

const app = express.Router();

app.get('/thoughts', async (_req, res) => {
    try {
        const result = await Thoghts.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get('/thoughts/:id', async (req, res) => {
    const { id } = req.params;

   try {
    const user = await Thoghts.findOne({ _id: id })
    res.json(user);
   } catch (error) {
    res.status(500).json(error);
   }
})

// app.post()

app.put('/thoughts/:id', async (req, res) => {

    try {
        const user = await Thoghts.findByIdAndUpdate( req.params.id, {
            thoughtText: req.body.thoughtText,
            createdAt: req.body.createdAt,
            username: req.body.thoughts,
            reactions: req.body.reactions
        })
        res.send("Item Updated")
    } catch (error) {
        console.log(error);
        res.send(400).send('Server Error');
    }
})

app.delete('/thoughts/:id', async (req, res) => {

    try {
        const result = await Thoghts.findByIdAndDelete({
            _id: req.params.id
        })
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);     
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

export { app as thoughtsRouter }