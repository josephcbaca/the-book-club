module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define("Book", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    Book.associate = function(models) {
        Book.belongsTo(models.Reader, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Book;
}