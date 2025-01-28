import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { FriendEntity} from "../FriendEntity";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('FriendViewComp')
@ecs.register('FriendView', false)
export class FriendViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        // const entity = this.ent as ecs.Entity;         // ecs.Entity 可转为当前模块的具体实体对象
        this.setButton();
        this.nodeTreeInfoLite();
        this.showList("friendScroll");
    }

    private showList(listname: string) {
        this.getNode("friendScroll")!.active = false;
        this.getNode("friendSugScroll")!.active = false;
        this.getNode("friendReqScroll")!.active = false;
        this.getNode(listname)!.active = true;
    }
    
    reset() {
        this.node.destroy();
    }

    //获取好友列表的content
    GetFriendListContent() {
        return this.getNode("friendContent");
    }

    //获取好友推荐的content
    GetFriendSugContent() {
        return this.getNode("friendSugContent");
    }

    //获取好友申请的content
    GetFriendReqContent() {
        return this.getNode("friendReqContent");
    }

    //好友列表
    private btnList() {
        console.log("btnList");
        this.showList("friendScroll");
    }

    //好友推荐
    private btnFind() {
        console.log("btnFind");
        let entity = this.ent as FriendEntity;
        entity.FriendSys.btnFind(entity);
        this.showList("friendSugScroll");
    }

    //好友申请
    private btnReq() {
        console.log("btnReq");
        let entity = this.ent as FriendEntity;
        entity.FriendSys.btnReq(entity);
        this.showList("friendReqScroll");
    }

    //返回大厅
    private bkBtn() {
        console.log("bkBtn");
        let entity = this.ent as FriendEntity;
        entity.FriendSys.bkBtn(entity);
    }
}