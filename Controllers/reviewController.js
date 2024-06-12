const { Review } = require('../Models');
const { Restaurant } = require('../Models');
const mongoose = require('mongoose');

// Get all Reviews for a Restaurant
const getReviewsByRestaurantId = async (req, res) => {
    const { id } = req.params;
    try 
    {
        const restaurant = await Restaurant.findById(id).populate('reviewsId')
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant no found!'})
        }
        res.status(200).json(restaurant.reviewsId);
    }catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// Add a new review for a Restaurant
const addReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment, userId } = req.body;
    try 
    {
        const restaurant = await Restaurant.findById(id);
        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found'});
        }
        const newReview = new Review({
            rating,
            comment,
            user: userId,
            restaurant: id
        });

        const savedReview = await newReview.save();

        restaurant.reviewsId.push(savedReview._id);
        await restaurant.save();
        res.status(201).json(savedReview);

    }catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// Update a review by ID
const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    try 
    {
        const review = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
        if(!review) {
            return res.status(404).json({ message: 'Review not found!' });
        }
        res.status(200).json(review);
    }catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try
    {
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found!' });
        }

        await Restaurant.updateOne(
            { _id: review.restaurant },
            { $pull: { reviewsId: review._id }}
        );

        res.status(200).json({ message: 'Review successfully deleted' });
    }catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// Get all Reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviewsByRestaurantId,
    addReview,
    updateReview,
    deleteReview,
    getAllReviews
}
