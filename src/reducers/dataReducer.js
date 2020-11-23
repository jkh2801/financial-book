import data from './data'
const init = {
  data : data,
  login : false
}
const addData = (action) => {
  if(data[action.year] === undefined) {
    Object.assign(data, {[action.year] : { [action.month] : []}})
  }
  if(data[action.year][action.month] === undefined) {
    Object.assign(data[action.year], {[action.month] : []})
  }
  data[action.year][action.month].push(action.data)
  return init
}
const updateData = (type, action) => {
  if (type === "update") data[action.year][action.month] = data[action.year][action.month].map(item => item.id === action.id ? action.data : item)
  else data[action.year][action.month] = data[action.year][action.month].filter(item => item.id !== action.id)
  return init
}
function memberReducer(state = init, action){
  switch(action.type) {
    case "ADD" : 
       return addData(action)
    case "UPDATE" : 
       return updateData("update", action)
    case "DELETE" : 
       return updateData("delete", action)
    case "LOGIN" : 
       return Object.assign(state, {login : true})
    case "LOGOUT" : 
       return Object.assign(state, {login : false})
    default : return state
  }
}
export default memberReducer