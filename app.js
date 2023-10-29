const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const User = require('./models/user');
const Chat = require('./models/chat');
const Group=require('./models/group');
const Usergroup=require('./models/usergroup');
const Usergroupchat=require('./models/usergroupchat')

require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: false }));
const userRoute = require('./routers/user');
const chatRoute = require('./routers/chat');
const groupsRouter = require('./routers/group');
const usergroupRouter=require('./routers/usergroup.js')
const usergroupchat=require('./routers/usersgroupchat')
app.use('/group', groupsRouter);
app.use('/user',userRoute);
app.use('/users', chatRoute);
app.use('/usergroup',usergroupRouter);
app.use('/groupuser',usergroupchat);

User.hasMany(Chat);
Chat.belongsTo(User);

User.belongsToMany(Group,{through:Usergroup});

sequelize
.sync()
//.sync({force: true})
.then(result=>{
   app.listen(3000);
})
.catch(err=>{
    console.log(err);
}); 


