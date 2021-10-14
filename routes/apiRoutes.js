const workout = require('../models/Workout');

module.exports = function (app) {
  // Response to getLastWorkout fetch. Needs to add totalDuration for front end functionality.
  app.get('/api/workouts', (req, res) => {
    workout
      .aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: '$exercises.duration',
            },
          },
        },
      ])
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Response to addExercise put request.
  app.put('/api/workouts/:id', (req, res) => {
    workout
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            exercises: req.body,
          },
        },
        { new: true, runValidators: true }
      )
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Response to createWorkout post request.
  app.post('/api/workouts', ({ body }, res) => {
    workout
      .create(body)
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Response to getWorkoutsInRange fetch. Needs to add totalDuration for front end functionality. Needs to serve up 7 most recent workouts.
  app.get('/api/workouts/range', (req, res) => {
    workout
      .aggregate([
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
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
