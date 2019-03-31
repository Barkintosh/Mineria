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
        this.timer = 0;
        this.frame = 0;
        this.frameIndex = 1;
        this.stage = 1;
    }

    Update()
    {
        this.timer += this.speed;

        if(this.timer > 1)
        {
            // Selecting the next frame
            this.frame++;
            this.frameIndex++;

            if(this.frame >= this.frameCount) 
            {
                console.log("lul");
                this.stage = 1;
                this.frame = 1;
                this.frameIndex = 1;
                this.pixelCoord.x = 0;
            }


            // Checking if we are exceeding Image width or Height
            if(this.pixelCoord.x + (this.spriteSize.x * this.frameIndex) > this.sheet.width - this.spriteSize.x)
            {
                this.pixelCoord.x = 0;
                this.frameIndex = 0;
                this.stage++;
            }

            var newPixelCoord = {x: this.pixelCoord.x + this.spriteSize.x * this.frameIndex, y: this.pixelCoord.y + this.spriteSize.y * this.stage};


            console.log(newPixelCoord);


            // Sending the Sprite data to the linked sprite renderer
            this.spriteRenderer.NewSprite(
                this.sheet,
                newPixelCoord,
                this.spriteSize.x, 
                this.spriteSize.y
            );

            // Reset the timer
            this.timer = 0;
        }
    }
}