/**
 * pathfinder\js\classes\form.js
 *
 * Définition de la classe Form.
 */

function Form() {
	// Retourne un élément du DOM
	this.get = function(value){
		return document.querySelector(value);
	}

	// Retourne la valeur d'un élément du DOM
	this.getValue = function(value) {
		return this.get(value).value;
	}

	// Créer un listener sur un élément du DOM
	this.event = function(key, event, callback) {
		var element = this.get(key);
		element.addEventListener(event, callback);
	}

	// Retourne la valeur d'un radio button
	this.radioValue = function(value){
		var radios = document.getElementsByName(value);

		for(var i = 0; i < radios.length; i++){
			if(radios[i].checked){
				return radios[i].value;
			}
		}

		return false;
	}
}