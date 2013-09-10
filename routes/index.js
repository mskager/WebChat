
exports.index = function(req, res){
res.render('index', { title: 'Express' });
};

exports.login = function(req,res){
res.render('login');
};

exports.chat = function(req,res){
res.render('chat');
};
