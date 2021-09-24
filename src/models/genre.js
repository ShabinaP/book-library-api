module.exports = (sequelize, DataTypes) => {
    const schema = {
        genre: {
            allowNull: false,
            type: DataTypes.STRING,
            validation: {
                notNull: {
                    args: [true],
                    msg: 'Please enter a genre.'
                },
                notEmpty: {
                    args: [true],
                    msg: 'The genre field cannot be empty.'
                },
            },
        },
    };
    const GenreModel = connection.define('Genre', schema);
    return GenreModel
}