const db = require('../models/Workout');

module.exports = function (app) {
  // Response to getLastWorkout fetch. Needs to add totalDuration for front end functionality.
  app.get('/api/workouts', (req, res) => {
    // db.Workout.find({}).then(function (dbWorkouts) {
    //   res.json(dbWorkouts);
    // });

    db.aggregate([
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
  //   app.put('/api/workouts', (req, res) => {
  //     // code
  //   });

  // Response to createWorkout post request.
  //   app.post('/api/workouts', (req, res) => {
  //     // code
  //   });

  // Response to getWorkoutsInRange fetch.
  //   //   Get most recent 7 workouts -> see examples, .limit(7)?
  //   app.get('/api/workouts/range', (req, res) => {
  //     // code
  //   });
};