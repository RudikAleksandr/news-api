import express from 'express';
import * as DbUser from '../db/user/user-db'; 

const router = express.Router();

router.post('/', (req, res) => {
  const user = req.body; 
  DbUser.createUser(user, (err, userData) => {
    if (err) {
      res.json(err);
    } 

    res.json(userData);
  });
});

export default router;