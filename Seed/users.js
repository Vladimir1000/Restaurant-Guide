const db = require('../DB');
const { User } = require('../Models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const users = [
        {
            username: 'John_Doe',
            email: 'john@example.com',
            password: 'password123'
        },
        {
            username: 'Jane_Smith',
            email: 'jane@example.com',
            password: 'password123'
        },
        {
            username: 'mike_jones',
            email: 'mike@example.com',
            password: 'password123'
        },
        {
            username: 'susan_lee',
            email: 'susan@example.com',
            password: 'password123'
        },
        {
            username: 'chris_evans',
            email: 'chris@example.com',
            password: 'password123'
        },
        {
            username: 'amy_adams',
            email: 'amy@example.com',
            password: 'password123'
        }
    ];
    await User.insertMany(users);
    console.log('Created Users');
};

const run = async () => {
    await main();
    db.close();
};

run();