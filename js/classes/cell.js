/**
 * pathfinder\js\classes\cell.js
 * 
 * Définition de la classe Cell, héritant de la classe Obj.
 */

function Cell(x, y, width, height, parent){
	Obj.call(this, x, y, width, height);

	/**
	 * m_g représente la distance séparant la node courante à la node de départ.
	 * Pour calculer la valeur m_g de la node en cours, on additionne le coût de déplacement à la valeur du m_g de la node parente.
	 * Coûts de déplacement: 10 en horizontal/vertical, 14 en diagonal.
	 */
	this.m_g = 0;

	/**
	 * Distance à vol d'oiseau de la node jusqu'à la node d'arrivée.
	 * On calcule l'heuristique de la manière suivante:
	 * C = node courante, E = node d'arrivée.
	 * H = 10 x ( abs(EX - CX) + abs(EY - CY) )
	 */
	this.m_h = 0;

	/**
	 * Valeurs additionnées de G et H.
	 */
	this.m_f = 0;
	
	/**
	 * Node parente (d'où on vient).
	 */
	this.m_parentNode = parent;

	this.g = function(){ return this.m_g; }
	this.h = function(){ return this.m_h; }
	this.f = function(){ return this.m_f; }
	this.parent = function(){ return this.m_parentNode; }


	this.setG = function(){
		if(this.m_parentNode != null){

			this.m_g += this.m_parentNode.g();

			if((this.m_parentNode.x() == this.m_x) || (this.m_parentNode.y() == this.m_y)){
				this.m_g += 10;
			}else{
				this.m_g += 14;
			}
		}else{
			this.m_g = 0;
		}
	}

	this.setH = function(end){
		var CX = parseInt(this.m_x / GRID_SIZE);
		var CY = parseInt(this.m_y / GRID_SIZE);
		var EX = parseInt(end.x() / GRID_SIZE);
		var EY = parseInt(end.y() / GRID_SIZE);

		this.m_h = 10 * ( Math.abs(EX - CX) + Math.abs(EY - CY) );
	}


	this.setF = function(){
		this.m_f = this.m_g + this.m_h;
	}

	this.setParent = function(element){
		this.m_parentNode = element;
	}


	/**
	 * Recupère les huit cellules qui entourent la cellule actuelle
	 */
	this.cellsAround = function(canvas){
		var cellsList = new Array();

		cellsList.push(
			new Cell(
				this.m_x - GRID_SIZE,
				this.m_y - GRID_SIZE,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x,
				this.m_y - GRID_SIZE,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x + GRID_SIZE,
				this.m_y - GRID_SIZE,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x - GRID_SIZE,
				this.m_y,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x + GRID_SIZE,
				this.m_y,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x - GRID_SIZE,
				this.m_y + GRID_SIZE,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x,
				this.m_y + GRID_SIZE,
				GRID_SIZE,
				GRID_SIZE
		));

		cellsList.push(
			new Cell(
				this.m_x + GRID_SIZE,
				this.m_y + GRID_SIZE,
				GRID_SIZE,
				GRID_SIZE
		));

		return cellsList;
	}

	this.draw = function(ctx){
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.strokeRect(x, y, width, height);
	}
}

Cell.prototype = Object.create(Obj.prototype);
Cell.prototype.constructor = Cell;