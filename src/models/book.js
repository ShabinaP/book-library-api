module.exports = (connection, DataTypes) => {
    const schema = {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
                msg: 'A title is required.'
            },
            notEmpty: {
                msg: 'Please enter the title of the book.'
            }
            }
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
                msg: 'An author is required.'
                },
            notEmpty: {
                msg: 'Please enter the author of the book.'
                }
            }
        },
        genre: {
            type: DataTypes.STRING,
        },

        ISBN: {
            type: DataTypes.INTEGER,
            
        },

    }
    const BookModel = connection.define('Book', schema)
 
    return BookModel
}