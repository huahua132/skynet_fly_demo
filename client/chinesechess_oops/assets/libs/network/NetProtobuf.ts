import {oops} from "db://oops-framework/core/Oops"
import {Iprotocode} from "./NetInterface"

interface msgMap {
    [key: string] : number;
}

interface packageMap {
    [key: string] : msgMap;
}

interface msgInfo {
    packname : string,
    msgname : string,
}

interface packnameMap {
    [key: number] : msgInfo
}

interface proto {
    [key: string] : any
}

export class NetProtobuf implements Iprotocode {
    protected _name = "";                         //名称
    protected _proto :proto = {};                 //生成的proto文件
    protected _loadPacks = [];                    //加载的模块
    protected _PACK : packageMap = {};            //packname映射packid
    protected _PACKNAME : packnameMap = {};       //packid映射packname

    //初始化
    Init(name: string, proto: any, loadpacks: string[]) {
        this._name = name;
        this._proto = proto;
        for (let i = 0; i < loadpacks.length; i++) {
            let packname = loadpacks[i];
            if (!this._PACK[packname]) {
                this._PACK[packname] = {};
            }

            let namePackId = this._PACK[packname];
            let mainId = proto[packname].main[packname];
            for (let name in proto[packname].sub) {
                if (!Number(name)) {
                    let sub_id = proto[packname].sub[name];
                    let pack_id = mainId * 100 + sub_id;
                    namePackId[name] = pack_id;
                    this._PACKNAME[pack_id] = {
                        packname : packname,
                        msgname : name,
                    };
                }
            }
        }
        oops.log.logNet({name : name, PACK : this._PACK, PACKNAME : this._PACKNAME}, "初始化协议码映射")
    }

    //编码
    Encode(packid: number, msgBody: any) {
        if (!this._PACKNAME[packid]) {
            oops.log.logNet(`Encode not exists packid:${packid}`)
            return;
        }
        const info = this._PACKNAME[packid];
        let msgObj = this._proto[info.packname][info.msgname];
        return msgObj.encode(msgBody).finish();
    }

    //解码
    Decode(packid: number, buffer: Uint8Array) {
        if (!this._PACKNAME[packid]) {
            oops.log.logNet(`Decode not exists packid:${packid}`)
            return;
        }
        const info = this._PACKNAME[packid];
        let msgObj = this._proto[info.packname][info.msgname];
        return msgObj.decode(buffer);
    }

    //获取packid
    GetPackId(packname: string, msgname: string) {
        if (!this._PACK[packname]) {
            oops.log.logNet(`GetPackId not exists packname:${packname}`)
            return;
        }
        if (!this._PACK[packname][msgname]) {
            oops.log.logNet(`GetPackId not exists msgname:${msgname}`)
            return;
        }

        return this._PACK[packname][msgname];
    }
}