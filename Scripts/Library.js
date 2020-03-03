const flappySprite = new Image();
flappySprite.src = "./Assets/fap.png";

const flapSprite = new Image();
flapSprite.src = "./Assets/flappy.png";

const f = new FontFace('Golden', 'url(Assets/Golden.ttf)');
f.load().then(function(){document.fonts.add(f)});

const font = new FontFace('Flappy', 'url(Assets/FlappyBirdy.ttf)');
font.load().then(function(){document.fonts.add(font)});
/*
// ROTATE IMAGE RENDERING
ctx.save(); // save current state
ctx.rotate(Math.PI); // rotate
ctx.drawImage(link,x,y,20,20); // draws a chain link or dagger
ctx.restore(); // restore original states (no rotation etc)
*/