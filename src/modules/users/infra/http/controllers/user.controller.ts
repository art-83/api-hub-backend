import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterUserService } from '@src/modules/users/services/register-user.service';
import { LoginUserService } from '@src/modules/users/services/login-user.service';
import { User } from '../../orm/entities/user.entity';

export class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as Partial<User>;
        const registerUserService = container.resolve(RegisterUserService);
        const user = await registerUserService.execute(data);
        return response.status(201).json(user);
    }

    public async login(request: Request, response: Response): Promise<Response> {
        const data = request.body as Partial<User>;
        const loginUserService = container.resolve(LoginUserService);
        const token = await loginUserService.execute(data);
        return response.status(200).json(token);
    }
}
