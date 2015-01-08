'use strict';

var Requester = require( '../requesters/groups-requester' );

module.exports = [
	{
		'method' : 'POST',
		'path'   : '/groups',
		'config' : {
			'handler' : function ( request, reply ) {
				var baseUrl = request.server.info.uri;
				var path    = request.path;

				Requester.create.request( request.payload, function ( response, done ) {
					if ( response.status === 'success' ) {
						reply( { } ).created( baseUrl + path + '/' + response.id );
					} else {
						reply( response.data ).code( 500 );
					}
					done();
				} );
			}
		}
	},

	{
		'method' : 'GET',
		'path'   : '/groups',
		'config' : {
			'handler' : function ( request, reply ) {
				Requester.read.request( { }, function( response, done ) {
					if ( response.status === 'success' ) {
						reply( response.data );
					} else {
						reply( response.data ).code( 500 );
					}
					done();
				} );
			}
		}
	}
];
