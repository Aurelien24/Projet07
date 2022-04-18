module.exports = (req, res, next) =>  { 

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
  {
    next();
  } else {
    console.log("erreur mail")
    
    return res.status(409).json({ message: "Votre adresse email n'est pas conforme" });;
  }
}