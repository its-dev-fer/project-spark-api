import { Sequelize, DataTypes, Model } from 'sequelize';
import DatabaseConnection from '../../Config/DatabaseConnection';
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
      type: DataTypes.ENUM('Pending','Accepted','Rejected'),
      defaultValue: 'Pending',
    },
  },
  {
    sequelize: DatabaseConnection,
    modelName: 'Guest',
    tableName: 'Guests',
    timestamps: false,
  }
);
