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

function ToRadian(angle)
{
    return angle * Math.PI / 180;
}

function CopyArray(array)
{
    var newArray = [];
    for(var i = 0; i < array.length; i++)
    {
        newArray[i] = array[i];
    }
    return newArray;
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
    return "rgb(" + GetRandomInt(minRed, maxRed) + ", " + GetRandomInt(minGreen, maxGreen) + ", " + GetRandomInt(minBlue, maxBlue) + ")"; 
}

function IsIntersecting(ax, ay, bx, by, cx, cy, dx, dy)
{
    var tmp = (cx - dx) * (by - ay) - (dy - cy) * (bx - ax);
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

function lerp (start, end, amt)
{
    return (1-amt)*start+amt*end
}

Array.prototype.move = function(from, to) 
{
    this.splice(to, 0, this.splice(from, 1)[0]);
};

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