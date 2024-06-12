const mongoose = require('mongoose');
const RestaurantSchema = require('./restaurant');
const ReviewSchema = require('./review');
const UserSchema = require('./user');

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Review = mongoose.model('Review', ReviewSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    Restaurant, 
    Review,
    User
}