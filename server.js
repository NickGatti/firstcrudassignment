const express = require( 'express' );
const app = express();
const fs = require( 'fs' )
const port = process.env.PORT || 8000;


app.post( '/create/:name/:email/:state', function ( req, res ) {
    if ( req.params.name && req.params.email && req.params.state ) {
        let output = fs.readFileSync( './storage.json', 'utf-8' )
        output = JSON.parse( output )
        output.push( {
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

app.get( '/user/:name', function ( req, res ) {

} )

app.post( '/user/:name', function ( req, res ) {

} )

app.post( '/user/:name', function ( req, res ) {

} )

app.use( function ( req, res ) {
    res.sendStatus( 404 )
} )

app.listen( port, function () {
    console.log( 'Listening on port', port );
} );