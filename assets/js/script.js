const bouton = document.getElementById("tirer");
const loader = document.getElementById("loader");
const erreur = document.getElementById("erreur");
const container = document.getElementById("cartesContainer");

const API_URL = "https://oracles-api.sidathsoeun.fr/oracle_api.php";
const API_KEY = "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!";

let horoscopeGlobal = {};

bouton.addEventListener("click", async () => {
  erreur.textContent = "";
  container.innerHTML = "";
  loader.classList.remove("hidden");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY })
    });

    if (!response.ok) throw new Error("La requête a échoué : " + response.status);

    const data = await response.json();
    horoscopeGlobal = data.horoscope;

    setTimeout(() => {
      afficherHoroscopes(horoscopeGlobal);
      loader.classList.add("hidden");
    }, 1000);

  } catch (err) {
    setTimeout(() => {
      loader.classList.add("hidden");
      erreur.textContent = "🔴 Erreur : Impossible de recevoir les données astrales. ";
    }, 1000);
  }
});

function afficherHoroscopes(data) {
  container.innerHTML = "";
  let delay = 0;
  for (const signe in data) {
    const carte = document.createElement("div");
    carte.classList.add("carte");
    carte.style.animationDelay = `${delay}s`;

    const titre = document.createElement("h3");
    titre.textContent = signe;

    const message = document.createElement("p");
    message.textContent = data[signe];

    carte.appendChild(titre);
    carte.appendChild(message);

    container.appendChild(carte);
    delay += 0.1;
  }
}



var c = document.getElementById('canv');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

var $ = c.getContext('2d');
var _x = w / 2;
var _y = h / 2;

var sc = 150;
var num = 35;

var midX = new Array(num);
var midY = new Array(num);
var rad = new Array(num);

var msX = 0.0;
var msY = 0.0;
var _msX = 0.0;
var _msY = 0.0;

var invX = 0.0;
var invY = 0.0;
var _invX = 0.0;
var _invY = 0.0;

var spr = 0.95;
var fric = 0.95;
var flag = 1;
var arr = [];
var rint = 60;

var draw = function() {
  window.requestAnimationFrame(draw);
  inv();
  fill();
  for(var j= 0; j < arr.length; j++) {
		arr[j].fade();
		arr[j].anim();
		arr[j]._draw();
	} 
}
var inv = function() {
  invX = msX;
  invY = msY;
  _msX += (_invX - invX) * spr;
  _msY += (_invY - invY) * spr;
  _msX *= fric;
  _msY *= fric;
  _invX = invX;
  _invY = invY;
  invX += _msX;
  invY += _msY;
}

var txt = function() {
  var t0 = "".split("").join(String.fromCharCode(0x2004));
  var t = "".split("").join(String.fromCharCode(0x2004));
  $.font = "3em Economica";
  $.fillStyle = 'hsla(220, 95%, 75%, .55)';
  $.fillText(t0, (c.width - $.measureText(t0).width) * 0.5, c.height * 0.45);
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.55);
  return t;
}
var fill = function() {
  $.globalCompositeOperation= 'source-over';
  var g_ = $.createLinearGradient(c.width + c.width, c.height + c.height * 1.5, c.width + c.width, 1);
  g_.addColorStop(0, ' hsla(220, 95%, 10%, .55)');
  g_.addColorStop(0.5, 'hsla(220, 95%, 30%, .55)');
  g_.addColorStop(1, 'hsla(0, 0%, 5%, 1)');
  $.fillStyle = g_;
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation= 'lighter';
  txt();
}

var ring = function() {
  for (i = 0; i < num; i++) {
    var currX = midX[i];
    var currY = midY[i];
    var currRad = rad[i];
    var dx = currX + invX;
    var dy = currY + invY;
    var s = 1 / (dx * dx + dy * dy - currRad * currRad);
    ix = dx * s + (currX * flag);
    iy = -dy * s + (currY * flag);
    var irad = currRad * s;
    var g = $.createRadialGradient(ix * sc + _x,
      iy * sc + _y,
      irad,
      ix * sc + _x,
      iy * sc + _y,
      irad * sc)
    g.addColorStop(0, 'hsla(176, 95%, 95%, 1)');
    g.addColorStop(0.5, 'hsla(201, 95%, 45%, .5)');
    g.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
    $.fillStyle = g;
    $.beginPath();
    $.arc(ix * sc + _x, iy * sc + _y, irad * sc, 0, Math.PI * 2.0, true);
    $.fill();
  }
};

for(var j = 0; j < 150; j++) {
		arr[j] = new stars();
		arr[j].reset();
	}

function stars() {
	this.s = {tlap:50000, maxx:4, maxy:2, rmax:4, rt:1, dx:960, dy:540, mvx:4, mvy: 4, rnd:true, twinkle:true};
	this.reset = function() {
		this.x = (this.s.rnd ? w*Math.random() : this.s.dx);
		this.y = (this.s.rnd ? h*Math.random() : this.s.dy);
		this.r = ((this.s.rmax-1)*Math.random()) + .5;
		const VITESSE_GLOBALE = Math.max(0.2, Math.min(0.5, window.innerWidth / 4000));  // vitesse responsive des étoiles


this.dx = (Math.random() * this.s.maxx * VITESSE_GLOBALE) * (Math.random() < .5 ? -1 : 1);
this.dy = (Math.random() * this.s.maxy * VITESSE_GLOBALE) * (Math.random() < .5 ? -1 : 1);

		this.tw = (this.s.tlap/rint)*(this.r/this.s.rmax);
		this.rt = Math.random()*this.tw;
		this.s.rt = Math.random()+1;
		this.cs = Math.random()*.2+.4;
		this.s.mvx *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.mvy *= Math.random() * (Math.random() < .5 ? -1 : 1);
	}
	this.fade = function() {
		this.rt += this.s.rt;
	}
	this._draw = function() {
		if(this.s.twinkle && (this.rt <= 0 || this.rt >= this.tw)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.tw) this.reset();
		var o = 1-(this.rt/this.tw);
		$.beginPath();
		$.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		$.closePath();
		var rad = this.r*o;
		var g = $.createRadialGradient(this.x,this.y,0,this.x,this.y,(rad <= 0 ? 1 : rad));
		g.addColorStop(0.0, 'hsla(255,255%,255%,'+o+')');
		g.addColorStop(this.cs, 'hsla(201, 95%, 25%,'+(o*.6)+')');
		g.addColorStop(1.0, 'hsla(201, 95%, 45%,0)');
		$.fillStyle = g;
		$.fill();
	}

	this.anim = function() {
		this.x += (this.rt/this.tw)*this.dx;
		this.y += (this.rt/this.tw)*this.dy;
		if(this.x > w || this.x < 0) this.dx *= -1;
		if(this.y > h || this.y < 0) this.dy *= -1;
	}
}

function calculerNombreEtoiles() {
  const surface = window.innerWidth * window.innerHeight;
  // 1 étoile pour ~x000 pixels², limité entre 50 et 250
  return Math.min(250, Math.max(50, Math.floor(surface / 10000)));
}

var set = function () {
  num = calculerNombreEtoiles(); 
  midX = new Array(num);
  midY = new Array(num);
  rad = new Array(num);

  const radi = Math.PI * 2.0 / num;
  for (let i = 0; i < num; i++) {
    midX[i] = Math.cos(radi * i);
    midY[i] = Math.sin(radi * i);
    rad[i] = 0.1;
  }

  arr = [];
  for (let j = 0; j < num; j++) {
    arr[j] = new stars();
    arr[j].reset();
  }

  draw(); // lancé une seule fois
}



window.addEventListener('resize', function () {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
  _x = w / 2;
  _y = h / 2;

  num = calculerNombreEtoiles(); // recalcule adapté à la nouvelle taille
  midX = new Array(num);
  midY = new Array(num);
  rad = new Array(num);

  const radi = Math.PI * 2.0 / num;
  for (let i = 0; i < num; i++) {
    midX[i] = Math.cos(radi * i);
    midY[i] = Math.sin(radi * i);
    rad[i] = 0.1;
  }

  arr = [];
  for (let j = 0; j < num; j++) {
    arr[j] = new stars();
    arr[j].reset();
  }
}, true);




set();