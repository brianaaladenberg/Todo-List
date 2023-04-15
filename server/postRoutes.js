import express from 'express';

import { formInput } from './actions.js';

const router = express.Router();

router.post('/form', formInput);
// router.post('/', createPost);
// router.get('/:id', getPost);
// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);
// router.patch('/:id/likePost', likePost);

export default router;