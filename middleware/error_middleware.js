


const errormiddleware =(err, req, res, next)=>{
    const status = err.status|500;
    const message = err.message|"backend error"
    const extraDetails = err.textraDetails | "error from backend"
    return res.status(status).json({message,extraDetails})

}

module.exports = errormiddleware