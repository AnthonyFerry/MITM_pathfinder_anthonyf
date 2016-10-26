<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Pathfinder (test de développement)</title>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<header id="site-header" class="site-header">
			<div class="center">
				<h1>Pathfinder (test de développement)</h1>
			</div>
		</header>
		
		<div id="site-content">
			<div class="center">
				<section id="app">
					<canvas id="canvas" width="502" height="502">
						Votre navigateur ne support pas la balise canvas. Désolé...
					</canvas>
					<div id="settings">
						<fieldset>
							<legend>Propriétés de la chambre</legend>
							<label for="room-width">Largeur</label><br>
							<input type="range" value="10" min="2" max="15" id="width" name="room-width"><br>

							<label for="room-height">Hauteur</label><br>
							<input type="range" value="10" min="2" max="15" id="height" name="room-height"><br>

							<label for="room-color">Couleur</label>
							<input type="color" id="color" value="#FFA864" accesskey="c">
						</fieldset>
						<fieldset>
							<legend>Sélection d'objet</legend>
							<input type="radio" name="object" id="object" value="Room" checked> Chambre<br>
							<input type="radio" name="object" id="object" value="Door"> Porte<br>
							<input type="radio" name="object" id="object" value="FlagStart"> Départ<br>
							<input type="radio" name="object" id="object" value="FlagEnd"> Arrivée
						</fieldset>
						<br>
						<input type="button" name="clear" id="clear" value="Effacer"><br>
						<br>
						<input type="button" name="go" id="go" value="Chercher le chemin"><br>
					</div>
				</section>
			</div>
		</div>

		<footer id="site-footer">
			<div class="center">
				<p>Cette application est réalisée en JavaScript</p>
			</div>
		</footer>
		<?php include('js/index.php'); ?>
	</body>
</html>