import { ecs } from "db://oops-framework/libs/ecs/ECS";
import {EmailItemViewComp} from "../view/EmailItemViewComp"
import {EmailItemEntity} from "../EmailItemEntity"
import { smc } from "../../../../../common/SingletonModuleComp";
import {hallserver_email} from "../../../../../../../protos-js/proto";
import { oops } from "../../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { EmailEntity } from "../../../EmailEntity";

/** 业务输入参数 */
@ecs.register('EmailItemBll')
export class EmailItemBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    Guid : number = 0;
    EmailType : number = 0;
    IsOpen : boolean = false;       //是否展开
    reset() {
        this.Guid = 0;
        this.EmailType = 0;
        this.IsOpen = true;
    }
}

/** 业务逻辑处理对象 */
@ecs.register('EmailItemBllSys')
export class EmailItemBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(EmailItemBllComp, EmailItemViewComp);
    }

    entityEnter(entity: EmailItemEntity): void {
        entity.EmailItemBllSys = this;
    }

    //领取奖励
    async BtnReward(entity: EmailItemEntity) {
        let req : hallserver_email.IItemListEmailReq = {
            guidList : [entity.EmailItemBll.Guid]
        }
        let rsp = await smc.net.GetNode("hall").AsyncReq("hallserver_email", "ItemListEmailReq", req);
        if (rsp.isErr) {
            oops.gui.toast("领取邮件奖励失败");
        } else {
            const emailEntity = entity.parent as EmailEntity;
            emailEntity.EmailBllSys.ItemReward(entity);
        }
    }
}