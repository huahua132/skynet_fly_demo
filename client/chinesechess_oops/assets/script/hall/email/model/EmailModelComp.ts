import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {hallserver_email} from "../../../../../protos-js/proto";
import { EmailItemEntity } from "../children/item/EmailItemEntity";

/** 数据层对象 */
@ecs.register('EmailModel')
export class EmailModelComp extends ecs.Comp {
    EmailListMap: Map<number,hallserver_email.IoneEmail[]> = new Map<number, hallserver_email.IoneEmail[]>();
    EmailItemEntityMap : Map<number, EmailItemEntity> = new Map<number,EmailItemEntity>();
    EmailMap: Map<number, hallserver_email.IoneEmail> = new Map<number, hallserver_email.IoneEmail>();
    /** 数据层组件移除时，重置所有数据为默认值 */
    reset() {
        this.EmailListMap = new Map<number, hallserver_email.IoneEmail[]>();
        this.EmailItemEntityMap = new Map<number,EmailItemEntity>();
        this.EmailMap = new Map<number,hallserver_email.IoneEmail>();
    }
}