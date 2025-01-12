import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { MatchEntity } from "../Match";
import { Label } from "cc";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('MatchViewComp')
@ecs.register('MatchView', false)
export class MatchViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as MatchEntity;
        entity.MatchView = this;
        this.setButton();
        this.nodeTreeInfoLite();
    }

    //显示倒计时
    ShowRemainTime() {
        this.node.active = true;
        const entity = this.ent as MatchEntity;
        let remainTime = Math.floor(entity.MatchBll.RemainTime)
        if (remainTime >= 0) {
            this.getNode("content")!.getComponent(Label)!.string = remainTime.toString();
        }
    }

    //显示接收
    ShowAccepot() {
        this.node.active = true;
        const entity = this.ent as MatchEntity;
        let remainTime = Math.floor(entity.MatchBll.RemainTime)
        if (remainTime <= 0) {
            remainTime = 0;
        }
        this.getNode("content")!.getComponent(Label)!.string = "同意对局" + remainTime.toString();
    }

    //显示拒绝
    ShowCancel() {
        this.node.active = true;
        const entity = this.ent as MatchEntity;
        let remainTime = Math.floor(entity.MatchBll.RemainTime)
        if (remainTime <= 0) {
            remainTime = 0;
        }
        this.getNode("content")!.getComponent(Label)!.string = "拒绝对局" + remainTime.toString();
    }

    //点击同意
    btnAccept() {
        const entity = this.ent as MatchEntity;
        entity.MatchBllSys.Accept(entity);
    }

    //点击取消 
    btnCancel() {
        const entity = this.ent as MatchEntity;
        entity.MatchBllSys.Cancel(entity);
    }

    /** 视图对象通过 ecs.Entity.remove(MatchViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}