let express = require( "express" );
let cors = require( "cors" );
let http = require( "http" );
let bodyParser = require( "body-parser" );
let path = require( "path" );

const { Server } = require( 'socket.io' )

const port = 9000;

app = express();

const server = http.createServer( app ).listen( port, () => { } );

app.use( cors() );

app.use( express.static( path.join( __dirname, "client" ) ) );

app.use( bodyParser.json() );

app.post( "/server", ( req, res ) =>
{
    io.emit( "command", req.body );
    res.status( 201 ).json( { status: "reached" } );
} );

let io = new Server( server, {
    cors: {
        origin: "http://127.0.0.1:3000",
        // origin: "https://ce87-58-187-249-218.ap.ngrok.io",
        methods: [ "GET", "POST" ],
    }
} )

io.on( "connection", ( socket ) =>
{
    socket.on( "command", function ( data )
    {
        io.emit( "command", data );
    } );
} );