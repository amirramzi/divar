
const removePropertyInObject = (target = {}, properties = []) => {
  for (const item of properties) {
    delete target[item];
  }
  return target;
};
module.exports = {
 
  removePropertyInObject,
};
