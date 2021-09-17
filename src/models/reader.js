module.exports = (connection, DataTypes) => {
    const schema = {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: true,
            initial: 0}
           
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: true,
            initial: 0,
            isEmail: true,
           
        }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: true,
            initial: 0,
            len: 8
            }
        }
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
}