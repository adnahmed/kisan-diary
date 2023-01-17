// Exclude keys from Model
function exclude<Model, Key extends keyof Model>(
  model: Model,
  keys: Key[]
): Omit<Model, Key> {
  for (let key of keys) {
    delete model[key];
  }
  return model;
}

export default exclude;
