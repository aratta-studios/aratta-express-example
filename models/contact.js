'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    phone_number: DataTypes.STRING,
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};