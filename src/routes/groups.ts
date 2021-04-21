import express, { Request, Response } from 'express';
import { Group, PGGroup } from '../models/group';
import { GroupService } from '../services/group.service';
import { PGUserGroup, UserGroup } from '../models/usergroup';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const groupObjects = await GroupService.findAllGroups();
        res.status(200).type('json').send(JSON.stringify(groupObjects, null, 2));
    } catch (err) {
        res.status(400).send('Bad Request' + err).end();
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    try {
        const groupObject = await GroupService.findOneGroup(req.params.id);
        if (groupObject !== null) {
            res.status(200).type('json').send(JSON.stringify(groupObject, null, 2));
        } else {
            res.status(404).send('Group not Found').end();
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Bad Request: ' + err.toString()).end();
    }
});

router.post('/', (req: Request, res: Response) => {
    const uuidv1 = require('uuid/v1');
    const newGroup: Group = {
        id: uuidv1(),
        name: req.body.name,
        permissions: req.body.permissions
    };

    try {
        const newGroupResult = PGGroup.build(newGroup);
        newGroupResult.save();
        res.status(200).send('Group created successfully');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', (req: Request, res: Response) => {
    try {
        PGGroup.findOne({
            where: { id: req.params.id }
        })
            .then((groupObject: any) => {
                if (groupObject.length !== 0) {
                    groupObject.name = req.body.name;
                    groupObject.permissions = req.body.permissions;
                    groupObject.save();
                    res.status(200).send('Group saved successfully').end();
                } else {
                    res.status(404).send('Group not Found').end();
                }
            }).catch((err: any) => {
                console.log(err);
                res.status(400).send('Bad Request').end();
            });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    try {
        PGGroup.destroy({ where: { id: req.params.id } });
        res.status(200).send('The group has been deleted successfully').end();
    } catch (err) {
        console.log(err);
        res.status(400).send('Bad Request').end();
    }
});


router.post('/:id/users', (req: Request, res: Response) => {
    if (req.body.users.length > 0) {
        req.body.users.forEach((x: any) => {
            try {
                const newUserGroup: UserGroup = {
                    idUser: x,
                    idGroup: req.params.id
                };
                const newUserGroupResult = PGUserGroup.build(newUserGroup);
                newUserGroupResult.save();
                console.log(newUserGroup);
            } catch (err) {
                console.log(err);
            }
        });
        res.status(200).send('User-Group record created successfully');
    } else {
        res.status(200).send('No users were added to the group');
    }
});

module.exports = router;
