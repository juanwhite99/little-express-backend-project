import { Group, PGGroup } from '../models/group';

export class GroupService {
    static findAllGroups(): Promise<Group[]> {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(PGGroup.findAll());
        });
    }

    static findOneGroup(idParameter: string): Promise<Group> {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(PGGroup.findOne({
                where: { id: idParameter }
            }));
        });
    }
}
