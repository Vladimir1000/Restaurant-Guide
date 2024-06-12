const { Schema } = require('mongoose');

const ReviewSchema = new Schema(
    {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
    },
    {timestamps: true}
) 

module.exports = ReviewSchema;