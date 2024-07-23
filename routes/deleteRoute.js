import express from 'express';
import signUpModel from '../Schemas/signUpSchema.js';

const handleDelete = express.Router();

handleDelete.use(express.json());

handleDelete.post('/records/:id/delete', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    try {
        const user = await signUpModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const diaryEntryIndex = user.diaryContent.findIndex(entry => entry.id === id);

        if (diaryEntryIndex === -1) {
            return res.status(404).json({ success: false, message: 'Diary entry not found' });
        }

        user.diaryContent.splice(diaryEntryIndex, 1);
 
        await user.save();

        res.status(200).json({ success: true, message: 'Diary entry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the diary entry' });
    }
});

export default handleDelete;
