//pathfinder\js\events.js 

/**
 * Evénement appelé lorsque la valeur de la slidebar "width" est changée.
 */
form.event('#width', 'change', function(){
	//On attribu la largeur de l'input à la largeur de l'objet
	room[0].setWidth(
		form.getValue('#width') * GRID_SIZE
	);
});

/**
 * Evénement appelé lorsque la valeur de la slidebar "height" est changée.
 */
form.event('#height', 'change', function(){
	//On attribut la hauteur de l'input à la hauteur de l'objet
	room[0].setHeight(
		form.getValue('#height') * GRID_SIZE
	);
});

/**
 * Evénement appelé lorsque la valeur de l'input "color" est changée.
 */
form.event('#color', 'change', function(){
	//On attribut la couleur de l'input à la couleur de l'objet
	room[0].setColor(
		form.getValue('#color')
	);
});

/**
 * Evénement appelé lorsque le bouton "clear" est cliqué.
 */ 
form.event('#clear', 'click', function(){

	// Réinitialisation des variables
	gameObjects.splice(0, gameObjects.length);
	room.splice(1, room.length);
	door.splice(1, door.length);
	pA.unset();
	pB.unset();
	Path.splice(0, Path.length);
	OpenList.splice(0, OpenList.length);
	CloseList.splice(0, CloseList.length);
});

/**
 * Evénement appelé lorsque l'utilisateur clique dans le canvas.
 */
form.event('#canvas', 'click', function(){

	//On vérifie ici quel radio button est coché.
	switch(form.radioValue('object')){

		//Dans le cas où le radio button coché est Room.
		case "Room":

			//On vérifie si la room que l'on souhaite dispositionner est au-dessus d'une room existante.
			for(var i = 1; i <= room.length; i++){
				if(room[0].collide(room[i])){

					//Si c'est le cas, on retourne une erreur à l'utilisateur.
					throw "Vous ne pouvez pas superposer vos pièces !";
					break;
				}
			}

			// Si la boucle n'est pas quittée, on créer une variable qui va recueillir la valeur de la room "fantôme".
			var newRoom = new Room(
				room[0].x(),
				room[0].y(),
				room[0].width(),
				room[0].height(),
				room[0].color()
			);

			//On insère la room fraichement créée dans le tableau room.
			room.push(newRoom);

			//Et dans le tableau d'objet général.
			gameObjects.push(newRoom);

			//On vide l'objet de la mémoire.
			newRoom = {};

			//On quitte la boucle.
			break;
	
		//Dans le cas où le radio button coché est Door.
		case "Door":

			//On vérifie si la door que l'on souhaite dispositionner est au-dessus d'une door existante.
			if(door[0].isOnScreen(canvas)){

				for(var i = 1; i <= door.length; i++){
					if(door[0].overlapping(door[i])){

						//Si c'est le cas, on retourne une erreur à l'utilisateur.
						throw "Vous ne pouvez pas superposer vos portes !";
					}
				}
				
				// Si la boucle n'est pas quittée, on créer une variable qui va recueillir la valeur de la door "fantôme".
				var newDoor = new Door(
					door[0].x(),
					door[0].y(),
					door[0].width(),
					door[0].height()
				);

				//On insère la door fraichement créer dans le tableau door.
				door.push(newDoor);

				//Et dans le tableau d'objet général.
				gameObjects.push(newDoor);

				//On vide l'objet de la mémoire.
				newDoor = {};
			}

			//On queitte la boucle.
			break;

		//Dans le cas où le radio button coché est FlagStart.	
		case "FlagStart":

			//On commence par vérifier si la souris se situe dans une room, car un flag ne peut que se trouver dans une room.
			for(var i = 0; i < room.length; i++){
				if(mouse.overlapping(room[i]) && !mouse.overlapping(pB)){

					//Si on est dans une room, la position de pA (point A) devient celle de la souris.
					pA.setPosition(mouse.x(), mouse.y());

					//On passe le booléen isset à true.
					pA.set()

					//On sort du for
					break;
				}else{

					//Sinon si pA était déjà placé, on passe la valeur de isset à false. 
					if(pA.isset())
						pA.unset();
				}
			}

			//On sort de la boucle.
			break;

		//Dans le cas où le radio button coché est FlagEnd.
		case "FlagEnd":

			//On commence par vérifier si la souris se situe dans une room, car un flag ne peut que se trouver dans une room.
			for(var i = 0; i < room.length; i++){
				if(mouse.overlapping(room[i]) && !mouse.overlapping(pA)){
					
					//Si on est dans une room, la position de pB (point B) devient celle de la souris.
					pB.setPosition(mouse.x(), mouse.y());
					
					//On passe le booléen isset à true.
					pB.set();

					//On sort du for
					break;
				}else{

					//Sinon si pB était déjà placé, on passe la valeur de isset à false.
					if(pA.isset())
						pB.unset();
				}
			}

			//On sort de la boucle.
			break;
	}
});

/**
 * Evénement appelé lorsque l'utilisateur bouge la souris à l'intérieur du canvas.
 */
form.event('#canvas', 'mousemove', function(event){
	
	// On récupère l'élement canvas
	var canvas = form.get('#canvas');

	// On récupère également les position en X et Y de la souris dans l'élement canvas.
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;

	// On attribut à l'objet souris les coordonnées récupérée.
	mouse.setPosition(x,y);

	// On vérifie la valeur du radio button coché
	switch(form.radioValue('object')){

		// Dans le cas de Room
		case "Room":

			//On set la position de la room fantôme (room[0]) a la position de de la souris tout en l'attachant à la grille
			room[0].setPosition(
				parseInt(x / GRID_SIZE) * GRID_SIZE,
				parseInt(y / GRID_SIZE) * GRID_SIZE
			);

			// On sort de la boucle.
			break;

		// Dans le cas de Door
		case "Door":

			// Pour chaque room (hormis la 0) on verifie si la souris et dedans.
			for(var i = 1; i < room.length; i++){

				// Si c'est le cas on garde dans une variable tampon la valeur de i et on sors de la boucle. 
				if(mouse.overlapping(room[i])){
					var index = i;
					break;
				}
			}
			
			// Si la variable "index" existe.
			if(index){

				// Alors on vérifie si la souris et à l'intérieur d'un des triangles composant le rectangle.
				// Chaque triangle est composé du point central du rectangle et d'une des arrêtes de celui ci.

				// Si la souris se trouve dans un des triangle (ce qui est forcément le cas vu qu'a cet instant la souris est déjà dans une room), alors on attache l'objet porte sur l'arrête concernée.
				if(room[index].insideTriangle(room[index].topLeft(), room[index].topRight(), room[index].center(), mouse.center()))
				{
					door[0].setAngle("horizontal");
					door[0].setPosition(
						parseInt(mouse.x() / GRID_SIZE) * GRID_SIZE,
						room[index].y() - door[0].height()
					);
				}
				else if(room[index].insideTriangle(room[index].topRight(), room[index].bottomRight(), room[index].center(), mouse.center()))
				{
					door[0].setAngle("vertical");
					door[0].setPosition(
						room[index].right(),
						parseInt(mouse.y() / GRID_SIZE) * GRID_SIZE
					);
				}
				else if(room[index].insideTriangle(room[index].center(), room[index].bottomRight(), room[index].bottomLeft(), mouse.center()))
				{
					door[0].setAngle("horizontal");
					door[0].setPosition(
						parseInt(mouse.x() / GRID_SIZE) * GRID_SIZE,
						room[index].bottom()
					);
				}
				else if(room[index].insideTriangle(room[index].topLeft(), room[index].center(), room[index].bottomLeft(), mouse.center()))
				{
					door[0].setAngle("vertical");
					door[0].setPosition(
						room[index].x() - door[0].width(),
						parseInt(mouse.y() / GRID_SIZE) * GRID_SIZE
					);
				}
			} else {

				// Si l'index n'existe pas on sors la porte du canvas.
				door[0].setPosition(-20,-20);
			}

			// On sort de la boucle.
			break;
	}

	/**
	 * Gestion du highlight d'éléments.
	 */

	// Si le tableau gameObjects contient au moins 1 élément.
	if(gameObjects.length > 0){

		// On parcours de tableau.
		for(var id = 0; id < gameObjects.length; ++id){

			// Si la souris est au dessus d'un objet.
			if(mouse.overlapping(gameObjects[id])){

				// On place le highlight à la position de l'objet et à sa taille.
				highlight.setPosition(gameObjects[id].x(), gameObjects[id].y());
				highlight.setWidth(gameObjects[id].width());
				highlight.setHeight(gameObjects[id].height());
				
				// On attribut true au paramètre isset de l'élément.
				highlight.set();

				// On sors de la boucle.
				break;
			}else{

				// Sinon on attribut false au paramètre isset
				highlight.unset();
			}
		}
	// Sinon, si tout les éléments on été supprimé
	}else{

		// On "unset" l'objet
		highlight.unset();
	}
});

/**
 * Evénement appelé lorsque l'utilisateur effectue un clique droit sur le canvas.
 */
form.get('#canvas').addEventListener('contextmenu', function(event){
	// On empêche l'action par défaut du clique droit de s'effectuer.
	event.preventDefault();

	// On récupère l'élement canvas
	var canvas = form.get('#canvas');

	// On récupère également les position en X et Y de la souris dans l'élement canvas.
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;

	// On attribut à l'objet souris les coordonnées récupérée.
	mouse.setPosition(x,y);

	// Pour chaque objet dans le tableau gameObjects
	for(var i = 0; i < gameObjects.length; i++){

		// Si la souris est au dessus d'un élément.
		if(mouse.overlapping(gameObjects[i])){

			// Si cet objet est une instance de la classe Room.
			if(gameObjects[i] instanceof Room){

				// On parcours le tableau Room.
				for(var j = 0; j < room.length; j++){

					// Si la Room est égale au gameObject que l'on vérifie.
					if(gameObjects[i] == room[j] && gameObjects[i] == room[j]){

						// On la retire du tableau Room.
						room.splice(j, 1);

						// Et on quitte la boucle.
						break;
					}	
				}
			// Sinon, si cet objet est une instance de la classe Door.
			}else if(gameObjects[i] instanceof Door){

				// On parcours le tableau Door.
				for(var j = 0; j < door.length; j++){

					// Si la Door est égale au gameObject que l'on vérifie.
					if(gameObjects[i].x() == door[j].x() && gameObjects[i].y() == door[j].y()){

						// On la retire du tableau Door.
						door.splice(j, 1);

						// Et on quitte la boucle.
						break;
					}
				}
			}

			// On supprime enfin l'élément du tableau gameObjects.
			gameObjects.splice(i, 1);
		}
	}

	// On "unset" le highlight pour qu'il ne reste pas dans le vide une fois l'élément supprimé.
	highlight.unset();

});

/**
 * Ici est déterminée la liste des actions à effectuer lorsque l'utilisateur souhaite lancer la recherche de pathfinding.
 */
form.event('#go', 'click', function(){

	// Fonction déterminant si un élément se trouve dans l'OpenList
	function isOnCloseList(element){
		if(CloseList.length > 0){
			for(var i = 0; i < CloseList.length; i++){
				if(CloseList[i].x() == element.x() && CloseList[i].y() == element.y()){
					return true;
				}
			}
		}

		return false;
	}

	// Fonction déterminant si un élément se trouve dans la CloseList
	function isOnOpenList(element){
		if(OpenList.length > 0){
			for(var i = 0; i < OpenList.length; i++){
				if(OpenList[i].x() == element.x() && OpenList[i].y() == element.y()) {
					return true;
				}
			}
		}
		
		return false;
	}

	// On commence par vérifier si nos deux points sont placés.
	if(pA.isset() && pB.isset()){

		/**
		 * Pour trouver le chemin du point A au point B nous nous baserons sur l'algorithme A*
		 */

		// On récupère le canvas.
		var canvas = form.get('#canvas');	

		// Liste de nodes à contrôler avant de les transférer à l'OpenList.
		var TempNodes = [];

		// Variable déterminant si le chemin a été trouvé (initialement à false)
		var pathFound = false;

		// La variable lowerIndex contiendra l'index de la cellule ayant l'indice F le plus bas.
		var lowerIndex = 0;

		// currentNode contient la node en cours.
		var currentNode;

		// Node de départ.
		var beginNode = new Cell( 
			parseInt(pA.x() / GRID_SIZE) * GRID_SIZE,
			parseInt(pA.y() / GRID_SIZE) * GRID_SIZE,
			GRID_SIZE,
			GRID_SIZE,
			null
		);


		// Node d'arrivée.
		var endNode = new Cell(
			parseInt(pB.x() / GRID_SIZE) * GRID_SIZE,
			parseInt(pB.y() / GRID_SIZE) * GRID_SIZE,
			GRID_SIZE,
			GRID_SIZE,
			null
		);

		// On calcule les G, H et F de la node de départ
		beginNode.setG();
		beginNode.setH(endNode);
		beginNode.setF();

		// On ajoute la node de départ à l'OpenList
		OpenList.push(beginNode);

		// Tant que l'on a des éléments dans l'OpenList à vérifier
		while(OpenList.length > 0){


			/**
			 * On commence par récupérer la node ayant le F le plus bas dans l'OpenList.
			 */
			// On initialise le lower index à 0.

			// Pour chaque node de l'OpenList, on vérifie la valeur de F. Si elle est plus petite que les F précédents, on sauvegarde sa position dans "lowerIndex".
			lowerIndex = 0;
			for(var i = 0; i < OpenList.length; i++)
				if(OpenList[i].f() < OpenList[lowerIndex].f())
					lowerIndex = i;

			// Une fois trouvée, on place la node dans la variable currentNode.
			currentNode = OpenList[lowerIndex];


			/**
			 * On retire la node courante de l'OpenList
			 */
			OpenList.splice(lowerIndex, 1);


			/**
			 * On ajoute la node courante à la CloseList
			 */ 
			CloseList.push(currentNode);

			// Si la node courante est égale à la node d'arrivée
			if(currentNode.x() == endNode.x() && currentNode.y() == endNode.y()){
				
				// On passe la variable "pathFound" à true.
				pathFound = true;

				// On quitte le while.
				break;

			// Sinon
			}else{

				// On récupère les nodes adjascente à la nodes en cours.
				TempNodes = currentNode.cellsAround(canvas);

				// Pour chacune des nodes temporaire nous allons effectuer une série de vérifications.
				for(var i = 0; i < TempNodes.length; i++){

					// Si la node est présente dans l'écran.
					if(TempNodes[i].isOnScreen(canvas)){

						// Si elle ne fait pas parti de la CloseList.
						if(!isOnCloseList(TempNodes[i])){

							// Et on verifie si la node se trouve sur une room.
							for(var j = 0; j < gameObjects.length; j++){
								if(TempNodes[i].overlapping(gameObjects[j])){
										

									// Si la node n'est pas dans l'openlist
									if(!isOnOpenList(TempNodes[i])){

										// On la parente à la node courante.
										TempNodes[i].setParent(currentNode);

										// On calcule son G.
										TempNodes[i].setG();

										// Son H.
										TempNodes[i].setH(endNode);

										// Et son F
										TempNodes[i].setF();

										// On fini par l'ajouter à l'OpenList.
										OpenList.push(TempNodes[i]);
									}
								}
							}
						}
					}
				}
			}
		}

		// Quand on sort de la boucle, on en vérifie la cause.
		// Si on a trouvé le chemin.
		if(pathFound){

			// On renverse la CloseList pour que la dernière node trouvée (la bonne) se retrouve en index 0
			CloseList.reverse();

			// On récupère la première node de la liste dans une variable "node"
			var Node = CloseList[0];

			// Et on l'ajoute dans le chemin à parcourir "Path"
			Path.push(Node);

			// Tant que la node possède une node parent
			while(Node.parent() != null){

				// On garde en mémoire le parent
				Node = Node.parent();

				// Et on l'ajoute au chemin
				Path.push(Node);
			}	

		// Sinon
		}else{

			// On averti le joueur que le processus a échoué
			alert("Impossible de trouver le chemin !");
		}

	// Sinon on informe l'utilisateur de l'erreur
	}else{
		alert("Veuillez placer les points de départ et d'arrivée");
	}
});



/**
 * Cet événement va gérer l'affichage à l'écran des éléments du canvas.
 * On passe en premier paramètre la fonction de callback, et en deuxième
 * le taux de rafraichissement en millisecondes (1/1000).
 */

window.setInterval(function(){

	// On récupère le canvas.
	var element = form.get('#canvas')
	
	// On commence par effacer le canvas.
	context.clearRect(0,0,element.width, element.height);

	// On commence par dessiner les rooms.
	// Si le tableau room contient des éléments.
	if(room.length > 1)

		// On dessine chacune d'entre elles.
		for(var x = 1; x < room.length; x++){
			room[x].draw(context);
		}

	// Ici on détermine quel élément fantôme on place (room ou door)
	// On vérifie la valeur du radio button coché.
	switch(form.radioValue('object')){

		// Si il est égale à Room.
		case "Room":

			// On dessine la room 0.
			room[0].draw(context);
			break;

		// Si il est égale à Door.
		case "Door":

			// On dessine la door 0.
			door[0].draw(context);
			break;
	}

	// Si le point A est "set" on le dessine.
	if(pA.isset())
		pA.draw(context);

	// Si le point B est "set" on le dessine.
	if(pB.isset())
		pB.draw(context);

	// On dessine ensuite les doors (pas le groupe de musique hein).
	// Si le tableau door contient des éléments.
	if(door.length > 1)

		// On dessine chacun d'entre eux.
		for(var i = 1; i < door.length; i++){
			door[i].draw(context);
		}
	
	// Si le highlight est "set" on le dessine
	if(highlight.isset())
		highlight.draw(context);

	// Si il y a un chemin on le dessine
	if(Path.length > 0)
		for(var z = 0; z < Path.length; z++){
			context.beginPath();
			context.moveTo(Path[z].center().x,Path[z].center().y);
			context.lineTo(Path[z+1].center().x,Path[z+1].center().y);
			context.stroke();
		}

}, 10);