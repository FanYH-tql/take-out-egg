// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBusiness from '../../../app/controller/business';
import ExportGoods from '../../../app/controller/goods';
import ExportPermissions from '../../../app/controller/permissions';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';
import ExportWxUser from '../../../app/controller/wx_user';

declare module 'egg' {
  interface IController {
    business: ExportBusiness;
    goods: ExportGoods;
    permissions: ExportPermissions;
    upload: ExportUpload;
    user: ExportUser;
    wxUser: ExportWxUser;
  }
}
