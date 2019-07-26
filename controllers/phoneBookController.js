import {User, Contact} from '../models';
import bcrypt from "bcrypt";
import {jwtAuthenticate} from "../auth";
import QueryHelper from "../helpers/queryHelper";
import fs from "fs";
import csv from "fast-csv";

export function login(req, res) {
  jwtAuthenticate({
    username: req.body.username,
    password: req.body.password,
    usersTable: 'users',
    usernameField: "username",
    passwordField: 'password',
  },res);
}

export function signup(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log(req.body.password);
    User.create({username: req.body.username, password: hash}).then(user => res.status(200).json({
      type: 'success',
      message: 'Signed up!',
      data: user
    }));
  });
}

/**
 *
 * @param req
 * @param res
 * @constructor
 */
export function createOrUpdateContact(req, res) {
  const body = req.body;
  new QueryHelper(Contact).createOrUpdate(body, res);
}

/**
 * req.body: {where}
 * @param req
 * @param res
 */
export function readConditionalContacts(req, res) {
  const body = req.body;
  new QueryHelper(Contact).find(body, res,null).conditional();
}

/**
 * req.body: Doctor
 * @param req
 * @param res
 */
export function readOneUser(req, res) {
  const body = req.body;
  const relations = [
    { model: Contact}
  ];
  new QueryHelper(User).find(body, res,relations).one();
}


/**
 * req.body: {where}
 * @param req
 * @param res
 */
export function deleteConditionalContacts(req, res) {
  const condition = req.body.where;
  new QueryHelper(Contact).delete(condition, res);
}


/**
 * @param req
 * @param res
 */
export function csvCreateContacts(req, res) {
  // open uploaded file
  const queryHelper = new QueryHelper(Contact);

  csv.fromPath(req.file.path)
    .on("data", function (data) {
      queryHelper.createWithoutResponse({phone_number:data[0],name:data[1]}, res);
    })
    .on("end", function () {

      fs.unlinkSync(req.file.path);   // remove temp file
      res.status(200).json({
        type: 'success',
        message: 'createdAll!',
        data: null
      });
    })
}
