/**
 * Created by Administrator on 2016/2/14.
 */
module flappy_bird {
    export class Bird extends egret.Bitmap {

        public isFall:Boolean = true;

        public constructor(pic:string) {
            super()
            this.texture = RES.getRes(pic);
            this.width = this.texture.textureWidth * 0.5;
            this.height = this.texture.textureHeight * 0.5;
        }

    }
}
