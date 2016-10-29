var good={
	//增
	goodinsert:'INSERT INTO `good` (`id`,`name`,`desc`,`price`,`sum`) VALUES(0,?,?,?,?)',
	//删
	gooddelete: 'delete from good where id=?',
	//改
	goodupdate:'UPDATE `good` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?',
    //查
    goodAll: 'select * from good',
    goodById: 'select * from good where id=?'
}

module.exports=good;