module.exports = (connection, DataTypes) => {
    const schema = {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: false,
                initial: 0
            }
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: false,
                initial: 0
            }
        },
        genre: {
            type: DataTypes.STRING,
        },

        ISBN: {
            type: DataTypes.STRING,
            unique: true,
            isNumeric: true
        },

    }
    const BookModel = connection.define('Book', schema)
    return BookModel
}