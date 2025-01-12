import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { MatchBllComp, MatchBllSystem } from "./bll/MatchBll";
import { MatchViewComp } from "./view/MatchViewComp";

/** Match 模块 */
@ecs.register('Match')
export class MatchEntity extends ecs.Entity {
    /** ---------- 业务层 ---------- */
     MatchBll!: MatchBllComp;
     MatchBllSys!: MatchBllSystem;

    /** ---------- 视图层 ---------- */
    MatchView!: MatchViewComp;

    /** 初始添加的数据层组件 */
    protected init() {
        
    }
}