// Modules Imports
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Entity Import
import UserEntity from '../../modules/user/entities/user_entity';

// Dotenv Config
dotenv.config();


export default class Authentication{
	static async CreateUserToken(user: UserEntity, request: Request, response:Response){
		const UserToken = jwt.sign({
			name: user.name,
			id: user._id,
		}, `${process.env.SECRET}`);

		return response.status(201).json({
			message: '[Success!] - Successful Authentication',
			token: UserToken,
			UserId: user._id,
		});
	}
}