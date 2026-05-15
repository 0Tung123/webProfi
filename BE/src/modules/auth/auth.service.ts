import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from './auth.validation';
import type { LoginInput, AuthResponse } from './auth.types';

export const authService = {
  async login(data: LoginInput): Promise<AuthResponse> {
    // Validate input
    const validated = loginSchema.parse(data);

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { email: validated.email }
    });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(validated.password, admin.password);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Server configuration error');
    }

    const token = jwt.sign(
      { adminId: admin.adminId },
      secret,
      { expiresIn: '7d' }
    );

    return {
      token,
      admin: { adminId: admin.adminId, email: admin.email }
    };
  }
};