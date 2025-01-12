import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { PosBllComp } from "./bll/PosBll";
import {PosViewComp} from "./view/PosViewComp"

/** Pos 模块 */
@ecs.register('PosEntity')
export class PosEntity extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    // PosModel!: PosModelComp;

    /** ---------- 业务层 ---------- */
    PosBll!: PosBllComp;

    /** ---------- 视图层 ---------- */
    PosView!: PosViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(PosBllComp);
    }
}