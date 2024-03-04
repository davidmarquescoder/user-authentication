// Modules imports
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
},
{timestamps: true}
);

// Hash Password
UserSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.password, 12);
	this.password = hash;

	next();
});

const User = mongoose.model('User', UserSchema);

export default User;