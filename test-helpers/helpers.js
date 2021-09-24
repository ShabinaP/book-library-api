const { Book, Reader } = require('../src/models')

const get404Error = (model) => ({ error: `The {model} could not be found.`})

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader
    }
    return models[model]
}

const getOptions = (model) => {
    if (model === 'book') return { include: Genre }
    if(model === 'genre') return { include: Book }

    return {}
}

const removePassword = (obj) => {
if(obj.hasOwnProperty('password')) {
    delete obj.password;
}
return obj
}

const getAllItems = async (response, model) => {
    const Model = getModel(model)
  const options = getOptions(model)

  const items = await Model.findAll({...options})

  const itemsWithoutPassword = items.map((item) => {
    return removePassword(item.get())
  });

  response.status(200).json(itemsWithoutPassword)


}







module.exports = {
    getAllItems
}