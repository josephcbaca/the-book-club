// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    let Reader = sequelize.define("Reader", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our Reader model. This will check if an unhashed password entered by the Reader can be compared to the hashed password stored in our database
    Reader.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the Reader Model lifecycle
    // In this case, before a Reader is created, we will automatically hash their password
    Reader.addHook("beforeCreate", function (reader) {
        reader.password = bcrypt.hashSync(reader.password, bcrypt.genSaltSync(10), null);
    });

    return Reader;
};
