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
        {$lookup: {
            from: 'type',
            localField: 'type1',
            foreignField: 'id',
            as: 'type1'
          }},
        {$lookup: {
            from: 'type',
            localField: 'type2',
            foreignField: 'id',
            as: 'type2'
          }},
        {$lookup: {
          from: 'move',
            localField: 'moves.move_id',
            foreignField: 'id',
            as: 'moves'
          }},
        {$match:
              {$or: [
                  {"type1.name": 'ほのお'},
                  {"type2.name": 'ほのお'}
                ]}},
        {$unwind: "$moves"},
        {$lookup: {
            from: 'type',
            localField: 'moves.type',
            foreignField: 'id',
            as: 'moves.type'
          }},
        {$match: {
            "moves.type.name": "かくとう",
            "moves.power": {$gte : 100}
          }},
        {$project: {
          "_id": 1,
          "no" : 1,
            "name": 1,
            "type1.name": 1,
            "type2.name": 1,
            "moves.name": 1,
            "moves.type.name": 1,
            "moves.power": 1
          }},
        {
          $group: {
            "_id": "$_id",
            "no": {
              $first: "$no"
            },
            "name": {
              $first: "$name"
            },
            "type1": {
              $first: "$type1.name"
            },
            "type2": {
              $first: "$type2.name"
            },
            "moves": {
              $push: "$moves"
            }
          }
        }
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