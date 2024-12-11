import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize_conexion from '../../Config/conection_database';
class Guest extends Model {}

Guest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    rsvp_status: {
      type: DataTypes.STRING(50),
      defaultValue: 'Pending',
    },
  },
  {
    sequelize: sequelize_conexion,
    modelName: 'Guest',
    tableName: 'Guests',
    timestamps: false,
  }
);
