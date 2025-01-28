import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FriendViewComp } from "../view/FriendViewComp";
import { FriendEntity } from "../FriendEntity";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { smc } from "../../../common/SingletonModuleComp";
import { UIID } from "../../../common/enum/UIConfig";
import {hallserver_friend} from "../../../../../protos-js/proto"
import { oops } from "db://oops-framework/core/Oops";
import { FriendSugEntity } from "../FriendSugEntity"
import { FriendSugBllComp } from "./FriendSugBll"
import { FriendSugViewComp } from "../view/FriendSugViewComp"
import { FriendReqEntity } from "../FriendReqEntity";
import { FriendReqBllComp } from "./FriendReqBll";
import { FriendReqViewComp } from "../view/FriendReqViewComp"

/** 业务输入参数 */
@ecs.register('FriendBll')
export class FriendBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    sugEntityList: any = [];
    reqEntityList: any = [];
    reset() {
        this.sugEntityList = [];
        this.reqEntityList = [];
    }
}

/** 业务逻辑处理对象 */
@ecs.register('FriendSys')
export class FriendBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    init() {
        console.log("FriendBllSystem init >>>");
        //注册消息监听
        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "FriendListNotice", function(msgBody: hallserver_friend.IFriendListNotice){
            //收到所有好友数据
            console.log("FriendListNotice >>> ", msgBody)
            let friendList = msgBody.friendList!;
            friendList!.sort((a,b) => {
                return a.lastLogoutTime - b.lastLogoutTime;
            });

            smc.friend.FriendModel.friendList = friendList;
        });

        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "AddFriendNotice", function(msgBody: hallserver_friend.IAddFriendNotice){
            //收到添加好友通知
            console.log("AddFriendNotice >>> ", msgBody)
            let friend = msgBody.friendInfo!;
            let friendList = smc.friend.FriendModel.friendList;
            friendList.push(friend);
            friendList!.sort((a,b) => {
                return a.lastLogoutTime - b.lastLogoutTime;
            });
        });

        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "DelFriendNotice", function(msgBody: hallserver_friend.IDelFriendNotice){
            //收到删除好友通知
            console.log("DelFriendNotice >>> ", msgBody)
            let playerId = msgBody.playerId!;
            let friendList = smc.friend.FriendModel.friendList;
            let index = friendList.findIndex((item) => {
                return item.playerId === playerId;
            });
            if (index >= 0) {
                friendList.splice(index, 1);
            }
        });

        //通知请求添加好友列表
        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "AddReqListNotice", function(msgBody: hallserver_friend.IAddReqListNotice){
            //收到添加好友列表
            console.log("AddReqListNotice >>> ", msgBody);
            smc.friend.FriendModel.addReqList = msgBody;
        });

        //通知请求添加好友
        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "AddReqNotice", function(msgBody: hallserver_friend.IAddReqNotice){
            //收到添加好友请求
            console.log("AddReqNotice >>> ", msgBody)
            let addReqList = smc.friend.FriendModel.addReqList;
            addReqList.nicknameList!.push(msgBody.nickname!);
            addReqList.playerIdList!.push(msgBody.playerId!);
        });
    }

    filter(): ecs.IMatcher {
        return ecs.allOf(FriendBllComp, FriendViewComp);
    }

    entityEnter(e: FriendEntity): void {
        e.FriendSys = this;
    }

    clearSugList(entity: FriendEntity) {
        for (let i = entity.FriendBll.sugEntityList.length - 1; i >= 0; i--) {
            let friendSugEntity = entity.FriendBll.sugEntityList[i];
            friendSugEntity.destroy();
            entity.FriendBll.sugEntityList.splice(i, 1);
        }
    }

    clearReqList(entity: FriendEntity) {
        for (let i = entity.FriendBll.reqEntityList.length - 1; i >= 0; i--) {
            let friendReqEntity = entity.FriendBll.reqEntityList[i];
            friendReqEntity.destroy();
            entity.FriendBll.reqEntityList.splice(i, 1);
        }
    }

    delReqList(entity: FriendEntity, delPlayerId: number) {
        let playerIdList = entity.FriendModel.addReqList.playerIdList
        let nicknameList = entity.FriendModel.addReqList.nicknameList
        for (let i = playerIdList!.length - 1; i >= 0; i--) {
            let playerId = playerIdList![i];
            if (playerId == delPlayerId) {
                playerIdList!.splice(i, 1)
                nicknameList!.splice(i, 1)
                break
            }
        }

        for (let i = 0; i < entity.FriendBll.reqEntityList.length; i++) {
            let friendReqEntity: FriendReqEntity = entity.FriendBll.reqEntityList[i];
            if (friendReqEntity.FriendReqBll.playerId == delPlayerId) {
                friendReqEntity.destroy();
                entity.FriendBll.reqEntityList.splice(i, 1);
                break
            }
        }
    }

    //点击返回大厅
    bkBtn(entity: FriendEntity) {
        this.clearSugList(entity)
        this.clearReqList(entity)
        entity.remove(FriendBllComp);
        ModuleUtil.removeViewUi(smc.friend, FriendViewComp, UIID.Friend);
    }

    //点击好友推荐
    async btnFind(entity: FriendEntity) {
        let FriendSugReq: hallserver_friend.IFriendSugReq = {
            playerId : smc.hall.HallModel.PlayerId
        }
        let rsp = await smc.net.GetNode("hall").AsyncReq("hallserver_friend", "FriendSugReq", FriendSugReq)
        if (rsp.isErr) {
            oops.gui.toast("获取好友推荐失败 ");
        } else {
            console.log("好友推荐 >>> ", rsp)
            this.clearSugList(entity)
            let contentNode = entity.FriendView.GetFriendSugContent()
            let rspBody: hallserver_friend.IFriendSugRes = rsp.msgBody
            for (let i = 0; i < rspBody.playerIdList!.length; i++) {
                let playerId = rspBody.playerIdList![i]
                let nickname = rspBody.nicknameList![i]
                let friendSugEntity = ecs.getEntity(FriendSugEntity);
                friendSugEntity.addComponents<ecs.Comp>(FriendSugBllComp);
                friendSugEntity.FriendSugBll.playerId = playerId;
                friendSugEntity.FriendSugBll.nickname = nickname;
                ModuleUtil.addView(friendSugEntity!, FriendSugViewComp, contentNode!, "gui/hall/friend_sug_item");
                entity.FriendBll.sugEntityList.push(friendSugEntity);
            }
        }
    }

    btnReq(entity: FriendEntity) {
        if (!entity.FriendModel.addReqList) {return}
        this.clearReqList(entity)
        console.log(">>>> btnReq >>> ", entity.FriendModel.addReqList)
        let contentNode = entity.FriendView.GetFriendReqContent()
        for (let i = 0; i < entity.FriendModel.addReqList.playerIdList!.length; i++) {
            let playerId = entity.FriendModel.addReqList.playerIdList![i]
            let nickname = entity.FriendModel.addReqList.nicknameList![i]
            let friendReqEntity = ecs.getEntity(FriendReqEntity);
            friendReqEntity.addComponents<ecs.Comp>(FriendReqBllComp);
            friendReqEntity.FriendReqBll.playerId = playerId;
            friendReqEntity.FriendReqBll.nickname = nickname;
            entity.addChild(friendReqEntity);
            ModuleUtil.addView(friendReqEntity!, FriendReqViewComp, contentNode!, "gui/hall/friend_req_item");
            entity.FriendBll.reqEntityList.push(friendReqEntity);
        }
    }
}