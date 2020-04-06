import { Application } from 'egg';

const user = {
  info: '/api/user/info',
  login: '/api/user/login',
  role: '/api/user/role',
  permissions: '/api/user/permissions',
  update: '/api/user/permissions/update',
  list: '/api/user/list',
  delete: '/api/user/delete'
}

const business = {
  category: '/api/business/category',
  create: '/api/business/create',
  list: '/api/business/list',
  update: '/api/business/update',
  delete: '/api/business/delete'
}

const upload = {
  business: '/api/upload/business',
  delete: '/api/upload/delete'
}

const goods = {
  create: '/api/goods/create',
  list: '/api/goods/list',
  update: '/api/goods/update',
  delete: '/api/goods/delete'
}

const permissions = {
  delete: '/api/permissions/delete'
}
export default (app: Application) => {
  const { controller, router } = app;
  router.get(user.info, controller.user.info)
  router.post(user.login, controller.user.login)
  router.get(user.role, controller.user.role)
  router.get(user.permissions, controller.user.permissions)
  router.put(user.update, controller.permissions.update)
  router.get(user.list, controller.user.list)
  router.get(user.delete, controller.user.delete)
  router.post('/api/user/update', controller.user.update)

  router.get(business.category, controller.business.category)
  router.post(business.create, controller.business.create)
  router.get(business.list, controller.business.list)
  router.put(business.update, controller.business.update)
  router.get(business.delete, controller.business.delete)

  router.post(upload.business, controller.upload.business)
  router.get(upload.delete, controller.upload.delete)

  router.post(goods.create, controller.goods.create)
  router.get(goods.list, controller.goods.list)
  router.delete(goods.delete, controller.goods.delete)
  router.post(goods.update, controller.goods.update)

  router.get(permissions.delete, controller.permissions.delete)

  router.get('/api/assess/list', controller.assess.list)
  router.post('/api/assess/reply', controller.assess.reply)
  router.get('/api/assess/delete', controller.assess.delete)

  router.get('/api/order/list', controller.order.list)
  router.get('/api/order/delete', controller.order.delete)

  router.get('/api/business/one', controller.business.getOne)

  router.post('/api/goods/some', controller.goods.some)


  router.post('/wx/user/login', controller.wxUser.login)

  router.get('/wx/business/list', controller.business.list)
  router.get('/wx/business/search', controller.business.search)

  router.get('/wx/goods/list', controller.goods.list)

  router.post('/wx/address/create', controller.address.create)

  router.get('/wx/address/list', controller.address.list)

  router.get('/wx/address/delete', controller.address.delete)

  router.post('/wx/address/update', controller.address.update)

  router.get('/wx/address/set', controller.address.setDefault)

  router.post('/wx/order/create', controller.order.create)
  
  router.get('/wx/order/list', controller.order.list)

  router.get('/wx/order/pay', controller.order.pay)
  
  router.get('/wx/order/delete', controller.order.delete)

  router.post('/wx/assess/create', controller.assess.create)
  router.get('/wx/assess/list', controller.assess.list)


}
