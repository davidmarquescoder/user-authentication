// Imports Modules
import { Request, Response } from 'express';

// Models
import User from '../models/User';


export default class NewUser{
	static async CreateUser(request: Request, response: Response){
		let {
			name,
			email,
			password,
			phone,
		} = request.body;

		// Data Processing
		name = name.trim().replace(/\s+/g, ' ');
		email = email.trim().replace(/\s+/g, '');
		password = password.trim().replace(/\s+/g, '');
		phone = phone.trim().replace(/\s+/g, ' ');

		try{
			const user = new User({
				name,
				email,
				password,
				phone,
			});
    
			await user.save();
			return response.status(201).json({msg: '[Success!] - User Created'});
		}
		catch(error){
			console.log(`[Error Insert DataBase] >>> ${error}`);
			return response.status(500).json({msg: '[Error Insert DataBase] - Algo deu errado no servidor, não foi possível enviar os dados!'});
		}
	}
}