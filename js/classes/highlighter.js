/**
 * pathfinder\js\classes\highlighter.js
 *
 * Définition de la classe Highlighter héritant de la classe Obj.
 */

function Highlighter(x, y, width, height) {
	Obj.call(this, x, y, width, height);

	// Determine si l'objet est "placé"
	this.m_isset = false;

	this.set = function(){ this.m_isset = true; };
	this.unset = function(){ this.m_isset = false; };
	this.isset = function(){ return this.m_isset; };

	this.draw = function(ctx){
		var gradient = ctx.createLinearGradient(0,0,170,0);
		gradient.addColorStop("0", "magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");

		ctx.strokeStyle = gradient;
		ctx.lineWidth = 2;
		ctx.strokeRect(this.x(), this.y(), this.width(), this.height());

	}
}

Highlighter.prototype = Object.create(Obj.prototype);
Highlighter.prototype.constructor = Highlighter;