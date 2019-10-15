shellPrint(DBQuery.shellBatchSize = 300);
shellPrint(db.pokemon.find({$or: [{type1: "ほのお"},{type2: "ほのお"}]},{_id:0, move:0, type1:0, type2:0}));
