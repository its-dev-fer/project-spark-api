import { Sequelize, DataTypes, Model } from "sequelize";
import DatabaseConnection from "../../config/DatabaseConnection";
class Templates extends Model {}

Templates.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        event_type: {
            type: DataTypes.INTEGER,
            references: {
                model: "EventType",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        template_type: {
            type: DataTypes.ENUM("FREE", "PREMIUM", "ELITE"),
            allowNull: false,
            defaultValue: "FREE"
        }
    },
    {
        sequelize: DatabaseConnection,
        modelName: "Event",
        timestamps: false,
        tableName: "Events"
    }
);
