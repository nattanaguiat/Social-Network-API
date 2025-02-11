import express from 'express';
import { Thought } from '../../models/index.js';

const app = express.Router();

app.get('/', async (_req, res) => {
    try {
        const result = await Thought.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get('/:id', async (req, res) => {
    const { id } = req.params;

   try {
    const user = await Thought.findOne({ _id: id })
    res.json(user);
   } catch (error) {
    res.status(500).json(error);
   }
})

app.post('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: `Failed to update thought. ${err}` });
    }
});

app.put('/:id', async (req, res) => {

    try {
        const user = await Thought.findByIdAndUpdate( req.params.id, {
            thoughtText: req.body.thoughtText,
            createdAt: req.body.createdAt,
            username: req.body.username,
            reactions: req.body.reactions
        })
        res.send("Item Updated")
    } catch (error) {
        console.log(error);
        res.send(400).send('Server Error');
    }
})

app.delete('/:id', async (req, res) => {

    try {
        const result = await Thought.findByIdAndDelete({
            _id: req.params.id
        })
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);     
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

app.post('/:thougth')

export { app as thoughtsRouter }