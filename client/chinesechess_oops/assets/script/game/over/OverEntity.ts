import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { OverViewComp } from "./view/OverViewComp";
import { OverBllSystem, OverBllComp } from "./bll/OverBll";

/** over 模块 */
@ecs.register('OverEntity')
export class OverEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
    OverBll!: OverBllComp;
    OverBllSys!: OverBllSystem;

    /** ---------- 视图层 ---------- */
    OverView!: OverViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(OverBllComp);
    }
}