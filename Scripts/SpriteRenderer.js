const HorizontalAlignement = { LEFT:0, MIDDLE:1, RIGHT:2};
const VerticalAlignement = { DOWN:0, MIDDLE:1, TOP:2};

class SpriteRenderer
{
    constructor(transform, sprite, pixelPosisiton, width, height)
    {   
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.pixelPosition = pixelPosisiton;
        this.transform = transform;

        this.debug = debug;
    }

    NewSprite(sprite, pixelPosisiton, width, height)
    {
        this.sprite = sprite;
        this.pixelPosition = pixelPosisiton;  
        this.width = width;
        this.height = height;
    }

    Update()
    {
        var drawPoint = 
        {
            x: (this.transform.position.x - camera.transform.position.x) + /*this.GetHorizontalShift()*/0 * this.transform.size.x,
            y: (this.transform.position.y - camera.transform.position.y) + /*this.GetVerticalShift()*/0 * this.transform.size.y
        }

        var drawBound =
        {
            w:this.width * this.transform.size.x,
            h:this.height * this.transform.size.y
        }

        if(this.transform.rotation != 0)
        {
            var rad = this.transform.rotation * Math.PI / 180;
            ctx.translate(drawPoint.x, drawPoint.y);
            ctx.rotate(rad);

            if(this.debug)
            {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 255, 0, 0.25)";
                ctx.fillRect(
                    -drawBound.w/2,
                    -drawBound.h/2,
                    drawBound.w,
                    drawBound.h
                );
            }
            else
            {
                ctx.drawImage
                (
                    this.sprite,
                    this.pixelPosition.x,
                    this.pixelPosition.y,
                    this.width,
                    this.height,
        
                    -drawBound.w/2,
                    -drawBound.h/2,
                    drawBound.w,
                    drawBound.h
                );
            }
            ctx.rotate(-rad);
            ctx.translate(-drawPoint.x, -drawPoint.y);
        }
        else
        {
            if(this.debug)
            {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 255, 0, 0.25)";
                ctx.fillRect(
                    drawPoint.x - drawBound.w/2,
                    drawPoint.y - drawBound.h/2,
                    drawBound.w,
                    drawBound.h
                );
            }
            else
            {
                ctx.drawImage
                (
                    this.sprite,
                    this.pixelPosition.x,
                    this.pixelPosition.y,
                    this.width,
                    this.height,
        
                    drawPoint.x - drawBound.w/2,
                    drawPoint.y - drawBound.h/2,
                    drawBound.w,
                    drawBound.h
                );
            }
        }
    }

    ToggleDebug()
    {
        if(this.debug == undefined) this.debug = true;
        else this.debug = !this.debug;
    }

    GetHorizontalShift()
    {
        if(this.horizontalAlignement == HorizontalAlignement.LEFT) return 0;
        else if(this.horizontalAlignement == HorizontalAlignement.RIGHT) return -this.width;
        else return -this.width/2;
    }

    GetVerticalShift()
    {
        if(this.verticalAlignement == VerticalAlignement.DOWN) return -this.height;
        else if(this.verticalAlignement == VerticalAlignement.TOP) return 0;
        else return -this.height/2;
    }
}

/*
function drawImageRot(img,x,y,width,height,deg){

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}
*/