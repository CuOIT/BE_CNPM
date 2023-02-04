const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/Auth");
const User = require("../models/user");

const router = express.Router();

module.exports = (app) => {
  app.get('/login', authController.getLogin);

  app.get("/signup", authController.getSignup);

  app.post(
    "/login",
    authController.postLogin
    //   [
    //     // Look for specific field but in request body only (unlike check, which looks in all features of incoming request [header, cookie, param, etc.])
    //     body('email')
    //       .isEmail()
    //       .withMessage('Please enter a valid email.')
    //       // validator.js built-in sanitizer (trims whitespace on sides of email, converts email to lowercase)
    //       .normalizeEmail(),
    //     body('password', 'Password must be valid.').isLength({ min: 8, max: 100 }),
    //   ],
    //  authController.postLogin
  );

  app.post(
    "/signup",
    // Wrapping checks in array is not required but makes it clearer that this block is about validation
    [
      check("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        // Method found in validator.js docs. validator.js implicitly installed with express-validator
        .custom((value, { req }) => {
          // if (value === 'test1@test.com') {
          //   throw new Error('This email is forbidden');
          // }
          // return true;
          // Look for email field in documents in users collection (email: email)
          return User.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
              return Promise.reject("Email already in use.");
            }
          });
        }),
      //.normalizeEmail(),
      // Adding validation error message as second argument as alternative to using withMessage() after each validator since using message for both checks
      body(
        "password",
        "Please use a password between 8 and 100 characters."
      ).isLength({ min: 8, max: 100 }),
      body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true;
      }),
    ],
    authController.postSignup
  );

  app.post("/logout", authController.postLogout);

  app.get("/reset-password", authController.getResetPassword);

  app.post("/reset-password", authController.postResetPassword);

  // token: dynamic parameter. Has to be named token here because looking for token in request params in getNewPassword controller action
  app.get("/reset-password/:token", authController.getNewPassword);

  app.post("/new-password", authController.postNewPassword);
};
