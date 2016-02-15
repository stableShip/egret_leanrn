/**
 * Created by Administrator on 2016/2/14.
 */
class Bird extends egret.Bitmap {
    public constructor(pic:string) {
        super()
        this.texture = RES.getRes(pic);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.birdRise, this);//点击按钮开始游戏
        this.addEventListener(egret.Event.ENTER_FRAME, this.birdFail, this);
    }

    private birdRise() {
        this.y -= 5
    }

    private birdFail() {
        this.y += 1
    }
}

