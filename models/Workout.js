// Test the required's from the schema. Consider eliminating index.js.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: 'Enter an exercise type.',
      },
      name: {
        type: String,
        trim: true,
        required: 'Enter a workout name.',
      },
      duration: {
        type: Number,
        required: 'Enter an exercise duration, in minutes.',
      },
      weight: {
        type: Number,
        required: 'Enter the weight used for the exercise.',
      },
      reps: {
        type: Number,
        required: 'Enter how many reps were performed, per set.',
      },
      sets: {
        type: Number,
        required: 'Enter how many sets were performed.',
      },
      distance: {
        type: Number,
        required: 'Enter the distance reached.',
      },
    },
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
