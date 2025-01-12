import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { smc } from "../../../common/SingletonModuleComp";
import { BoardEntity } from "../BoardEntity";
import { chinese_chess_game } from "../../../../../protos-js/proto.js";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import {oops} from "db://oops-framework/core/Oops"
import { BoardViewComp } from "../view/BoardViewComp";
import { PosEntity } from "../../pos/PosEntity";
import { PosViewComp } from "../../pos/view/PosViewComp";
import { ChessViewComp } from "../../chess/view/ChessViewComp";
import { HallViewComp } from "../../../hall/hall/view/HallViewComp";
import {HallBllComp} from "../../../hall/hall/bll/Hall"
import { OverViewComp } from "../../over/view/OverViewComp";
import { ChessBllComp } from "../../chess/bll/ChessBll";
import { ChessEntity } from "../../chess/ChessEntity";
import {GAME_STATE } from "../../enum/GAME_STATE"
import { CHESS_TYPE } from "../../enum/CHESS_TYPE";
import { TEAM_TYPE } from "../../enum/TEAM_TYPE";
import { EVENT } from "../../../common/enum/EVENT";
import { UIID } from "../../../common/enum/UIConfig";
import { OverEntity } from "../../over/OverEntity";

/** 业务输入参数 */
@ecs.register('BoardBll')
export class BoardBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    isOver : boolean = false;            //是否结束
    tableId : string = "";              //桌子ID
    posMap: PosEntity[][] = [];         //棋盘位置映射
    chessList : ChessEntity[] = [];     //棋子列表
    chessMap : any = {};                //棋子映射
    chessPosMap : any = {};             //棋子位置映射

    touchChess : ChessEntity | null = null;  //拿起的棋子
    addTime : number = 0;               //过去时间
    overEntity : OverEntity | null = null; //结束界面实例
    reset() {
        this.tableId = "";
        this.posMap = [];
        this.chessList = [];
        this.chessMap = {};
        this.touchChess = null;
        this.chessPosMap = {};
        this.overEntity = null;
        this.addTime = 0;
        this.isOver = false;
    }
}

/** 业务逻辑处理对象 */
@ecs.register('BoardSys')
export class BoardBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem, ecs.ISystemUpdate, ecs.ISystemFirstUpdate {
    init() {
        console.log("BoardBllSystem init >>> ", smc.game);
        oops.message.on(EVENT.RETURN_HHALL, this.onEventHandler, this);
        let entity = smc.game;
        smc.net.GetNode("game").RegPushHandle("chinese_chess_game", "gameStateRes", (msgBody: chinese_chess_game.IgameStateRes) => {
            console.log("收到游戏状态 >>> ", msgBody)
            this.execGameState(entity, msgBody);
        })

        smc.net.GetNode("game").RegPushHandle("chinese_chess_game", "moveRes", (msgBody: chinese_chess_game.ImoveRes) => {
            console.log("收到游戏移动 >>> ", msgBody)
            let row = msgBody.moveRow!;
            let col = msgBody.moveCol!;
            let chessId = msgBody.chessId!;

            //位置上的棋子
            let posChessEntity : ChessEntity|null = null;
            let moveChessEntity = entity.BoardBll.chessMap[chessId];
            if (entity.BoardBll.chessPosMap[row] && entity.BoardBll.chessPosMap[row][col]) {
                posChessEntity = entity.BoardBll.chessPosMap[row][col];
            }
            //移动棋子
            let posEntity = entity.BoardBll.posMap[row][col];

            //标记放下棋子
            if (entity.BoardBll.touchChess) {
                this.changeChessCanMove(entity.BoardBll.touchChess, false); 
                entity.BoardBll.touchChess = null;
                entity.BoardView.hideTouchChess();
            }
            //改变移动棋子映射记录
            entity.BoardBll.chessPosMap[moveChessEntity.ChessBll.row][moveChessEntity.ChessBll.col] = null;
            moveChessEntity.ChessSys.move(moveChessEntity, posEntity);
            
            if (!entity.BoardBll.chessPosMap[row]) {
                entity.BoardBll.chessPosMap[row] = {};
            }
            entity.BoardBll.chessPosMap[row][col] = moveChessEntity;

            if (posChessEntity) {
                //吃掉棋子
                posChessEntity.ChessSys.killed(posChessEntity);
                entity.BoardBll.chessMap[posChessEntity.ChessBll.id] = null;
            }
        })

        smc.net.GetNode("game").RegPushHandle("chinese_chess_game", "nextDoing", (msgBody: chinese_chess_game.InextDoing) => {
            console.log("收到接下来谁操作 >>> ", msgBody)
            entity.BoardBll.addTime = 0;
            entity.BoardModel.nextDoing = msgBody!;
        })
    }

    filter(): ecs.IMatcher {
        return ecs.allOf(BoardBllComp, BoardViewComp);
    }

    entityEnter(entity: BoardEntity): void {
        console.log("entityEnter BoardBll >>> ", entity);
        entity.BoardBllSys = this;
        entity.BoardBll.overEntity = ecs.getEntity<OverEntity>(OverEntity);
        let initPos = entity.BoardView.getInitPos();
        let posNode = entity.BoardView.getPosList();
        let x = initPos.x;
        let y = initPos.y;
        let offset = 58.3;
        //创建点位实例
        for (let row = 1; row <= 10; row++) {
            let ry = y - ((row - 1) * offset);
            for (let col = 1; col <= 9; col++) {
                let rx = x + ((col - 1) * offset)
                if (!entity.BoardBll.posMap[row]) {
                    entity.BoardBll.posMap[row] = [];
                }
                if (!entity.BoardBll.posMap[row][col]) {
                    let posEntity = ecs.getEntity<PosEntity>(PosEntity);
                    ModuleUtil.addView(posEntity, PosViewComp, posNode, "gui/game/pos");
                    entity.BoardBll.posMap[row][col] = posEntity;
                    posEntity.PosView.setPos(rx, ry);
                    posEntity.PosBll.row = row;
                    posEntity.PosBll.col = col;
                    entity.addChild(posEntity);
                }
            }
        }

        let chessNode = entity.BoardView.getChessList();
        //创建棋子实例
        for (let i = 0; i < 32; i++) {
            let chessEntity = ecs.getEntity<ChessEntity>(ChessEntity);
            ModuleUtil.addView(chessEntity, ChessViewComp, chessNode, "gui/game/chess");
            entity.addChild(chessEntity);
            entity.BoardBll.chessList.push(chessEntity);
        }

        let loginRsp = smc.net.GetLoginRsp("game");
        console.log("firstUpdate BoardBll >>> ", entity, loginRsp);
        let gameNet = smc.net.GetNode("game");
        gameNet.Req("game_hall", "JoinReq", {tableId : entity.BoardBll.tableId})
        .then(body => {
            this.getGameState(entity);
        })
        .catch(body => {
            oops.gui.toast("进入桌子失败")
            console.log("进入桌子失败 >>> ", body)
        })
    }

    async retrunHall() {
        //删除所有子节点
        for (let [key, value] of smc.game.children) {
            smc.game.removeChild(value);
        }
        //返回大厅
        smc.hall.addComponents<ecs.Comp>(HallBllComp);
        await ModuleUtil.addViewUiAsync(smc.hall, HallViewComp, UIID.Hall);
        ModuleUtil.removeViewUi(smc.game.BoardBll.overEntity!, OverViewComp, UIID.Over);
        //销毁over界面实体
        smc.game.BoardBll.overEntity!.destroy();
        ModuleUtil.removeViewUi(smc.game, BoardViewComp, UIID.Board);
        //卸载业务模块
        smc.game.remove(BoardBllComp);
        smc.game.BoardModel.reset();
    }

    onEventHandler(event: string, args: any) {
        switch (event) {
            case EVENT.RETURN_HHALL:
                return this.retrunHall();
        }
    }

    //获取棋子的可以的移动位置
    getChessCanMove(entity: ChessEntity) {
        let boardEntity = entity.parent as BoardEntity;
        let canMoveList = boardEntity.BoardModel.nextDoing.canMoveList!;
        let move : chinese_chess_game.IchessCanMove | null = null;
        for (let i = 0; i < canMoveList!.length; i++) {
            let one = canMoveList![i];
            if (one.chessId == entity.ChessBll.id) {
                move = one;
                break;
            }
        }
        return move;
    }

    //改变棋子可移动位置
    changeChessCanMove(entity: ChessEntity, isShow: boolean) {
        let boardEntity = entity.parent as BoardEntity;
        let move = this.getChessCanMove(entity);
        if (move) {
            for (let i = 0; i < move.rowList!.length; i++) {
                let row = move.rowList![i];
                let col = move.colList![i];
                let posEntity = boardEntity.BoardBll.posMap[row][col];
                if (isShow) {
                    posEntity.PosView.show();
                } else {
                    posEntity.PosView.hide();
                }
            }
        }
    }

    //点击位置
    optPos(entity: PosEntity) {
        let boardEntity = entity.parent as BoardEntity;
        if (boardEntity.BoardModel.state != GAME_STATE.playing) {
            return;
        }
        if (boardEntity.BoardModel.nextDoing.playerId != boardEntity.BoardModel.selfPlayer!.playerId) {
            oops.gui.toast("还没轮到你走棋")
            return;
        }
        let req : chinese_chess_game.ImoveReq = {
            chessId : boardEntity.BoardBll.touchChess!.ChessBll.id,
            moveRow : entity.PosBll.row,
            moveCol : entity.PosBll.col,
        }
        smc.net.GetNode("game").PushMsg("chinese_chess_game", "moveReq", req)
    }

    //点击棋子
    optChess(entity: ChessEntity) {
        let boardEntity = entity.parent as BoardEntity;
        if (boardEntity.BoardModel.state != GAME_STATE.playing) {
            return;
        }
        if (boardEntity.BoardModel.nextDoing.playerId != boardEntity.BoardModel.selfPlayer!.playerId) {
            oops.gui.toast("还没轮到你走棋")
            return;
        }
        let chessBll = entity.ChessBll;
        //判断是否是自己的棋子
        if (chessBll.isSelf) {
            if (boardEntity.BoardBll.touchChess) {
               //放下棋子
                this.changeChessCanMove(boardEntity.BoardBll.touchChess, false);
            }
            
            if (boardEntity.BoardBll.touchChess == entity) {
                //放下棋子
                boardEntity.BoardBll.touchChess = null;
                boardEntity.BoardView.hideTouchChess();
                return;
            }
            //拿起棋子
            boardEntity.BoardBll.touchChess = entity;
            boardEntity.BoardView.showTouchChess(entity);
            this.changeChessCanMove(boardEntity.BoardBll.touchChess, true); 
        } else {
            if (boardEntity.BoardBll.touchChess) {
                //吃棋子 点击位置去触发
            } else {
                //拿起棋子
                oops.gui.toast("不是你的棋子")
            }
        }
    }

    execGameState(entity: BoardEntity, msgBody: chinese_chess_game.IgameStateRes) {
        console.log("execGameState >>> ", entity, msgBody)
        entity.BoardModel.state = msgBody.state!;
        entity.BoardModel.playerList = msgBody.playerList!;
        for(let i = 0; i < msgBody.playerList!.length; i++) {
            let player = msgBody.playerList![i];
            if (player.playerId == smc.hall.HallModel.PlayerId) {
                entity.BoardModel.selfPlayer = player;
            } else {
                entity.BoardModel.rivalPlayer = player;
            }
        }
        entity.BoardModel.nextDoing = msgBody.nextDoing!;
        entity.BoardModel.winPlayerId = msgBody.winPlayerId!;

        entity.BoardView.showPlayerInfo();

        entity.BoardBll.chessMap = {};
        entity.BoardBll.chessPosMap = {};
        let chessList = msgBody.chessList!;
        entity.BoardModel.chessList = chessList;
        for (let i = 0; i < chessList.length; i++) {
            let chess = chessList[i];
            let chessEntity = entity.BoardBll.chessList[i];
            if (!chessEntity.has(ChessBllComp)) {
                chessEntity.addComponents<ecs.Comp>(ChessBllComp);
            }
            
            chessEntity.ChessBll.chessType = chess.chessType!;
            if (chess.chessType! > CHESS_TYPE.BLACK_Z) {
                chessEntity.ChessBll.teamType = TEAM_TYPE.RED;
            } else {
                chessEntity.ChessBll.teamType = TEAM_TYPE.BLACK;
            }

            if (entity.BoardModel.selfPlayer!.teamType == chessEntity.ChessBll.teamType) {
                chessEntity.ChessBll.isSelf = true;
            } else {
                chessEntity.ChessBll.isSelf = false;
            }
            chessEntity.ChessBll.id = chess.chessId!;
            chessEntity.ChessBll.row = chess.row!;
            chessEntity.ChessBll.col = chess.col!;
            entity.BoardBll.chessMap[chess.chessId!] = chessEntity;

            if (!entity.BoardBll.chessPosMap[chess.row!]) {
                entity.BoardBll.chessPosMap[chess.row!] = {};
            }
            entity.BoardBll.chessPosMap[chess.row!][chess.col!] = chessEntity;
        }
    }

    getGameState(entity: BoardEntity) {
        smc.net.GetNode("game").Req("chinese_chess_game", "gameStateReq", {playerId : smc.hall.HallModel.PlayerId})
        .then(body => {
            if (body.isErr) {
                oops.gui.toast("获取游戏状态失败")
                console.log("获取游戏状态失败 >>> ", body)
            } else {
                console.log("获取游戏状态成功 >>> ", body)
                this.execGameState(entity, body.msgBody);
            }
        }).catch(body => {
            oops.gui.toast("获取游戏状态失败")
            console.log("获取游戏状态失败 >>> ", body)
        })
    }

    firstUpdate(entity: BoardEntity): void {
        //这里只会执行一次
    }

    update(entity: BoardEntity) {
        if (entity.BoardBll.isOver) {
            return;
        }
        if (entity.BoardModel.state == GAME_STATE.playing) {
            entity.BoardBll.addTime += this.dt;
            if (entity.BoardModel.nextDoing.playerId == entity.BoardModel.selfPlayer!.playerId) {
                entity.BoardView.showSelfRemainTime();
            } else {
                entity.BoardView.showRivalRemainTime();
            }
        } else if (entity.BoardModel.state == GAME_STATE.over) {
            entity.BoardBll.isOver = true;
            //关闭游戏服连接
            smc.net.GetNode("game").Close();
            if (entity.BoardBll.overEntity) {
                if (entity.BoardModel.winPlayerId == entity.BoardModel.selfPlayer!.playerId) {
                    entity.BoardBll.overEntity.OverBll.isWin = true;
                } else {
                    entity.BoardBll.overEntity.OverBll.isWin = false;
                }
                ModuleUtil.addViewUi(entity.BoardBll.overEntity!, OverViewComp, UIID.Over);
            }
        }
    }
}