module.exports = (connection, DataTypes) => {
    const schema = {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: true,
            msg: "Please enter your name."
            }
           
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: true,
            msg: "This field cannot be empty.",
            isEmail: true,
           
        }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: true,
            initial: 0,
            msg: "Please enter a valid password.",
            len: 8
            }
        }
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
}