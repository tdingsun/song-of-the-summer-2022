export class Flare {
    discs = [];
    discNum = 9;
    t = 0;
    context;
    canvas;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.discs = [];
        this.discNum = 9;
        this.t = 0;
    }

    draw(obj) {
        this.context.globalCompositeOperation = "screen";

        var dist = 1 - 
          Math.sqrt(Math.pow((obj.x-this.canvas.width/2),2)+Math.pow((obj.y-this.canvas.height/2),2)) /
          Math.sqrt(Math.pow((this.canvas.width/2),2)+Math.pow((this.canvas.height/2),2));
  
        for (var i = 0; i < this.discs.length; i++) {
          this.context.beginPath();
          var hue = this.discs[i].hue;
          var grad = this.context.createRadialGradient(this.discs[i].x, this.discs[i].y,0,this.discs[i].x, this.discs[i].y,this.discs[i].dia);
          grad.addColorStop(0,"hsla("+hue+",100%,90%,"+0*dist+")");
          grad.addColorStop(0.9,"hsla("+hue+",100%,90%,"+0.15*dist+")");
          grad.addColorStop(1,"hsla("+hue+",100%,90%,0)");
          this.context.fillStyle = grad;
          this.context.arc(this.discs[i].x, this.discs[i].y, this.discs[i].dia, 0, Math.PI*2);
          this.context.closePath();
          this.context.fill();
          if (i == 0) {
  
            this.context.beginPath();
            var grad = this.context.createRadialGradient(this.discs[i].x, this.discs[i].y,0,this.discs[i].x, this.discs[i].y,this.discs[i].dia*2);
            grad.addColorStop(0,"rgba(200,220,255,"+0.2*dist+")");
            grad.addColorStop(1,"rgba(200,220,255,0)");
            this.context.fillStyle = grad;
            this.context.arc(this.discs[i].x, this.discs[i].y, this.discs[i].dia*2, 0, Math.PI*2);
            this.context.closePath();
            this.context.fill();
  
            this.context.beginPath();
            var ease = function (a,b,t) {
              return (b - a) * (1-Math.pow(t-1,2)) + a;
            }
            var spec = ease((this.discs[i].dia/2.5)/2,(this.discs[i].dia/2.5),dist);
            var sdist = (1-Math.pow(Math.abs(dist-1),3))
            var grad = this.context.createRadialGradient(this.discs[i].x, this.discs[i].y,0,this.discs[i].x, this.discs[i].y,spec);
            grad.addColorStop(0.2*sdist,"rgba(255,255,255,"+sdist+")");
            grad.addColorStop(0.6,"hsla("+this.discs[i].hue+",100%,75%,"+.3*sdist+")");
            grad.addColorStop(1,"hsla("+this.discs[i].hue+",100%,40%,0)");
            this.context.fillStyle = grad;
            this.context.arc(this.discs[i].x, this.discs[i].y, this.discs[i].dia/2.5, 0, Math.PI*2);
            this.context.closePath();
            this.context.fill();
  
            this.context.beginPath();
            var grad = this.context.createLinearGradient(
              this.discs[i].x-this.discs[i].dia*1.5, this.discs[i].y,
              this.discs[i].x+this.discs[i].dia*1.5, this.discs[i].y);
            grad.addColorStop(0,"rgba(240,250,255,0)");
            grad.addColorStop(.5,"rgba(240,250,255,"+.4*dist*dist*dist+")");
            grad.addColorStop(1,"rgba(240,250,255,0)");
            this.context.fillStyle = grad;
            this.context.fillRect(
              this.discs[i].x-this.discs[i].dia*1.5, this.discs[i].y-2, 
              this.discs[i].dia*3, 4);
            this.context.closePath();
            this.context.fill();
  
            this.context.beginPath();
            var grad = this.context.createLinearGradient(
              this.discs[i].x, this.discs[i].y-this.discs[i].dia*1.5,
              this.discs[i].x, this.discs[i].y+this.discs[i].dia*1.5);
            grad.addColorStop(0,"rgba(240,250,255,0)");
            grad.addColorStop(.5,"rgba(240,250,255,"+.4*dist*dist*dist+")");
            grad.addColorStop(1,"rgba(240,250,255,0)");
            this.context.fillStyle = grad;
            this.context.fillRect(
              this.discs[i].x-2, this.discs[i].y-this.discs[i].dia*1.5,
              4 ,this.discs[i].dia*3);
            this.context.closePath();
            this.context.fill();
  
          }
        }
    }

    update(obj) {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
      for (var i = 0; i <= this.discNum; i++) {
        var temp = {
            x: undefined,
            y: undefined,
            dia: undefined,
            hue: undefined
        };
        var j = i - this.discNum / 2;
        temp.x = (this.canvas.width/2-obj.x)*(j/this.discNum*2)+this.canvas.width/2;
        temp.y = (this.canvas.height/2-obj.y)*(j/this.discNum*2)+this.canvas.height/2;
        if (this.t == 0) {
          temp.dia = (Math.pow(Math.abs(10*(j/this.discNum)),2)*3)+110+(Math.random()*100-100);
          temp.hue = Math.round(Math.random()*360);
          this.discs[i] = temp;
        }
        else {
          this.discs[i].x = temp.x;
          this.discs[i].y = temp.y;
        }
      }
      this.t += 1;
      this.draw(obj);
    }

}