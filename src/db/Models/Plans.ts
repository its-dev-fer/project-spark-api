import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize_conexion from '../../Config/conection_database';
class Plan extends Model {}


Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true, 
      allowNull: false, 
    },
    max_events: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_invites: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    features: {
      type: DataTypes.JSONB, 
      allowNull: true, 
    },
    monthly_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, 
    },
    anual_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, 
    },
  },
  {
    sequelize:sequelize_conexion, 
    modelName: 'Plan', 
    timestamps: false,  
    tableName: 'Plans',
  }
);


