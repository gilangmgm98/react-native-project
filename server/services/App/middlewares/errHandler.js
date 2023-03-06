function errHandler(err,req,res,next){
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        let errmsg = err.errors.map((el) => {
            return {message: el.message}
        })
        let obj = {
            errmsg: errmsg
        }
        res.status(400).json(obj)
    } else if(err.name === 'Invalid Login'){
        res.status(401).json({message: `Invalid Username or Email or Password`})
    } else if (err.name === "JsonWebTokenError") {
        res.status(401).json({ message: `Invalid Token` })
    } else if (err.name === "Data User Is Invalid") {
        res.status(401).json({ message: `User Not Found` })
    } else if(err.name === "NotFound"){
        res.status(404).json({message: `Food Not Found`})
    }else if(err.name === "Email is required"){
        res.status(400).json({message: `Email is required`})
    }else if(err.name === "Password is required"){
        res.status(400).json({message: `Password is required`})
    }else {
        console.log(err);
        // res.status(500).json({
        //     message: `Something went wrong in server`
        // })
    }
}

module.exports = errHandler