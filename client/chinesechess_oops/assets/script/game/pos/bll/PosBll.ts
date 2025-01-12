import { ecs } from "db://oops-framework/libs/ecs/ECS";

/** 业务输入参数 */
@ecs.register('PosBll')
export class PosBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    row: number = 0;
    col: number = 0;
    reset() {
        this.row = 0;
        this.col = 0;
    }
}

/** 业务逻辑处理对象 */
@ecs.register('PosSys')
export class PosBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem, ecs.IEntityRemoveSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(PosBllComp);
    }

    entityEnter(e: ecs.Entity): void {
        console.log("PosBllSystem entityEnter >>>", e);
    }

    entityRemove(e: ecs.Entity): void {
        console.log("PosBllSystem entityRemove >>>", e);
    }
}