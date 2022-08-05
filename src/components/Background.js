import React from 'react';
import './Background.css'

function Background() {

    class Ball {
        constructor(effect) {
            this.effect = effect;
            this.x = this.effect.width * 0.5;
            this.y = this.effect.height * 0.5;
            this.radius = Math.random() * 80 + 40;
            this.speedX = (Math.random() - 0.5) * Math.ceil(window.innerWidth/1000);
            this.speedY = (Math.random() - 0.5) * Math.ceil(window.innerWidth/1000);
        }
        update() {
            if(this.x < this.radius - 15 || this.x > this.effect.width - this.radius + 15) this.speedX *= -1;
            if(this.y < this.radius - 15 || this.y > this.effect.height - this.radius + 15) this.speedY *= -1;
            this.x += this.speedX;
            this.y += this.speedY;
        }
        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
        }
    }

    class MetaballsEffect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.metaballsArray = [];
        }
        init(number) {
            for (let index = 0; index < number; index++) {
                this.metaballsArray.push(new Ball(this));
            }
        }
        update() {
            this.metaballsArray.forEach(metaball => metaball.update());
        }
        draw(context) {
            this.metaballsArray.forEach(metaball => metaball.draw(context));
        }
        reset(newWidth, newHeight) {
            this.width = newWidth;
            this.height = newHeight;
            this.metaballsArray = [];
        }
    }

    const animate = () => {
        var background = document.getElementById("bg");
        var ctx = background.getContext("2d");
        ctx.fillStyle = '#1e8e0b';
        ctx.clearRect(0, 0, background.width, background.height);
        effect.update();
        effect.draw(ctx);
        requestAnimationFrame(animate);

    }

    var effect = new MetaballsEffect(window.innerWidth, window.innerHeight);

    const onLoad = () => {
        var background = document.getElementById("bg");
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        effect.init(Math.floor(window.innerWidth/25));
        console.log(effect);
        animate();
    }
    
    const onResize = () => {
        var background = document.getElementById("bg");
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        effect.reset(background.width , background.height);
        effect.init(Math.floor(window.innerWidth/25));
    }

    window.addEventListener('load', onLoad);
    window.addEventListener('resize', onResize);

    return (
        <canvas id="bg">
            
        </canvas>
    );
}

export default Background;