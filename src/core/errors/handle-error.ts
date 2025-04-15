import { NextFunction } from "express";
import { NotFoundError, DatabaseError } from "./errors-padronized";

export function handleError(error: unknown, next: NextFunction) {
  if (error instanceof Error) {
    if (error.message.includes('Record to update not found') || 
        error.message.includes('User not found')) {
      return next(new NotFoundError('User'));
    }
    return next(new DatabaseError(error));
  }
  next(new Error('Unknown error occurred'));
}