const { TodoRepo } = require("../database/repository");
const DriverSSE = require("../services/sse/driver_sse_publisher");

const post = async (request, response) => {
  response.type("json");
  const userId = request.get("x-user-id"); // Récupère l'ID brut en tant que chaîne
  DriverSSE.notify(userId, {msg: 'Enregistrement en cours ....'}, 'PAYMENT_NOTIFICATION')
  const body = await request.json();
  let created = await TodoRepo.create({ ...body });
  DriverSSE.notify(userId, created.toJSON(), 'PAYMENT_NOTIFICATION')
  return response.send(JSON.stringify({ ...created.toJSON() }));
};

const getAll = async (request, response) => {
  response.type("json");
  let List = await TodoRepo.getAll();
  return response.json(List);
};

const getOne = async (request, response) => {
  let id = request.path_parameters.id;
  const Data = await TodoRepo.findOne({ _id: id });
  return response.json({ ...Data.toJSON() });
};

const put = async (request, response) => {
  let id = request.path_parameters.id;
  let body = await request.json();
  const UpdatedData = await TodoRepo.update(body, id);
  return response.send(JSON.stringify({ ...UpdatedData.toJSON() }));
};

const remove = async (request, response) => {
  let id = request.path_parameters.id;
  const result = await TodoRepo.remove(id);
  return response.json(result.toJSON());
};

module.exports = {
  post,
  getAll,
  getOne,
  put,
  remove,
};
