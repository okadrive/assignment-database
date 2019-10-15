const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/** 接続URL */
const url = 'mongodb://localhost:27017';
const dbName = 'E-DB';
run()

async function run(){
  try {
    var client = await MongoClient.connect(
        url, { useNewUrlParser: true }
    )
    /** 成功した旨をコンソールに出力 */
    //console.log('Connected successfully to server');

    /** DBを取得 */
    process.env.dbName = 'E-DB'
    const db = await client.db(process.env.dbName)

    await findDocuments(db, client, () => {});

  } catch (e) {
    console.log(e)
  }
}

/** Read */
function findDocuments(db, client, callback) {

  /** collectionを取得 */
  const collection = db.collection('pokemon');

  /** documentを検索 ここに条件を指定 */
  collection
      .aggregate([
        {
      $lookup: {
        from: 'type',
        localField: 'type1',
        foreignField: 'id',
        as: 'type1'
      }
    },
    {
      $lookup: {
        from: 'type',
        localField: 'type2',
        foreignField: 'id',
        as: 'type2'
      }
    },
    {$match:
              {$or: [
                  {"type1.name": 'ほのお'},
                  {"type2.name": 'ほのお'}
                ]}},
        {$project: {
          "no" : 1,
          "name": 1,
          }},
      ])
      .toArray((err, docs) => {

        /** アサーションテスト */
        assert.equal(err, null);

        /** 検索結果をコンソールに出力 */
        console.log(JSON.stringify(docs, null, 2));

        /** 結果を引数に指定してコールバック関数を実行 */
        callback(docs);

        /** DBサーバとの接続解除 */
        client.close()
      });
}
