module.exports = (connection, DataTypes) => {
    const schema = {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A name is required.'
                },
                notEmpty: {
                    msg: 'Please enter a name.'
                }
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isEmail: {
                msg: 'Please provide a valid email address.'
            },
            
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
    }

    const ReaderModel = connection.define('Reader', schema);
    
    return ReaderModel;
}