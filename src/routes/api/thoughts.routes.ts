import express, { Router } from 'express';
import { getAllThoghts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

const router = Router();

router.route('/').get(getAllThoghts).post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionsId').delete(deleteThought);

export default router
