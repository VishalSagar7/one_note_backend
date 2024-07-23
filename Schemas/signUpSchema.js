import mongoose from 'mongoose';

const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    repassword: {
        type: String,
        required: true,
    },
    diaryContent : {
        type : Array,
        required : false
    }
},{timestamps:true});

const signUpModel = mongoose.model('SignUp', signUpSchema);
export default signUpModel;

