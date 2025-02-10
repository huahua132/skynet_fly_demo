import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendInfoBllComp, FriendInfoBllSystem } from "./bll/FriendInfoBll";
import { FriendInfoViewComp } from "./view/FriendInfoViewComp";

/** friend 模块 */
@ecs.register('FriendInfoEntity')
export class FriendInfoEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
    FriendInfoBll!: FriendInfoBllComp;
    FriendInfoSys!: FriendInfoBllSystem;

    /** ---------- 视图层 ---------- */
    FriendInfoView!: FriendInfoViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
    }
}