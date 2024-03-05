// Imports Modules
import { Router } from 'express';

// Imports Controllers
import NewUser from '../controllers/create_user';

// Validations
import validate from '../../../shared/middlewares/validator';
import { InsertUserSchema } from '../entities/validation_schema';


const routes = Router();

routes.post('/user/signup', validate(InsertUserSchema), NewUser.CreateUser);

export default routes;