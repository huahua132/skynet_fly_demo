import { _decorator } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { PosEntity } from "../PosEntity"
import { BoardEntity } from "../../board/BoardEntity";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('PosViewComp')
@ecs.register('PosView', false)
export class PosViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as PosEntity;         // ecs.Entity 可转为当前模块的具体实体对象
        entity.PosView = this;                      // 绑定视图层组件
        this.setButton();
    }

    setPos(x : number, y: number) {
        this.node.setPosition(x, y);
        this.hide();
    }

    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }

    btnMove() {
        const entity = this.ent as PosEntity;         // ecs.Entity 可转为当前模块的具体实体对象
        let boardEntity = entity.parent as BoardEntity;
        boardEntity.BoardBllSys.optPos(entity);
    }

    /** 视图对象通过 ecs.Entity.remove(PosViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}