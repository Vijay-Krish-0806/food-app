import { models } from 'mongoose';
import { Schema, model } from 'mongoose'
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    streetAddress: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });




export const User = models?.User || model('User', UserSchema);