import {WebSock} from "../../../extensions/oops-plugin-framework/assets/libs/network/WebSock"
import { NetNode, NetNodeOpt, connectCb } from "../../libs/network/NetNode";
import { INetworkTips } from "../../../extensions/oops-plugin-framework/assets/libs/network/NetInterface";
import { Logger } from "../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { NetProtobuf } from "../../libs/network/NetProtobuf";
import proto from "../../../protos-js/proto.js"

interface nodeMap {
    [key: string] : NetNode,
}

interface nodeOptMap {
    [key: string] : Opt
}

interface nodeConnOptMap {
    [key: string] : connectOpt
}

export interface Opt {
    name: string,
    networkTips? : INetworkTips,
    protoPacks : string[],
    reconnectInvalTime? : number,
    reqTimeOut? : number,
    packTimeOut? : number,
    heartInvalTime? : number,
    heartTimeOut? : number,
}

export interface connectOpt {
    host : string,
    token : string,
    playerId : number,
    protocol : string,
    connected? : Function,   //连接成功回调
    authSuccCb? : Function,  //认证成功回调
    autoReconnect? :number,  //自动重连次数
}

export class NetNodeManager {
    protected _nodeMap : nodeMap = {}           //记录结点
    protected _nodeOptMap : nodeOptMap = {}
    protected _nodeConnOptMap : nodeConnOptMap = {}
    protected _nodeLoginRspMap : any = {}

    //设置结点
    SetNode(opt: Opt) {
        if (this.GetNode(opt.name)) {
            this.DelNode(opt.name)
        }
        let ws = new WebSock()
        let node = new NetNode()
        let pro = new NetProtobuf()
        pro.Init(opt.name, proto, opt.protoPacks)
        let netopt : NetNodeOpt = {
            name : opt.name,
            socket : ws,
            networkTips : opt.networkTips,
            protoCode : pro,
            reconnectInvalTime : opt.reconnectInvalTime,
            reqTimeOut : opt.reqTimeOut,
            packTimeOut : opt.packTimeOut,
            heartInvalTime : opt.heartInvalTime,
            heartTimeOut : opt.heartTimeOut,
            connectedCb : (name: string)=>{
                let connOpt = this._nodeConnOptMap[name]
                if (!connOpt || !connOpt.connected) {
                    return
                }
                connOpt.connected()
            },
            disConnectedCb : (name: string)=>{
                if (!this._nodeMap[name]) {
                    return false
                }
                return true
            },
            authCb : async (name: string) => {
                let node = this.GetNode(name)
                if (!node) {
                    return false
                }
                let connOpt = this._nodeConnOptMap[name]
                let rsp = await node.AsyncReq("login", "LoginReq", {
                    token: connOpt.token,
                    playerId: connOpt.playerId,
                })
                this._nodeLoginRspMap[name] = rsp
                if(!rsp.isErr) {
                    return true
                } else {
                    return false
                }
            },
            heartCb : async(name: string) => {
                let node = this.GetNode(name)
                let rsp = await node.AsyncReq("login", "HeartReq", {
                    time : Math.floor(Date.now() / 1000)
                })
                if (!rsp.isErr) {
                    return true
                } else {
                    return false
                }
            },
            authSuccCb : (name : string) => {
                let connOpt = this._nodeConnOptMap[name]
                if (!connOpt || !connOpt.authSuccCb) {
                    return
                }
                connOpt.authSuccCb()
            }
        }
        node.Init(netopt)
        
        this._nodeOptMap[opt.name] = opt
        this._nodeMap[opt.name] = node
    }

    //获取结点
    GetNode(name: string) {
        return this._nodeMap[name]
    }

    //尝试连接
    TryConnect(name: string, connOpt :connectOpt) {
        let node = this.GetNode(name)
        if (!node) {
            Logger.logNet(`TryConnect node not exists name[${name}]`)
            return;
        }
        this._nodeConnOptMap[name] = connOpt
        return node.Connect({
            url : connOpt.protocol + "://" + connOpt.host,
            autoReconnect : connOpt.autoReconnect || 3,
        })
    }
    //删除结点
    DelNode(name: string) {
        let node = this.GetNode(name)
        if (!node) {
            return
        }
        node.Close()
        delete this._nodeMap[name]
        delete this._nodeOptMap[name]
        delete this._nodeConnOptMap[name]
        delete this._nodeLoginRspMap[name]
    }
    //获取登录返回
    GetLoginRsp(name: string) {
        return this._nodeLoginRspMap[name]
    }
}