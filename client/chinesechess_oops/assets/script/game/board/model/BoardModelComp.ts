import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { chinese_chess_game } from "../../../../../protos-js/proto.js";

/** 数据层对象 */
@ecs.register('BoardModel')
export class BoardModelComp extends ecs.Comp {
    playerList : chinese_chess_game.IplayerInfo[] = [];            //玩家列表
    state : number = 0;                 //游戏状态
    rivalPlayer : chinese_chess_game.IplayerInfo|null = null;             //对手玩家
    selfPlayer : chinese_chess_game.IplayerInfo|null = null;              //自己玩家
    chessList : chinese_chess_game.IoneChess[] = [];              //棋子列表
    nextDoing : chinese_chess_game.InextDoing = {};              //下一步操作  
    winPlayerId : number = 0;                                    //胜利玩家id
    /** 数据层组件移除时，重置所有数据为默认值 */
    reset() {
        this.playerList = [];
        this.state = 0;
        this.rivalPlayer = null;
        this.selfPlayer = null;
        this.chessList = [];
        this.nextDoing = {};
        this.winPlayerId = 0;
    }
}