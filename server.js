const express = require('express');
const db = require('./DB');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const restaurantController = require('./Controllers/restaurantController');
const userController = require('./Controllers/userController');
const reviewController = require('./Controllers/reviewController');

const PORT = process.env.PORT || 3001

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.send('This is our root page!');
})

// Get all Restaurants
app.get('/restaurants', restaurantController.getAllRestaurants);
// Get Restaurant by ID
app.get('/restaurants/:id', restaurantController.getRestaurantById);
// Create a Restaurant
app.post('/restaurants', restaurantController.createRestaurant);
// Update a Restaurant
app.put('/restaurants/:id', restaurantController.updateRestaurant);
// Delete a Restaurant
app.delete('/restaurants/:id', restaurantController.deleteRestaurant);
//------------------------------------------------------------------------

// Get a Restaurant Review
app.get('/restaurants/:id/reviews', reviewController.getReviewsByRestaurantId);
// Get all Reviews
app.get('/reviews', reviewController.getAllReviews);
// Add a Restaurant Review
app.post('/restaurants/:id/reviews', reviewController.addReview);
// Update a Restaurant Review
app.put('/reviews/:reviewId', reviewController.updateReview);
// Delete a Restaurant Review
app.delete('/reviews/:reviewId', reviewController.deleteReview);
//------------------------------------------------------------------------

// Get all Users
app.get('/users', userController.getAllUsers)
// Get User by ID
app.get('/users/:userId', userController.getUserById);
// Delete a user
app.delete('/users/:userId', userController.deleteUser);
//Update a User
app.put('/users/:userId', userController.updateUser);
// Register a new User
app.post('/register', userController.register);
// Log in
app.post('/login', userController.login);
// Log out
app.get('/logout', userController.logout);



module.exports = app;