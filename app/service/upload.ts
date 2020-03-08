import { Service } from 'egg'
import transaction from '../utils/transaction'
namespace UpdateParams {
  export interface UpdateBody {
    id: string
    table: string
    images: string
  }
}
export default class UploadService extends Service {
  public async update(params: UpdateParams.UpdateBody) {
    return transaction(this, conn => {
      const res = conn.update(params.table, {
        [`${params.table}_image`]: params.images
      }, {
        where: {
          [`${params.table}_id`]: params.id
        }
      })
      return res
    })
  }
}
