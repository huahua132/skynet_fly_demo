import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { OverViewComp } from "../view/OverViewComp";
import { OverEntity } from "../OverEntity";
import { oops } from "db://oops-framework/core/Oops";
import { EVENT } from "../../../common/enum/EVENT";

/** 业务输入参数 */
@ecs.register('OverBll')
export class OverBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    isWin: boolean = false;
    reset() {
        
    }
}

/** 业务逻辑处理对象 */
@ecs.register('OverBllSys')
export class OverBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(OverBllComp, OverViewComp);
    }

    entityEnter(entity: OverEntity): void {
        entity.OverBllSys = this;
        entity.OverView.show();
    }

    //返回大厅
    exit() {
        oops.message.dispatchEvent(EVENT.RETURN_HHALL);
    }
}