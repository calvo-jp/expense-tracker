import {prisma} from '@/config/prisma';
import {cache} from 'react';

export const getUser = cache((id: string) => {
	return prisma.user.findUniqueOrThrow({where: {id}});
});
