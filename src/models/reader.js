module.exports = (connection, DataTypes) => {
    const schema = {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isEmail: true,
           
        }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: {
                args: [8,100],
                msg: 'The password must be between 8 and 100 characters long'
            } 
            }
        }
    };

    const ReaderModel = connection.define('Reader', schema);
    
    return ReaderModel;
}