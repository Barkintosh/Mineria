class Physics
{
    static id = 0;
    static GetID()
    {
        return Physics.id++;
    }

    static checks = [];

    static Update()
    {
        var colliders = FindComponents("BoxCollider");
        colliders = colliders.concat(FindComponents("CircleCollider"));
        for(let i = 0; i < colliders.length; i++)
        {
            for(let j = 0; j < colliders.length; j++)
            {
                if(i != j && !Physics.AlreadyCheck(colliders[i].id, colliders[j].id))
                {
                    Physics.checks[Physics.checks.length] = 
                    {
                        c1id:colliders[i].id,
                        c2id:colliders[j].id
                    };
    
                    if(colliders[i].Overlap(colliders[j]) && colliders[j].Overlap(colliders[i]))
                    {
                        if(!colliders[i].Know(colliders[j]))
                        {
                            Physics.BeginOverlap(colliders[i], colliders[j]);
                        }
                    }
                    else
                    {
                        if(colliders[i].Know(colliders[j]))
                        {
                            Physics.EndOverlap(colliders[i], colliders[j]);
                        }
                    }
                }
            }
        }
        Physics.checks = [];
    }

    static AlreadyCheck(id1, id2)
    {
        for(var i = 0; i < Physics.checks.length; i++)
        {
            if(Physics.checks[i].c1id == id1 && Physics.checks[i].c2id == id2)
                return true;
            else if(Physics.checks[i].c2id == id1 && Physics.checks[i].c1id == id2)
                return true;
        }
        return false;
    }

    static BeginOverlap(c1, c2)
    {
        c1.OnOverlapEnter(c2);
        c2.OnOverlapEnter(c1);
    }

    static EndOverlap(c1, c2)
    {
        c1.OnOverlapExit(c2);
        c2.OnOverlapExit(c1);
    }
}