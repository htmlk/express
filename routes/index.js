var express = require('express');
var router = express.Router();
//关联主程序
var goodlist = require('../good/goodlist.js');

/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
  res.render('index', { title: '小k博客 (htmlk.cn)'});
});

//增
router.get('/goodAdd',function(req,res,next){
	goodlist.goodadd(req,res,next);
});

//删
router.get('/goodDel',function(req,res,next){
	goodlist.gooddelete(req,res,next);
});
//改
router.get('/goodUpdate',function(req,res,next){
	goodlist.goodupdate(req,res,next);
});
//查
router.get('/goodAll',function(req,res,next){
	goodlist.goodAll(req,res,next);
});
router.get('/goodById',function(req,res,next){
	goodlist.goodById(req,res,next);
});

module.exports = router;
