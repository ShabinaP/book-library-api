module.exports = (connection, DataTypes) => {
    const schema = {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: false,
            }
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: false,
            }
        },
        genre: {
            type: DataTypes.STRING,
        },

        ISBN: {
            type: DataTypes.INTEGER,
            unique: true,
        },

    }
    const BookModel = connection.define('Book', schema)
    return BookModel
}