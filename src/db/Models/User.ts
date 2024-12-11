import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize_conexion from '../../Config/conection_database';
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    sequelize: sequelize_conexion, 
    modelName: 'User', 
    timestamps: false, 
    tableName: 'Users',
  }
);