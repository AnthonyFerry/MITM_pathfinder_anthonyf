/**
 * Définition de la classe Obj.
 * 
 * Paramètres :
 * 		- m_x      : position en x.
 *		- m_y      : position en y.
 *		- m_width  : largeur de l'objet.
 *		- m_height : hauteur de l'objet.
 *		- m_angle  : détermine l'angle de l'objet (horizontal ou vertical).
 *
 * Méthodes :
 *		- Mutateurs
 *		- right       : retourne la position du bord droit de l'objet.
 *		- bottom      : retourne la position du bord bas de l'objet.
 *		- center      : retourne le point central de l'objet sous forme de tableau "clé" -> "valeur" (x, y).
 *		- topLeft     : retourne le point haut gauche de l'objet sous forme de tableau "clé" -> "valeur" (x, y).
 *		- topRight    : retourne le point haut droit de l'objet sous forme de tableau "clé" -> "valeur" (x, y).
 *		- bottomLeft  : retourne le point bas gauche de l'objet sous forme de tableau "clé" -> "valeur" (x, y).
 *		- bottomRight : retourne le point bas droit de l'objet sous forme de tableau "clé" -> "valeur" (x, y).
 *		- overlapping : prend en paramètre une autre instance de la classe Obj. Retourne true si l'objet du paramètre recouvre/est recouvert de l'objet appelant la méthode
 * 		- collide     : indique si l'objet est collé à un autre objet.
 * 		- isOnScreen  : indique si l'objet est dans l'écran.
 */

 
function Obj(x, y, width, height) {

	this.m_x = x;  // x position
	this.m_y = y; // y position
	this.m_width = width; // object's width
	this.m_height = height; // object's height
	this.m_angle = "horizontal";

	this.x       = function(){ return this.m_x; }
	this.y       = function(){ return this.m_y; }
	this.width   = function(){ return this.m_width; }
	this.height  = function(){ return this.m_height; }
	this.angle   = function(){ return this.m_angle; }

	this.right   = function(){ return (this.m_x + this.m_width); }
	this.bottom  = function(){ return (this.m_y + this.m_height); }
	this.center  = function(){ 
		return { 
			x: parseInt(this.m_width / 2) + this.m_x, 
			y: parseInt(this.m_height / 2) + this.m_y
		}; 
	}
	this.topLeft = function(){
		return {
			x: this.m_x,
			y: this.m_y
		};
	}
	this.topRight = function(){
		return {
			x: this.right(),
			y: this.m_y
		};
	}
	this.bottomLeft = function(){
		return {
			x: this.m_x,
			y: this.bottom()
		};
	}
	this.bottomRight = function(){
		return {
			x: this.right(),
			y: this.bottom()
		};
	}
	
	this.setX        = function(value){ this.m_x = value; }
	this.setY        = function(value){ this.m_y = value; }
	this.setPosition = function(x, y){ 
		this.m_x = x;
		this.m_y = y;
	}
	this.setWidth   = function(value){ this.m_width = value; }
	this.setHeight  = function(value){ this.m_height = value; }
	this.setAngle   = function(value){
		var width  = this.m_width;
		var height = this.m_height;

		if(value != this.m_angle && (value == "horizontal" || value == "vertical")){
			this.setWidth(height);
			this.setHeight(width);
			this.m_angle = value;
		}
	}

	this.overlapping = function(obj){
		if(obj instanceof Obj){
			return !(this.bottom() <= obj.y() || obj.bottom() <= this.y() || this.right() <= obj.x() || obj.right() <= this.x());
		}
		return false;
	}

	this.collide = function(obj){
		if(obj instanceof Obj){
			return !(this.bottom() < obj.y() || obj.bottom() < this.y() || this.right() < obj.x() || obj.right() < this.x());
		}
		return false;	
	}

	this.isOnScreen = function(canvas){
		return ((this.m_x >= 0) && (this.m_y >= 0) && (this.m_x < canvas.width) && (this.m_y < canvas.height));
	}
}