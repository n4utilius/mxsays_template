/**
 * TweetQuote (tweetquote.co.uk)
 *
 * The MIT License
 * 
 * Copyright (c) 2009 Paul James Campbell (tweetquote.co.uk)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var tweetquote = function () {
	
	// Variables
	var config = {
		'refreshRate'			:  10000, 
		'phrase'					: 	false, 		
		'username'				: 	false, 
		'hashtag'				: 	false,
		'geocode'				: 	false, 
		'advancedquery'		: 	false,
		'includeauthor'		: 	true,
		'stripurls'				: 	true, 
		'stripTwitterTags'	: 	true,
		'classname'				:  false, 
		'lang'					: 	"es", // http://en.wikipedia.org/wiki/ISO_639-1
		'animationtype'		:  'fade', 
		'animationspeed'		:  'slow', 
		'defaulttext'			:  "Cargando lo que el pueblo dice"
	};
	
	var rootId = 'tweet_quote', wrapId = 'tweet_quote_wrapper', textId = "tweet_quote_text", authorId = 'tweet_quote_author', rootDom, quoteDom, intId, sinceId, handlerTextParser, handlerQuoteUpdate; 
	
	// Construct
	(function () {
		if( !window['jQuery'] ) {
			// Load jQuery from Google API
			document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"></script>');
		}		
	})();
	
	
	// Initiate
	function init () {
		try {
			if( config.phrase || config.username || config.hashtag || config.advancedquery ) {
				
				document.write('<div id="' + rootId + '"></div>');
				rootDom = $("#" + rootId);
				
				if( config.classname.constructor === String ) {
					rootDom.addClass( config.classname );
				}
				
				if( config.defaulttext.constructor === String ) {
					rootDom.html( '<div id="' + wrapId + '"><span id="' + textId + '">' + config.defaulttext + '</span></div>' );
				}
				
			}
		} catch ( e ) {
			logError( e );
			return;
		}		
		
		getTweet();
		initRefresh();
	}
	
	function initRefresh () {
		intId = setInterval( getTweet, config.refreshRate );
	}
	
	function stopRefresh () {
		clearInterval( intId );
	}
	
	function getTweet () {
		// http://apiwiki.twitter.com/Search+API+Documentation
		var api = 'http://search.twitter.com/search.json?rpp=1&callback=tweetquote.onApiCallback&lang=' + config.lang + "&"; // 140 character limit
		if( sinceId ) {
			api += 'since_id=' + sinceId + '&';
		}
		
		// Construct API call
		if( config.phrase ) {
			api += 'q=' + config.phrase;
		} else if ( config.username ) {
			api += 'q=from%3A' + config.username;
		} else if ( config.hashtag ) {
			api += 'q=%23' + config.hashtag;
		} else if ( config.advancedquery ) {
			api += 'q=' + config.advancedquery;
		}
		
		if( config.geocode ) {
			api += "&geocode=" + config.geocode;
		}
		
		try {
			rootDom.before('<script type="text/javascript" src="' + api + '"></script>');
		} catch ( e ) {
			logError ( e );
		}
	}
	
	function filterTweet ( json ) { 
		if( json.results && json.results.length > 0 ) {
			var tweet = json.results[0];
			
			sinceId = tweet.id;
			html = '<div id="' + wrapId + '">' + getTweetText( tweet ) + '</div>';
			
			if(rootDom.html() != html) {
				
				rootDom.html( html );
				wrapperNode = $('#' + wrapId);
				wrapperNode.hide();
				
				switch( config.animationtype ) {
					case 'fade' :
						wrapperNode.fadeIn( config.animationspeed );
						break;
					case 'slide' :
						wrapperNode.slideIn( config.animationspeed );
						break;
					default :
						// Nothing
						wrapperNode.show();
						break;
				}
				
				
				if( handlerQuoteUpdate ) {
					handlerQuoteUpdate( wrapperNode );
				}
			}
		}
	}
	
	function getTweetText ( tweet ) {
		var text = tweet.text;
		if ( config.stripurls ) {
			var pattern_url = /https?:\/\/([\-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?/ig;
			text = text.replace( pattern_url , '');
		}
		
		if( config.stripTwitterTags ) { // Still working on
			var pattern_tags = /RT|\'|\"|/ig;
			text = text.replace( pattern_tags , '');
		}
		
		//var html = '<h1><span id="' + textId + '">' + text + '</span></h1>';		
		var html = '<h3><span id="' + authorId + '">' + '<a href="http://www.twitter.com/' + tweet.from_user + '">' + tweet.from_user + '</a><h4>Dijo :</h4></span></h3>';
		html += '<h1><span id="' + textId + '">' + text + '</span></h1>';	
		html += '<h4>' + tweet.created_at + '</h4>'	
		
				
		if( handlerTextParser ) {
			return( handlerTextParser( html, tweet ) );
		}
		return( html.replace(/^\s+|\s+$/g, '') );
	}
	
	function logError ( e ) {
		// For clued up Firefox/Safari developers
		if(console && console.log) {
			console.log("TQ: " + e);
		}
	}
	
	return {
		
		load : function ( options ) {
			
			if( options.constructor === String) {
				// Assume basic string, add as phrase
				config.phrase = options;
			} else {
				$.extend(config, options);
			}
			
			init();
		},
		
		stop : function () {
			stopRefresh();
		},
		
		// Public method for Twitter search API (don't use)
		onApiCallback : function ( json ) {
			filterTweet( json );
		},
		
		// Custom callback handlers
		onTextParse : function ( func ) {
			handlerTextParser = func;
		},
		
		onQuoteUpdate : function ( func ) {
			handlerQuoteUpdate = func;
		}
		
	};
	
}();
window.tweetquote = tweetquote; // Ensure global scope
