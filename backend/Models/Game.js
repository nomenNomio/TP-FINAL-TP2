import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Game extends Model {}

Game.init(
  {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    developer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    launchDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    editor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    franchising: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    principalImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    images: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: []
    },
    gamePlay: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    requirements: {
        type: DataTypes.JSON,
        allowNull: true
      },
    languages: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('languages').split(';')
        },
        set(val) {
           this.setDataValue('languages',val.join(';'));
        },
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('tags').split(';')
        },
        set(val) {
           this.setDataValue('tags',val.join(';'));
        },
    },
  },
  {
    sequelize: connection,
    modelName: "Game",
    hooks: {
        beforeValidate: (instance, options) => {
          if (instance.images) {
            const isValid = instance.images.every(image => {
              return typeof image.alt === 'string' && typeof image.url === 'string';
            });
            if (!isValid) {
              throw new Error('Validation error: Las imagenes deben ser objetos con propiedades "alt" and "url" como strings.');
            }
          }
        }
      }
  }
);

export default Game;