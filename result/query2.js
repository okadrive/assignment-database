shellPrint(DBQuery.shellBatchSize = 300);
shellPrint(db.pokemon.find({$and: [{$or: [{"type1": "ほのお"},{"type2": "ほのお"}]},{"move.m_type": "かくとう"}]},{_id:0,type1:0,type2:0,move:0}));
