export function formatTime(time) {
  const now = Date.now()
  const diff = (now - time) / 1000

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '昨天'
  } else {
    const d = new Date(time)
    return d.getFullYear() + '年' + d.getMonth() + '月' + d.getDay() + '日' + ' ' + d.getHours() + ':' + d.getMinutes()
  }
}
