import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { ChessBllComp,ChessBllSystem } from "./bll/ChessBll";
import { ChessViewComp } from "./view/ChessViewComp";

/** Chess 模块 */
@ecs.register('ChessEntity')
export class ChessEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
    ChessBll!: ChessBllComp;

    /** ---------- 视图层 ---------- */
    ChessView!: ChessViewComp;

    ChessSys!: ChessBllSystem;

    /** 初始添加的数据层组件 */
    protected init() {}
}