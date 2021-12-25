const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})

client.connect();

app.get('/allmovies', (req, res)=>{
    client.query('Select * from movies', (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/movies/:title', (req, res)=>{
    client.query(`Select * from movies where title=${req.params.movies}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/add-movies', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into movies(movies, year, genre, rating, one_line, stars, votes, runtime, gross) 
                       values(${user.movies}, '${user.year}', '${user.genre}', '${user.rating}', '${user.one_line}', '${user.stars}', '${user.votes}', '${user.runtime}', '${user.gross}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/update-movies/:movies', (req, res)=> {
    let user = req.body;
    let updateQuery = `update movies
                       set year = '${user.year}',
                       genre = '${user.genre}'
                       rating = '${user.rating}'
                       one_line = '${user.one_line}'
                       stars = '${user.stars}'
                       votes = '${user.votes}'
                       runtime = '${user.runtime}'
                       gross = '${user.gross}'
                       where movies = ${user.movies}` 

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/delete-movies/:movies', (req, res)=> {
    let insertQuery = `delete from movies where movies=${req.params.movies}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})