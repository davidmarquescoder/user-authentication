// Imports Modules
import express from 'express';
import dontenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Imports Routes
import routes from '../../modules/user/routes/user.routes';

// Dotenv Config
dontenv.config();


class App{

	public server: express.Application;

	constructor(){
		this.server = express();
		this.connection();
		this.middlewares();
		this.routes();
	}

	async connection(){
		await mongoose.connect(`${process.env.URI_CONNECTION}`)
			.then(() => {
				console.log('📌 Successfully connect to MongoDB.');
			})
			.catch(err => {
				console.error('Connection error: ', err);
				process.exit();
			});
	}

	middlewares(){
		this.server.use(express.static('public'));
		this.server.use(express.json({limit: '50mb'}));
		this.server.use(express.urlencoded({extended: true, limit: '50mb'}));
		this.server.use(cors({credentials: true, origin: process.env.ORIGIN_URL}));
	}

	routes(){
		this.server.use(routes);
	}
}

const app = new App().server;
export default app;