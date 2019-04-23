function UpdateCollisions()
{
    var colliders = FindComponents("BoxCollider");

    for(let i = 0; i < colliders.length; i++)
    {
        colliders[i].overlaping = false;
        for(let j = 0; j < colliders.length; j++)
        {
            if(colliders[i].BoxOverlap(colliders[j]))
            {
                colliders[i].OnCollision(colliders[j]);
                colliders[j].OnCollision(colliders[i]);
            }
        }
    }
}