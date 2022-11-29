const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const favoriteRouter = express.Router();


favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(`POST operation supported on /favorites ${"_id","campsite ObjectId"}`);
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
Favorite.findOne({user: req.user._id}).then((favorite)=>{
    if(favorite){
        for(let i=0; i <req.body.length;i++){
            let fav = req.body[i];
            if(!favorites.campsites.includes(fav._id)){
                favorite.campsites.push(fav._id)
            }
        }
        favorite.save().then((response)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        });
    } else {
        Favorite.create({
            user: req.user_id,
            campsites: req.body,    
        }).then((response)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(response);
        });
    }
})
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOneAndDelete({user: req.user._id}).then((favDoc)=>{
        res.statusCode = 200;
    if(favDoc){
        res.setHeader('Content-Type','application/json');
        res.json(favDoc)
    }
    else{   
        res.setHeader('Content-Type', 'text/plain');
        res.end('You do not have any favorites to delete.')
    }
    })
});


favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Favorite.findOne({ user: req.user._id}).then((favorite) =>{
        if(favorite){
            if(!favorite.campsites.includes(req.params.campsiteId)){
                favorite.campsites.push(req.params.campsiteId)
            }
            favorite.save().then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(response);
            });
        } else {
            Favorite.create({
                user: req.user._id,
                campsites: [req.params.campsiteId]
            }).then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(response);
            });
        }
    });

})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findByIdAndUpdate(req.params.campsiteId, {
        $set: req.body
    }, { new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({user:req.user._id}).then((favorite)=>{
        if(favorite){
            if(favorite.campsites.indexOf(req.params.campsiteId) != -1){
                favorite.campsites.splice(favorite.campsites.indexOf(req.params.campsiteId),1);
                favorite.save().then((favorite)=>{
                    res.statusCode= 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favorite);
                });
            }
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.send('You have no favorites');
        }

    });
});



module.exports = favoriteRouter;