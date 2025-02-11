import express from 'express'
import { User } from '../../models/index';

const app = express.Router();

app.get('/', async (_req, res) => {
    try {
        const result = await User.find()
        res.status(200).json(result)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

app.get('/:id', async (req, res) => {
    const { id } = req.params;

   try {
    const user = await User.findOne({ _id: id })
    res.json(user);
   } catch (error) {
    res.status(500).json(error);
   }
})

app.post('/', (req, res) => {

    try {
        const newUser = new User({ usernamename: req.body.username, email: req.body.email })
        newUser.save();
        res.json(newUser)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

app.put('/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate( req.params.id, {
            username: req.body.userName,
            email: req.body.email,
            thoughts: req.body.thoughts,
            friends: req.body.friends
        })
        res.send("Item Updated")
    } catch (error) {
        console.log(error);
        res.send(400).send('Server Error');
    }
})

app.delete('/:id', async (req, res) => {

    try {
        const result = await User.findByIdAndDelete({
            _id: req.params.id
        })
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);     
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
})

export { app as userRouter }