'use strict';

if ( !module.parent ) {
	throw new Error( 'Do not run this file directly, instead run index.js' );
}

var Hapi   = require( 'hapi' );
var Rabbit = require( 'wascally' );
var config = require( 'config' );
var routes = require( 'routes' );

var env = process.NODE_ENV || 'development';

var server = new Hapi.Server();
server.connection( {
	'port' : config[ env ].api.port
} );

Rabbit.configure( {
	'connection' : config[ env ].rabbitmq
} )
.then( function addRoutes () {
	// Add all the routes within the routes folder
	for ( var route in routes ) {
		server.route( routes[ route ] );
	}
} ).then( null, function handleError ( err ) {
	setImmediate( function throwError () {
		throw err;
	} );
} );

var start = function start ( done ) {
	server.start( function onServerStarted () {
		console.log( 'Server running at:', server.info.uri );

		if ( typeof done === 'function' ) {
			done();
		}
	} );
};

module.exports.start = start;
