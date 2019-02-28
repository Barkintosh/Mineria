function GetDistance(a, b)
{
    return Math.sqrt((a.x - a.y)*(a.x - a.y) +  (b.x - b.y)*(b.x - b.y));
}

function GetDistanceDecomposed(a, b, x, y)
{
    return Math.sqrt((a - b)*(a - b) + (x - y)*(x - y));
}

Math.getDistance = function( x1, y1, x2, y2 ) {
	
	var 	xs = x2 - x1,
		ys = y2 - y1;		
	
	xs *= xs;
	ys *= ys;
	 
	return Math.sqrt( xs + ys );
};

function lerp(a, b, n) 
{
    return (1 - n) * a + n * b;
}

function Create2DArray(rows)
{
    var arr = [];
  
    for (var i = 0; i < rows; i++)
    {
       arr[i] = [];
    }
  
    return arr;
}


function GetRandomInt(min, max) 
{
    return min + Math.floor(Math.random() * Math.floor(max - min));
}

function GetRandomString(nb) 
{
    var string = "";
    for(i = 0; i < nb; i++)
    {
        string += characters.all.charAt(Math.random() * characters.all.length);
    }
    return string;
}

function GetRandomName()
{
    var string = "";
    var length = 4 + Math.floor(Math.random() * Math.floor(4));
    
    for(i = 0; i < length; i++)
    {
        if(i%2 === 0)
            string += characters.vowel.charAt(Math.random() * characters.vowel.length);
        else
            string += characters.consonnant.charAt(Math.random() * characters.consonnant.length);
    }
    return string[0].toUpperCase() + string.slice(1);
}

function GetRandomColor(minRed, maxRed, minGreen, maxGreen, minBlue, maxBlue)
{
    var string; 

    string = "rgb(" + GetRandomInt(minRed, maxRed) + ", " + GetRandomInt(minGreen, maxGreen) + ", " + GetRandomInt(minBlue, maxBlue) + ")"; 

    return string;
}

function include(filename)
{
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';

    head.appendChild(script)
}

function IsIntersecting(ax, ay, bx, by, cx, cy, dx, dy)
{
    var tmp = (cx - dx) * (by - ay) - (dy - cy) * (bx - ax);

    console.log(tmp);




    /*
    var denominator = ((bx - ax) * (dy - cy)) - ((by - ay) * (dx - cx));
    var numeratorOne = ((ay - cy) * (dx - cx)) - ((ax - cx) * (dy - cy));
    var numeratorTwo = ((ay - cy) * (bx - ax)) - ((ax - cx) * (by - ay));

    if(denominator == 0) return numeratorOne == 0 && numeratorTwo == 0;

    var r = numeratorOne / denominator;
    var s = numeratorTwo / denominator;
    
    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
    */
}

function BoxOverlap(box1, box2)
{
    if(box1.position.x < box2.position.x + box2.size.x
    && box2.position.x < box1.position.x + box1.size.x
    && box1.position.y < box2.position.y + box2.size.y
    && box2.position.y < box1.position.y + box1.size.y
    )
    {
        return true;
    }
    return false;
}

/*
let bounds = [
    // LEFT TOP
    -scale/2,
    -scale,
    // RIGHT TOP
    scale/2,
    -scale,
    // LEFT DOWN
    scale/2,
    0,
    // RIGHT DOWN
    -scale/2,
    0];
*/