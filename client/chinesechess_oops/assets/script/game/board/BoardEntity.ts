import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { BoardBllComp, BoardBllSystem} from "./bll/BoardBll";
import { BoardModelComp } from "./model/BoardModelComp";
import { BoardViewComp } from "./view/BoardViewComp";

/** BoardEntity 模块 */
@ecs.register('BoardEntity')
export class BoardEntity extends ecs.Entity {
    /** ---------- 数据层 ---------- */
    BoardModel!: BoardModelComp;

    /** ---------- 业务层 ---------- */
    BoardBll!: BoardBllComp;
    BoardBllSys!: BoardBllSystem;

    /** ---------- 视图层 ---------- */
    BoardView!: BoardViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(BoardModelComp);
    }
}