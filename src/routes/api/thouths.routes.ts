import express from 'express';
import Thoughts from '../../models/Thoughts.js';

const router = express.Router();

router.get('/thoughts', async (_req, res) => {
    try {
        const result = await Thoughts.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

router.get('/thoughts/:id', async (req, res) => {
    const { id } = req.params;

   try {
    const user = await Thoughts.findOne({ _id: id })
    res.json(user);
   } catch (error) {
    res.status(500).json(error);
   }
})

// router.post()

router.put('/thoughts/:id', async (req, res) => {

    try {
        const user = await Thoughts.findByIdAndUpdate( req.params.id, {
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

router.delete('/thoughts/:id', async (req, res) => {

    try {
        const result = await Thoughts.findByIdAndDelete({
            _id: req.params.id
        })
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);     
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

export { router as thoughtsRouter }