/**
 * pathfinder\js\classes\flag.js
 * 
 * Définition de la classe Flag, héritant de la classe Obj.
 */

function Flag(x, y, width, height) {
	Obj.call(this, x, y, width, height);

	// Determine si l'objet est "placé"
	this.m_isset = false;

	this.isset = function(){ return this.m_isset; };
	this.set   = function(){ this.m_isset = true; };
	this.unset = function(){ this.m_isset = false; };

	this.draw = function(ctx){
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(this.x(), this.y(), 8, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

Flag.prototype = Object.create(Obj.prototype);
Flag.prototype.constructor = Flag;