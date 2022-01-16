const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 5000;
const nodemon = require('nodemon');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session= require('express-session');
const MongoDbsession=require('connect-mongodb-session')(session);
const { Console } = require("console");
const console = require("console");
const req = require("express/lib/request");
const res = require("express/lib/response");
mongoose.connect('mongodb://localhost/ContactDance',{useNewUrlParser: true} );
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

const store = new MongoDbsession({
  uri:"mongodb://localhost/ContactDance",
  collection:"mysession"
});

app.use(session({
  secret:'Key that will signin',
  save:false,
  saveUninitialized:false,
  store:store
}));


// Connecting to Email
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dwivedi156om@gmail.com',
      pass: 'OMom@25836'
    }
  });




// connect to schema
const contact = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,   
    
    discription: String

  });

  const signup = new mongoose.Schema({
    Username: {
      type:String,
    unique:true
  }
    ,pass:{ 
      type:String,
    }

  });
  const ApproveAdminsignup = new mongoose.Schema({
    Username: {
      type:String,
    unique:true
  }
    ,Password:{ 
      type:String,
    }

  });
  ApproveAdminsignup.pre("save",async function(next){
    this.Password=await bcrypt.hash(this.Password,10);
    next();
  })
  signup.pre("save",async function(next){
    this.pass=await bcrypt.hash(this.pass,10);
    next();
  })
  
//   schema to model

var Contact = mongoose.model('contDetails', contact);
var signupD = mongoose.model('Signupdetail', signup);
var ApproveAdminsignupd = mongoose.model('ApproveAdminsignup', ApproveAdminsignup);
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

const isAuth=(req,res,next)=>{
  if(req.session.isAuth){
    next();
  }
  else{
    res.redirect('/login');
  }
};

app.get('/', (req, res)=>{
  if(req.session.isAuth){
    res.redirect('/home');
   }
   else{
   res.status(200).render('login.pug');
   }
});

// Event
app.get('/event',isAuth, (req, res)=>{
  res.status(200).render('event.pug');
});
app.post('/event', (req, res)=>{
  res.status(200).render('yourEvent.pug');
});

// Reset Password
app.get('/ResetPass', (req, res)=>{
  res.status(200).render('ResetPass.pug');
});

app.post('/ResetPass', async(req, res)=>{
  try {
    const userMail =await signupD.findOne({Username:req.body.Username})
    if(userMail){
      user=userMail.Username
      const passwordhash=await bcrypt.hash(req.body.pass,10);
      pass=userMail.pass
      await signupD.updateOne({user:req.body.Username},{$set:{pass:passwordhash}})
      res.send("Password reset succesfully")
    }

    else{ 
      res.send("User does not Exist")
    }

  } catch (error) {
    res.send("Inavlid attempt ")
  }
});

// Home Page 
app.get('/home', (req, res)=>{
  res.status(200).render('home.pug');
});

app.get('/SignUp', (req, res)=>{
  if(req.session.isAuth){
   res.redirect('/home');
  }
  else{
  res.status(200).render('SignUp.pug');
  }
});

// enroll
app.get('/enroll/:event', (req, res)=>{
  if(req.session.isAuth){
  res.status(200).render('enroll.pug',{event:req.params.event});
  }
  else{
    res.send('Please login ')
  }
});
// SignUp
app.post('/SignUp', (req, res)=>{
  var myData1 = new signupD(req.body) 
  myData1.save().then(()=>{
        res.render('home.pug')
        
   }).catch(()=>{
    res.send("signup details fail to load on database")
  
   }
    );
    
});
  
// Login
app.get('/login', (req, res)=>{
  if(req.session.isAuth){
    res.redirect('/home');
  }
  else{
  res.status(200).render('login.pug');
  }
});

app.post('/login', async(req, res)=>{
try {
  const userMail =await signupD.findOne({Username:req.body.Username})
  if(userMail){
          const ismatch = await bcrypt.compare(req.body.pass,userMail.pass);
          if(ismatch){
             req.session.isAuth=true;
              res.render('event.pug')
          }
          else{
            res.render('login.pug')
          }
        }
      else{
        res.render('login.pug')
      }
} catch (error) {
  console.log("Invalid Credentials")
}
  


});


// Your Event 
app.post('/enrollaproval', (req, res)=>{
  res.send("Thanks for enroll to event be ready at event time")
});


app.get('/yourEvent',isAuth, (req, res)=>{
  res.status(200).render('yourEvent.pug');
});
app.post('/logout', (req, res)=>{
  req.session.destroy((err)=>{
    if(err) throw err;
    res.render('login.pug');
  })
});


app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    var mailOptions = {
      from: 'dwivedi156om@gmail.com',
      to: 'dwivishal005@gmail.com',
      subject: 'DO NOT REPLY',
      text: `
               You have a new Contact
               Contact Details
               Name: ${req.body.name}
               phone: ${req.body.phone}
               email: ${req.body.email}
               adress: ${req.body.adress}
               Discription: ${req.body.discription}
            `
    };
    myData.save().then(()=>{
        

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.render('home.pug')
              
            }
          });

    }).catch(()=>
    res.send("Contact details fail to send email to client "))
});

// Admin Site
app.get('/dashboard', (req, res)=>{
  res.status(200).render('Admin.pug');
});

app.post('/AdminLogin', async(req, res)=>{
  try {
    const userMail =await ApproveAdminsignupd.findOne({Username:req.body.Username})
    if(userMail){
      const ismatch = await bcrypt.compare(req.body.pass,userMail.Password);
      if(ismatch){
          res.render('AdminDashborad.pug')
      }
      else{
        res.render('Admin.pug')
      }
    }
  else{
    res.render('Admin.pug')
  }
  } catch (error) {
    console.log("Invalid Credentials")
  }  
});
app.get('/AdminSignup', (req, res)=>{
  res.status(200).render('AdminSignup.pug');
});
app.get('/adminApprove', (req, res)=>{
  // var data = store.getItem('adminuserjason');
  res.status(200).render('adminApprove.pug');
});
app.post('/AdminSignup', (req, res)=>{
 
  res.render('AdminSignup.pug');

});
app.post('/finalAdminAprroval', (req, res)=>{
   var AdminSignupData = new ApproveAdminsignupd(req.body) 
  AdminSignupData.save().then(()=>{
    res.send("User is Approved now ,He have all the advanced access for project");
    
    }).catch((err)=>{
    res.send("signup details fail to load on database");
    console.log(err.message)

    }
    );
});



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
});