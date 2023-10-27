import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
// import { Val } from "../libs/val";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item: Array<Item> = []
  // private _beat: Val = new Val(0)

  constructor(opt:any) {
    super(opt)

    const num = Func.val(8, 20)
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-item')
      this.el.prepend(el)

      this._item.push(new Item({
        el: el,
        id: i,
      }))

      if(i % 2 === 0) {
        el.classList.add('-circle')
      }
    }
  }

  protected _update():void {
    super._update()

    const mx = MousePointer.instance.easeNormal.x
    const my = MousePointer.instance.easeNormal.y
    const sw = Func.sw()
    const sh = Func.sh()
    // const radius = Math.min(sh, sw) * Util.map(my, 0.25, 0.6, -1, 1)
    const centerX = sw / 2 + (mx * sw * -0.1)
    const centerY = sh / 2 + (my * sh * -0.1)

    // if(this._c % 60 === 0) {
    //   Tween.a(this._beat, {
    //     val: [0, 1]
    //   }, 0.2, 0, Tween.Power3EaseOut, null, null, () => {
    //     Tween.a(this._beat, {
    //       val: 0
    //     }, 0.5, 0, Tween.Power3EaseInOut)
    //   })
    // }
    // const tgBeat = this._c % 60 == 0 ? 1 : 0
    // this._beat.val += (tgBeat - this._beat.val) * 0.1

    this._item.forEach((item, i) => {
      const radius = Math.min(sh, sw) * Util.map(my, 0.1, 0.45, -1, 1) * (i % 2 == 0 ? 1 : 0.75)

      const w = (Math.max(sw, sh) / this._item.length) * Func.val(0.5, 0.5) * Util.map(Math.sin(this._c * 0.05 * (i % 2 == 0 ? 1 : -1)), 0.2, 2.5, -1, 1)
      const h = w * 1

      const rad = Util.radian(this._c * 0.5 * (i % 2 == 0 ? 1 : -1) + i * (360 / this._item.length))
      const x = Math.sin(rad) * radius - w * 0
      const y = Math.cos(rad) * radius - h * 0
      const dx = x
      const dy = y
      const ang = Math.atan2(dy, dx)
      Tween.set(item.el, {
        x: centerX + x - w * 0.5,
        y: centerY + y - h * 0.5,
        width: w,
        height: h,
        rotationZ: Util.degree(ang) + 90 + this._c * 2 * (i % 2 == 0 ? 1 : -1),
      })
    })
  }
}