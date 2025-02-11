import User from '../models/User'
import { Thought } from '../models/Thought'

import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate("friends").populate("thoughts");
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
    };

export const getUserById = async (req: Request, res: Response) => {
   try {
    const user = await User.findById(req.params.id).populate("friends").populate("thoughts");
    if (user){
    res.json(user)}
    else {
    res.status(404).json({ message: "User not found" });
    }
   } catch (error) {
    res.status(500).json(error);
   }
}

export const createUser = async (req: Request, res: Response) => {

    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const updateUser = async (req: Request, res: Response) => {

    try {
        const user = await User.findByIdAndUpdate( req.params.id, {
            username: req.body.username,
            email: req.body.email,
            thoughts: req.body.thoughts,
            friends: req.body.friends
        })
        res.json(user)
        res.send("Item Updated")
    } catch (error) {
        console.log(error);
        res.send(400).send('Server Error');
    }
}

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
