import { _decorator, Label} from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { EmailItemEntity } from "../EmailItemEntity";
import { EmailEntity } from "../../../EmailEntity";
import { config } from "../../../../../../../extensions/oops-plugin-excel-to-json/src/main";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('EmailItemViewComp')
@ecs.register('EmailItemView', false)
export class EmailItemViewComp extends CCComp {
    selfH : number = 0;
    contentH: number = 0;
    /** 视图层逻辑代码分离演示 */
    start() {
        this.setButton();
        this.nodeTreeInfoLite();
        this.node.getChildByName("content")!.active = false;
        this.contentH = this.node.getChildByName("content")!.h;
        this.selfH = this.node.h;
        this.node.h = this.selfH - this.contentH;
        this.RefShowData();
        console.log("email item show >>> ", this.ent);
    }

    //刷新数据 
    RefShowData() {
        const entity = this.ent as EmailItemEntity;
        const emailEntity = entity.parent as EmailEntity;
        let email = emailEntity.EmailModel.EmailMap.get(entity.EmailItemBll.Guid);
        this.getNode("title")!.getComponent(Label)!.string = email!.title!;                                     //标题
        this.getNode("text")!.getChildByName("mask")!.getComponentInChildren(Label)!.string = email!.content!;  //内容  
        console.log("RefShowData >>> ",email?.title, email);
        if (email!.itemList && email!.itemList.length > 0) {                                                    //奖励道具
            this.getNode("items")!.getComponent(Label)!.string = JSON.stringify(email?.itemList);
            this.getNode("btnReward")!.active = true;
            if (email!.itemFlag == 1) {
                this.getNode("btnReward")!.getComponentInChildren(Label)!.string = "已领取"
            } else {
                this.getNode("btnReward")!.getComponentInChildren(Label)!.string = "领取奖励"
            }
        } else {
            this.getNode("items")!.getComponent(Label)!.string = "";
            this.getNode("btnReward")!.active = false;
        }
    }

    //点击展开
    private btnShow() {
        console.log("btnShow >>> ");
        const entity = this.ent as EmailItemEntity;
        const emailEntity = entity.parent as EmailEntity;
        emailEntity.EmailBllSys.BtnShow(entity);
    }

    //领取奖励
    private btnReward() {
        console.log("btnReward >>> ");
        const entity = this.ent as EmailItemEntity;
        entity.EmailItemBllSys.BtnReward(entity);
    }

    //展开
    show() {
        const entity = this.ent as EmailItemEntity;
        let content = this.node.getChildByName("content");
        if (entity.EmailItemBll.IsOpen) {
            this.node.h = this.selfH;
            content!.active = true;
            this.getNode("btnShow")!.getComponentInChildren(Label)!.string = "收起"
        } else {
            this.node.h = this.selfH - this.contentH;
            content!.active = false;
            this.getNode("btnShow")!.getComponentInChildren(Label)!.string = "展开"
        }
    }

    /** 视图对象通过 ecs.Entity.remove(EmailViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}