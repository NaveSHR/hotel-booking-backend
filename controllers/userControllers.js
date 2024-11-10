import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export function postUsers(req, res) {
  const user = req.body;
  const password = req.body.password;

  const saltRounds = 10;
  
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  console.log(passwordHash);

  user.password = passwordHash;

  const newUser = new User(user);
  newUser
    .save()
    .then(() => {
      res.json({
        message: 'User created successfully',
      });
    })
    .catch(() => {
      res.json({
        message: 'User creation failed',
      });
    });
}

export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email }).then((user) => {
    if (user == null) {
      res.status(403).json({
        message: 'User not found',
      });
    } else {

      const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

      if (!isPasswordValid) {
        res.status(403).json({
          message: 'Incorrect password',
        });
      } else {
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '48h' });

        res.json({
          message: 'User found',
          user: user,
          token: token,
        });
      }
    }
  });
}

export function isAdminValid(req){        //giving a req for this funtion search is there admin . if it return true
                                          //export for other files

  if(req.user == null){           //dont need a req or res here  just return the value
    return false
  }
  if(req.use.type != "admin"){    //if any user found but user type not admin
    return false
  }
  return true;        //if req skip both above conditions
  
}

export function isCustomerValid(req){       //because valid customer only put bookings

  if(req.user == null){
    return false
  }
  console.log(req.user)
  if(req.user.type != "customer"){
    return false
  }

  return true;
  
}

export function getUser(req,res){

  const user = req.body.user;
  if(user == null){

    res.json({
      message : "not found"
    })
  }else{

    res.json({
      message : "user found",
      user : user
    })
  }



}
