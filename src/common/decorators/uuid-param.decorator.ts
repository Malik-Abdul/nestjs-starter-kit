import { Param } from '@nestjs/common';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';

export const UuidParam = (
  param = 'id',
  message = 'Resource not found',
) =>
  Param(
    param,
    new ParseUUIDPipe({
      version: '4',
      exceptionFactory: () => new NotFoundException(message),
    }),
  );
