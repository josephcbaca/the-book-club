module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define("Book", {
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        infoLink: {
            type: DataTypes.STRING,
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