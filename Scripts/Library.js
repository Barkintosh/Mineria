const flappySprite = new Image();
flappySprite.src = "./Assets/fap.png";

const flapSprite = new Image();
flapSprite.src = "./Assets/flappy.png";

const roguelike = new Image();
roguelike.src = "./Assets/roguelike.png";

const dungeon = new Image();
dungeon.src = "./Assets/dungeon.png";

const f = new FontFace('Golden', 'url(Assets/Golden.ttf)');
f.load().then(function(){document.fonts.add(f)});

const font = new FontFace('Flappy', 'url(Assets/FlappyBirdy.ttf)');
font.load().then(function(){document.fonts.add(font)});