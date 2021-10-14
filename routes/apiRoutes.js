const workout = require('../models/Workout');

module.exports = function (app) {
  // Response to getLastWorkout fetch. Needs to add totalDuration for front end functionality.
  app.get('/api/workouts', (req, res) => {
    // db.Workout.find({}).then(function (dbWorkouts) {
    //   res.json(dbWorkouts);
    // });

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
  app.put('/api/workouts', (req, res) => {
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

  // Response to getWorkoutsInRange fetch. Needs to add totalDuration for front end functionality.
  //   Get most recent 7 workouts -> see examples, .limit(7)?
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
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
