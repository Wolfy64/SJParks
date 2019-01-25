const db = require('../../models');
const {validateAllUpdates } = require('../../config/validation');
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
    newSubscriptionLogEntry,
    newMesssageLogEntry
  } = req.body;
  const parkToBeAdded = {};

  if (newSubscriptionLogEntry != null)
  {
    db.SubscriptionLog.findOne({
      phone: newSubscriptionLogEntry
    }).exec((err, subscriptionLog) => {
    });
  }

  if (newParkMessage != null)
  {
    db.Message.findOne({
      message: newParkMessage
    }).exec((err, message) =>
    {
      if (err) throw err;
      if (message)
      {
        newPark.messagess.push(message._id)
      } else
      {
        const newMess = new db.Message({
          message: newParkMessage
        });
        newMess.parks.push(newPark._id);
        newMess.save()
        .then(newMess => newPark.users.push(newMess._id))
        .catch(err => console.log(err));

      }
    })
  }
  const newPark = new db.Park({
    name: newName,
    code: newCode,
    
  });
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
  const { errors, isValid} = validateAllUpdates(req.body);
  const opts = {
    new: true, // return updated doc
    runValidators: true // validate before update
  };

  if(!isValid){
    res.status(437).json({errors});
  } else {
    db.Park.findByIdAndUpdate(req.params.id, req.body, opts)
    .then(doc => {
      doc.save();  
    })
    .catch(err => console.log(err));
  }
 
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

module.exports = {
  index,
  read,
  create,
  update,
  destroy
}
