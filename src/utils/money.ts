const getZero=(value: number)=>{
  const str = value.toString()
  const dotIndex =str.indexOf('.')
  if(dotIndex<0){
    return str + '.00'
  }else if(str.substring(dotIndex).length === 2){
    return str + '0'
  }
  return str
}
export const getMoney = (value: number) => {
  return getZero(value/100)
}