import { Controller } from 'egg'
import fs from 'fs'
import qiniu from 'qiniu'
import { uploadToken, config, img_url, bucket, bucketManager } from '../utils/qiniu'
import response from '../utils/response'

class UploadController extends Controller {
  public async business() {
    const ctx = this.ctx
    const file = ctx.request.files[0]
    let filename = file.filename
    filename = filename.replace(',', '')
    const filePath = file.filepath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const promise = new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, filename, filePath, putExtra, (respErr, respBody, respInfo) => {
        if (respErr) {
          throw respErr
        }
        if (respInfo.statusCode === 200) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
          resolve(respInfo.data)
        } else {
          reject({
            statusCode: respInfo.statusCode,
            respBody
          })
        }
      })
    })
    try {
      const res: any = await promise
      response(ctx, 200, '上传成功', {
        url: img_url + res.key
      })
    } catch (e) {
      response(ctx, e.statusCode, '图片上传失败', e.respBody)
    }
  }

  public async delete() {
    const ctx = this.ctx
    const { filename, table, id, images } = ctx.query
    const promise1 = new Promise((resolve, reject) => {
      bucketManager.delete(bucket, filename, (err, respBody, respInfo) => {
        if (err) {
          throw err
        } else {
          if (respInfo.statusCode === 200) {
            resolve(respInfo.data)
          } else {
            reject({
              statusCode: respInfo.statusCode,
              respBody
            })
          }
        }
      })
    })
    let promise2;
    if (images) {
      const empty = images.replace(' ', '').replace(',', '').length
      promise2 = ctx.service.upload.update({
        table,
        id,
        images: empty ? images : ''
      })
    }
    try {
      let res;
      if (table) {
        res = await Promise.all([ promise1, promise2 ])
      } else {
        res = await Promise.all([ promise1 ])
      }
      if (res) {
        ctx.status = 200
        ctx.body = {
          code: 200,
          message: '删除成功',
          result: {}
        }
      }
    } catch (e) {
      ctx.status = +e.statusCode
      ctx.body = {
        code: +e.statusCode,
        message: '删除失败',
        result: e.respBody
      }
    }
  }
}
export default UploadController
