import { error, warn } from "cc";
import { ISocket, INetworkTips } from "../../../extensions/oops-plugin-framework/assets/libs/network/NetInterface";
import { Logger } from "../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { NetProtocol, PACK_TYPE, MSG_TYPE } from "./NetProtocol";
import { Iprotocode } from "./NetInterface";

const MAX_UINT32: number = 2 ** 32 - 1;
let protocol = new NetProtocol();
/** 网络连接参数 */
export interface NetConnectOptions {
    host?: string,              // 地址
    port?: number,              // 端口
    url?: string,               // url，与地址+端口二选一
    autoReconnect?: number,     // -1 永久重连，0不自动重连，其他正整数为自动重试次数
}

var NetNodeStateStrs = ["已关闭", "连接中", "验证中", "可传输数据"];

export type connectCb = (name: string) => void;
export type authSuccCb = (name: string) => void;
type disconnectCb = (name: string) => boolean;
type authCb = (name: string) => Promise<boolean>;
type heartCb = (name: string) => Promise<boolean>;

/** 网络提示类型枚举 */
export enum NetTipsType {
    Connecting,
    ReConnecting,
    Requesting,
}

/** 网络状态枚举 */
export enum NetNodeState {
    Closed,                     // 已关闭
    Connecting,                 // 连接中
    Checking,                   // 验证中
    Working,                    // 可传输数据
}

//初始化选项
export interface NetNodeOpt {
    name : string,                       //结点名称
    socket : ISocket,                    //网络接口
    networkTips? : INetworkTips,         //tip接口
    protoCode : Iprotocode,              //协议编码接口
    reconnectInvalTime? : number,        //重连尝试间隔
    reqTimeOut? : number,                //请求超时时间
    packTimeOut? : number,               //分包粘包超时时间
    heartInvalTime? : number,            //心跳发送时间
    heartTimeOut? : number,              //心跳超时时间
    
    connectedCb? : connectCb,            //连接成功回调
    disConnectedCb? : disconnectCb,      //断开连接回调
    heartCb? : heartCb,                  //心跳回调
    authCb? : authCb,                    //认证回调
    authSuccCb: authSuccCb,              //认证成功回调
}

interface pushCallBack {
    [key: number] : Function;
}

interface waitResult {
    reject : Function,
    resolve : Function,
    timer : any,
}

interface rpcRsp {
    isErr : boolean,            //是否出错
    msgBody : any,              //服务端回复的错误信息
    errmsg : string,            //本地的错误信息，超时、连接关闭
}

interface waitResultMap {
    [key: number] : waitResult;
}

interface msg {
    msgsz : number,
    msgbuffer : Uint8Array,
    timer : any,
    recvsz : number,
}

interface msgMap {
    [key: number] : msg;
}

export class NetNode {
    protected _name: string = "";                                           // 结点名称
    protected _connectOptions: NetConnectOptions | null = null;
    protected _socket: ISocket | null = null;                               // Socket对象（可能是原生socket、websocket、wx.socket...)
    protected _networkTips: INetworkTips | null = null;                     // 网络提示ui对象（请求提示、断线重连提示等）
    protected _isSocketOpen: boolean = false;                               // Socket是否连接成功过
    protected _state: NetNodeState = NetNodeState.Closed;                   // 节点当前状态
    protected _autoReconnect: number = 0;                                   // 自动重连次数 
    protected _tryReconnectTimes : number = 0;                              // 已尝试重连次数
    protected _connectedCb : connectCb | null = null;                       // 连接成功回调
    protected _disConnectedCb : disconnectCb | null = null;                 // 断开连接回调
    protected _authCb : authCb | null = null;                               // 认证回调
    protected _heartCb : heartCb | null = null;                             // 心跳回调
    protected _authSuccCb :authSuccCb | null = null;                        // 认证成功回调
    protected _protoCode : Iprotocode | null = null;                        // 协议编码工具    
    protected _pushHandles : pushCallBack = {};                             // push消息处理 
    protected _reqSession : number = 1;                                     // 自增的请求session
    protected _waitResultMap: waitResultMap = {};                           // rpc请求等待结果的对象               
    protected _reqTimeOut : number = 10000;                                 // 请求超时时间  默认 10秒
    protected _packTimeOut : number = 10000;                                // 分包消息超时时间  默认 10秒
    protected _heartInvalTime : number = 5000;                              // 心跳发送间隔 默认 5秒
    protected _heartTimeOut : number = 10000;                               // 心跳超时时间 默认 10秒
    protected _reconnectInvalTime : number = 3000;                          // 重连尝试间隔时间  默认 3秒
    protected _rspMsgMap : msgMap = {};                                     // 需要粘包的回复消息
    protected _pushMsgMap : msgMap = {};                                    // 需要粘包的推送消息
    protected _isAuthFail : boolean = false;                                // 是否认证失败
    protected _reconnectTimer : any;                                        // 重连定时器
    protected _heartTimer : any;                                            // 心跳定时器
    protected _heartTimeOutTimer : any;                                     // 心跳超时定时器
    protected _isActClose : boolean = false;                                // 是否主动关闭

    protected isAutoReconnect() {
        if (this._autoReconnect == -1 || this._tryReconnectTimes < this._autoReconnect) {
            return true
        }
        return false
    }

    // 心跳超时定时器处理
    protected resetHeartTimeOutTimer() {
        if (this._heartTimeOutTimer !== null) {
            clearTimeout(this._heartTimeOutTimer)
        }
        this._heartTimeOutTimer = setTimeout(() => {
            warn(`心跳超时 关闭网络连接 nodename[${this._name}]`)
            Logger.logNet(`心跳超时 关闭网络连接 nodename[${this._name}]`)
            this.Close()
        }, this._heartTimeOut)
    }

    // 心跳定时器
    protected resetHeartTimer() {
        if (this._heartTimer !== null) {
            clearTimeout(this._heartTimer)
        }
        this._heartTimer = setTimeout(() => {
            if (!this._heartCb) {
                return;
            }
            this._heartCb(this._name)
            .then(ret => {
                this.resetHeartTimeOutTimer()
                this.resetHeartTimer()
            })
        }, this._heartInvalTime)
    }

    protected clearTimer() {
        if (this._heartTimer !== null) {
            clearTimeout(this._heartTimer)
        }
        if (this._heartTimeOutTimer !== null) {
            clearTimeout(this._heartTimeOutTimer)
        }
        if (this._reconnectTimer !== null) {
            clearTimeout(this._reconnectTimer);
        }
    }

    protected newReqSession() {
        let session = this._reqSession;
        this._reqSession = this._reqSession + 2;
        if (this._reqSession >= MAX_UINT32) {
            this._reqSession = 1;
        }
        return session;
    }

    protected updateNetTips(tipsType: NetTipsType, isShow: boolean) {
        if (this._networkTips) {
            if (tipsType == NetTipsType.Requesting) {
                this._networkTips.requestTips(isShow);
            }
            else if (tipsType == NetTipsType.Connecting) {
                this._networkTips.connectTips(isShow);
            }
            else if (tipsType == NetTipsType.ReConnecting) {
                this._networkTips.reconnectTips(isShow);
            }
        }
    }

    protected onChecked() {
        Logger.logNet(`连接验证成功，进入工作状态 name[${this._name}]`);
        this._state = NetNodeState.Working;
        // 关闭连接或重连中的状态显示
        this.updateNetTips(NetTipsType.Connecting, false);
        this.updateNetTips(NetTipsType.ReConnecting, false);

        if (!this._heartCb) {
            return;
        }
        this.resetHeartTimeOutTimer()
        this.resetHeartTimer()

        if (this._authSuccCb) {
            this._authSuccCb(this._name)
        }
    }

    protected onConnected(event: any) {
        Logger.logNet(`socket 连接成功 name[${this._name}]`)
        this._isSocketOpen = true;
        if (this._connectedCb) {
            this._connectedCb(this._name);
        }

        if (this._authCb != null) {
            this._state = NetNodeState.Checking;
            this._authCb(this._name)
            .then(ret => {
                if (!ret) {
                    this._isAuthFail = true
                    Logger.logNet(`连接验证失败，关闭连接 name[${this._name}]`);
                    this._socket?.close()
                    return;
                } else {
                    this.onChecked()
                    Logger.logNet(`网络已连接当前状态为name[${this._name}] 【${NetNodeStateStrs[this._state]}】`);
                }
            })
            .catch(err => {
                this._isAuthFail = true
                Logger.logNet(err, `catch 连接验证失败，关闭连接 name[${this._name}]`);
                this._socket?.close()
                return;
            })
        }
    }

    protected onMessage(msg: any) {
        let body = protocol.unpack(msg)
        let packtype = body.packtype;
        let msgtype = body.msgtype;
        let packid = body.packid;
        let session = body.session;
        let msgbuffer = body.msgbuffer;
        if (msgtype == MSG_TYPE.CLIENT_PUSH || msgtype == MSG_TYPE.CLIENT_REQ) {
            Logger.logNet(`invalid req nodename[${this._name}] packid[${packid}] msgtype[${msgtype}]`)
            return;
        }

        let reqSession = null;
        if (msgtype != MSG_TYPE.SERVER_PUSH) {
            if (session % 2 != 0) {
                Logger.logNet(`invalid req nodename[${this._name}] packid[${packid}] session[${session}]`)
                return;
            }
            reqSession = session - 1;
        } else {
            if (session <= 0 || session > MAX_UINT32) {
                Logger.logNet(`invalid push nodename[${this._name}] packid[${packid}] session[${session}]`)
                return;
            }
        }
        //整包处理
        if (packtype == PACK_TYPE.WHOLE) {
            let msgBody = this._protoCode?.Decode(packid, msgbuffer);
            //rpc 回复
            if (reqSession) {
                if (!this._waitResultMap[reqSession]) {
                    Logger.logNet(`invalid rsp nodename[${this._name}] packid[${packid}] session[${session}]`)
                    return;
                }
                let resultObj = this._waitResultMap[reqSession]
                let rsp: rpcRsp = {
                    isErr : msgtype == MSG_TYPE.SERVER_ERR,
                    msgBody : msgBody,
                    errmsg : "",
                }
                if (msgtype == MSG_TYPE.SERVER_ERR) {
                    Logger.logNet(msgBody, `rsp error msg nodename[${this._name}] packid[${packid}]`)
                }
                resultObj.resolve(rsp);
                return;
            } else {
                let handle = this._pushHandles[packid];
                if (handle) {
                    if (msgtype == MSG_TYPE.SERVER_ERR) {
                        Logger.logNet(msgBody, `push error msg nodename[${this._name}] packid[${packid}]`)
                    }
                    handle(msgBody);
                } else {
                    Logger.logNet(`drop package nodename[${this._name}] packid[${packid}]`);
                }
                return;
            }
        }

        let msgMap = null;
        if (msgtype == MSG_TYPE.SERVER_RSP || msgtype == MSG_TYPE.SERVER_ERR) {
            msgMap = this._rspMsgMap
        } else {
            msgMap = this._pushMsgMap
        }

        if (packtype == PACK_TYPE.HEAD) {
            if (msgMap[session]) {
                Logger.logNet(`repeat session nodename[${this._name}] packid[${packid}] session[${session}]`)
                return;
            }
            let msgsz : number = body.msgsz || 0
            msgMap[session] = {
                msgsz : msgsz,
                msgbuffer : new Uint8Array(msgsz),
                timer : setTimeout(() => {
                    Logger.logNet(`pack time out nodename[${this._name}] packid[${packid} msgsz[${msgsz}]]`)
                    delete msgMap[session];
                }, this._packTimeOut),
                recvsz : 0,
            }
        } else if (packtype == PACK_TYPE.BODY) {
            let oneMsg = msgMap[session];
            if (!oneMsg || !msgbuffer) {
                Logger.logNet(`invalid BODY msg nodename[${this._name}] packid[${packid}] session[${session}] msgbuffer[${msgbuffer}]`)
                return;
            }
            if (oneMsg.recvsz + msgbuffer.length > oneMsg.msgsz) {
                Logger.logNet(`invalid BODY msg msgsz err nodename[${this._name}] packid[${packid}] session[${session}] recvsz[${oneMsg.recvsz + msgbuffer.length}] msgsz[${oneMsg.msgsz}]`)
                return;
            }
            oneMsg.msgbuffer.set(msgbuffer, oneMsg.recvsz);
            oneMsg.recvsz += msgbuffer.length;
        } else if (packtype == PACK_TYPE.TAIL) {
            let oneMsg = msgMap[session];
            if (!oneMsg || !msgbuffer) {
                Logger.logNet(`invalid TAIL msg nodename[${this._name}] packid[${packid}] session[${session}] msgbuffer[${msgbuffer}]`)
                return;
            }
            if (oneMsg.recvsz + msgbuffer.length != oneMsg.msgsz) {
                Logger.logNet(`invalid TAIL msg msgsz err nodename[${this._name}] packid[${packid}] session[${session}] recvsz[${oneMsg.recvsz + msgbuffer.length}] msgsz[${oneMsg.msgsz}]`)
                return;
            }
            oneMsg.msgbuffer.set(msgbuffer, oneMsg.recvsz);
            oneMsg.recvsz += msgbuffer.length;
            let msgBody = this._protoCode?.Decode(packid, oneMsg.msgbuffer);
            delete msgMap[session];
            //rpc 回复
            if (reqSession) {
                if (!this._waitResultMap[reqSession]) {
                    Logger.logNet(`invalid rsp nodename[${this._name}] packid[${packid}] session[${session}]`)
                    return;
                }
                let resultObj = this._waitResultMap[reqSession];
                let rsp: rpcRsp = {
                    isErr : msgtype == MSG_TYPE.SERVER_ERR,
                    msgBody : msgBody,
                    errmsg : "",
                }
                if (msgtype == MSG_TYPE.SERVER_ERR) {
                    Logger.logNet(msgBody, `rsp error msg nodename[${this._name}] packid[${packid}]`)
                }
                resultObj.resolve(rsp);
                return;
            } else {
                let handle = this._pushHandles[packid];
                if (handle) {
                    if (msgtype == MSG_TYPE.SERVER_ERR) {
                        Logger.logNet(msgBody, `push error msg nodename[${this._name}] packid[${packid}]`)
                    }
                    handle(msgBody);
                } else {
                    Logger.logNet(`drop package nodename[${this._name}] packid[${packid}]`);
                }
                return;
            }
        } else {
            Logger.logNet(`invalid nodename[${this._name}] packid[${packid}] packtype[${packtype}]`)
            return;
        }
    }

    protected onError(event: any) {
        Logger.logNet(event, `onError nodename[${this._name}]`);
        error(event);
    }

    protected onClosed(event: any) {
        Logger.logNet(event, `onClosed nodename[${this._name}]`);
        this._state = NetNodeState.Closed;
       
        //重置一些数据
        this.clearTimer();
        this._tryReconnectTimes = 0;
        this._rspMsgMap = {}
        this._pushMsgMap = {}
        let rsp: rpcRsp = {
            isErr : true,
            msgBody : null,
            errmsg : "closed"
        }
         for (let session in this._waitResultMap) {
             let waitResult = this._waitResultMap[session]
             waitResult.reject(rsp)       //请求连接已关闭
         }

        if (this._disConnectedCb && !this._disConnectedCb(this._name)) {
            return;
        }

        //认证失败就不必重连了
        if (this._isAuthFail) {
            return;
        }
        //主动关闭不重连
        if (this._isActClose) {
            return;
        }
        //尝试重连
        if (this.isAutoReconnect()) {
            this.updateNetTips(NetTipsType.ReConnecting, true);
            this._reconnectTimer = setTimeout(() => {
                //主动关闭不重连
                if (this._isActClose) {
                    return;
                }
                this._socket?.close();
                this.Connect(this._connectOptions!);
                this._tryReconnectTimes += 1;
            }, this._reconnectInvalTime);
        }
    }

    // 初始化
    Init(opt : NetNodeOpt) {
        this._name = opt.name;
        this._socket = opt.socket;
        this._networkTips = opt.networkTips || null;
        this._protoCode = opt.protoCode
        this._connectedCb = opt.connectedCb || null
        this._disConnectedCb = opt.disConnectedCb || null
        this._authCb = opt.authCb || null
        this._heartCb = opt.heartCb || null
        this._authSuccCb = opt.authSuccCb || null
        if (opt.reqTimeOut) {
            this._reqTimeOut = opt.reqTimeOut
        }

        if (opt.packTimeOut) {
            this._packTimeOut = opt.packTimeOut
        }

        if (opt.heartInvalTime) {
            this._heartInvalTime = opt.heartInvalTime
        }

        if (opt.heartTimeOut) {
            this._heartTimeOut = opt.heartTimeOut
        }

        if (opt.reconnectInvalTime) {
            this._reconnectInvalTime = opt.reconnectInvalTime
        }

        this._socket.onConnected = (event) => { this.onConnected(event) };
        this._socket.onMessage = (msg) => { this.onMessage(msg) };
        this._socket.onError = (event) => { this.onError(event) };
        this._socket.onClosed = (event) => { this.onClosed(event) };
    }

    //请求建立连接
    Connect(options: NetConnectOptions) :boolean {
        if (this._socket && this._state == NetNodeState.Closed) {
            this._isActClose = false;
            this._state = NetNodeState.Connecting;
            if (!this._socket.connect(options)) {
                this.updateNetTips(NetTipsType.Connecting, false);
                return false;
            }
            if (this._connectOptions == null && typeof options.autoReconnect == "number") {
                this._autoReconnect = options.autoReconnect;
            }
            this._connectOptions = options;
            this.updateNetTips(NetTipsType.Connecting, true);
            return true;
        }
        return false;
    }

    //注册推送消息处理函数
    RegPushHandle(packname: string, msgname: string, callback: Function) {
        const packId = this._protoCode?.GetPackId(packname, msgname);
        if (this._pushHandles[packId]) {
            Logger.logNet(`exists pushHandle packname[${packname}] msgname[${msgname}]`)
            return;
        }
        this._pushHandles[packId] = callback;
    }

    //请求
    Req(packname: string, msgname: string, msgbody: any, isShowTip: Boolean = false) : Promise<rpcRsp> {
        let session = this.newReqSession();
        const packId = this._protoCode?.GetPackId(packname, msgname);
        let msgbuffer = this._protoCode?.Encode(packId, msgbody);
        let overbuffer = protocol.pack(MSG_TYPE.CLIENT_REQ, session, packId, msgbuffer);
        if (this._waitResultMap[session]) {
            throw new Error(`exists req nodename[${this._name}] session[${session}]`)
        }
        if (overbuffer) {
            this._socket?.send(overbuffer);
        }
        if (isShowTip) {
            this.updateNetTips(NetTipsType.Requesting, true);
        }
        return new Promise<rpcRsp>((resolve, reject) => {
            this._waitResultMap[session] = {
                reject : reject,
                resolve : resolve,
                timer : setTimeout(() => {
                    let rsp: rpcRsp = {
                        isErr : true,
                        msgBody : null,
                        errmsg : "timeout"
                    }
                    reject(rsp)      //请求超时
                }, this._reqTimeOut),
            }
        }).finally(() => {
            let obj = this._waitResultMap[session];
            clearTimeout(obj.timer);
            delete this._waitResultMap[session];
            if (isShowTip) {
                this.updateNetTips(NetTipsType.Requesting, false);
            }
        })
    }

    //可以使用 await 等待回调后继续执行
    AsyncReq = async(packname: string, msgname: string, msgbody: any, isShowTip: Boolean = false): Promise<rpcRsp> => {
        return this.Req(packname, msgname, msgbody, isShowTip)
    }

    //推送消息
    PushMsg(packname: string, msgname: string, msgbody: any) {
        const packId = this._protoCode?.GetPackId(packname, msgname);
        let msgbuffer = this._protoCode?.Encode(packId, msgbody);
        let overbuffer = protocol.pack(MSG_TYPE.CLIENT_PUSH, 0, packId, msgbuffer);
        if (overbuffer) {
            this._socket?.send(overbuffer);
        }
    }
    //关闭
    Close() {
        this._isActClose = true;
        if (this._networkTips) {
            this._networkTips.connectTips(false);
            this._networkTips.reconnectTips(false);
            this._networkTips.requestTips(false);
        }
        if (this._socket) {
            this._socket.close(1000, "Normal Closure");
        }
    }
}