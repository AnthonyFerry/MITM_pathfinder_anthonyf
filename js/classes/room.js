/**
 * pathfinder\js\classes\room.js
 * 
 * Définition de la classe Room, héritant de la classe Obj.
 */

function Room(x, y, width, height, color) {
	Obj.call(this, x, y, width, height);

	// Valeur en héxadécimal de la couleur de l'objet
	this.m_color = color;

	this.color = function(){ return this.m_color; }
	this.setColor = function(value){ this.m_color = value; }

	/**
	 * Fonction verifiant si un objet est situé dans un triangle
	 *
	 * p0, p1 et p2 = points du triangles.
	 */ 
	this.insideTriangle = function(p0, p1, p2, obj){
		var Area = 0.5 *(-p1.y*p2.x + p0.y*(-p1.x + p2.x) + p0.x*(p1.y - p2.y) + p1.x*p2.y);
		var s = 1/(2*Area)*(p0.y*p2.x - p0.x*p2.y + (p2.y - p0.y)*obj.x + (p0.x - p2.x)*obj.y);
		var t= 1/(2*Area)*(p0.x*p1.y - p0.y*p1.x + (p0.y - p1.y)*obj.x + (p1.x - p0.x)*obj.y);

		return ((0 <= s && s <= 1) && (0 <= t && t <= 1) && s+t <= 1);
	}

	this.draw = function(ctx){
		ctx.fillStyle = this.m_color;
		ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
		ctx.strokeStyle = "#EEEEEE";
		ctx.lineWidth = 1;
		ctx.strokeRect(this.m_x, this.m_y, this.m_width, this.m_height);
	}
}

Room.prototype = Object.create(Obj.prototype);
Room.prototype.constructor = Room;