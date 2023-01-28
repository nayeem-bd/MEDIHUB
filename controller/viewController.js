

exports.landingpage=async(req,res,next)=>{
    res.status(200).render('landingpage',{
        title:'Home Page'
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