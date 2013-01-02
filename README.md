nodejs-bitminter
================

Bitminter API wrapper for Node.js


Installation
------------

	git clone https://github.com/fvdm/nodejs-bitminter
	npm install ./nodejs-bitminter
	

Example
-------

If you want to call **users** methods, you need to set the `apikey`.

	```js
	var bitminter = require('bitminter')
	bitminter.apikey = 'abc123xyz'
	
	bitminter.get( 'users/MyName', function( err, user ) {
		console.log( err || user.hash_rate )
	})
	```


Method: get()
-------------
### ( path, [props], callback )

API docs: <https://bitminter.com/api>

This method takes three parameters:

	path        required    The API method to call, without '/api/' part.
	props       optional    Object with GET arguments for method.
	callback    required    Function to receive data and errors.


Callback function
-----------------

The callback receives two parameters: `err` and `data`. In case of an error the first parameter is an `Error` instance, otherwise `err` is null and `data` is an object.

	```js
	function( err, data ) {
		if( err instance of Error ) {
			console.log( err )
			// err.stack
			// err.message    // same as console.log( err )
			// err.details    // only set when details are available
		} else {
			// all good
			console.log( data )
		}
	}
	```


#### Errors

	Error: disconnected        The connection was closed too early.
	Error: invalid response    The API returned invalid data.
	Error: request failed      Can't make request, see `err.details`.


Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
