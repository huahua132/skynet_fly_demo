import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { FirendViewComp } from "../view/FirendViewComp";
import { FirendEntity } from "../FirendEntity";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { smc } from "../../../common/SingletonModuleComp";
import { UIID } from "../../../common/enum/UIConfig";
import {hallserver_friend} from "../../../../../protos-js/proto"

/** 业务输入参数 */
@ecs.register('FirendBll')
export class FirendBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    reset() {
        
    }
}

/** 业务逻辑处理对象 */
@ecs.register('FirendSys')
export class FirendBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    init() {
        console.log("FirendBllSystem init >>>");
        //注册消息监听
        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "FriendListNotice", function(msgBody: hallserver_friend.IFriendListNotice){
            //收到所有好友数据
            let friendList = msgBody.friendList!;
            friendList!.sort((a,b) => {
                return a.lastLogoutTime - b.lastLogoutTime;
            });

            smc.friend.FirendModel.firendList = friendList;
        });

        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "FriendAddNotice", function(msgBody: hallserver_friend.IAddFriendNotice){
            //收到添加好友通知
            let friend = msgBody.friendInfo!;
            let friendList = smc.friend.FirendModel.firendList;
            friendList.push(friend);
            friendList!.sort((a,b) => {
                return a.lastLogoutTime - b.lastLogoutTime;
            });
        });

        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "FriendDelNotice", function(msgBody: hallserver_friend.IDelFriendNotice){
            //收到删除好友通知
            let playerId = msgBody.playerId!;
            let friendList = smc.friend.FirendModel.firendList;
            let index = friendList.findIndex((item) => {
                return item.playerId === playerId;
            });
            if (index >= 0) {
                friendList.splice(index, 1);
            }
        });

        //通知请求添加好友列表
        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "AddFriendListNotice", function(msgBody: hallserver_friend.IAddReqListNotice){
            //收到添加好友列表
            smc.friend.FirendModel.addReqList = msgBody;
        });

        //通知请求添加好友
        smc.net.GetNode("hall").RegPushHandle("hallserver_friend", "AddFriendNotice", function(msgBody: hallserver_friend.IAddReqNotice){
            //收到添加好友请求
            let addReqList = smc.friend.FirendModel.addReqList;
            addReqList.nicknameList?.push(msgBody.nickname!);
            addReqList.playerIdList?.push(msgBody.playerId!);
        });
    }

    filter(): ecs.IMatcher {
        return ecs.allOf(FirendBllComp, FirendViewComp);
    }

    entityEnter(e: FirendEntity): void {
        e.FirendSys = this;
    }

    //点击返回大厅
    bkBtn(entity: FirendEntity) {
        entity.remove(FirendBllComp);
        ModuleUtil.removeViewUi(smc.friend, FirendViewComp, UIID.Firend);
    }

    //点击好友列表
    btnList(entity: FirendEntity) {
        
    }

    //点击好友推荐
    btnFind(entity: FirendEntity) {
        
    }

    //点击好友申请
    btnReq(entity: FirendEntity) {
        
    }
}