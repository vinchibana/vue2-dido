import ajax from "@/api/ajax";
// 本地部署
// const BASE_URL = 'http://127.0.0.1:7300/mock/62d6c1ee2b1c66cdffb97516/api/'

// 在线部署
const BASE_URL = '/api/'

export const getHomeData = () => ajax(BASE_URL + 'homeApi')

export const getHomeSpecialZone = () => ajax(BASE_URL + 'homeApi/specialZone');

export const getCategoryData = () => ajax(BASE_URL + 'homeApi/categories');

export const getCategoryDetailData = (params) => ajax(BASE_URL + 'homeApi/categoriesdetail' + params);

export const getTodayMenuCategoryList = () => ajax(BASE_URL + 'recipe/allScene');

export const getTodayMenuDetail = (params) => ajax(BASE_URL + 'recipe/menulist' + params);

export const getGuessYouLike = () => ajax(BASE_URL + 'cart/youlike');

export const getPhoneCaptcha = (phoneNumber) => ajax(BASE_URL + 'send_code', {
  phoneNumber
});

export const phoneCaptchaLogin = (phone, captcha) => ajax(BASE_URL + 'login_code', {
  phone,
  captcha
}, 'POST');

export const pwdLogin = (userName, pwd, captcha) => ajax(BASE_URL + 'login_pwd', {
  userName,
  pwd,
  captcha
}, 'POST');

export const getVipContent = () => ajax(BASE_URL + 'vip');
