const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    key: { type: String },
    personal: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        birthday: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            number: { type: Number, required: true },
            city: { type: String, required: true },
            plz: { type: Number, required: true },
        }
    },
    contact: {
        email: { type: String, required: true },
        tel_mobil: { type: Number, required: true },
        tel_work:  { type: Number, required: true },
        tel_home:  { type: Number, required: true },
    },
    social: {
        instagram: { type: String, required: false },
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        snapchat: { type: String, required: false}
    }
});

module.exports = mongoose.model('Accounts', accountSchema);