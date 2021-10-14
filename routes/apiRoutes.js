const db = require('../models');
const Workout = require('../models/Workout');

module.exports = function (app) {
  // Response to getLastWorkout fetch. Needs to add totalDuration for front end functionality.
  app.get('/api/workouts', (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      // Respond with the workouts data, including the added totalDuration.
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      // Respond with any caught errors.
      .catch((err) => {
        res.json(err);
      });
  });

  // Response to addExercise put request. Updates by pushing the input body.
  app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          exercises: req.body,
        },
      },
      { new: true, runValidators: true }
    )
      // Respond with the workouts data.
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      // Respond with any caught errors.
      .catch((err) => {
        res.json(err);
      });
  });

  // Response to createWorkout post request. Creates a new workout with the input body.
  app.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
      // Respond with the workouts data.
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      // Respond with any caught errors.
      .catch((err) => {
        res.json(err);
      });
  });

  // Response to getWorkoutsInRange fetch. Needs to add totalDuration for front end functionality. Needs to respond with 7 most recent workouts.
  app.get('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      // Sort newest to oldest workouts.
      .sort({ day: -1 })
      // Limit response to 7 workouts.
      .limit(7)
      // Re-sort to return to oldest to newest workouts.
      .sort({ day: 1 })
      // Respond with the workouts data, including the added totalDuration.
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      // Respond with any caught errors.
      .catch((err) => {
        res.json(err);
      });
  });
};
