import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize_conexion from '../../Config/conection_database';
class Templates extends Model{}

Templates.init(
    {
        id:{
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
        },
        full_url:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        event_type:{
            type: DataTypes.INTEGER,
            references: {
                model: 'EventType',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        template_type: {
            type: DataTypes.ENUM('FREE', 'PREMIUM', 'ELITE'),
            allowNull: false, 
            defaultValue: 'FREE', 
          },
    },
    {
        sequelize: sequelize_conexion,
        modelName: 'Event', 
        timestamps: false,  
        tableName: 'Events',
      }
);