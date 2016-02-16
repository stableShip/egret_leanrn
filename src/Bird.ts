/**
 * Created by Administrator on 2016/2/14.
 */
module bird {
    export class Bird extends egret.Bitmap {
        public constructor(pic:string) {
            super()
            this.texture = RES.getRes(pic);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.birdRise, this);//点击按钮开始游戏
            this.addEventListener(egret.Event.ENTER_FRAME, this.birdFail, this);
        }

        private birdRise() {
            this.y -= 6
            this.x -= 1
        }

        private birdFail() {
            this.y += 1
            this.x += 1
        }
    }
}
