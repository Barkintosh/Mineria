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