// Mock data
let users = [
	{
		id: '1',
		name: 'Amir',
		email: 'example@c.com',
		age: 27
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@c.com'
	},
	{
		id: '3',
		name: 'Test',
		email: 'test@c.com',
		age: 34
	}
];

let posts = [
	{
		id: '1',
		title: 'Test post 1',
		body: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		published: true,
		author: '1'
	},
	{
		id: '2',
		title: 'Test post 2',
		body: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		published: true,
		author: '1'
	},
	{
		id: '3',
		title: 'Test post 3',
		body: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		published: true,
		author: '2'
	}
];

let comments = [
	{
		id: '1',
		text: 'Lorem 1',
		author: '1',
		post: '3'
	},
	{
		id: '2',
		text: 'Lorem 2',
		author: '3',
		post: '2'
	},
	{
		id: '3',
		text: 'Lorem 3',
		author: '1',
		post: '2'
	},
	{
		id: '4',
		text: 'Lorem 4',
		author: '2',
		post: '2'
	}
];

const db = {
	users,
	posts,
	comments
};

export default db;
