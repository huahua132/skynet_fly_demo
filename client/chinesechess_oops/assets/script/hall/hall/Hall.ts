import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {HallModelComp} from "./model/HallModelComp"
import {HallBllComp} from "./bll/Hall"
import {HallViewComp} from "./view/HallViewComp"

/** Hall 模块 */
@ecs.register('HallEntity')
export class HallEntity extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    HallModel!: HallModelComp;

    /** ---------- 业务层 ---------- */
    HallBll!: HallBllComp;

    /** ---------- 视图层 ---------- */
    HallView!: HallViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(HallModelComp);
    }
}