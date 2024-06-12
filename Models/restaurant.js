const { Schema } = require('mongoose');

const RestaurantSchema = new Schema(
    {
        name: { type: String, required: true},
        cuisineType: { type: String, required: true },
        location: { type: String, required: true },
        address: { type: String, required: true },
        contactInfo: { type: String },
        openingHours: { type: String },
        description: { type: String },
        reviewsId: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        image: { type: String }

    },
    {timestamps: true}
)

module.exports = RestaurantSchema;