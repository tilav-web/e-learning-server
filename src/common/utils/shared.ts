import * as env from 'dotenv';
env.config();

export const jwtSecret = process.env.JWT_SECRET;
