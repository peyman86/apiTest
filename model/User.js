const userSchema = {
    name: String,
    roomId: {type: String},
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    createDate: Number,
    email: String
}

module.exports = userSchema