const moongoose = require('mongoose');
const FavoriteCat = require('./favoriteCat');

const catSchema = new moongoose.Schema({
    imageTitle: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    breed: {
        type: String,
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    numFavorites: {
        type: Number,
        default: 0
    }
});


catSchema.pre('remove', async function(next) {
    await FavoriteCat.deleteMany({ cat: this._id });
    next();
});
module.exports = moongoose.model('Cat', catSchema);