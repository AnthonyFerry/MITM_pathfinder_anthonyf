/**
 * pathfinder\js\variables.js
 * 
 * Dans ce ficher sont créer toute les variables globales du programme.
 *
 *
 * GRID_SIZE : taille des cellules de la grille en px.
 * form : instance de la classe Form permettant d'acceder plus intuitivement aux éléments du DOM.
 * context : contexte du canvas.
 * room : tableau contenant toute les instances de la classe Room.
 * door : tableau contenant toute les instances de la classe Door.
 * mouse : instance de la classe Obj. Elle va nous permettre d'acceder à la méthode "overlapping" de la classe pour déterminer si la souris survole un élément.
 * gameObjects : tableau répertoriant toute les instances des classes Room et Door
 * highlight : instance de la classe Highlight. Permettra de mettre des objets en surbrillance.
 * pA : instance de la classe flag. Définie le point de départ du pathfinding.
 * pB : instance de la classe flag. Définie le point d'arrivée du pathfinding.
 */ 


// On détermine les listes case ou "noeud" ou encore "nodes".
var OpenList = []; // Liste de nodes à vérifier.
var CloseList = []; // Liste de nodes déjà parcourus.
var Path = []; // Liste des nodes constituants le chemin final

var GRID_SIZE = 16;
var form = new Form();
var context = form.get('#canvas').getContext('2d');
var room = new Array(new Room(
	0,
	0,
	form.getValue('#width') * GRID_SIZE,
	form.getValue('#height') * GRID_SIZE,
	form.getValue('#color')
));
var door = new Array(new Door(
	-100,
	-100,
	3 * GRID_SIZE,
	GRID_SIZE
));
var mouse = new Obj(0,0,1,1);
var gameObjects = new Array();
var highlight = new Highlighter(-10, -10, 1, 1);
var pA = new Flag(0,0,8,8);
var pB = new Flag(0,0,8,8);