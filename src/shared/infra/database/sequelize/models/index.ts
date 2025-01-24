import * as fs from "fs";
import * as path from "path";
import { Sequelize, Model, DataTypes } from "sequelize"; // Adjust imports
import config from "../config/config";

const sequelize = config.connection;

// turns base_user => BaseUser
function toCamelCase(str: string) {
  const _ = str.indexOf("_");
  if (~_) {
    return toCamelCase(
      str.substring(0, _) +
        str
          .substring(_ + 1)
          .substring(0, 1)
          .toUpperCase() +
        str.substring(_ + 2)
    );
  } else {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
}

let models: any = {};
let modelsLoaded = false;

const createModels = () => {
  if (modelsLoaded) return models;

  // Get all models
  const modelsList = fs
    .readdirSync(path.resolve(__dirname, "./"))
    .filter(
      (t) =>
        (~t.indexOf(".ts") || ~t.indexOf(".js")) &&
        !~t.indexOf("index") &&
        !~t.indexOf(".map")
    );

  // Dynamically import the models
  modelsList.forEach((modelFile) => {
    const model = require(path.join(__dirname, modelFile)).default(
      sequelize,
      DataTypes
    );
    const modelName = toCamelCase(model.name);
    models[modelName] = model;
  });

  // Create the relationships for the models;
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  models["sequelize"] = sequelize;
  models["Sequelize"] = Sequelize;

  modelsLoaded = true;

  return models;
};

export default createModels();

export { createModels };
