import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendSugBllComp, FriendSugBllSystem } from "./bll/FriendSugBll";
import { FriendSugViewComp } from "./view/FriendSugViewComp";

/** friend 模块 */
@ecs.register('FriendSugEntity')
export class FriendSugEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
    FriendSugBll!: FriendSugBllComp;
    FriendSugSys!: FriendSugBllSystem;

    /** ---------- 视图层 ---------- */
    FriendSugView!: FriendSugViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
    }
}