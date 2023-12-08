const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const {PDFDocument} = require('pdf-lib');
const {SignupModel, ExperienceModel, loginModel} = require('../mongodb');
const path = require("path");
const asyncWrapper = require('../middleware/asyncWrapper');
const bcrypt = require('bcryptjs');
const fs  = require('fs').promises;

const signup = async (req, res) => {
    const { email, username, password, confirmpassword, profession } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await SignupModel.create({email, username, password: hashedPassword, profession});
        if(password===confirmpassword){
            return res.render('signup', { msg: "Registration successful", msg_type: "correct" });
        }
        else{
            return res.render('signup', { msg: "Password is not matching", msg_type: "incorrect" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

const login = async(req, res)=>{
    const {email, password, profession} = req.body;
    try{
        const user = await SignupModel.findOne({email});
        if(user && await bcrypt.compare(password, user.password) && profession===user.profession){
            if(profession==='experienced'){
                return res.render('welcome');
            }
            return res.render('Home');
        }
        else{
            return res.render('login',{msg: "Enter valid email and password", msg_type:"incorrect"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
}

const experienced = async (req, res)=>{
    const {name, experience, skills, usefulness, category} = req.body;
    try{
        const newExperience = await ExperienceModel.create({name, experience, skills, usefulness, category});
        // const showAddMore = newExperience.skills > 1;
        // const formVisible = false;
        // if(showAddMore){
        //     return res.render('MultipleMaterials',{showAddMore, formVisible});
        // }
        req.session.name = name;
        req.session.skills = skills;
        req.session.experience = experience;
        if(Number(experience)<=0 || Number(skills)<=0){
          return res.render('experienced',{msg: "Year is not valid",msg_type: "incorrect"});
        }
        return res.render('singleMaterials');
    }
    catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

const getItems = async (req, res) => {
    try {
      const items = await ExperienceModel.find();
      console.log(items);
      return res.status(200).json({ items });
    } catch (error) {
      console.log(error);
    }
  };
  
  const addItem = asyncWrapper(async (req, res) => {
    const { name } = req.body;
    const file = req.file.path;
    const item = await ExperienceModel.create({ name, file });
    return res.status(201).json({ item });
  });
  const downloadFile = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const item = await ExperienceModel.findById(id);
    if (!item) {
      return next(new Error("No item found"));
    }
    const file = item.file;
    const filePath = path.join(__dirname, `../${file}`);
    return res.download(filePath);
  });

  const engineering = async (req, res) => {
    const search = req.body.search;
    try {
      // Use the aggregation framework to find documents matching the search in the skills_details array
      const findSkill = await ExperienceModel.aggregate([
        {$match: {category : 'engineering'}},
        {$match: {"skill_details.skill": search}
        }
      ]);
      
      console.log(findSkill);
  
      if (findSkill.length === 0) {
        return res.render('engineering', { msg: "There is no skill which you provided", msg_type: "incorrect" });
      }
  
      // Render the data page with the filtered results
      return res.render('engineeringData', { data: findSkill });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  };
  const arts = async (req, res) => {
    const search = req.body.search;
    try {
      // Use the aggregation framework to find documents matching the search in the skills_details array
      const findSkill = await ExperienceModel.aggregate([
        {$match: {category : 'art-science'}},
        {$match: {"skill_details.skill": search}
        }
      ]);
      
      console.log(findSkill);
  
      if (findSkill.length === 0) {
        return res.render('arts', { msg: "There is no skill which you provided", msg_type: "incorrect" });
      }
  
      // Render the data page with the filtered results
      return res.render('artsData', { data: findSkill });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  };
  let count = 0;
  const singleMaterials = async (req, res) => {
    try {
      console.log(req.body);
      const experienceData = req.body; // Get the form data from the request body
      const skill_count = Number(req.session.skills);
      console.log(skill_count);
      const experienceName = req.session.name;
      const fileData = experienceData.file;
      console.log(experienceName);
      // const file = experienceData.file;
      // req.session.file = file;
      const newSkil = {
        skill: experienceData.skill,
        youtubeLink: experienceData.youtubeLink,
        file: experienceData.file,
        timeToLearn: experienceData.timeToLearn,
      };
      await ExperienceModel.findOneAndUpdate(
        { name: experienceName },
        {
          $push: {
            skill_details: newSkil
          },
        },
        { upsert: true }
      );
      await ExperienceModel.findOneAndUpdate(
        { name: experienceName },
        {
          $set: {
            skill: experienceData.skill,
            youtubeLink: experienceData.youtubeLink,
            file: experienceData.file,
            timeToLearn: experienceData.timeToLearn,
          },
        },
        { upsert: true }
      );

      count++;
      if(count===skill_count){
        count=0;
        const allData = await ExperienceModel.find({name: experienceName});
        
        return res.render('data',{data: allData});
      }
      console.log(count);
      return res.render('singleMaterials');
    } catch (error) {
      console.log(error);
      return res.send('Invalid error');
    }
  };
module.exports = {signup, login, experienced, getItems, addItem, downloadFile, engineering, singleMaterials, arts};

