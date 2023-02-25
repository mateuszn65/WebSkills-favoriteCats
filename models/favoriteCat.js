const mongoose = require('mongoose');

const favoriteCatSchema = new mongoose.Schema({
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

favoriteCatSchema.pre('save', async function(next) {
    this.cat.numFavorites++;
    await this.cat.save();
    next();
});


favoriteCatSchema.pre('remove', async function(next) {
    this.cat.numFavorites--;                
    await this.cat.save();
    next();
});

favoriteCatSchema.index({ cat: 1, user: 1 }, { unique: true });
module.exports = mongoose.model('FavoriteCat', favoriteCatSchema);