'use strict';

const auth = require('basic-auth');
const core = require('../service/core');


module.exports = router => {
  /**
   * @api {get} /login Request User information
   * @apiName GetUser
   * @apiGroup User
   * @apiSuccess {Json} user model
   */
    router.get('/login', (req, res) => {

        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({
                message: 'Invalid Request : email and password must be in header !'
            });

        } else {

            core.checkUser(credentials.name, credentials.pass)

            .then(result => {
                res.status(result.status).json(result.message);

            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }));
        }
    });
    /**
     * @api {post} /register Create new User
     * @apiName CreateUser
     * @apiGroup User
     * @apiSuccess {Json} user model
     */
    router.post('/register', (req, res) => {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {

            res.status(400).json({
                message: 'Invalid Request: name,email and password are required parameters !'
            });

        } else {
            core.registerUser(name, email, password)

            .then(result => {
                res.status(result.status).json(result.message)
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }));
        }
    });
    /**
     * @api {put} /user/:cardholder/:cardvalue update user status
     * @apiName UpdateUser
     * @apiGroup User
     * @apiSuccess {Json} user model
     */
    router.put('/user/:cardholder/:cardvalue', (req, res) => {

        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({
                message: 'Invalid Request :email and password must be in header !'
            });

        } else {
            core.checkUser(credentials.name, credentials.pass)

            .then(result => core.saveUserState(req.params.cardholder, req.params.cardvalue, result.message))

            .then(result => {

                    res.status(result.status).json(result.message)

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });
    /**
     * @api {put} /user/refresh refresh user status
     * @apiName refreshUser
     * @apiGroup User
     * @apiSuccess {Json} user model
     */
    router.get('/user/refresh', (req, res) => {

        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({
                message: 'Invalid Request : email and password must be in header !'
            });

        } else {
            core.checkUser(credentials.name, credentials.pass)

            .then(result => core.refreshUserState(result.message))

            .then(result => {

                    res.status(result.status).json(result.message)

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });
}
