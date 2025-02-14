import Thought from '../models/Thought.js';
import User from '../models/User.js';
import { Request, Response } from 'express';

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: `Failed to get users. ${err}` });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        // get user by object id from request parameters
        const user = await User.findById(req.params.id)
            .populate('friends') // add full friends data
            .populate('thoughts'); // add full thoughts data

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
        }else{
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to get user. ${err}` });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: `Failed to create user. ${err}` });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: `Failed to update user. ${err}` });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
        } else {
            // delete all thoughts associated with the user
            await Thought.deleteMany({ username: user.username });

            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to delete user. ${err}` });
    }
};

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId, 
            { $addToSet: { friends: req.params.friendId } }, // prevent duplicates 
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found. Unable to add friend.' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to add friend. ${err}` });
    }
};

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({ message: `Failed to remove friend. ${err}` });
    }
};