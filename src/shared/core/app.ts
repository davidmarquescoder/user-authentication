// Imports Modules
import express from 'express';
import cors from 'cors';

// Dotenv Config
import dontenv from 'dotenv';
dontenv.config();

// Imports Routes


class App{

	public server: express.Application;

	constructor(){
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares(){
		this.server.use(express.static('public'));
		this.server.use(express.json({limit: '50mb'}));
		this.server.use(express.urlencoded({extended: true, limit: '50mb'}));
		this.server.use(cors({credentials: true, origin: process.env.ORIGIN_URL}));
	}

	routes(){
        
	}
}

const app = new App().server;
export default app;