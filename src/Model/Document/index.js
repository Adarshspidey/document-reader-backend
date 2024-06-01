const Document = require("../Schema/Document");

const createDocument = (data) => Document.create(data);

const getDocument = async (_id) =>
  _id ? await Document.findOne({ _id }) : await Document.find();

const updateDocument = async (document) => await document.save();

module.exports = { createDocument, getDocument, updateDocument };
