

exports.landingpage=async(req,res,next)=>{
    res.status(200).render('landingpage',{
        title:'Medihub'
    });
}