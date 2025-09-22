import '@testing-library/jest-dom';

jest.mock('./src/lib/prisma', () => ({
	prisma: {
		field: {
			findMany: jest.fn(),
			findUnique: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
		reservation: {
			findMany: jest.fn(),
			findUnique: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
		user: {
			findUnique: jest.fn(),
			create: jest.fn(),
		},
	},
}));

global.fetch = jest.fn();
