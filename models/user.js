const { mongoose, validator, bcrypt } = require('../utils/constants')
const messages = require('../utils/messages');
const AuthRequiredErr = require('../errors/auth-required-err')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, messages.emailRequired],
    unique: [true, messages.emailUnique],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: messages.invalidEmail,
    },
  },
  password: {
    type: String,
    required: [true, messages.passwordRequired],
    select: false,
  },
  name: {
    type: String,
    required: [true, messages.nameRequired],
    minlength: 2,
    maxlength: 30,
  }
});

// аутентификация по email и password
userSchema.statics.findUserByCredentials = function (email, password) {
  if (!email) { return Promise.reject(new AuthRequiredErr(messages.emailMissing)); }
  if (!password) { return Promise.reject(new AuthRequiredErr(messages.passwordMissing)); }
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) { return Promise.reject(new AuthRequiredErr(messages.invalidCredentials)); }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { return Promise.reject(new AuthRequiredErr(messages.invalidCredentials)); }
          return { _id: user._id, name: user.name, email: user.email }
        });
    });
};

module.exports = mongoose.model('User', userSchema);
