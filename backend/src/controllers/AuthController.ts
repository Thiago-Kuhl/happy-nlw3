import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


export default {

  authTest(request: Request, response: Response){
    return response.send({userID: request.userID});
  },

  async authenticate(request: Request, response: Response) {
    const usersRepository = getRepository(User);
    const {email, password } = request.body;
    const secret = process.env.AUTH_TOKEN

    const user = await usersRepository.findOne({ where: { email } }); 

    if (!user) {
      return response.status(401).json({ message : 'Not authorized!'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({ message : 'Not authorized!'});
    }

    const token = jwt.sign({id: user.id}, secret, {expiresIn: '1d'})
    
    delete user.password;

    return response.status(200).json({user, token});
 
  }
};
