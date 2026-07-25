const service = require("../services/helpService");

exports.create = async (req, res) => {
  const data = await service.createHelp(req.body);

  res.status(201).json({
    success: true,
    data,
  });
};

exports.getAll = async (req, res) => {
  const data = await service.getHelp();

  res.json({
    success: true,
    data,
  });
};

exports.getOne = async (req, res) => {
  const data = await service.getSingleHelp(req.params.id);

  res.json({
    success: true,
    data,
  });
};

exports.update = async (req, res) => {
  const data = await service.updateHelp(req.params.id, req.body);

  res.json({
    success: true,
    data,
  });
};

exports.delete = async (req, res) => {
  await service.deleteHelp(req.params.id);

  res.json({
    success: true,
    message: "Deleted Successfully",
  });
};
