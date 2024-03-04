// Imports
import app from './app';

// Dotenv Config
import dontenv from 'dotenv';
dontenv.config();


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	console.clear();
	console.log(`⚡ Server is running on port ${PORT}.`);
});