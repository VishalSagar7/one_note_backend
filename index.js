import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import signUpModel from './Schemas/signUpSchema.js';
import cors from 'cors'
import diary from './routes/diarypage.js';
import records from './routes/journal.js';
import individualnote from './routes/individualNote.js';
import handledelete from './routes/deleteRoute.js';

dotenv.config();

const server = express();


server.use(cors({
  origin: '*',
}));



server.use('/api',diary);
server.use('/api',records);
server.use('/api',individualnote);
server.use('/api',handledelete);

server.use(express.json());

const port = process.env.PORT || 4001;

// for testing purpose
server.get('/', (req, res) => {
    res.send('<h1>This is the server</h1>');
});

server.post('/login', async (req, res) => {
    try {
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      const storedDocument = await signUpModel.findOne({ email: userEmail });
  
      if (!storedDocument) {
        return res?.json({ success: false, message: 'User not found' });
      }
  
      if (storedDocument.password === userPassword) {
        return res?.json({ success: true, message: 'User found', storedDocument });
      } else {
        return res.json({ success: false, message: 'Password is wrong' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

server.post('/signup', async (req, res) => {
    try {
        const { email, phone } = req.body;

        const existingEmail = await signUpModel.findOne({ email });
        const existingPhone = await signUpModel.findOne({ phone });

        if (existingEmail) {
            return res.json({ message: "Email already used",success: false });
        }

        if (existingPhone) {
            return res.json({ message: "Phone number already used",success:false });
        }

        const document = new signUpModel(req.body);
        await document.save();
        res.status(201).json({ message: "Account created successfully",success:true, document });


    } catch (error) {
        console.error('Error saving document:', error);
        res.status(400).json({ message: error.message });
    }
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Database connected successfully");

    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
.catch((error) => {
    console.error("Database connection error:", error);
});
