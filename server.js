const express     = require('express'),
      app         = express(),
      mongoose    = require('mongoose'), 
      config      = require('config'),
      path =require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

app.use(express.json({extended:false}));

// DB Config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true,
                useFindAndModify: false

   })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
