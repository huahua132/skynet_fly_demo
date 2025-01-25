import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {hallserver_friend} from "../../../../../protos-js/proto"

/** 数据层对象 */
@ecs.register('FirendModel')
export class FirendModelComp extends ecs.Comp {
    firendList: hallserver_friend.IOneFriend[] = [];
    addReqList: hallserver_friend.IAddReqListNotice = null!;
    /** 数据层组件移除时，重置所有数据为默认值 */
    reset() {
        this.firendList = [];
        this.addReqList = null!;
    }
}