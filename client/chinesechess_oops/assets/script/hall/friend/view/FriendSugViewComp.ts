import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { FriendSugEntity} from "../FriendSugEntity";
import { Label } from "cc";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('FriendSugViewComp')
@ecs.register('FriendSugView', false)
export class FriendSugViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as FriendSugEntity;         // ecs.Entity 可转为当前模块的具体实体对象
        this.setButton();
        this.nodeTreeInfoLite();

        this.getNode("nickname")!.getComponent(Label)!.string = entity.FriendSugBll.nickname;
    }
    
    reset() {
        this.node.destroy();
    }

    private btnAdd() {
        //请求添加好友
        const entity = this.ent as FriendSugEntity;
        entity.FriendSugSys.btnAdd(entity);
    }
}