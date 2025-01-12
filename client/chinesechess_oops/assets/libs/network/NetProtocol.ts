import { Logger } from "../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";

const MAX_UINT32: number = 2 ** 32 - 1;
const MAX_UINT16: number = 2 ** 16 - 1;
//包类型定义 
export enum PACK_TYPE {
    WHOLE = 0,  //整包
	HEAD  = 1,  //包头
	BODY  = 2,  //包体
	TAIL  = 3,  //包尾
}

export enum MSG_TYPE {
    SERVER_PUSH = 0, //服务端推送
	CLIENT_PUSH = 1, //客户端推送 
	CLIENT_REQ  = 2, //客户端请求
	SERVER_RSP  = 3, //服务端回复
	SERVER_ERR  = 4, //服务端回复错误
}

export interface Body {
    packtype : PACK_TYPE,
    msgtype : MSG_TYPE,
    packid : number,
    session : number,
    msgsz : number | null,
    msgbuffer : Uint8Array | null,
}

export class NetProtocol {
    pack(msgType: MSG_TYPE, session: number, packid: number, msgbuffer: Uint8Array) {
        if (session < 0 || session > MAX_UINT32) {
            Logger.logNet(`invalid session:${session}`)
            return;
        }

        if (packid < 0 || packid > MAX_UINT16) {
            Logger.logNet(`invalid packid:${packid}`)
            return;
        }

        let totalLen = 8 + msgbuffer.length;
        if (totalLen > MAX_UINT16) {
            Logger.logNet(`buffer len cannot be greater than ${MAX_UINT32 - 8}`)
            return;
        }

        if (msgType != MSG_TYPE.CLIENT_PUSH && msgType != MSG_TYPE.CLIENT_REQ) {
            Logger.logNet(`msg type err ${msgType}`)
            return;
        }

        let newBuffer = new ArrayBuffer(10 + msgbuffer.length);
        let view = new DataView(newBuffer);

        view.setUint16(0, totalLen);       //写入包总长度
        view.setUint8(2, PACK_TYPE.WHOLE); //包类型
        view.setUint8(3, msgType);         //消息类型
        view.setUint16(4, packid);         //消息码
        view.setUint32(6, session);        //session
        
        let ubuffer = new Uint8Array(newBuffer);
        ubuffer.set(msgbuffer, 10);
        return ubuffer;
    }

    unpack(arrayBuffer: ArrayBuffer) {
        // 假设包的总长度存储在前两个字节
        let view = new DataView(arrayBuffer);
        const totalLength = view.getUint16(0);
        
        let body:Body = {
            packtype : 0,
            msgtype : 0,
            packid : 0,
            session : 0,
            msgsz : null,
            msgbuffer : null,
        };
        // 检查字节流是否足够长
        if (arrayBuffer.byteLength != totalLength + 2) {
            Logger.logNet(`Buffer is not long enough to contain the specified package.`)
            return body;
        }
        
        // 包类型
        body.packtype = view.getUint8(2);
        body.msgtype = view.getUint8(3);
        body.packid = view.getUint16(4);
        body.session = view.getUint32(6);

        if (body.packtype != PACK_TYPE.HEAD) {
            body.msgbuffer = new Uint8Array(arrayBuffer.slice(10, arrayBuffer.byteLength));
        } else {
            body.msgsz = view.getUint32(10);
        }
        return body;
    }
}