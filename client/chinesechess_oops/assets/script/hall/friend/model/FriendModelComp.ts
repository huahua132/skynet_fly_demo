import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {hallserver_friend} from "../../../../../protos-js/proto"

/** 数据层对象 */
@ecs.register('FriendModel')
export class FriendModelComp extends ecs.Comp {
    friendList: hallserver_friend.IOneFriend[] = [];
    addReqList: hallserver_friend.IAddReqListNotice = null!;
    /** 数据层组件移除时，重置所有数据为默认值 */
    reset() {
        this.friendList = [];
        this.addReqList = null!;
    }
}