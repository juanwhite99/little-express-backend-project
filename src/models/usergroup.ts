import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';
import { PGUser } from './user';
import { PGGroup } from './group';

export type UserGroup = {
    id?: number;
    idUser: string;
    idGroup: string;
};

export const PGUserGroup = sequelize.define('usergroup', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUser: {
        type: Sequelize.STRING,
        field: 'userId'
    },
    idGroup: {
        type: Sequelize.STRING,
        field: 'groupId'
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
});

PGGroup.belongsToMany(PGUser, { through: PGUserGroup });
PGUser.belongsToMany(PGGroup, { through: PGUserGroup });
