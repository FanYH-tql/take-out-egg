// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress from '../../../app/controller/address';
import ExportAssess from '../../../app/controller/assess';
import ExportBusiness from '../../../app/controller/business';
import ExportGoods from '../../../app/controller/goods';
import ExportOrder from '../../../app/controller/order';
import ExportPermissions from '../../../app/controller/permissions';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';
import ExportWxUser from '../../../app/controller/wx_user';

declare module 'egg' {
  interface IController {
    address: ExportAddress;
    assess: ExportAssess;
    business: ExportBusiness;
    goods: ExportGoods;
    order: ExportOrder;
    permissions: ExportPermissions;
    upload: ExportUpload;
    user: ExportUser;
    wxUser: ExportWxUser;
  }
}
