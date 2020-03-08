export interface Business {
  business_id: number
  business_name: string
  business_grade: number
  business_sale: number
  business_longitude: string
  business_latitude: string
  business_address: string
  business_assess: string
  business_image: string
  business_servetime: string
  business_phone: string
  category_id: number
}

export interface BusinessCategory {
  category_id: number
  category_name: string
}