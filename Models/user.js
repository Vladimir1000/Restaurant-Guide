const { Schema } = require('mongoose');

const UserSchema = new Schema(
    {
        username: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
        reviewsId: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
    },
    { timestamps: true }

)

module.exports = UserSchema;