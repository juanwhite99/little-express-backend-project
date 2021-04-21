import express, { Application, Request, Response } from 'express';
import { PGUserGroup, UserGroup } from './models/usergroup';
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

PGUserGroup.sync();

app.get('/', async (req: Request, res: Response) => {
    res.status(200).send('It works');
});

app.listen(3000, () => console.log('Server Running'));
