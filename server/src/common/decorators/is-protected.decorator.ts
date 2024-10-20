import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth';

export const IsProtected = () =>
  applyDecorators(UseGuards(AuthGuard), ApiBearerAuth('user'));
