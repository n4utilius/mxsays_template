<!DOCTYPE HTML>
<html lang="es-ES">
	<head>
		<meta charset="UTF-8">
		<!--link href='http://fonts.googleapis.com/css?family=Glegoo|Magra|Josefin+Slab:700italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'-->
		<link href="css/styles.css" rel="stylesheet">
		<link href="css/bootstrap.css" rel="stylesheet">

		<title>México dice</title>

		<!--Facebook Share Script-->
			<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/es_LA/all.js#xfbml=1&appId=122501004554118";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));</script>

		<!--Script tweets-->
			<script src="js/tweetquote.js" type="text/javascript" ></script>
	</head>

	<body>
		<div class="well" id="header">
			<h1 id="banner">
				México dice
				<!--div id="coletilla"></div-->
			</h1>
			<p id="cite">¿Qué se habla de los candidatos en la red social del pájaro azul?</p>
			<div id="social">
				<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://mexico-says.herokuapp.com/mexicosays/" data-via="lvcios" data-lang="es" data-count="none">Twittear</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

				<div class="fb-like" data-href="http://mexico-says.herokuapp.com/mexicosays/" data-send="true" data-layout="button_count" data-width="0" data-show-faces="false"></div>
				<g:plusone href="http://mexico-says.herokuapp.com/mexicosays/"></g:plusone>
			</div>
		</div>

		<div class="well" id="content">
			<script type="text/javascript">
				tweetquote.load("AMLO OR EPN OR JVM OR QUADRI OR MARCHAANTIEPN OR 132 OR YOSOY132 OR DEBATE2012 OR PEJE OR PEÑA NIETO OR CHEPINA -RT -filter:links");
			</script>
		</div>

		<!--
			<div class="well" id="about">
				Los neutrales, los priistas, los izquierdistas, los obraduristas, los panistas, los valemadristas, los cultos,
				los ignorantes, los intolerantes, los abiertos, los apartidistas, etc... Las opiniones de todos ellos estan aquí
			</div>
		-->

		<div class="well" id="footer">
			<p id="info">
				Hecho por Lucio Flores usando 
				<a href="https://www.djangoproject.com/">Django</a>, 
				<a href="http://twitter.github.com/bootstrap/">Bootstrap</a> y
				<a href="http://www.tweetquote.co.uk/">TweetQuote</a>
			</p>
			<p id="contacto">
				Contacto: 
				<a href="https://twitter.com/Lvcios">@Lvcios</a> |
				<a href="mailito:lvcios@hotmail.com"> lvcios@hotmail.com </a> | 
				<a href="http://lvcios.blogspot.mx/2012/06/mexico-dice-tras-bambalinas.html"> lvcios.blogspot.mx</a>
			</p>
		</div>

		<!-- Javascript Libreries -->
			<script src="js/jquery-1.7.2.min.js"></script>
		<!--GooglePlus Share Script -->
			<script type="text/javascript">
			  window.___gcfg = {lang: 'es-419'};

			  (function() {
			    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			    po.src = 'https://apis.google.com/js/plusone.js';
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			  })();
			</script>
	</body>
</html>