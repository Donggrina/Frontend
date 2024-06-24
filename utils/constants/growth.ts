export const GROWTH_CATEGORY = ['사료', '간식', '이상 증상', '병원 기록'];

export interface CategoryImages {
  [key: string]: string;
}

export const GROWTH_CATEGORY_IMAGES: CategoryImages = {
  사료: '/images/category/food-detail.svg',
  간식: '/images/category/snack-detail.svg',
  '이상 증상': '/images/category/abnormalSymptom-detail.svg',
  '병원 기록': '/images/category/hospital-detail.svg',
};
export const GROWTH_MEMO_IMAGES: CategoryImages = {
  사료: '/images/growth/food-memo.svg',
  간식: '/images/growth/snack-memo.svg',
  '이상 증상': '/images/growth/abnormalSymptom-memo.svg',
  '병원 기록': '/images/growth/hospital-memo.svg',
};
export const GROWTH_CATEGORY_ICON: CategoryImages = {
  사료: '/images/category/food-icon.png',
  간식: '/images/category/snack-icon.png',
  '이상 증상': '/images/category/abnormalSymptom-icon.png',
  '병원 기록': '/images/category/hospital-icon.png',
};

export const GROWTH_CATEGORY_FAMILY_ICON: CategoryImages = {
  사료: '/images/category/food-icon-family.jpg',
  간식: '/images/category/snack-icon-family.jpg',
  '이상 증상': '/images/category/abnormalSymptom-icon-family.jpg',
  '병원 기록': '/images/category/hospital-icon-family.jpg',
};
