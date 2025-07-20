import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt"
import { ResetPasswordDto } from './dto/verification.dto';
import { JWTAccessOptions, JWTRefreshOptions } from 'src/common/config/jwt';
import { PrismaService } from 'src/core/database/prisma.service';
import { EVerificationTypes } from 'src/common/types/verification';
import { VerificationService } from '../verification/verification.service';
import { UserRole } from '@prisma/client';

interface JwtPayload {
    id: string,
    role: string
}

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private verificationService: VerificationService,
    ) { }

    private async generateTokens(payload: JwtPayload, accessTokenOnly = false) {

        const accessToken = await this.jwtService.signAsync(payload, JWTAccessOptions);
        if (accessTokenOnly) {
            return { accessToken }
        }
        const refreshToken = await this.jwtService.signAsync({ id: payload.id }, JWTRefreshOptions);

        return { accessToken, refreshToken }

    }

    async register(payload: registerDto) {
        await this.verificationService.checkConfirmOtp({
            type: EVerificationTypes.REGISTER,
            phone: payload.phone,
            otp: payload.otp,
        });

        if (payload.district) {
            payload.role = UserRole.MASTER
        }
        let hash = await bcrypt.hash(payload.password, 10)
        let user = await this.prisma.user.create({
            data: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                phone: payload.phone,
                password: hash,
                role:payload.role ? payload.role : "ADMIN",
                add_address: payload.add_address ?? null, 
                region: payload.region ?? null,
                district: payload.district ?? null,
                profession: payload.profession ?? null,
            }
        })

        return this.generateTokens({ id: user.id, role: user.role })

    }

    async login(payload: Required<loginDto>) {
        let user = await this.prisma.user.findUnique({
            where: { phone: payload.phone }
        })

        if (!user || !(await bcrypt.compare(payload.password, user.password))) {
            throw new NotFoundException("username or password is invalid")
        }

        return this.generateTokens({ id: user.id, role: user.role })
    }

    async refreshToken({ token }: { token: string }) {
        try {
            let payload = await this.jwtService.verifyAsync(token)
            if (!payload?.id) throw new UnauthorizedException()

            return this.generateTokens({ id: payload.id, role: payload.role }, true)
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired refresh token")
        }
    }

    async resetPassword(payload: ResetPasswordDto) {
        await this.verificationService.checkConfirmOtp({
            type: EVerificationTypes.RESET_PASSWORD,
            otp: payload.otp,
            phone: payload.phone,
        });

        const hashedPassword = await bcrypt.hash(payload.password, 10)

        await this.prisma.user.update({
            where: {
                phone: payload.phone,
            },
            data: {
                password: hashedPassword,
            },
        });
        return {
            success: true,
            message: 'New password successfully set',
        };
    }
}
