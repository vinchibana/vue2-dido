// 本地存储操作，简单判断和类型转换
export const setLocalStorage = (name, content) => {
  if (!name) return;
  if (typeof content != "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};


export const getLocalStorage = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

export const removeLocalStorage = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}
