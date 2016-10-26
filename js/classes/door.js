/**
 * pathfinder\js\classes\door.js
 * 
 * Définition de la classe Door, héritant de la classe Obj.
 */

function Door(x, y, width, height){
	Obj.call(this, x, y, width, height);

	this.draw = function(ctx){
		ctx.fillStyle = "black";
		ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
	}
}

Door.prototype = Object.create(Obj.prototype);
Door.prototype.constructor = Door;