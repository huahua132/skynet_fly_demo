/*
 * @Author: dgflash
 * @Date: 2022-07-22 17:06:22
 * @LastEditors: bansomin
 * @LastEditTime: 2024-03-31 01:20:18
 */
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { AsyncQueue, NextFunction } from "../../../../../extensions/oops-plugin-framework/assets/libs/collection/AsyncQueue";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { UIID } from "../../../common/enum/UIConfig"
import { Initialize } from "../Initialize";
import { LoadingViewComp } from "../view/LoadingViewComp";
import {JsonAsset} from "cc"
import { smc } from "../../../common/SingletonModuleComp"
import { Tables } from "../../../../libs/schema"

/** 初始化游戏公共资源 */
@ecs.register('InitRes')
export class InitResComp extends ecs.Comp {
    reset() { }
}

function loadDataTable(filename: string) {
    let config = oops.res.get("data_tables/" + filename, JsonAsset)
    if (config) {
        return Object.freeze(config.json)
    } else {
        oops.log.trace("loadDataTable err filename:" + filename)
        return {}
    }
}

/** 初始化资源逻辑注册到Initialize模块中 */
@ecs.register('Initialize')
export class InitResSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(InitResComp);
    }

    entityEnter(e: Initialize): void {
        var queue: AsyncQueue = new AsyncQueue();

        // 加载公共资源
        this.loadCommon(queue);
        // 加载游戏资源
        this.loadGame(queue);
        // 加载游戏内容加载进度提示界面
        this.onComplete(queue, e);

        queue.play();
    }

    /** 加载公共资源（必备） */
    private loadCommon(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            oops.res.loadDir("common", next);
        });
    }

    /** 加载游戏资源 */
    private loadGame(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            oops.res.loadDir("game", next);
            oops.res.loadDir("gui", next);
            oops.res.loadDir("data_tables", next);
        });
    }

    /** 加载完成进入游戏内容加载界面 */
    private onComplete(queue: AsyncQueue, e: Initialize) {
        queue.complete = async () => {
            smc.tables = new Tables(loadDataTable);
            ModuleUtil.addViewUi(e, LoadingViewComp, UIID.Loading);
            e.remove(InitResComp);
            // oops.res.dump();
            // console.log(">>>> ", smc.tables)
        };
    }
}