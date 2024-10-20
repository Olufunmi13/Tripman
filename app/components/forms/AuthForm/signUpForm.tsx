// import React from 'react'
// import bcrypt from 'bcryptjs';
// import { prisma } from '@/app/lib/prisma';

//    export async function createUser(userName: string, email: string, password: string) {
//      try {
//        const hashedPassword = bcrypt.hashSync(password, 10); // 10 rounds of salt
//        const user = await prisma.user.create({
//          data: {
//            username,
//            email,
//            password: hashedPassword,
//          },
//        });
//        return user;
//      } catch (error) {
//        console.error('Error creating user:', error);
//        throw error;
//      }
//    }
