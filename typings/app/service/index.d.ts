// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBusiness from '../../../app/service/business';
import ExportGoods from '../../../app/service/goods';
import ExportPermissions from '../../../app/service/permissions';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';
import ExportWxUser from '../../../app/service/wx_user';

declare module 'egg' {
  interface IService {
    business: ExportBusiness;
    goods: ExportGoods;
    permissions: ExportPermissions;
    upload: ExportUpload;
    user: ExportUser;
    wxUser: ExportWxUser;
  }
}
