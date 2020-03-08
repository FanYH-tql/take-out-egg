import qiniu from 'qiniu'
const config: any = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
config.useCdnDomain = true
const accessKey = 'XEv4Bn0HnOu8gwkNSZS4YexjhGeR12KNoqWXFI5y'
const secretKey = '8D-ZBUVNNjlTl8SGA-3ozvIenFvoNQzQpgox6Qug'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'fanyihui',
  expires: 60 * 60 * 24 * 500
}
const bucket = options.scope
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
const img_url = 'http://qiniu.fyhwb.com/'

const bucketManager = new qiniu.rs.BucketManager(mac, config)

export {
  uploadToken,
  config,
  img_url,
  bucket,
  bucketManager
}