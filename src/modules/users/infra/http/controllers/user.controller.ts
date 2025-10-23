import { Request, Response } from 'express';
import { UserDTO } from '@src/modules/users/dtos/user.dto';
import { AppError } from '@src/shared/infra/http/errors/app-error';
import { container } from 'tsyringe';
import { RegisterUserService } from '@src/modules/users/services/register-user.service';
import { LoginUserService } from '@src/modules/users/services/login-user.service';

export class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const data = request.body as UserDTO;
            const registerUserService = container.resolve(RegisterUserService);
            const user = await registerUserService.execute(data);
            return response.status(201).json(user);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({
                    message: error.message,
                });
            }
            console.error(error);
            return response.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    public async login(request: Request, response: Response): Promise<Response> {
        try {
            const data = request.body as UserDTO;
            const loginUserService = container.resolve(LoginUserService);
            const token = await loginUserService.execute(data);
            return response.status(200).json(token);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.code).json({
                    message: error.message,
                });
            }
            console.error(error);
            return response.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}
