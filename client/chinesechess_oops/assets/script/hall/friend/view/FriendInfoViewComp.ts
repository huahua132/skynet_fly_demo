import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { FriendInfoEntity} from "../FriendInfoEntity";
import { FriendEntity } from "../FriendEntity";
import { Label } from "cc";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('FriendInfoViewComp')
@ecs.register('FriendInfoView', false)
export class FriendInfoViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as FriendInfoEntity;         // ecs.Entity 可转为当前模块的具体实体对象
        this.setButton();
        this.nodeTreeInfoLite();

        const fent = entity.parent as FriendEntity;
        let friendInfo = fent.FriendSys.getFriendInfo(fent, entity.FriendInfoBll.playerId);
        this.getNode("nickname")!.getComponent(Label)!.string = friendInfo.nickname;
        let infoStr = "在线"
        if (friendInfo.isOnline == 1) {
            infoStr = "在线"
        } else {
            infoStr = "最近在线时间:" + friendInfo.lastLogoutTime
        }
        this.getNode("onlineInfo")!.getComponent(Label)!.string = infoStr;
    }

    reset() {
        this.node.destroy();
    }
}