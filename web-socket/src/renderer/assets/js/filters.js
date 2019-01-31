let timeStamp = (val) => {
	if(val) {
		if(val == 0) return null;
// 		var moment = require('moment');
// 		return moment(val).format('YYYY-MM-DD HH:mm');
		return new Date(parseInt(val)).toLocaleString().replace(/:\d{1,2}$/,' ');
	}
	return null;
}

export {timeStamp}