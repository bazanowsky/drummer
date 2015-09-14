
var Drummer  = function(canvas) {
	this.drums = [];
	this.canvas = canvas;
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
	this.ctx = this.canvas.getContext('2d');
	this.bgcolor = '#000000';

	this.init();
	this.canvas.addEventListener('click',bind(this,this.checkHits),false);
	this.canvas.addEventListener('keypress',bind(this,this.checkKey),false);
};


Drummer.prototype.init = function() {

	this.drums = this.drumsets.standard;

	this.loop();
};

Drummer.prototype.checkHits = function(event){

    for (var drum in this.drums) {
    	if (this.drums.hasOwnProperty(drum)) {
    		var d = this.drums[drum];
    		if (d.checkHit(event.offsetX,event.offsetY)) {
    			d.play();
    		};
    		
    	}
    }
};


Drummer.prototype.checkKey = function(event){
	var key = String.fromCharCode(event.keyCode);

	if (this.keymap.hasOwnProperty(key)) {
		var d = this.keymap[key];
		this.drums[d].play();
	};
};

Drummer.prototype.draw = function(ctx) { 
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fillStyle = this.bgcolor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var drum in this.drums) {
    	if (this.drums.hasOwnProperty(drum)) {
    		var d = this.drums[drum];
    		d.draw(ctx);
    	}
    }
};

Drummer.prototype.loop = function() {
	var that = this;
	that.draw(this.ctx);

	window.requestAnimationFrame(function(){ that.loop(); });
};


Drummer.prototype.drumsets = {
	'standard': {
		'tom1' : new Drum('Tom 12',{x:150,y:100},{size:11.5, sound:"assets/sounds/tom10.wav"}),
		'tom2' : new Drum('Tom 13',{x:250,y:105},{size:13.5, sound:"assets/sounds/tom10.wav"}),
		'tom3' : new Drum('Tom 16',{x:290,y:210},{size:16, sound:"assets/sounds/tom14.wav"}),
		'snare' : new Drum('Snare 14',{x:130,y:210},{size:14, color:"#eee", sound:"assets/sounds/snare.wav"}),
		'kick' : new Drum('Kick',{x:200,y:170},{size:7, color:"#666", sound:"assets/sounds/kick.wav"}),
		'hihat' : new Drum('Kick',{x:60,y:140},{size:11, color:"#fda", sound:"assets/sounds/hihat.wav"}),
		'crash1' : new Drum('Kick',{x:110,y:50},{size:13, color:"#fda", sound:"assets/sounds/crash1.wav"}),
		'crash2' : new Drum('Kick',{x:310,y:70},{size:15, color:"#fda", sound:"assets/sounds/crash2.wav"}),
	}
}

Drummer.prototype.keymap = {
	'c' : 'snare',
	'v' : 'snare',
	'f' : 'tom1',
	'g' : 'tom1',
	'h' : 'tom2',
	'j' : 'tom2',
	'k' : 'tom3',
	'l' : 'tom3',
	'z' : 'kick',
	'x' : 'kick',
	's' : 'hihat',
	'd' : 'hihat',
	'e' : 'crash1',
	'r' : 'crash1',
	't' : 'crash2',
	'y' : 'crash2',
}

