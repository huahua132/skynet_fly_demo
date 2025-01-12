import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {oops} from "db://oops-framework/core/Oops"
import { MatchEntity } from "../Match";
import { EVENT } from "../../../common/enum/EVENT";
import { smc } from "../../../common/SingletonModuleComp"
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { UIID } from "../../../common/enum/UIConfig";
import { MatchViewComp } from "../view/MatchViewComp";

/** 业务输入参数 */
@ecs.register('MatchBll')
export class MatchBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    RemainTime: number = 0;  //剩余时间
    SessionId : string = ""; //匹配的session_id
    GameId : number = 0;     //匹配的GameId

    IsAceept : boolean = false; //是否同意匹配
    IsCancel : boolean = false;  //是否取消匹配
    reset() {
        this.RemainTime = 0;
        this.SessionId = "";
        this.GameId = 0;
        this.IsAceept = false;
        this.IsCancel = false;
    }
}

/** 业务逻辑处理对象 */
@ecs.register('MatchSys')
export class MatchBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem, ecs.ISystemUpdate {
    filter(): ecs.IMatcher {
        return ecs.allOf(MatchBllComp);
    }

    entityEnter(entity: MatchEntity): void {
        console.log("entityEnter >>> ", entity);
        entity.MatchBllSys = this;
    }

    update(entity: MatchEntity) {
        if (entity.MatchBll.RemainTime < 0) {
            entity.remove(MatchBllComp);
            ModuleUtil.removeViewUi(entity, MatchViewComp, UIID.Match);
            oops.message.dispatchEvent(EVENT.MATCH_TIME_OUT);
            return;
        }

        entity.MatchBll.RemainTime -= this.dt;

        if (entity.MatchView) {
            if (entity.MatchBll.IsAceept) {
                entity.MatchView.ShowAccepot();
            } else if (entity.MatchBll.IsCancel) {
                entity.MatchView.ShowCancel();
            } else {
                entity.MatchView.ShowRemainTime();
            }
        }
    }

    //同意匹配结果
    Accept(entity: MatchEntity) {
        smc.net.GetNode("hall").Req("hallserver_match", "AcceptMatchReq", {gameId: entity.MatchBll.GameId, sessionId: entity.MatchBll.SessionId})
        .then(body => {
            oops.gui.toast("同意匹配成功")
            entity.MatchBll.IsAceept = true;
            oops.message.dispatchEvent(EVENT.ACCEPT_MATCH);
        }).catch(err=> {
            oops.gui.toast("同意匹配失败")
        })
    }

    //拒绝匹配结果
    Cancel(entity: MatchEntity) {
        smc.net.GetNode("hall").Req("hallserver_match", "CancelMatchGameReq", {gameId: entity.MatchBll.GameId})
        .then(body => {
            console.log("CancelMatchGameReq >>> ", body);
            entity.MatchBll.IsCancel = true;
            oops.gui.toast("拒绝匹配成功")
            oops.message.dispatchEvent(EVENT.CANCEL_MATCH);
        }).catch(err => {
            oops.gui.toast("拒绝匹配失败")
        })
    }
}