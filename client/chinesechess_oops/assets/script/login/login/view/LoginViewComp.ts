import { _decorator, Label, Node } from "cc"
import {oops} from "db://oops-framework/core/Oops"
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCVMParentComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCVMParentComp";
import {HttpRequest, HttpReturn} from "../../../../libs/network/Http"
import {connectOpt} from "../../../../libs/network/NetNodeManager"
import { smc } from "../../../common/SingletonModuleComp"
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { UIID } from "../../../common/enum/UIConfig"
import {HallViewComp} from "../../../hall/hall/view/HallViewComp"
import {HallBllComp} from "../../../hall/hall/bll/Hall"

const {ccclass, property} = _decorator

enum flagType {
    LOGIN = 1,
    SIGNUP = 2,
}

/** 登录显示模块 */
@ccclass('LoginViewComp')
@ecs.register('LoginView', false)
export class LoginViewComp extends CCVMParentComp {
    data :any = {
        flag : flagType.LOGIN,
    };

    start() {
        this.setButton()
        this.nodeTreeInfoLite()
        this.showBullet(false)
    }

    showBullet(isShow: boolean, showname?: string) {
        let bullet = this.getNode("bullet")
        let btnConfirm = this.getNode("btnConfirm")
        if (isShow) {
            bullet!.active = true
            btnConfirm!.getComponentInChildren(Label)!.string = showname!
        } else {
            bullet!.active = false
        }
    }

    /** 登录按钮 */
    btnLogin() {
        console.warn("btnLogin")
        this.showBullet(true, "登录")
        this.data.flag = flagType.LOGIN
    }
    /** 注册按钮 */
    btnSignup() {
        console.warn("btnSignup")
        this.showBullet(true, "注册")
        this.data.flag = flagType.SIGNUP
    }
    /** 确定按钮 */
    btnConfirm() {
        console.warn("btnConfirm")
        let ip = this.getNode("inputIp")!.getChildByName("TEXT_LABEL")!.getComponent(Label)!.string
        let account = this.getNode("inputAccount")!.getChildByName("TEXT_LABEL")!.getComponent(Label)!.string
        let password = this.getNode("inputPassword")!.getChildByName("TEXT_LABEL")!.getComponent(Label)!.string

        let host = 'http://' + ip + ':11014'
        /** 请求登录 */
        let params = {
            account : account,
            password : password,
            channel : 1,
        }

        let http = new HttpRequest()
        http.server = host
        http.addHeader("Content-Type", "application/json")
        if (this.data.flag == flagType.LOGIN) {
            oops.gui.toast("请求登录")
            http.postAsync('/user/login', params)
            .then(result => {
                if (result.code != 200 || result.body.code != 20000) {
                    console.warn("登录失败!", result)
                    oops.gui.toast("登录失败:" + result.body?.message || result.err)
                } else {
                    oops.gui.toast("登录成功")
                    console.warn("登录成功!", result)
                    let host = result.body.data.host
                    let token = result.body.data.token
                    let playerId = result.body.data.player_id
                    let opt :connectOpt = {
                        host : host,
                        token : token,
                        playerId : playerId,
                        protocol : "ws",
                        connected : ()=> {
                            console.log("连接大厅服成功 !!!>>>>>>>>>>>>>")
                        },
                        authSuccCb : async ()=> {
                            console.log("登录大厅服成功 !!!>>>>>>>>>>>>", smc.hall)
                            smc.hall.HallModel.PlayerId = playerId;
                            smc.hall.addComponents<ecs.Comp>(HallBllComp);
                            await ModuleUtil.addViewUiAsync(smc.hall, HallViewComp, UIID.Hall);
                            ModuleUtil.removeViewUi(this.ent, LoginViewComp, UIID.Login);
                        }
                    }
                    smc.net.TryConnect("hall", opt)
                }
            })
        } else {
        /** 请求注册 */
            oops.gui.toast("请求注册")
            http.postAsync('/user/signup', params)
            .then(result => {
                if (result.code != 200 || result.body.code != 20000) {
                    console.warn("注册失败!", result)
                    oops.gui.toast("注册失败:" + result.body?.message || result.err)
                } else {
                    oops.gui.toast("注册成功!")
                    console.warn("注册成功!", result)
                }
            })
        }
    }

    /** 取消按钮 */
    btnCancel() {
        console.warn("btnCancel")
        this.showBullet(false)
    }

    reset(): void { }
}