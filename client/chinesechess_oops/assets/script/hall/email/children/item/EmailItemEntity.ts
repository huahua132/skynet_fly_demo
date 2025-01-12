import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { EmailItemViewComp } from "./view/EmailItemViewComp";
import { EmailItemBllComp, EmailItemBllSystem } from "./bll/EmailItemBll";

/** emailItem 模块 */
@ecs.register('EmailItemEntity')
export class EmailItemEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
    EmailItemBll!: EmailItemBllComp;
    EmailItemBllSys!: EmailItemBllSystem;

    /** ---------- 视图层 ---------- */
    EmailItemView!: EmailItemViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(EmailItemBllComp);
    }
}