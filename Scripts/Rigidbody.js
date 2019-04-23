class Rigidbody
{
    constructor(transform, mass = 1)
    {
        this.transform = transform;
        this.velocity = {x: 0, y: 0};
        this.gravityScale = 1;
        this.mass = mass;
    }

    Update()
    {
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;

        this.velocity.y += this.gravityScale * this.mass;

        this.transform.rotation = -Math.atan2(this.velocity.x, this.velocity.y) * 180/Math.PI;
    }

    AddForce(vector)
    {
        this.velocity.x += vector.x;
        this.velocity.y += vector.y;
    }
}