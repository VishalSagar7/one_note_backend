import express from 'express';
import mongoose from 'mongoose';
import signUpModel from '../Schemas/signUpSchema.js ';

const individualnote = express.Router();

individualnote.use(express.json());

individualnote.post('/records/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    
    const user = await signUpModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

   
    const diaryEntry = user.diaryContent.find(entry => entry.id.toString() === id);

    if (!diaryEntry) {
      return res.status(404).json({ success: false, message: 'Diary entry not found' });
    }

    
    res.status(200).json({ success: true, diaryEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the diary entry' });
  }
});

export default individualnote;


