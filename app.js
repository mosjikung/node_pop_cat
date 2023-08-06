const express = require('express')
const cors = require('cors');
const app = express()
const { Client } = require('pg');

app.use(cors());
app.use(express.json());
const connectionConfig = {
              user: 'postgres',
              host: 'ncr_postgre',
              database: 'popcat',
              password: '12345',
              port: 5432, // Default PostgreSQL port is 5432
            };

const client = new Client(connectionConfig);

// Connect to the PostgreSQL database
client.connect()
.then(() => {
              console.log('Connected to the PostgreSQL database!');
})
.catch((err) => {
              console.error('Error connecting to PostgreSQL database:', err);
});


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/pop_count', async (req, res) => {
              try {
                            // Execute the SQL query to get all users
                            const query = 'SELECT * FROM score where id = 1';
                            const result = await client.query(query);
                        
                            // The result.rows property contains the retrieved data
                            const item = result.rows;
                        
                            // Send the retrieved users as JSON response
                            res.json(item);
                          } catch (err) {
                            console.error('Error handling the request:', err);
                            res.status(500).json({ error: 'Internal server error' });
                          }
                        });



app.post('/pop',  (req, res) => {

              const  {score}  = req.body;
              console.log(score)
              if (!score) {
              return res.status(400).json({ error: 'The "score" field is required.' });
              }

              
              const recordId = 1;

              
              const query = 'UPDATE score SET score = $1 WHERE id = $2';
              
              const values = [score, recordId];
              console.log(values)
              const result = client.query(query, values);
              console.log(result)
              
              if (result.rowCount > 0 ) {
              return res.json({ message: 'Score updated successfully.' });
              } else {
              return res.json({ message: 'Score updated successfully.' });
              }

});





app.listen(3000, () => {
  console.log('Start server at port 3000.')
})