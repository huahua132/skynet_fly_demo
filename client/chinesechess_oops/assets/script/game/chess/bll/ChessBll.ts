import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { ChessEntity } from "../ChessEntity";
import { PosEntity } from "../../pos/PosEntity";
import { BoardEntity } from "../../board/BoardEntity";
import { ChessViewComp } from "../view/ChessViewComp";

/** 业务输入参数 */
@ecs.register('ChessBll')
export class ChessBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    chessType: number = 0; //棋子类型
    row: number = 0;       //行
    col: number = 0;       //列
    id: number = 0;        //棋子id
    teamType : number = 0; //队伍类型
    isSelf : boolean = false; //是否是自己
    isKill : boolean = false; //是否被吃

    offSetX : number = 5; //x偏移
    offSetY : number = -5; //y偏移
    reset() {
        this.chessType = 0;
        this.row = 0;
        this.col = 0;
        this.id = 0;
        this.teamType = 0;
        this.isSelf = false;
        this.isKill = false;
        this.offSetX = 5;
        this.offSetY = -5;
    }
}

/** 业务逻辑处理对象 */
@ecs.register('ChessSys')
export class ChessBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem, ecs.IEntityRemoveSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(ChessBllComp, ChessViewComp);
    }

    entityEnter(entity: ChessEntity): void {
        entity.ChessSys = this;
        let boardEntity = entity.parent as BoardEntity;
        console.log("chess entityEnter >>>", entity, boardEntity);
        if (entity.ChessBll.row > 0 && entity.ChessBll.col > 0) {
            this.setPos(entity, boardEntity.BoardBll.posMap[entity.ChessBll.row][entity.ChessBll.col]);
        }
    }

    entityRemove(entity: ChessEntity): void {
        console.log("chess entityRemove >>>", entity);
    }  

    setPos(entity: ChessEntity, posEntity: PosEntity) {
        entity.ChessView.setPos(posEntity);
    }

    killed(entity: ChessEntity) {
        entity.ChessBll.isKill = true;
        entity.ChessView.hide();
    }

    //移动
    move(entity: ChessEntity, posEntity: PosEntity) {
        entity.ChessBll.row = posEntity.PosBll.row;
        entity.ChessBll.col = posEntity.PosBll.col;
        entity.ChessView.move(posEntity);
    }
}