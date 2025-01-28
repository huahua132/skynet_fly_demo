import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendModelComp } from "./model/FriendModelComp";
import { FriendBllComp, FriendBllSystem } from "./bll/FriendBll";
import { FriendViewComp } from "./view/FriendViewComp";

/** friend 模块 */
@ecs.register('FriendEntity')
export class FriendEntity extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    FriendModel!: FriendModelComp;

    /** ---------- 业务层 ---------- */
    FriendBll!: FriendBllComp;
    FriendSys!: FriendBllSystem;

    /** ---------- 视图层 ---------- */
    FriendView!: FriendViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(FriendModelComp);
    }
}