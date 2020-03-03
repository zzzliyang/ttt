const express = require('express');
const path = require('path');
const cors = require('cors');
const Pool = require('pg').Pool;
const types = require('pg').types;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbtest',
  password: 'superuser',
  port: 5432,
})


const TYPE_DATESTAMP = 1082;
types.setTypeParser(TYPE_DATESTAMP, date => date);

const app = express();
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/user-portal/build')));
app.use(express.static(path.join(__dirname, '/../client/admin-portal/build')));

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

app.get('/api/mlppnl', cors(), (req,res) => {
    const date = req.query.date
    // pool.query('SELECT * from mlp_pnl_eod WHERE report_date = $1', [date], (error, results) => {
    pool.query('SELECT * from ovam_position WHERE date = $1', [date], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows)
    })
});

app.get('/api/navikpnl', cors(), (req,res) => {
    const date = req.query.date
    pool.query('SELECT * from ovam_position WHERE date = $1', [date], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows)
    })
});

app.get('/api/pnl/alldate', cors(), (req,res) => {
  const date = req.query.date
  pool.query('SELECT distinct(date) from ovam_position', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows.filter(r => r.date !== null).map(r => r.date));
  })
});

app.get('/user', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/user-portal/build/index.html'));
});

app.get('/admin', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/admin-portal/build/index.html'));
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'../client/user-portal/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
