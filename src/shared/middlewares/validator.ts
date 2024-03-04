// Imports
import { Request, Response, NextFunction } from 'express';

// Models
import User from '../../modules/user/models/User';


// Entity Schema
interface Schema {
    [key: string]: {
      required?: string;
      type?: string;
      min?: number;
      max?: number;
      unique?: boolean;
      match?: boolean;
    };
}

// Check if field is empty
function empty(value: string): boolean {
	return value.trim().replace(/\s+/g, '') === '';
}

// Regex
const RegexValidation = {
	email: {
		regex: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
	},
};

export default function validate(schema: Schema){
	const validation = async (request: Request, response: Response, next: NextFunction) => {

		const { body } = request;
		const errors: string[] = [];

		// Find User
		const userExists = await User.findOne({email: body['email']});

		// Verifications Loop
		Object.keys(schema).forEach(field => {
			const fieldSchema = schema[field];

			// Check Empty
			if(fieldSchema.required && !body[field]){
				errors.push(`[Empty Field Error] - O campo ${field} não foi preenchido. ${fieldSchema.required}`);
				return;
			}
            
			if(fieldSchema.required && body[field].length <= 0 || empty(body[field])){
				errors.push(`[Empty Field Error] - O campo ${field} não foi preenchido. ${fieldSchema.required}`);
			}

			// Check Min Lenght
			if(fieldSchema.min && body[field].length < fieldSchema.min ){
				errors.push(`[Min Lenght Error] - O campo ${field} não atende aos requisitos necessários. Esse campo deve ter no mínimo ${fieldSchema.min} caracteres!`);
			}

			// Check Max Lenght
			if(fieldSchema.max && body[field].length > fieldSchema.max ){
				errors.push(`[Max Lenght Error] - O campo ${field} não atende aos requisitos necessários. Esse campo deve ter no máximo ${fieldSchema.max} caracteres!`);
			}

			// Check if email exists
			if(fieldSchema.unique && userExists){
				errors.push('[E-mail Error] - Esse e-mail já está em uso, utilize outro e-mail ou faça login!');
			}

			// Validate email
			if(fieldSchema.type && fieldSchema.type === 'email' && !new RegExp(RegexValidation['email'].regex).test(body[field])){
				errors.push(`[${body[field]}] - Esse e-mail não é válido, verifique e tente novamente!`);
			}

			// Check if password match
			if(fieldSchema.match && field === 'password' && body[field] !== body['confirmPassword']){
				errors.push('[Password Error] - As senhas não coincidem!');
			}

		});
        
		// Error or Next
		if(errors.length > 0){
			return response.status(422).json({msg: errors});
		}
		else{
			return next();
		}
	};

	return validation;
}