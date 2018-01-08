const express = require( 'express' );
const app = express();
const fs = require( 'fs' )
const port = process.env.PORT || 8000;


app.post( '/create/:name/:email/:state', function ( req, res ) {
    if ( req.params.name && req.params.email && req.params.state ) {
        let output = fs.readFileSync( './storage.json', 'utf-8' )
        output = JSON.parse( output )
        output.push( {
            id: output.length,
            name: req.params.name,
            email: req.params.email,
            state: req.params.state
        } )
        fs.writeFileSync( 'storage.json', JSON.stringify( output ) )
        res.sendStatus( 200 )
    }
} )

app.get( '/users', function ( req, res ) {
    res.setHeader( 'Content-Type', 'text/json' );
    res.send( fs.readFileSync( './storage.json', 'utf-8' ) )
} )

app.get( '/user/:id', function ( req, res ) {
    if ( req.params.id ) {
        let output = fs.readFileSync( './storage.json', 'utf-8' )
        output = JSON.parse( output )
        for ( let i = 0; i < output.length; i++ ) {
            if ( output[ i ].id === req.params.id ) {
                res.setHeader( 'Content-Type', 'text/json' );
                res.send( output[ i ] )
                return;
            }
        }
    } else {
        res.sendStatus( 404 )
    }
} )

app.post( '/user/edit/:id/:name/:email/:state', function ( req, res ) {
    if ( req.params.id && req.params.name && req.params.email && req.params.state ) {
        let output = fs.readFileSync( './storage.json', 'utf-8' )
        output = JSON.parse( output )
        for ( let i = 0; i < output.length; i++ ) {
            if ( output[ i ].id == req.params.id ) {
                output[ i ].name = req.params.name
                output[ i ].email = req.params.email
                output[ i ].state = req.params.state
                fs.writeFileSync( 'storage.json', JSON.stringify( output ) )
                res.sendStatus( 200 )
                return;
            }
        }
    }
} )

app.post( '/user/delete/:id', function ( req, res ) {
    let output = fs.readFileSync( './storage.json', 'utf-8' )
    output = JSON.parse( output )
    for ( let i = 0; i < output.length; i++ ) {
        if ( output[ i ].id === req.params.id ) {
            output.splice( i, 1 )
            fs.writeFileSync( 'storage.json', JSON.stringify( output ) )
            res.sendStatus( 200 )
            return;
        }
    }
} )

app.use( function ( req, res ) {
    res.sendStatus( 404 )
} )

app.listen( port, function () {
    console.log( 'Listening on port', port );
} );