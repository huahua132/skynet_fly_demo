import { LayerType, UIConfig } from "db://oops-framework/core/gui/layer/LayerManager";

/** 界面唯一标识（方便服务器通过编号数据触发界面打开） */
export enum UIID {
    /** 资源加载界面 */
    Loading = 1,
    /** 提示弹出窗口 */
    Alert,
    /** 确认弹出窗口 */
    Confirm,
    /** 登录界面 */
    Login,
    /** 大厅界面 */
    Hall,
    /** 匹配成功窗口 */
    Match,
    /** 游戏界面 */
    Board,
    /** 游戏结束界面 */
    Over,
    /** 邮件界面 */
    Email,
}

/** 打开界面方式的配置数据 */
export const UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Alert]: { layer: LayerType.Dialog, prefab: "common/prefab/alert", mask: true },
    [UIID.Confirm]: { layer: LayerType.Dialog, prefab: "common/prefab/confirm", mask: true },
    [UIID.Loading]: { layer: LayerType.UI, prefab: "gui/loading/loading" },
    [UIID.Login] : {layer: LayerType.UI, prefab: "gui/login/login"},
    [UIID.Hall] : {layer: LayerType.UI, prefab: "gui/hall/hall"},
    [UIID.Match] : {layer: LayerType.PopUp, prefab: "gui/hall/match"},
    [UIID.Board] : {layer: LayerType.UI, prefab: "gui/game/board"},
    [UIID.Over] : {layer: LayerType.PopUp, prefab: "gui/game/over"},
    [UIID.Email] : {layer: LayerType.UI, prefab: "gui/hall/email"},
}