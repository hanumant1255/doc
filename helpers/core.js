'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.checkUser = (email, password) =>

    new Promise((resolve, reject) => {

        user.find({
            email: email
        })

        .then(users => {

            if (users.length == 0) {

                reject({
                    status: 404,
                    message: 'User Not Found !'
                });

            } else {

                return users[0];

            }
        })

        .then(user => {



            const hashed_password = user.hashed_password;

            if (bcrypt.compareSync(password, hashed_password)) {

                resolve({
                    status: 200,
                    message: user
                });

            } else {

                reject({
                    status: 401,
                    message: 'Invalid Credentials !'
                });
            }
        })

        .catch(err => reject({
            status: 500,
            message: 'Internal Server Error !'
        }));

    });

exports.registerUser = (name, email, password) =>

    new Promise((resolve, reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new user({

            name: name,
            email: email,
            hashed_password: hash,
            created_at: new Date()
        });

        newUser.save()

        .then(user => resolve({
            status: 201,
            message: user
        }))

        .catch(err => {

            if (err.code == 11000) {

                reject({
                    status: 409,
                    message: 'User Already Registered !'
                });

            } else {

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
    });

exports.saveUserState = (cardHolder, cardValue, userFound) =>

    new Promise((resolve, reject) => {

        if (user.staticcardHolder.indexOf(cardHolder) == -1) {

            reject({
                status: 400,
                message: 'Invalid card holder sent !'
            });

        } else if (cardHolder !== cardValue.split("_")[0]) {

            reject({
                status: 400,
                message: 'Invalid color card sent in  holder  !'
            });
        } else if (user.staticCards.indexOf(cardValue.split("_")[1]) == -1) {

            reject({
                status: 400,
                message: 'Invalid card sent !'
            });
        } else if (userFound['no_of_cards'] == 52) {

            reject({
                status: 405,
                message: 'Game has been finished....refresh to start new !'
            });

        } else if (userFound["cards"][cardHolder][cardValue] == true) {

            reject({
                status: 405,
                message: 'Card already present !'
            });
        } else {

            userFound["cards"][cardHolder][cardValue] = true;
            userFound['no_of_cards']++;

            user.findOneAndUpdate({
                email: userFound.email
            }, userFound, {
                new: true
            })

            .then(updatedUser => {
                    resolve({
                        status: 201,
                        message: updatedUser
                    });
                })
                .catch(err => reject({
                    status: 500,
                    message: 'Internal Server Error !'
                }));
        }
    });


exports.refreshUserState = userFound =>

    new Promise((resolve, reject) => {

        let userUpdate = new user({});

        userFound.cards = userUpdate.cards;
        userFound.no_of_cards = userUpdate.no_of_cards;

        user.findOneAndUpdate({
            email: userFound.email
        }, userFound, {
            new: true
        })

        .then(updatedUser => {
                resolve({
                    status: 201,
                    message: updatedUser
                });
            })
            .catch(err => reject({
                status: 500,
                message: 'Internal Server Error !'
            }));
    });
