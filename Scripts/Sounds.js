function Sound(name)
{
    var audio = new Audio(name);
    audio.play();
    console.log(name);
}