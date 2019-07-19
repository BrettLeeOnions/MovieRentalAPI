const mongoose = require('mongoose');
const movieSchema = require('./movie');
const customerSchema = require('./customer');
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
  customer: { 
      type: new mongoose.Schema({
        customerId:{
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        }      
      }),  
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        movieId:{
          type:String,
          required:true
        },
        title:{
          type:String,
          required: true
        }
      }),
      required: true
    },
    dateOut: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    dateReturned: { 
      type: Date
    },
    rentalFee: { 
      type: Number, 
      min: 0
    }
});

rentalSchema.statics.lookup = function(customerId, movieId) {
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId,
  });
}

rentalSchema.methods.return = function() {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * 4;
}

const Rental = mongoose.model('Rental',rentalSchema);

exports.Rental = Rental;