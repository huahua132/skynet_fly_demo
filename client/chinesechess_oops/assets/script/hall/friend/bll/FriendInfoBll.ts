import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendInfoViewComp } from "../view/FriendInfoViewComp";
import { FriendInfoEntity } from "../FriendInfoEntity";
import { FriendEntity } from "../FriendEntity"
import { smc } from "../../../common/SingletonModuleComp";
import {hallserver_friend} from "../../../../../protos-js/proto"
import { oops } from "db://oops-framework/core/Oops";

/** 业务输入参数 */
@ecs.register('FriendInfoBll')
export class FriendInfoBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    playerId : number = 0;
    reset() {
        this.playerId = 0;
    }
}

/** 业务逻辑处理对象 */
@ecs.register('FriendInfoSys')
export class FriendInfoBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(FriendInfoBllComp, FriendInfoViewComp);
    }

    entityEnter(e: FriendInfoEntity): void {
        e.FriendInfoSys = this;
    }
}