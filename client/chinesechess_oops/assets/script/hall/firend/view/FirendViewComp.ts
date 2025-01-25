import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { FirendEntity} from "../FirendEntity";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('FirendViewComp')
@ecs.register('FirendView', false)
export class FirendViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        // const entity = this.ent as ecs.Entity;         // ecs.Entity 可转为当前模块的具体实体对象
        this.setButton();
        this.nodeTreeInfoLite();
        this.showList("firendScroll");
    }

    private showList(listname: string) {
        this.getNode("firendScroll")!.active = false;
        this.getNode("firendSugScroll")!.active = false;
        this.getNode("firendReqScroll")!.active = false;
        this.getNode(listname)!.active = true;
    }
    
    reset() {
        this.node.destroy();
    }

    //获取好友列表的content
    GetFriendListContent() {
        return this.getNode("firendContent");
    }

    //获取好友推荐的content
    GetFriendSugContent() {
        return this.getNode("firendSugContent");
    }

    //获取好友申请的content
    GetFriendReqContent() {
        return this.getNode("firendReqContent");
    }

    //好友列表
    private btnList() {
        console.log("btnList");
        let entity = this.ent as FirendEntity;
        entity.FirendSys.btnList(entity);
        this.showList("firendScroll");
    }

    //好友推荐
    private btnFind() {
        console.log("btnFind");
        let entity = this.ent as FirendEntity;
        entity.FirendSys.btnFind(entity);
        this.showList("firendSugScroll");
    }

    //好友申请
    private btnReq() {
        console.log("btnReq");
        let entity = this.ent as FirendEntity;
        entity.FirendSys.btnReq(entity);
        this.showList("firendReqScroll");
    }

    //返回大厅
    private bkBtn() {
        console.log("bkBtn");
        let entity = this.ent as FirendEntity;
        entity.FirendSys.bkBtn(entity);
    }
}