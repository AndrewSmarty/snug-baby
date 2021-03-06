/*
*********************************
*******  SnugBabyDayTime  *******
*********************************
	Example of usage:
		var date = new SnugBabyDayTime();
		var date = new SnugBabyDateTime(new Date());
		var date = new SnugBabyDateTime(new Date(2012, 3, 4));
		var date = new SnugBabyDateTime(new Date("Fri Apr 03 2015 07:43:50 GMT-0700 (Pacific Daylight Time)"));

*********************************
*/

var SnugBabyDayTime = (function(){

	var isValidDate = function(date){
		if(Object.prototype.toString.call(date) !== "[object Date]")
			return false;
		return !isNaN(date.getTime());
	}

	var _timestamp = 0;

	function SnugBabyDayTime(date){

		this.basic = (typeof date === "undefined") ? new Date() : date;	//Eg: "Fri Apr 03 2015 06:52:20 GMT-0700 (Pacific Daylight Time)"

		this.time = this.formatTimeAMPM();								//Eg:   "07:36 AM"
		this.fullMonth = this.formatFullMonth();						//Eg:   "January 24"
		this.shortMonth = this.formatShortMonth();						//Eg:   "Jan 24"
		this.fullDay = this.formatFullDay(); 							//Eg:   "Monday"
		this.shortDay = this.formatShortDay();							//Eg:   "Mon"
		this.year = this.formatFullYear();								//Eg:   "2015"

		this.getTimestamp = function() {
			return _timestamp;
		}
		this.setTimestamp = function(timestamp) {
			_timestamp = timestamp;
		}
	};

	SnugBabyDayTime.prototype.HumanToUTC = function(){
		_timestamp = Date.UTC(
							this.basic.getFullYear(),
							this.basic.getMonth(),
							this.basic.getDate(),
							this.basic.getHours(),
							this.basic.getMinutes(),
							this.basic.getSeconds());
		_timestamp = Math.round(_timestamp/1000.0); 			   	//translate from milliseconds to seconds 
		return _timestamp;
	};

	SnugBabyDayTime.prototype.UTCtoHuman = function(pTimestamp){  	//Eg: "Sat, 04 Apr 2015 03:18:11 GMT"
		var timestamp;

		if (typeof pTimetamp !== "undefined")
			timestamp =  pTimestamp;
		else if (typeof _timestamp !== "undefined")
			timestamp =  _timestamp;

		//if(timestamp.toString().charAt(timestamp.length-1)=="L")
		//	timestamp = timestamp.slice(0,-1);
		timestamp *= 1000;											//translate from seconds to milliseconds 
		//if(isValidDate(timestamp))
			return (new Date(timestamp)).toUTCString();
		//else
		//	return false;
	};

	SnugBabyDayTime.prototype.formatTimeAMPM = function(hh, mm){	//Eg:   "07:36 AM"
		var hours;
		var minutes;
		if(typeof (hh && mm) === "undefined"){
			hours = this.basic.getHours();
			minutes = this.basic.getMinutes();
		}else{
			hours = parseInt(hh, 10);
			minutes = parseInt(mm, 10);
		}

		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;									// the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var time = hours + ':' + minutes + ' ' + ampm;
		return time;
	};

	SnugBabyDayTime.prototype.monthFullToShort = function(month){
		switch(month.toUpperCase()){
			case "JANUARY": return "Jan"; break;
			case "FEBRUARY": return "Feb"; break;
			case "MARCH": return "Mar"; break;
			case "APRIL": return "Apr"; break;
			case "MAY": return "May"; break;
			case "JUNE": return "Jun"; break;
			case "JULY": return "Jul"; break;
			case "AUGUST": return "Aug"; break;
			case "SEPTEMBER": return "Sep"; break;
			case "OCTOBER": return "Oct"; break;
			case "NOVEMBER": return "Nov"; break;
			case "DECEMBER": return "Dec"; break;
			default: return "";
		}
	};

	SnugBabyDayTime.prototype.dayFullToShort = function(day){
		switch(day.toUpperCase()){
			case "MONDAY": return "Mon"; break;
			case "TUESDAY": return "Tue"; break;
			case "WEDNESDAY": return "Wed"; break;
			case "THURSDAY": return "Thu"; break;
			case "FRIDAY": return "Fri"; break;
			case "SATURDAY": return "Sat"; break;
			case "SUNDAY": return "Sun"; break;
			default: return "";
		}
	};

	SnugBabyDayTime.prototype.hoursAMPMtoUsial = function(hours, type){
		if(type === "AM")
			return hours;
		if(type === "PM")
			switch(hours){
				case "1": return "13"; break;
				case "2": return "14"; break;
				case "3": return "15"; break;
				case "4": return "16"; break;
				case "5": return "17"; break;
				case "6": return "18"; break;
				case "7": return "19"; break;
				case "8": return "20"; break;
				case "9": return "21"; break;
				case "10": return "22"; break;
				case "11": return "23"; break;
				case "12": return "00"; break;
				default: return "";
			}
	};

	
	SnugBabyDayTime.prototype.formatMonth = function(month){				//Eg:   "January"
		var monthNumber = this.basic.getMonth();
		var monthName = "";

		month = (typeof month !== 'undefined') ?  month: {type: "full"};

		switch(monthNumber){
			case 0 : 
				monthName = (month.type == "short") ? "Jan" : "January";
				break;
			case 1 : 
				monthName = (month.type == "short") ? "Feb" : "February";
				break;
			case 2 : 
				monthName = (month.type == "short") ? "Mar" : "March";
				break;
			case 3 : 
				monthName = (month.type == "short") ? "Apr" : "April";
				break;
			case 4 : 
				monthName = "May";
				break;
			case 5 : 
				monthName = (month.type == "short") ? "Jun" : "June";
				break;
			case 6 : 
				monthName = (month.type == "short") ? "Jul" : "July";
				break;
			case 7 : 
				monthName =  (month.type == "short") ? "Aug": "August";
				break;
			case 8 : 
				monthName =  (month.type == "short") ? "Sep": "September";
				break;
			case 9 : 
				monthName =  (month.type == "short") ? "Oct": "October";
				break;
			case 10 : 
				monthName =  (month.type == "short") ? "Nov" : "November";
				break;
			case 11 : 
				monthName =  (month.type == "short") ? "Dec" : "December";
				break;
			default:
				monthName = "undefined";
		}

		return monthName;
	};

	SnugBabyDayTime.prototype.formatFullMonth = function(){								//Eg:   "January 24"
		var fullMonth = this.formatMonth() + " " + this.basic.getDate();		
		return fullMonth;
	};	

	SnugBabyDayTime.prototype.formatShortMonth = function(){							//Eg:    "Jan 24"
		var shortMonth = this.formatMonth({type: "short"}) + " " + this.basic.getDate();		
		return shortMonth;
	};

	SnugBabyDayTime.prototype.formatFullDay = function(){								//Eg:   "Monday"
		var fullDay = this.formatDay();		
		return fullDay;
	};

	SnugBabyDayTime.prototype.formatShortDay = function(){								//Eg:   "Mon"
		var shortDay = this.formatDay({type: "short"});		
		return shortDay;
	};

	SnugBabyDayTime.prototype.formatDay = function(day){								//Eg:   "Monday"
		var dayNumber = this.basic.getDay();
		var dayName = "";

		day = (typeof day !== 'undefined') ?  day: {type: "full"};

		switch(dayNumber){
			case 0 :
				dayName = (day.type == "short") ? "Sun" : "Sunday";
				break;
			case 1 :
				dayName = (day.type == "short") ? "Mon" : "Monday";
				break;
			case 2 :
				dayName = (day.type == "short") ? "Tue" : "Tuesday";
				break;
			case 3 :
				dayName = (day.type == "short") ? "Wed" : "Wednesday";
				break;
			case 4 :
				dayName = (day.type == "short") ? "Thu" : "Thursday";
				break;
			case 5 :
				dayName = (day.type == "short") ? "Fri" : "Friday";
				break;
			case 6 :
				dayName = (day.type == "short") ? "Sat" : "Saturday";
				break;
			default : 
				dayName = "undefined";
		}

		return dayName;
	};

	SnugBabyDayTime.prototype.formatFullYear = function(){								//Eg:   "2015"	
		var year = this.basic.getFullYear().toString();
		return year;
	};

	SnugBabyDayTime.prototype.toString = function(dateCreationWay){						//Eg:   case FULL_DATE ->  "Thursday, January 22, 2015 at 9:38 AM"	
		var fullDate = "";																//Eg:   case SHORTEN_DATE -> "January 22, 2015 at 9:38 AM"
		switch(dateCreationWay){
			case "FULL_DATE":
				fullDate = this.fullDay + ", "+ 
					this.fullMonth + ", " +
					this.year + " at " +
					this.time;
				break;

			case "SHORTEN_DATE":
				fullDate = 
					this.fullMonth + ", " +
					this.year + " at " +
					this.time;
				break;

			default: 
				fullDate = this.fullDay + ", "+ 
					this.fullMonth + ", " +
					this.year + " at " +
					this.time;
		}

		return fullDate;
	};

	return SnugBabyDayTime;
})();