import multer from "multer";
import {
  createOrUpdateContact, csvCreateContacts, deleteConditionalContacts,
  login,
  readConditionalContacts,
  readOneUser,
  signup
} from "../controllers/phoneBookController";
import {isJwtAuthenticated} from "../auth";

const upload = multer({ dest: 'tmp/csv/' });

module.exports = function(app){

  app.post('/login', login);
  app.post('/signup', signup);
  app.post('/create-or-update-contact',isJwtAuthenticated, createOrUpdateContact);
  app.post('/read-conditional-contacts',isJwtAuthenticated, readConditionalContacts);
  app.post('/read-one-user',isJwtAuthenticated, readOneUser);
  app.post('/delete-conditional-contacts',isJwtAuthenticated, deleteConditionalContacts);
  app.post('/csv-create-contacts',isJwtAuthenticated,upload.single('file'),csvCreateContacts);
  //other routes..
};
