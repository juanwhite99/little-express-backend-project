import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type Group = {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

export const PGGroup = sequelize.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    permissions: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
});

PGGroup.sync();
