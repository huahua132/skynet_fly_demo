import { _decorator, Sprite, tween, Vec3, SpriteFrame, Quat, Node } from "cc";
import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { CCComp } from "db://oops-framework/module/common/CCComp";
import { ChessEntity } from "../ChessEntity";
import { BoardEntity } from "../../board/BoardEntity";
import { PosEntity } from "../../pos/PosEntity";
import { resLoader } from "db://oops-framework/core/common/loader/ResLoader";
import { CHESS_TYPE } from "../../enum/CHESS_TYPE";
import { TEAM_TYPE } from "../../enum/TEAM_TYPE";

const { ccclass, property } = _decorator;

let sprite_index_map ={
    [CHESS_TYPE.BLACK_C] : "b_c",
    [CHESS_TYPE.BLACK_J] : "b_j",
    [CHESS_TYPE.BLACK_M] : "b_m",
    [CHESS_TYPE.BLACK_P] : "b_p",
    [CHESS_TYPE.BLACK_S] : "b_s",
    [CHESS_TYPE.BLACK_X] : "b_x",
    [CHESS_TYPE.BLACK_Z] : "b_z",

    [CHESS_TYPE.RED_C] : "r_c",
    [CHESS_TYPE.RED_J] : "r_j",
    [CHESS_TYPE.RED_M] : "r_m",
    [CHESS_TYPE.RED_P] : "r_p",
    [CHESS_TYPE.RED_S] : "r_s",
    [CHESS_TYPE.RED_X] : "r_x",
    [CHESS_TYPE.RED_Z] : "r_z",
}

/** 视图层对象 */
@ccclass('ChessViewComp')
@ecs.register('ChessView', false)
export class ChessViewComp extends CCComp {
    /** 视图层逻辑代码分离演示 */
    start() {
        const entity = this.ent as ChessEntity;
        entity.ChessView = this;
        this.setButton();
        this.hide();
    }

    hide() {
        this.node.active = false;
    }

    setPos(posEntity : PosEntity) {
        const entity = this.ent as ChessEntity;
        let sp = this.node.getComponent(Sprite);
        //@ts-ignore
        let url = "game/texture/" + sprite_index_map[entity.ChessBll.chessType!] + "/spriteFrame";
        sp!.spriteFrame = resLoader.get(url, SpriteFrame);
        let posNode = posEntity.PosView.node;
        
        this.node.active = true;

        const boardEntity = entity.parent as BoardEntity;
        if (boardEntity.BoardModel.selfPlayer!.teamType === TEAM_TYPE.BLACK) {
            //棋子旋转180度
            let rotationQuat = new Quat();
            Quat.fromEuler(rotationQuat, 180, 180, 0);
            this.node.rotation = rotationQuat;
            this.node.setPosition(new Vec3(posNode.x - entity.ChessBll.offSetX, posNode.y - entity.ChessBll.offSetY, 0));
        } else {
            this.node.setPosition(new Vec3(posNode.x + entity.ChessBll.offSetX, posNode.y + entity.ChessBll.offSetY, 0));
        }
        this.node.active = true;
    }

    move(posEntity : PosEntity) {
        const entity = this.ent as ChessEntity;
        let posNode = posEntity.PosView.node;
        let offsetx = entity.ChessBll.offSetX;
        let offsety = entity.ChessBll.offSetY;
        const boardEntity = entity.parent as BoardEntity;
        if (boardEntity.BoardModel.selfPlayer!.teamType === TEAM_TYPE.BLACK) {
            offsetx = -offsetx;
            offsety = -offsety;
        }
        tween()
            .target(this.node)
            .to(0.3, { position : new Vec3(posNode.x + offsetx, posNode.y + offsety, 0) })
            .start();
    }

    //点击棋子
    optBtn() {
        const entity = this.ent as ChessEntity;
        const boardEntity = entity.parent as BoardEntity;
        boardEntity.BoardBllSys.optChess(entity);
    }

    reset() {
        this.node.destroy();
    }
}