import { _decorator, Label } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { OverEntity } from "./../OverEntity";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('OverViewComp')
@ecs.register('OverView', false)
export class OverViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        // const entity = this.ent as ecs.Entity;         // ecs.Entity 可转为当前模块的具体实体对象
        this.setButton();
        this.nodeTreeInfoLite();
    }

    exitBtn() {
        const entity = this.ent as OverEntity;
        entity.OverBllSys.exit();
    }

    show() {
        const entity = this.ent as OverEntity;
        let label = this.getNode("label")!.getComponent(Label);
        if (entity.OverBll.isWin) {
            label!.string = "险胜";
        } else {
            label!.string = "惜败";
        }
    }

    /** 视图对象通过 ecs.Entity.remove(OverViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}