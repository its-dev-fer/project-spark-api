import { Sequelize, DataTypes, Model } from "sequelize";
import DatabaseConnection from "../../config/DatabaseConnection";
class Plan extends Model {}

Plan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        max_events: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        max_invites: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        features: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        monthly_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        annual_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize: DatabaseConnection,
        modelName: "Plan",
        timestamps: false,
        tableName: "Plans"
    }
);
