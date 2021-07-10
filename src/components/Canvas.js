import React, { useRef, useEffect } from 'react';
import "./Canvas.css";

function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const g = 980;
    
    var ball = new Ball(canvas.width/2, canvas.height/2, 70, 'blue');
    
    ball.draw();
    animate();
    

    contextRef.current = ctx;
    
    function Ball(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.vy = 0;
      this.radius = radius;
      this.color = color;
  
      this.fall = function() {
        if (this.y + this.radius >= canvas.height) {
          if (Math.abs(this.vy) <= 0.00001) {
            this.vy = 0;
            this.y = canvas.height - radius;
          }
          if (Math.abs(this.vy) > 0.00001) {
            console.log(" hit : " , Math.abs(this.vy));
            this.calculateVy('hit');
            this.calculateY();
          }
        } else {
          this.calculateVy();
          this.calculateY();
        }
        this.draw();
      };

      this.calculateVy = function(direction) {
        if (direction === "hit") {
          this.vy = -this.vy * 0.95;
          console.log("hit");
        } else {
          this.vy += g/60;
        }
      }

      this.calculateY = function() {
        this.y += (this.vy/60) + g/7200;
      }
  
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ball.fall();
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
    />
  )
}

export default Canvas;
