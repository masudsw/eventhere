const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

const port = process.env.PORT || 5000

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','https://eventmanagement-4454d.web.app'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token
  console.log(token)
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.user = decoded
    next()
  })
}

//  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@main.mq0mae1.mongodb.net/?retryWrites=true&w=majority&appName=Main`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tatfmly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const eventsCollection = client.db('EventHere').collection('events')
    // auth related api
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '365d',
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    })
    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })


    // --------------
    app.post('/events', async (req, res) => {
      const newEvent = req.body
      console.log('inside events', newEvent);
      if (!newEvent.title || !newEvent.eventType || !newEvent.location || !newEvent.date) {
        return res.status(400).send({ message: 'Please fill in all required fields.' })
      }
      try {
        const result = await eventsCollection.insertOne(newEvent)
        res.status(201).send({ success: true, eventId: result.insertedId })
      } catch (error) {
        console.error('Error creating event:', error)
        res.status(500).send({ success: false, message: 'Failed to create event' })
      }
    })

    // ------------------



    // Get all rooms from db
    app.get('/evetns', async (req, res) => {
      const category = req.query.category
      console.log(category)
      let query = {}
      if (category && category !== 'null') query = { category }
      const result = await eventsCollection.find(query).toArray()
      res.send(result)
    })

    // Get a single room data from db using _id
    app.get('/event/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await eventsCollection.findOne(query)
      res.send(result)
    })

    app.get('/totalevents', async (req, res) => {
      const { title, location } = req.query;
      let query = {};
  
      console.log('Query parameters received:', { title, location });
  
      try {
          if (title) query.title = { $regex: title, $options: 'i' };
          if (location) query.location = { $regex: location, $options: 'i' };
  
          const count = await eventsCollection.countDocuments(query);
          console.log('Total events found:', count);
  
          res.send({ count });
      } catch (error) {
          console.error('Error fetching total events:', error);
          res.status(500).send('Internal Server Error');
      }
  });
  
  

    app.get('/findmyevents', async (req, res) => {
      const title = req.query.title;
      const location=req.query.location;
      
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1; 
        console.log('search-title', title,'search-location',location, 'size', size, 'page', page);
      let query = {};
      try {

           const query = {
        ...(title && { title: { $regex: title, $options: 'i' } }), // Case-insensitive partial match for title
        ...(location && { location: { $regex: location, $options: 'i' } }) // Case-insensitive partial match for location
      };
        // if (search) {
        //   query = { service_name: { $regex: search, $options: 'i' } };
        // }

        // --------------
       

        console.log('query in searchtasks', query);

        const result = await eventsCollection
          .find(query)
          .skip(page * size)
          .limit(size)
          .toArray();

        console.log('result', result);
        res.send(result);
      } catch (error) {
        console.error('Error fetching all services:', error);
        res.status(500).send('Internal Server Error');
      }

    })

    

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from EventHere Server..')
})

app.listen(port, () => {
  console.log(`EventHere is running on port ${port}`)
})
