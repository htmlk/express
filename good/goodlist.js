//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./goodsql.js');
//使用连接池
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	//增加商品
	goodadd: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
 			
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.goodinsert, [param.name, param.desc,param.price,param.sum], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
    gooddelete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.gooddelete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    goodupdate: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
 			
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.goodupdate, [param.name, param.desc,param.price,param.sum,param.id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'修改成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
    },
    	//得到所有商品 在路由routes调用本方法，这个方法调用sql语句 ，并返回相应结果jsonwrite
	goodAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.goodAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    goodById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.goodById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
};