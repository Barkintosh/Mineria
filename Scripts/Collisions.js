class Physics
{
    static Update()
    {
        var colliders = FindComponents("BoxCollider");
        colliders = colliders.concat(FindComponents("CircleCollider"));
         for(let i = 0; i < colliders.length; i++)
        {
            colliders[i].overlaping = false;
            for(let j = 0; j < colliders.length; j++)
            {
                if(colliders[i].Overlap(colliders[j]))
                {
                    colliders[i].OnCollision(colliders[j]);
                    colliders[j].OnCollision(colliders[i]);
                }
            }
        }
    }
}