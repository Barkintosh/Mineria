class Animator
{
    constructor(spriteRenderer, sheet, frameCount = 1, pixelCoord = {x: 0, y:0}, spriteSize = {x: 32, y:32}, speed = 1)
    {
        // Settings
        this.spriteRenderer = spriteRenderer;
        this.sheet = sheet;
        this.frameCount = frameCount;
        this.pixelCoord = pixelCoord;
        this.spriteSize = spriteSize;
        this.speed = speed;
        
        // System
        this.originPixelCoor = pixelCoord;
        this.timer = 0;
        this.frame = 0;
        this.frameIndex = 0;
        this.stage = 0;
    }

    Update()
    {
        this.timer += this.speed;

        if(this.timer > 1)
        {
            // Selecting the next frame
            if(this.frame > this.frameCount - 1) 
            {
                this.pixelCoord = this.originPixelCoor;
                this.stage = 0;
                this.frame = 0;
                this.frameIndex = 0;
            }

            var newPixelCoord = {x: this.pixelCoord.x + this.spriteSize.x * this.frameIndex, y: this.pixelCoord.y + this.spriteSize.y * this.stage};

            // Checking if we are exceeding Image width or Height
            if(this.pixelCoord.x + (this.spriteSize.x * this.frameIndex) > this.sheet.width - this.spriteSize.x)
            {
                this.pixelCoord.x = 0;
                this.frameIndex = 0;
                this.stage++;
                newPixelCoord = {x: this.pixelCoord.x + this.spriteSize.x * this.frameIndex, y: this.pixelCoord.y + this.spriteSize.y * this.stage};
            }

            // Sending the Sprite data to the linked sprite renderer
            this.spriteRenderer.NewSprite(
                this.sheet,
                newPixelCoord,
                this.spriteSize.x, 
                this.spriteSize.y
            );

            //console.log("pos : " + this.frameIndex + ", frame : " + this.frame + " pixelX : " + newPixelCoord.x + ", pixelY : " + newPixelCoord.y);

            // Reset the timer
            this.frame++;
            this.frameIndex++;
            this.timer = 0;
        }
    }
}