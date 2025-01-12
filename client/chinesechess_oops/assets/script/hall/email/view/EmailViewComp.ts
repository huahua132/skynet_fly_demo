import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { EmailEntity } from "../EmailEntity";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('EmailViewComp')
@ecs.register('EmailView', false)
export class EmailViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        this.setButton();
        this.nodeTreeInfoLite();
    }

    //获取content结点
    GetContentNode() {
        return this.getNode("content");
    }

    //选择全局邮件
    private btnGlobal() {
        console.log("btnGlobal");
        let entity = this.ent as EmailEntity;
        entity.EmailBllSys.btnGlobal(entity);
    }

    //选择系统邮件
    private btnSys() {
        console.log("btnSys");
        let entity = this.ent as EmailEntity;
        entity.EmailBllSys.btnSys(entity);
    }

    //选择好友赠送
    private btnFriend() {
        console.log("btnFriend");
        let entity = this.ent as EmailEntity;
        entity.EmailBllSys.btnFriend(entity);
    }

    //返回大厅
    private bkBtn() {
        console.log("bkBtn");
        let entity = this.ent as EmailEntity;
        entity.EmailBllSys.bkBtn(entity);
    }

    /** 视图对象通过 ecs.Entity.remove(EmailViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}