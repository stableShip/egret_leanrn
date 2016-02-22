/**
 * Created by Administrator on 2016/2/20.
 */
module flappy_bird {
    /**
     * 可滚动的底图
     */
    export class WallMap extends egret.DisplayObjectContainer {
        /**顶部障碍*/
        public topWallArr:egret.Bitmap[] = [];
        /**底部障碍*/
        public botWallArr:egret.Bitmap[] = [];
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;
        /**纹理本身的高度*/
        private textureWidth:number;

        private textureHight:number;

        /**控制滚动速度*/
        private speed:number = 2;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        /**初始化*/
        private onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture:egret.Texture = RES.getRes("finger_png");
            this.textureWidth = texture.textureWidth;//保留原始纹理的宽度，用于后续的计算
            var textureHeight = texture.textureHeight;
            this.start();
            var countObs:number = Math.ceil(this.stageW / this.textureWidth / 3) + 1;
            for (var i = 0; i < countObs; i++) {
                var random = Math.floor(Math.random() * 9 + 1);
                var topHeight = this.stageH * (75) / 100 * random / 10;
                var botHeight = this.stageH * (75) / 100 * (10 - random) / 10;
                if (topHeight > (this.textureWidth / 146 * 996)) {
                    topHeight = topHeight - (topHeight - this.textureWidth / 146 * 996);
                    botHeight = botHeight + (topHeight - this.textureWidth / 146 * 996);
                }
                if (botHeight > (this.textureWidth / 146 * 996)) {
                    topHeight = topHeight + (botHeight - this.textureWidth / 146 * 996);
                    botHeight = botHeight - (botHeight - this.textureWidth / 146 * 996);
                }
                var topObstacle = flappy_bird.createBitmapByName("finger_png");
                topObstacle.height = textureHeight * 0.75;
                topObstacle.width = this.textureWidth;
                topObstacle.x = this.stageW + this.textureWidth * i * 3;
                topObstacle.y = topHeight;
                topObstacle.rotation = 180;
                this.topWallArr.push(topObstacle);
                this.addChild(topObstacle);

                var botObstacle = flappy_bird.createBitmapByName("finger_png");
                botObstacle.height = textureHeight * 0.75;
                botObstacle.width = this.textureWidth;
                botObstacle.x = topObstacle.x - topObstacle.width * 2;
                botObstacle.y = this.stageH - botHeight;
                this.botWallArr.push(botObstacle);
                this.addChild(botObstacle);
            }

            //for (var i:number = 0; i < 3; i++) {
            //    var wall:egret.Bitmap = flappy_bird.createBitmapByName("finger_png");
            //    wall.x = this.textureWidth * i - (this.textureWidth * this.rowCount - this.stageW);
            //    wall.y = this.stageH - textureHeight;
            //    this.addChild(wall);
            //}
        }

        /**开始滚动*/
        public start():void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }

        /**逐帧运动*/
        private enterFrameHandler(event:egret.Event):void {
            for (var i:number = 0; i < this.topWallArr.length; i++) {
                var topBgBmp:egret.Bitmap = this.topWallArr[i];
                var botBgBmp:egret.Bitmap = this.botWallArr[i];
                botBgBmp.x -= 3;
                topBgBmp.x -= 3;
                if (topBgBmp.x < 0 - topBgBmp.width) {
                    var topHeight, myRandom, botHeight, width, stageW, stageH
                    stageW = this.stageW;
                    stageH = this.stageH;
                    width = stageW / 7.5;
                    myRandom = Math.floor(Math.random() * 9 + 1);
                    topHeight = stageH * (75) / 100 * myRandom / 10;
                    botHeight = stageH * (75) / 100 * (10 - myRandom) / 10;
                    if (topHeight > (width / 146 * 996)) {
                        topHeight = topHeight - (topHeight - width / 146 * 996);
                        botHeight = botHeight + (topHeight - width / 146 * 996);
                    }
                    if (botHeight > (width / 146 * 996)) {
                        topHeight = topHeight + (botHeight - width / 146 * 996);
                        botHeight = botHeight - (botHeight - width / 146 * 996);
                    }
                    topBgBmp.x = this.topWallArr[this.topWallArr.length - 1].x + topBgBmp.width * 3;
                    botBgBmp.x = this.botWallArr[this.botWallArr.length - 1].x + botBgBmp.width * 3;
                    topBgBmp.y = topHeight;
                    botBgBmp.y = stageH - botHeight;

                    this.botWallArr.shift();
                    this.topWallArr.shift();
                    this.botWallArr.push(botBgBmp);
                    this.topWallArr.push(topBgBmp);
                }
            }
        }

        /**暂停滚动*/
        public pause():void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
    }

}