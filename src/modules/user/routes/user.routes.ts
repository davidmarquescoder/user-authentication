// Imports Modules
import { Router } from 'express';

// Imports Controllers
import NewUser from '../controllers/create_user';


const routes = Router();

routes.post('/user/signup', NewUser.CreateUser);

export default routes;