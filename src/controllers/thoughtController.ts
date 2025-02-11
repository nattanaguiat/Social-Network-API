import { Thought } from '../models/index'
import { User } from '../models/index'

import { Request, Response } from 'express';

export const getAllThoghts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({})
        res.status(200).json(thoughts)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    const { id } = req.params;

   try {
    const user = await Thought.findOne({ _id: id })
    res.json(user);
   } catch (error) {
    res.status(500).json(error);
   }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        
        if(!user) {
            res.status(404).json({ message: 'User not found.' });
        } else{
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to create thought. ${err}` });
    }
};

export const updateThought = async (req: Request, res: Response) => {

    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: `Failed to update thought. ${err}` });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);

        if (!thought) {
            res.status(404).json({ message: 'Thought not found.' });
        } else {
            //delete from user's thoughts array
            await User.findOneAndUpdate(
                {username: thought.username},
                { $pull: { thoughts: thought._id } },
                { new: true }
            );

            res.json(thought);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete thought. ${err}` });
    }
};

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );

        if(!thought) {
            res.status(404).json({ message: 'Thought not found.' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to add reaction. ${err}` });
    }
};

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );

        if(!thought) {
            res.status(404).json({ message: 'Thought not found.' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to remove reaction. ${err}` });
    }
};