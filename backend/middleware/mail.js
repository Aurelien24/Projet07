module.exports = (req, res, next) =>  { 

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
  {
      console.log("email bon")
    next();
  } else {
    console.log("erreur mail")
    //alert("You have entered an invalid email address!")

    // FAIRE ERREUR TYPE 400

    return;
  }
}