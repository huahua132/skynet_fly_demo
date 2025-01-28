import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendSugViewComp } from "../view/FriendSugViewComp";
import { FriendSugEntity } from "../FriendSugEntity";
import { smc } from "../../../common/SingletonModuleComp";
import {hallserver_friend} from "../../../../../protos-js/proto"
import { oops } from "db://oops-framework/core/Oops";

/** 业务输入参数 */
@ecs.register('FriendSugBll')
export class FriendSugBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    playerId : number = 0;
    nickname : string = "";
    reset() {
        this.playerId = 0;
        this.nickname = "";
    }
}

/** 业务逻辑处理对象 */
@ecs.register('FriendSugSys')
export class FriendSugBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(FriendSugBllComp, FriendSugViewComp);
    }

    entityEnter(e: FriendSugEntity): void {
        e.FriendSugSys = this;
    }

    async btnAdd(entity: FriendSugEntity) {
        let AddFriendReq: hallserver_friend.IAddFriendReq = {
            playerId : entity.FriendSugBll.playerId
        }
        let rsp = await smc.net.GetNode("hall").AsyncReq("hallserver_friend", "AddFriendReq", AddFriendReq);
        if (rsp.isErr) {
            oops.gui.toast("请求添加好友失败");
        } else {
            oops.gui.toast("请求添加好友成功");
        }
    }
}