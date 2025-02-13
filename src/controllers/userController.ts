import User from '../models/User'
import Thought from '../models/Thought'

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

export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
      const friend = await User.findById(req.params.friendId);
      if (!friend) {
        res.status(404).json({ message: "No user with this id!" });
      }
      const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
      const friend = await User.findById(req.params.friendId);
      if (!friend) {
        res.status(404).json({ message: "No user with this id!" });
      }
      const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };  
