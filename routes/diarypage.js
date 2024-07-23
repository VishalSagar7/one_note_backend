import express from 'express';
import { v4 as uuidv4 } from 'uuid'; 
import signUpModel from '../Schemas/signUpSchema.js';

const diary = express.Router();
diary.use(express.json());

diary.post('/diary', async (req, res) => {
    const { email, date, title, content } = req.body;

    
    // console.log('Received content:', content);

    try {
        const user = await signUpModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newDiaryEntry = {
            id: uuidv4(), 
            date,
            title,
            content 
        };

      
        // console.log('New diary entry:', newDiaryEntry);

        user.diaryContent.push(newDiaryEntry);

        await user.save();

        res.status(200).json({ success: true, message: 'Story submitted successfully!' });
    } catch (error) {
        console.error('Error during save:', error);
        res.status(500).json({ success: false, message: 'An error occurred while submitting the story' });
    }
});

export default diary;
