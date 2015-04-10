class Demo2 extends egret.DisplayObjectContainer {

    /* test bitmap */
    private logo: egret.Bitmap;

    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    /**after game lanchering, invoke this function*/
    public startGame(): void {
        
        //alert("hello!");
        this.loadResource();
       
    }
    private loadResource(): void {
        //using resource manager loading resouce
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("demo2");
    }
    /* it can be used when completed loading */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        this.logo = new egret.Bitmap();//create bitmap
        this.logo.texture = RES.getRes("egretIcon");//texture configuration
        this.addChild(this.logo);//adding to list
        this.startAnimation();
    }
    private startAnimation(): void {
        var tw = egret.Tween.get(this.logo);
        tw.to({ x: 280, y: 0 }, 500).to({ x: 280, y: 300 }, 500).to({ x: 0, y: 300 }, 500).to({ x: 0, y: 0 }, 500);
        tw.call(this.startAnimation, this);
    }
}