import { Sequelize, DataTypes, Model } from "sequelize";
import DatabaseConnection from "../../config/DatabaseConnection";
class EventType extends Model {}

EventType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize: DatabaseConnection,
        modelName: "EventType",
        timestamps: true,
        tableName: "EventType"
    }
);
