(()=>{"use strict";const t=1024,i=576;class s{constructor(){this.background1=new Image,this.background2=new Image,this.background1.src="assets/images/background-night.png",this.background2.src="assets/images/background-night.png",this.pos={x:0,y:0},this.background1.onload=()=>{this.background1.width=t,this.background1.height=i},this.background2.onload=()=>{this.background2.width=t,this.background2.height=i}}draw(t){null==t||t.drawImage(this.background1,this.pos.x,this.pos.y,this.background1.width,this.background1.height),null==t||t.drawImage(this.background2,1024-Math.abs(this.pos.x),this.pos.y,this.background2.width,this.background2.height)}update(t){this.pos.x-=3*t/7,this.pos.x<=-1024&&(this.pos.x=0)}}class e{constructor(t){this.image=new Image,this.angle=0,this.frame=0,this.maxframe=3,this.animationTime=0,this.pos=t,this.gravity=.08,this.speed=0,this.height=40,this.width=56,this.image.src="assets/images/yellowbird-animate.png",this.image.onload=()=>{this.originWidth=this.image.width,this.originHeight=this.image.height},this.center={x:this.pos.x+this.width/2,y:this.pos.y+this.height/2}}draw(t){t.save(),t.translate(this.center.x,this.center.y),t.rotate(this.angle),null==t||t.drawImage(this.image,this.frame*this.originWidth/this.maxframe,0,this.originWidth/this.maxframe,this.originHeight,-this.width/2,-this.height/2,this.width,this.height),t.restore()}update(t){this.animationTime+=1*t/7,this.animationTime>=20&&(this.animationTime=0,this.frame=(this.frame+1)%this.maxframe),this.angle=Math.min(this.angle+Math.PI*t/1400,Math.PI/3),this.speed+=this.gravity*t/7,this.pos.y+=this.speed*t/7,this.pos.y<0&&(this.pos.y=0),this.pos.y+this.height>=576&&(this.pos.y=576-this.height),this.center.y=this.pos.y+this.height/2}checkTouchGround(){return this.pos.y+this.height>=i}updateCenter(){this.center={x:this.pos.x+this.width/2,y:this.pos.y+this.height/2}}getWidth(){return this.width}getHeight(){return this.height}getCenter(){return this.center}getPos(){return this.pos}setPos(t){this.pos.x=t.x,this.pos.y=t.y}setX(t){this.pos.x=t}setY(t){this.pos.y=t}setSpeed(t){this.speed=t}getSpeed(){return this.speed}setAngle(t){this.angle=t}}class h{constructor(t,i,s){this.image=new Image,this.state=!1,this.type=t,this.height=s,this.width=70,this.pos=i,"up"==this.type?this.image.src="assets/images/up-pipe.png":this.image.src="assets/images/down-pipe.png",this.center={x:this.pos.x+this.width/2,y:this.pos.y+this.height/2}}draw(t){if("down"==this.type){const i=this.image.height/this.image.width*this.width;i>this.height?null==t||t.drawImage(this.image,this.pos.x,this.pos.y-(i-this.height),this.width,i):null==t||t.drawImage(this.image,this.pos.x,this.pos.y,this.width,i)}else{const i=this.image.height/this.image.width*this.width;null==t||t.drawImage(this.image,this.pos.x,this.pos.y,this.width,i)}}update(t){this.pos.x-=3*t/7,this.center.x-=3*t/7}checkCollide(t){const i=Math.abs(this.center.x-t.getCenter().x),s=Math.abs(this.center.y-t.getCenter().y);return i<=this.width/2+t.getWidth()/2&&s<=this.height/2+t.getHeight()/2}checkScore(t){return!this.state&&(t.getCenter().x-this.center.x>this.width/2+t.getWidth()/2&&(this.state=!0,!0))}updateCenter(){this.center={x:this.pos.x+this.width/2,y:this.pos.y+this.height/2}}getWidth(){return this.width}getHeight(){return this.height}setHeight(t){this.height=t}getCenter(){return this.center}getPos(){return this.pos}setPos(t){this.pos.x=t.x,this.pos.y=t.y}setState(t){this.state=t}setX(t){this.pos.x=t}setY(t){this.pos.y=t}}class a{constructor(){this.hit=document.getElementById("hit-audio"),this.wing=document.getElementById("wing-audio"),this.die=document.getElementById("die-audio"),this.point=document.getElementById("point-audio"),this.coin=document.getElementById("coin-audio"),this.wing.playbackRate=1.5,this.point.playbackRate=2,this.coin.playbackRate=2}playHitAudio(){this.hit.play()}playWingAudio(){this.wing.play()}playDieAudio(){this.die.play()}playPointAudio(){this.point.play()}playCoinAudio(){this.coin.play()}}class n{constructor(t){this.frame=0,this.maxFrame=10,this.height=50,this.width=50,this.image=new Image,this.animationTime=0,this.state=!1,this.pos=t,this.image.src="assets/images/coin-animation.png",this.center={x:this.pos.x+this.width/2,y:this.pos.y+this.height/2}}draw(t){this.state||t.drawImage(this.image,this.frame*this.image.width/this.maxFrame,0,this.image.width/this.maxFrame,this.image.height,this.pos.x,this.pos.y,this.width,this.height)}update(t){this.animate(t),this.pos.x-=3*t/7,this.center.x-=3*t/7}animate(t){this.animationTime+=1*t/7,this.animationTime>=10&&(this.animationTime=0,this.frame=(this.frame+1)%this.maxFrame)}collide(t){if(this.state)return!1;const i=Math.abs(this.center.x-t.getCenter().x),s=Math.abs(this.center.y-t.getCenter().y);return i<=this.width/2+t.getWidth()/2&&s<=this.height/2+t.getHeight()/2}updateCenter(){this.center={x:this.pos.x+this.width/2,y:this.pos.y+this.height/2}}getWidth(){return this.width}getHeight(){return this.height}getCenter(){return this.center}getPos(){return this.pos}setPos(t){this.pos.x=t.x,this.pos.y=t.y}setState(t){this.state=t}setX(t){this.pos.x=t}setY(t){this.pos.y=t}}class o{constructor(){this.background=new s,this.bird=new e({x:100,y:288}),this.pipes=[],this.coins=[],this.extraPipes=[],this.extraCoins=[],this.timeToSpawnPipe=0,this.score=0,this.highScore=0,this.gameOverImage=new Image,this.message=new Image,this.startButton=new Image,this.gameInitial=!0,this.audios=new a,this.clock=Date.now(),this.deltaTime=0,this.canvas=document.getElementById("mycanvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.height=i,this.canvas.width=t,this.message.src="assets/images/message.png",this.startButton.src="assets/images/start-button.png",this.gameOverImage.src="assets/images/gameover.png",this.gameOverImage.onload=()=>{this.gameOverImage.width=450,this.gameOverImage.height=100},this.message.onload=()=>{this.message.width=385,this.message.height=550}}run(){const t=Date.now();this.deltaTime=t-this.clock,this.clock=t,this.gameInitial?this.handleGameInitial():(this.bird.checkTouchGround()&&this.handleBirdTouchGround(),this.gameOver?this.handleGameOver():(this.increaseTimeToSpawnPipes(),this.bird.update(this.deltaTime),this.background.update(this.deltaTime),this.updatePipes(this.deltaTime),this.updateCoins(this.deltaTime),this.drawGame())),this.drawScore(),requestAnimationFrame((()=>this.run()))}spawnPipe(){const t=Math.floor(200*Math.random())+120,i=Math.floor(100*Math.random())+100;if(this.extraPipes.length>=2){const s=this.extraPipes.shift(),e=this.extraPipes.shift();null!=s&&null!=e&&(s.setPos({x:this.canvas.width,y:0}),s.setHeight(t),s.setState(!1),s.updateCenter(),e.setPos({x:this.canvas.width,y:this.canvas.height-(this.canvas.height-t-i)}),e.setHeight(this.canvas.height-t-i),e.setState(!1),e.updateCenter(),this.pipes.push(s),this.pipes.push(e))}else console.log("Create new pipe"),this.pipes.push(new h("down",{x:this.canvas.width,y:0},t)),this.pipes.push(new h("up",{x:this.canvas.width,y:this.canvas.height-(this.canvas.height-t-i)},this.canvas.height-t-i));this.spawnCoin(1024+Math.floor(100*Math.random())+150)}spawnCoin(t){const i=Math.floor(350*Math.random())+100;if(this.extraCoins.length>0){const s=this.extraCoins.shift();null!=s&&(s.setState(!1),s.setPos({x:t,y:i}),s.updateCenter(),this.coins.push(s))}else console.log("Create new coin"),this.coins.push(new n({x:t,y:i}))}initial(){for(this.highScore=Math.max(this.highScore,this.score);this.pipes.length;){const t=this.pipes.shift();null!=t&&this.extraPipes.push(t)}for(;this.coins.length;){const t=this.coins.shift();null!=t&&this.extraCoins.push(t)}this.timeToSpawnPipe=0,this.bird.setY(288),this.bird.setSpeed(0),this.score=0,this.gameOver=!1}drawGameOver(){this.ctx&&this.ctx.drawImage(this.gameOverImage,this.canvas.width/2-this.gameOverImage.width/2,this.canvas.height/2-this.gameOverImage.height/2,this.gameOverImage.width,this.gameOverImage.height)}drawMessage(){this.ctx&&this.ctx.drawImage(this.message,this.canvas.width/2-this.message.width/2,this.canvas.height/2-this.message.height/2,this.message.width,this.message.height)}drawScore(){this.ctx&&(this.ctx.fillStyle="black",this.ctx.beginPath(),this.ctx.font="30px Audiowide",this.ctx.fillText(`High Score: ${this.highScore}`,10,50),this.ctx.fillText(`Score: ${this.score}`,10,100))}drawStartButton(){this.ctx&&this.ctx.drawImage(this.startButton,800,400,200,100)}drawGame(){this.ctx&&(this.background.draw(this.ctx),this.coins.map((t=>{this.ctx&&t.draw(this.ctx)})),this.pipes.map((t=>{this.ctx&&t.draw(this.ctx)})),this.bird.draw(this.ctx))}updateCoins(t){let i=0;if(this.coins.map((s=>{s.update(t),s.collide(this.bird)&&(this.score+=10,s.setState(!0),this.audios.playCoinAudio()),s.getWidth()+s.getPos().x<0&&(i+=1)})),i>0)for(let t=0;t<i;t++){const t=this.coins.shift();null!=t&&this.extraCoins.push(t)}}updatePipes(t){let i=0,s=0;if(this.pipes.map((e=>{e.update(t),e.checkScore(this.bird)&&(s+=.5),e.checkCollide(this.bird)&&(this.audios.playHitAudio(),this.audios.playDieAudio(),this.gameOver=!0),e.getWidth()+e.getPos().x<0&&(i+=1)})),s&&(this.score+=Math.floor(s),this.audios.playPointAudio()),i>0)for(let t=0;t<i;t++){const t=this.pipes.shift();null!=t&&this.extraPipes.push(t)}}increaseTimeToSpawnPipes(){this.timeToSpawnPipe+=1*this.deltaTime/7,this.timeToSpawnPipe>=150&&(this.timeToSpawnPipe=0,this.spawnPipe())}handleGameOver(){this.bird.update(this.deltaTime),this.ctx&&(this.background.draw(this.ctx),this.pipes.map((t=>{this.ctx&&t.draw(this.ctx)})),this.coins.map((t=>{this.ctx&&(t.animate(this.deltaTime),t.draw(this.ctx))})),this.bird.draw(this.ctx)),this.drawGameOver(),this.drawStartButton()}handleGameInitial(){this.background.update(this.deltaTime),this.background.draw(this.ctx),this.drawMessage(),this.drawStartButton()}handleBirdTouchGround(){this.gameOver||(this.audios.playHitAudio(),this.audios.playDieAudio()),this.gameOver=!0}handleClickInput(){this.canvas.addEventListener("click",(t=>{this.gameOver||(this.audios.playWingAudio(),this.bird.setSpeed(-3),this.bird.setAngle(-Math.PI/3));const i=this.canvas.getBoundingClientRect();t.clientX-i.left>=800&&t.clientX-i.left<=1e3&&t.clientY-i.top>=400&&t.clientY-i.top<=500&&(this.gameOver&&(this.audios.playWingAudio(),this.initial()),this.gameInitial&&(this.audios.playWingAudio(),this.gameInitial=!1))}))}handleKeyInput(){window.addEventListener("keypress",(t=>{" "!=t.key||this.gameOver||(this.audios.playWingAudio(),this.bird.setSpeed(-3),this.bird.setAngle(-Math.PI/3))}))}}new class{constructor(){this.gameManager=new o,this.gameManager.handleClickInput(),this.gameManager.handleKeyInput(),requestAnimationFrame((()=>this.gameManager.run()))}}})();