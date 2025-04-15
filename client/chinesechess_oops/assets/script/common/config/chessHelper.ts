import {smc} from "../SingletonModuleComp"
import {chess} from "../../../libs/schema"

export class chessHelper {
    public static GetRankCfgByScore(score: number): chess.chess_rank {
        let cfgs = smc.tables.tb_chess_rank.getDataList()
        let preCfg = cfgs[0];
        for (let i = 1; i < cfgs.length; i++) {
            let oneCfg = cfgs[i]
            if (score < oneCfg.needScore) {
                break
            } else {
                preCfg = oneCfg
            }
        }
        return preCfg
    }
}