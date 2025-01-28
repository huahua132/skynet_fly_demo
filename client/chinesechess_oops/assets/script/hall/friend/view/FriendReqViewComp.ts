import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { FriendReqEntity} from "../FriendReqEntity";
import { Label } from "cc";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('FriendReqViewComp')
@ecs.register('FriendReqView', false)
export class FriendReqViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as FriendReqEntity;         // ecs.Entity 可转为当前模块的具体实体对象
        this.setButton();
        this.nodeTreeInfoLite();

        this.getNode("nickname")!.getComponent(Label)!.string = entity.FriendReqBll.nickname;
    }

    reset() {
        this.node.destroy();
    }

    private btnAgree() {
        const entity = this.ent as FriendReqEntity;
        entity.FriendReqSys.btnAgree(entity);
    }

    private btnRefuse() {
        const entity = this.ent as FriendReqEntity;
        entity.FriendReqSys.btnRefuse(entity);
    }
}