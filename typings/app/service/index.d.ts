// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress from '../../../app/service/address';
import ExportAssess from '../../../app/service/assess';
import ExportBusiness from '../../../app/service/business';
import ExportGoods from '../../../app/service/goods';
import ExportOrder from '../../../app/service/order';
import ExportPermissions from '../../../app/service/permissions';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';
import ExportWxUser from '../../../app/service/wx_user';

declare module 'egg' {
  interface IService {
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
