var tree = [];
var angle = 0.2;

function setup()
{
  frameRate(60);
  createCanvas(window.innerWidth - 4, window.innerHeight - 4);
  tree[0] = new Branch(new Vec2D(width / 2, height), new Vec2D(width / 2, height - height / 5));
}

var time = 0;

function draw()
{
  background(32);
  stroke(255);
  strokeWeight(1.5);
  for(var i = tree.length - 1; i >= 0; i--)
  {
    tree[i].show();
    tree[i].branch(tree, angle);
  }
  var noloop = true;
  for(var i = 0; i < tree.length; i++)
  {
    if(!tree[i].branched)
    {
      noloop = false;
    }
  }
  if(noloop)
  {
    noLoop();
  }
  time += 1 / frameRate();
}

function mouseClicked()
{
  tree = [];
  tree[0] = new Branch(new Vec2D(width / 2, height), new Vec2D(width / 2, height - 300));
  angle += 0.05;
  loop();
}

class Vec2D
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  mag()
  {
    return sqrt(this.x * this.x + this.y * this.y);
  }

  normalize()
  {
    var mag = this.mag();
    this.x /= mag;
    this.y /= mag;
  }

  limit(mag)
  {
    if(this.mag() > mag)
    {
      this.normalize()
      this.x *= mag;
      this.y *= mag;
    }
  }

  add(vec)
  {
    this.x += vec.x;
    this.y += vec.y;
  }

  mult(val)
  {
    this.x *= val;
    this.y *= val;
  }

  zero()
  {
    this.x = 0;
    this.y = 0;
  }

  rot(angle)
  {
    var x = this.x;
    this.x = x * cos(angle) - this.y * sin(angle);
    this.y = x * sin(angle) + this.y * cos(angle);
  }
}

function rand(maxVal)
{
  return round(random(maxVal));
}

function Branch(start, end)
{
  this.start = start;
  this.end = end;
  this.branched = false;

  this.show = function()
  {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  this.branch = function(array, angle)
  {
    if(!this.branched)
    {
      var dir1 = new Vec2D(this.end.x - this.start.x, this.end.y - this.start.y);
      dir1.mult(0.67);
      if(dir1.mag() >= 4)
      {
        var dir2 = new Vec2D(dir1.x, dir1.y);
        dir1.rot(angle);
        dir2.rot(-angle);
        var branchA = new Branch(this.end, new Vec2D(this.end.x + dir1.x,
          this.end.y + dir1.y));
        var branchB = new Branch(this.end, new Vec2D(this.end.x + dir2.x,
          this.end.y + dir2.y));
        array.push(branchA);
        array.push(branchB);
      }
      this.branched = true;
    }
  }
}
