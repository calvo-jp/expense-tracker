'use server';

import {prisma} from '@/config/prisma';
import bcrypt from 'bcrypt';
import {addDays} from 'date-fns';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {
	ChangePasswordSchema,
	CredentialsSchema,
	UpsertExpenseSchema,
} from './schema';

export async function changePassword(input: unknown) {
	const id = cookies().get('user')?.value;

	if (!id) return 'Auth required';

	try {
		const user = await prisma.user.findUniqueOrThrow({where: {id}});
		const parsed = ChangePasswordSchema.safeParse(input);

		if (!parsed.success) return parsed.error.errors[0].message;

		const matches = await bcrypt.compare(
			parsed.data.oldPassword,
			user.password,
		);

		if (!matches) return 'Old password is incorrect';

		await prisma.user.update({
			where: {id},
			data: {
				password: await bcrypt.hash(
					parsed.data.newPassword,
					await bcrypt.genSalt(16),
				),
			},
		});

		return null;
	} catch {
		return 'Something went wrong';
	}
}

/*
 *------------------- AUTH -------------------
 */

export async function login(input: unknown) {
	const parsed = CredentialsSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	const {username, password} = parsed.data;

	try {
		const user = await prisma.user.findUniqueOrThrow({where: {username}});
		const matches = await bcrypt.compare(password, user.password);

		if (!matches) throw new Error();

		cookies().set('user', user.id, {expires: addDays(new Date(), 30)});
		return null;
	} catch {
		return 'Invalid username or password';
	}
}

export async function register(input: unknown) {
	const parsed = CredentialsSchema.safeParse(input);

	if (!parsed.success) return parsed.error.errors[0].message;

	let {username, password} = parsed.data;

	password = await bcrypt.hash(password, await bcrypt.genSalt(16));

	try {
		const user = await prisma.user.create({
			data: {
				username,
				password,
			},
			select: {
				id: true,
			},
		});

		cookies().set('user', user.id, {expires: addDays(new Date(), 30)});
		return null;
	} catch {
		return 'Invalid username or password';
	}
}

export async function logout() {
	cookies().delete('user');
	redirect('/');
}

/*
 *------------------- EXPENSE -------------------
 */

export async function createExpense(input: unknown) {
	const parsed = UpsertExpenseSchema.safeParse(input);
	const userId = cookies().get('user')?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return 'Auth required';

	const data = {userId, ...parsed.data};

	try {
		await prisma.expense.create({data});
		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}

export async function updateExpense(id: string, input: unknown) {
	const parsed = UpsertExpenseSchema.safeParse(input);
	const userId = cookies().get('user')?.value;

	if (!parsed.success) return parsed.error.errors[0].message;
	if (!userId) return 'Auth required';

	const data = {userId, ...parsed.data};

	try {
		await prisma.expense.update({where: {id, AND: {userId}}, data});
		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}

export async function deleteExpense(id: string) {
	const userId = cookies().get('user')?.value;

	if (!userId) return 'Auth required';

	try {
		await prisma.expense.delete({where: {id, AND: {userId}}});
		revalidatePath('/expenses');
		return null;
	} catch {
		return 'Something went wrong';
	}
}

/*
 *------------------- REPORT -------------------
 */
