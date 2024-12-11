import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize_conexion from '../../Config/conection_database';
class EventType extends Model{}

EventType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize:sequelize_conexion,
        modelName: 'EventType',
        timestamps: false,
        tableName: 'EventType'
    }
);