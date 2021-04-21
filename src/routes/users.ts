import express, { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { userSchemaValidator } from '../services/userSchemaValidator';
import { User, PGUser } from '../models/user';
const router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response) => {
    try {
        const userObjects = await UserService.findAllUsers();
        res.status(200).type('json').send(JSON.stringify(userObjects));
    } catch (err) {
        res.status(400).send('Bad Request' + err).end();
    }
});

/* GET user by ID. */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userObject = await UserService.findOneUser(req.params.id);
        if (userObject !== null) {
            res.status(200).type('json').send(JSON.stringify(userObject));
        } else {
            res.status(404).send('User not Found').end();
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Bad Request: ' + err.toString()).end();
    }
});

/* POST create a new User. */
router.post('/', (req: Request, res: Response) => {
    const uuidv1 = require('uuid/v1');
    const newUser: User = {
        id: uuidv1(),
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
    };
    const { error, value } = userSchemaValidator.validate(newUser);
    if (error === undefined) {
        const newUserResult = PGUser.build(newUser);
        newUserResult.save();
        res.status(200).type('json').send(JSON.stringify(value));
    } else {
        res.status(400).send(error);
    }
});

/* PUT create a new User. */
router.put('/:id', (req: Request, res: Response) => {
    const reqUserObject: User = {
        id: req.params.id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    const { error } = userSchemaValidator.validate(reqUserObject);
    if (error === undefined) {
        PGUser.findOne({
            where: { id: req.params.id }
        })
            .then((userObject: any) => {
                if (userObject.length !== 0) {
                    userObject.age = req.body.age;
                    userObject.login = req.body.login;
                    userObject.password = req.body.password;
                    userObject.save();
                    res.status(200).send('User saved successfully').end();
                } else {
                    res.status(404).send('User not Found').end();
                }
            }).catch((err: Error) => {
                res.status(400).send('Bad Request' + err).end();
            });
    } else {
        res.status(400).send(error);
    }
});

router.put('/delete/:id', (req: Request, res: Response) => {
    PGUser.findOne({
        where: { id: req.params.id }
    })
        .then((userObject: any) => {
            if (userObject.length !== 0) {
                userObject.isdeleted = true;
                userObject.save();
                res.status(200).send('The user has been soft-deleted successfully').end();
            } else {
                res.status(404).send('User not Found').end();
            }
        }).catch((err: any) => {
            console.log(err);
            res.status(400).send('Bad Request').end();
        });
});


// get auto-suggest list from limit users,
// sorted by login property and filtered by loginSubstring in the login property
router.get('/getAutoSuggestUsers/:loginSubstring/:limit', async (req: Request, res: Response) => {
    if (isNaN(Number(req.params.limit))) {
        res.status(400).send('Bad Request: Limit must be a number').end();
    } else {
        try {
            const userObjects = await UserService.findAutoSuggestUsers(req.params.loginSubstring, req.params.limit);
            res.status(200).type('json').send(JSON.stringify(userObjects));
        } catch (err) {
            console.log(err);
            res.status(400).send('Bad Request: ' + err).end();
        }
    }
});


module.exports = router;
