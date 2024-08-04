import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateBody(type: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(type, req.body);
    validate(input).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const messages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join(', ');
        res.status(400).json({ error: messages });
      } else {
        req.body = input;
        next();
      }
    });
  };
}
