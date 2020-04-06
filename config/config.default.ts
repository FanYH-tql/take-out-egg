import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577431521126_909';

  // add your egg config in here
  config.middleware = ['cors', 'errorHandler', 'jwt'];
  config.multipart = {
    mode: 'file'
  }
  config.security = {
    csrf: {
      enable: false
    },
  }
  config.jwt = {
    enable: true,
    ignore: [ 
      '/api/user/login', 
      '/wx/user/login', 
      '/wx/business/list', 
      '/wx/goods/list',
      '/wx/address/create',
      '/wx/address/list',
      '/wx/address/delete',
      '/wx/address/update',
      '/wx/address/set',
      '/wx/order/create',
      '/wx/order/list',
      '/wx/order/pay',
      '/wx/order/delete',
      '/wx/assess/create',
      '/wx/assess/list',
      '/wx/business/search'
    ], // 哪些请求不需要认证
  }

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'take_out',
    },
    app: true
  }

  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
