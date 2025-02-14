import Thought from '../models/Thought.js';
import User from '../models/User.js';
import { Request, Response } from 'express';

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: `Failed to get thoughts. ${err}` });
    }
};

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        // get thought by object id from request parameters
        const thought = await Thought.findById(req.params.id);

        if (!thought) {
            res.status(404).json({ message: 'Thought not found.' });
        }else{
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to get thought. ${err}` });
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);

        // add thought to user's thoughts array
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