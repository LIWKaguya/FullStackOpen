import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const terminate = (Object) => {
    return axios.delete(`${baseUrl}/${Object.id}`, Object)
}

const update = (Object) => {
    return axios.put(`${baseUrl}/${Object.id}`, Object)
}

const allActions = {getAll,  create, terminate, update}

export default allActions