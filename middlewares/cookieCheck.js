module.exports = (req,res,next) => {
    if (req.cookies.remember){
        req.session.user = req.cookies.remember
    }
    next()
}