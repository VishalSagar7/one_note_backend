import express from 'express';
import signUpModel from '../Schemas/signUpSchema.js';
import cors from 'cors'


const records = express.Router();
records.use(cors());

records.use(express.json());

records.post('/records', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        
        const result = await signUpModel.findOne({ email: email }, 'diaryContent');

        if (result) {
            res.json({ success: true, diaryContent: result.diaryContent });
        } else {
            res.status(404).json({ success: false, message: 'No diary content found for the given email' });
        }
    } catch (error) {
        console.error('Error fetching diary content:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

export default records;
