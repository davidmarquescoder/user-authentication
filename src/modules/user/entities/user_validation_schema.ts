const msg_required = 'Preencha todos os campos!';
const msg_required_login = 'Preencha os campos para fazer login!';

const InsertUserSchema = {
	name: {
		required: msg_required,
		min: 5,
		max: 15,
	},
	email: {
		required: msg_required,
		type: 'email',
		unique: true,
	},
	password: {
		required: msg_required,
		min: 8,
		max: 20,
		match: true,
	},
	confirmPassword: {
		required: msg_required,
		min: 8,
		max: 20,
		match: true,
	},
	phone: {
		required: msg_required,
		min: 11,
		max: 20,
	},
    
};

const LoginUserSchema = {
	email: {
		required: msg_required_login,
	},
	password: {
		required: msg_required_login,
	},    
};

export {
	InsertUserSchema,
	LoginUserSchema,
};