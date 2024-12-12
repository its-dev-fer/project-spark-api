import { Sequelize, DataTypes, Model } from 'sequelize';
import DatabaseConnection from '../../Config/DatabaseConnection';
import { IUser } from '../../Types/models';

class User extends Model implements IUser {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public plan_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}
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
    sequelize: DatabaseConnection, 
    modelName: 'User', 
    timestamps: false, 
    tableName: 'Users',
  }
);

export default User;