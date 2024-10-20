import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserId = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest<Request>();

    const userId: string = request?.userId;

    return userId;
  },
);
