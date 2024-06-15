import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Editor extends Model {}

Editor.init(
  {
    editor: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlphanumeric: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Editor",
  }
);

export default Editor;