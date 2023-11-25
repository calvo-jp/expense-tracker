import {prisma} from '@/config/prisma';
import bcrypt from 'bcrypt';
import {cache} from 'react';

type GetUserInput =
	| {id: string; username?: never}
	| {id?: never; username: string};

export const getUser = cache(async (where: GetUserInput) => {
	return await prisma.user.findUniqueOrThrow({where});
});

interface CreateUserInput {
	username: string;
	password: string;
}

export async function createUser(data: CreateUserInput) {
	data.password = await bcrypt.hash(data.password, await bcrypt.genSalt(16));

	return await prisma.user.create({data});
}

export const changePassword = cache(async (id: string, password: string) => {
	password = await bcrypt.hash(password, await bcrypt.genSalt(16));

	return await prisma.user.update({where: {id}, data: {password}});
});
