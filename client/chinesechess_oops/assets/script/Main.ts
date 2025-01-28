/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-05 18:25:56
 */
import { _decorator, profiler } from 'cc';
import { DEBUG } from 'cc/env';
import { oops } from '../../extensions/oops-plugin-framework/assets/core/Oops';
import { Root } from '../../extensions/oops-plugin-framework/assets/core/Root';
import { ecs } from '../../extensions/oops-plugin-framework/assets/libs/ecs/ECS';
import { Account } from './login/account/Account';
import {HallEntity} from "./hall/hall/Hall"
import { smc } from "./common/SingletonModuleComp"
import { UIConfigData } from './common/enum/UIConfig';
import { Initialize } from './login/initialize/Initialize';
import {PACKS} from "./common/enum/PACK"
import {Opt} from "../libs/network/NetNodeManager"
import {BoardEntity} from "./game/board/BoardEntity"
import { StorageSecuritySimple } from "../../extensions/oops-plugin-framework/assets/core/common/storage/StorageSecuritySimple"
import {EmailEntity} from "./hall/email/EmailEntity"
import {FriendEntity} from "./hall/friend/FriendEntity"

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Root {
    start() {
        if (DEBUG) profiler.showStats();
    }

    protected run() {
        
    }

    protected iniStart() {
        
        console.log("iniStart")
    }

    protected initGui() {
        console.log("initGui")
        oops.gui.init(UIConfigData);
    }

    protected initEcsSystem() {
        console.log("initEcsSystem")
        oops.storage.init(new StorageSecuritySimple());
        //大厅网络
        let opt :Opt = {
            name : "hall",
            protoPacks : PACKS.hall,
        }
        smc.net.SetNode(opt)

        //游戏服网络
        let gameopt :Opt = {
            name : "game",
            protoPacks : PACKS.game,
        }
        smc.net.SetNode(gameopt)
        smc.initialize = ecs.getEntity<Initialize>(Initialize);
        smc.account = ecs.getEntity<Account>(Account);
        smc.hall = ecs.getEntity<HallEntity>(HallEntity);
        smc.game = ecs.getEntity<BoardEntity>(BoardEntity);
        smc.email = ecs.getEntity<EmailEntity>(EmailEntity);
        smc.friend = ecs.getEntity<FriendEntity>(FriendEntity);
    }
}
