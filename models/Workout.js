const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the Workout model as a new mongoose Schema.
const workoutSchema = new Schema({
  // Day is set so added workouts will have today's date.
  day: {
    type: Date,
    default: Date.now,
  },
  // Exercises include a number of fields to cover both resistance training and cardio.
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
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

// The defined Schema is set to variable Workout and exported.
const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
