const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/skill_swap")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("Error");
});

const SignupSchema = new mongoose.Schema({
    email: {
        type : String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
});

// const SkillSchema = new mongoose.Schema({
//     skillName: {
//       type: String,
//       required: true,
//     },
//     youtubeLink: String,
//     file: String,
//     timeToLearn: Number
//   });
const ExperienceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    skills: {
        type:Number,
        required: true
    },
    usefulness: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    skill_details: [{
        skill: {
            type: String,
            required: true
        },
        youtubeLink: {
            type: String,
            required: true
        },
        file: {
            type: Buffer,
            required: [true, "Please provide pdf file"]
        },
        timeToLearn: {
            type: Number,
            required: true
        }
    }]
});


const SignupModel = mongoose.model('signup', SignupSchema);
const ExperienceModel = mongoose.model('Experience', ExperienceSchema);

module.exports = {SignupModel, ExperienceModel};

