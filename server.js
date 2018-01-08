const express = require( 'express' );
const app = express();
const fs = require( 'fs' )
const port = process.env.PORT || 8000;


app.create( '/create/:name/:email/:state', function ( req, res ) {

} )

app.get( '/users', function ( req, res ) {

} )

app.get( '/user/:name', function ( req, res ) {

} )

app.update( '/user/:name', function ( req, res ) {

} )

app.delete( '/user/:name', function ( req, res ) {

} )

app.use( function ( req, res ) {
    res.sendStatus( 404 )
} )

app.listen( port, function () {
    console.log( 'Listening on port', port );
} );