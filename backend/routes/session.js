const router = require('express').Router();
let Session = require('../models/session.model');


router.route('/').get((req,res)=>{
    Session.find().then(sessions=>res.json(sessions))
    .catch(err=> res.status(400).json('Error: '+err));

});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const start_time = new Date(req.body.start_time);
    const stop_time = new Date(req.body.stop_time);
   
    const total_time =  req.body.total_time
    const notes = req.body.notes;
    console.log(notes)
    //Math.abs(stop_time - start_time)
    const newSession = new Session({username,notes, start_time,stop_time,total_time})
    newSession.save().then(()=>{
        console.log(res.statusCode)
        console.log('Session added')
        res.json('Session added')
    }
    ).catch((err)=> res.json('Error: ' + err))
});

router.route('/:id').delete((req,res) => {
    Session.findByIdAndDelete(req.params.id)
    .then(exercises=>res.json("Session sucessfully deleted id: "+req.params.id))
    .catch(err=> res.status(400).json('Error: '+err));

})

module.exports = router;