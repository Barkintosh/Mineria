class Rigidbody
{
    constructor(gameObject, mass = 1)
    {
        this.gameObject = gameObject;
        this.velocity = {x: 0, y: 0};
        this.gravityScale = 1;
        this.mass = mass;
    }

    Update()
    {
        this.gameObject.Transform.position.x += this.velocity.x;
        this.gameObject.Transform.position.y += this.velocity.y;
        this.velocity.y += this.gravityScale * this.mass;
    }

    AddForce(vector)
    {
        this.velocity.x += vector.x;
        this.velocity.y += vector.y;
    }
}