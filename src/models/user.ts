import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

export const PGUser = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    },
    isdeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isdeleted',
        defaultValue: false
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
});

PGUser.sync();
