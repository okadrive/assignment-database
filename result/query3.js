shellPrint(DBQuery.shellBatchSize = 300);
shellPrint(db.pokemon.find({$and: [{move: {$elemMatch: {m_type: "かくとう", m_power: {$gte: 100}}}}, {$or: [{type1: "ほのお"},{type2: "ほのお"}]}]},{_id:0,type1:0,type2:0,move:0}));
