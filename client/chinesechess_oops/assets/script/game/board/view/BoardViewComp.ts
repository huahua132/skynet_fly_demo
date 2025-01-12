import { _decorator, Label, Quat, Vec3 } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { BoardEntity } from "../BoardEntity"
import { ChessEntity } from "../../chess/ChessEntity";
import { TEAM_TYPE } from "../../enum/TEAM_TYPE";

const { ccclass, property } = _decorator;

/** 视图层对象 */
@ccclass('BoardViewComp')
@ecs.register('BoardView', false)
export class BoardViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as BoardEntity;         // ecs.Entity 可转为当前模块的具体实体对象
        entity.BoardView = this;                        // 绑定视图层组件
        this.setButton();
        this.nodeTreeInfoLite();

        let optBox = this.getNode("optBox");
        optBox!.active = false;
    }

    // 获取初始位置
    getInitPos() {
        return this.getNode("initPos")!.getPosition();
    }

    // 获取位置列表结点
    getPosList() {
        return this.getNode("posList")!;
    }

    // 获取棋子列表结点
    getChessList() {
        return this.getNode("chessList")!;
    }

    // 显示玩家信息
    showPlayerInfo() {
        const entity = this.ent as BoardEntity;
        let selfNode = this.getNode("selfPlayer");
        let otherNode = this.getNode("otherPlayer");
        selfNode!.getChildByName("nickname")!.getComponent(Label)!.string = entity.BoardModel.selfPlayer!.nickname!;
        selfNode!.getChildByName("rank")!.getComponent(Label)!.string = entity.BoardModel.selfPlayer!.score!.toString();
        selfNode!.getChildByName("remainTotalTime")!.getComponent(Label)!.string = "600";
        selfNode!.getChildByName("remainOnceTime")!.getComponent(Label)!.string = "60";
        console.log("showPlayerInfo ", entity.BoardModel.rivalPlayer);
        if (entity.BoardModel.rivalPlayer) {
            otherNode!.getChildByName("nickname")!.getComponent(Label)!.string = entity.BoardModel.rivalPlayer.nickname!;
            otherNode!.getChildByName("rank")!.getComponent(Label)!.string = entity.BoardModel.rivalPlayer.score!.toString();
            otherNode!.getChildByName("remainTotalTime")!.getComponent(Label)!.string = "600";
            otherNode!.getChildByName("remainOnceTime")!.getComponent(Label)!.string = "60";
        }

        if (entity.BoardModel.selfPlayer!.teamType === TEAM_TYPE.BLACK) {
            //棋盘旋转180度
            let rotationQuat = new Quat();
            let mapNode = this.getNode("map");
            Quat.fromEuler(rotationQuat, 180, 180, 0);
            mapNode!.rotation = rotationQuat;
        }
    }

    //显示拿起棋子
    showTouchChess(chessEntity: ChessEntity) {
        let chessNode = chessEntity.ChessView.node;
        let optBox = this.getNode("optBox");
        optBox!.active = true;
        optBox!.setPosition(chessNode.getPosition());
        
        const entity = this.ent as BoardEntity;
        if (entity.BoardModel.selfPlayer!.teamType === TEAM_TYPE.BLACK) {
            optBox!.setPosition(new Vec3(chessNode.x + chessEntity.ChessBll.offSetX, chessNode.y + chessEntity.ChessBll.offSetY, 0));
        } else {
            optBox!.setPosition(new Vec3(chessNode.x - chessEntity.ChessBll.offSetX, chessNode.y - chessEntity.ChessBll.offSetY, 0));
        }
    }

    //隐藏拿起棋子
    hideTouchChess() {
        let optBox = this.getNode("optBox");
        optBox!.active = false;
    }

    showSelfRemainTime() {
        const entity = this.ent as BoardEntity;
        let selfNode = this.getNode("selfPlayer");
        let subTime = entity.BoardBll.addTime;
        let remainTotalTime = Math.floor(entity.BoardModel.nextDoing.remainTotalTime! / 100 - subTime);
        if (remainTotalTime < 0) {
            remainTotalTime = 0;
        }
        let remainOnceTime = Math.floor(entity.BoardModel.nextDoing.remainOnceTime! / 100 - subTime);
        if (remainOnceTime < 0) {
            remainOnceTime = 0;
        }
        selfNode!.getChildByName("remainTotalTime")!.getComponent(Label)!.string = remainTotalTime.toString();
        selfNode!.getChildByName("remainOnceTime")!.getComponent(Label)!.string = remainOnceTime.toString();
    }

    showRivalRemainTime() {
        const entity = this.ent as BoardEntity;
        let otherNode = this.getNode("otherPlayer");
        let subTime = entity.BoardBll.addTime;
        let remainTotalTime = Math.floor(entity.BoardModel.nextDoing.remainTotalTime! / 100 - subTime);
        if (remainTotalTime < 0) {
            remainTotalTime = 0;
        }
        let remainOnceTime = Math.floor(entity.BoardModel.nextDoing.remainOnceTime! / 100 - subTime);
        if (remainOnceTime < 0) {
            remainOnceTime = 0;
        }
        otherNode!.getChildByName("remainTotalTime")!.getComponent(Label)!.string = remainTotalTime.toString();
        otherNode!.getChildByName("remainOnceTime")!.getComponent(Label)!.string = remainOnceTime.toString();
    }

    /** 视图对象通过 ecs.Entity.remove(BoardViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}