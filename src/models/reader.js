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
                notNull: {
                    msg: 'An email address is required.'
                },
            isEmail: {
                msg: 'Please provide a valid email address.'
            },
            
        }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
                msg: 'Please enter a password.'
            },
            len: {
                args: [8,20],
                msg: 'The password must be between 8 and 20 characters long.'
            } 
            }
        },

        defaultScope: {
            attributes: {
                exclude: ['password']
            },
        },
    }

    const ReaderModel = connection.define('Reader', schema);
    
    return ReaderModel;
}