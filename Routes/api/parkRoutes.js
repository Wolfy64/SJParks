const db = require('../../models');

// @route GET api/park/
// @desc Get all parks
// @access Public
function index(req, res)
{
  db.Park.find()
    .sort({
      code: 1,
      name: 1
    })
    .then(parks => res.status(200).json({
      success: true,
      parks: parks
    }))
    .catch(err => console.log(err));
}

// @route GET api/park/:parkId
// @desc find a park with '_id = parkId'
// @access Public
function read(req, res) { }

// @route POST api/park/
// @desc Create An New Park
// @access Public
function create(req, res)
{
  const {
    newName,
    newCode,
    newUser,
    newMessage
  } = req.body;

  const newPark = new db.Park({
    name: newName,
    code: newCode
  });

  if (newUser != null)
  {
    db.User.findOne({
      phone: newUser
    }).exec((err, user) =>
    {
      if (err) throw err;
      if (user)
      {
        newPark.users.push(user._id)
      } else
      {
        const newbie = new db.User({
          phone: user.phone
        });
        newbie.parks.push(newPark._id);
        newbie.save();
        newPark.users.push(newbie._id);
      }
    })
  }

  if (newMessage != null)
  {
    db.Message.findOne({
      message: newMessage
    }).exec((err, message) =>
    {
      if (err) throw err;
      if (message)
      {
        newPark.messagess.push(message._id)
      } else
      {
        const newMess = new db.Message({
          message: newMessage
        });
        newMess.parks.push(newPark._id);
        newMess.save()
        .then(newMess => newPark.users.push(newMess._id))
        .catch(err => console.log(err));

      }
    })
  }

  newPark.save()
    .then(newpark => res.status(261).send({
      Success: true,
      NewPark: newpark
    }))
    .catch(err => console.log(err));
}

// @route PUT api/park/update/:id/
// @desc Update an existing park by id
// @access Public
function update(req, res)
{
  const opts = {
    new: true, // return updated doc
    runValidators: true // validate before update
  }

  db.Park.findByIdAndUpdate(req.params.id, req.body, opts)
    .then(doc => res.status(281).json({
      success: true,
      update: doc._id
    }))
    .catch(err => console.log(err));
}

// @route DELETE api/park/delete/:id/
// @desc Delete An park by id
// @access Public
function destroy(req, res)
{
  db.Park.findByIdAndDelete(req.params.id)
    .then(park => park.remove().then(removedpark => res.status(296).json({
      success: true,
      deleted: removedpark
    })))
    .catch(err => console.log(err));
}

const express = require('express');
const router = express.Router();

// @route /api/park
router.route('/api/parks')
  .get(index)
  .post(create);

// @route /api/parks/_id/
router.route('/api/parks/:id')
  .get(read)
  .put(update)
  .delete(destroy);

module.exports = router;
