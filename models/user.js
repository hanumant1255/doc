var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name: String,
    email: { type: String, require: true, unique: true },
    hashed_password: String,
    created_at: String,
    no_of_cards: { type: Number, default:0 },
    cards: {
    clubs:{     
    "clubs_ace":{ type: Boolean, default: false },
    "clubs_two":{ type: Boolean, default: false },
    "clubs_three":{ type: Boolean, default: false },
    "clubs_four":{ type: Boolean, default: false },
    "clubs_five" : {type: Boolean, default: false},
    "clubs_six":{type: Boolean, default: false}, 
    "clubs_seven": { type: Boolean, default: false },
    "clubs_eight" : {type: Boolean, default: false},
    "clubs_nine" : {type: Boolean, default: false},
    "clubs_ten":{ type: Boolean, default: false} ,
    "clubs_jack":{ type: Boolean, default: false} ,
    "clubs_queen" : {type: Boolean, default: false},
    "clubs_king":{type: Boolean, default: false}   
     },
    diamonds: {       
    "diamonds_ace": { type: Boolean, default: false },
    "diamonds_two":{type: Boolean, default: false}, 
    "diamonds_three" : {type: Boolean, default: false},
    "diamonds_four": { type: Boolean, default: false },
    "diamonds_five" : {type: Boolean, default: false},
    "diamonds_six":{type: Boolean, default: false}, 
    "diamonds_seven": { type: Boolean, default: false },
    "diamonds_eight" : {type: Boolean, default: false},
    "diamonds_nine" : {type: Boolean, default: false},
    "diamonds_ten":{ type: Boolean, default: false} ,
    "diamonds_jack":{ type: Boolean, default: false} ,
    "diamonds_queen" : {type: Boolean, default: false},
    "diamonds_king":{type: Boolean, default: false}
},
    hearts: {       
    "hearts_ace": { type: Boolean, default: false },
    "hearts_two":{type: Boolean, default: false}, 
    "hearts_three" : {type: Boolean, default: false},
    "hearts_four": { type: Boolean, default: false },
    "hearts_five" : {type: Boolean, default: false},
    "hearts_six":{type: Boolean, default: false}, 
    "hearts_seven": { type: Boolean, default: false },
    "hearts_eight" : {type: Boolean, default: false},
    "hearts_nine" : {type: Boolean, default: false},
    "hearts_ten":{ type: Boolean, default: false} ,
    "hearts_jack":{ type: Boolean, default: false} ,
    "hearts_queen" : {type: Boolean, default: false},
    "hearts_king":{type: Boolean, default: false}
},
    spades: {       
    "spades_ace": { type: Boolean, default: false },
    "spades_two":{type: Boolean, default: false}, 
    "spades_three" : {type: Boolean, default: false},
    "spades_four": { type: Boolean, default: false },
    "spades_five" : {type: Boolean, default: false},
    "spades_six":{type: Boolean, default: false}, 
    "spades_seven": { type: Boolean, default: false },
    "spades_eight" : {type: Boolean, default: false},
    "spades_nine" : {type: Boolean, default: false},
    "spades_ten":{ type: Boolean, default: false} ,
    "spades_jack":{ type: Boolean, default: false} ,
    "spades_queen" : {type: Boolean, default: false},
"spades_king":{type: Boolean, default: false}
    
        }
    }

});

module.exports = mongoose.model('user', userSchema);

module.exports.staticcardHolder = ["clubs", "diamonds", "hearts", "spades"]

module.exports.staticCards = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"]