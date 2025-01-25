import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FirendModelComp } from "./model/FirendModelComp";
import { FirendBllComp, FirendBllSystem } from "./bll/FirendBll";
import { FirendViewComp } from "./view/FirendViewComp";

/** firend 模块 */
@ecs.register('FirendEntity')
export class FirendEntity extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    FirendModel!: FirendModelComp;

    /** ---------- 业务层 ---------- */
    FirendBll!: FirendBllComp;
    FirendSys!: FirendBllSystem;

    /** ---------- 视图层 ---------- */
    FirendView!: FirendViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(FirendModelComp);
    }
}