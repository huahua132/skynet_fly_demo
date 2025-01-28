import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendReqViewComp } from "../view/FriendReqViewComp";
import { FriendReqEntity } from "../FriendReqEntity";
import { FriendEntity } from "../FriendEntity"
import { smc } from "../../../common/SingletonModuleComp";
import {hallserver_friend} from "../../../../../protos-js/proto"
import { oops } from "db://oops-framework/core/Oops";

/** 业务输入参数 */
@ecs.register('FriendReqBll')
export class FriendReqBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    playerId : number = 0;
    nickname : string = "";
    reset() {
        this.playerId = 0;
        this.nickname = "";
    }
}

/** 业务逻辑处理对象 */
@ecs.register('FriendReqSys')
export class FriendReqBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(FriendReqBllComp, FriendReqViewComp);
    }

    entityEnter(e: FriendReqEntity): void {
        e.FriendReqSys = this;
    }

    async btnAgree(entity: FriendReqEntity) {
        let agreeAddFriendReq: hallserver_friend.IAgreeAddFriendReq = {
            playerId : entity.FriendReqBll.playerId
        }
        let rsp = await smc.net.GetNode("hall").AsyncReq("hallserver_friend", "AgreeAddFriendReq", agreeAddFriendReq)
        if (rsp.isErr) {
            oops.gui.toast("同意添加好友失败");
        } else {
            oops.gui.toast("同意添加好友成功");
        }

        const friendEntity = entity.parent as FriendEntity
        friendEntity.FriendSys.delReqList(friendEntity, entity.FriendReqBll.playerId)
    }

    async btnRefuse(entity: FriendReqEntity) {
        let req : hallserver_friend.IRefuseAddFriendReq = {
            playerId : entity.FriendReqBll.playerId
        }
        let rsp = await smc.net.GetNode("hall").AsyncReq("hallserver_friend", "RefuseAddFriendReq", req)
        if (rsp.isErr) {
            oops.gui.toast("拒绝添加好友失败");
        } else {
            oops.gui.toast("拒绝添加好友成功");
        }

        const friendEntity = entity.parent as FriendEntity
        friendEntity.FriendSys.delReqList(friendEntity, entity.FriendReqBll.playerId)
    }
}