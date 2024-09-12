

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  }
  
export const formatDate = (date: Date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
      ].join(':')
    );
  }

export const getCurrentDateTime = () => {
    var now = new Date()
    return formatDate(now).split(" ")
}