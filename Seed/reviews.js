const db = require('../DB');
const { Review, User, Restaurant } = require('../Models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const users = await User.find({});
    const restaurants = await Restaurant.find({});
    
    const reviews = [
        {
            rating: 5,
            comment: 'Excellent food and service!',
            userId: users[0]._id,
            restaurantId: restaurants[0]._id
        },
        {
            rating: 4,
            comment: 'Great atmosphere and tasty food.',
            userId: users[1]._id,
            restaurantId: restaurants[1]._id
        },
        {
            rating: 3,
            comment: 'Average experience, nothing special.',
            userId: users[2]._id,
            restaurantId: restaurants[2]._id
        },
        {
            rating: 2,
            comment: 'Not satisfied with the service.',
            userId: users[3]._id,
            restaurantId: restaurants[3]._id
        },
        {
            rating: 1,
            comment: 'Terrible experience, will not visit again.',
            userId: users[4]._id,
            restaurantId: restaurants[4]._id
        },
        {
            rating: 5,
            comment: 'Absolutely loved it!',
            userId: users[5]._id,
            restaurantId: restaurants[0]._id
        }
    ];

    const createdReviews = await Review.insertMany(reviews);
    for (const review of createdReviews) {
        await Restaurant.findByIdAndUpdate(review.restaurantId, { $push: { reviewsId: review._id } });
    }
    
    console.log('Created Reviews');
};
const run = async () => {
    await main();
    db.close();
};

run();
