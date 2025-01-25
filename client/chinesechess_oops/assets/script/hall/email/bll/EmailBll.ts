import { ecs } from "db://oops-framework/libs/ecs/ECS";
import { smc } from "../../../common/SingletonModuleComp";
import { EmailItemEntity } from "../children/item/EmailItemEntity";
import { EmailEntity } from "../EmailEntity";
import { EmailViewComp } from "../view/EmailViewComp";
import {hallserver_email} from "../../../../../protos-js/proto"
import { EMAIL_TYPE } from "../../../common/enum/EMAIL_TYPE";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import {EmailItemViewComp} from "../children/item/view/EmailItemViewComp";
import { UIID } from "../../../common/enum/UIConfig";

/** 业务输入参数 */
@ecs.register('EmailBll')
export class EmailBllComp extends ecs.Comp {
    /** 业务层组件移除时，重置所有数据为默认值 */
    OptType : EMAIL_TYPE = EMAIL_TYPE.GLOBAL;               //当前选择的邮件类型
    CurShowEmailEntity : EmailItemEntity|null = null;       //当前展开的邮件
    ShowEmailList : number[] = [];                          //当前显示的邮件
    reset() {
        this.OptType = EMAIL_TYPE.GLOBAL;
        this.CurShowEmailEntity = null;
        this.ShowEmailList = [];
    }
}

/** 业务逻辑处理对象 */
@ecs.register('EmailBllSys')
export class EmailBllSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    init() {
        console.log("EmailBllSystem init >>>");
        let sys = this;
        //注册消息监听
        smc.net.GetNode("hall").RegPushHandle("hallserver_email", "AllEmailNotice", function(msgBody: hallserver_email.IAllEmailNotice){
            //收到所有邮件数据
            let EmailListMap = smc.email.EmailModel.EmailListMap;
            let EmailItemEntityMap = smc.email.EmailModel.EmailItemEntityMap;
            let EmailMap = smc.email.EmailModel.EmailMap;
            let typeMap : any = {};
            
            for (let i = 0; i < msgBody.emailList!.length; i++) {
                let email = msgBody.emailList![i];
                typeMap[email.emailType!] = true;

                EmailMap.set(email.guid, email);

                if (!EmailListMap.get(email.emailType!)) {
                    EmailListMap.set(email.emailType!,[]);
                }

                let emailList = EmailListMap.get(email.emailType!);
                emailList!.push(email);

                let emailItemEntity = ecs.getEntity<EmailItemEntity>(EmailItemEntity);
                emailItemEntity.EmailItemBll.Guid = email.guid;
                emailItemEntity.EmailItemBll.EmailType = email.emailType!;
                EmailItemEntityMap.set(email.guid, emailItemEntity);
                smc.email.addChild(emailItemEntity);
            }
            
            for (let emailType in typeMap) {
                let emailList = EmailListMap.get(Number(emailType));
                emailList!.sort((a,b) => a.guid - b.guid);
            }

            sys.refEmailShow(smc.email);
        })

        smc.net.GetNode("hall").RegPushHandle("hallserver_email", "OneEmailNotice", function(msgBody: hallserver_email.IOneEmailNotice){
            //收到一条邮件数据
            let email = msgBody.email!;
            let EmailListMap = smc.email.EmailModel.EmailListMap;
            let EmailItemEntityMap = smc.email.EmailModel.EmailItemEntityMap;
            let EmailMap = smc.email.EmailModel.EmailMap;

            EmailMap.set(email.guid, email);
            let emailList = EmailListMap.get(email.emailType!);
            if (!EmailListMap.get(email.emailType!)) {
                EmailListMap.set(email.emailType!,[]);
            }
            let isNew = true;
            emailList = EmailListMap.get(email.emailType!);
            for (let i = 0; i < emailList!.length; i++) {
                let oldEmail = emailList![i];
                if (oldEmail.guid == email.guid) {
                    emailList![i] = email;
                    
                    isNew = false;
                    break;
                }
            }

            if (isNew) {
                emailList!.push(email);
                let emailItemEntity = ecs.getEntity<EmailItemEntity>(EmailItemEntity);
                emailItemEntity.EmailItemBll.Guid = email.guid;
                emailItemEntity.EmailItemBll.EmailType = email.emailType!;
                EmailItemEntityMap.set(email.guid, emailItemEntity);
                smc.email.addChild(emailItemEntity);
                emailList!.sort((a,b) => a.guid - b.guid);
            }

            sys.refEmailShow(smc.email);
        })
        
        smc.net.GetNode("hall").RegPushHandle("hallserver_email", "DelEmailNotice", function(msgBody: hallserver_email.IDelEmailNotice){
            //收到删除邮件通知
            let delGuidMap: any = {};
            let EmailItemEntityMap = smc.email.EmailModel.EmailItemEntityMap;
            let EmailMap = smc.email.EmailModel.EmailMap;
            for (let i = 0; i < msgBody.guidList!.length; i++) {
                let guid = msgBody.guidList![i];
                delGuidMap[guid] = true;
            }

            let EmailListMap = smc.email.EmailModel.EmailListMap;
            EmailListMap.forEach((emailList, emailType) => {
                for (let i = emailList.length - 1; i >= 0; i--) {
                    let email = emailList[i];
                    if (delGuidMap[email.guid]) {
                        let emailItemEntity = EmailItemEntityMap.get(email.guid);
                        emailItemEntity!.destroy();
                        EmailItemEntityMap.delete(email.guid);
                        EmailMap.delete(email.guid);
                        emailList.splice(i, 1);
                    }
                }
            })

            sys.refEmailShow(smc.email);
        })
    }

    filter(): ecs.IMatcher {
        return ecs.allOf(EmailBllComp, EmailViewComp);
    }

    rmShowEmail(entity: EmailEntity) {
        for (let i = 0; i < entity.EmailBll.ShowEmailList.length; i++) {
            let guid = entity.EmailBll.ShowEmailList[i];
            let emailItemEntity = entity.EmailModel.EmailItemEntityMap.get(guid);
            if (emailItemEntity) {
                emailItemEntity!.remove(EmailItemViewComp);
            }
        }

        entity.EmailBll.ShowEmailList = [];
    }

    refEmailShow(entity: EmailEntity) {
        if (!entity.EmailView) return;
        this.rmShowEmail(entity);

        let mailList = entity.EmailModel.EmailListMap.get(entity.EmailBll.OptType);
        if (!mailList) return;
        let contentNode = entity.EmailView.GetContentNode();
        for (let i = 0; i < mailList!.length; i++) {
            let email = mailList![i];
            let emailItemEntity = entity.EmailModel.EmailItemEntityMap.get(email.guid!);
            ModuleUtil.addView(emailItemEntity!, EmailItemViewComp, contentNode!, "gui/hall/email_item");
            entity.EmailBll.ShowEmailList.push(email.guid);
        }
    }

    entityEnter(entity: EmailEntity): void {
        entity.EmailBllSys = this;
        this.refEmailShow(entity);
    }
    //展开邮件
    BtnShow(emailItemEntity: EmailItemEntity) {
        let entity = smc.email;
        if (entity.EmailBll.CurShowEmailEntity) {
            entity.EmailBll.CurShowEmailEntity.EmailItemBll.IsOpen = false;     //关闭之前的
            entity.EmailBll.CurShowEmailEntity.EmailItemView.show();
        }
        if (emailItemEntity == entity.EmailBll.CurShowEmailEntity) {
            entity.EmailBll.CurShowEmailEntity = null;
            return;
        }
        entity.EmailBll.CurShowEmailEntity = emailItemEntity;
        emailItemEntity.EmailItemBll.IsOpen = true;         //展开现在的
        emailItemEntity.EmailItemView.show();
    }

    //领取邮件奖励成功
    ItemReward(emailItemEntity: EmailItemEntity) {
        let entity = smc.email;
        let EmailMap = entity.EmailModel.EmailMap;
        let email = EmailMap.get(emailItemEntity.EmailItemBll.Guid);
        email!.itemFlag = 1;
        emailItemEntity.EmailItemView.RefShowData();
    }

    //返回大厅
    async bkBtn(entity: EmailEntity) {
        this.rmShowEmail(entity);
        entity.remove(EmailBllComp);
        ModuleUtil.removeViewUi(smc.email, EmailViewComp, UIID.Email);
    }

    //选择全局邮件
    btnGlobal(entity: EmailEntity) {
        entity.EmailBll.OptType = EMAIL_TYPE.GLOBAL;
        this.refEmailShow(entity);
    }

    //选择系统邮件
    btnSys(entity: EmailEntity) {
        entity.EmailBll.OptType = EMAIL_TYPE.SYSTEM;
        this.refEmailShow(entity);
    }

    //选择好友赠送
    btnFriend(entity: EmailEntity) {
        entity.EmailBll.OptType = EMAIL_TYPE.FRIEND;
        this.refEmailShow(entity);
    }
}