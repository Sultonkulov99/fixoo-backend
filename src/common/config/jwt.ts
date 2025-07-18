
import { JwtSignOptions } from '@nestjs/jwt';

export const JWTAccessOptions: JwtSignOptions = {
  secret: 'j+El3er&nI!n}g~S8623x',
  expiresIn: '2000h',
};

export const JWTRefreshOptions: JwtSignOptions = {
  secret: 'j+El3er&nI!n}g~S8623x',
  expiresIn: '29d',
};