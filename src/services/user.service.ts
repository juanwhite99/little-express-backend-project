import { User, PGUser } from '../models/user';
import { sequelize } from '../instances/sequelize';
const { Op } = require('sequelize');

export class UserService {
    static findAllUsers(): Promise<User[]> {
        return new Promise((resolve: any, reject: any) => {
            resolve(PGUser.findAll());
        });
    }

    static findOneUser(idParameter: string): Promise<User> {
        return new Promise((resolve: any, reject: any) => {
            resolve(PGUser.findOne({
                where: { id: idParameter }
            }));
        });
    }

    static findAutoSuggestUsers(loginSubstring: string, limitParam: string): Promise<User[]> {
        return new Promise((resolve: any, reject: any) => {
            resolve(
                PGUser.findAll({
                    where: { login: { [Op.like]: '%' + loginSubstring + '%' } },
                    limit: limitParam,
                    order: [
                        ['login', 'ASC']
                    ]
                })
            );
        });
    }

    static updateUser(userParam: User): Promise<void> {
        const promise = new Promise<void>((resolve: Function, reject: Function) => {
            sequelize.transaction(() => {
                return PGUser.update(userParam, { where: { id: userParam.id } });
            });
        });
        return promise;
    }
}
