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

    var ball = new Ball(canvas.width/2, 0, 70, 'blue', 0.555);
    
    ball.draw();
    animate();
    
    contextRef.current = ctx;

    var MouseTouchTracker = function(canvas, callback) {
      
      function processEvent(event) {
        var elem = canvas.getBoundingClientRect();
        var topOffset = elem.top;
        var leftOffset = elem.left;
  
        if (event.touches) {
          return {
            x: event.touches[0].clientX - leftOffset,
            y: event.touches[0].clientY - topOffset
          }
        }
      }

    };
    
    function Ball(x, y, radius, color, elasticity) {
      this.x = x;
      this.y = y;
      this.vy = 0;
      this.vx = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.elasticity = elasticity;
      this.isOut = false;
      this.radius = radius;
      this.color = color;
      this.isDragging = false;
  
      this.fall = function() {
        if (this.y + this.radius >= canvas.height) {
          if (Math.abs(this.vy) <= 0.1) {
            this.vy = 0;
            this.y = canvas.height - radius;
          }
          if (Math.abs(this.vy) > 0.1) {
            this.calculateVy(this.elasticity, 'hit');
            this.calculateY();
          }
        } else {
          this.calculateVy(this.elasticity);
          this.calculateY();
        }
        this.draw();
      };

      this.calculateVy = function(elasticity = 1.0, direction = '') {
        if (direction === "hit") {
          this.vy = -this.vy * elasticity;
        } else {
          this.vy += g/60;
        }
      }

      this.calculateY = function() {
        this.y += (this.vy/60) + g/7200;
        if (this.y + radius >= canvas.height) {
          this.y = canvas.height - radius;
        }
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
