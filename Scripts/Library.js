const flappySprite = new Image();
flappySprite.src = "./Assets/fap.png";

const flapSprite = new Image();
flapSprite.src = "./Assets/flappy.png";

const roguelike = new Image();
roguelike.src = "./Assets/roguelike.png";

const dungeon = new Image();
dungeon.src = "./Assets/dungeon.png";

const weapons = new Image();
weapons.src = "./Assets/spageti.png";

const hands = new Image();
hands.src = "./Assets/hands.png";

const f = new FontFace('Golden', 'url(Assets/Golden.ttf)');
f.load().then(function(){document.fonts.add(f)});

const font = new FontFace('Flappy', 'url(Assets/FlappyBirdy.ttf)');
font.load().then(function(){document.fonts.add(font)});

const candyFont = new FontFace('Candy', 'url(Assets/Candy.otf)');
candyFont.load().then(function(){document.fonts.add(candyFont)});

const kidFont = new FontFace('Kid', 'url(Assets/Kid.otf)');
kidFont.load().then(function(){document.fonts.add(kidFont)});