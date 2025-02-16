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

export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const newThought = new Thought(req.body);
        await newThought.save();
        const user = await User.findOne({ username: newThought.username });
        user?.thoughts.push(newThought._id as any);
        await user?.save();
        res.status(201).json(newThought);
        } catch (err) {
        res.status(400).json({ error: (err as Error).message });
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
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought with this id!' });
          return;
        }
        res.json(deletedThought);
        } catch (err) {
            res.status(404).json({ error: (err as Error).message });
        }
    }
    

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