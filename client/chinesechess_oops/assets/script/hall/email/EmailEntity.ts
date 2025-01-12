import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {EmailModelComp} from "./model/EmailModelComp"
import { EmailViewComp } from "./view/EmailViewComp";
import { EmailBllComp, EmailBllSystem } from "./bll/EmailBll";

/** email 模块 */
@ecs.register('EmailEntity')
export class EmailEntity extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    EmailModel!: EmailModelComp;

    /** ---------- 业务层 ---------- */
    EmailBll!: EmailBllComp;
    EmailBllSys!: EmailBllSystem;

    /** ---------- 视图层 ---------- */
    EmailView!: EmailViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(EmailModelComp);
    }
}