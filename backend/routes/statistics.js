const router = require('express').Router();
let Session = require('../models/session.model');
const moment = require('moment');


router.route('/').get((req,res)=>{
    Session.find().then(sessions=>res.json(sessions))
    .catch(err=> res.status(400).json('Error: '+err));

});



router.route('/sessionTimeLogged').get((req,res)=>{
    const username = req.body.username;
    const start_date = moment(req.body.start_date).startOf('day').toDate();
    //startOfDay(new Date(req.body.start_date));

    const end_date = moment(req.body.end_date).endOf('day').toDate();
    console.log(start_date)
    console.log(end_date)

    let total_time = 0;

    Session.find({ 
        "stop_time": { 
            "$gte": startOfDay(start_date), "$lte": endOfDay(end_date)
        }
    }).then(sessions=> {
        
        for(session of sessions){
            console.log("sess: "+session)
            total_time += session.total_time
        }
        res.json(total_time)
    })
    .catch(err=> res.status(400).json('Error: '+err));
    
});

router.route('/:id').delete((req,res) => {
    Session.findByIdAndDelete(req.params.id)
    .then(exercises=>res.json("Session sucessfully deleted id: "+req.params.id))
    .catch(err=> res.status(400).json('Error: '+err));

})

module.exports = router;