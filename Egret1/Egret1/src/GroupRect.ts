class GroupRect extends egret.Sprite {
    public constructor() {
        super();
        this.createRects();
    }

    private _rects: Array<Rect>;

    private createRects() {
        this._rects = [];
        for (var i = 0; i < 4; i++) {
            var rect: Rect = new Rect();
            this._rects.push(rect);
            rect.x = rect.width * i;
            this.addChild(rect);
            rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRect,this);
        }
    }

    public _currentRow: number = 0;
    private onClickRect(evt: egret.TouchEvent) {

        evt.target.onRectClick();
        if (evt.target.type == RectType.NONCLICKABLE || this._currentRow!=(Data.getRectRow()-2)) {
            this.dispatchEventWith("gameOver");
        }
        else {
            this.dispatchEventWith("clickRight");
        }
    }
    private _currentBlackRectIndex: number = 0;

    public createBlackRect() {
       
        var n: number = Math.random();
        
        this._currentBlackRectIndex = Math.floor(n * 4);
        this.init();    
        this._rects[this._currentBlackRectIndex].type = RectType.CLICKABLE;
    }

    public init() {
        for (var i = 0; i < 4; i++){
            this._rects[i].type = RectType.NONCLICKABLE;
        }
    }

    public move() {
        
        this._currentRow++;
        if (this._currentRow == Data.getRectRow()) {
            this._currentRow = 0;
            this.createBlackRect();
        }
        this.y = this._currentRow * Data.getRectWidth();
    }
}