
const axios = require('axios');

exports.landingpage=async(req,res,next)=>{
    let doctors = [];
    try{
        const res = await axios.get('http://localhost:4000/api/v1/users/topdoctors?role=doctor');
        const tempDoc = res.data.data.data;

        tempDoc.sort((a, b) => b.rating - a.rating);
        doctors = tempDoc.slice(0,4);

        //console.log('hoisse ',hh);
    }catch(err){
        console.log(err);
    }

    res.status(200).render('landingpage',{
        title:'Home Page',
        doctors
    });
}

exports.signUp = async(req,res,next)=>{
    res.status(200).render('signUp',{
        title:'Sign Up'
    });
}

exports.signIn = async(req,res,next)=>{
    res.status(200).render('signIn',{
        title:'Sign In'
    });
}