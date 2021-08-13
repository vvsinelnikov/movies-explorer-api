const { mongoose } = require('../utils/constants')
const messages = require('../utils/messages');
const regexp = require('../utils/regex');
const User = require('../models/user');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, messages.countryRequired],
    validate: {
      validator(v) {
        return regexp.name.test(v);
      },
      message: messages.invalidSymbols,
    }
  },
  description: {
    type: String,
    required: [true, messages.descriptionRequired],
    validate: {
      validator(v) {
        return regexp.name.test(v);
      },
      message: messages.invalidSymbols,
    }
  },
  director: {
    type: String,
    required: [true, messages.directorRequired],
    validate: {
      validator(v) {
        return regexp.name.test(v);
      },
      message: messages.invalidSymbols,
    }
  },
  duration: {
    type: Number,
    required: [true, messages.durationRequired],
    validate: {
      validator(v) {
        return regexp.time.test(v);
      },
      message: messages.invalidTime,
    }
  },
  id: {
    type: Number,
    required: [true, messages.movieIdRequired]
  },
  image: {
    type: Object,
    required: [true, messages.imageRequired],
    // validate: {
    //   validator(v) {
    //     return regexp.url.test(v);
    //   },
    //   message: messages.invalidUrl,
    // }
  },
  // thumbnail: {
  //   type: String,
  //   required: [true, messages.thumbnailRequired],
  //   validate: {
  //     validator(v) {
  //       return regexp.url.test(v);
  //     },
  //     message: messages.invalidUrl,
  //   }
  // },
  nameEN: {
    type: String,
    required: [true, messages.nameENRequired],
    validate: {
      validator(v) {
        return regexp.nameEN.test(v);
      },
      message: messages.invalidSymbols,
    }
  },
  nameRU: {
    type: String,
    required: [true, messages.nameRURequired],
    validate: {
      validator(v) {
        return regexp.nameRU.test(v);
      },
      message: messages.invalidSymbols,
    }
  },
  trailerLink: {
    type: String,
    required: [true, messages.trailerRequired],
    validate: {
      validator(v) {
        return regexp.url.test(v);
      },
      message: messages.invalidUrl,
    }
  },
  year: {
    type: Number,
    required: [true, messages.yearRequired],
    validate: {
      validator(v) {
        return regexp.year.test(v);
      },
      message: messages.invalidYear,
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, messages.ownerRequired]
  }
});

module.exports = mongoose.model('Movie', movieSchema);
