class Collider extends Component
{
    constructor()
    {
        super();
        this.overlaping = false;
        this.wasOverlapping = false;
        this.isTrigger = false;
        this.offset = new Vector2();
    }

    Update()
    {
        if(!this.overlaping && this.wasOverlapping)
        {
            this.wasOverlapping = false;
            this.overlaping = false;
        }

        if(this.debug) this.Draw();
    }

    OnCollision(other)
    {
        this.overlaping = true;
        if(!this.wasOverlapping)
        {
            this.wasOverlapping = true;
            for(let i = 0; i < this.gameObject.components.length; i++)
            {
                if(typeof this.gameObject.components[i].OnCollision !== 'undefined')
                    this.gameObject.components[i].OnCollision(other);
            }
        }
    }
}