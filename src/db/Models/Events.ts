import { DataTypes, Model } from "sequelize";
import DatabaseConnection from "../../Config/DatabaseConnection";

class Events extends Model {}

Events.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "EventType",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        template_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: DatabaseConnection,
        modelName: "Event",
        tableName: "Events",
        timestamps: false
    }
);

export default Events;
