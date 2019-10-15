# assignment-database
* M1春学期のデータベース特論の3つ目の課題で使ったもの
## ディレクトリ
* `scraping`: スクレイピングに用いたスクリプト達
* `db_`以下にスクレイピングで取得したデータが置いてある

## ファイル
* `csv_to_json.js`: その名の通り csv を json に変換する
* `convert.js`: `pokemon.json` と `poke_move.json` を読み込んで結合した json を吐く
* `mongo.json`: 最終的に MongoDB に突っ込んだデータ
* `app*`: MongoDB 用のクエリ

## Version
* MySQL v14.14
* mongoDB v3.6.0