const db = require('../DB');
const { Restaurant } = require('../Models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const restaurants = [
        {
            name: 'Pizzeria Uno',
            cuisineType: 'Italian',
            location: 'Chicago',
            address: '29 E Ohio St, Chicago, IL 60611',
            contactInfo: '312-321-1000',
            openingHours: '11:00 AM - 11:00 PM',
            description: 'Famous for deep-dish pizza.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg'
        },
        {
            name: 'Portillo\'s',
            cuisineType: 'American',
            location: 'Chicago',
            address: '100 W Ontario St, Chicago, IL 60654',
            contactInfo: '312-587-8910',
            openingHours: '10:30 AM - 10:30 PM',
            description: 'Known for hot dogs, Italian beef, and chocolate cake.',
            image: 'https://tapinto-production.s3.amazonaws.com/uploads/articles/un/best_crop_1e9787c043ecd4892026_uno_pizzeria_cropped.jpg?id=5004186'

        },
        {
            name: 'Girl & the Goat',
            cuisineType: 'American',
            location: 'Chicago',
            address: '809 W Randolph St, Chicago, IL 60607',
            contactInfo: '312-492-6262',
            openingHours: '4:30 PM - 11:00 PM',
            description: 'Creative dishes in a trendy setting.',
            image: 'https://tapinto-production.s3.amazonaws.com/uploads/articles/un/best_crop_1e9787c043ecd4892026_uno_pizzeria_cropped.jpg?id=5004186'

        },
        {
            name: 'Alinea',
            cuisineType: 'Contemporary',
            location: 'Chicago',
            address: '1723 N Halsted St, Chicago, IL 60614',
            contactInfo: '312-867-0110',
            openingHours: '5:00 PM - 10:30 PM',
            description: 'High-end dining with a focus on molecular gastronomy.',
            image: 'https://tapinto-production.s3.amazonaws.com/uploads/articles/un/best_crop_1e9787c043ecd4892026_uno_pizzeria_cropped.jpg?id=5004186'

        },
        {
            name: 'Lou Malnati\'s Pizzeria',
            cuisineType: 'Italian',
            location: 'Chicago',
            address: '1120 N State St, Chicago, IL 60610',
            contactInfo: '312-725-7777',
            openingHours: '11:00 AM - 11:00 PM',
            description: 'Famous for its deep-dish pizza.',
            image: 'https://tapinto-production.s3.amazonaws.com/uploads/articles/un/best_crop_1e9787c043ecd4892026_uno_pizzeria_cropped.jpg?id=5004186'

        },
        {
            name: 'Frontera Grill',
            cuisineType: 'Mexican',
            location: 'Chicago',
            address: '445 N Clark St, Chicago, IL 60654',
            contactInfo: '312-661-1434',
            openingHours: '11:30 AM - 10:00 PM',
            description: 'Award-winning Mexican cuisine by Rick Bayless.',
            image: 'https://tapinto-production.s3.amazonaws.com/uploads/articles/un/best_crop_1e9787c043ecd4892026_uno_pizzeria_cropped.jpg?id=5004186'

        }
    ];
    await Restaurant.insertMany(restaurants);
    console.log('Created Restaurants');
};

const run = async () => {
    await main();
    db.close();
};

run();

