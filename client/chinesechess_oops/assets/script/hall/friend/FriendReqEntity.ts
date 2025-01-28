import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendReqBllComp, FriendReqBllSystem } from "./bll/FriendReqBll";
import { FriendReqViewComp } from "./view/FriendReqViewComp";

/** friend 模块 */
@ecs.register('FriendReqEntity')
export class FriendReqEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
    FriendReqBll!: FriendReqBllComp;
    FriendReqSys!: FriendReqBllSystem;

    /** ---------- 视图层 ---------- */
    FriendReqView!: FriendReqViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
    }
}