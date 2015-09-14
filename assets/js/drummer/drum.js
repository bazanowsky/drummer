var Drum = function(name, position, atts) {
	atts = atts || this.defaults;
	for(var i in this.defaults) {
		this[i] = (typeof atts[i] !== 'undefined') ? atts[i] : this.defaults[i];
	}
	this.hit = false;
	this.name = name;
	this.position = {
		x : position.x+0.5,
		y : position.y+0.5
	}
	this.sound = new Audio(this.sound);

	return this;
}
Drum.prototype.constructor = Drum;
Drum.prototype.defaults = {
	color: "#ffcc00",
	size: 12,
	sound: 'A',
	hitColor: "#fff",
	sound: "assets/sounds/10_inch_rack_tom2.wav"
};

Drum.prototype.sizeMultiplier = 3.5;


Drum.prototype.draw = function(ctx){
	var tempcolor = ctx.fillStyle;

	ctx.fillStyle = this.isHit ? this.hitColor : this.color;
	if (this.isHit && Date.now() - this.isHit > 100) {
		this.isHit = false;
	};

	ctx.beginPath();
	ctx.arc(this.position.x, this.position.y, this.size*this.sizeMultiplier, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
	ctx.fillStyle = tempcolor;
};

Drum.prototype.play = function(){
	this.isHit = Date.now();
	this.sound.load();
	this.sound.pause();
	this.sound.currentTime = 0;
	this.sound.play();
};

Drum.prototype.checkHit = function(x,y) {
	if ( 
		(x > this.position.x - this.size*this.sizeMultiplier)  && 
		(y > this.position.y - this.size*this.sizeMultiplier)  &&

		(x < this.position.x + this.size*this.sizeMultiplier)  &&
		(y < this.position.y + this.size*this.sizeMultiplier)  
		) 
	{
		this.play();
		return true;	
	} else {
		return false;
	}
}
