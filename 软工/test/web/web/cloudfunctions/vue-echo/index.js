const cloud = require("@cloudbase/node-sdk");

// 1. 获取数据库引用

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  // todo
  // your code here
  const db = app.database();
  const res = await db
  .collection("test01")
  .doc("9e7190f1616acf230056c1df04dd8ffdtodo-identifiant-aleatoire")
  .get();


  return {
    res
  };
};
