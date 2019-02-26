const HorizontalAlignement = { LEFT:0, MIDDLE:1, RIGHT:2};
const VerticalAlignement = { DOWN:0, MIDDLE:1, TOP:2};

class SpriteRenderer
{
    constructor(transform, sprite, pixelPos, width, height, hAlign = HorizontalAlignement.MIDDLE, vAlign = VerticalAlignement.MIDDLE)
    {   
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.pixelPosition = {x:0, y:0};
        this.horizontalAlignement = hAlign;
        this.verticalAlignement = vAlign;
        this.transform = transform;
    }

    Update()
    {
        ctx.drawImage
        (
            this.sprite,
            this.pixelPosition.x,
            this.pixelPosition.y,
            this.width,
            this.height,

            (this.transform.position.x - camera.transform.position.x) + this.GetHorizontalShift(),
            (this.transform.position.y - camera.transform.position.y) + this.GetVerticalShift(),
            this.width,
            this.height
        );

        if(this.masked)
        {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
            ctx.fillRect(
            (this.transform.position.x - camera.transform.position.x) + this.GetHorizontalShift(),
            (this.transform.position.y - camera.transform.position.y) + this.GetVerticalShift(),
            this.width,
            this.height
            );
        }
    }

    ToggleMask()
    {
        if(this.masked == undefined) this.masked = true;
        else this.masked = !this.masked;
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