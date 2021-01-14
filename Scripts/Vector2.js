class Vector2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    static up = new Vector2(0, -1);
    static right = new Vector2(0, 1);
    static down = new Vector2(0, 0);
    static left = new Vector2(-1, 0);
    static zero = new Vector2(0, 0);
    static one = new Vector2(1, 1);

    Plus(vector = new Vector2())
    {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    Less(vector = new Vector2())
    {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    Add(vector = new Vector2())
    {
        this.x += vector.x;
        this.y += vector.y;
    }

    Substract(vector = new Vector2())
    {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    Equal(vector)
    {
        return this.x == vector.x && this.y == vector.y;
    }

    MultiplyWith(vector)
    {
        return new Vector2(this.x * vector.x, this.y * vector.y);
    }

    MultiplyBy(value)
    {
        return new Vector2(this.x * value, this.y * value);
    }

    DivideWith(vector)
    {
        var v = new Vector2(this.x, this.y);
        v.x /= vector.x;
        v.y /= vector.y;
        return v;
    }

    DivideBy(value)
    {
        var v = new Vector2(this.x, this.y);
        v.x /= value;
        v.y /= value;
        return v;
    }

    static Angle(v1, v2)
    {
        return Math.atan2(v1.x * v2.y - v1.y * v2.x, v1.x * v2.x + v1.y * v2.y);
    }

    Magnitude()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Normalized()
    {
        var m = this.Magnitude();
        if (m > 0) 
        {
            var v = this.DivideBy(m);
            return new Vector2(v.x, v.y);
        }
        else return Vector2.zero;
    }

    static Lerp(origin, target, value)
    {
        return new Vector2
        (
            lerp(origin.x, target.x, value),
            lerp(origin.y, target.y, value)
        );
    }
}