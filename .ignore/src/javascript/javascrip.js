//:: StoryScript [script]
/* twine-user-script #1: "config.js" */
//////////////////////////////////////////////////////
// JAVASCRIPT CODE //////////////////////////////////
////////////////////////////////////////////////////

//#region - GAME CONFIG

// Configure game data //
Config.history.maxStates = 10;

// Import external datasets
importScripts('data/clothing/clOutfits.js');
importScripts('data/clothing/clUnderwear.js');
importScripts('data/clothing/clBra.js');
importScripts('data/clothing/clAccf.js');
importScripts('data/clothing/clAccb.js');
importScripts('data/clothing/clHats.js');

//#endregion
//#region - SETUP STRINGS

setup.strings = {};
setup.strings.breastSize = ["Flat", "Tiny", "Small", "Medium", "Large", "Massive"];
setup.strings.penisSize = ["None", "Tiny", "Small", "Medium", "Large", "Massive"];
setup.strings.assSize = setup.strings.pussySize = ["Virgin", "Tight", "Average", "Loose", "Stretched", "Gaping"];
setup.strings.memories = ["gender","outfit","breasts","penis","pussy","ass","genitals"];

//#endregion
//#region - SETUP CONSTANTS

	setup.sizeTiers = [[0,0],[1,1],[2,25],[3,50],[4,75],[5,90]];

	const V = variables();
	
	const XL = variables().XL = 99;
	const L = variables().L = 75;
	const M = variables().M = 50;
	const S = variables().S = 25;
	const XS = variables().XS = 1;

	const HATE = variables().HATE = 0;
	const DISLIKE = variables().DISLIKE = 20;
	const NEUTRAL = variables().NEUTRAL = 40;
	const LIKE = variables().LIKE = 60;
	const LOVE = variables().LOVE = 80;

	const EXPERT = variables().EXPERT = 5;
	const GREAT = variables().GREAT = 4;
	const GOOD = variables().GOOD = 3;
	const OKAY = variables().OKAY = 2;
	const NEW = variables().NEW = 1;
	const Characters = ['player','mom','sister','sophie','penny','diana','julia','tasha','john','lauren','james','sean','mick','jag','ash','veruca','lexi','siri','saya','chris','lisa','kagney','elsa'];
	const ActionCodex = {
		base: [
			"kiss.give","kiss.get",
			"suckCock.give","suckCock.get",
			"eatPussy.give","eatPussy.get",
			"analPlay.give","analPlay.get",
			"pussyPlay.give","pussyPlay.get",
			"analFuck.give","analFuck.get",
			"pussyFuck.give","pussyFuck.get",
			"rimjob.give","rimjob.get",
			"handjob.give","handjob.get",
			"trib.give","trib.get",
			"gangbang.give","gangbang.get",
			"sex.Men","sex.Women",
			"sex.Trans","sex.Family",
			"escorting",
			"titfuck.give","titfuck.get",
			"creampie.give","creampie.get",
			"cumEat.give","cumEat.get",
			"cumFace.give","cumFace.get",
			"cumBody.give","cumBody.get"],
		play: [
			"kiss.give","kiss.get",
			"analPlay.give","analPlay.get",
			"pussyPlay.give","pussyPlay.get",
			"titfuck.give","titfuck.get"],
		oral: [
			"suckCock.give","suckCock.get",
			"eatPussy.give","eatPussy.get",
			"rimjob.give","rimjob.get"],
		sex: [
			"analFuck.give","analFuck.get",
			"pussyFuck.give","pussyFuck.get",
			"trib.give","trib.get",
			"gangbang.give","gangbang.get"],
		sexWith: [
			"sex.Men","sex.Women",
			"sex.Trans","sex.Family"]
	};
	// Time Variables
	const TimesAbbr = {
		morning: 0, m: 0,
		latemorning: 1, lm: 1,
		noon: 2, n: 2,
		earlyafternoon: 3, ea: 3,
		afternoon: 4, an: 4, a: 4,
		evening: 5, e: 5,
		night: 6, n: 6
	};

	// Days on which story events occur: 901 = 9/01, 1004 = 10/04
	const EventDays = [
		20170901,20170904,20170905,20170906,20170907,20170908,20170918,20170919,20170920,20170921,20170922,20170925,20170926,20170927,20170928,20170929,
		20171002,20171004,20171005,20171006,20171009,20171010,20171012,20171016,20171018,20171020,20171023,20171025,20171027,20171030,20171031,
		20171106,20171108,20171110,20171113,20171114,20171117,20171120,20171121,20171122,20171123,20171124,20171127,20171130,
		20171205,20171206,20171207,20171208,20171213,20171221,20171224,
		20180109,20180111,20180126
	];

	const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const Times = ["Morning", "Late Morning", "Noon", "Early Afternoon", "Afternoon", "Evening", "Night"];
	const Months = [["",0],["January",31],["February",28],["March",31],["April",30],["May",31],["June",30],["July",31],["August",31],["September",30],["October",31],["November",30],["December",31]];

//#endregion
//#region - GENERAL FUNCTIONS

window.randomItem = function(array, excludeItems = []) {
	// Create a new array that excludes the items in the excludeItems array
	const filteredArray = array.filter(item => !excludeItems.includes(item));
  
	// Choose a random item index from the filtered array
	const randomIndex = Math.floor(Math.random() * filteredArray.length);
  
	// Return the randomly selected item
	return filteredArray[randomIndex];
  };

window.randomObject = function(obj, excludeKeys = []) {
	// Get an array of the object's keys
	const keys = Object.keys(obj).filter(key => !excludeKeys.includes(key));

	// Choose a random key index
	const randomIndex = Math.floor(Math.random() * keys.length);

	// Return the value associated with the random key
	return obj[keys[randomIndex]];
}

function getPlayer() {
    return State.variables.player;
};

window.isFreePlay = function () {
	return (variables().FreePlay == true);
};

window.isEventDay = function () {
	return (EventDays.includes(getTimeStamp()) && !isFreePlay());
};

// Uses visited() function to return true if this is the first time the player has visited a passage
window.firstVisit = function () {return (visited() == 1)};

// Checks through all items in $Tasks array and returns true if any are set to open
window.tasksOpen = function () {
	if (State.variables.Tasks !== undefined) {
		var tasks = variables().Tasks;
		for (var i = 0; i < tasks.length; i++) {
			if (tasks[i].open) {return true};
		};
	};
};

window.coins = function (player=getPlayer()) {return (player.wolf + player.ram + player.hart)};
window.serums = function (serum=variables().serum) {return (serum[1].qty+serum[2].qty+serum[3].qty)};

window.triggerEvent = function (cd = variables().EventCD, unlocked = variables().EventsEnabled) {
	let x = Math.floor((Math.random() * 100) + 1);
	return (cd === 0 && unlocked === true && x <= variables().EventChance);
};

function getChar(character) {
	if (character === undefined) {
		return State.variables.player;
	} else if (State.variables[character]) {
		return State.variables[character];
	} else {
		return undefined;
	};
};

/**
 * 
 * @returns {object} - Returns the variables object
 */
function generateGuid() {
	const hexDigits = '0123456789abcdef';
	let guid = '';
	for (let i = 0; i < 36; i++) {
	  if (i === 8 || i === 13 || i === 18 || i === 23) {
		guid += '-';
	  }
	  else if (i === 14) {
		guid += '4';
	  }
	  else {
		const randomDigit = Math.floor(Math.random() * hexDigits.length);
		const digit = hexDigits[randomDigit];
		guid += digit;
	  }
	}
	return guid;
  }
  

Number.prototype.between = function (a, b, inclusive) {
	var min = Math.min(a, b),
		max = Math.max(a, b);

	return inclusive ? this >= min && this <= max : this > min && this < max;
}

/**
 * 
 * @param {string} str - The string to be capitalized
 * @returns {string} - The capitalized string
 */
window.properCase = function (str) {
	const words = str.split(' ');
	const capitalizedWords = words.map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
	return capitalizedWords.join(' ');
};  

window.isString = function (x) {
	return (Object.prototype.toString.call(x) === "[object String]");
};

window.isObject = function(item) {
	return (typeof item === 'object');
};

window.chance = function(c,odds) {
	if (odds === undefined) {
		odds = Math.floor(Math.random() * 100) + 1;
	} else {
		odds = Math.floor(Math.random() * odds) + 1;
	};
	return (odds <= c);
};

window.getName = function (sex) {
	if (sex == "male") {
		var names = ['Alan','Bob','Carl','Dillon','Eric','Frank','Greg','Harold','Ian','Joe','Kyle','Larry','Mark','Nate','Owen','Peter','Quincy','Robert','Sam','Tom','Victor','William','Xander'];
	} else if (sex == "female") {
		var names = ['Amy','Allison','Angie','Becky','Brie','Briana','Cindy','Catherine','Christina','Dina','Daphne','Eileen','Erika','Erin','Francine','Gwen','Heidi','Heather','Haylee','Ingrid','Jenny','Jennifer','Jane','Kat','Kitty','Karen','Kathy','Mary','Marnie','Melissa','Maggie','Nancy','Patty','Phoebe','Rebecca','Rachel','Samantha','Sally','Vicky','Veronica','Winnie'];
	} else if (sex == "surname") {
		var names = ['Smith','Johnson','Williams','Brown','Jones','Miller','Davis','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Thompson','White','Harris','Clark','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Hill','Green','Adams','Nelson','Baker','Hall','Campbell','Mitchell','Carter','Roberts','Phillips','Evans','Turner','Parker','Edwards','Collins','Stewart','Morris','Murphy','Cook','Rogers','Morgan','Cooper','Peterson','Bailey','Reed','Kelly','Howard','Cox','Ward','Richardson','Watson','Brooks','Wood','James','Bennet','Grey','Hughes','Price','Myers','Long','Ross','Foster','Doe']
	} else {
		var names = ['Alan','Bob','Carl','Dillon','Eric','Frank','Greg','Harold','Ian','Joe','Kyle','Larry','Mark','Nate','Owen','Peter','Quincy','Robert','Sam','Tom','Victor','William','Xander','Amy','Allison','Angie','Becky','Brie','Briana','Cindy','Catherine','Christina','Dina','Daphne','Eileen','Erika','Erin','Francine','Gwen','Heidi','Heather','Haylee','Ingrid','Jenny','Jennifer','Jane','Kat','Kitty','Karen','Kathy','Mary','Marnie','Melissa','Maggie','Nancy','Patty','Phoebe','Rebecca','Rachel','Samantha','Sally','Vicky','Veronica','Winnie'];
	};

	return names[Math.floor(Math.random()*names.length)];
};

window.detectMobile = function () {
	return (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	);
};

// Function to determine if Ava or Dakota should be in the house
window.isHome = function (actor) {
	if (actor == "mom") {
		if (isWeekend() && isAfternoon() || (isNight() && variables().mom.isSlut)) {
            return false;
        } else {
            return true;
        };
	} else if (actor == "sister") {
		if (variables().sister.isPornstar) {
            return false;
        } else {
            if (isMonday() || isWednesday() || isThursday()) {
                if (isEvening()) {return false} else {return true};
            } else {
                return true;
            };
        };
	};
};

window.loadMenu = function(title,menu) {
	// Adding a title to the dialog.
	Dialog.setup(title);
	Dialog.wiki(Story.get(menu).processText());
	Dialog.open();
};

window.isBlood = function(mom = variables().mom, sister = variables().sister) {
	return (mom.isBlood || sister.isBlood);
}

// Checks to see if any applicable characters have an sms attribute that isn't null and returns true if ANY come back as true
window.smsResponse = function() {
	return (variables().mom.sms ||
			variables().sister.sms ||
			variables().sophie.sms ||
			variables().penny.sms ||
			variables().diana.sms ||
			variables().chris.sms ||
			variables().john.sms ||
			variables().tasha.sms)
};

window.smsHasResponse = function(actor) {
	return (actor.sms);
};

//#endregion
//#region - EVENT FUNCTIONS

/*
// Returns true if a conversation can trigger at home or work
window.convoReady = function (loc) {
	var convoCD = variables().ConvoCD;
	if (loc == 'home') {
		var convoPool = variables().HomeConvoPool;
		return (convoPool.length > 0 && chance(60) && convoCD === 0 && !isNight());
	} else if (loc == 'work') {
		var convoPool = variables().WorkConvoPool;
		return (convoPool.length > 0 && chance(60) && convoCD === 0 && !isNight() && !isEvening());
	};
};
*/

window.canTriggerHomeEvent = function () {
	if (V.HomeEvents.length > 0 &&
		(isWeekend() && !isNight()) ||
		(isTuesday() && isEvening()) &&
		!V.ElsaVisiting &&
		!V.BrokenHome) {
			return true;
		}
}

// Returns true if an event ID appears in the main event index or on cooldown
window.eventActive = function (type, id) {
	if (type == 'home') {
		var Event = variables().HomeEvents;
		var EventCD = variables().HomeEventsCD;
	} else if (type == 'work') {
		var Event = variables().WorkEvents;
		var EventCD = variables().WorkEventsCD;
	} else if (type == 'night') {
		var Event = variables().NightEvents;
		var EventCD = variables().NightEventsCD;
	} else if (type == 'dream') {
		var Event = variables().DreamEvents;
		var EventCD = variables().DreamEventsCD;
	} else {
		return false;
	}

	if (Event.includes(id)) {return true};
	for (var i = 0; i < EventCD.length; i++) {
		if (EventCD[i][0] == id) {return true};
	};
};

// Returns a deduplicated version of an array
// USE: <<set $HomeEvents to removeDupes($HomeEvents)>>
window.removeDupes = function (data) {
	return data.filter((value, index) => data.indexOf(value) === index);
};

// Pull all events on cooldown into the active event pool
window.activateAllEvents = function () {
	var HomeEvents = variables().HomeEvents;
	var WorkEvents = variables().WorkEvents;
	var HomeEventsCD = variables().HomeEventsCD;
	var WorkEventsCD = variables().WorkEventsCD;
	var DreamEvents = variables().DreamEvents;
	var NightEvents = variables().NightEvents;
	var DreamEventsCD = variables().DreamEventsCD;
	var NightEventsCD = variables().NightEventsCD;

	for (var i = 0; i < HomeEventsCD.length; i++) {HomeEvents.push(HomeEventsCD[i][0])};
	for (var i = 0; i < WorkEventsCD.length; i++) {WorkEvents.push(HomeEventsCD[i][0])};
	for (var i = 0; i < DreamEventsCD.length; i++) {DreamEvents.push(HomeEventsCD[i][0])};
	for (var i = 0; i < NightEventsCD.length; i++) {NightEvents.push(HomeEventsCD[i][0])};

	removeDupes(HomeEvents);
	removeDupes(WorkEvents);
	removeDupes(DreamEvents);
	removeDupes(NightEvents);
}

// Checks to see if a conversation has been seen
window.seenConvo = (actor, id) => (actor?.convo[id]?.seen === true);
window.convoEnabled = (actor, id) => (actor?.convo[id]?.enabled === true);

//#endregion
//#region - TIME FUNCTIONS

// Check months
// USE:
//	<<if isJanuary()>>				-	Returns true if January
//	<<if isMarch(5)>>				-	Returns true if March 5th
//	<<if isApril(13,'Morning')>>	-	Returns true if it's April 13th, in the morning
	window.isJanuary = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 1 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isFebruary = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 2 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isMarch = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 3 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isApril = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 4 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isMay = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 5 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isJune = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 6 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isJuly = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 7 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isAugust = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 8 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2018));
	};
	window.isSeptember = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 9 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2017));
	};
	window.isOctober = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 10 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2017));
	};
	window.isNovember = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 11 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2017));
	};
	window.isDecember = function (d = 0, t = 0, time = variables().time) {
		return (time.cMonth == 12 && (time.dayCount == d || d === 0) && (time.time == t || t === 0) && (time.cYear == 2017));
	};

	// Check days
	// USE:
	//	<<if isMonday()>>				-	Returns true if Monday
	//	<<if isThursday('evening')>>	-	Returns true if Wednesday Evening
	window.isMonday = function (t = 'any', time = variables().time) {return (time.cDay === 1 && verifyTime(t))};
	window.isTuesday = function (t = 'any', time = variables().time) {return (time.cDay === 2 && verifyTime(t))};
	window.isWednesday = function (t = 'any', time = variables().time) {return (time.cDay === 3 && verifyTime(t))};
	window.isThursday = function (t = 'any', time = variables().time) {return (time.cDay === 4 && verifyTime(t))};
	window.isFriday = function (t = 'any', time = variables().time) {return (time.cDay === 5 && verifyTime(t))};
	window.isSaturday = function (t = 'any', time = variables().time) {return (time.cDay === 6 && verifyTime(t))};
	window.isSunday = function (t = 'any', time = variables().time) {return (time.cDay === 0 && verifyTime(t))};
	window.isWeekend = function (t = 'any', time = variables().time) {
		return ((time.cDay === 6 || time.cDay === 0) && verifyTime(t));
	};
	window.isWeekday = function (t = 'any', time = variables().time) {
		return (time.cDay !== 6 && time.cDay !== 0 && verifyTime(t));
	};

// Check times
// USE:
//	<<if isEvening()>>			-	Returns true if it's evening
	window.isMorning = function (time = variables().time) {return time.cTime === 0};
	window.isLateMorning = function (time = variables().time) {return time.cTime === 1};
	window.isNoon = function (time = variables().time) {return time.cTime === 2};
	window.isEarlyAfternoon = function (time = variables().time) {return time.cTime === 3};
	window.isAfternoon = function (time = variables().time) {return time.cTime === 4};
	window.isEvening = function (time = variables().time) {return time.cTime === 5};
	window.isNight = function (time = variables().time) {return time.cTime === 6};
	window.isDark = function () {return (isNight() || isEvening())};

// Used to check a specific month, day, time combination
// USE:
//	<<if checkTime('January',13,'Evening')>>		-	Returns true if it's January 13th, in the evening
//	<<if checkTime('March',0,'Morning')>>			-	Returns true if it's March and morning
window.checkTime = function (m,d,t,time = variables().time) {
	return ((time.month === m || m === 0) && (time.dayCount === d || d === 0) && (time.time === t || t === 0))
};

// Function to return strings based on integers for times, days, calendar days, and months
// USE:	<<run getTimeInfo()>>
window.getTimeInfo = function () {
	let time = variables().time;
	time.day = Days[time.cDay];
	time.time = Times[time.cTime];
	time.month = Months[time.cMonth][0];
	if (time.dayCount == 1 || time.dayCount == 21 || time.dayCount == 31) {
		time.calendarDay = time.dayCount + 'st';
	} else if (time.dayCount == 2 || time.dayCount == 22) {
		time.calendarDay = time.dayCount + 'nd';
	} else if (time.dayCount == 3 || time.dayCount == 23) {
		time.calendarDay = time.dayCount + 'rd';
	} else {
		time.calendarDay = time.dayCount + 'th';
	};
};

// Function used to generate a timestamp from the current year, month, and day
window.getTimeStamp = function () {
	let time = variables().time;

	// Convert year and month into usable information
	let y = time.cYear * 10000;
	let m = time.cMonth * 100;
	let d = time.dayCount;

	// Timestamp is the sum of y, m, and d. Ex: 20171109 = November 9th, 2017
	return (y + m + d);
};

// Functions to check if a time is after or before the current time using timestamps
// checkTime must be in YYYYMMDD format
// Ex: <<if timeIsAfter(20171001)>> returns true if the current timestamp is greater than October 1st, 2017
window.timeIsAfter = function (checkTime) {
	let currentTime = getTimeStamp();
	return (checkTime < currentTime);
}
window.timeIsBefore = function (checkTime) {
	let currentTime = getTimeStamp();
	return (checkTime > currentTime);
}

// Function to process time progression on a new day
window.newDay = function() {
	let time = variables().time;

	// Adds 1 to the day counter and sets time to morning
	time.dayCount += 1;
	time.cTime = 0;

	// If the day is Sunday, sets day to Monday, otherwise adds 1 to day
	if (time.cDay == 6) {
		time.cDay = 0;
	} else {
		time.cDay += 1;
	};

	// If the new day counter exceeds the days in the current month, change to the next month
	if (time.dayCount > Months[time.cMonth][1]) {
		time.cMonth += 1;
		time.dayCount = 1;
		if (time.cMonth > 12) {
			time.cMonth = 1;
			time.cYear += 1;
			time.month = Months[time.cMonth][0];
		};
	};

	// Update time strings and run daily resets
	getTimeInfo();
	newDayResets();
};

// Function to move time forward by a defined amount (1 by default)
window.passTime = function(h = 1) {
	let time = variables().time;
	time.cTime += h;
	if (variables().ConvoCD > 0) {
		variables().ConvoCD -= 1;
	};
	if (variables().player.horny >= 30) {
		if (isBimbo()) {
			variables().player.hornyMod -= 3;
		} else {
			variables().player.hornyMod += 5;
		};
	};
	if (variables().player.hasCollar && variables().player.dom > 0) {
		variables().player.dom -= 4;
	};
	if (time.cTime > 6) {newDay()};
};

//#endregion
//#region - STATS AND COOLDOWNS

// Returns a tier value from love or lust, from 0 to 5
// USE: <<if loveTier($tasha) > 4>>
window.loveTier = (actor) => {
	return Math.floor(actor?.love / 20);
}
window.lustTier = (actor) => {
	return Math.floor(actor?.lust / 20);
}

// Creates a new cooldown object to be tracked and reduced daily
// USE: <<set setDailyCD("myCD",5)>>\
window.setDailyCD = function (cd, val = 3) {
	// Confirms the $DailyCD object is defined, and defines it if not
	if (variables().DailyCD === undefined) {
		variables().DailyCD = {};
	};

	// Sets the timer of the CD to the defined value, or 3 if undefined
	variables().DailyCD[cd] = val;
};

// Removes a daily cooldown from memory
// USE:	<<run removeDailyCD("myCD")>>\
window.removeDailyCD = function (cd) {
	// Confirms the $DailyCD object is defined, and defines it if not
	if (variables().DailyCD === undefined) {
		variables().DailyCD = {};
	};

	// Confirms the cooldown exists and deletes it if it does
	if (variables().DailyCD[cd] !== undefined) {
		delete variables().DailyCD[cd];
	};
};

// Run through all defined daily cooldowns and reduce them by 1 if greater than 0
// USE: <<run countdownDailyCD()>>
window.countdownDailyCD = function () {
	// Confirms the $DailyCD object is defined, and defines it if not
	if (variables().DailyCD === undefined) {
		variables().DailyCD = {};
	};

	// Sets a local variable as the DailyCD object
	let dailyCD = variables().DailyCD;

	// Converts daily CD names into an array called cd
	let cd = Object.keys(dailyCD);

	// Run through all daily cooldowns and reduce them by 1 if it's greater than 0
	for (let i = 0;i < cd.length; i++) {
		if (dailyCD[cd[i]] !== undefined && dailyCD[cd[i]] > 0) {
			dailyCD[cd[i]]--;
		};
	};
};

// Run through all defined daily cooldowns and reduce them by 1 if greater than 0
// Checks legacy cooldowns tied to specific actors as well as conversation cooldowns
// USE: <<run countdownActorCD()>>
window.countdownActorCD = function () {
	// Run through set of defined CDs for actors
	for (let i = 0; i < Characters.length; i++) {
		let cn = Characters[i];
		if (State.variables[cn] !== undefined) {
			let char = State.variables[cn];
			char.loveToday = 0;
			char.lustToday = 0;
			if (char.cum !== undefined && char.cum > 0) {char.cum -= 1};
			if (char.orgasm !== undefined && char.orgasm > 0) {char.orgasm -= 1};
			if (char.peDecline !== undefined && char.peDecline > 0) {char.peDecline -= 1};
			if (char.dateCD !== undefined && char.dateCD > 0) {char.dateCD -= 1};
			if (char.convoCD !== undefined && char.convoCD > 0) {char.convoCD -= 1};
			if (variables().ArtDemo) {
				if (char.doseCD !== undefined) {char.doseCD = 0};
			} else {
				if (char.doseCD !== undefined && char.doseCD > 0) {char.doseCD -= 1};
			};
			if (char.sexCD !== undefined && char.sexCD > 0) {char.sexCD -= 1};
			if (char.hasCollar !== undefined && char.hasCollar > 0) {char.daysCollar += 1};
			if (char.eventCD !== undefined && char.eventCD > 0) {char.eventCD -= 1};
			if (char.mcsx !== undefined && char.mcsx.cd > 0) {char.mcsx.cd -= 1};
			if (char.isDog !== undefined && char.isDog === true) {char.love = 60, char.lust = 60};
			if (char.convo !== undefined) {
				for (let c = 1; c < char.convo.length; c++) {
					if (char.convo[c].enabled === true && char.convo[c].cd > 0) {char.convo[c].cd -= 1};
				};
			};
		};
	};
};

// Used to check the value of a cooldown
// USE: <<if cd("PennyDose")>> returns true if $cd.PennyDose = 0
window.cd = function(cd, val = 0, isNew = false) {
	// Confirms the $DailyCD object is defined, and defines it if not
	if (variables().DailyCD === undefined) {
		variables().DailyCD = {};
	};

	// Sets a local variable as the DailyCD object
	let dailyCD = variables().DailyCD;

	// Creates as a new coodldown if 'isNew' is flagged as true
	if (isNew === true && dailyCD[cd] === undefined) {
		setDailyCD(cd,0);
	};

	// Returns true if cooldown is defined, and its value matches val, 0 by default
	return (dailyCD[cd] !== undefined && dailyCD[cd] === val);
};

// Debug function to retrieve a list of cooldowns
// USE: <<set _cdList to returnCDList()>>
window.returnCDList = function() {
	// Confirms the $DailyCD object is defined, and defines it if not
	if (variables().DailyCD === undefined) {
		variables().DailyCD = {};
	};

	// Sets a local variable as the DailyCD object, then returns the keys as an array
	let dailyCD = variables().DailyCD;
	return Object.keys(dailyCD);
};

// Checks milestone values for Lust (default), Love, and Mind, and uses them to generate a chance for a takeover to happen
// USE:	<<if takeover($tasha,"lust")>>
//			Returns true if the returned value is lower than Tasha's lust
window.check = function (stat,odds = 100) {
	if (stat !== undefined) {
		let c = Math.floor(Math.random() * odds) + 1;
		return (c < stat);
	};
};

window.getActorID = function (id = 999) {
	for (let i = 0; i < Characters.length; i++) {
		let c = getChar(Characters[i]);
		if (c.id && c.id === id) {
			return c;
		};
	};
	if (id === 999) {return undefined};
};

window.setMassStat = function (stat,val) {
	for (let c of Characters) {
		variables()[c][stat] = val;
	};
};

window.statReset = function (actor, stats) {
	if (actor) {
		for (let i = 0; i < stats.length; i++) {
			if (actor[stats[i]]) {
				actor[stats[i]] = actor[stats[i]].clamp(0, 100);
			} else {
				actor[stats[i]] = 0;
			};
		};
	};
};

// Runs through all ...EventsCD arrays and reduces index 1 by 1
// If Index 1 is 0 or less, add Index 0 to the ...Events array and remove the entire index from the CD array
window.eventCD = function () {
	// Bring story variables into local variables
	var HomeEvents = variables().HomeEvents;
	var WorkEvents = variables().WorkEvents;
	var HomeEventsCD = variables().HomeEventsCD;
	var WorkEventsCD = variables().WorkEventsCD;
	var DreamEvents = variables().DreamEvents;
	var NightEvents = variables().NightEvents;
	var DreamEventsCD = variables().DreamEventsCD;
	var NightEventsCD = variables().NightEventsCD;

	// Check HomeEvents
	for (var x = 0; x < HomeEventsCD.length; x++) {
		HomeEventsCD[x][1] -= 1;
		if (HomeEventsCD[x][1] <= 0) {
			let ev = HomeEventsCD[x][0];
			HomeEvents.push(ev);
			delete HomeEventsCD[x];
		};
	};

	// Check WorkEvents
	for (var x = 0; x < WorkEventsCD.length; x++) {
		WorkEventsCD[x][1] -= 1;
		if (WorkEventsCD[x][1] <= 0) {
			let ev = WorkEventsCD[x][0];
			WorkEvents.push(ev);
			delete WorkEventsCD[x];
		};
	};

	// Check DreamEvents
	for (var x = 0; x < DreamEventsCD.length; x++) {
		DreamEventsCD[x][1] -= 1;
		if (DreamEventsCD[x][1] <= 0) {
			let ev = DreamEventsCD[x][0];
			DreamEvents.push(ev);
			delete DreamEventsCD[x];
		};
	};

	// Check NightEvents
	for (var x = 0; x < NightEventsCD.length; x++) {
		NightEventsCD[x][1] -= 1;
		if (NightEventsCD[x][1] <= 0) {
			let ev = NightEventsCD[x][0];
			NightEvents.push(ev);
			delete NightEventsCD[x];
		};
	};

	// Purge any undefined indices from EventCD arrays
	variables().HomeEventsCD = HomeEventsCD.filter(function(value){return value !== undefined;});
	variables().WorkEventsCD = WorkEventsCD.filter(function(value){return value !== undefined;});
	variables().DreamEventsCD = DreamEventsCD.filter(function(value){return value !== undefined;});
	variables().NightEventsCD = NightEventsCD.filter(function(value){return value !== undefined;});
};

//#endregion
//#region - SERUM FUNCTIONS

// Sets a new dose property for an actor in the $actor.dose object
// USE:	<<set newDose($john,"NiceGuy")>>\
window.newDose = function (actor, nd) {
	if (actor) {
		if (actor.dosed === undefined) {actor.dosed = {}};
		actor.dosed[nd] = true;
	};
};

// Removed/disables a dose property for an actor from $actor.dose object
// USE:	<<run removeDose($john,"NiceGuy")>>\
window.removeDose = function (actor, d) {
	if (actor) {
		if (actor.dosed && actor.dosed[d]) {delete actor.dosed[d]};
	};
};

// Checks to see if a dose property exists and is true
// USE:	<<if dose($john,"NiceGuy")>>\
window.dose = function (actor, d) {
	if (actor) {return (actor.dosed && actor.dosed[d] === true)};
};

//#endregion
//#region - PROSTITUTION SYSTEM

// Create Client for Player
window.createClient = function (Gender, Personality, Y) {
	// Initialize variables for function
	var StartList = [], ActionList = [], FinishList = [];
	if (Y === undefined) {
		var Pay = Math.floor(Math.random() * 4) + 1;
	} else {
		var Pay = Y;
	};

	// Get possible client wanted foreplay actions based on player state
	if (bTier() > 3 && Gender !== "female") {StartList.push("titfuck.give")};
	if (isChastity() || isSissy()) {
		StartList.push("rimjob.give");
		if (Gender == "female") {StartList.push("eatPussy.give")} else {StartList.push("suckCock.give")};
	} else if (canFuck()) {
		StartList.push("rimjob.give");
		if (Gender == "female") {StartList.push("eatPussy.give")} else {StartList.push("suckCock.give")};
		if ((Personality == "shy" || Gender == "female") && hasPenis()) {StartList.push("suckCock.get")};
	} else {
		StartList.push("rimjob.give","eatPussy.get");
		if (Gender == "female") {StartList.push("eatPussy.give")} else {StartList.push("suckCock.give")};
	};
	var Start = StartList[Math.floor(Math.random()*StartList.length)]

	// Get possible client wanted sex actions based on player state
	if (bTier() > 3 && Gender !== "female") {ActionList.push("titfuck.give")};
	if (Start == "suckCock.get") {ActionList.push("suckCock.get")};
	if (Start == "eatPussy.get") {ActionList.push("eatPussy.get")};
	if (isChastity() || isSissy()) {
		ActionList.push("analFuck.get");
		if (Gender == "female") {ActionList.push("eatPussy.give")} else {ActionList.push("suckCock.give")};
	} else if (canFuck()) {
		if (hasPussy()) {ActionList.push("pussyFuck.get")};
		if (Gender !== "female") {ActionList.push("analFuck.get")};
		if (Gender == "female") {ActionList.push("eatPussy.give","pussyFuck.give","analFuck.give")};
		if (Gender == "female") {ActionList.push("eatPussy.give")} else {ActionList.push("suckCock.give")};
		if (Personality == "shy" && Gender !== "female") {ActionList.push("analFuck.give")};
	} else {
		if (Gender !== "female") {ActionList.push("analFuck.get","pussyFuck.get")};
		if (Gender == "female") {ActionList.push("eatPussy.give")} else {ActionList.push("suckCock.give")};
	};
	var Action = ActionList[Math.floor(Math.random()*ActionList.length)]

	// Get possible client finishes
	if (Action == "suckCock.give" || Action == "eatPussy.give" || Action == "titfuck.give") {
		FinishList.push("cumEat.get","cumBody.get");
	} else if (Action == "suckCock.get" || Action == "eatPussy.get") {
		FinishList.push("cumEat.give","cumBody.give");
	} else if (Action == "pussyFuck.get" || Action == "analFuck.get") {
		if (Gender == "female") {
			FinishList.push("cumBody.get");
		} else {
			FinishList.push("cumBody.get","creampie.get");
		};
	} else if (Action == "pussyFuck.give" || Action == "analFuck.give") {
		FinishList.push("cumBody.give","creampie.give");
	};
	var Finish = FinishList[Math.floor(Math.random()*FinishList.length)]

	// Init Client Object
	var c = State.variables.client;

	// Define Client
	c.name = "Client";
	c.style = "sister";
	c.pic = Gender + "-" + Personality;
	c.portrait = "Client-" + Gender + "-" + Personality;
	c.gender = Gender;
	c.personality = Personality;
	c.basePay = Pay;
	c.wantedStart = Start;
	c.wantedAction = Action;
	c.wantedFinish = Finish;
	c.desc = [];
	c.descCounter = 0;
	c.isSimple = true;
};

//#endregion
//#region - IMAGE PACK IMPORTS

// Image Import Block
importScripts('data/img/imgCheck.js');
importScripts('data/img/imgPenny.js');
importScripts('data/img/imgDiana.js');
importScripts('data/img/imgTasha.js');
importScripts('data/img/imgTashaPussy.js');
importScripts('data/img/imgLauren.js');
importScripts('data/img/imgLisa.js');
importScripts('data/img/imgJulia.js');
importScripts('data/img/imgSophie.js');
importScripts('data/img/imgJohn.js');
importScripts('data/img/imgChanel.js');
importScripts('data/img/imgAva.js');
importScripts('data/img/imgDakota.js');
importScripts('data/img/imgEscorting.js');
importScripts('data/img/imgEvents.js');
importScripts('data/img/imgNPC.js');
importScripts('data/img/imgKagney.js');
importScripts('data/img/imgElsa.js');
importScripts('data/img/imgActions.js');
importScripts('data/img/imgPitSlaves.js');
importScripts('data/img/imgPlayerBimbo.js');
importScripts('data/img/imgPlayerFemale.js');
importScripts('data/img/imgPlayerMale.js');
importScripts('data/img/imgPlayerSissy.js');
importScripts('data/img/imgPlayerTrans.js');
importScripts('data/img/imgPlayerTransDom.js');

//#endregion
//#region - PREFERENCES AND TRAIT FUNCTIONS

window.pref = function (actor, action, val) {
	var act = action.split(".")[0];
	var direction = action.split(".")[1];

	if (actor) {
		prefValidate(actor, act, direction);
		if (val === undefined) {
			val = 50;
		};
		if (actor.pref[act][direction] >= val) {
			return true;
		};
	} else {
		return undefined;
	};
};
window.prefEdit = function (actor, action, val) {
	var act = action.split(".")[0];
	var direction = action.split(".")[1];

	if (actor) {
		prefValidate(actor, act, direction);
		if (val === undefined) {
			val = 1;
		};
		actor.pref[act][direction] = (actor.pref[act][direction] + val).clamp(0, 100);
	} else {
		return undefined;
	};
};
window.prefValidate = function (actor, act, direction, val=50) {
	if (actor) {
		if (!actor.pref) {
			actor.pref = {}
		};
		if (!actor.pref[act]) {
			actor.pref[act] = {}
		};
		if (!actor.pref[act][direction]) {
			actor.pref[act][direction] = val
		};
	} else {
		return undefined;
	};
};

window.prefChoose = function (actor, options, codex, usePrefix) {
	if (!options) {options = setup.DEFAULTACTIONS};
	if (!codex) {
		codex = setup.DEFAULTCODEX;
	} else {
		switch (codex) {
			case "a1":
				codex = setup.ACTIONSTIER1;
				break;
			case "a2":
				codex = setup.ACTIONSTIER2;
				break;
			case "a3":
				codex = setup.ACTIONSTIER3;
				break;
		};
	};
	if (usePrefix) {
		if (!actor.scenePrefix) {
			var prefix = "sex" + actor.name + "-";
		} else {
			var prefix = actor.scenePrefix;
		};
	} else {
		var prefix = "";
	};

	var maxAction = -1,
		action = "";
	var act, dir, id, strVal;
	for (id = 0; id < codex.length; id++) {
		if (codex[id]) {
			act = codex[id][0];
			dir = codex[id][1];
			strVal = act + "." + dir;
			prefValidate(actor, act, dir);
			if (actor.pref[act][dir] > maxAction) {
				if (options.includes(strVal)) {
					action = prefix + strVal;
					maxAction = actor.pref[act][dir];
				};
			};
		};
	};

	return action;
};

window.prefPool = function (actor,level,options,codex) {
	// prefPool - Generates an array of actions based on a baseline preference, then returns one at random.
	// Used to return a single action that a character likes, loves, hates, etc.
	// Ex. _action = prefPool($penny,$LOVE) will return a single action that Penny loves from the default codex

	// If no baseline level is defined, default to LIKE
	if (!level) {level = State.variables.LIKE};

	// If no options were defined, attempt to use the actor's defined actions array. If no actions array is defined, use the DEFAULTACTIONS array
	if (!options) {
		if (actor.actions === undefined) {
			options = setup.DEFAULTACTIONS;
		} else {
			options = actor.actions;
		}
	};

	// If no codex is defined, use the DEFAULTCODEX array
	if (!codex) {codex = setup.DEFAULTCODEX};

	// If the actor doesn't have a scene prefix defined, create one as 'sexActorName-'
	if (!actor.scenePrefix) {
		var prefix = "sex" + actor.name + "-";
	} else {
		var prefix = actor.scenePrefix;
	};

	// Define local variables for function
	var actionPool = [];
	var act, dir, id, strVal;

	// Check through options and remove any invalid actions based on player state
	if (hasPussy() == false) {
		options = options.filter(function(e) { return e !== 'eatPussy.give' && e !== 'pussyFuck.give' });
	};
	if (canFuck() == false) {
		options = options.filter(function(e) { return e !== 'analFuck.get' && e !== 'pussyFuck.get' && e !== 'titFuck.give' && e !== 'suckCock.give' });
	};

	// Loop until at least one entry has been added to the actionPool array
	while (actionPool.length < 1) {

		// Run through all possible actions and add them to the actionPool array if preference is above baseline
		for (id = 0; id < codex.length; id++) {
			if (codex[id]) {
				// Splice the codex entry. This feels dumb and I need to go through and see if there's a good reason I did it this way
				act = codex[id][0];
				dir = codex[id][1];
				strVal = act + "." + dir;
				prefValidate(actor, act, dir);
				// If the actor's preference is equal to or greater than the baseline, attempt to add it to the array
				if (actor.pref[act][dir] >= level) {
					// Before adding to the array, confirm it's a valid action for the actor to take by checking against the option array
					if (options.includes(strVal)) {
						// If it is, add the prefix to the string value, then push the result to the action pool array
						var newAction = prefix + strVal;
						actionPool.push(newAction);
						// Add a second entry for an action if the actor LOVES it
						if (actor.pref[act][dir] >= State.variables.LOVE) {actionPool.push(newAction)};
					};
				};
			};
		};

		// If after the above FOR loop, no actions have been added to the actionPool array, lower the
		// baseline preference by 10 points. If the level is already 0, break.
		if (actionPool.length < 1) {
			if (level <= 0) {
				break;
			} else {
				level -= 10;
			};
		};
	};

	// Return a random value from the action pool or default to error screen if no actions found
	if (actionPool.length > 0) {
		return actionPool.random();
	} else {
		return 'sexError';
	};
};

window.prefValue = function (pref) {
	if (pref) {
		return pref;
	} else {
		return 0;
	};
};

window.updateArousal = function (actor, action, returnVal) {
	if (returnVal === undefined) {
		returnVal = false;
	};
	var act = action.split(".")[0];
	var direction = action.split(".")[1];
	var mod, pref, total, totalVal;
	if (actor) {
		prefValidate(actor, act, direction, 1);
		pref = Math.floor((actor.pref[act][direction]) / 10).clamp(1, 10);
		mod = (actor.CurOP * 0.1).clamp(0.5, 1.5);
		totalVal = (pref * mod).clamp(0, 15);
		if (returnVal == true) {
			return totalVal;
		} else {
			actor.CurOP += totalVal;
			actor.CurOP = Math.floor(actor.CurOP.clamp(0, 100));
		};
	};
};

//#endregion
//#region - TRACKING FUNCTIONS

window.tracked = function (actor, action, times) {
	// Tracks an action, returning true if the action's value is equal or greater than defined times. If times is not defined, default 1
	if (times === undefined) {times = 1};

	if (actor) {
		// Define tracking property if not defined
		if (!actor.tracking) {
			actor.tracking = {};
		};

		if (action) {
			// Remove dot naming
			action = action.replace(".","");
			action = action.replace("get","Get");
			action = action.replace("give","Give");
			if (actor.tracking[action]) {
				return (actor.tracking[action] >= times);
			} else {
				actor.tracking[action] = 0;
				return false;
			};
		} else {
			return false;
		};
	} else {
		return false;
	};
};

window.trackAction = function (action, actor) {
	// Simplify player tracking
	var player = State.variables.player;
	// Remove dot naming and assures correct casing
	// Ex: suckCock.get will convert to suckCockGet
	var act = action.replace(".","");
	act = act.replace("get","Get");
	act = act.replace("give","Give");

	// Player stat tracking
	if (player.tracking[act]) {
		player.tracking[act] += 1;
		prefEdit(player,action,1);
		if (ActionCodex.play.includes(action)) {
			if (player.tracking.play) {player.tracking.play += 1} else {player.tracking.play = 1};
		};
		if (ActionCodex.oral.includes(action)) {
			if (player.tracking.oral) {player.tracking.oral += 1} else {player.tracking.oral = 1};
		};
		if (ActionCodex.sex.includes(action)) {
			if (player.tracking.sex) {player.tracking.sex += 1} else {player.tracking.sex = 1};
		};
	} else {
		if (ActionCodex.base.includes(action)) {
			player.tracking[act] = 1;
			prefEdit(player,action,1);
		};
	};

	// Actor stat tracking if a target actor is included in the macro
	// Ex: <<trackAction "suckCock.give" $john>>
	if (actor) {
		// Create tracking property if none exists
		if (!actor.tracking) {actor.tracking = {}};

		// Flip get/give string after performing same string conversions as above
		// Ex: suckCock.give will convert to suckCockGet
		var actorAct = action.replace(".","");
		actorAct = actorAct.replace("get","Get");
		actorAct = actorAct.replace("give","Give");
		if (actorAct.contains("Get")) {
			actorAct = actorAct.replace("Get","Give");
		} else {
			actorAct = actorAct.replace("Give","Get");
		};

		if (actor.tracking[actorAct]) {
			// Increase explicit tracking stat
			actor.tracking[actorAct] += 1;
			prefEdit(actor,action,2);

			// Check for general tracking parameters and define/increase those where appropriate
			if (ActionCodex.play.includes(action)) {
				if (actor.tracking.play) {actor.tracking.play += 1} else {actor.tracking.play = 1};
			};
			if (ActionCodex.oral.includes(action)) {
				if (actor.tracking.oral) {actor.tracking.oral += 1} else {actor.tracking.oral = 1};
			};
			if (ActionCodex.sex.includes(action)) {
				if (actor.tracking.sex) {actor.tracking.sex += 1} else {actor.tracking.sex = 1};
			};
			// Check for gender-based sex tracking unless the sexTracking temp variable is currently active
			if (State.temporary.sexTracking === undefined) {
				if (actor.id == "mom" || actor.id == "sister") {
					if (player.tracking.sexFamily) {player.tracking.sexFamily += 1} else {player.tracking.sexFamily = 1};
				};
				if (actor.isMale) {
					if (player.tracking.sexMen) {player.tracking.sexMen += 1} else {player.tracking.sexMen = 1};
				};
				if (actor.isFemale) {
					if (player.tracking.sexWomen) {player.tracking.sexWomen += 1} else {player.tracking.sexWomen = 1};
				};
				if (actor.isTrans) {
					if (player.tracking.sexTrans) {player.tracking.sexTrans += 1} else {player.tracking.sexTrans = 1};
				};
			};
		} else {
			if (ActionCodex.base.includes(action)) {
				actor.tracking[actorAct] = 1;
				prefEdit(actor,action,2);
			};
		};
	};
};

// Shorthand function returning true if player is having or has had sex with actor
window.fucking = function (actor) {
	return (actor?.dosed?.sex ||
			actor?.tracking?.oral > 0 ||
			actor?.tracking?.sex > 0);
}

// Shorthand function returning true if actor is okay with incest
window.incest = function (actor) {
	return (actor?.dosed?.love ||
			actor?.dosed?.sex);
}

window.skill = function (actor = getChar(), act, lvl = 1) {
	// Returns a skill value as a string based on tracking data
	var tier = 1;
	if (tracked(actor,act,20)) {
		tier = 5;
	} else if (tracked(actor,act,13)) {
		tier = 4;
	} else if (tracked(actor,act,7)) {
		tier = 3;
	} else if (tracked(actor,act,3)) {
		tier = 2;
	} else {
		tier = 1;
	};
	return (tier >= lvl);
};

// Function to set a new flag assigned to an actor
// Ex. <<run setFlag($player,"MetPenny")>>
window.setFlag = (actor,flag,state) => {
	if (actor) {
		if (!actor.flag) {actor.flag = {}};
		flag = flag.toLowerCase();
		actor.flag[flag] = state;
	};
};

// Return whether or not a flag assigned to an actor is set to true
// Ex. <<if flag($player,"MetPenny")>>
window.flag = function (actor,flag) {
	if (actor) {
		flag = flag.toLowerCase();
		if (flag) {
			if (!actor.flag) {actor.flag = {}};
			if (actor.flag[flag] == true) {
				return true;
			};
		};
	};
};

window.serumStatus = function (actor) {
	// Check for actor validity before proceeding
	if (actor) {
		// If the actor doesn't have nextSerum and doseCD defined as properties, define them
		if (actor.nextSerum === undefined) {actor.nextSerum = 1};
		if (actor.doseCD === undefined) {actor.doseCD = 0};

		// Return a state to be used in <<switch>> statement in dose scene
		if (actor.nextSerum === 0) {
			return 'max dose';
		} else if (actor.doseCD > 0) {
			return 'on cooldown';
		} else if (actor.nextSerum !== 0) {
			if (State.variables.serum[actor.nextSerum].qty > 0) {
				return 'can dose';
			} else {
				return 'no serum';
			};
		} else {
			return 'error - invalid serum state';
		};
	} else {
		return 'error - invalid actor';
	};
};

//#endregion
//#region - TRANSFORMATION FUNCTIONS
	// Checks to see if player is being feminized based on various factors
	window.isFemme = () => {
		return (
			variables().sophie.flag?.feminizing == true
			);
	};

	window.triggerMaleTF = (player=getPlayer()) => {
		return (
			!isMale() && 
			player.genderv < (-20) && 
			!player.isPregnant &&
			player.tfMale >= variables().TFMilestone &&
			!player.isBride
		);
	};

	window.rangeMaleTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				!isMale() &&
				player.genderv < (-16)
			);
		} else {
			return (
				!isMale() &&
				player.genderv < (-16)
			);
		};
	};

	window.triggerFemaleTF = (player=getPlayer()) => {
		return (
			!isFemale() && 
			player.genderv > 20 &&
			player.tfFemale >= variables().TFMilestone
		);
	};

	window.rangeFemaleTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				!isFemale() && 
				player.genderv > 16
			);
		} else {
			return (
				!isFemale() &&
				player.genderv > 16
			);
		};
	};

	window.triggerTransTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				((player.genderv >= 0 && isMale()) || (player.genderv <= 0 && isFemale() && !player.isBride)) && 
				!isTrans() && 
				!player.isPregnant &&
				player.tfTrans >= variables().TFMilestone
			);
		} else {
			return (
				((player.genderv >= 0 && isMale()) || (player.genderv <= 0 && isFemale() && !player.isBride)) && 
				!isTrans() && 
				!player.isPregnant && 
				player.identity == 'trans' &&
				player.tfTrans >= variables().TFMilestone
			);
		};
	};

	window.rangeTransTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				!isTrans() &&
				((player.genderv >= (-10) && isMale()) || (player.genderv <= 10 && isFemale()))
			);
		} else {
			return (
				!isTrans() &&
				((player.genderv >= 0 && isMale()) || (player.genderv <= 0 && isFemale()))
			);
		};
	};

	window.triggerTransDomTF = (player=getPlayer()) => {
		return (
			isTrans() &&
			!isSissy() &&
			!isBimbo() &&
			!player.isTransDom &&
			bSize(50) &&
			pSize(50)
		);
	};

	window.triggerSissyTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				!isSissy() &&
				hasPenis() &&
				dressed('girly') &&
				player.dom <= 20 &&
				player.tfSissy >= variables().TFMilestone
			);
		} else {
			return (
				!isSissy() &&
				hasPenis() &&
				dressed('girly') &&
				makeup() &&
				!pSize(M) &&
				player.dom <= 20 &&
				player.tfSissy >= variables().TFMilestone
			);
		};
	};

	window.rangeSissyTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				hasPenis() &&
				player.dom <= 20
			);
		} else {
			return (
				hasPenis() &&
				dressed('girly') &&
				makeup() &&
				!pSize(M) &&
				player.dom <= 20
			);
		};
	};

	window.triggerBimboTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				!isBimbo() &&
				!hasPenis() &&
				player.horny >= 90 &&
				player.tfBimbo >= variables().TFMilestone
			);
		} else {
			return (
				!isBimbo() &&
				!hasPenis() &&
				dressed('slutty') &&
				makeup(2) &&
				bSize(L) &&
				player.horny >= 90 &&
				player.tfBimbo >= variables().TFMilestone
			);
		};
	};

	window.rangeBimboTF = (player=getPlayer()) => {
		if (variables().TFMode == 'classic') {
			return (
				!hasPenis() &&
				player.horny >= 90
			);
		} else {
			return (
				!hasPenis() &&
				dressed('slutty') &&
				makeup(2) &&
				bSize(L) &&
				player.horny >= 90
			);
		};
	};

	window.cancelTransDomTF = (player=getPlayer()) => {
		return (
			player.isTransDom &&
			player.breastSize <= 40 &&
			player.penisSize <= 40
		);
	};

	window.cancelSissyTF = (player=getPlayer()) => {
		return (
			isSissy() &&
			dressed('manly') &&
			!isChastity() &&
			player.dom >= 50 &&
			player.tfSissy <= 0
		);
	};

	window.cancelBimboTF = (player=getPlayer()) => {
		return (
			isBimbo() &&
			!dressed('slutty') &&
			player.makeup < 2 &&
			player.horny < 40 &&
			player.tfBimbo <= 0
		);
	};

//#endregion
//#region - RESET FUNCTIONS

window.newDayResets = function () {
	for (let i = 0; i < Characters.length; i++) {
		let char = variables()[Characters[i]];
		if (char.hasGreeted) {char.hasGreeted = false};
	};
};

// One time function to convert all game flags to lowercase strings
window.flagsToLowerCase = () => {
	for (let i = 0; i < Characters.length; i++) {
		var char = variables()[Characters[i]];
		if (char.flag) {
			var lFlags = Object.keys(char.flag);
			for (let f = 0; f < lFlags.length; f++) {
				var cFlag = lFlags[f];
				if (char.flag[cFlag] !== undefined) {
					var nFlag = cFlag.toLowerCase();
					char.flag[nFlag] = char.flag[cFlag];
					delete char.flag[cFlag];
				};
			};
		};
	};
};

//#endregion
//#region - TIME MANAGEMENT

	// Used to set the currect time to a specific time.
	//  Usage:
	//      <<set setTime('night')>> or <<run setTime('n')>>
	//      • Sets the time to Night
	//      • Use the times object for keys
	// --------------------------------------------------->
	window.setTime = function(t) {
		var time = variables().time;
		if (TimesAbbr[t]) {
			time.cTime = TimesAbbr[t];
		};
	};

	// Verifies current time matches t or 'any' and returns if so. Used for checking times within other functions
	// USE:	<<if isMonday('night')>>...if (verifyTime('night')) returns true if it's night
	window.verifyTime = function(t) {
		var time = variables().time;
		if (TimesAbbr[t] || t == 'any') {
			return (time.cTime == TimesAbbr[t] || t == 'any');
		};
	}

//#endregion
//#region - MEMORY FUNCTIONS

	// Commit attributes into longterm memory to recall if there was ever a match. RecallMemory checks against all longterm memories
	window.commitMemory = function (actor,value) {
		if (actor) {
			if (actor.memories === undefined) {actor.memories = []};
			if (!actor.memories.includes(value)) {actor.memories.push(value)};
		};
	};
	window.recallMemory = function (actor,value) {
		return (actor.memories !== undefined && actor.memories.includes(value));
	};

	// Recall function to check memories. Typically used for outfits, makeup, and gender
	// Ex:	<<if recallBreasts($john,$LARGE)>>
	//			- Returns true if John remembers the player having Large breasts
	window.recallBreasts = function (actor,value) {if (actor) {return (actor.rBreasts !== undefined && (actor.rBreasts === value || value === undefined))}};
	window.recallPenis = function (actor,value) {if (actor) {return (actor.rPenis !== undefined && (actor.rPenis === value || value === undefined))}};
	window.recallPussy = function (actor,value) {if (actor) {return (actor.rPussy !== undefined && (actor.rPussy === value || value === undefined))}};
	window.recallAss = function (actor,value) {if (actor) {return (actor.rAss !== undefined && (actor.rAss === value || value === undefined))}};
	window.recallOutfit = function (actor,value) {if (actor) {return (actor.rOutfit !== undefined && (actor.rOutfit === value || value === undefined))}};
	window.recallHair = function (actor,value) {if (actor) {return (actor.rHair !== undefined && (actor.rHair === value || value === undefined))}};
	window.recallMakeup = function (actor,value) {if (actor) {return (actor.rMakeup !== undefined && (actor.rMakeup === value || value === undefined))}};
	window.recallGender = function (actor,value) {if (actor) {return (actor.rGender !== undefined && (actor.rGender === value || value === undefined))}};
	window.recallChastity = function (actor) {if (actor) {return (actor.rChastity)}};

	// Memory functions to remember different articles
	window.rBreasts = function (actor,value = bTier()) {
		if (actor) {
			actor.rBreasts = value;
			if (hasBreasts()) {commitMemory(actor,'breasts')};
		};
	};
	window.rPenis = function (actor,value = pTier()) {
		if (actor) {
			actor.rPenis = value;
			if (hasPenis()) {commitMemory(actor,'penis')};
		};
	};
	window.rPussy = function (actor,value = vTier()) {
		if (actor) {
			actor.rPussy = value;
			if (hasPussy()) {commitMemory(actor,'pussy')};
		};
	};
	window.rAss = function (actor,value = aTier()) {
		if (actor) {
			actor.rAss = value;
			commitMemory(actor,'ass');
		};
	};
	window.rOutfit = function (actor,value = getPrimaryOutfit()) {
		if (actor) {actor.rOutfit = value};
	};
	window.rHair = function (actor,value = getHair()) {
		if (actor) {actor.rHair = value};
	};
	window.rMakeup = function (actor,value = getMakeup()) {
		if (actor) {actor.rMakeup = value};
	};
	window.rGender = function (actor,value = getPrimaryGender()) {
		if (actor) {
			actor.rGender = value;
			if (value) {commitMemory(actor,'gender')};
		};
	};
	window.rChastity = function (actor,value = isChastity()) {
		if (actor) {actor.rChastity = value};
	};

	// Memory functions to establish a baseline memory of a player based on outward appearances
	window.commitInitialMemory = function (actor) {
		if (actor !== undefined) {
			rBreasts(actor);
			rOutfit(actor);
			rHair(actor);
			rMakeup(actor);
			rGender(actor);
			rPussy(actor);
			if (isMale) {rPenis(actor)};
		};
	};

	// Memory functions to compare current traits to memorized ones
	window.breastsAreBigger = function (actor) {return (actor && actor.rBreasts !== undefined && bTier() > actor.rBreasts)};
	window.breastsAreSmaller = function (actor) {return (actor && actor.rBreasts !== undefined && bTier() < actor.rBreasts)};
	window.breastsAreNew = function (actor) {return (actor && !recallMemory(actor,'breasts'))};
	window.breastsAreBack = function (actor) {return (actor && recallMemory(actor,'breasts') && actor.rBreasts === 0)};
	window.breastsAreGone = function (actor) {return (actor && actor.rBreasts > 0 && bTier() === 0)};
	window.penisIsBigger = function (actor) {return (actor && hasPenis(actor) && actor.rPenis !== undefined && pTier() > actor.rPenis)};
	window.penisIsSmaller = function (actor) {return (actor && hasPenis(actor) && actor.rPenis !== undefined && pTier() < actor.rPenis)};
	window.penisIsNew = function (actor) {return (actor && hasPenis(actor) && !recallMemory(actor,'penis'))};
	window.penisIsBack = function (actor) {return (actor && hasPenis(actor) && recallMemory(actor,'penis') && actor.rPenis === 0)};
	window.penisIsGone = function (actor) {return (actor && !hasPenis(actor) && actor.rPenis > 0 && pTier() === 0)};
	window.pussyIsBigger = function (actor) {return (actor && actor.rPussy !== undefined && vTier() > actor.rPussy)};
	window.pussyIsSmaller = function (actor) {return (actor && actor.rPussy !== undefined && vTier() < actor.rPussy)};
	window.pussyIsNew = function (actor) {return (actor && !recallMemory(actor,'pussy'))};
	window.pussyIsBack = function (actor) {return (actor && recallMemory(actor,'pussy') && actor.rPussy === 0)};
	window.pussyIsGone = function (actor) {return (actor && actor.rPussy > 0 && pTier() === 0)};
	window.assIsBigger = function (actor) {return (actor && actor.rAss !== undefined && aTier() > actor.rAss)};
	window.assIsSmaller = function (actor) {return (actor && actor.rAss !== undefined && aTier() < actor.rAss)};
	window.hairIsLonger = function (actor) {return (actor && actor.rHair !== undefined && getHair() > actor.rHair)};
	window.hairIsShorter = function (actor) {return (actor && actor.rHair !== undefined && getHair() < actor.rHair)};

	// Memory functions to determine if something is worth noticing

	// Returns true if there's something new or different about the player's penis
	window.noticePenis = function (actor) {
		var player = getChar();
		if (actor) {
			if (penisIsNew(player) || penisIsSmaller(player) || penisIsBack(player) || penisIsBigger(player) || pussyIsGone(player)) {
				return true;
			} else if (hasPenis() && !isMale() && !recallMemory(actor, 'penis')) {
				return true;
			} else {
				return false;
			};
		};
	};
	
	// Returns true if there's something VISIBLY different about the player's vagina
	window.noticePussy = function (actor) {
		var player = getChar();
		if (actor) {
			if (pussyIsNew(player) || pussyIsBack(player) || penisIsGone(player)) {
				return true;
			} else if (hasPussy() && !isFemale() && !recallMemory(actor, 'pussy')) {
				return true;
			} else {
				return false;
			};
		};
	};
	
	// Returns true if there's something noticeably different when the actor is inside the player's vagina
	window.noticePussyInside = function (actor) {
		var player = getChar();
		if (actor) {
			if (pussyIsSmaller(player) || pussyIsBigger(player)) {
				return true;
			} else {
				return false;
			};
		};
	};
	
	// Returns true if there's something noticeably different when the actor is inside the player's ass
	window.noticeAss = function (actor) {
		var player = getChar();
		if (actor) {
			if (assIsSmaller(player) || assIsBigger(player)) {
				return true;
			} else {
				return false;
			};
		};
	};

	// Returns true if there's something new or different about the player's breasts
	window.noticeBreasts = function (actor) {
		var player = getChar();
		if (actor) {
			if (breastsAreNew(player) || breastsAreSmaller(player) || breastsAreBack(player) || breastsAreBigger(player) || breastsAreGone(player)) {
				return true;
			} else if (hasBreasts() && !isMale() && !recallMemory(actor, 'penis')) {
				return true;
			} else {
				return false;
			};
		};
	};

//#endregion
//#region - OTHER FUNCTIONS

if (!setup.formatNumber) {
	setup.formatNumber = function (number) {
		return new Intl.NumberFormat().format(number);
	};
}
predisplay["Menu Return"] = function (taskName) {
	if (!tags().contains("noreturn")) {
		State.variables.return = passage();
	}
};

// Macro Definitions
macros.showVideo = {
	handler: function (place, macroName, params, parser) {
		if (params[2]) {
			setTimeout(function () {
				var i = document.getElementById(params[2]);
				i.setAttribute('src', 'pics/' + params[0] + '/' + params[1]);
				i.className = 'videoFrame';
				i.setAttribute('autoplay', true);
			}, 1);
		} else {
			new Wikifier(place, '<video src="' + params[0] + '" class="videoFrame" autoplay="true" loop="true" muted="true"></video>');
		}
	}
};

Save.onSave.add((save, details) => {
	var ch = variables().Chapter;
	if (variables().FreePlay) {ch = "Free Play"};
	if (ch === 0) {ch = "Prologue"};
	var title = ch + " - ";
	title += variables().time.day + ", ";
	title += variables().time.month + " " + variables().time.calendarDay;
	switch (details.type) {
		case 'autosave':
			save.title = title;
			break;
		case 'disk':
		case 'serialize':
			save.title = prompt('Name this save or use default:', title);
			break;
		default: /* slots */
			// save.title = 'Chapter ' + State.variables.chapter + ' bookmark';
			save.title = prompt('Name this save or use default:', title);
			break;
	}
});

Save.onLoad.add((save) => {
	if (save.version < 5.000000) {
		/* Invalidate save versions that are too old */
		throw new Error("The save you're attempting to load is too old and incompatible with the current game. Please download the latest version.");
	}
	/*
	if (save.version < 0.060403) {
		save.state.history.forEach(function (moment) {
			moment.variables.NewNotes = false;
			moment.variables.game.Version = "6.0.404";
			moment.variables.game.release = "Dev Build";
		});
		save.version = 0.060404;
	}
	if (save.version >= 3.996) {
		// Invalidates saves outside of legal scope
		throw new Error("The save you're attempting to load is no longer compatible with the current game. Please download the latest version of The Company, or start a new game.");
	}
	*/
});

Macro.add('ScrollTo', {
	skipArgs: false,
	handler: function () {
		if (this.args.length > 0) {
			var Value = this.args[0];
			if (typeof Value === "string" || Value instanceof String) {
				var element = null,
					params = undefined;
				if (this.args.length > 1) {
					params = this.args[1];
				}
				// wait for element
				var elementWaitID = setInterval(function () {
					element = document.getElementById(Value);
					if (element != null) {
						// stop waiting and set scroll position
						clearInterval(elementWaitID);
						if (params != undefined) {
							element.scrollIntoView(params);
						} else {
							element.scrollIntoView();
						}
					}
				}, 100);
			}
		}
	}
});

//#endregion
/* twine-user-script #2: "defineAchievements.js" */
variables().achievement = [];
variables().achievement[1] = {
	name: "Beginner Chemist",
	desc: "Congratulations on your first official serum created for The Company!",
	reward: true,
	rewardType: "serum",
	rewardText: "3x $serum[1].name",
	rewardQty: 3,
	rewardValue: 1,
	earned: false
	};
variables().achievement[2] = {
	name: "Intermediate Chemist",
	desc: "Your serums are getting more complicated, but the payoff is worth the effort!",
	reward: true,
	rewardType: "serum",
	rewardText: "3x $serum[2].name",
	rewardQty: 3,
	rewardValue: 2,
	earned: false
	};
variables().achievement[3] = {
	name: "Advanced Chemist",
	desc: "You've mastered the highest tier of mind control serums. Congratulations!",
	reward: true,
	rewardType: "serum",
	rewardText: "3x $serum[3].name",
	rewardQty: 3,
	rewardValue: 3,
	earned: false
	};
variables().achievement[4] = {
	name: "Bad Ender",
	desc: "It took a lot of time of effort, but you finally finished your first batch of the mysterious MCS-X serum! What ever are you planning on doing with it?",
	reward: true,
	rewardType: "money",
	rewardValue: 50000,
	rewardText: "$$50,000",
	earned: false
	};
variables().achievement[5] = {
	name: "Chapter One Completion",
	desc: "You completed Chapter 1 of the main story!",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[6] = {
	name: "Chapter Two Completion",
	desc: "You completed Chapter 2 of the main story!",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[7] = {
	name: "Commanding Serum",
	desc: "You really came through by crafting that CMD-1 before the deadline! $penny.name doesn't need to worry with a <<guy>> like you around.",
	reward: true,
	rewardType: "serum",
	rewardText: "10x $serum[1].name",
	rewardQty: 10,
	rewardValue: 1,
	earned: false
	};
variables().achievement[8] = {
	name: "Oedipus Complex",
	desc: "Time to start spending some quality time with $mom.name!",
	reward: true,
	rewardType: "hart",
	rewardValue: 1,
	rewardText: "1x Hart Coin",
	earned: false
	};
variables().achievement[9] = {
	name: "How Can My Little Sister Be This Cute?",
	desc: "Mind controlling your little <<sister>>? What kind of <<brother>> are you, anyway!?",
	reward: true,
	rewardType: "hart",
	rewardValue: 1,
	rewardText: "1x Hart Coin",
	earned: false
	};
variables().achievement[10] = {
	name: "Manic Pixie Dream Assistant",
	desc: "Your lab assistant? Seems a bit cliche, no?",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[11] = {
	name: "Reigning In Tasha",
	desc: "Time to get those numbers up!",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[12] = {
	name: "A Wonderful Woman",
	desc: "Careful you don't get tied up!",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[13] = {
	name: "Johnny Be Good",
	desc: "He's really not a bad guy if you can look past... everything.",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[14] = {
	name: "Johnny Be Bad",
	desc: "Uh-oh! How's that beer treating you?",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[15] = {
	name: "Chapter Three Completion",
	desc: "You completed Chapter 3 of the main story!",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[16] = {
	name: "Who Made That Man A Gunner?",
	desc: "I knew it! I'm surrounded by Assholes!",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[17] = {
	name: "Cunning Linguist",
	desc: "Rug Munching and Cock Gobbling Extraordinaire!",
	reward: true,
	rewardType: "hart",
	rewardValue: 1,
	rewardText: "1x Hart Coin",
	earned: false
	};
variables().achievement[18] = {
	name: "Mouth of Myth",
	desc: "Your new life goal is to become that girl from Pigeon Blood",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[19] = {
	name: "Committed Airhead",
	desc: "Like, fancy a shag? Tee-hee, see? I can speak British!",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[20] = {
	name: "Masculine Mystique",
	desc: "You're a sucker for a hard cock and a harder chest!",
	reward: true,
	rewardType: "hart",
	rewardValue: 1,
	rewardText: "1x Hart Coin",
	earned: false
	};
variables().achievement[21] = {
	name: "Feminine Wiles",
	desc: "Soft skin, soft lips, soft pillowy chest... What could be better?",
	reward: true,
	rewardType: "wolf",
	rewardValue: 1,
	rewardText: "1x Wolf Coin",
	earned: false
	};
variables().achievement[22] = {
	name: "Best of Everything",
	desc: "The best girls come with a little extra!",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[23] = {
	name: "Johnny Come Early",
	desc: "Or, wait, is that how it goes?",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[24] = {
	name: "FICSIT Certified",
	desc: "Remember Employee #2085241, efficiency first!",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[25] = {
	name: "400 Babies",
	desc: "You've tried strawberry, now try RAWBERRY!",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[26] = {
	name: "Family First",
	desc: "Blood is thicker than water, but so is semen, so...",
	reward: true,
	rewardType: "hart",
	rewardValue: 1,
	rewardText: "1x Hart Coin",
	earned: false
	};
variables().achievement[27] = {
	name: "Wild Horses",
	desc: "Helped Jag skip town",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[28] = {
	name: "Gimme Shelter",
	desc: "Helped get Jag's stalkers off his back",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[29] = {
	name: "Paint it Black",
	desc: "Turned Jag into a Pit Slave, you monster",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
variables().achievement[30] = {
	name: "Sympathy For The Devil",
	desc: "Failed to help Jag",
	reward: true,
	rewardType: "ram",
	rewardValue: 1,
	rewardText: "1x Ram Coin",
	earned: false
	};
/* twine-user-script #3: "defineEventDB.js" */
setup.HomeEventDB = [];
setup.WorkEventDB = [];
setup.DreamEventDB = [];
setup.NightEventDB = [];

setup.HomeEventDB[0] = {id: 0, passage: "HomeEvent-0", title: "Ava's Laundry"};
setup.HomeEventDB[1] = {id: 1, passage: "HomeEvent-1", title: "Ava in the Shower 1"};
setup.HomeEventDB[2] = {id: 2, passage: "HomeEvent-2", title: "Ava in the Shower 2"};
setup.HomeEventDB[3] = {id: 3, passage: "HomeEvent-3", title: "Ava Finds your Porn"};
setup.HomeEventDB[4] = {id: 4, passage: "HomeEvent-4", title: "Ava's Massage"};
setup.HomeEventDB[5] = {id: 5, passage: "HomeEvent-5", title: "Hallway Collision"};
setup.HomeEventDB[6] = {id: 6, passage: "HomeEvent-6", title: "Private Masturbation Session"};
setup.HomeEventDB[7] = {id: 7, passage: "HomeEvent-7", title: "Hallway Kiss"};
setup.HomeEventDB[8] = {id: 8, passage: "HomeEvent-8", title: "Mindbreak in the Kitchen"};
setup.HomeEventDB[9] = {id: 9, passage: "HomeEvent-9", title: "Footrubs and Pornhubs"};
setup.HomeEventDB[10] = {id: 10, passage: "HomeEvent-10", title: "Forced Blowjob from Ava"};
setup.HomeEventDB[11] = {id: 11, passage: "HomeEvent-11", title: "Finishing Off Ava"};
setup.HomeEventDB[12] = {id: 12, passage: "HomeEvent-12", title: "Watching Ava with Dakota"};
setup.HomeEventDB[13] = {id: 13, passage: "HomeEvent-13", title: "Ava Dakota Bonding"};
setup.HomeEventDB[14] = {id: 14, passage: "HomeEvent-14", title: "Impregnated by Ava and Stranger"};
setup.HomeEventDB[15] = {id: 15, passage: "HomeEvent-15", title: "Dakota in the Hallway"};
setup.HomeEventDB[16] = {id: 16, passage: "HomeEvent-16", title: "Study Time with Dakota"};
setup.HomeEventDB[17] = {id: 17, passage: "HomeEvent-17", title: "See Dakota Changing"};
setup.HomeEventDB[18] = {id: 18, passage: "HomeEvent-18", title: "See Dakota Masturbating"};
setup.HomeEventDB[19] = {id: 19, passage: "HomeEvent-19", title: "See Dakota Fucking"};
setup.HomeEventDB[20] = {id: 20, passage: "HomeEvent-20", title: "Fucked by Dakota's Boyfriend"};
setup.HomeEventDB[21] = {id: 21, passage: "HomeEvent-21", title: "Dose Dakota"};
setup.HomeEventDB[22] = {id: 22, passage: "HomeEvent-22", title: "Catch Dakota Watching Porn"};
setup.HomeEventDB[23] = {id: 23, passage: "HomeEvent-23", title: "Take Dakota to Movies"};
setup.HomeEventDB[24] = {id: 24, passage: "HomeEvent-24", title: "Living Room Oral"};
setup.HomeEventDB[25] = {id: 25, passage: "HomeEvent-25", title: "Dakota's Webcam"};
setup.HomeEventDB[26] = {id: 26, passage: "HomeEvent-26", title: "TV With Ava"};
setup.HomeEventDB[27] = {id: 27, passage: "HomeEvent-27", title: "Kissing Practice"};
setup.HomeEventDB[28] = {id: 28, passage: "HomeEvent-28", title: "Convincing Sis"};
setup.HomeEventDB[29] = {id: 29, passage: "HomeEvent-29", title: "Ava's Outfit"};
setup.HomeEventDB[30] = {id: 30, passage: "HomeEvent-30", title: "Livingroom Orgy"};
setup.HomeEventDB[31] = {id: 31, passage: "HomeEvent-31", title: "Shower with Sister"};
setup.HomeEventDB[32] = {id: 32, passage: "HomeEvent-32", title: "Ava's Shower Surprise"};
setup.HomeEventDB[33] = {id: 33, passage: "HomeEvent-33", title: "Ava's Slavewife Training"};
setup.HomeEventDB[34] = {id: 34, passage: "HomeEvent-34", title: "Ava's Out Again"};
setup.HomeEventDB[35] = {id: 35, passage: "HomeEvent-35", title: "Wrong Number"};
setup.HomeEventDB[36] = {id: 36, passage: "HomeEvent-36", title: "Dakota's Cut"};
setup.HomeEventDB[37] = {id: 37, passage: "HomeEvent-37", title: "Ruined Movie Night"};
setup.HomeEventDB[38] = {id: 38, passage: "HomeEvent-38", title: "Declaring a Winner"};
setup.HomeEventDB[39] = {id: 39, passage: "HomeEvent-39", title: "Dakota's Maid Massage"};
setup.HomeEventDB[40] = {id: 40, passage: "HomeEvent-40", title: "Ava's Movie Night"};
setup.HomeEventDB[41] = {id: 41, passage: "HomeEvent-41", title: "Peeping Neighbor"};
setup.HomeEventDB[42] = {id: 42, passage: "HomeEvent-42", title: "Maniacal Movietime"};
setup.HomeEventDB[43] = {id: 43, passage: "HomeEvent-43", title: "Delivery"};
setup.HomeEventDB[44] = {id: 44, passage: "HomeEvent-44", title: "Dakota's Musing"};
setup.HomeEventDB[45] = {id: 45, passage: "HomeEvent-45", title: "Risky Business"};

setup.WorkEventDB[0] = {id: 0, passage: "WorkEvent-0", title: "Penny's Panties"};
setup.WorkEventDB[1] = {id: 1, passage: "WorkEvent-1", title: "Penny's Sushi"};
setup.WorkEventDB[2] = {id: 2, passage: "WorkEvent-2", title: "Help Penny With Mats"};
setup.WorkEventDB[3] = {id: 3, passage: "WorkEvent-3", title: "Clothing Malfunction"};
setup.WorkEventDB[4] = {id: 4, passage: "WorkEvent-4", title: "Lactation Serum"};
setup.WorkEventDB[5] = {id: 5, passage: "WorkEvent-5", title: "Penny and Julia"};
setup.WorkEventDB[6] = {id: 6, passage: "WorkEvent-6", title: "Penny Mousing Around"};
setup.WorkEventDB[7] = {id: 7, passage: "WorkEvent-7", title: "Cracker Break"};
setup.WorkEventDB[8] = {id: 8, passage: "WorkEvent-8", title: "Penny Cornered"};
setup.WorkEventDB[9] = {id: 9, passage: "WorkEvent-9", title: "Penny Argues with Customers"};
setup.WorkEventDB[10] = {id: 10, passage: "WorkEvent-10", title: "Penny's Game"};
setup.WorkEventDB[11] = {id: 11, passage: "WorkEvent-11", title: "Penny's Strapon"};
setup.WorkEventDB[12] = {id: 12, passage: "WorkEvent-12", title: "Penny and Tasha"};
setup.WorkEventDB[13] = {id: 13, passage: "WorkEvent-13", title: "Penny and Bathroom Girl"};
setup.WorkEventDB[14] = {id: 14, passage: "WorkEvent-14", title: "Tasha's Masturbating"};
setup.WorkEventDB[15] = {id: 15, passage: "WorkEvent-15", title: "Tasha's Coffee"};
setup.WorkEventDB[16] = {id: 16, passage: "WorkEvent-16", title: "Tasha's Toys"};
setup.WorkEventDB[17] = {id: 17, passage: "WorkEvent-17", title: "Diana's Fancy Lunch"};
setup.WorkEventDB[18] = {id: 18, passage: "WorkEvent-18", title: "Diana's Tea"};
setup.WorkEventDB[19] = {id: 19, passage: "WorkEvent-19", title: "John's Bathroom Fun"};
setup.WorkEventDB[20] = {id: 20, passage: "WorkEvent-20", title: "Beers with John"};
setup.WorkEventDB[21] = {id: 21, passage: "WorkEvent-21", title: "John Bathroom Force"};
setup.WorkEventDB[22] = {id: 22, passage: "WorkEvent-22", title: "Lunch with Sophie"};
setup.WorkEventDB[23] = {id: 23, passage: "WorkEvent-23", title: "Sophie in the Elevator"};
setup.WorkEventDB[24] = {id: 24, passage: "WorkEvent-24", title: "Sophie Hallway Oral"};
setup.WorkEventDB[25] = {id: 25, passage: "WorkEvent-25", title: "Penny and Bathroom Girl 2"};
setup.WorkEventDB[26] = {id: 26, passage: "WorkEvent-26", title: "Penny Cum Kiss"};
setup.WorkEventDB[27] = {id: 27, passage: "WorkEvent-27", title: "Penny Pegging with John"};
setup.WorkEventDB[28] = {id: 28, passage: "WorkEvent-28", title: "Penny Humiliation"};
setup.WorkEventDB[29] = {id: 29, passage: "WorkEvent-29", title: "John's Sucking"};
setup.WorkEventDB[30] = {id: 30, passage: "WorkEvent-30", title: "Tasha Serves John"};
setup.WorkEventDB[31] = {id: 31, passage: "WorkEvent-31", title: "John Bullied"};
setup.WorkEventDB[32] = {id: 32, passage: "WorkEvent-32", title: "Lunch With John"};
setup.WorkEventDB[33] = {id: 33, passage: "WorkEvent-33", title: "Angry Coworker"};
setup.WorkEventDB[34] = {id: 34, passage: "WorkEvent-34", title: "Lisa Oral"};
setup.WorkEventDB[35] = {id: 35, passage: "WorkEvent-35", title: "Lisa Sex"};
setup.WorkEventDB[36] = {id: 36, passage: "WorkEvent-36", title: "Diana Oral"};
setup.WorkEventDB[37] = {id: 37, passage: "WorkEvent-37", title: "Diana Blowbang"};
setup.WorkEventDB[38] = {id: 38, passage: "WorkEvent-38", title: "Sophie Needs You"};
setup.WorkEventDB[39] = {id: 39, passage: "WorkEvent-39", title: "Sophie at Front Desk"};
setup.WorkEventDB[40] = {id: 40, passage: "WorkEvent-40", title: "John's Bathroom Train"};
setup.WorkEventDB[41] = {id: 41, passage: "WorkEvent-41", title: "Kagney's Bust"};
setup.WorkEventDB[42] = {id: 42, passage: "WorkEvent-42", title: "Detective Elsa"};
setup.WorkEventDB[43] = {id: 43, passage: "WorkEvent-43", title: "Ava Meets Penny"};
setup.WorkEventDB[44] = {id: 44, passage: "WorkEvent-44", title: "Penny Meats Ava"};
setup.WorkEventDB[45] = {id: 45, passage: "WorkEvent-45", title: "Ava and Julia"};
setup.WorkEventDB[46] = {id: 46, passage: "WorkEvent-46", title: "Hey Baby!"};
setup.WorkEventDB[47] = {id: 47, passage: "WorkEvent-47", title: "Tasha Office Oral"};
setup.WorkEventDB[48] = {id: 48, passage: "WorkEvent-48", title: "Tasha's Number"};
setup.WorkEventDB[49] = {id: 49, passage: "WorkEvent-49", title: "Tasha's Closet Oral"};
setup.WorkEventDB[50] = {id: 50, passage: "WorkEvent-50", title: "Tasha's Closet Kiss"};
setup.WorkEventDB[51] = {id: 51, passage: "WorkEvent-51", title: "Silent but Horny"};
setup.WorkEventDB[52] = {id: 52, passage: "WorkEvent-52", title: "Suck It!"};
setup.WorkEventDB[53] = {id: 53, passage: "WorkEvent-53", title: "Hard Sell"};
setup.WorkEventDB[54] = {id: 54, passage: "WorkEvent-54", title: "Establishing Dominance"};
setup.WorkEventDB[55] = {id: 55, passage: "WorkEvent-55", title: "Tasha Trans Reveal"};
setup.WorkEventDB[56] = {id: 56, passage: "WorkEvent-56", title: "Bunny Tasha and John"};
setup.WorkEventDB[57] = {id: 57, passage: "WorkEvent-57", title: "Diana's Call for Help"};
setup.WorkEventDB[58] = {id: 58, passage: "WorkEvent-58", title: "Breaking Julia"};
setup.WorkEventDB[59] = {id: 59, passage: "WorkEvent-59", title: "Under the Front Desk"};

setup.DreamEventDB[0] = {id: 0, passage: "DreamEvent-0", title: "No Dream"};
setup.DreamEventDB[1] = {id: 1, passage: "DreamEvent-1", title: "Sophie Tease"};
setup.DreamEventDB[2] = {id: 2, passage: "DreamEvent-2", title: "No Dream"};
setup.DreamEventDB[3] = {id: 3, passage: "DreamEvent-3", title: "No Dream"};
setup.DreamEventDB[4] = {id: 4, passage: "DreamEvent-4", title: "Ava Tease"};
setup.DreamEventDB[5] = {id: 5, passage: "DreamEvent-5", title: "Dommed by Dakota"};
setup.DreamEventDB[6] = {id: 6, passage: "DreamEvent-6", title: "Dakota Couch Oral 1"};
setup.DreamEventDB[7] = {id: 7, passage: "DreamEvent-7", title: "Dakota Couch Oral 2"};
setup.DreamEventDB[8] = {id: 8, passage: "DreamEvent-8", title: "Penny Cuckold 1"};
setup.DreamEventDB[9] = {id: 9, passage: "DreamEvent-9", title: "Penny Cuckold 2"};
setup.DreamEventDB[10] = {id: 10, passage: "DreamEvent-10", title: "Penny Cuckold 3"};
setup.DreamEventDB[11] = {id: 11, passage: "DreamEvent-11", title: "Chanel TF"};
setup.DreamEventDB[12] = {id: 12, passage: "DreamEvent-12", title: "John Bathroom"};
setup.DreamEventDB[13] = {id: 13, passage: "DreamEvent-13", title: "Kiss Penny"};
setup.DreamEventDB[14] = {id: 14, passage: "DreamEvent-14", title: "Dakota Pegging"};
setup.DreamEventDB[15] = {id: 15, passage: "DreamEvent-15", title: "Dakota Sex"};
setup.DreamEventDB[16] = {id: 16, passage: "DreamEvent-16", title: "Dakota Couch Sex"};
setup.DreamEventDB[17] = {id: 17, passage: "DreamEvent-17", title: "Dakota Dogs"};
setup.DreamEventDB[18] = {id: 18, passage: "DreamEvent-18", title: "Diana Oral"};
setup.DreamEventDB[19] = {id: 19, passage: "DreamEvent-19", title: "Diana Sex"};
setup.DreamEventDB[20] = {id: 20, passage: "DreamEvent-20", title: "Oral with Sophie"};
setup.DreamEventDB[21] = {id: 21, passage: "DreamEvent-21", title: "Sex with Sophie"};
setup.DreamEventDB[22] = {id: 22, passage: "DreamEvent-22", title: "Pleasuring Sophie"};
setup.DreamEventDB[23] = {id: 23, passage: "DreamEvent-23", title: "Lauren in the Changin;Room"};
setup.DreamEventDB[24] = {id: 24, passage: "DreamEvent-24", title: "Sucking Tasha"};
setup.DreamEventDB[25] = {id: 25, passage: "DreamEvent-25", title: "Tasha Sucking"};
setup.DreamEventDB[26] = {id: 26, passage: "DreamEvent-26", title: "Fucked by Tasha"};
setup.DreamEventDB[27] = {id: 27, passage: "DreamEvent-27", title: "Suck Sophie's Strapon"};
setup.DreamEventDB[28] = {id: 28, passage: "DreamEvent-28", title: "Fucking Tasha"};
setup.DreamEventDB[29] = {id: 29, passage: "DreamEvent-29", title: "Riding the Sybian"};
setup.DreamEventDB[30] = {id: 30, passage: "DreamEvent-30", title: "Club Pearl - Men"};
setup.DreamEventDB[31] = {id: 31, passage: "DreamEvent-31", title: "Club Pearl - Women"};
setup.DreamEventDB[32] = {id: 32, passage: "DreamEvent-32", title: "The Pit - Milked"};
setup.DreamEventDB[33] = {id: 33, passage: "DreamEvent-33", title: "The Pit - Bull"};
setup.DreamEventDB[34] = {id: 34, passage: "DreamEvent-34", title: "The Pit - Cow"};

setup.NightEventDB[0] = {id: 0, passage: "NightEvent-0", title: "Sleep"};
setup.NightEventDB[1] = {id: 1, passage: "NightEvent-1", title: "Dakota Flash"};
setup.NightEventDB[2] = {id: 2, passage: "NightEvent-2", title: "Dakota Porn 1"};
setup.NightEventDB[3] = {id: 3, passage: "NightEvent-3", title: "Dakota Porn 2"};
setup.NightEventDB[4] = {id: 4, passage: "NightEvent-4", title: "Dakota Oral"};
setup.NightEventDB[5] = {id: 5, passage: "NightEvent-5", title: "Ava Sex"};
setup.NightEventDB[6] = {id: 6, passage: "NightEvent-6", title: "Dakota Knotting"};
setup.NightEventDB[7] = {id: 7, passage: "NightEvent-7", title: "Dogs in the Alley"};
setup.NightEventDB[8] = {id: 8, passage: "NightEvent-8", title: "Ava Goodnight"};
setup.NightEventDB[9] = {id: 9, passage: "NightEvent-9", title: "Dakota Kiss"};
setup.NightEventDB[10] = {id: 10, passage: "NightEvent-10", title: "Dakota Relief"};
setup.NightEventDB[11] = {id: 11, passage: "NightEvent-11", title: "Dakota Dom Oral"};
setup.NightEventDB[12] = {id: 12, passage: "NightEvent-12", title: "Sneaky Dakota"};
setup.NightEventDB[13] = {id: 13, passage: "NightEvent-13", title: "Puppy Love"};
setup.NightEventDB[14] = {id: 14, passage: "NightEvent-14", title: "Grading Ava"};
setup.NightEventDB[15] = {id: 15, passage: "NightEvent-15", title: "A Little Privacy?"};
/* twine-user-script #4: "defineGameStrings.js" */
setup.HAIRLENGTH = variables().HAIRLENGTH = [
    "Bald",
    "Very Short",
    "Short",
    "Medium-Short",
    "Medium-Long",
    "Long",
    "Very Long"
];
setup.HAIRDESC = variables().HAIRDESC = [
    "completely shaved off",
    "very short and boyish",
    "short, falling just past your ears",
    "somewhat short, just reaching your shoulders",
    "somewhat long, hanging just past your shoulders",
    "long, reaching your back",
    "very long, reaching past your back as well as falling over your shoulders. It has also turned unnaturally blonde"
];
setup.BREASTSIZE = variables().BREASTSIZE = [
    "Flat",
    "Tiny",
    "Small",
    "Medium",
    "Large",
    "Massive"
];
setup.PENISSIZE = variables().PENISSIZE = [
    "None",
    "Tiny",
    "Small",
    "Medium",
    "Large",
    "Massive"
];
setup.PUSSYSIZE = variables().PUSSYSIZE = [
    "Virgin",
    "Tight",
    "Average",
    "Loose",
    "Stretched",
    "Gaping"
];
setup.ASSSIZE = variables().ASSSIZE = [
    "Virgin",
    "Tight",
    "Average",
    "Loose",
    "Stretched",
    "Gaping"
];
setup.dogTalk=[
    "Woof! ",
    "Awooo!!! ",
    "Grrr... ",
    "Ruff! ",
    "Arrarf! ",
    "Bark! ",
    "Woof! Woof! Awooooo!! ",
    "Yip! ",
    "Awoo...? ",
    "Arf! "
];

setup.loveState = ["@@.loss;Neutral@@","Friendly","Close Friend","@@.gain;Best Friend@@","@@.xxx;Crazy About You!@@"];
setup.lustState = ["@@.loss;Neutral@@","Curious","Promiscuous","@@.gain;Depraved@@","@@.xxx;Mind Broken!@@"]
/* twine-user-script #5: "defineGameVars.js" */
variables().Location = "Title Screen";
variables().Chapter = 0;
variables().DaysPlayed = 0;
variables().CH4 = {};
variables().Money = 100;
variables().Paycheck = 750;
variables().BirthControl = 0;
variables().getCaught = 0;
variables().getCaughtChance = 34;
variables().StatRate = 0.5;
variables().g = {};
variables().DailyCD = {};
variables().CONVO = [];
variables().CONVOR = 0;
variables().SisterRoom = [1,2];
variables().MomRoom = [1,2];
variables().CanTF = true;
variables().ForceTF = true;
variables().PauseTF = false;
variables().TFMode = "classic";
variables().TFMilestone = 5;
variables().PermanentTF = 15;
variables().ShowPlayerPortrait = true;
variables().UseDoseCD = false;
variables().ShowImages = false;
variables().UsePics = false;
variables().ShowWeather = true;
variables().NewNotes = false;
variables().DebugImages = false;
variables().FreePlay = false;

variables().MCSXUnlockDate = 20180201;

variables().pitSlaves = {};
variables().SlavePrice = 35000;
variables().PrefSlaveGender = "female";

variables().EventCD = 0;
variables().EventChance = 65; // Likelihood that a random event can trigger. eg; 65 = 65% chance

/*variables().ConvoCD = 0;
variables().HomeConvoPool = ["Mom","Sister"];
variables().WorkConvoPool = ["Sophie","Diana","Penny","John","Julia","Tasha"];*/

variables().HomeEvents = [0,1,3,4,13,16,17,21,22], variables().HomeEventsCD = [];
variables().WorkEvents = [0,1,2,15,17,18,19,20], variables().WorkEventsCD = [];
variables().DreamEvents = [1], variables().DreamEventsCD = [];
variables().NightEvents = [0], variables().NightEventsCD = [];

variables().time = {day: "",time: "",month: "November",calendarDay: "",dayCount: 1,cTime: 4,cDay: 4,cMonth: 11,cYear: 2017};

variables().story = {ch1:{},ch2:{},ch3:{},ch4:{},ch5:{}};

setup.loveMilestone = [10,50,100,200]
setup.lustMilestone = [10,50,100,200]

// Add default shop inventories here
variables().Coinshop = {
    wolf: ["penny-fireside"],
    ram: [],
    hart: ["dakota-sporty"]
};

// Shop unlocks for each character
setup.mom={
    shop:"hart",shopName:"hartShop",
    loveUnlocks:["ava-whiteTop","ava-greenTop","ava-outdoorsy","ava-polkadots"],
    lustUnlocks:["ava-leather","ava-office","ava-corset","ava-nekkid"]
};
setup.sister={
    shop:"hart",shopName:"hartShop",
    loveUnlocks:["dakota-sporty","dakota-dress","dakota-stripes","dakota-red"],
    lustUnlocks:["dakota-corset","dakota-gift","dakota-tie","dakota-nekkid"]
};
setup.sophie={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["sophie-orange","sophie-green","sophie-teacher","sophie-jeans"],
    lustUnlocks:["sophie-bikini","sophie-fishnet","sophie-military","sophie-nekkid"]
};
setup.diana={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["diana-dress","diana-tied","diana-leopard","diana-fancy"],
    lustUnlocks:["diana-bikini","diana-sexyLeopard","diana-lowcut","diana-nekkid"]
};
setup.tasha={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["tasha-pearlBlouse","tasha-denimSkirt","tasha-dress","tasha-pinkShorts"],
    lustUnlocks:["tasha-schoolSkirt","tasha-summerBikini","tasha-whiteStockings","tasha-nekkid"]
};
setup.john={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["john-buttonTop","john-dress","john-glasses","john-sportsBra"],
    lustUnlocks:["john-laceSuit","john-officeLingerie","john-latexMaid","john-nekkid"]
};
setup.julia={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["julia-shirt","julia-blue","julia-office","julia-kitchen"],
    lustUnlocks:["julia-open","julia-lace","julia-pink","julia-nekkid"]
};
setup.penny={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["penny-fireside","penny-lowcut","penny-pencil","penny-stealth"],
    lustUnlocks:["penny-mermaid","penny-fishnet","penny-nurse","penny-nekkid"]
};
setup.lauren={
    shop:"wolf",shopName:"wolfShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};
setup.chris={
    shop:"ram",shopName:"ramShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};
setup.ash={
    shop:"ram",shopName:"ramShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};
setup.veruca={
    shop:"ram",shopName:"ramShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};
setup.lexi={
    shop:"ram",shopName:"ramShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};
setup.siri={
    shop:"ram",shopName:"ramShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};
setup.saya={
    shop:"ram",shopName:"ramShop",
    loveUnlocks:["","","",""],
    lustUnlocks:["","","",""]
};

setup.DEFAULTACTIONS = [
    "suckCock.give",
    "suckCock.get",
    "eatPussy.give",
    "eatPussy.get",
    "analFuck.give",
    "analFuck.get",
    "pussyFuck.give",
    "pussyFuck.get"
];
setup.DEFAULTCODEX = [
    ["kiss","give"],
    ["kiss","get"],
    ["suckCock","give"],
    ["suckCock","get"],
    ["eatPussy","give"],
    ["eatPussy","get"],
    ["analFuck","give"],
    ["analFuck","get"],
    ["analPlay","give"],
    ["analPlay","get"],
    ["pussyFuck","give"],
    ["pussyFuck","get"]
];
setup.ACTIONSTIER1 = [
    ["kiss","give"],
    ["kiss","get"],
    ["handjob","give"],
    ["handjob","get"]
];
setup.ACTIONSTIER2 = [
    ["suckCock","give"],
    ["suckCock","get"],
    ["eatPussy","give"],
    ["eatPussy","get"],
    ["analPlay","give"],
    ["analPlay","get"]
];
setup.ACTIONSTIER3 = [
    ["analFuck","give"],
    ["analFuck","get"],
    ["pussyFuck","give"],
    ["pussyFuck","get"]
];
setup.ACTIONSTIER3 = [
    ["cumInside","give"],
    ["cumInside","get"],
    ["cumOutside","give"],
    ["cumOutside","get"]
];
/* twine-user-script #6: "defineLab.js" */
variables().mcsxCD = 3;
variables().matYield = 50;

variables().LabLevel = 0;
variables().LabMaxLevel = 10;
variables().LabUpgradeCost = 350;
variables().LabUpgradeCostIncrease = 150;
variables().YieldIncrease = 15;
variables().SerumYieldIncrease = 1;

setup.LabUpgrade = [
	"Install automatic pipet for small liquid transfers",
	"Install automatic glass ware cleaner and autoclave",
	"Install pressurized Nitrogen line",
	"Install high flow bench fume hoods",
	"Replace gas bunsen burners with ceramic heat plates with magnetic stirring base",
	"Install liquid chemical distribution system to work station",
	"Procure enclosed robotic work bench to handle health hazardous chemical",
	"Install syringe filling and pill creation work space",
	"Install stand-alone environmental controls for lab climate control",
	"Install high performance liquid chromatography with attached mass spectrometer"
	];

variables().chem=[];
variables().chem[0]={name: "Sodium Pentothal",qty: 0,note: "Opens user to subconscious suggestion"};
variables().chem[1]={name: "Flunitrazepam",qty: 0,note: "Impairs user's short term memory retention"};
variables().chem[2]={name: "Scopolamine", qty: 0,note: "Heavily sedates user"};
variables().chem[3]={name: "Testosterone", qty: 0,note: "Increases male hormone production"};
variables().chem[4]={name: "Estrogens", qty: 0,note: "Increases female hormone production"};
variables().chem[5]={name: "Diazepam", qty: 0,note: "Makes user compliant and easily influenced"};
variables().chem[6]={name: "Ketamine", qty: 0,note: "Inhibits user's cognitive facilities"};
variables().chem[7]={name: "Bremelanotide", qty: 0,note: "Induces increased and permanent arousal in user"};
variables().chem[8]={name: "Stabilized HGH", qty: 0,note: "Increases hormone production and physical aptitude"};

variables().serum=[];
variables().serum[1]={name: "MCS-1",qty: 0,cost: 150,cd: 2,unlocked: false,yield: 1,yieldIncreaseCost: 5000,mats: []};
variables().serum[1].mats=[0,1,2];
variables().serum[1].matsQty=[200,100,100];
variables().serum[1].unlockLevel=0;
variables().serum[1].unlockCost=0;

variables().serum[2]={name: "MCS-2",qty: 0,cost: 300,cd: 3,unlocked: false,yield: 1,yieldIncreaseCost: 10000,mats: []};
variables().serum[2].mats=[0,1,2];
variables().serum[2].matsQty=[300,200,200];
variables().serum[2].unlockLevel=1;
variables().serum[2].unlockCost=10000;

variables().serum[3]={name: "MCS-3",qty: 0,cost: 600,cd: 4,unlocked: false,yield: 1,yieldIncreaseCost: 20000,mats: []};
variables().serum[3].mats=[0,1,2];
variables().serum[3].matsQty=[500,400,400];
variables().serum[3].unlockLevel=3;
variables().serum[3].unlockCost=30000;

variables().serum[4]={name: "CMD-1",qty: 0,cost: 1200,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 40000,mats: []};
variables().serum[4].mats=[0,1,2,5,6];
variables().serum[4].matsQty=[50,100,50,200,100];
variables().serum[4].unlockLevel=7;
variables().serum[4].unlockCost=40000;

variables().serum[5]={name: "BMB-1",qty: 0,cost: 1500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 35000,mats: []};
variables().serum[5].mats=[0,5,6,7];
variables().serum[5].matsQty=[100,100,200,250];
variables().serum[5].unlockLevel=5;
variables().serum[5].unlockCost=35000;

variables().serum[6]={name: "TFM-1",qty: 0,cost: 1750,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 25000,mats: []};
variables().serum[6].mats=[2,3,4,7];
variables().serum[6].matsQty=[150,250,250,100];
variables().serum[6].unlockLevel=3;
variables().serum[6].unlockCost=40000;

variables().serum[7]={name: "MCS-X",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[7].mats=[0,1,2,3,4,5,6,7];
variables().serum[7].matsQty=[300,300,300,300,300,300,300,300];
variables().serum[7].unlockLevel=9;
variables().serum[7].unlockCost=100000;

variables().serum[8]={name: "Stamina Increase I",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[8].mats=[0,3,8];
variables().serum[8].matsQty=[100,50,200];

variables().serum[9]={name: "Stamina Increase II",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[9].mats=[0,3,8];
variables().serum[9].matsQty=[200,250,500];

variables().serum[10]={name: "Genital Enhancement",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[10].mats=[0,2,3];
variables().serum[10].matsQty=[50,150,250];

variables().serum[11]={name: "Genital Degenerator",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[11].mats=[0,2,4];
variables().serum[11].matsQty=[50,150,250];

variables().serum[12]={name: "Breast Enhancement",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[12].mats=[0,4,7];
variables().serum[12].matsQty=[50,200,200];

variables().serum[13]={name: "Breast Degenerator",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[13].mats=[0,3,8];
variables().serum[13].matsQty=[50,200,200];

variables().serum[14]={name: "Follicle Infuser",qty: 0,cost: 2500,cd: 1,unlocked: false,yield: 1,yieldIncreaseCost: 100000,mats: []};
variables().serum[14].mats=[0,4,7];
variables().serum[14].matsQty=[75,75,75];

variables().serum[0]={name: "MCS-LULZ",qty: 0,cost: 999999,cd: 1,unlocked: false,yield: 99,yieldIncreaseCost: 999999999,mats: []};
variables().serum[0].mats=[0,1,2,3,4,5,6,7];
variables().serum[0].matsQty=[999,999,999,999,999,999,999,999];
/* twine-user-script #7: "defineShops.js" */
setup.hartShop = {};
setup.wolfShop = {};
setup.ramShop = {};

//#region - Ava
	setup.hartShop["ava-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"mom",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.hartShop["ava-lingerie"] = {
		id:"ava-lingerie",
		name:"Comfortable Lingerie",
		desc:"Comfortable underwear for the house",
		char:"mom",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.hartShop["ava-whiteTop"] = {
		id:"ava-whiteTop",
		name:"White Top",
		desc:"A pretty white top",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:25000
	};
	setup.hartShop["ava-greenTop"] = {
		id:"ava-greenTop",
		name:"Green Top",
		desc:"A nice green tanktop",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:50000
	};
	setup.hartShop["ava-outdoorsy"] = {
		id:"ava-outdoorsy",
		name:"Long Dress",
		desc:"A pretty outdoorsy dress",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:75000
	};
	setup.hartShop["ava-polkadots"] = {
		id:"ava-polkadots",
		name:"Polkadot Bikini",
		desc:"A retro polkadot bikini",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:100000
	};
	setup.hartShop["ava-leather"] = {
		id:"ava-leather",
		name:"Leather Outfit",
		desc:"Sexy leather top and gloves",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:50000
	};
	setup.hartShop["ava-office"] = {
		id:"ava-office",
		name:"Office Outfit",
		desc:"Sexy office attire",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:75000
	};
	setup.hartShop["ava-corset"] = {
		id:"ava-corset",
		name:"Lacy Corset",
		desc:"A sexy, lacy corset with fishnets",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:100000
	};
	setup.hartShop["ava-nekkid"] = {
		id:"ava-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"mom",
		type:"Outfit",
		shop:"hart",
		cost:250000
	};
	setup.hartShop["story-bossDinner"] = {
		id:"story-bossDinner",
		name:"Boss Over For Dinner",
		desc:"",
        char:"mom",
		type:"Story",
		shop:"hart",
		cost:300000
	};
//#endregion
//#region - Dakota
	setup.hartShop["dakota-default"] ={
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"sister",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.hartShop["dakota-pet"] ={
		id:"dakota-pet",
		name:"Pet Collar",
		desc:"She's been acting strange lately...",
		char:"sister",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.hartShop["dakota-porn"] ={
		id:"dakota-porn",
		name:"Risque Top",
		desc:"Dress for the job you want!",
		char:"sister",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.hartShop["dakota-sporty"] ={
		id:"dakota-sporty",
		name:"Sporty Outfit",
		desc:"Cute sporty top",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:25000
	};
	setup.hartShop["dakota-dress"] ={
		id:"dakota-dress",
		name:"Cute Dress",
		desc:"Cute flowery dress",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:50000
	};
	setup.hartShop["dakota-stripes"] ={
		id:"dakota-stripes",
		name:"Striped Top",
		desc:"Red and white striped top",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:75000
	};
	setup.hartShop["dakota-red"] ={
		id:"dakota-red",
		name:"Red Tank",
		desc:"Red tanktop",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:100000
	};
	setup.hartShop["dakota-corset"] ={
		id:"dakota-corset",
		name:"Retro Corset",
		desc:"Sexy retro styled black corset",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:50000
	};
	setup.hartShop["dakota-gift"] ={
		id:"dakota-gift",
		name:"Gift Wrapped",
		desc:"Leaves little to the imagination!",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:75000
	};
	setup.hartShop["dakota-tie"] ={
		id:"dakota-tie",
		name:"Pink Tie",
		desc:"Tiny black top and pink latex tie",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:100000
	};
	setup.hartShop["dakota-nekkid"] ={
		id:"dakota-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"sister",
		type:"Outfit",
		shop:"hart",
		cost:250000
	};
	setup.hartShop["story-sororityParty"] ={
		id:"story-sororityParty",
		name:"The Sorority Party",
		desc:"",
        char:"sister",
		type:"Story",
		shop:"hart",
		cost:300000
	};
//#endregion
//#region - Sophie
	setup.wolfShop["sophie-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"sophie",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["sophie-orange"] = {
		id:"sophie-orange",
		name:"Orange Top",
		desc:"A casual orange top",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:25000
	};
	setup.wolfShop["sophie-green"] = {
		id:"sophie-green",
		name:"Green Top",
		desc:"A pretty green top",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["sophie-teacher"] = {
		id:"sophie-teacher",
		name:"Hot For Teacher",
		desc:"Career change for the better!",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["sophie-jeans"] = {
		id:"sophie-jeans",
		name:"Pink Top & Jean Shorts",
		desc:"Tight pink top with tighter jean shorts",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["sophie-bikini"] = {
		id:"sophie-bikini",
		name:"Blue Bikini",
		desc:"Shiny blue bikini",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["sophie-fishnet"] = {
		id:"sophie-fishnet",
		name:"Fishnet Outfit",
		desc:"Sheer fishnet dress",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["sophie-military"] = {
		id:"sophie-military",
		name:"Sexy Soldier",
		desc:"Something... something... Solid Snake...",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["sophie-nekkid"] = {
		id:"sophie-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"sophie",
		type:"Outfit",
		shop:"wolf",
		cost:250000
	};
	setup.wolfShop["story-officeParty"] = {
		id:"story-officeParty",
		name:"Office Party",
		desc:"",
        char:"sophie",
		type:"Story",
		shop:"wolf",
		cost:300000
	};
//#endregion
//#region - Diana
	setup.wolfShop["diana-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"diana",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["diana-dress"] = {
		id:"diana-dress",
		name:"Elegant Dress",
		desc:"An elegant, purple dress",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:25000
	};
	setup.wolfShop["diana-tied"] = {
		id:"diana-tied",
		name:"Tied-Off Sweater",
		desc:"Sexy tied-off lavender sweater",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["diana-leopard"] = {
		id:"diana-leopard",
		name:"Leopard-Pattern Top",
		desc:"Pretty dress with a leopard pattern top",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["diana-fancy"] = {
		id:"diana-fancy",
		name:"Fancy Dress",
		desc:"Feathery black dress",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["diana-bikini"] = {
		id:"diana-bikini",
		name:"Pink Bikini",
		desc:"Sexy pink bikini",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["diana-sexyLeopard"] = {
		id:"diana-sexyLeopard",
		name:"Leopard-Patterned Outfit",
		desc:"Revealing office outfit with leopard pattern",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["diana-lowcut"] = {
		id:"diana-lowcut",
		name:"Lowcut Shirt and Skirt",
		desc:"Denim mini-skirt with a very lowcut top",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["diana-nekkid"] = {
		id:"diana-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"diana",
		type:"Outfit",
		shop:"wolf",
		cost:250000
	};
//#endregion
//#region - John
	setup.wolfShop["john-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"john",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["john-flowers"] = {
		id:"john-flowers",
		name:"Flower Dress",
		desc:"Cute flowery sundress",
		char:"john",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["john-buttonTop"] = {
		id:"john-buttonTop",
		name:"Buttoned-Up Top",
		desc:"A white button-up top over pink lingerie",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:25000
	};
	setup.wolfShop["john-dress"] = {
		id:"john-dress",
		name:"V-Line Dress",
		desc:"A nice, low-cut dress",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["john-glasses"] = {
		id:"john-glasses",
		name:"Red Dress & Glasses",
		desc:"Pretty red dress and sexy glasses",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["john-sportsBra"] = {
		id:"john-sportsBra",
		name:"Green Sports Bra",
		desc:"Bright green sports bra and pink short shorts",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["john-laceSuit"] = {
		id:"john-laceSuit",
		name:"Lacy Lingerie",
		desc:"Velvety robe covering lacy lingerie",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["john-officeLingerie"] = {
		id:"john-officeLingerie",
		name:"Office Lingerie",
		desc:"Green lingerie for the office",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["john-latexMaid"] = {
		id:"john-latexMaid",
		name:"Latex Maid",
		desc:"Bimbo's favorite latex outfit",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["john-nekkid"] = {
		id:"john-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"john",
		type:"Outfit",
		shop:"wolf",
		cost:250000
	};
//#endregion
//#region - Tasha
	setup.wolfShop["tasha-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"tasha",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["tasha-sheerDress"] = {
		id:"tasha-sheerDress",
		name:"Sheer Dress",
		desc:"Sexy see-through dress",
		char:"tasha",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["tasha-pearlBlouse"] = {
		id:"tasha-pearlBlouse",
		name:"Pearl Blouse",
		desc:"Professional office attire",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:25000
	};
	setup.wolfShop["tasha-denimSkirt"] = {
		id:"tasha-denimSkirt",
		name:"Denim Skirt",
		desc:"Busty top and denim shorts",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["tasha-dress"] = {
		id:"tasha-dress",
		name:"Elegant Dress",
		desc:"Pretty, patterned dress",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["tasha-pinkShorts"] = {
		id:"tasha-pinkShorts",
		name:"Pretty in Pink",
		desc:"Pink top and matching pink short shorts",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["tasha-schoolSkirt"] = {
		id:"tasha-schoolSkirt",
		name:"Naughty Schoolgirl",
		desc:"Taking the D to get an A!",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["tasha-summerBikini"] = {
		id:"tasha-summerBikini",
		name:"Tied Top",
		desc:"Daisy Duke fantasy come true",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["tasha-whiteStockings"] = {
		id:"tasha-whiteStockings",
		name:"White Lingerie",
		desc:"Sexy white corset",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["tasha-nekkid"] = {
		id:"tasha-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"tasha",
		type:"Outfit",
		shop:"wolf",
		cost:250000
	};
//#endregion
//#region - Julia
	setup.wolfShop["julia-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"julia",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["julia-bimbo"] = {
		id:"julia-bimbo",
		name:"Bimbo",
		desc:"She's happier this way",
		char:"julia",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["julia-shirt"] = {
		id:"julia-shirt",
		name:"White T-Shirt",
		desc:"90s hotness",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:25000
	};
	setup.wolfShop["julia-blue"] = {
		id:"julia-blue",
		name:"Blue Dress",
		desc:"Loose and flowery blue top",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["julia-office"] = {
		id:"julia-office",
		name:"Office Wear",
		desc:"For her front-desk relocation",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["julia-kitchen"] = {
		id:"julia-kitchen",
		name:"Hot Mom",
		desc:"Outfit for Julia, from Julia",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["julia-open"] = {
		id:"julia-open",
		name:"Open Blouse",
		desc:"Lowcut, revealing blouse",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["julia-lace"] = {
		id:"julia-lace",
		name:"Black Lace",
		desc:"Sexy black lace lingerie",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["julia-pink"] = {
		id:"julia-pink",
		name:"Pink Lingerie",
		desc:"Fun pink underwear",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["julia-nekkid"] = {
		id:"julia-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"julia",
		type:"Outfit",
		shop:"wolf",
		cost:250000
	};
//#endregion
//#region - Penny
	setup.wolfShop["penny-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"penny",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["penny-dom"] = {
		id:"penny-dom",
		name:"Domme Penny",
		desc:"Penny's new groove!",
		char:"penny",
		type:"Outfit",
		shop:"",
		cost:0
	};
	setup.wolfShop["penny-fireside"] = {
		id:"penny-fireside",
		name:"Fireside Sweater",
		desc:"Warm sweater by a warm fire",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:25000
	};
	setup.wolfShop["penny-lowcut"] = {
		id:"penny-lowcut",
		name:"Lowcut Shirt",
		desc:"Sexy lowcut shirt with shorts",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["penny-pencil"] = {
		id:"penny-pencil",
		name:"Pencil Skirt",
		desc:"Pretty black top with grey pencil skirt",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["penny-stealth"] = {
		id:"penny-stealth",
		name:"Operative Penny",
		desc:"Sleak and stealthy!",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["penny-mermaid"] = {
		id:"penny-mermaid",
		name:"Little Mermaid",
		desc:"Enchantment under the sea",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:50000
	};
	setup.wolfShop["penny-fishnet"] = {
		id:"penny-fishnet",
		name:"Mistress Penny",
		desc:"Fishnets and leather",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:75000
	};
	setup.wolfShop["penny-nurse"] = {
		id:"penny-nurse",
		name:"Retro Nurse",
		desc:"Two fingers, or three?",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:100000
	};
	setup.wolfShop["penny-nekkid"] = {
		id:"penny-nekkid",
		name:"Nude",
		desc:"No clothes!",
        char:"penny",
		type:"Outfit",
		shop:"wolf",
		cost:250000
	};
//#endregion
//#region - Lexi
	setup.ramShop["lexi-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"lexi",
		type:"Outfit",
		shop:"",
		cost:0
	};
//#endregion
//#region - Veruca
	setup.ramShop["veruca-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"veruca",
		type:"Outfit",
		shop:"",
		cost:0
	};
//#endregion
//#region - Siri
	setup.ramShop["siri-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"siri",
		type:"Outfit",
		shop:"",
		cost:0
	};
//#endregion
//#region - Ash
	setup.ramShop["ash-default"] = {
		id:"default",
		name:"Default",
		desc:"Default outfit",
		char:"ash",
		type:"Outfit",
		shop:"",
		cost:0
	};
//#endregion
/* twine-user-script #8: "defineTasks.js" */
variables().Tasks = [];

variables().Tasks[0] = {
        open:false,
        complete:false,
        name:"Null Task",
        desc:"There is no spoon"
    };

variables().Tasks[1] = {
        open:false,
        complete:false,
        name:"Executive Meeting",
        desc:"Create a vial of CMD-1 to show for the executive meeting on September 18th"
    };

variables().Tasks[2] = {
        open:false,
        complete:false,
        name:"$penny.name's Project",
        desc:"Help $penny.name with her side project by crafting 1x CMD-1, 2x BMB-1, and 3x TFM-1 by October 30th"
    };
/* twine-user-script #9: "genderFunctions.js" */
// Hair Check
// Returns true if hair length is greater than or equal to supplied value. Set second argument to false to check single length
// Ex:
//	<<if hair(1)>>			- Returns true if hair length is 1 or greater
//	<<if hair(2,false)>>	- Returns true if hair length is exactly 2
window.hair = function (length = 0, OrLonger = false, OrShorter = false) {
    var player = getPlayer();
    if (OrShorter == true) {
        return (player.hairLength <= length);
    } else if (OrLonger == true) {
        return (player.hairLength >= length);
    } else {
        return (player.hairLength == length);
    };
};

// Returns hair length as integer
window.getHair = function (actor = getPlayer()) {
    if (actor.hairLength !== undefined) {return actor.hairLength};
};

// Gender Checks
// Used to check if player's gender matches any given value
// Ex:	<<if gender('male')>>			- Returns true if the player is male
// Ex:	<<if gender('female','trans')>>	- Returns true if the player is female or trans
// Ex:	<<if not gender('sissy')>>		- Returns true if the player is any gender other than sissy
window.gender = function (player = getPlayer()) {
    // Assign gender value from total arguments, assigning default value if not defined
    var value = [];
    if (arguments.length > 0) {
        value = arguments;
    } else {
        return false;
    };

    // Assign player value for easier reference, then check for applicable gender states
    var genders = [], i = 0;

    if (isMale()) {genders.push('male')};
    if (isTrans()) {genders.push('trans','trans-woman')};
    if (isFemale()) {genders.push('female')};
    if (isMale(player,'sissy')) {genders.push('sissy')};
    if (isFemale(player,'bimbo')) {genders.push('bimbo')};
    if (isTrans(player,'sissy')) {genders.push('trans-sissy')};
    if (isTrans(player,'bimbo')) {genders.push('trans-bimbo')};
    if (isTrans(player,'sissy-bimbo')) {genders.push('trans-sissy-bimbo')};

    // Return true if genders contains any defined values
    for (i = 0; i < value.length; i++) {
        var v = value[i].toLowerCase();
        if (genders.includes(v)) {
            return true;
        };
    };
};

// Return primary gender
window.getPrimaryGender = function () {
    if (isMale()) {
        return 'male';
    } else if (isFemale()) {
        return 'female';
    } else if (isTrans()) {
        return 'trans';
    };
};

// Return anatomy tier
window.getTier = function (size) {
    var sizeTiers = setup.sizeTiers;
	if (size >= 0 && size < sizeTiers[1][1]) {return 0};
	if (size >= sizeTiers[1][1] && size < sizeTiers[2][1]) {return 1};
	if (size >= sizeTiers[2][1] && size < sizeTiers[3][1]) {return 2};
	if (size >= sizeTiers[3][1] && size < sizeTiers[4][1]) {return 3};
	if (size >= sizeTiers[4][1] && size < sizeTiers[5][1]) {return 4};
	if (size >= sizeTiers[5][1]) {return 5};
};

// Identify base gender
window.baseGender = (g) => variables().player.baseGender == g;

// Specific gender returns by base gender:
// Ex: <<if isMale()>> 					- Returns True is player is Male
window.isMale = () => baseGender('male');
window.isTrans = () => baseGender('ts');
window.isFemale = () => baseGender('female');
window.isBimbo = () => variables().player.isBimbo || permanentTF('bimbo');
window.isSissy = () => variables().player.isSissy;

// Anatomy checks returns true or false if anatomy exists.
// Ex:	<<if hasPenis()>>		- Returns True if player has a penis
window.hasPenis = () => baseGender('male') || baseGender('ts');
window.hasPussy = () => baseGender('female');
window.hasBreasts = () => bSize();

// Functionality Checks - Return if the player is capable of an action
window.canFuck = () => hasStrapon() || hasWorkingPenis();
window.hasWorkingPenis = () => hasPenis() && !isSissy() && !isChastity();

// Anatomy modifications
window.modPenis = (s=3,player=getPlayer()) => player.penisSize = Math.clamp(player.penisSize += s,1,100);
window.modPussy = (s=3,player=getPlayer()) => player.pussySize = Math.clamp(player.pussySize += s,0,100);
window.modBreasts = (s=3,player=getPlayer()) => player.breastSize = Math.clamp(player.breastSize += s,0,100);
window.modAss = (s=3,player=getPlayer()) => player.assSize = Math.clamp(player.assSize += s,0,100);

// This returns the tier number (None, Tiny, Small, Medium, Large, Massive) of an asset as an integer.
// Ex:	<<set _penisTier to pTier()>>		- Would set _penisTier to "3" if the Player had a medium penis
// Ex:  <<if pTier() > 3>>                  - Would return true if penis is bigger than medium
window.pTier = (actor=getPlayer()) => hasPenis() ? getTier(actor.penisSize) : 0;
window.vTier = (actor=getPlayer()) => hasPussy() ? getTier(actor.pussySize) : 0;
window.bTier = (actor=getPlayer()) => getTier(actor.breastSize);
window.aTier = (actor=getPlayer()) => getTier(actor.assSize);

// Size returns. Use these in if statements:
// Ex:	<<if pSize($L)>>		- Returns true if player has a large or bigger penis
window.pSize = (size=1,actor=getPlayer()) => hasPenis() ? actor.penisSize >= size : 0;
window.vSize = (size=1,actor=getPlayer()) => hasPussy() ? actor.pussySize >= size : 0;
window.bSize = (size=1,actor=getPlayer()) => actor.breastSize >= size;
window.aSize = (size=1,actor=getPlayer()) => actor.assSize >= size;

// Transformation Functions
window.tfToMale = (player=getPlayer()) => {
    resetGender();
    resetGenderState();
    player.wakeup = 'tf';
    player.tfChange = true;
    player.breastSize = 0;
    player.baseGender = 'male';
    player.gender = 'Male';
    player.hairCD = 10;
    player.hairLength = (player.hairLength > 1) ? 1 : player.hairLength;
    player.penisSize = (player.penisSize > 1) ? player.penisSize : 25;
};

window.tfToFemale = (player=getPlayer()) => {
    resetGender();
    player.isSissy = player.isTransDom = false;
    player.wakeup = 'tf';
    player.tfChange = true;
    player.penisSize = 0;
    player.pussySize = (player.pussySize > 0) ? player.pussySize : 0;
    player.breastSize = 25;
    player.gender = 'Female';
    player.baseGender = 'female';
    player.hairCD = 10;
    player.hairLength = (player.hairLength < 4) ? 4 : player.hairLength;
};

window.tfToTrans = (player=getPlayer()) => {
    resetGender();
    resetGenderState();
    player.wakeup = 'tf';
    player.tfChange = true;
    player.gender = "Trans";
    player.baseGender = 'ts';
    player.hairCD = 10;
    if (player.wasFemale) {
        player.hairLength = (player.hairLength < 4) ? 4 : player.hairLength;
    } else if (player.wasMale) {
        player.hairLength = (player.hairLength > 1) ? player.hairLength : 1;
    };
    player.penisSize = (player.penisSize > 1) ? player.penisSize : 25;
    player.breastSize = (player.breastSize > 25) ? player.breastSize : 25;
};

window.tfToSissy = (player=getPlayer()) => {
    resetGenderState();
    player.wakeup = 'tf';
    player.tfStateChange = true;
    player.stateChange = 'isSissy';
    player.isSissy = true;
    player.hairCD = 10;
    player.hairLength = (player.hairLength < 5) ? player.hairLength + 1 : player.hairLength;
    modPenis(-25);
};

window.tfFromSissy = (player=getPlayer()) => {
    resetGenderState();
    player.wakeup = 'tf';
    player.tfStateChange = true;
    player.stateChange = 'isNotSissy';
    player.isSissy = false;
    modPenis(15);
};

window.tfToBimbo = (player=getPlayer()) => {
    resetGenderState();
    player.wakeup = 'tf';
    player.tfStateChange = true;
    player.stateChange = 'isBimbo';
    player.isBimbo = true;
    player.hairCD = 10;
    player.hairLength = 6;
    modBreasts(25);
};

window.tfFromBimbo = (player=getPlayer()) => {
    resetGenderState();
    player.wakeup = 'tf';
    player.tfStateChange = true;
    player.stateChange = 'isNotBimbo';
    player.isBimbo = false;
};

window.tfToTransDom = (player=getPlayer()) => {
    player.tfStateChange = true;
    player.wakeup = "tf";
    player.stateChange = "isTSDom";
    player.isTransDom = true;
};

window.tfFromTransDom = (player=getPlayer()) => {
    player.tfStateChange = true;
    player.wakeup = "tf";
    player.stateChange = "isNotTSDom";
    player.isTransDom = false;
};

window.permanentTF = function (check,player=getPlayer()) {
	if (State.variables.ForceTF) {
		if (check === 'sissy') {
			return (player.tfSissy >= variables().PermanentTF);
		} else if (check === 'bimbo') {
			return (player.tfBimbo >= variables().PermanentTF || player.BimboForever);
		};
	};
};

// Resets current gender states
window.resetGender = (player=getPlayer()) => {
    player.wasMale = (isMale()) ? true : false;
    player.wasFemale = (isFemale()) ? true : false;
    player.wasTrans = (isTrans()) ? true : false;
};

window.resetGenderState = (player=getPlayer()) => {
    player.wasSissy = (player.isSissy) ? true : false;
    player.wasBimbo = (player.isBimbo) ? true : false;
    player.isSissy = player.isBimbo = player.isTransDom = false;
}
/* twine-user-script #10: "outfitFunctions.js" */
// Dressed Checks
// Returns true if any given values are found within the player's outfit properties
// Ex:	<<if dressed('slutty')>>			- Returns true if the player is dressed slutty
// Ex:	<<if dressed('formal','casual')>>	- Returns true if the player is dressed formal OR casual
window.dressed = function () {
    // Assign outfit value from total arguments, assigning default value if not defined
    var player = getPlayer();
    var value = [];
    if (arguments.length > 0) {
        value = arguments;
    } else {
        value = ['dressed'];
    };

    // Get states based on clothing values
    var o = [];
    var outfit = variables().Outfits[player.outfit];
    var underwear = variables().Underwear[player.underwear];
    var bra = variables().Bra[player.bra];
    var accf = variables().Accf[player.accf];

    // Push Primary Outfit
    o.push(getPrimaryOutfit());

    // Push outfit, underwear, accessory tags
    o = o.concat(outfit.tags, underwear.tags, accf.tags, bra.tags)

    // Parse tertiary outfit values for matches
    if (underwear.tags.includes('girly')) {o.push('girly-underwear')};
    if (underwear.tags.includes('manly')) {o.push('manly-underwear')};
    if (underwear.tags.includes('slutty') || bra.tags.includes('slutty')) {o.push('slutty-underwear')};
    if (outfit.tags.includes('girly') && isMale()) {o.push('crossdressed-male','crossdressed')};
    if (outfit.tags.includes('manly') && !isMale()) {o.push('crossdressed-female','crossdressed')};
    if (bra.id !== 'none') {o.push('bra')};
    if (underwear.id !== 'none') {o.push('underwear')};

    // Return true if outfit contains any defined values
    for (var i = 0; i < value.length; i++) {
        return (o.includes(value[i].toLowerCase()));
    };
};

// Function to return if a specific item is being worn
window.wearing = function (item) {
    var clothes = [variables().player.outfit,variables().player.underwear,variables().player.accf,variables().player.accb];
    return (clothes.includes(item));
};
// Function to return what would be considered the most notable outfit as a primary based on below priority
window.getPrimaryOutfit = function () {
    var outfit = variables().player.outfit;
    return variables().Outfits[outfit].main;
};

window.isWearingDress = function () {
    var outfit = variables().player.outfit;
    return (variables().Outfits[outfit].top == variables().Outfits[outfit].bottom);
};
window.isWearingUnderwear = function () {
    var und = variables().player.underwear;
    return (variables().Underwear[und].id !== 'none');
};
window.hasStrapon = function () {
    var acc = variables().player.accf;
    return (variables().Accf[acc].main === 'strapon');
};
window.isChastity = function (by) {
    var acc = variables().player.accf;
    if (by === undefined) {
        return (variables().Accf[acc].main === 'chastity');
    } else {
        var player = getPlayer();
        by = by.toLowerCase();
        return (variables().Accf[acc].main === 'chastity' && player.isChastityBy === by);
    };
};
window.analPlugged = function (item) {
    var acc = variables().player.accb;
    if (item === undefined) {
        return (variables().Accb[acc].id !== 'none');
    } else {
        return (variables().Accb[acc].id === item);
    };
};
window.frontPlugged = function (item) {
    var acc = variables().player.accf;
    if (item === undefined) {
        return (variables().Accf[acc].id !== 'none' && variables().Accf[acc].tags.includes('dildo'));
    } else {
        return (variables().Accf[acc].id === item && variables().Accf[acc].tags.includes('dildo'));
    };
};

// Makeup Check
// Returns true if makeup equals supplied value, defaulting to 'any'
// Ex:
//	<<if makeup()>>			- Returns true if player is wearing any makeup
//	<<if makeup(2)>>		- Returns true if player is wearing heavy makeup
//	<<if makeup('light')>>	- Returns true if player is wearing light makeup
window.makeup = function (m = 'any') {
    var player = getPlayer();

    if (m === 'any' && player.makeup > 0) {return true};
    if ((m === 'none' || m === 0) && player.makeup === 0) {return true};
    if ((m === 'light' || m === 1) && player.makeup === 1) {return true};
    if ((m === 'heavy' || m === 2) && player.makeup === 2) {return true};
};

// Returns makeup value as integer
window.getMakeup = function (actor = getPlayer()) {
    if (actor.makeup) {return actor.makeup} else {return 0};
};
/* twine-user-script #11: "settings.js" */
Setting.addHeader(
    "Image Controls",
    "Use these toggles to enable or disable graphical features in The Company"
);
Setting.addToggle("useImages", {
    label: "Show Images",
    desc: "Enable or disable images in the game",
    default: true,
    onInit: toggleImages,
    onChange: toggleImages
});
Setting.addToggle("usePaperDoll", {
    label: "Use Paper Doll",
    desc: "Choose whether to use the layered paper doll system for the MC",
    default: false,
    onInit: togglePaperDoll,
    onChange: togglePaperDoll
});

function toggleImages() {
    if (settings.useImages) {
        variables().ShowImages = true;
        variables().ShowWeather = true;
    } else {
        variables().ShowImages = false;
        variables().ShowWeather = false;
    }
};
function togglePaperDoll() {
    if (settings.usePaperDoll) {
        variables().UsePics = true;
    } else {
        variables().UsePics = false;
    }
};
/* twine-user-script #12: "templates.js" */
Template.add('he',function (p=getPlayer()) {
    return (p.pronouns === 'masculine') ? 'he' : 'she';
})

Template.add('cock', function () {
    return (hasPenis() === true) ? 'cock' : 'strap-on';
})
Template.add('hard', function () {
    if (isChastity()) {
        return 'caged'
    } else {
        return (hasPenis() === true) ? 'hard' : 'wet';
    }
})
Template.add(['get-hard','get-wet'], function () {
    if (isChastity()) {
        return 'strain under your <<accf>>'
    } else {
        return (hasPenis() === true) ? 'get hard' : 'get wet';
    }
})
Template.add('unusable-cock', function () {
    if (isChastity() || isSissy()) {
        if (isChastity()) {
            return (isSissy()) ? 'tiny, imprisoned sissy dick' : 'imprisoned cock';
        } else {
            return 'flaccid sissy dick';
        }
    };

    return 'cock';
})
Template.add('genitals', function () {
    return (hasPenis() === true) ? 'cock' : 'pussy';
})

Template.add(['sister','Sister'], function (s=variables().sister) {
    if (this.name === 'sister') {
        return (s.isBlood === true) ? 'sister' : 'stepsister';
    } else {
        return (s.isBlood === true) ? 'Sister' : 'Stepsister';
    }
});
Template.add(['siblings','Siblings'], function (s=variables().sister) {
    if (this.name === 'siblings') {
        return (s.isBlood === true) ? 'siblings' : 'stepsiblings';
    } else {
        return (s.isBlood === true) ? 'Siblings' : 'Stepsiblings';
    }
});
Template.add(['daughter','Daughter'], function (s=variables().sister) {
    if (this.name === 'daughter') {
        return (s.isBlood === true) ? 'daughter' : 'stepdaughter';
    } else {
        return (s.isBlood === true) ? 'Daughter' : 'Stepdaughter';
    }
});

Template.add(['mother','Mother'], function (s=variables().mom) {
    if (this.name === 'mother') {
        return (s.isBlood === true) ? 'mother' : 'stepmother';
    } else {
        return (s.isBlood === true) ? 'Mother' : 'Stepmother';
    }
});
Template.add(['mom','Mom'], function (s=variables().mom) {
    if (this.name === 'mom') {
        return (s.isBlood === true) ? 'mom' : 'stepmom';
    } else {
        return (s.isBlood === true) ? 'Mom' : 'Stepmom';
    }
});

Template.add(['husband','Husband'], function () {
    if (this.name === 'husband') {
        return (isMale()) ? 'husband' : 'wife';
    } else {
        return (isMale()) ? 'Husband' : 'Wife';
    }
});
Template.add(['hubby','Hubby'], function () {
    if (this.name === 'hubby') {
        return (isMale()) ? 'hubby' : 'wifey';
    } else {
        return (isMale()) ? 'Hubby' : 'Wifey';
    }
});

Template.add('mc',function (p=getPlayer()) {
    if (variables().speaker !== undefined) {
        var speaker = variables().speaker;
        if (speaker.id == "sophie") {
            return variables().player.sophieName;
        } else if (speaker.playerName) {
            return speaker.playerName;
        };
    };

    return p.name;
});

Template.add('sophie',function() {
    return variables().sophie.name;
});
Template.add('diana',function() {
    return variables().diana.name;
});
Template.add('tasha',function() {
    return variables().tasha.name;
});
Template.add('john',function() {
    return variables().john.name;
});
Template.add('julia',function() {
    return variables().julia.name;
});
Template.add('penny',function() {
    return variables().penny.name;
});
Template.add('kagney',function() {
    return variables().kagney.name;
});
Template.add('elsa',function() {
    return variables().elsa.name;
});
Template.add('craig',function() {
    return variables().craig.name;
});
/* twine-user-script #13: "defineCharacters.js" */
// SAYA
	variables().saya={
		name: "Saya", id: "saya",
		portrait: "Saya", isSimple: true,
		noOutfit: true,
		default: "default",
		style: "saya",
		notes: [],
		isFuta: true,
		status: "Normal",
		relationship: "Spirit Guide",
		lust: 0,
		love: 0,
	};

// CHRIS
	variables().chris={
		name: "Chris", id: "chris",
		portrait: "chris-pro", useNPC: true,
		style: "chris",
		notes: [], flags: {kiss: false},
		isMale: true,
		hangoutCD: 0,
		convoCD: 0,
		eventCD: 0,
		event: 0,
		peCounter: 1,
		peDecline: false,
		status: "Normal",
		relationship: "Friend",
		lust: 0,
		love: 0,
	};

// SEAN
	variables().sean={
		name: "Sean", id: "sean",
		portrait: "sean-pro", useNPC: true,
		style: "tasha",
		notes: [],
		isTrans: true,
		status: "Normal",
		relationship: "Lab Rat",
		lust: 0,
		love: 0,
	};

// LEXI
	variables().lexi={
		name: "Lexi", id: "lexi",
		portrait: "lexi-pro", useNPC: true,
		style: "tasha",
		notes: [],
		isFemale: true,
		status: "Normal",
		relationship: "Women's Boutique Clerk",
		hasShop: true,
		lust: 0,
		love: 0,
	};
	
// VERUCA
	variables().veruca={
		name: "Veruca", id: "veruca",
		portrait: "veruca-pro", useNPC: true,
		style: "john",
		notes: [],
		isFemale: true,
		status: "Normal",
		relationship: "Men's Boutique Clerk",
		hasShop: true,
		lust: 0,
		love: 0,
	};
	
// SIRI
	variables().siri={
		name: "Siri", id: "siri",
		portrait: "siri-pro", useNPC: true,
		style: "penny",
		notes: [],
		isFemale: true,
		status: "Normal",
		relationship: "Intimate Apparel Clerk",
		hasShop: true,
		lust: 0,
		love: 0,
	};

// ASH
	variables().ash={
		name: "Ash", id: "ash",
		portrait: "ash-pro", useNPC: true,
		style: "sister",
		notes: [],
		isFemale: true,
		status: "Normal",
		relationship: "Adult Store Clerk",
		hasShop: true,
		lust: 0,
		love: 0,
	};

// ELSA
	variables().elsa={
		name: "Elsa", id: "elsa",
		portrait: "portrait",
		noOutfit: true,
		style: "penny",
		isFemale: true,
		status: "Normal",
		relationship: "Cousin",
		lust: 0, love: 0
	};
	
// MICK
	variables().mick={
		name: "Mick", id: "mick",
		portrait: "mick-pro", useNPC: true,
		style: "men",
		notes: [],
		isMale: true,
		status: "Normal",
		relationship: "Company Escort",
		lust: 0,
		love: 0,
	};

// JAG
	variables().jag={
		name: "Jag", id: "jag",
		portrait: "jag-pro", useNPC: true,
		style: "men",
		notes: [],
		isMale: true,
		status: "Normal",
		relationship: "Company Escort",
		lust: 0,
		love: 0,
	};
	
// OTHER
	variables().craig={name:"Craig",isSimple:true,portrait:"Unknown",style:"men",id:"craig",convo:[]};
	variables().slave1={name:"Slave Girl",isSimple:true,portrait:"Slave Girl",style:"men"};
	variables().tory={name:"Ms. L",id:"tory",portrait:"tory-pro",isHidden:true,useNPC:true,style:"men"};
	variables().katie={name:"Katie",isSimple:true,portrait:"Katie",style:"men"};
	variables().jessica={name:"Jessica",portrait:"jessica-pro",useNPC:true,style:"chris"};
	variables().sam={name:"Samantha",portrait:"samantha-pro",useNPC:true,style:"tasha"};
	variables().ron={name:"Ronnie",isSimple:true,portrait:"Unknown",style:"men"};
	variables().girl={name:"Girl",isSimple:true,portrait:"UnknownF",style:"men"};
	variables().man={name:"Man",isSimple:true,portrait:"Unknown",style:"men"};
	variables().woman={name:"Woman",isSimple:true,portrait:"UnknownF",style:"men"};
	variables().serverm={name:"Server",isSimple:true,portrait:"Unknown",style:"men"};
	variables().serverf={name:"Server",isSimple:true,portrait:"UnknownF",style:"men"};
	variables().westane={name:"Westane",isSimple:true,portrait:"Westane",style:"westane"};

	variables().craig.convo[1] = {enabled: false, seen: false, id: 1, title: "Security Detail?"};
/* twine-user-script #14: "defineCoworkers.js" */
// SOPHIE
	variables().sophie={
		name: "Ms. Dee", id: "sophie",
		default: "default",
		style: "sophie",
		pName: "<<Formal>>",
		convo: [], notes: [], control: {},
		isFemale: true,
		dose: 0,
		doseF: 0,
		doseS: 0,
		doseD: 0,
		femR: 0,
		doseCD: 0,
		convoCD: 0,
		eventCD: 0,
		status: "Normal",
		relationship: "Direct Report",
		hasShop: true,
		lust: 0,
		love: 1
	};
	
// PENNY
	variables().penny={
		name: "Penny", id: "penny",
		default: "default",
		style: "penny",
		mood: "nice",
		MaxOP: 100,
		CurOP: 10,
		tfmTimer: -1,
		tfmNotes: [],convo: [],notes: [], control: {}, flag: {},
		tfmNotesNew: false,
		newNotes: false,
		isMouse: false,
		isWhore: false,
		isDom: false,
		canRomance: true,
		isDating: false,
		dose: 0,
		doseCD: 0,
		dateCD: 0,
		dates: 0,
		convoCD: 0,
		peCounter: 1,
		daysWhore: -1,
		status: "Normal",
		relationship: "Co-worker",
		hasShop: true,
		matBonus: 20,
		lust: 0,
		love: 1
	};
    variables().penny.pref = {
        kiss: {give: LIKE, get: LIKE},
        analFuck: {give: LIKE, get: LIKE},
        pussyFuck: {give: HATE, get: LOVE},
        analPlay: {give: LIKE, get: LIKE},
        pussyPlay: {give: NEUTRAL, get: NEUTRAL},
        rimjob: {give: NEUTRAL, get: NEUTRAL},
        eatPussy: {give: LIKE, get: LOVE},
        suckCock: {give: LIKE, get: NEUTRAL},
        gangbang: {give: NEUTRAL, get: NEUTRAL},
        cock: {have: NEUTRAL, want: NEUTRAL},
        pussy: {have: NEUTRAL, want: NEUTRAL},
        breasts: {have: NEUTRAL, want: NEUTRAL},
        bigBreasts: {have: NEUTRAL, want: NEUTRAL},
        smallBreasts: {have: NEUTRAL, want: NEUTRAL}
    };
    variables().penny.act = [
        "analFuck.get",
        "pussyFuck.get",
        "eatPussy.get", "eatPussy.give",
        "suckCock.give"
    ];

// DIANA
	variables().diana={
		name: "Diana", id: "diana",
		default: "default",
		style: "diana",
		convo: [], notes: [], control: {}, flag: {},
		isFemale: true,
		dose: 0,
		doseCD: 0,
		sexCD: 0,
		convoCD: 0,
		peCounter: 1,
		peDecline: false,
		status: "Normal",
		relationship: "Co-worker",
		hasShop: true,
		lust: 0,
		love: 1
	};
    variables().diana.pref = {
        kiss: {give: LIKE, get: LIKE},
        analFuck: {give: LOVE, get: DISLIKE},
        pussyFuck: {give: LOVE, get: LIKE},
        analPlay: {give: LOVE, get: LIKE},
        pussyPlay: {give: LOVE, get: LIKE},
        rimjob: {give: HATE, get: LOVE},
        eatPussy: {give: LIKE, get: LOVE},
        suckCock: {give: LIKE, get: LOVE},
        cumEat: {give: LOVE, get: DISLIKE},
        gangbang: {give: NEUTRAL, get: NEUTRAL},
        cock: {have: NEUTRAL, want: NEUTRAL},
        pussy: {have: NEUTRAL, want: NEUTRAL},
        breasts: {have: NEUTRAL, want: NEUTRAL},
        bigBreasts: {have: NEUTRAL, want: NEUTRAL},
        smallBreasts: {have: NEUTRAL, want: NEUTRAL}
    };

// JOHN / CHANEL
	variables().john={
		name: "John", id: "john",
		default: "default",
		oldName: "John",
		style: "john",
		convo: [], notes: [], flag: {},
		isMale: true,
		hasPenis: true,
		workReaction: false,
		dose: 0,
		doseCD: 0,
		convoCD: 0,
		sexCD: 0,
		tfCD: 3,
		status: "Normal",
		relationship: "Co-worker",
		hasShop: true,
		lust: 0,
		love: 1,
		cPenny: 0,
		cTasha: 0,
		cDiana: 0,
		cPlayer: 0
	};
    variables().john.pref = {
        kiss: {give: DISLIKE, get: DISLIKE},
        analFuck: {give: LOVE, get: HATE},
        pussyFuck: {give: LOVE, get: HATE},
        analPlay: {give: LIKE, get: HATE},
        pussyPlay: {give: LIKE, get: HATE},
        rimjob: {give: HATE, get: NEUTRAL},
        eatPussy: {give: DISLIKE, get: LOVE},
        suckCock: {give: HATE, get: LOVE},
        gangbang: {give: LOVE, get: HATE},
        cock: {have: LOVE, want: LOVE},
        pussy: {have: HATE, want: HATE},
        breasts: {have: HATE, want: HATE},
        bigBreasts: {have: HATE, want: HATE},
        smallBreasts: {have: HATE, want: HATE}
    };

// TASHA
	variables().tasha={
		name: "Tasha", id: "tasha",
		default: "default",
		style: "tasha",
		convo: [], notes: [], talk: {}, flag: {}, control: {},
		mcsx: {cd: 0},
		isTrans: true,
		genderReveal: false,
		hasPussy: false,
		dose: 0,
		doseCD: 0,
		convoCD: 0,
		sexCD: 0,
		status: "Normal",
		relationship: "Co-worker",
		hasShop: true,
		lust: 0,
		love: 1,
	};

// JULIA
	variables().julia={
		name: "Julia", id: "julia",
		default: "default",
		style: "julia",
		convo: [], notes: [], flag: {}, talk: {},
		isFemale: true,
		dose: 0,
		doseCD: 0,
		convoCD: 0,
		status: "Normal",
		relationship: "Co-worker",
		hasShop: true,
		lust: 0,
		love: 1,
	};

// LISA
	variables().lisa={
		name: "Ms. Ann", id: "lisa",
		firstName: "Lisa",
		default: "default",
		style: "lisa",
		pName: "<<Formal>>",
		convo: [], notes: [],
		isFemale: true,
		status: "Normal",
		relationship: "Company Executive",
		lust: 0,
		love: 0,
	};

// LAUREN
	variables().lauren={
		name: "Lauren", id: "lauren",
		portrait: "portrait",
		noOutfit: true,
		style: "lauren",
		convo: [], notes: [],
		isFemale: true,
		status: "Normal",
		relationship: "Co-worker",
		dose: 0,
		doseCD: 0,
		convoCD: 0,
		lust: 0,
		love: 1,
	};

// JAMES
	variables().james={
		name:"Dr. K", id: "james",
		portrait:"james-pro", useNPC: true,
		isHidden: true,
		style:"men",
		convo: [], notes: [],
		isMale: true,
		status: "Normal",
		relationship: "Head of Company R&D",
	};

// ERIK
	variables().erik={
		name:"Mr. G", id: "erik",
		isSimple: true,
		portrait:"Unknown",
		style:"men"
	};

// KAGNEY
	variables().kagney={
		name:"Kagney", id: "kagney",
		portrait:"portrait",
		noOutfit: true,
		default: "default",
		style:"sister",
		convo: [], notes: [],
		isFemale: true,
		dose: 0,
		doseCD: 0,
		convoCD: 0,
		status: "Normal",
		relationship: "Receptionist",
		lust: 0,
		love: 1,
	};

//#region - Conversations
    variables().sophie.convo[1] = {enabled: true, seen: false, id: 1, title: "Talk About New Job"};
    variables().sophie.convo[2] = {enabled: true, seen: false, id: 2, title: "Talk About Office Environment"};
    variables().sophie.convo[3] = {enabled: false, seen: false, id: 3, title: "Thinking of Tory"};
    variables().sophie.convo[4] = {enabled: false, seen: false, id: 4, title: "Thinking of Julia"};
    variables().sophie.convo[5] = {enabled: false, seen: false, id: 5, title: "Thinking of Chanel"};
    variables().sophie.convo[6] = {enabled: false, seen: false, id: 6, title: "Enjoying our Time Together"};
    variables().sophie.convo[7] = {enabled: false, seen: false, id: 7, title: "Enjoying Sneaking Around"};
    variables().sophie.convo[8] = {enabled: false, seen: false, id: 8, title: "Enjoying your Mouth"};
    variables().sophie.convo[9] = {enabled: false, seen: false, id: 9, title: "Help for Kagney"};
    variables().sophie.convo[10] = {enabled: false, seen: false, id: 10, title: "Driver's Worried"};
	variables().sophie.convo[11] = {enabled: false, seen: false, id: 11, title: "Tasha's Happy"};
	variables().sophie.convo[12] = {enabled: false, seen: false, id: 12, title: "What's Going on with Tasha"};

    variables().penny.convo[1] = {enabled: true, seen: false, id: 1, title: "Working Here Long?"};
    variables().penny.convo[2] = {enabled: true, seen: false, id: 2, title: "Chemistry Education"};
    variables().penny.convo[3] = {enabled: false, seen: false, id: 3, title: "Chemistry Education"};
    variables().penny.convo[4] = {enabled: false, seen: false, id: 4, title: "Taste of Lenny"};
    variables().penny.convo[5] = {enabled: false, seen: false, id: 5, title: "Thinking of Tory's Fate"};
    variables().penny.convo[6] = {enabled: false, seen: false, id: 6, title: "Thinking of Tory"};
    variables().penny.convo[7] = {enabled: false, seen: false, id: 7, title: "Thinking of Julia"};
    variables().penny.convo[8] = {enabled: false, seen: false, id: 8, title: "Had a Great Time..."};
    variables().penny.convo[9] = {enabled: false, seen: false, id: 9, title: "Meeting with John"};
    variables().penny.convo[10] = {enabled: false, seen: false, id: 10, title: "Something on Your Face"};
    variables().penny.convo[11] = {enabled: false, seen: false, id: 11, title: "Thinking of Chanel"};
    variables().penny.convo[12] = {enabled: false, seen: false, id: 12, title: "Long Nights"};
    variables().penny.convo[13] = {enabled: false, seen: false, id: 13, title: "Do I Make You Happy?"};
    variables().penny.convo[14] = {enabled: false, seen: false, id: 14, title: "Selling Serums"};
    variables().penny.convo[15] = {enabled: false, seen: false, id: 15, title: "Testing Serums"};
    variables().penny.convo[16] = {enabled: false, seen: false, id: 16, title: "Serum Side Effects"};
    variables().penny.convo[17] = {enabled: false, seen: false, id: 17, title: "Eating Julia"};
    variables().penny.convo[18] = {enabled: false, seen: false, id: 18, title: "Keep Me Safe?"};
    variables().penny.convo[19] = {enabled: false, seen: false, id: 19, title: "Weird Cravings..."};
    variables().penny.convo[20] = {enabled: false, seen: false, id: 20, title: "Horny All the Time"};
    variables().penny.convo[21] = {enabled: false, seen: false, id: 21, title: "New Wardrobe?"};
    variables().penny.convo[22] = {enabled: false, seen: false, id: 22, title: "Paid for Fun"};
    variables().penny.convo[23] = {enabled: false, seen: false, id: 23, title: "<<Daddy>>? Sorry. <<Daddy>>?"};
    variables().penny.convo[24] = {enabled: false, seen: false, id: 24, title: "Looking Good"};
    variables().penny.convo[25] = {enabled: false, seen: false, id: 25, title: "New Look"};
    variables().penny.convo[26] = {enabled: false, seen: false, id: 26, title: "Explore Each Other"};
    variables().penny.convo[27] = {enabled: false, seen: false, id: 27, title: "Fun With Diana"};
    variables().penny.convo[28] = {enabled: false, seen: false, id: 28, title: "Be My Pet?"};
    variables().penny.convo[29] = {enabled: false, seen: false, id: 29, title: "New Lesbian"};
    variables().penny.convo[30] = {enabled: false, seen: false, id: 30, title: "What's Up With Tasha?"};
    variables().penny.convo[31] = {enabled: false, seen: false, id: 31, title: "Tasha's so Hawt!"};

    variables().diana.convo[1] = {enabled: true, seen: false, id: 1, title: "Thoughts on Work"};
    variables().diana.convo[2] = {enabled: true, seen: false, id: 2, title: "Spilling the Tea"};
    variables().diana.convo[3] = {enabled: false, seen: false, id: 3, title: "Had a Great Time"};
    variables().diana.convo[4] = {enabled: false, seen: false, id: 4, title: "Thinking of Julia"};
    variables().diana.convo[5] = {enabled: false, seen: false, id: 5, title: "Thinking of John"};
    variables().diana.convo[6] = {enabled: false, seen: false, id: 6, title: "Helping a Friend"};
    variables().diana.convo[7] = {enabled: false, seen: false, id: 7, title: "Off the Books"};
    variables().diana.convo[8] = {enabled: false, seen: false, id: 8, title: "Security Detail Order"};
    variables().diana.convo[9] = {enabled: false, seen: false, id: 9, title: "No Secrets"};
    variables().diana.convo[10] = {enabled: false, seen: false, id: 10, title: "The New Office Bunny"};

    variables().john.convo[1] = {enabled: true, seen: false, id: 1, title: "Settling In"};
    variables().john.convo[2] = {enabled: true, seen: false, id: 2, title: "Stressful Workplace"};
    variables().john.convo[3] = {enabled: false, seen: false, id: 3, title: "Thinking of Tory"};
    variables().john.convo[4] = {enabled: false, seen: false, id: 4, title: "Thinking of Julia"};
    variables().john.convo[5] = {enabled: false, seen: false, id: 5, title: "Reflecting on New Self"};
    variables().john.convo[6] = {enabled: false, seen: false, id: 6, title: "Fun with Penny"};
    variables().john.convo[7] = {enabled: false, seen: false, id: 7, title: "Fun with You"};
    variables().john.convo[8] = {enabled: false, seen: false, id: 8, title: "Improving"};
    variables().john.convo[9] = {enabled: false, seen: false, id: 9, title: "New Numb"};
    variables().john.convo[10] = {enabled: false, seen: false, id: 10, title: "Playing Nice"};
    variables().john.convo[11] = {enabled: false, seen: false, id: 11, title: "Being a Friend"};
    variables().john.convo[12] = {enabled: false, seen: false, id: 12, title: "People Are Nice"};
    variables().john.convo[13] = {enabled: false, seen: false, id: 13, title: "Drinks Again?"};
	variables().john.convo[14] = {enabled: false, seen: false, id: 14, title: "What's Up With Tasha?"};
	variables().john.convo[15] = {enabled: false, seen: false, id: 15, title: "Love the New Tasha!"};

    variables().tasha.convo[1] = {enabled: true, seen: false, id: 1, title: "Try to Visit"};
    variables().tasha.convo[2] = {enabled: true, seen: false, id: 2, title: "Working with John"};
    variables().tasha.convo[3] = {enabled: false, seen: false, id: 3, title: "Thinking of Tory"};
    variables().tasha.convo[4] = {enabled: false, seen: false, id: 4, title: "Acceptance"};
    variables().tasha.convo[5] = {enabled: false, seen: false, id: 5, title: "Fun Together"};
    variables().tasha.convo[6] = {enabled: false, seen: false, id: 6, title: "Tasha's Secret's Out!"};
    variables().tasha.convo[7] = {enabled: false, seen: false, id: 7, title: "Thinking of Julia"};
    variables().tasha.convo[8] = {enabled: false, seen: false, id: 8, title: "Thinking of John"};
    variables().tasha.convo[9] = {enabled: false, seen: false, id: 9, title: "Domming John"};
    variables().tasha.convo[10] = {enabled: false, seen: false, id: 10, title: "Nice John"};
    variables().tasha.convo[11] = {enabled: false, seen: false, id: 11, title: "Our Morning Visits"};
    variables().tasha.convo[12] = {enabled: false, seen: false, id: 12, title: "Our Time Together"};
    variables().tasha.convo[13] = {enabled: false, seen: false, id: 13, title: "Seeing Anyone?"};
    variables().tasha.convo[14] = {enabled: false, seen: false, id: 14, title: "Anatomy of a Cock"};
    variables().tasha.convo[15] = {enabled: false, seen: false, id: 15, title: "Working Relationship"};
    variables().tasha.convo[16] = {enabled: false, seen: false, id: 16, title: "Your Place?"};
    variables().tasha.convo[17] = {enabled: false, seen: false, id: 17, title: "Your Family"};
    variables().tasha.convo[18] = {enabled: false, seen: false, id: 18, title: "Take Me Away"};
    variables().tasha.convo[19] = {enabled: false, seen: false, id: 19, title: "How Exciting!"};
    variables().tasha.convo[20] = {enabled: false, seen: false, id: 20, title: "It's Okay if it's You"};
    variables().tasha.convo[21] = {enabled: false, seen: false, id: 21, title: "Strange Fantasies"};
    variables().tasha.convo[22] = {enabled: false, seen: false, id: 22, title: "So This Place..."};
    variables().tasha.convo[23] = {enabled: false, seen: false, id: 23, title: "So Much Fun!"};
    variables().tasha.convo[24] = {enabled: false, seen: false, id: 24, title: "Weird Dreams"};
    variables().tasha.convo[25] = {enabled: false, seen: false, id: 25, title: "New Gear"};
    variables().tasha.convo[26] = {enabled: false, seen: false, id: 26, title: "Love Being the Office Bunny!"};

    variables().julia.convo[1] = {enabled: true, seen: false, id: 1, title: "Staying Busy"};
    variables().julia.convo[2] = {enabled: true, seen: false, id: 2, title: "Hard Work"};
    variables().julia.convo[3] = {enabled: false, seen: false, id: 3, title: "Thinking of Tory"};
    variables().julia.convo[4] = {enabled: false, seen: false, id: 4, title: "Thinking of Chanel"};
    variables().julia.convo[5] = {enabled: false, seen: false, id: 5, title: "The New Julia"};
    variables().julia.convo[6] = {enabled: true, seen: false, id: 6, title: "Birth Control PSA"};
    variables().julia.convo[7] = {enabled: false, seen: false, id: 7, title: "Nice John"};
	variables().julia.convo[8] = {enabled: false, seen: false, id: 8, title: "I Want to Taste It!"};
	variables().julia.convo[9] = {enabled: false, seen: false, id: 9, title: "Tasha's a Lot..."};

    variables().lauren.convo[1] = {enabled: true, seen: false, id: 1, title: "Getting Comfortable?"};
    variables().lauren.convo[2] = {enabled: true, seen: false, id: 2, title: "About Tory"};
    variables().lauren.convo[3] = {enabled: false, seen: false, id: 3, title: "About Julia"};

    variables().kagney.convo[1] = {enabled: true, seen: false, id: 1, title: "Keeping Busy"};
    variables().kagney.convo[2] = {enabled: false, seen: false, id: 2, title: "Looking Overworked"};
    variables().kagney.convo[3] = {enabled: false, seen: false, id: 3, title: "Looking For Help"};
    variables().kagney.convo[4] = {enabled: false, seen: false, id: 4, title: "Is It True?"};
    variables().kagney.convo[5] = {enabled: false, seen: false, id: 5, title: "OMG Tasha!"};
//#endregion

/* Reference
    variables().sophie.control={
        casual: false,
        flash: false,
        oralThink: false,
        phone: false,
        touch: false,
        oralSecret: false,
        lunch: false,
        grope: false,
        officeOral: false,
        date: false,
        giveOral: false,
        officeSex: false
        };
	variables().penny.control={
		command: false,
		command2: false,
		makeSerums: false,
		sellSerums: false,
		testSerums: false,
		testTFM: false,
		slut: false,
		slut2: false,
		actDom: false,
		beDom: false,
		officeSlut: false,
		whore: false,
		materials: false,
		production: false
		};
	variables().penny.flag={
		firstDate: false,
		secondDate: false,
		thirdDate: false,
		arcStart: false,
		arcEnd: false,
		canProgress: true,
		breakup: false,
		makeCMD1: false,
		unlockApartment: false,
		sex: false,
		oral: false,
		apartmentOral: false,
		increaseOutput: false,
		};
	variables().diana.control={
		flirt: false,
		sophieInfo: false,
		oral: false,
		sex: false,
		usb: false
		};
	variables().diana.flag={
		backRoom: false
        };
	variables().john.flag={
		giveOral: false,
		slapDown: false,
		serumBackfire: false,
		bathroomOral1: false
		};
	variables().tasha.talk={
		johnDefeat: false
		};
	variables().tasha.flag={
		hadCoffee: false,
		caughtPegging: false,
		caughtMasturbating: false
		};
	variables().tasha.control={
		coffee: false,
		morningMasturbate: false,
		coffeeKiss: false,
		johnDom: false,
		oral: false
		};
	variables().julia.flag={
		seeLeaveLab: false,
		firstBody: false
		};
	variables().julia.talk={
		johnHistory: false,
		birthControl: false
		};
*/
/* twine-user-script #15: "defineFamily.js" */
// Mom
variables().mom={
    name: "Mom", id: "mom",realName: "Ava",
    default: "default",
    style: "mom",
    convo:[], notes:[],
    isFemale: true,
    daysCollar: 0,
    dose: 0,
    nextSerum: 1,
    mcsx: {cd: 0,slut: 0},
    doseCD: 0,
    convoCD: 0,
    status: "Normal",
    relationship: "Mother",
    lust: 0,
    love: 1,
    hasShop: true,
    shop: "hart",
    morningTask: "oral",
    control: {}, flag: {}
};

// Sister
variables().sister={
    name: "Dakota", id: "sister",
    default: "default",
    style: "sister",
    convo: [],notes: [], rape: {},
    isFemale: true,
    pregnantBy: "",
    dose: 0,
    nextSerum: 1,
    mcsx: {cd: 0, pet: 0, porn: 0},
    doseCD: 0,
    convoCD: 0,
    status: "Normal",
    relationship: "Sister",
    lust: 0,
    love: 1,
    camStep: 1,
    hasShop: true,
    shop: "hart",
    control: {}, flag: {}, talk: {}
};

variables().mom.convo[1] = {enabled: true, seen: false, cd: 0, cdMax: 3, id: 1, title: "Talk About Moving In"};
variables().mom.convo[2] = {enabled: true, seen: false, cd: 0, cdMax: 3, id: 2, title: "Talk About Life"};
variables().mom.convo[3] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 3, title: "Thanks For The Coffee"};
variables().mom.convo[4] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 4, title: "Have You Been Okay?"};
variables().mom.convo[5] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 5, title: "You've Been Acting Stressed"};
variables().mom.convo[6] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 6, title: "Talk About Affection"};
variables().mom.convo[7] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 7, title: "Talk About <<Mom>>'s Penis"};
variables().mom.convo[8] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 8, title: "Comfortable Clothing"};
variables().mom.convo[9] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 9, title: "Tight Family"};
variables().mom.convo[10] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 10, title: "<<Mom>> is Happy"};
variables().mom.convo[11] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 11, title: "New Dad?"};
variables().mom.convo[12] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 12, title: "Lots of Fun"};
variables().mom.convo[13] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 13, title: "<<Mom>> Loves Master"};
variables().mom.convo[14] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 14, title: "Bridal Plans"};
variables().mom.convo[15] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 15, title: "<<Mom>> Gets Dark"};
variables().mom.convo[16] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 16, title: "<<Mom>> Gets Ideas"};
variables().mom.convo[17] = {enabled: false, seen: false, cd: 0, cdMax: 3, id: 17, title: "Married Life"};
variables().sister.convo[1] = {enabled: true, seen: false, id: 1, title: "Talk About School"};
variables().sister.convo[2] = {enabled: false, seen: false, id: 2, title: "Talk About School"};
variables().sister.convo[3] = {enabled: false, seen: false, id: 3, title: "Talk About School"};
variables().sister.convo[4] = {enabled: false, seen: false, id: 4, title: "Talk About School"};
variables().sister.convo[5] = {enabled: false, seen: false, id: 5, title: "New Guy at School"};
variables().sister.convo[6] = {enabled: false, seen: false, id: 6, title: "New Guy at School"};
variables().sister.convo[7] = {enabled: false, seen: false, id: 7, title: "New Guy at School"};
variables().sister.convo[8] = {enabled: false, seen: false, id: 8, title: "New Girl at School"};
variables().sister.convo[9] = {enabled: true, seen: false, id: 9, title: "Talk About <<Mom>>"};
variables().sister.convo[10] = {enabled: false, seen: false, id: 10, title: "Talk About <<Mom>>"};
variables().sister.convo[11] = {enabled: false, seen: false, id: 11, title: "<<Mom>>'s Bringing You COFFEE!?"};
variables().sister.convo[12] = {enabled: false, seen: false, id: 12, title: "<<Mom>> is Stressed"};
variables().sister.convo[13] = {enabled: false, seen: false, id: 13, title: "Teasing <<Sister>>"};
variables().sister.convo[14] = {enabled: false, seen: false, id: 14, title: "Sharing a Kiss with <<Sister>>"};
variables().sister.convo[15] = {enabled: false, seen: false, id: 15, title: "Frustrated with <<Mom>>'s Masturbating"};
variables().sister.convo[16] = {enabled: false, seen: false, id: 16, title: "Catch you Watching <<Mom>> in Shower"};
variables().sister.convo[17] = {enabled: false, seen: false, id: 17, title: "Tease you About <<Mom>> in Shower"};
variables().sister.convo[18] = {enabled: false, seen: false, id: 18, title: "<<Sister>> Puts on a Show"};
variables().sister.convo[19] = {enabled: true, seen: false, id: 19, title: "Talk About Movies"};
variables().sister.convo[20] = {enabled: false, seen: false, id: 20, title: "Had Fun at Theater"};
variables().sister.convo[21] = {enabled: false, seen: false, id: 21, title: "Talk About Porn"};
variables().sister.convo[22] = {enabled: false, seen: false, id: 22, title: "Watch Porn with <<Sister>>"};
variables().sister.convo[23] = {enabled: false, seen: false, id: 23, title: "On Having Sex"};
variables().sister.convo[24] = {enabled: false, seen: false, id: 24, title: "<<Mom>>'s Crazy"};
variables().sister.convo[25] = {enabled: false, seen: false, id: 25, title: "Thoughts on <<Mom>>"};
variables().sister.convo[26] = {enabled: false, seen: false, id: 26, title: "Is <<Mom>> Okay?"};
variables().sister.convo[27] = {enabled: false, seen: false, id: 27, title: "Pimping Out <<Mom>>!?"};
variables().sister.convo[28] = {enabled: false, seen: false, id: 28, title: "So Tired"};
variables().sister.convo[29] = {enabled: false, seen: false, id: 29, title: "<<Mom>>'s a Maid"};
variables().sister.convo[30] = {enabled: false, seen: false, id: 30, title: "It's Cute!"};
variables().sister.convo[31] = {enabled: false, seen: false, id: 31, title: "You Married $mom.name!?"};
variables().sister.convo[32] = {enabled: false, seen: false, id: 32, title: "Wrong Room"};
/* twine-user-script #16: "definePlayer.js" */
variables().player = {
	name: "Jesse",
	sophieName: "",
	surname: "Doe",
	s: "SISSY",
	b: "BIMBO",
	d: "DEFAULT",
	wakeup: "room",
	MaxOP: 100,
	CurOP: 10,
	outfit: "casual1", outfits: [],
	hat: "none", hats: ["none"],
	underwear: "boxers1", underwears: ["none"],
	bra: "none", bras: ["none"],
	accf: "none", accfs: ["none"],
	accb: "none", accbs: ["none"],
	style: "you",
	penisSize: 0,
	pussySize: 0,
	breastSize: 0,
	assSize: 0,
	dose: 0,
	doseCD: 0,
	dayEventCD: 0,
	johnEventCD: 0,
	hairCD: -1,
	horny: 0,
	hornyMod: 0,
	dom: 50,
	genderv: 0,
	hLength: "Bald",
	hDesc: "completely shaved off",
	tfRate: 1,
	tfCD: 0,
	tfForever: 15,
	tfMale: 0,
	tfFemale: 0,
	tfTrans: 0,
	tfBimbo: 0,
	tfSissy: 0,
	daysMale: 0,
	daysFemale: 0,
	daysSissy: 0,
	daysTrans: 0,
	daysBimbo: 0,
	makeup: 0,
	wearingMakeup: ["no","@@.tf;light@@","@@.xxx;heavy@@"],
	makeupLevel: ["None","Light Makeup","Slutty Makeup"],
	coinOutfits: ["default"],
	wolf: 0,
	ram: 0,
	hart: 0,
	baseGender: "male",
	
};

variables().player.pref = {
	kiss: {give: variables().LIKE, get: variables().LIKE},
	analFuck: {give: variables().LIKE, get: variables().LIKE},
	pussyFuck: {give: variables().LOVE, get: variables().NEUTRAL},
	analPlay: {give: variables().LIKE, get: variables().LIKE},
	pussyPlay: {give: variables().NEUTRAL, get: variables().NEUTRAL},
	rimjob: {give: variables().NEUTRAL, get: variables().NEUTRAL},
	eatPussy: {give: variables().LIKE, get: variables().LOVE},
	suckCock: {give: variables().LIKE, get: variables().LOVE},
	gangbang: {give: variables().NEUTRAL, get: variables().NEUTRAL},
	cock: {have: variables().NEUTRAL, want: variables().NEUTRAL},
	pussy: {have: variables().NEUTRAL, want: variables().NEUTRAL},
	breasts: {have: variables().NEUTRAL, want: variables().NEUTRAL},
	bigBreasts: {have: variables().NEUTRAL, want: variables().NEUTRAL},
	smallBreasts: {have: variables().NEUTRAL, want: variables().NEUTRAL},
	sex: {men: variables().NEUTRAL, women: variables().NEUTRAL, trans: variables().NEUTRAL, family: variables().NEUTRAL}
};

variables().player.flag = {};
variables().player.has = {};
variables().player.control = {};
variables().player.met = {};
variables().player.tracking = {};
/* twine-user-script #17: "clAccb.js" */
setup.clAccbDefault = {
    "none":{
        "name":"None",
        "id":"none",
        "tags":["naked"],
        "main":"none",
        "store":"none",
        "cost": 0
    },
    "buttplug":{
        "name":"Buttplug",
        "id":"buttplug",
        "tags":["anal","slutty"],
        "main":"dildo",
        "store":"adult",
        "cost": 300
    },
    "vibrating-buttplug":{
        "name":"Vibrating Buttplug",
        "id":"vibrating-buttplug",
        "tags":["anal","slutty"],
        "main":"dildo",
        "store":"adult",
        "cost": 500
    }
};
/* twine-user-script #18: "clAccf.js" */
setup.clAccfDefault = {
    "none":{
        "name":"None",
        "id":"none",
        "img":"none",
        "tags":["naked"],
        "main":"none",
        "store":"none",
        "cost": 0
    },
    "strapon":{
        "name":"Large Strapon",
        "id":"strapon",
        "img":"strapon",
        "tags":["dominant","manly","strapon","female"],
        "main":"strapon",
        "store":"adult",
        "cost": 300
    },
    "chastity":{
        "name":"Chastity Device",
        "id":"chastity",
        "img":"chastity",
        "tags":["submissive","sissy","chastity","male"],
        "main":"chastity",
        "store":"adult",
        "cost": 300
    },
    "dildo":{
        "name":"Dildo",
        "id":"dildo",
        "img":"dildo",
        "tags":["dildo","slutty","female"],
        "main":"dildo",
        "store":"adult",
        "cost": 300
    },
    "vibrator":{
        "name":"Vibrator",
        "id":"vibrator",
        "img":"vibrator",
        "tags":["dildo","slutty","female"],
        "main":"dildo",
        "store":"adult",
        "cost": 500
    }
};
/* twine-user-script #19: "clBra.js" */
setup.clBraDefault = {
    "none":{
        "name":"None",
        "id":"none",
        "dir":"none",
        "img":["none","none","none","none","none","none"],
        "tags":[],
        "main":"naked",
        "top":"",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"none",
        "cost": 0
    },
    "cotton1":{
        "name":"White Cotton Bra",
        "id":"cotton1",
        "dir":"un_cotton1",
        "img":["flat","tiny","small","medium","large","massive"],
        "tags":["casual","girly"],
        "main":"casual",
        "top":"cotton bra",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 40
    },
    "cotton2":{
        "name":"Grey Cotton Bra",
        "id":"cotton2",
        "dir":"un_cotton2",
        "img":["flat","tiny","small","medium","large","massive"],
        "tags":["casual","girly"],
        "main":"casual",
        "top":"cotton bra",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 40
    },
    "silk1":{
        "name":"Red Silk Bra",
        "id":"silk1",
        "dir":"un_silk1",
        "img":["flat","tiny","small","medium","large","massive"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"silk bra",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 60
    },
    "silk2":{
        "name":"Black Silk Bra",
        "id":"silk2",
        "dir":"un_silk2",
        "img":["flat","tiny","small","medium","large","massive"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"silk bra",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 80
    },
    "sisters-bra":{
        "name":"Sisters Bra",
        "id":"sisters-bra",
        "dir":"un_sister",
        "img":["flat","tiny","small","medium","large","massive"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"silk bra",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"",
        "cost":0
    }
};
/* twine-user-script #20: "clHats.js" */
setup.clHats = {
    "none":{
        "name":"None",
        "id":"none",
        "dir":"none",
        "img":"none",
        "tags":[],
        "main":"none",
        "top":"",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"none",
        "cost": 0
    },
    "newsboy-hat":{
        "name":"Newsboy Hat",
        "id":"newsboy-hat",
        "dir":"newsboy-hat",
        "img":["base","base","base","base","base","base"],
        "tags":[""],
        "main":"",
        "top":"",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"none",
        "cost":0
    }
};
/* twine-user-script #21: "clOutfits.js" */
setup.clOutfitsDefault = {
    "none":{
        "name":"None",
        "id":"none",
        "dir":"none",
        "img":"none",
        "tags":["naked"],
        "main":"none",
        "top":"",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"none",
        "cost": 0
    },
    "casual1":{
        "name":"T-Shirt & Jeans",
        "id":"casual1",
        "dir":"casual1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["casual"],
        "main":"casual",
        "top":"T-shirt",
        "bottom":"Jeans",
        "socks":"Socks",
        "shoes":"Sneakers",
        "store":"mens",
        "cost": 120
    },
    "casual2":{
        "name":"Blouse & Capris",
        "id":"casual2",
        "dir":"casual2",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["casual","girly"],
        "main":"casual",
        "top":"Blouse",
        "bottom":"Capris",
        "socks":"",
        "shoes":"Sandals",
        "store":"womens",
        "cost": 120
    },
    "formal1":{
        "name":"Shirt & Tie",
        "id":"formal1",
        "dir":"formal1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["formal","manly"],
        "main":"formal",
        "top":"Button-up shirt",
        "bottom":"Slacks",
        "socks":"Dress socks",
        "shoes":"Loafers",
        "store":"mens",
        "cost": 300
    },
    "formal2":{
        "name":"Womens Business Suit",
        "id":"formal2",
        "dir":"formal2",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["formal","girly"],
        "main":"formal",
        "top":"Dress",
        "bottom":"Dress",
        "socks":"Nylons",
        "shoes":"High heels",
        "store":"womens",
        "cost": 300
    },
    "slutty1":{
        "name":"Clubbing Outfit",
        "id":"slutty1",
        "dir":"slutty1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["slutty","manly"],
        "main":"slutty",
        "top":"Lowcut shirt",
        "bottom":"Leather pants",
        "socks":"Dress socks",
        "shoes":"Dress shoes",
        "store":"intimate",
        "cost": 600
    },
    "slutty2":{
        "name":"Provocative Dress",
        "id":"slutty2",
        "dir":"slutty2",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"Revealing dress",
        "bottom":"Revealing dress",
        "socks":"",
        "shoes":"High heels",
        "store":"intimate",
        "cost": 600
    },
    "sissy1":{
        "name":"Babydoll Dress",
        "id":"sissy1",
        "dir":"sissy1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["sissy","girly"],
        "main":"sissy",
        "top":"Babydoll dress",
        "bottom":"Babydoll dress",
        "socks":"Kneesocks",
        "shoes":"Pink slippers",
        "store":"intimate",
        "cost": 1200
    },
    "latex1":{
        "name":"Latex Dress",
        "id":"latex1",
        "dir":"latex1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["slutty","girly","latex"],
        "main":"slutty",
        "top":"Latex corset",
        "bottom":"Latex microskirt",
        "socks":"Stockings",
        "shoes":"Knee-high boots",
        "store":"intimate",
        "cost": 1600
    },
    "latex2":{
        "name":"Latex Halter Top",
        "id":"latex2",
        "dir":"latex2",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["slutty","girly","latex"],
        "main":"slutty",
        "top":"Latex haltertop",
        "bottom":"Latex microskirt",
        "socks":"Stockings",
        "shoes":"Knee-high boots",
        "store":"intimate",
        "cost": 2000
    },
    "dog1":{
        "name":"Inumimi Cosplay",
        "id":"dog1",
        "dir":"dog1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["casual","manly","cosplay","dog","animal"],
        "main":"casual",
        "top":"Torn shirt",
        "bottom":"Torn shorts",
        "socks":"",
        "shoes":"Barefoot",
        "store":"intimate",
        "cost": 10000
    },
    "cat1":{
        "name":"Nekomimi Cosplay",
        "id":"cat1",
        "dir":"cat1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["casual","girly","cosplay","cat","animal"],
        "main":"casual",
        "top":"Lolita corset",
        "bottom":"Lolita skirt",
        "socks":"Nylons",
        "shoes":"High heels",
        "store":"intimate",
        "cost": 10000
    },
    "bunny1":{
        "name":"Usagimimi Cosplay",
        "id":"bunny1",
        "dir":"bunny1",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["casual","girly","cosplay","bunny","animal"],
        "main":"casual",
        "top":"Unitard",
        "bottom":"Unitard",
        "socks":"Fishnets",
        "shoes":"High heels",
        "store":"intimate",
        "cost": 10000
    },
    "penny_outfit":{
        "name":"Floral Outfit",
        "id":"penny_outfit",
        "dir":"penny",
        "img":["base","base","medium","medium","large","massive"],
        "tags":["casual","girly","penny"],
        "main":"casual",
        "top":"Floral shirt",
        "bottom":"Miniskirt",
        "socks":"",
        "shoes":"Sneakers",
        "store":"",
        "cost":0
    }
};
/* twine-user-script #22: "clUnderwear.js" */
setup.clUnderwearDefault = {
    "none":{
        "name":"None",
        "id":"none",
        "dir":"none",
        "img":["none","none","none","none","none","none"],
        "tags":["naked","slutty"],
        "main":"naked",
        "top":"",
        "bottom":"",
        "socks":"",
        "shoes":"",
        "store":"none",
        "cost": 0
    },
    "briefs1":{
        "name":"Beige Briefs",
        "id":"briefs1",
        "dir":"un_briefs1",
        "img":["base","base","base","bulge","bulge","bulge"],
        "tags":["casual","manly"],
        "main":"casual",
        "top":"",
        "bottom":"briefs",
        "socks":"",
        "shoes":"",
        "store":"mens",
        "cost": 30
    },
    "briefs2":{
        "name":"Red Briefs",
        "id":"briefs2",
        "dir":"un_briefs2",
        "img":["base","base","base","bulge","bulge","bulge"],
        "tags":["casual","manly"],
        "main":"casual",
        "top":"",
        "bottom":"briefs",
        "socks":"",
        "shoes":"",
        "store":"mens",
        "cost": 40
    },
    "boxers1":{
        "name":"Blue Boxers",
        "id":"boxers1",
        "dir":"un_boxers1",
        "img":["base","base","base","base","base","base"],
        "tags":["casual","manly"],
        "main":"casual",
        "top":"",
        "bottom":"blue boxers",
        "socks":"",
        "shoes":"",
        "store":"mens",
        "cost": 40
    },
    "boxers2":{
        "name":"Heart Boxers",
        "id":"boxers2",
        "dir":"un_boxers2",
        "img":["base","base","base","base","base","base"],
        "tags":["casual","manly"],
        "main":"casual",
        "top":"",
        "bottom":"heart boxers",
        "socks":"",
        "shoes":"",
        "store":"mens",
        "cost": 80
    },
    "cotton1":{
        "name":"White Cotton Panties",
        "id":"cotton1",
        "dir":"un_cotton1",
        "img":["base","base","bulge","bulge","bulge","bulge"],
        "tags":["casual","girly"],
        "main":"casual",
        "top":"cotton bra",
        "bottom":"cotton panties",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 30
    },
    "cotton2":{
        "name":"Grey Cotton Panties",
        "id":"cotton2",
        "dir":"un_cotton2",
        "img":["base","base","bulge","bulge","bulge","bulge"],
        "tags":["casual","girly"],
        "main":"casual",
        "top":"cotton bra",
        "bottom":"cotton panties",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 30
    },
    "silk1":{
        "name":"Red Silk Panties",
        "id":"silk1",
        "dir":"un_silk1",
        "img":["base","base","bulge","bulge","bulge","bulge"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"silk bra",
        "bottom":"silk panties",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 50
    },
    "silk2":{
        "name":"Black Silk Panties",
        "id":"silk2",
        "dir":"un_silk2",
        "img":["base","base","bulge","bulge","bulge","bulge"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"silk bra",
        "bottom":"silk panties",
        "socks":"",
        "shoes":"",
        "store":"womens",
        "cost": 60
    },
    "sisters-panties":{
        "name":"Sisters Panties",
        "id":"sisters-panties",
        "dir":"un_sister",
        "img":["base","base","bulge","bulge","bulge","bulge"],
        "tags":["slutty","girly"],
        "main":"slutty",
        "top":"silk bra",
        "bottom":"silk panties",
        "socks":"",
        "shoes":"",
        "store":"",
        "cost":0
    }
};
/* twine-user-script #23: "imgActions.js" */
setup.imgActionsDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "anal-creampie-female":["pics/action/anal-creampie-female.mp4"],
    "anal-dildo":["pics/action/anal-dildo.mp4"],
    "anal-fingering":["pics/action/anal-fingering.mp4"],
    "anal-squirt":["pics/action/anal-squirt.mp4"],
    "chastity-cum":["pics/action/chastity-cum.mp4"],
    "chastity-ride-ts":["pics/action/chastity-ride-ts.mp4"],
    "chastity-squirt":["pics/action/chastity-squirt.mp4"],
    "creampie-female":["pics/action/creampie-female.mp4"],
    "creampie-ts":["pics/action/creampie-ts.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back-female":["pics/action/cum-on-back-female.mp4"],
    "cum-on-back-male":["pics/action/cum-on-back-male.mp4"],
    "female-69-female":["pics/action/female-69-female.mp4"],
    "female-69-male":["pics/action/female-69-male.mp4"],
    "female-69-ts":["pics/action/female-69-ts.mp4"],
    "female-assfuck-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "female-creampie":["pics/action/female-creampie.mp4"],
    "female-dildo-anal":["pics/action/female-dildo-anal.mp4"],
    "female-dildo-female":["pics/action/female-dildo-female.mp4"],
    "female-dildo-female-ass":["pics/action/female-dildo-female-ass.mp4"],
    "female-dp":["pics/action/female-dp.mp4"],
    "female-eat-ass":["pics/action/female-eat-ass.mp4"],
    "female-eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "female-face-dildo-ride":["pics/action/female-face-dildo-ride.mp4"],
    "female-facesit-female":["pics/action/female-facesit-female.mp4"],
    "female-facesit-male":["pics/action/female-facesit-male.mp4"],
    "female-facesit-ts":["pics/action/female-facesit-ts.mp4"],
    "female-force-female-blowjob":["pics/action/female-force-female-blowjob.mp4"],
    "female-fuck-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "female-fuck-female":["pics/action/female-fuck-female.mp4"],
    "female-fuck-male":["pics/action/female-fuck-male.mp4"],
    "female-fuck-shemale":["pics/action/female-fuck-shemale.mp4"],
    "female-fuck-strapon":["pics/action/female-fuck-strapon.mp4"],
    "female-fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "female-gangbang":["pics/action/female-gangbang.mp4"],
    "female-handjob-male":["pics/action/female-handjob-male.mp4"],
    "female-handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "female-hotdog-finish":["pics/action/female-hotdog-finish.mp4"],
    "female-kiss-female":["pics/action/female-kiss-female.mp4"],
    "female-kiss-male":["pics/action/female-kiss-male.mp4"],
    "female-kiss-ts":["pics/action/female-kiss-ts.mp4"],
    "female-oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "female-ride-female":["pics/action/female-ride-female.mp4"],
    "female-ride-male":["pics/action/female-ride-male.mp4"],
    "female-ride-strapon":["pics/action/female-ride-strapon.mp4"],
    "female-ride-ts":["pics/action/female-ride-ts.mp4"],
    "female-rim-female":["pics/action/female-rim-female.mp4"],
    "female-rim-male":["pics/action/female-rim-male.mp4"],
    "female-rim-ts":["pics/action/female-rim-ts.mp4"],
    "female-solo-sybian-close":["pics/action/female-solo-sybian-close.mp4"],
    "female-solo-sybian-cum":["pics/action/female-solo-sybian-cum.mp4"],
    "female-solo-sybian":["pics/action/female-solo-sybian.mp4"],
    "female-solo":["pics/action/female-solo.mp4"],
    "female-spitroast-fm":["pics/action/female-spitroast-fm.mp4"],
    "female-spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "female-spread-ass":["pics/action/female-spread-ass.jpg"],
    "female-squirt":["pics/action/female-squirt.mp4"],
    "female-suck-chastity":["pics/action/female-suck-chastity.mp4"],
    "female-suck-cock":["pics/action/female-suck-cock.mp4"],
    "female-suck-female":["pics/action/female-suck-female.mp4"],
    "female-suck-male":["pics/action/female-suck-male.mp4"],
    "female-suck-sissy":["pics/action/female-suck-sissy.mp4"],
    "female-suck-strapon":["pics/action/female-suck-strapon.mp4"],
    "female-suck-ts":["pics/action/female-suck-ts.mp4"],
    "female-titfuck":["pics/action/female-titfuck.mp4"],
    "fingering-ass-rape":["pics/action/fingering-ass-rape.mp4"],
    "fingering-ass":["pics/action/fingering-ass.mp4"],
    "fingering":["pics/action/fingering.mp4"],
    "grope-rape":["pics/action/grope-rape.mp4"],
    "grope":["pics/action/grope.mp4"],
    "huge-cock-blowjob":["pics/action/huge-cock-blowjob.mp4"],
    "imgAction":["pics/action/imgActions.js"],
    "machine-fuck-male":["pics/action/machine-fuck-male.mp4"],
    "machine-fuck-ts":["pics/action/machine-fuck-ts.mp4"],
    "male-assfuck-female-doggy":["pics/action/male-assfuck-female-doggy.mp4"],
    "male-creampie":["pics/action/male-creampie.mp4"],
    "male-eat-pussy":["pics/action/male-eat-pussy.mp4"],
    "male-face-dildo-ride":["pics/action/male-face-dildo-ride.mp4"],
    "male-facesit-male":["pics/action/male-facesit-male.mp4"],
    "male-fuck-female-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "male-fuck-female":["pics/action/male-fuck-female.mp4"],
    "male-fuck-male":["pics/action/male-fuck-male.mp4"],
    "male-fuck-ts":["pics/action/male-fuck-ts.mp4"],
    "male-handjob-male":["pics/action/male-handjob-male.mp4"],
    "male-handjob-ts":["pics/action/male-handjob-ts.mp4"],
    "male-kiss-female":["pics/action/male-kiss-female.mp4"],
    "male-kiss-male":["pics/action/male-kiss-male.mp4"],
    "male-kiss-ts":["pics/action/male-kiss-ts.mp4"],
    "male-oral-creampie":["pics/action/male-oral-creampie.mp4"],
    "male-ride-female":["pics/action/male-ride-female.mp4"],
    "male-ride-male":["pics/action/male-ride-male.mp4"],
    "male-ride-ts":["pics/action/male-ride-ts.mp4"],
    "male-rim-female":["pics/action/male-rim-female.mp4"],
    "male-rim-male":["pics/action/male-rim-male.mp4"],
    "male-rim-ts":["pics/action/male-rim-ts.mp4"],
    "male-spitroast-ff":["pics/action/male-spitroast-ff.mp4"],
    "male-spitroast-mm":["pics/action/male-spitroast-mm.mp4"],
    "male-spitroast-tt":["pics/action/male-spitroast-tt.mp4"],
    "male-suck-male":["pics/action/male-suck-male.mp4"],
    "male-suck-strapon":["pics/action/male-suck-strapon.mp4"],
    "male-suck-female":["pics/action/male-suck-strapon.mp4"],
    "male-suck-ts":["pics/action/male-suck-ts.mp4"],
    "male-strapon-fuck-female":["pics/action/male-strapon-fuck-female.mp4"],
    "oral-creampie":["pics/action/oral-creampie.mp4"],
    "sissy-gangbang":["pics/action/sissy-gangbang.mp4"],
    "sissy-ride-ts":["pics/action/sissy-ride-ts.mp4"],
    "sissy-squirt":["pics/action/sissy-squirt.mp4"],
    "sissy-strapon-gangbang":["pics/action/sissy-strapon-gangbang.mp4"],
    "sissygasm":["pics/action/sissygasm.mp4"],
    "squirt-in-mouth":["pics/action/squirt-in-mouth.mp4"],
    "standing-doggy-strapon":["pics/action/standing-doggy-strapon.mp4"],
    "standing-doggy":["pics/action/standing-doggy.mp4"],
    "strapon-deepthroat":["pics/action/strapon-deepthroat.mp4"],
    "strapon-solo":["pics/action/strapon-solo.mp4"],
    "strapon-reacharound":["pics/action/strapon-reacharound.mp4"],
    "tribbing":["pics/action/tribbing.mp4"],
    "ts-assfuck-female-doggy":["pics/action/ts-assfuck-female-doggy.mp4"],
    "ts-cock-hanging":["pics/action/ts-cock-hanging.mp4"],
    "ts-creampie":["pics/action/ts-creampie.mp4"],
    "ts-eat-pussy":["pics/action/ts-eat-pussy.mp4"],
    "ts-face-dildo-ride":["pics/action/ts-face-dildo-ride.mp4"],
    "ts-facesit-male":["pics/action/ts-facesit-male.mp4"],
    "ts-fuck-female-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ts-fuck-female":["pics/action/ts-fuck-female.mp4"],
    "ts-fuck-male":["pics/action/ts-fuck-male.mp4"],
    "ts-fuck-ts":["pics/action/ts-fuck-ts.mp4"],
    "ts-kiss-female":["pics/action/ts-kiss-female.mp4"],
    "ts-kiss-male":["pics/action/ts-kiss-male.mp4"],
    "ts-kiss-ts":["pics/action/ts-kiss-ts.mp4"],
    "ts-oral-creampie":["pics/action/ts-oral-creampie.mp4"],
    "ts-piss":["pics/action/ts-piss.mp4"],
    "ts-ride-female":["pics/action/ts-ride-female.mp4"],
    "ts-ride-male":["pics/action/ts-ride-male.mp4"],
    "ts-ride-ts":["pics/action/ts-ride-ts.mp4"],
    "ts-solo-cum":["pics/action/ts-solo-cum.mp4"],
    "ts-solo":["pics/action/ts-solo.mp4"],
    "ts-spitroast-mm":["pics/action/ts-spitroast-mm.mp4"],
    "ts-spread-ass":["pics/action/ts-spread-ass.jpg"],
    "ts-squirt":["pics/action/ts-squirt.mp4"],
    "ts-suck-male":["pics/action/ts-suck-male.mp4"],
    "ts-suck-strapon":["pics/action/ts-suck-strapon.mp4"],
    "ts-suck-ts":["pics/action/ts-suck-ts.mp4"]
};
/* twine-user-script #24: "imgAva.js" */
setup.imgAvaDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/mom/outfits/default.jpg","pics/mom/outfits/default-2.jpg","pics/mom/outfits/default-3.jpg"],
    "default-pro":["pics/mom/outfits/default-pro.jpg"],
    "default-note":["pics/mom/notes/default-note.jpg"],
    "ava-whiteTop":["pics/mom/outfits/whiteTop.jpg","pics/mom/outfits/whiteTop-2.jpg","pics/mom/outfits/whiteTop-3.jpg"],
    "ava-whiteTop-pro":["pics/mom/outfits/whiteTop-pro.jpg"],
    "ava-whiteTop-note":["pics/mom/notes/whiteTop-note.jpg"],
    "ava-greenTop":["pics/mom/outfits/greenTop.jpg","pics/mom/outfits/greenTop-2.jpg","pics/mom/outfits/greenTop-3.jpg"],
    "ava-greenTop-pro":["pics/mom/outfits/greenTop-pro.jpg"],
    "ava-greenTop-note":["pics/mom/notes/greenTop-note.jpg"],
    "ava-corset":["pics/mom/outfits/corset.jpg","pics/mom/outfits/corset-2.jpg","pics/mom/outfits/corset-3.jpg"],
    "ava-corset-pro":["pics/mom/outfits/corset-pro.jpg"],
    "ava-corset-note":["pics/mom/notes/corset-note.jpg"],
    "ava-leather":["pics/mom/outfits/leather.jpg","pics/mom/outfits/leather-2.jpg","pics/mom/outfits/leather-3.jpg"],
    "ava-leather-pro":["pics/mom/outfits/leather-pro.jpg"],
    "ava-leather-note":["pics/mom/notes/leather-note.jpg"],
    "ava-maid":["pics/mom/outfits/maid.jpg","pics/mom/outfits/maid-2.jpg","pics/mom/outfits/maid-3.jpg"],
    "ava-maid-pro":["pics/mom/outfits/maid-pro.jpg"],
    "ava-maid-note":["pics/mom/notes/maid-note.jpg"],
    "ava-office":["pics/mom/outfits/office.jpg","pics/mom/outfits/office-2.jpg","pics/mom/outfits/office-3.jpg"],
    "ava-office-pro":["pics/mom/outfits/office-pro.jpg"],
    "ava-office-note":["pics/mom/notes/office-note.jpg"],
    "ava-outdoorsy":["pics/mom/outfits/outdoorsy.jpg","pics/mom/outfits/outdoorsy-2.jpg","pics/mom/outfits/outdoorsy-3.jpg"],
    "ava-outdoorsy-pro":["pics/mom/outfits/outdoorsy-pro.jpg"],
    "ava-outdoorsy-note":["pics/mom/notes/outdoorsy-note.jpg"],
    "ava-polkadots":["pics/mom/outfits/polkadots.jpg","pics/mom/outfits/polkadots-2.jpg","pics/mom/outfits/polkadots-3.jpg"],
    "ava-polkadots-pro":["pics/mom/outfits/polkadots-pro.jpg"],
    "ava-polkadots-note":["pics/mom/notes/polkadots-note.jpg"],
    "ava-nekkid":["pics/mom/outfits/nekkid.jpg","pics/mom/outfits/nekkid-2.jpg","pics/mom/outfits/nekkid-3.jpg"],
    "ava-nekkid-pro":["pics/mom/outfits/nekkid-pro.jpg"],
    "ava-nekkid-note":["pics/mom/notes/nekkid-note.jpg"],
    "ava-lingerie":["pics/mom/outfits/lingerie.jpg","pics/mom/outfits/lingerie-2.jpg","pics/mom/outfits/lingerie-3.jpg"],
    "ava-lingerie-pro":["pics/mom/outfits/lingerie-pro.jpg"],
    "ava-lingerie-note":["pics/mom/notes/lingerie-note.jpg"],
    "bed":["pics/mom/bed.jpg"],
    "bed-lingerie":["pics/mom/bed-lingerie.jpg"],
    "bed-naked":["pics/mom/bed-naked.jpg"],
    "lingerie-show":["pics/mom/lingerie-show.jpg"],
    "lingerie-show-2":["pics/mom/lingerie-show-2.jpg"],
    "lingerie-show-3":["pics/mom/lingerie-show-3.jpg"],
    "couch-naked":["pics/mom/couch-naked.jpg"],
    "couch-naked-2":["pics/mom/couch-naked-2.jpg"],
    "cum-covered":["pics/mom/cum-covered.jpg"],
    "cum-covered-happy":["pics/mom/cum-covered-happy.jpg"],
    "pussy-kitchen":["pics/mom/pussy-kitchen.jpg"],
    "kitchen-spread":["pics/mom/kitchen-spread.jpg"],
    "behind":["pics/mom/behind.jpg"],
    "couch":["pics/mom/couch.jpg"],
    "couch2":["pics/mom/couch2.jpg"],
    "robe":["pics/mom/robe.jpg","pics/mom/robe-2.jpg"],
    "robe-full":["pics/mom/robe-full.jpg"],
    "door":["pics/mom/door.jpg"],
    "dress":["pics/mom/dress.jpg"],
    "office":["pics/mom/office.jpg"],
    "officer":["pics/mom/officer.jpg"],
    "group":["pics/mom/group1.mp4"],
    "officebang1":["pics/mom/officebang1.mp4"],
    "officebang2":["pics/mom/officebang2.mp4"],
    "officebang3":["pics/mom/officebang3.mp4"],
    "trainingroom1":["pics/mom/trainingroom1.mp4"],
    "trainingroom2":["pics/mom/trainingroom2.mp4"],
    "trainingroom3":["pics/mom/trainingroom3.mp4"],
    "pit":["pics/mom/pit1.mp4","pics/mom/pit2.mp4","pics/mom/pit3.mp4"],
    "shower":["pics/mom/shower1.mp4","pics/mom/shower2.mp4","pics/mom/shower3.mp4"],
    "solo1":["pics/mom/solo1.mp4"],
    "solo2":["pics/mom/solo2.mp4"],
    "solo3":["pics/mom/solo3.mp4"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/mom/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/mom/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/mom/cowgirl.mp4"],
    "ride-female":["pics/mom/cowgirl.mp4"],
    "ride-ts":["pics/mom/cowgirl.mp4"],
    "fucked-by-male":["pics/action/male-fuck-female.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-female.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/mom/kiss-male.mp4"],
    "kiss-female":["pics/mom/kiss-female.mp4"],
    "kiss-ts":["pics/mom/kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/mom/cum-on-face.mp4"],
    "cum-in-mouth":["pics/mom/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/mom/cum-on-chest.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/mom/orgasm.mp4"]
};
/* twine-user-script #25: "imgChanel.js" */
setup.imgChanelDefault = {
    "version":14,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/john/female/outfits/default.jpg","pics/john/female/outfits/default-2.jpg","pics/john/female/outfits/default-3.jpg"],
    "default-pro":["pics/john/female/outfits/default-pro.jpg"],
    "default-note":["pics/john/female/notes/default-note.jpg"],
    "john-flowers":["pics/john/female/outfits/flowers.jpg","pics/john/female/outfits/flowers-2.jpg","pics/john/female/outfits/flowers-3.jpg"],
    "john-flowers-pro":["pics/john/female/outfits/flowers-pro.jpg"],
    "john-flowers-note":["pics/john/female/notes/flowers-note.jpg"],
    "john-glasses":["pics/john/female/outfits/glasses.jpg","pics/john/female/outfits/glasses-2.jpg","pics/john/female/outfits/glasses-3.jpg"],
    "john-glasses-pro":["pics/john/female/outfits/glasses-pro.jpg"],
    "john-glasses-note":["pics/john/female/notes/glasses-note.jpg"],
    "john-buttonTop":["pics/john/female/outfits/buttonTop.jpg","pics/john/female/outfits/buttonTop-2.jpg","pics/john/female/outfits/buttonTop-3.jpg"],
    "john-buttonTop-pro":["pics/john/female/outfits/buttonTop-pro.jpg"],
    "john-buttonTop-note":["pics/john/female/notes/buttonTop-note.jpg"],
    "john-dress":["pics/john/female/outfits/dress.jpg","pics/john/female/outfits/dress-2.jpg","pics/john/female/outfits/dress-3.jpg"],
    "john-dress-pro":["pics/john/female/outfits/dress-pro.jpg"],
    "john-dress-note":["pics/john/female/notes/dress-note.jpg"],
    "john-sportsBra":["pics/john/female/outfits/sportsBra.jpg","pics/john/female/outfits/sportsBra-2.jpg","pics/john/female/outfits/sportsBra-3.jpg"],
    "john-sportsBra-pro":["pics/john/female/outfits/sportsBra-pro.jpg"],
    "john-sportsBra-note":["pics/john/female/notes/sportsBra-note.jpg"],
    "john-laceSuit":["pics/john/female/outfits/laceSuit.jpg","pics/john/female/outfits/laceSuit-2.jpg","pics/john/female/outfits/laceSuit-3.jpg"],
    "john-laceSuit-pro":["pics/john/female/outfits/laceSuit-pro.jpg"],
    "john-laceSuit-note":["pics/john/female/notes/laceSuit-note.jpg"],
    "john-officeLingerie":["pics/john/female/outfits/officeLingerie.jpg","pics/john/female/outfits/officeLingerie-2.jpg","pics/john/female/outfits/officeLingerie-3.jpg"],
    "john-officeLingerie-pro":["pics/john/female/outfits/officeLingerie-pro.jpg"],
    "john-officeLingerie-note":["pics/john/female/notes/officeLingerie-note.jpg"],
    "john-latexMaid":["pics/john/female/outfits/latexMaid.jpg","pics/john/female/outfits/latexMaid-2.jpg","pics/john/female/outfits/latexMaid-3.jpg"],
    "john-latexMaid-pro":["pics/john/female/outfits/latexMaid-pro.jpg"],
    "john-latexMaid-note":["pics/john/female/notes/latexMaid-note.jpg"],
    "john-nekkid":["pics/john/female/outfits/nekkid.jpg","pics/john/female/outfits/nekkid-2.jpg","pics/john/female/outfits/nekkid-3.jpg"],
    "john-nekkid-pro":["pics/john/female/outfits/nekkid-pro.jpg"],
    "john-nekkid-note":["pics/john/female/notes/nekkid-note.jpg"],
    "casual":["pics/john/female/casual.jpg"],
    "newgirl-1":["pics/john/female/newgirl-1.jpg"],
    "newgirl-2":["pics/john/female/newgirl-2.jpg"],
    "beg":["pics/john/female/beg.jpg"],
    "dosed":["pics/john/female/dosed.jpg"],
    "spread":["pics/john/female/spread.jpg"],
    "flash":["pics/john/female/flash.jpg"],
    "flirty":["pics/john/female/flirty.jpg"],
    "on-phone":["pics/john/female/on-phone.jpg"],
    "spread":["pics/john/female/spread.jpg"],
    "pussy":["pics/john/female/pussy.jpg"],
    "strapon":["pics/john/female/strapon.jpg"],
    "strapon-solo":["pics/action/strapon-solo.mp4"],
    "strip1":["pics/john/female/strip1.jpg"],
    "strip2":["pics/john/female/strip2.jpg"],
    "topless":["pics/john/female/topless.jpg"],
    "suck-male":["pics/john/female/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-strapon.mp4"],
    "suck-ts":["pics/john/female/blowjob.mp4"],
    "deepthroat-male":["pics/john/female/blowjob.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/john/female/blowjob.mp4"],
    "eat-pussy":["pics/john/female/eat-pussy.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "female-69":["pics/action/female-69-female.mp4"],
    "male-69":["pics/action/female-69-male.mp4"],
    "ts-69":["pics/action/female-69-ts.mp4"],
    "trib":["pics/action/tribbing.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "cum-in-mouth":["pics/john/female/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/john/female/cum-on-chest.mp4"],
    "cum-on-face":["pics/john/female/cum-on-face.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "fucked-by-male":["pics/john/female/get-fucked.mp4"],
    "fucked-by-female":["pics/john/female/get-fucked.mp4"],
    "fucked-by-ts":["pics/john/female/get-fucked.mp4"],
    "ff-dp":["pics/action/female-dp.mp4"],
    "ass-fucked-by-male":["pics/john/female/get-fucked.mp4"],
    "ass-fucked-by-female":["pics/john/female/get-fucked.mp4"],
    "ass-fucked-by-ts":["pics/john/female/get-fucked.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/john/female/fucking.mp4"],
    "fuck-female":["pics/john/female/fucking.mp4"],
    "fuck-female-strapon":["pics/john/female/fucking.mp4"],
    "fuck-ts":["pics/john/female/fucking.mp4"],
    "ride-male":["pics/action/female-ride-male.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/action/female-ride-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-ts.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "riding":["pics/john/female/fucking.mp4"],
    "gangbang-bbc":["pics/john/female/gangbang-bbc.mp4"],
    "blowbang":["pics/john/female/blowbang.mp4"],
    "blowjob-double":["pics/john/female/blowjob-double.mp4"],
    "mmf":["pics/john/female/mmf.mp4"],
    "dp":["pics/john/female/dp.mp4"],
    "blowjob-double-finish":["pics/john/female/blowjob-double-finish.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "orgasm":["pics/john/female/orgasm.mp4"]
};
/* twine-user-script #26: "imgDakota.js" */
setup.imgDakotaDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/sister/outfits/default.jpg","pics/sister/outfits/default-2.jpg","pics/sister/outfits/default-3.jpg"],
    "default-pro":["pics/sister/outfits/default-pro.jpg"],
    "default-note":["pics/sister/notes/default-note.jpg"],
    "dakota-sporty":["pics/sister/outfits/sporty.jpg","pics/sister/outfits/sporty-2.jpg","pics/sister/outfits/sporty-3.jpg"],
    "dakota-sporty-pro":["pics/sister/outfits/sporty-pro.jpg"],
    "dakota-sporty-note":["pics/sister/notes/sporty-note.jpg"],
    "dakota-dress":["pics/sister/outfits/dress.jpg","pics/sister/outfits/dress-2.jpg","pics/sister/outfits/dress-3.jpg"],
    "dakota-dress-pro":["pics/sister/outfits/dress-pro.jpg"],
    "dakota-dress-note":["pics/sister/notes/dress-note.jpg"],
    "dakota-stripes":["pics/sister/outfits/stripes.jpg","pics/sister/outfits/stripes-2.jpg","pics/sister/outfits/stripes-3.jpg"],
    "dakota-stripes-pro":["pics/sister/outfits/stripes-pro.jpg"],
    "dakota-stripes-note":["pics/sister/notes/stripes-note.jpg"],
    "dakota-red":["pics/sister/outfits/red.jpg","pics/sister/outfits/red-2.jpg","pics/sister/outfits/red-3.jpg"],
    "dakota-red-pro":["pics/sister/outfits/red-pro.jpg"],
    "dakota-red-note":["pics/sister/notes/red-note.jpg"],
    "dakota-corset":["pics/sister/outfits/corset.jpg","pics/sister/outfits/corset-2.jpg","pics/sister/outfits/corset-3.jpg"],
    "dakota-corset-pro":["pics/sister/outfits/corset-pro.jpg"],
    "dakota-corset-note":["pics/sister/notes/corset-note.jpg"],
    "dakota-gift":["pics/sister/outfits/gift.jpg","pics/sister/outfits/gift-2.jpg","pics/sister/outfits/gift-3.jpg"],
    "dakota-gift-pro":["pics/sister/outfits/gift-pro.jpg"],
    "dakota-gift-note":["pics/sister/notes/gift-note.jpg"],
    "dakota-tie":["pics/sister/outfits/tie.jpg","pics/sister/outfits/tie-2.jpg","pics/sister/outfits/tie-3.jpg"],
    "dakota-tie-pro":["pics/sister/outfits/tie-pro.jpg"],
    "dakota-tie-note":["pics/sister/notes/tie-note.jpg"],
    "dakota-pet":["pics/sister/outfits/pet.jpg","pics/sister/outfits/pet-2.jpg","pics/sister/outfits/pet-3.jpg"],
    "dakota-pet-pro":["pics/sister/outfits/pet-pro.jpg"],
    "dakota-pet-note":["pics/sister/notes/pet-note.jpg"],
    "dakota-porn":["pics/sister/outfits/porn.jpg","pics/sister/outfits/porn-2.jpg","pics/sister/outfits/porn-3.jpg"],
    "dakota-porn-pro":["pics/sister/outfits/porn-pro.jpg"],
    "dakota-porn-note":["pics/sister/notes/porn-note.jpg"],
    "dakota-nekkid":["pics/sister/outfits/nekkid.jpg","pics/sister/outfits/nekkid-2.jpg","pics/sister/outfits/nekkid-3.jpg"],
    "dakota-nekkid-pro":["pics/sister/outfits/nekkid-pro.jpg"],
    "dakota-nekkid-note":["pics/sister/notes/nekkid-note.jpg"],
    "bed":["pics/sister/bed.jpg"],
    "bed-strip":["pics/sister/bed-strip.jpg"],
    "bed-naked":["pics/sister/bed-naked.jpg"],
    "naked":["pics/sister/naked3.jpg"],
    "changing1":["pics/sister/changing1.jpg"],
    "changing2":["pics/sister/changing2.jpg"],
    "door":["pics/sister/door.jpg"],
    "topless":["pics/sister/topless.jpg"],
    "spread":["pics/sister/spread.jpg"],
    "bendover":["pics/sister/bendover.jpg"],
    "strip":["pics/sister/strip.jpg"],
    "strapon":["pics/sister/strapon.jpg"],
    "dog1":["pics/sister/dog1.mp4"],
    "dog2":["pics/sister/dog2.mp4"],
    "dog3":["pics/sister/dog3.mp4"],
    "dog4":["pics/sister/dog4.mp4"],
    "gang1":["pics/sister/gang1.mp4"],
    "gang2":["pics/sister/gang2.mp4"],
    "gang3":["pics/sister/gang3.mp4"],
    "gang4":["pics/sister/gang4.mp4"],
    "mom-daughter-couch1":["pics/sister/mom-daughter-couch1.mp4"],
    "mom-daughter-couch2a":["pics/sister/mom-daughter-couch2a.mp4"],
    "mom-daughter-couch2b":["pics/sister/mom-daughter-couch2b.mp4"],
    "mom-daughter-couch2c":["pics/sister/mom-daughter-couch2c.mp4"],
    "mom-daughter-couch3":["pics/sister/mom-daughter-couch3.mp4"],
    "double-dildo-mf":["pics/sister/double-dildo-mf.mp4"],
    "rub-pussy":["pics/sister/rub-pussy.mp4","pics/sister/rub-pussy2.mp4"],
    "oral-ff1":["pics/sister/oralff1.mp4"],
    "oral-ff2":["pics/sister/oralff2.mp4"],
    "oral-mf1":["pics/sister/oralmf1.mp4"],
    "oral-mf2":["pics/sister/oralmf2.mp4"],
    "sex-ff1":["pics/sister/sexff1.mp4"],
    "sex-ff2":["pics/sister/sexff2.mp4"],
    "sex-ff3":["pics/sister/sexff3.mp4"],
    "sex-ff4":["pics/sister/sexff4.mp4"],
    "couchoral-mf1":["pics/sister/couchoralmf1.mp4"],
    "couchoral-mf2":["pics/sister/couchoralmf2.mp4"],
    "couchoral-mf3":["pics/sister/couchoralmf3.mp4"],
    "couchoral-ff1":["pics/sister/couchoralff1.mp4"],
    "couchoral-ff2":["pics/sister/couchoralff2.mp4"],
    "pit":["pics/sister/pit1.mp4","pics/sister/pit2.mp4","pics/sister/pit3.mp4"],
    "shower":["pics/sister/shower1.mp4","pics/sister/shower2.mp4","pics/sister/shower3.mp4"],
    "solo1":["pics/sister/solo1.mp4"],
    "solo2":["pics/sister/solo2.mp4"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/sister/eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/sister/blowjob.mp4","pics/sister/blowjob2.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/sister/blowjob.mp4"],
    "suck-chastity":["pics/sister/suck-chastity.mp4"],
    "handjob-male":["pics/sister/handjob.mp4"],
    "handjob-ts":["pics/sister/handjob.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/sister/sucked-by-female.mp4"],
    "sucked-by-ts":["pics/sister/sucked-by-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/sister/eaten-by-female.mp4"],
    "eaten-by-ts":["pics/sister/eaten-by-female.mp4"],
    "69-female":["pics/sister/69-female.mp4"],
    "69-ts":["pics/sister/69-female.mp4"],
    "facesit-female":["pics/sister/facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/sister/facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/sister/ride-male.mp4","pics/sister/ride-male2.mp4","pics/sister/ride-male3.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/action/female-ride-ts.mp4"],
    "fucked-by-male":["pics/sister/fucking.mp4","pics/sister/fucked-by-male.mp4"],
    "fucked-by-female":["pics/sister/fucked-by-female.mp4"],
    "fucked-by-ts":["pics/sister/fucking.mp4"],
    "ass-fucked-by-male":["pics/sister/anal.mp4","pics/sister/fucking-ass.mp4"],
    "ass-fucked-by-female":["pics/sister/fucked-by-female.mp4"],
    "ass-fucked-by-ts":["pics/sister/anal.mp4","pics/sister/fucking-ass.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4","pics/sister/fucked-by-male-doggy.mp4"],
    "fucked-by-female-doggy":["pics/sister/fucked-by-female.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/sister/fucked-by-female.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/sister/pegging.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-ts":["pics/sister/pegging.mp4"],
    "kiss-male":["pics/sister/kiss-male.mp4"],
    "kiss-female":["pics/sister/kiss-female.mp4"],
    "kiss-ts":["pics/sister/kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "handjob-finish":["pics/sister/handjob-finish.mp4","pics/sister/handjob-finish2.mp4"],
    "cum-on-face":["pics/sister/cum-on-face.mp4"],
    "cum-in-mouth":["pics/sister/cum-in-mouth.mp4","pics/sister/cum-in-mouth2.mp4"],
    "cum-on-chest":["pics/sister/cum-on-chest.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/sister/orgasm.mp4"]
};
/* twine-user-script #27: "imgDiana.js" */
setup.imgDianaDefault = {
    "version":14,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/diana/outfits/default.jpg","pics/diana/outfits/default-2.jpg","pics/diana/outfits/default-3.jpg"],
    "default-pro":["pics/diana/outfits/default-pro.jpg"],
    "default-note":["pics/diana/notes/default-note.jpg"],
    "diana-dress":["pics/diana/outfits/dress.jpg","pics/diana/outfits/dress-2.jpg","pics/diana/outfits/dress-3.jpg"],
    "diana-dress-pro":["pics/diana/outfits/dress-pro.jpg"],
    "diana-dress-note":["pics/diana/notes/dress-note.jpg"],
    "diana-tied":["pics/diana/outfits/tied.jpg","pics/diana/outfits/tied-2.jpg","pics/diana/outfits/tied-3.jpg"],
    "diana-tied-pro":["pics/diana/outfits/tied-pro.jpg"],
    "diana-tied-note":["pics/diana/notes/tied-note.jpg"],
    "diana-leopard":["pics/diana/outfits/leopard.jpg","pics/diana/outfits/leopard-2.jpg","pics/diana/outfits/leopard-3.jpg"],
    "diana-leopard-pro":["pics/diana/outfits/leopard-pro.jpg"],
    "diana-leopard-note":["pics/diana/notes/leopard-note.jpg"],
    "diana-fancy":["pics/diana/outfits/fancy.jpg","pics/diana/outfits/fancy-2.jpg","pics/diana/outfits/fancy-3.jpg"],
    "diana-fancy-pro":["pics/diana/outfits/fancy-pro.jpg"],
    "diana-fancy-note":["pics/diana/notes/fancy-note.jpg"],
    "diana-bikini":["pics/diana/outfits/bikini.jpg","pics/diana/outfits/bikini-2.jpg","pics/diana/outfits/bikini-3.jpg"],
    "diana-bikini-pro":["pics/diana/outfits/bikini-pro.jpg"],
    "diana-bikini-note":["pics/diana/notes/bikini-note.jpg"],
    "diana-sexyLeopard":["pics/diana/outfits/sexyLeopard.jpg","pics/diana/outfits/sexyLeopard-2.jpg","pics/diana/outfits/sexyLeopard-3.jpg"],
    "diana-sexyLeopard-pro":["pics/diana/outfits/sexyLeopard-pro.jpg"],
    "diana-sexyLeopard-note":["pics/diana/notes/sexyLeopard-note.jpg"],
    "diana-lowcut":["pics/diana/outfits/lowcut.jpg","pics/diana/outfits/lowcut-2.jpg","pics/diana/outfits/lowcut-3.jpg"],
    "diana-lowcut-pro":["pics/diana/outfits/lowcut-pro.jpg"],
    "diana-lowcut-note":["pics/diana/notes/lowcut-note.jpg"],
    "diana-nekkid":["pics/diana/outfits/nekkid.jpg","pics/diana/outfits/nekkid-2.jpg","pics/diana/outfits/nekkid-3.jpg"],
    "diana-nekkid-pro":["pics/diana/outfits/nekkid-pro.jpg"],
    "diana-nekkid-note":["pics/diana/notes/nekkid-note.jpg"],
    "facesit-female":["pics/diana/facesit-female.jpg"],
    "flirt":["pics/diana/flirt.jpg","pics/diana/bimbo.jpg"],
    "bed":["pics/diana/bed.jpg"],
    "outside":["pics/diana/outside.jpg"],
    "panties":["pics/diana/panties.jpg"],
    "pussy":["pics/diana/pussy.jpg"],
    "spread":["pics/diana/spread.jpg"],
    "bendover":["pics/diana/bendover.jpg"],
    "strapon":["pics/diana/strapon.jpg"],
    "dildo":["pics/diana/dildo.jpg"],
    "bimbo":["pics/diana/bimbo.jpg"],
    "bimbo1":["pics/diana/bimbo1.jpg"],
    "bimbo2":["pics/diana/bimbo2.jpg"],
    "bimbo3":["pics/diana/bimbo3.jpg"],
    "bimbo4":["pics/diana/bimbo4.jpg"],
    "topless":["pics/diana/topless.jpg"],
    "phonejohn":["pics/diana/phonejohn.jpg"],
    "blowjob":["pics/diana/blowjob.mp4"],
    "start-suck":["pics/diana/start-suck.mp4"],
    "suck-male":["pics/diana/blowjob.mp4"],
    "suck-female":["pics/diana/suck-female.mp4"],
    "suck-ts":["pics/diana/blowjob.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "blowjob-double":["pics/diana/blowjob-double.mp4"],
    "cum-in-mouth":["pics/diana/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/diana/cum-on-chest.mp4"],
    "cum-on-face":["pics/diana/cum-on-face.mp4"],
    "eat-pussy":["pics/diana/eat-pussy.mp4"],
    "eat-pussy2":["pics/diana/eat-pussy2.mp4"],
    "fucking":["pics/diana/fucking.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "fucked-by-male":["pics/diana/fucked-by-male.mp4"],
    "fucked-by-ts":["pics/diana/fucked-by-male.mp4"],
    "fucked-by-female":["pics/diana/fucked-by-female.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "solo":["pics/diana/solo.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "mmf":["pics/diana/mmf.mp4"],
    "orgasm":["pics/diana/orgasm.mp4"]
};
/* twine-user-script #28: "imgElsa.js" */
setup.imgElsaDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/npc/elsa/default.jpg"],
    "portrait":["pics/profile/Elsa.jpg"],
    "tease":["pics/npc/elsa/tease.jpg"],
    "selfie":["pics/npc/elsa/selfie.jpg","pics/npc/elsa/selfie2.jpg","pics/npc/elsa/selfie3.jpg","pics/npc/elsa/selfie4.jpg"],
    "spread":["pics/npc/elsa/spread.jpg"],
    "topless":["pics/npc/elsa/topless.jpg"],
    "bed":["pics/npc/elsa/bed.jpg"],
    "bed-topless":["pics/npc/elsa/bed-topless.jpg"],
    "bed-covered":["pics/npc/elsa/bed-covered.jpg"],
    "bed-bra":["pics/npc/elsa/bed-bra.jpg"],
    "cum-covered":["pics/npc/elsa/cum-covered.jpg"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "tribbing":["pics/npc/elsa/tribbing.mp4"],
    "female-69":["pics/npc/elsa/female-69.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/npc/elsa/eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/npc/elsa/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/npc/elsa/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/npc/lisa/eaten-by-male.mp4"],
    "eaten-by-female":["pics/npc/lisa/eaten-by-female.mp4"],
    "eaten-by-ts":["pics/npc/lisa/eaten-by-female.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/npc/elsa/riding.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/npc/elsa/riding.mp4"],
    "fucked-by-male":["pics/npc/elsa/fucked-by-male.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/npc/elsa/fucked-by-male.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/npc/elsa/fucked-by-male-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/npc/elsa/fucked-by-male-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/npc/elsa/fuck.mp4"],
    "fuck-female":["pics/npc/elsa/fuck.mp4"],
    "fuck-female-strapon":["pics/npc/elsa/fuck.mp4"],
    "fuck-ts":["pics/npc/elsa/fuck.mp4"],
    "kiss-male":["pics/npc/elsa/kiss-male.mp4"],
    "kiss-female":["pics/npc/elsa/kiss-female.mp4"],
    "kiss-ts":["pics/npc/elsa/kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/npc/elsa/cum-on-face.mp4"],
    "cum-in-mouth":["pics/npc/elsa/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/npc/elsa/orgasm.mp4"]
};
/* twine-user-script #29: "imgEscorting.js" */
setup.imgEscortingDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/escorting/default.jpg"],
    "female-nice":["pics/escorting/female-nice.jpg"],
    "female-mean":["pics/escorting/female-mean.jpg"],
    "female-dom":["pics/escorting/female-dom.jpg"],
    "female-shy":["pics/escorting/female-shy.jpg"],
    "male-nice":["pics/escorting/male-dom.jpg"],
    "male-mean":["pics/escorting/male-dom.jpg"],
    "male-dom":["pics/escorting/male-dom.jpg"],
    "male-shy":["pics/escorting/male-dom.jpg"],
    "ts-nice":["pics/escorting/ts-nice.jpg"],
    "ts-mean":["pics/escorting/ts-mean.jpg"],
    "ts-dom":["pics/escorting/ts-dom.jpg"],
    "ts-shy":["pics/escorting/ts-shy.jpg"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-back-male":["pics/action/cum-on-back-male.mp4"],
    "cum-on-back-female":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie-male":["pics/action/male-oral-creampie.mp4"],
    "oral-creampie-female":["pics/action/female-oral-creampie.mp4"],
    "creampie-male":["pics/action/ts-creampie.mp4"],
    "creampie-female":["pics/action/female-creampie.mp4"],
    "creampie-female-anal":["pics/action/anal-creampie-female.mp4"]
};
/* twine-user-script #30: "imgEvents.js" */
setup.imgEventsDefault = {
    "version":3,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "game":["pics/events/game/game1.mp4"],
    "stripdance":["pics/events/stripdance.mp4"],
    "movie-action1":["pics/events/movie/action1.mp4"],
    "movie-action2":["pics/events/movie/action2.mp4"],
    "movie-anime1":["pics/events/movie/anime1.mp4"],
    "movie-romance1":["pics/events/movie/romance1.mp4"],
    "movie-drama1":["pics/events/movie/drama1.mp4"],
    "movie-comedy1":["pics/events/movie/comedy1.mp4"],
    "porn-bimbo":["pics/events/porn/bimbo.mp4"],
    "porn-lesbian":["pics/events/porn/lesbian.mp4"],
    "porn-straight":["pics/events/porn/straight.mp4"],
    "porn-sissy":["pics/events/porn/sissy.mp4"],
    "porn-trans":["pics/events/porn/trans.mp4"],
    "porn-ts":["pics/events/porn/ts.mp4"],
    "porn-tv":["pics/events/porn/tv.mp4"],
    "porn-porn":["pics/events/porn/porn.mp4"],
    "porn-porn2":["pics/events/porn/porn2.mp4"],
    "porn-porn_sis":["pics/events/porn/porn_sis.mp4"],
    "notebook":["pics/events/misc/notebook.jpg"],
    "brokenvial":["pics/events/misc/brokenvial.jpg"],
    "mirror":["pics/events/misc/mirror.jpg"],
    "books":["pics/events/misc/books.jpg"],
    "collar":["pics/events/misc/collar.jpg"],
    "lactation":["pics/events/lactation.mp4"],
    "pit-cows":["pics/events/pit/cows.jpg"],
    "pit-strapon":["pics/events/pit/pit-strapon.jpg"],
    "samantha":["pics/events/samantha.jpg"],
    "jessica":["pics/events/jessica/jessica.jpg"],
    "jessica-topless":["pics/events/jessica/topless.jpg"],
    "jessica-kiss-sister":["pics/sister/ev30-1.mp4"],
    "ts-maid":["pics/events/ts-maid.jpg"],
    "female-maid":["pics/events/female-maid.jpg"],
    "male-wear-strapon":["pics/events/male-wear-strapon.jpg"],
    "dream-mom":["pics/events/dream-mom.mp4"],
    "dream-sister":["pics/events/dream-sister.mp4"],
    "dream-tfBimbo":["pics/events/dream-tfBimbo.mp4"],
    "dream-tfFemale":["pics/events/dream-tfFemale.mp4"],
    "dream-tfMale":["pics/events/dream-tfMale.mp4"],
    "dream-tfSissy":["pics/events/dream-tfSissy.mp4"],
    "dream-tfTrans":["pics/events/dream-tfTrans.mp4"],
    "dream-tfTransDom":["pics/events/dream-tfTransDom.mp4"],
    "dianaslave":["pics/events/ch2/dianaslave.mp4"],
    "slavebed":["pics/events/ch2/slavebed.jpg"],
    "slave1":["pics/events/ch2/slave1.mp4"],
    "slave2":["pics/events/ch2/slave2.mp4"],
    "slave3":["pics/events/ch2/slave3.mp4"],
    "slave4":["pics/events/ch2/slave4.mp4"],
    "ts-fuck-female1":["pics/events/ch3/ts-fuck-female1.mp4"],
    "ts-fuck-male1":["pics/events/ch3/ts-fuck-male1.mp4"],
    "ts-fuck-male2":["pics/events/ch3/ts-fuck-male2.mp4"],
    "ts-on-female-gangbang":["pics/events/ch3/ts-on-female-gangbang.mp4"],
    "ts-on-male-gangbang":["pics/events/ch3/ts-on-male-gangbang.mp4"],
    "ts-on-male-gangbang2":["pics/events/ch3/ts-on-male-gangbang2.mp4"],
    "orgasm":["pics/action/female-squirt.mp4"]
};
/* twine-user-script #31: "imgJohn.js" */
setup.imgJohnDefault = {
    "version":14,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/john/male/outfits/default.jpg"],
    "default-pro":["pics/john/male/outfits/default-pro.jpg"],
    "default-note":["pics/john/male/notes/default-note.jpg"],
    "beer":["pics/john/male/beer.jpg"],
    "suck-male":["pics/action/male-suck-male.mp4"],
    "suck-female":["pics/action/male-suck-strapon.mp4"],
    "suck-ts":["pics/action/male-suck-ts.mp4"],
    "handjob-male":["pics/action/male-handjob-male.mp4"],
    "handjob-ts":["pics/action/male-handjob-ts.mp4"],
    "deepthroat-male":["pics/action/male-suck-male.mp4"],
    "deepthroat-female":["pics/action/male-suck-female.mp4"],
    "deepthroat-ts":["pics/action/male-suck-ts.mp4"],
    "eat-pussy":["pics/action/male-eat-pussy.mp4"],
    "rim-male":["pics/action/male-rim-male.mp4"],
    "rim-female":["pics/action/male-rim-female.mp4"],
    "rim-ts":["pics/action/male-rim-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-male.mp4"],
    "sucked-by-female":["pics/action/female-suck-male.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-male.mp4"],
    "cum-in-mouth":["pics/action/male-oral-creampie.mp4"],
    "cum-on-chest":[""],
    "cum-on-face":["pics/player/male/cum-on-face.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-male.mp4"],
    "creampie":["pics/action/male-creampie.mp4"],
    "creampie-anal":["pics/action/male-creampie.mp4"],
    "fucked-by-male":["pics/action/male-fuck-male.mp4"],
    "fucked-by-female":["pics/action/female-fuck-male.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-male.mp4"],
    "ass-fucked-by-male":["pics/action/male-fuck-male.mp4"],
    "ass-fucked-by-female":["pics/action/female-fuck-male.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-fuck-male.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-male.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-male.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-male.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-male.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-fuck-male.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-male.mp4"],
    "fuck-male":["pics/action/male-fuck-male.mp4"],
    "fuck-female":["pics/action/male-fuck-female.mp4"],
    "fuck-ts":["pics/action/male-fuck-ts.mp4"],
    "kiss-male":["pics/action/male-kiss-male.mp4"],
    "kiss-female":["pics/action/male-kiss-female.mp4"],
    "kiss-ts":["pics/action/male-kiss-ts.mp4"],
    "fingered":[""],
    "ass-fingered":[""],
    "ride-male":["pics/action/male-ride-male.mp4"],
    "ride-female":["pics/action/male-ride-female.mp4"],
    "ride-ts":["pics/action/male-ride-ts.mp4"],
    "mmf":["pics/john/male/mmf.mp4"],
    "blowjob-double":[""],
    "group-oral-female":["pics/john/male/bathroom-female-oral.mp4"],
    "group-oral-male":["pics/john/male/bathroom-male-oral.mp4"],
    "group-males":["pics/john/male/bathroom-male-gangbang.mp4"],
    "transform-to-female":["pics/john/male/transform.mp4"],
    "squirt":[""],
    "orgasm":[""]
};
/* twine-user-script #32: "imgJulia.js" */
setup.imgJuliaDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/julia/outfits/default.jpg","pics/julia/outfits/default-2.jpg","pics/julia/outfits/default-3.jpg"],
    "default-pro":["pics/julia/outfits/default-pro.jpg"],
    "default-note":["pics/julia/notes/default-note.jpg"],
    "julia-bimbo":["pics/julia/outfits/bimbo.jpg","pics/julia/outfits/bimbo-2.jpg","pics/julia/outfits/bimbo-3.jpg"],
    "julia-bimbo-pro":["pics/julia/outfits/bimbo-pro.jpg"],
    "julia-bimbo-note":["pics/julia/notes/bimbo-note.jpg"],
    "julia-shirt":["pics/julia/outfits/shirt.jpg","pics/julia/outfits/shirt-2.jpg","pics/julia/outfits/shirt-3.jpg"],
    "julia-shirt-pro":["pics/julia/outfits/shirt-pro.jpg"],
    "julia-shirt-note":["pics/julia/notes/shirt-note.jpg"],
    "julia-blue":["pics/julia/outfits/blue.jpg","pics/julia/outfits/blue-2.jpg","pics/julia/outfits/blue-3.jpg"],
    "julia-blue-pro":["pics/julia/outfits/blue-pro.jpg"],
    "julia-blue-note":["pics/julia/notes/blue-note.jpg"],
    "julia-office":["pics/julia/outfits/office.jpg","pics/julia/outfits/office-2.jpg","pics/julia/outfits/office-3.jpg"],
    "julia-office-pro":["pics/julia/outfits/office-pro.jpg"],
    "julia-office-note":["pics/julia/notes/office-note.jpg"],
    "julia-office":["pics/julia/outfits/office.jpg","pics/julia/outfits/office-2.jpg","pics/julia/outfits/office-3.jpg"],
    "julia-office-pro":["pics/julia/outfits/office-pro.jpg"],
    "julia-office-note":["pics/julia/notes/office-note.jpg"],
    "julia-kitchen":["pics/julia/outfits/kitchen.jpg","pics/julia/outfits/kitchen-2.jpg","pics/julia/outfits/kitchen-3.jpg"],
    "julia-kitchen-pro":["pics/julia/outfits/kitchen-pro.jpg"],
    "julia-kitchen-note":["pics/julia/notes/kitchen-note.jpg"],
    "julia-open":["pics/julia/outfits/open.jpg","pics/julia/outfits/open-2.jpg","pics/julia/outfits/open-3.jpg"],
    "julia-open-pro":["pics/julia/outfits/open-pro.jpg"],
    "julia-open-note":["pics/julia/notes/open-note.jpg"],
    "julia-lace":["pics/julia/outfits/lace.jpg","pics/julia/outfits/lace-2.jpg","pics/julia/outfits/lace-3.jpg"],
    "julia-lace-pro":["pics/julia/outfits/lace-pro.jpg"],
    "julia-lace-note":["pics/julia/notes/lace-note.jpg"],
    "julia-pink":["pics/julia/outfits/pink.jpg","pics/julia/outfits/pink-2.jpg","pics/julia/outfits/pink-3.jpg"],
    "julia-pink-pro":["pics/julia/outfits/pink-pro.jpg"],
    "julia-pink-note":["pics/julia/notes/pink-note.jpg"],
    "julia-nekkid":["pics/julia/outfits/nekkid.jpg","pics/julia/outfits/nekkid-2.jpg","pics/julia/outfits/nekkid-3.jpg"],
    "julia-nekkid-pro":["pics/julia/outfits/nekkid-pro.jpg"],
    "julia-nekkid-note":["pics/julia/notes/nekkid-note.jpg"],
    "bimbo1":["pics/julia/bimbo1.jpg"],
    "bimbo2":["pics/julia/bimbo2.jpg"],
    "katie1":["pics/julia/katie1.jpg"],
    "katie2":["pics/julia/katie2.jpg"],
    "katie-sex1":["pics/julia/katie-sex1.mp4"],
    "katie-sex2":["pics/julia/katie-sex2.mp4"],
    "katie-sex3":["pics/julia/katie-sex3.mp4"],
    "katie-sex4":["pics/julia/katie-sex4.mp4"],
    "spread":["pics/julia/spread.jpg"],
    "officesex":["pics/julia/officesex.mp4"],
    "doggy":["pics/julia/doggy.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/julia/eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/julia/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/julia/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/action/female-ride-male.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/action/female-ride-ts.mp4"],
    "fucked-by-male":["pics/julia/fucked.mp4"],
    "fucked-by-female":["pics/julia/fucked.mp4"],
    "fucked-by-ts":["pics/julia/fucked.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/julia/cum-on-face.mp4"],
    "cum-in-mouth":["pics/julia/cum-on-face.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/action/female-squirt.mp4"]
};
/* twine-user-script #33: "imgKagney.js" */
setup.imgKagneyDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/npc/kagney/default.jpg"],
    "portrait":["pics/profile/Kagney.jpg"],
    "slutty":["pics/npc/kagney/slutty.jpg"],
    "tease":["pics/npc/kagney/tease.jpg"],
    "spread":["pics/npc/kagney/spread.jpg"],
    "topless":["pics/npc/kagney/topless.jpg"],
    "desk-topless":["pics/npc/kagney/desk-topless.jpg"],
    "desk-bimbo":["pics/npc/kagney/desk-bimbo.jpg","pics/npc/kagney/desk-bimbo2.jpg","pics/npc/kagney/desk-bimbo3.jpg"],
    "bendover":["pics/npc/kagney/bendover.jpg"],
    "lab-strip":["pics/npc/kagney/lab-strip.mp4"],
    "cum-covered":["pics/npc/kagney/cum-covered.jpg"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "tribbing":["pics/npc/kagney/tribbing.mp4"],
    "female-69":["pics/npc/kagney/female-69.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/npc/kagney/eat-pussy.mp4"],
    "titfuck":["pics/npc/kagney/titfuck.mp4"],
    "titsmack":["pics/npc/kagney/titsmack.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/npc/kagney/suck-male.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/npc/kagney/suck-male.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/npc/kagney/eaten-by-male.mp4"],
    "eaten-by-female":["pics/npc/kagney/eaten-by-female.mp4"],
    "eaten-by-ts":["pics/npc/kagney/eaten-by-female.mp4"],
    "facesit-female":["pics/npc/kagney/facesit-female.mp4"],
    "facesit-male":["pics/npc/kagney/facesit-male.mp4"],
    "facesit-ts":["pics/npc/kagney/facesit-female.mp4"],
    "ride-male":["pics/npc/kagney/riding.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/npc/kagney/riding.mp4"],
    "fucked-by-male":["pics/npc/kagney/fucked-by-male-doggy.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/npc/kagney/fucked-by-male-doggy.mp4"],
    "ass-fucked-by-male":["pics/npc/kagney/ass-fucked-by-male-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/npc/kagney/ass-fucked-by-male-doggy.mp4"],
    "fucked-by-male-doggy":["pics/npc/kagney/fucked-by-male-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/npc/kagney/fucked-by-male-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/npc/kagney/ass-fucked-by-male-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/npc/kagney/ass-fucked-by-male-doggy.mp4"],
    "fuck-male":["pics/npc/kagney/fuck.mp4"],
    "fuck-female":["pics/npc/kagney/fuck.mp4"],
    "fuck-female-strapon":["pics/npc/kagney/fuck.mp4"],
    "fuck-ts":["pics/npc/kagney/fuck.mp4"],
    "kiss-male":["pics/npc/kagney/kiss-male.mp4"],
    "kiss-female":["pics/npc/kagney/kiss-female.mp4"],
    "kiss-ts":["pics/npc/kagney/kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/npc/kagney/cum-on-face.mp4"],
    "cum-on-chest":["pics/npc/kagney/cum-on-chest.jpg"],
    "cum-in-mouth":["pics/npc/kagney/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/npc/kagney/orgasm.mp4"]
};
/* twine-user-script #34: "imgLauren.js" */
setup.imgLaurenDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/lauren/default.jpg"],
    "portrait":["pics/profile/Lauren.jpg"],
    "bound":["pics/lauren/bound.jpg"],
    "bound2":["pics/lauren/bound2.jpg"],
    "lingerie1":["pics/lauren/lingerie1.jpg"],
    "lingerie2":["pics/lauren/lingerie2.jpg"],
    "lingerie3":["pics/lauren/lingerie3.jpg"],
    "spread":["pics/lauren/spread.jpg"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/lauren/eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/lauren/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/lauren/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/action/female-ride-male.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/action/female-ride-ts.mp4"],
    "fucked-by-male":["pics/lauren/fucked.mp4"],
    "fucked-by-female":["pics/lauren/fucked.mp4"],
    "fucked-by-ts":["pics/lauren/fucked.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/lauren/cum-in-mouth.mp4"],
    "cum-in-mouth":["pics/lauren/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/action/female-squirt.mp4"]
};
/* twine-user-script #35: "imgLisa.js" */
setup.imgLisaDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/npc/lisa/default.jpg"],
    "default-pro":["pics/profile/Lisa.jpg"],
    "default-note":["pics/notes/lisa.jpg"],
    "spread":["pics/npc/lisa/spread.jpg"],
    "topless":["pics/npc/lisa/topless.jpg"],
    "greeting":["pics/npc/lisa/greeting.jpg"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/npc/lisa/eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/npc/lisa/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/npc/lisa/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/npc/lisa/eaten-by-male.mp4"],
    "eaten-by-female":["pics/npc/lisa/eaten-by-female.mp4"],
    "eaten-by-ts":["pics/npc/lisa/eaten-by-female.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/action/female-ride-male.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/action/female-ride-ts.mp4"],
    "fucked-by-male":["pics/action/male-fuck-female.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-female.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/npc/lisa/cum-in-mouth.mp4"],
    "cum-in-mouth":["pics/npc/lisa/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/npc/lisa/orgasm.mp4"]
};
/* twine-user-script #36: "imgNPC.js" */
setup.imgNPCDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "samantha":["pics/npc/samantha/samantha.jpg"],
    "samantha-pro":["pics/profile/Samantha.jpg"],
    "samantha-porn1":["pics/npc/samantha/pornshoot1.mp4"],
    "samantha-porn2":["pics/npc/samantha/pornshoot2.mp4"],
    "samantha-porn3":["pics/npc/samantha/pornshoot3.mp4"],
    "samantha-porn4":["pics/npc/samantha/pornshoot4.mp4"],
    "samantha-porn5":["pics/npc/samantha/pornshoot5.mp4"],
    "samantha-porn6":["pics/npc/samantha/pornshoot6.mp4"],
    "samantha-porn7":["pics/npc/samantha/pornshoot7.mp4"],
    "samantha-porn8":["pics/npc/samantha/pornshoot8.mp4"],
    "annie":["pics/npc/annie/annie.jpg"],
    "annie-pro":["pics/profile/Annie.jpg"],
    "james":["pics/npc/james/default.jpg"],
    "james-pro":["pics/profile/James.jpg","pics/profile/Unknown.jpg"],
    "chris":["pics/npc/chris/default.jpg"],
    "chris-pro":["pics/profile/Chris.jpg"],
    "lisa":["pics/npc/lisa/default.jpg"],
    "lisa-greeting":["pics/npc/lisa/greeting.jpg"],
    "jessica":["pics/npc/jessica/jessica.jpg"],
    "jessica-pro":["pics/profile/Jessica.jpg"],
    "jessica-topless":["pics/npc/jessica/topless.jpg"],
    "jessica-kiss-sister":["pics/npc/jessica/kiss-sister.mp4"],
    "jessica-kiss-sister2":["pics/npc/jessica/kiss-sister2.mp4"],
    "jessica-eat-sister":["pics/npc/jessica/eat-sister.mp4"],
    "jessica-69-sister":["pics/npc/jessica/69-sister.mp4"],
    "saya":["pics/npc/saya/default.jpg"],
    "saya-girl":["pics/npc/saya/girl.jpg"],
    "sean":["pics/npc/sean/default.jpg"],
    "sean-pro":["pics/profile/Sean.jpg"],
    "sean-cage":["pics/npc/sean/cage.jpg"],
    "sean-solo":["pics/npc/sean/solo.mp4"],
    "tory":["pics/npc/tory/default.jpg"],
    "tory-pro":["pics/profile/Tory.jpg","pics/profile/UnknownF.jpg"],
    "tory-meeting1":["pics/npc/tory/meeting1.mp4"],
    "tory-meeting2":["pics/npc/tory/meeting2.mp4"],
    "tory-meeting3":["pics/npc/tory/meeting3.mp4"],
    "tory-meeting4":["pics/npc/tory/meeting4.mp4"],
    "tory-oral1":["pics/npc/tory/oral1.mp4"],
    "tory-oral2":["pics/npc/tory/oral2.mp4"],
    "tory-oral3":["pics/npc/tory/oral3.mp4"],
    "ash":["pics/npc/ash/default.jpg"],
    "ash-pro":["pics/profile/Ash.jpg"],
    "veruca":["pics/npc/veruca/default.jpg"],
    "veruca-pro":["pics/profile/Veruca.jpg"],
    "lexi":["pics/npc/lexi/default.jpg"],
    "lexi-pro":["pics/profile/Lexi.jpg"],
    "siri":["pics/npc/siri/default.jpg"],
    "siri-pro":["pics/profile/Siri.jpg"],
    "orgasm":["pics/action/female-squirt.mp4"],
    "jag-pro":["pics/profile/Unknown.jpg"],
    "mick-pro":["pics/profile/Unknown.jpg"],
};
/* twine-user-script #37: "imgPenny.js" */
setup.imgPennyDefault = {
    "version":14,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/penny/outfits/default.jpg","pics/penny/outfits/default-2.jpg","pics/penny/outfits/default-3.jpg"],
    "default-pro":["pics/penny/outfits/default-pro.jpg"],
    "default-note":["pics/penny/notes/default-note.jpg"],
    "penny-dom":["pics/penny/outfits/dom.jpg","pics/penny/outfits/dom-2.jpg","pics/penny/outfits/dom-3.jpg"],
    "penny-dom-pro":["pics/penny/outfits/dom-pro.jpg"],
    "penny-dom-note":["pics/penny/notes/dom-note.jpg"],
    "penny-fireside":["pics/penny/outfits/fireside.jpg","pics/penny/outfits/fireside-2.jpg","pics/penny/outfits/fireside-3.jpg"],
    "penny-fireside-pro":["pics/penny/outfits/fireside-pro.jpg"],
    "penny-fireside-note":["pics/penny/notes/fireside-note.jpg"],
    "penny-lowcut":["pics/penny/outfits/lowcut.jpg","pics/penny/outfits/lowcut-2.jpg","pics/penny/outfits/lowcut-3.jpg"],
    "penny-lowcut-pro":["pics/penny/outfits/lowcut-pro.jpg"],
    "penny-lowcut-note":["pics/penny/notes/lowcut-note.jpg"],
    "penny-pencil":["pics/penny/outfits/pencil.jpg","pics/penny/outfits/pencil-2.jpg","pics/penny/outfits/pencil-3.jpg"],
    "penny-pencil-pro":["pics/penny/outfits/pencil-pro.jpg"],
    "penny-pencil-note":["pics/penny/notes/pencil-note.jpg"],
    "penny-stealth":["pics/penny/outfits/stealth.jpg","pics/penny/outfits/stealth-2.jpg","pics/penny/outfits/stealth-3.jpg"],
    "penny-stealth-pro":["pics/penny/outfits/stealth-pro.jpg"],
    "penny-stealth-note":["pics/penny/notes/stealth-note.jpg"],
    "penny-mermaid":["pics/penny/outfits/mermaid.jpg","pics/penny/outfits/mermaid-2.jpg","pics/penny/outfits/mermaid-3.jpg"],
    "penny-mermaid-pro":["pics/penny/outfits/mermaid-pro.jpg"],
    "penny-mermaid-note":["pics/penny/notes/mermaid-note.jpg"],
    "penny-fishnet":["pics/penny/outfits/fishnet.jpg","pics/penny/outfits/fishnet-2.jpg","pics/penny/outfits/fishnet-3.jpg"],
    "penny-fishnet-pro":["pics/penny/outfits/fishnet-pro.jpg"],
    "penny-fishnet-note":["pics/penny/notes/fishnet-note.jpg"],
    "penny-nurse":["pics/penny/outfits/nurse.jpg","pics/penny/outfits/nurse-2.jpg","pics/penny/outfits/nurse-3.jpg"],
    "penny-nurse-pro":["pics/penny/outfits/nurse-pro.jpg"],
    "penny-nurse-note":["pics/penny/notes/nurse-note.jpg"],
    "penny-nekkid":["pics/penny/outfits/nekkid.jpg","pics/penny/outfits/nekkid-2.jpg","pics/penny/outfits/nekkid-3.jpg"],
    "penny-nekkid-pro":["pics/penny/outfits/nekkid-pro.jpg"],
    "penny-nekkid-note":["pics/penny/notes/nekkid-note.jpg"],
    "spread":["pics/penny/spread.jpg"],
    "spread-dom":["pics/penny/spread-dom.jpg"],
    "sexy-dom":["pics/penny/sexy-dom.jpg"],
    "sit-dom":["pics/penny/sit-dom.jpg"],
    "flash":["pics/penny/flash.png"],
    "bed":["pics/penny/bed.jpg"],
    "outside":["pics/penny/outside.jpg"],
    "panties":["pics/penny/panties.jpg"],
    "phone1":["pics/penny/phone1.jpg"],
    "phone2":["pics/penny/phone2.jpg"],
    "phonejohn":["pics/penny/phonejohn.jpg"],
    "pussy":["pics/penny/pussy.jpg"],
    "strapon":["pics/penny/strapon.jpg"],
    "strapon-solo":["pics/action/strapon-solo.mp4"],
    "strip1":["pics/penny/strip1.jpg"],
    "strip2":["pics/penny/strip2.jpg"],
    "topless":["pics/penny/topless.jpg"],
    "lennybj":["pics/penny/lennybj.mp4"],
    "officesexff1":["pics/penny/officesexff1.mp4"],
    "officesexff2":["pics/penny/officesexff2.mp4"],
    "officesexmf1":["pics/penny/officesexmf1.mp4"],
    "officesexmf2":["pics/penny/officesexmf2.mp4"],
    "officesexmf3":["pics/penny/officesexmf3.mp4"],
    "cuckoldff1":["pics/penny/cuckoldff1.mp4"],
    "cuckoldff2":["pics/penny/cuckoldff2.mp4"],
    "cuckoldmf1":["pics/penny/cuckoldmf1.mp4"],
    "cuckoldmf2":["pics/penny/cuckoldmf2.mp4"],
    "suck-male":["pics/penny/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-strapon.mp4"],
    "suck-ts":["pics/penny/blowjob.mp4"],
    "deepthroat-male":["pics/penny/blowjob.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/penny/blowjob.mp4"],
    "eat-pussy":["pics/penny/eat-pussy.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/penny/facesit-female.jpg"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/penny/facesit-female.jpg"],
    "cum-in-mouth":["pics/penny/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/penny/cum-on-chest.mp4"],
    "cum-on-face":["pics/penny/cum-on-face.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "fucked-by-male":["pics/penny/fucking.mp4"],
    "fucked-by-female":["pics/penny/fucking.mp4"],
    "fucked-by-ts":["pics/penny/fucking.mp4"],
    "ass-fucked-by-male":["pics/penny/fucking-ass.mp4"],
    "ass-fucked-by-female":["pics/penny/fucking-ass.mp4"],
    "ass-fucked-by-ts":["pics/penny/fucking-ass.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/penny/kiss-male.mp4"],
    "kiss-female":["pics/penny/kiss-female.mp4"],
    "kiss-ts":["pics/penny/kiss-female.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "riding":["pics/penny/fucking.mp4"],
    "mmf":["pics/penny/mmf.mp4"],
    "blowjob-double":["pics/penny/blowjob-double.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "orgasm":["pics/penny/orgasm.mp4"]
};
/* twine-user-script #38: "imgPitSlaves.js" */
setup.imgPitSlavesDefault = {
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "imgPath":"pics/pit/",
    "female-adult-black":["black-1.jpg","black-2.jpg"],
    "female-adult-blonde":["blonde-1.jpg","blonde-2.jpg"],
    "female-adult-blue":["blue-1.jpg","blue-2.jpg"],
    "female-adult-brown":["brown-1.jpg","brown-2.jpg"],
    "female-adult-green":["green-1.jpg"],
    "female-adult-grey":["grey-1.jpg","grey-2.jpg"],
    "female-adult-orange":["orange-1.jpg","orange-2.jpg"],
    "female-adult-purple":["purple-1.jpg","purple-2.jpg","purple-3.jpg"],
    "female-adult-red":["red-1.jpg","red-2.jpg"],
    "female-adult-white":["white-1.jpg","white-2.jpg"],
    "female-mature-black":["black-1.jpg","black-2.jpg"],
    "female-mature-blonde":["blonde-1.jpg","blonde-2.jpg"],
    "female-mature-blue":["blue-1.jpg","blue-2.jpg"],
    "female-mature-brown":["brown-1.jpg","brown-2.jpg"],
    "female-mature-green":["green-1.jpg","green-2.jpg"],
    "female-mature-grey":["grey-1.jpg","grey-2.jpg"],
    "female-mature-orange":["orange-1.jpg","orange-2.jpg"],
    "female-mature-purple":["purple-1.jpg","purple-2.jpg","purple-3.jpg"],
    "female-mature-red":["red-1.jpg","red-2.jpg"],
    "female-mature-white":["white-1.jpg","white-2.jpg"],
    "female-teen-black":["black-1.jpg","black-2.jpg"],
    "female-teen-blonde":["blonde-1.jpg","blonde-2.jpg"],
    "female-teen-blue":["blue-1.jpg","blue-2.jpg"],
    "female-teen-brown":["brown-1.jpg","brown-2.jpg"],
    "female-teen-green":["green-1.jpg","green-2.jpg"],
    "female-teen-grey":["grey-1.jpg","grey-2.jpg"],
    "female-teen-orange":["orange-1.jpg","orange-2.jpg"],
    "female-teen-purple":["purple-1.jpg","purple-2.jpg"],
    "female-teen-red":["red-1.jpg","red-2.jpg"],
    "female-teen-white":["white-1.jpg","white-2.jpg"],
    "male-adult-black":["black-1.jpg"],
    "male-adult-blonde":["blonde-1.jpg"],
    "male-adult-blue":["black-1.jpg"],
    "male-adult-brown":["brown-1.jpg"],
    "male-adult-green":["black-1.jpg"],
    "male-adult-grey":["black-1.jpg"],
    "male-adult-orange":["black-1.jpg"],
    "male-adult-purple":["black-1.jpg"],
    "male-adult-red":["red-1.jpg"],
    "male-adult-white":["black-1.jpg"],
    "male-mature-black":["black-1.jpg"],
    "male-mature-blonde":["blonde-1.jpg"],
    "male-mature-blue":["black-1.jpg"],
    "male-mature-brown":["brown-1.jpg"],
    "male-mature-green":["black-1.jpg"],
    "male-mature-grey":["black-1.jpg"],
    "male-mature-orange":["black-1.jpg"],
    "male-mature-purple":["black-1.jpg"],
    "male-mature-red":["red-1.jpg"],
    "male-mature-white":["black-1.jpg"],
    "male-teen-black":["black-1.jpg"],
    "male-teen-blonde":["blonde-1.jpg"],
    "male-teen-blue":["black-1.jpg"],
    "male-teen-brown":["brown-1.jpg"],
    "male-teen-green":["black-1.jpg"],
    "male-teen-grey":["black-1.jpg"],
    "male-teen-orange":["black-1.jpg"],
    "male-teen-purple":["black-1.jpg"],
    "male-teen-red":["red-1.jpg"],
    "male-teen-white":["black-1.jpg"],
    "ts-adult-black":["black-1.jpg","black-2.jpg"],
    "ts-adult-blonde":["blonde-1.jpg","blonde-2.jpg"],
    "ts-adult-blue":["black-1.jpg"],
    "ts-adult-brown":["brown-1.jpg","brown-2.jpg"],
    "ts-adult-green":["black-1.jpg"],
    "ts-adult-grey":["black-1.jpg"],
    "ts-adult-orange":["orange-1.jpg"],
    "ts-adult-purple":["black-1.jpg"],
    "ts-adult-red":["red-1.jpg","red-2.jpg"],
    "ts-adult-white":["black-1.jpg"],
    "ts-mature-black":["black-1.jpg","black-2.jpg"],
    "ts-mature-blonde":["blonde-1.jpg","blonde-2.jpg"],
    "ts-mature-blue":["black-1.jpg"],
    "ts-mature-brown":["brown-1.jpg","brown-2.jpg"],
    "ts-mature-green":["black-1.jpg"],
    "ts-mature-grey":["black-1.jpg"],
    "ts-mature-orange":["black-1.jpg"],
    "ts-mature-purple":["purple-1.jpg"],
    "ts-mature-red":["red-1.jpg","red-2.jpg"],
    "ts-mature-white":["black-1.jpg"],
    "ts-teen-black":["black-1.jpg","black-2.jpg"],
    "ts-teen-blonde":["blonde-1.jpg","blonde-2.jpg"],
    "ts-teen-blue":["blue-1.jpg"],
    "ts-teen-brown":["brown-1.jpg","brown-2.jpg"],
    "ts-teen-green":["black-1.jpg"],
    "ts-teen-grey":["black-1.jpg"],
    "ts-teen-orange":["orange-1.jpg"],
    "ts-teen-purple":["purple-1.jpg"],
    "ts-teen-red":["red-1.jpg","red-2.jpg"],
    "ts-teen-white":["white-1.jpg"],
}
/* twine-user-script #39: "imgPlayerBimbo.js" */
setup.imgPlayerBimboDefault = {
    "version":16,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/player/bimbo/default.jpg"],
    "portrait":["pics/profile/Bimbo.jpg"],
    "tf":["pics/player/bimbo/tf.jpg"],
    "bed":["pics/player/bimbo/bed.jpg"],
    "cum-covered":["pics/player/bimbo/cum-covered.jpg"],
    "spread":["pics/player/bimbo/spread.jpg"],
    "spread-ass":["pics/action/female-spread-ass.jpg"],
    "flash":["pics/player/bimbo/flash.jpg"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/player/bimbo/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/player/bimbo/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/player/bimbo/blowjob.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/player/bimbo/blowjob.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-male.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-male.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/player/bimbo/cowgirl.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/player/bimbo/cowgirl.mp4"],
    "fucked-by-male":["pics/player/bimbo/fucked-by-male.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-female.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/player/bimbo/cum-on-face.mp4"],
    "cum-in-mouth":["pics/player/bimbo/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/action/female-squirt.mp4"]
};
/* twine-user-script #40: "imgPlayerFemale.js" */
setup.imgPlayerFemaleDefault = {
    "version":16,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/player/female/default.jpg"],
    "portrait":["pics/profile/Female.jpg"],
    "tf":["pics/player/female/tf.jpg"],
    "bed":["pics/player/female/bed.jpg"],
    "cum-covered":["pics/player/female/cum-covered.jpg"],
    "spread":["pics/player/female/spread.jpg"],
    "spread-ass":["pics/action/female-spread-ass.jpg"],
    "flash":["pics/player/female/flash.jpg"],
    "toy-ass":["pics/action/female-dildo-anal.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/action/female-suck-male.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/action/female-suck-ts.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/player/bimbo/cowgirl.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/action/female-ride-ts.mp4"],
    "fucked-by-male":["pics/action/male-fuck-female.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-female.mp4"],
    "ass-fucked-by-male":["pics/action/male-assfuck-female-doggy.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-assfuck-female-doggy.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female-doggy.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female-doggy.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/player/female/cum-on-face.mp4"],
    "cum-in-mouth":["pics/player/female/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/action/female-squirt.mp4"]
};
/* twine-user-script #41: "imgPlayerMale.js" */
setup.imgPlayerMaleDefault = {
    "version":16,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/player/male/default.jpg"],
    "portrait":["pics/profile/Male.jpg"],
    "tf":["pics/player/male/tf.jpg"],
    "bed":["pics/player/male/bed.jpg"],
    "cum-covered":["pics/player/male/cum-covered.jpg"],
    "spread":["pics/action/ts-spread-ass.jpg"],
    "spread-ass":["pics/action/ts-spread-ass.jpg"],
    "flash":["pics/player/female/flash.jpg"],
    "toy-ass":["pics/action/anal-dildo.mp4"],
    "fingered":["pics/action/fingering-ass.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/male-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/male-rim-male.mp4"],
    "rim-female":["pics/action/male-rim-female.mp4"],
    "rim-ts":["pics/action/male-rim-ts.mp4"],
    "suck-male":["pics/action/male-suck-male.mp4"],
    "suck-female":["pics/action/male-suck-female.mp4"],
    "suck-ts":["pics/action/male-suck-ts.mp4"],
    "handjob-male":["pics/action/male-handjob-male.mp4"],
    "handjob-ts":["pics/action/male-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-male.mp4"],
    "sucked-by-female":["pics/action/female-suck-male.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-male.mp4"],
    "deepthroat-male":["pics/action/male-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/male-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-rim-male.mp4"],
    "eaten-by-female":["pics/action/female-rim-male.mp4"],
    "eaten-by-ts":["pics/action/female-rim-male.mp4"],
    "facesit-female":["pics/action/male-facesit-female.mp4"],
    "facesit-male":["pics/action/male-facesit-male.mp4"],
    "facesit-ts":["pics/action/male-facesit-ts.mp4"],
    "spitroast-mm":["pics/action/male-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/male-spitroast-mf.mp4"],
    "ride-male":["pics/action/male-ride-male.mp4"],
    "ride-female":["pics/action/male-ride-female.mp4"],
    "ride-ts":["pics/action/male-ride-ts.mp4"],
    "fucked-by-male":["pics/action/male-fuck-male.mp4"],
    "fucked-by-female":["pics/action/female-fuck-male.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-male.mp4"],
    "ass-fucked-by-male":["pics/action/male-fuck-male.mp4"],
    "ass-fucked-by-female":["pics/action/female-fuck-male.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-fuck-male.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-male.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-male.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-male.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-male.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-fuck-male.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-male.mp4"],
    "fuck-male":["pics/action/male-fuck-male.mp4"],
    "fuck-female":["pics/action/male-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/male-fuck-female.mp4"],
    "fuck-ts":["pics/action/male-fuck-ts.mp4"],
    "kiss-male":["pics/action/male-kiss-male.mp4"],
    "kiss-female":["pics/action/male-kiss-female.mp4"],
    "kiss-ts":["pics/action/male-kiss-female.mp4"],
    "squirt":["pics/action/male-squirt.mp4"],
    "cum-on-face":["pics/player/male/cum-on-face.mp4"],
    "cum-in-mouth":["pics/action/male-oral-creampie.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-male.mp4"],
    "oral-creampie":["pics/action/male-oral-creampie.mp4"],
    "creampie":["pics/action/male-creampie.mp4"],
    "creampie-anal":["pics/action/male-creampie.mp4"],
    "orgasm":["pics/action/male-squirt.mp4"]
};
/* twine-user-script #42: "imgPlayerSissy.js" */
setup.imgPlayerSissyDefault = {
    "version":16,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/player/sissy/default.jpg"],
    "portrait":["pics/profile/Sissy.jpg"],
    "tf":["pics/player/sissy/tf.jpg"],
    "bed":["pics/player/sissy/tf.jpg"],
    "cum-covered":["pics/player/sissy/cum-covered.jpg"],
    "spread":["pics/player/sissy/spread.jpg"],
    "spread-ass":["pics/player/sissy/spread.jpg"],
    "flash":["pics/player/female/flash.jpg"],
    "toy-ass":["pics/action/anal-dildo.mp4"],
    "fingered":["pics/action/fingering-ass.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/player/sissy/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/player/sissy/blowjob.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-ts.mp4"],
    "sucked-by-female":["pics/action/female-suck-ts.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-ts.mp4"],
    "deepthroat-male":["pics/player/sissy/blowjob.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/player/sissy/blowjob.mp4"],
    "eaten-by-male":["pics/action/male-rim-ts.mp4"],
    "eaten-by-female":["pics/action/female-rim-ts.mp4"],
    "eaten-by-ts":["pics/action/female-rim-ts.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/ts-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-ts.mp4"],
    "spitroast-mm":["pics/action/ts-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/action/ts-ride-male.mp4"],
    "ride-female":["pics/action/ts-ride-female.mp4"],
    "ride-ts":["pics/action/ts-ride-ts.mp4"],
    "fucked-by-male":["pics/player/sissy/fucked-by-male.mp4"],
    "fucked-by-female":["pics/action/female-fuck-ts.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male":["pics/player/sissy/fucked-by-male.mp4"],
    "ass-fucked-by-female":["pics/action/female-fuck-ts.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "fucked-by-male-doggy":["pics/player/sissy/fucked-by-male.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-ts.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male-doggy":["pics/player/sissy/fucked-by-male.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-fuck-ts.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "fuck-male":["pics/action/ts-fuck-male.mp4"],
    "fuck-female":["pics/action/ts-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/ts-fuck-female.mp4"],
    "fuck-ts":["pics/action/ts-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/ts-squirt.mp4"],
    "cum-on-face":["pics/player/trans/cum-on-face.mp4"],
    "cum-in-mouth":["pics/player/sissy/cum-in-mouth.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/ts-creampie.mp4"],
    "creampie-anal":["pics/action/ts-creampie.mp4"],
    "orgasm":["pics/action/ts-squirt.mp4"]
};
/* twine-user-script #43: "imgPlayerTrans.js" */
setup.imgPlayerTransDefault = {
    "version":16,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/player/trans/default.jpg"],
    "portrait":["pics/profile/Trans.jpg"],
    "tf":["pics/player/trans/tf.jpg"],
    "bed":["pics/player/trans/bed.jpg"],
    "cum-covered":["pics/player/trans/cum-covered.jpg"],
    "spread":["pics/action/ts-spread-ass.jpg"],
    "spread-ass":["pics/action/ts-spread-ass.jpg"],
    "flash":["pics/player/female/flash.jpg"],
    "toy-ass":["pics/action/anal-dildo.mp4"],
    "fingered":["pics/action/fingering-ass.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/action/female-suck-male.mp4"],
    "suck-female":["pics/player/trans/suck-female.mp4"],
    "suck-ts":["pics/action/female-suck-ts.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-ts.mp4"],
    "sucked-by-female":["pics/action/female-suck-ts.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-ts.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-rim-ts.mp4"],
    "eaten-by-female":["pics/action/female-rim-ts.mp4"],
    "eaten-by-ts":["pics/action/female-rim-ts.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/ts-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-ts.mp4"],
    "spitroast-mm":["pics/action/ts-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/player/trans/ride-male.mp4"],
    "ride-female":["pics/action/ts-ride-female.mp4"],
    "ride-ts":["pics/action/ts-ride-ts.mp4"],
    "fucked-by-male":["pics/action/male-fuck-ts.mp4"],
    "fucked-by-female":["pics/player/trans/fucked-by-female.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male":["pics/action/male-fuck-ts.mp4"],
    "ass-fucked-by-female":["pics/player/trans/fucked-by-female.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-ts.mp4"],
    "fucked-by-female-doggy":["pics/player/trans/fucked-by-female.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-ts.mp4"],
    "ass-fucked-by-female-doggy":["pics/player/trans/fucked-by-female.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "fuck-male":["pics/action/ts-fuck-male.mp4"],
    "fuck-female":["pics/action/ts-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/ts-fuck-female.mp4"],
    "fuck-ts":["pics/action/ts-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/ts-squirt.mp4"],
    "cum-on-face":["pics/player/trans/cum-on-face.mp4"],
    "cum-in-mouth":["pics/player/trans/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/player/trans/cum-on-chest.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/ts-creampie.mp4"],
    "creampie-anal":["pics/action/ts-creampie.mp4"],
    "orgasm":["pics/action/ts-squirt.mp4"]
};
/* twine-user-script #44: "imgPlayerTransDom.js" */
setup.imgPlayerTransDomDefault = {
    "version":16,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/player/transdom/default.jpg"],
    "portrait":["pics/profile/TransDom.jpg"],
    "tf":["pics/player/transdom/tf.jpg"],
    "bed":["pics/player/transdom/tf.jpg"],
    "cum-covered":["pics/player/trans/cum-covered.jpg"],
    "spread":["pics/action/ts-spread-ass.jpg"],
    "spread-ass":["pics/action/ts-spread-ass.jpg"],
    "flash":["pics/player/female/flash.jpg"],
    "toy-ass":["pics/action/anal-dildo.mp4"],
    "fingered":["pics/action/fingering-ass.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/action/female-suck-male.mp4"],
    "suck-female":["pics/player/trans/suck-female.mp4"],
    "suck-ts":["pics/action/female-suck-ts.mp4"],
    "handjob-male":["pics/action/female-handjob-male.mp4"],
    "handjob-ts":["pics/action/female-handjob-ts.mp4"],
    "sucked-by-male":["pics/action/male-suck-ts.mp4"],
    "sucked-by-female":["pics/action/female-suck-ts.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-ts.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-rim-ts.mp4"],
    "eaten-by-female":["pics/action/female-rim-ts.mp4"],
    "eaten-by-ts":["pics/action/female-rim-ts.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/ts-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-ts.mp4"],
    "spitroast-mm":["pics/action/ts-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/action/ts-ride-male.mp4"],
    "ride-female":["pics/action/ts-ride-female.mp4"],
    "ride-ts":["pics/action/ts-ride-ts.mp4"],
    "fucked-by-male":["pics/action/male-fuck-ts.mp4"],
    "fucked-by-female":["pics/player/trans/fucked-by-female.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male":["pics/action/male-fuck-ts.mp4"],
    "ass-fucked-by-female":["pics/player/trans/fucked-by-female.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-ts.mp4"],
    "fucked-by-female-doggy":["pics/player/trans/fucked-by-female.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-ts.mp4"],
    "ass-fucked-by-female-doggy":["pics/player/trans/fucked-by-female.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "fuck-male":["pics/action/ts-fuck-male.mp4"],
    "fuck-female":["pics/action/ts-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/ts-fuck-female.mp4"],
    "fuck-ts":["pics/action/ts-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/action/female-kiss-female.mp4"],
    "kiss-ts":["pics/action/female-kiss-female.mp4"],
    "squirt":["pics/action/ts-squirt.mp4"],
    "cum-on-face":["pics/player/transdom/cum-on-face.mp4"],
    "cum-in-mouth":["pics/action/female-oral-creampie.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/ts-creampie.mp4"],
    "creampie-anal":["pics/action/ts-creampie.mp4"],
    "orgasm":["pics/action/ts-squirt.mp4"]
};
/* twine-user-script #45: "imgSophie.js" */
setup.imgSophieDefault={
    "version":1,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/sophie/outfits/default.jpg","pics/sophie/outfits/default-2.jpg","pics/sophie/outfits/default-3.jpg"],
    "default-pro":["pics/sophie/outfits/default-pro.jpg"],
    "default-note":["pics/sophie/notes/default-note.jpg"],
    "sophie-orange":["pics/sophie/outfits/orange.jpg","pics/sophie/outfits/orange-2.jpg","pics/sophie/outfits/orange-3.jpg"],
    "sophie-orange-pro":["pics/sophie/outfits/orange-pro.jpg"],
    "sophie-orange-note":["pics/sophie/notes/orange-note.jpg"],
    "sophie-green":["pics/sophie/outfits/green.jpg","pics/sophie/outfits/green-2.jpg","pics/sophie/outfits/green-3.jpg"],
    "sophie-green-pro":["pics/sophie/outfits/green-pro.jpg"],
    "sophie-green-note":["pics/sophie/notes/green-note.jpg"],
    "sophie-teacher":["pics/sophie/outfits/teacher.jpg","pics/sophie/outfits/teacher-2.jpg","pics/sophie/outfits/teacher-3.jpg"],
    "sophie-teacher-pro":["pics/sophie/outfits/teacher-pro.jpg"],
    "sophie-teacher-note":["pics/sophie/notes/teacher-note.jpg"],
    "sophie-jeans":["pics/sophie/outfits/jeans.jpg","pics/sophie/outfits/jeans-2.jpg","pics/sophie/outfits/jeans-3.jpg"],
    "sophie-jeans-pro":["pics/sophie/outfits/jeans-pro.jpg"],
    "sophie-jeans-note":["pics/sophie/notes/jeans-note.jpg"],
    "sophie-bikini":["pics/sophie/outfits/bikini.jpg","pics/sophie/outfits/bikini-2.jpg","pics/sophie/outfits/bikini-3.jpg"],
    "sophie-bikini-pro":["pics/sophie/outfits/bikini-pro.jpg"],
    "sophie-bikini-note":["pics/sophie/notes/bikini-note.jpg"],
    "sophie-fishnet":["pics/sophie/outfits/fishnet.jpg","pics/sophie/outfits/fishnet-2.jpg","pics/sophie/outfits/fishnet-3.jpg"],
    "sophie-fishnet-pro":["pics/sophie/outfits/fishnet-pro.jpg"],
    "sophie-fishnet-note":["pics/sophie/notes/fishnet-note.jpg"],
    "sophie-military":["pics/sophie/outfits/military.jpg","pics/sophie/outfits/military-2.jpg","pics/sophie/outfits/military-3.jpg"],
    "sophie-military-pro":["pics/sophie/outfits/military-pro.jpg"],
    "sophie-military-note":["pics/sophie/notes/military-note.jpg"],
    "sophie-nekkid":["pics/sophie/outfits/nekkid.jpg","pics/sophie/outfits/nekkid-2.jpg","pics/sophie/outfits/nekkid-3.jpg"],
    "sophie-nekkid-pro":["pics/sophie/outfits/nekkid-pro.jpg"],
    "sophie-nekkid-note":["pics/sophie/notes/nekkid-note.jpg"],
    "topless":["pics/sophie/topless.jpg"],
    "bed":["pics/sophie/bed.jpg"],
    "phone-selfie":["pics/sophie/phone-selfie.jpg"],
    "phone-topless":["pics/sophie/phone-topless.jpg"],
    "phone-dom":["pics/sophie/phone-dom.jpg"],
    "phone-ready":["pics/sophie/phone-ready.jpg"],
    "phone-spread":["pics/sophie/phone-spread.jpg"],
    "strapon":["pics/sophie/strapon.jpg"],
    "flash1":["pics/sophie/flash1.jpg"],    
    "flash2":["pics/sophie/flash2.jpg"],
    "spread":["pics/sophie/spread.jpg"],
    "spread-ass":["pics/sophie/spread-ass.jpg"],
    "tease":["pics/sophie/tease1.mp4"],
    "doggy":["pics/sophie/doggy.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/sophie/eat-pussy.mp4"],
    "titfuck-give":["pics/sophie/titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/action/female-rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/sophie/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/sophie/blowjob.mp4"],
    "handjob-male":["pics/sophie/handjob.mp4"],
    "handjob-ts":["pics/sophie/handjob.mp4"],
    "sucked-by-male":["pics/action/male-suck-female.mp4"],
    "sucked-by-female":["pics/action/female-suck-female.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-female.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/sophie/eaten-by-female.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-female.mp4"],
    "spitroast-mm":["pics/action/female-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/sophie/riding.mp4"],
    "ride-female":["pics/sophie/riding.mp4"],
    "ride-ts":["pics/sophie/riding.mp4"],
    "fucked-by-male":["pics/sophie/fucked-by-male.mp4"],
    "fucked-by-female":["pics/sophie/fucked-by-female.mp4"],
    "fucked-by-ts":["pics/sophie/fucked-by-female.mp4"],
    "ass-fucked-by-male":["pics/sophie/assfuck-by-male-doggy.mp4","pics/sophie/assfuck-by-male-doggy2.mp4"],
    "ass-fucked-by-female":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts":["pics/sophie/assfuck-by-male-doggy.mp4","pics/sophie/assfuck-by-male-doggy2.mp4"],
    "fucked-by-male-doggy":["pics/sophie/fucked-by-male.mp4"],
    "fucked-by-female-doggy":["pics/action/female-fuck-female-doggy.mp4"],
    "fucked-by-ts-doggy":["pics/sophie/fucked-by-male.mp4"],
    "ass-fucked-by-male-doggy":["pics/sophie/assfuck-by-male-doggy.mp4","pics/sophie/assfuck-by-male-doggy2.mp4"],
    "ass-fucked-by-female-doggy":["pics/action/female-assfuck-female-doggy.mp4"],
    "ass-fucked-by-ts-doggy":["pics/sophie/assfuck-by-male-doggy.mp4","pics/sophie/assfuck-by-male-doggy2.mp4"],
    "fuck-male":["pics/action/female-fuck-male.mp4"],
    "fuck-female":["pics/action/female-fuck-female.mp4"],
    "fuck-female-strapon":["pics/action/female-fuck-strapon.mp4"],
    "fuck-ts":["pics/action/female-fuck-ts.mp4"],
    "kiss-male":["pics/action/female-kiss-male.mp4"],
    "kiss-female":["pics/sophie/kiss-female.mp4","pics/sophie/kiss-female2.mp4"],
    "kiss-ts":["pics/sophie/kiss-female.mp4","pics/sophie/kiss-female2.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/sophie/cum-on-face.mp4"],
    "cum-in-mouth":["pics/sophie/cum-in-mouth.mp4","pics/sophie/cum-in-mouth2.mp4"],
    "cum-on-chest":["pics/sophie/cum-on-chest.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/creampie-female.mp4"],
    "creampie-anal":["pics/action/anal-creampie-female.mp4"],
    "orgasm":["pics/action/female-squirt.mp4"]
};
/* twine-user-script #46: "imgTasha.js" */
setup.imgTashaDefault = {
    "version":15,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/tasha/outfits/default.jpg","pics/tasha/outfits/default-2.jpg","pics/tasha/outfits/default-3.jpg"],
    "default-pro":["pics/tasha/outfits/default-pro.jpg"],
    "default-note":["pics/tasha/notes/default-note.jpg"],
    "tasha-pearlBlouse":["pics/tasha/outfits/pearlBlouse.jpg","pics/tasha/outfits/pearlBlouse-2.jpg","pics/tasha/outfits/pearlBlouse-3.jpg"],
    "tasha-pearlBlouse-pro":["pics/tasha/outfits/pearlBlouse-pro.jpg"],
    "tasha-pearlBlouse-note":["pics/tasha/notes/pearlBlouse-note.jpg"],
    "tasha-denimSkirt":["pics/tasha/outfits/denimSkirt.jpg","pics/tasha/outfits/denimSkirt-2.jpg","pics/tasha/outfits/denimSkirt-3.jpg"],
    "tasha-denimSkirt-pro":["pics/tasha/outfits/denimSkirt-pro.jpg"],
    "tasha-denimSkirt-note":["pics/tasha/notes/denimSkirt-note.jpg"],
    "tasha-dress":["pics/tasha/outfits/dress.jpg","pics/tasha/outfits/dress-2.jpg","pics/tasha/outfits/dress-3.jpg"],
    "tasha-dress-pro":["pics/tasha/outfits/dress-pro.jpg"],
    "tasha-dress-note":["pics/tasha/notes/dress-note.jpg"],
    "tasha-pinkShorts":["pics/tasha/outfits/pinkShorts.jpg","pics/tasha/outfits/pinkShorts-2.jpg","pics/tasha/outfits/pinkShorts-3.jpg"],
    "tasha-pinkShorts-pro":["pics/tasha/outfits/pinkShorts-pro.jpg"],
    "tasha-pinkShorts-note":["pics/tasha/notes/pinkShorts-note.jpg"],
    "tasha-schoolSkirt":["pics/tasha/outfits/schoolSkirt.jpg","pics/tasha/outfits/schoolSkirt-2.jpg","pics/tasha/outfits/schoolSkirt-3.jpg"],
    "tasha-schoolSkirt-pro":["pics/tasha/outfits/schoolSkirt-pro.jpg"],
    "tasha-schoolSkirt-note":["pics/tasha/notes/schoolSkirt-note.jpg"],
    "tasha-summerBikini":["pics/tasha/outfits/summerBikini.jpg","pics/tasha/outfits/summerBikini-2.jpg","pics/tasha/outfits/summerBikini-3.jpg"],
    "tasha-summerBikini-pro":["pics/tasha/outfits/summerBikini-pro.jpg"],
    "tasha-summerBikini-note":["pics/tasha/notes/summerBikini-note.jpg"],
    "tasha-sheerDress":["pics/tasha/outfits/sheerDress.jpg","pics/tasha/outfits/sheerDress-2.jpg","pics/tasha/outfits/sheerDress-3.jpg"],
    "tasha-sheerDress-pro":["pics/tasha/outfits/sheerDress-pro.jpg"],
    "tasha-sheerDress-note":["pics/tasha/notes/sheerDress-note.jpg"],
    "tasha-whiteStockings":["pics/tasha/outfits/whiteStockings.jpg","pics/tasha/outfits/whiteStockings-2.jpg","pics/tasha/outfits/whiteStockings-3.jpg"],
    "tasha-whiteStockings-pro":["pics/tasha/outfits/whiteStockings-pro.jpg"],
    "tasha-whiteStockings-note":["pics/tasha/notes/whiteStockings-note.jpg"],
    "tasha-nekkid":["pics/tasha/outfits/nekkid.jpg","pics/tasha/outfits/nekkid-2.jpg","pics/tasha/outfits/nekkid-3.jpg"],
    "tasha-nekkid-pro":["pics/tasha/outfits/nekkid-pro.jpg"],
    "tasha-nekkid-note":["pics/tasha/notes/nekkid-note.jpg"],
    "phone1":["pics/tasha/phone1.jpg"],
    "date":["pics/tasha/date.jpg"],
    "strip":["pics/tasha/strip.jpg"],
    "bimbo1":["pics/tasha/bimbo1.jpg"],
    "bimbo2":["pics/tasha/bimbo2.jpg"],
    "skirt-bulge":["pics/tasha/skirt-bulge.jpg"],
    "bed":["pics/tasha/bed.jpg"],
    "wedding":["pics/tasha/wedding.jpg"],
    "spread":["pics/action/ts-spread-ass.jpg"],
    "spread-ass":["pics/action/ts-spread-ass.jpg"],
    "topless":["pics/tasha/topless.jpg"],
    "flash":["pics/player/female/flash.jpg"],
    "toy-ass":["pics/action/anal-dildo.mp4"],
    "solo":["pics/tasha/solo.mp4"],
    "fingered":["pics/action/fingering-ass.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/tasha/rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/tasha/blowjob.mp4"],
    "suck-female":["pics/action/ts-suck-female.mp4"],
    "suck-ts":["pics/tasha/blowjob.mp4"],
    "sucked-by-male":["pics/action/male-suck-ts.mp4"],
    "sucked-by-female":["pics/action/female-suck-ts.mp4"],
    "sucked-by-ts":["pics/action/ts-suck-ts.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-rim-ts.mp4"],
    "eaten-by-female":["pics/action/female-rim-ts.mp4"],
    "eaten-by-ts":["pics/action/female-rim-ts.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/ts-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-ts.mp4"],
    "spitroast-mm":["pics/action/ts-spitroast-mm.mp4"],
    "spitroast-mf":["pics/action/female-spitroast-mf.mp4"],
    "ride-male":["pics/action/ts-ride-male.mp4"],
    "ride-female":["pics/action/ts-ride-female.mp4"],
    "ride-ts":["pics/action/ts-ride-ts.mp4"],
    "fucked-by-male":["pics/action/male-fuck-ts.mp4"],
    "fucked-by-female":["pics/action/female-fuck-ts.mp4"],
    "fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male":["pics/action/male-fuck-ts.mp4"],
    "ass-fucked-by-female":["pics/tasha/fucked-by-female.mp4"],
    "ass-fucked-by-ts":["pics/action/ts-fuck-ts.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-ts.mp4"],
    "fucked-by-female-doggy":["pics/tasha/fucked-by-female.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-ts.mp4"],
    "ass-fucked-by-female-doggy":["pics/tasha/fucked-by-female.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-ts.mp4"],
    "fuck-male":["pics/tasha/fuck.mp4"],
    "fuck-female":["pics/tasha/fuck.mp4"],
    "fuck-female-strapon":["pics/tasha/fuck.mp4"],
    "fuck-ts":["pics/tasha/fuck.mp4"],
    "kiss-male":["pics/tasha/kiss-male.mp4"],
    "kiss-female":["pics/tasha/kiss-female.mp4"],
    "kiss-ts":["pics/tasha/kiss-female.mp4"],
    "squirt":["pics/action/ts-squirt.mp4"],
    "cum-on-face":["pics/tasha/cum-on-face.mp4"],
    "cum-in-mouth":["pics/tasha/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/tasha/cum-on-chest.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/ts-creampie.mp4"],
    "creampie-anal":["pics/action/ts-creampie.mp4"],
    "orgasm":["pics/tasha/orgasm.mp4"]
};
/* twine-user-script #47: "imgTashaPussy.js" */
setup.imgTashaPussyDefault = {
    "version":15,
    "name":"Default",
    "allowRandom":true,
    "isPhoto":true,
    "default":["pics/tasha/outfits/default.jpg","pics/tasha/outfits/default-2.jpg","pics/tasha/outfits/default-3.jpg"],
    "default-pro":["pics/tasha/outfits/default-pro.jpg"],
    "default-note":["pics/tasha/notes/default-note.jpg"],
    "tasha-pearlBlouse":["pics/tasha/outfits/pearlBlouse.jpg","pics/tasha/outfits/pearlBlouse-2.jpg","pics/tasha/outfits/pearlBlouse-3.jpg"],
    "tasha-pearlBlouse-pro":["pics/tasha/outfits/pearlBlouse-pro.jpg"],
    "tasha-pearlBlouse-note":["pics/tasha/notes/pearlBlouse-note.jpg"],
    "tasha-denimSkirt":["pics/tasha/outfits/denimSkirt.jpg","pics/tasha/outfits/denimSkirt-2.jpg","pics/tasha/outfits/denimSkirt-3.jpg"],
    "tasha-denimSkirt-pro":["pics/tasha/outfits/denimSkirt-pro.jpg"],
    "tasha-denimSkirt-note":["pics/tasha/notes/denimSkirt-note.jpg"],
    "tasha-dress":["pics/tasha/outfits/dress.jpg","pics/tasha/outfits/dress-2.jpg","pics/tasha/outfits/dress-3.jpg"],
    "tasha-dress-pro":["pics/tasha/outfits/dress-pro.jpg"],
    "tasha-dress-note":["pics/tasha/notes/dress-note.jpg"],
    "tasha-pinkShorts":["pics/tasha/outfits/pinkShorts.jpg","pics/tasha/outfits/pinkShorts-2.jpg","pics/tasha/outfits/pinkShorts-3.jpg"],
    "tasha-pinkShorts-pro":["pics/tasha/outfits/pinkShorts-pro.jpg"],
    "tasha-pinkShorts-note":["pics/tasha/notes/pinkShorts-note.jpg"],
    "tasha-schoolSkirt":["pics/tasha/outfits/schoolSkirt.jpg","pics/tasha/outfits/schoolSkirt-2.jpg","pics/tasha/outfits/schoolSkirt-3.jpg"],
    "tasha-schoolSkirt-pro":["pics/tasha/outfits/schoolSkirt-pro.jpg"],
    "tasha-schoolSkirt-note":["pics/tasha/notes/schoolSkirt-note.jpg"],
    "tasha-summerBikini":["pics/tasha/outfits/summerBikini.jpg","pics/tasha/outfits/summerBikini-2.jpg","pics/tasha/outfits/summerBikini-3.jpg"],
    "tasha-summerBikini-pro":["pics/tasha/outfits/summerBikini-pro.jpg"],
    "tasha-summerBikini-note":["pics/tasha/notes/summerBikini-note.jpg"],
    "tasha-sheerDress":["pics/tasha/outfits/sheerDress.jpg","pics/tasha/outfits/sheerDress-2.jpg","pics/tasha/outfits/sheerDress-3.jpg"],
    "tasha-sheerDress-pro":["pics/tasha/outfits/sheerDress-pro.jpg"],
    "tasha-sheerDress-note":["pics/tasha/notes/sheerDress-note.jpg"],
    "tasha-whiteStockings":["pics/tasha/outfits/whiteStockings.jpg","pics/tasha/outfits/whiteStockings-2.jpg","pics/tasha/outfits/whiteStockings-3.jpg"],
    "tasha-whiteStockings-pro":["pics/tasha/outfits/whiteStockings-pro.jpg"],
    "tasha-whiteStockings-note":["pics/tasha/notes/whiteStockings-note.jpg"],
    "tasha-nekkid":["pics/tasha/outfits/nekkid.jpg","pics/tasha/outfits/nekkid-2.jpg","pics/tasha/outfits/nekkid-3.jpg"],
    "tasha-nekkid-pro":["pics/tasha/outfits/nekkid-pro.jpg"],
    "tasha-nekkid-note":["pics/tasha/pussy/nekkid-note.jpg"],
    "phone1":["pics/tasha/phone1.jpg"],
    "date":["pics/tasha/date.jpg"],
    "bimbo1":["pics/tasha/bimbo1.jpg"],
    "bimbo2":["pics/tasha/bimbo2.jpg"],
    "bed":["pics/tasha/bed.jpg"],
    "wedding":["pics/tasha/wedding.jpg"],
    "spread":["pics/tasha/pussy/spread.jpg"],
    "topless":["pics/tasha/topless.jpg"],
    "toy-ass":["pics/action/anal-dildo.mp4"],
    "solo":["pics/tasha/pussy/solo.mp4"],
    "fingered":["pics/action/fingering.mp4"],
    "ass-fingered":["pics/action/fingering-ass.mp4"],
    "eat-pussy":["pics/action/female-eat-pussy.mp4"],
    "titfuck-give":["pics/action/female-titfuck.mp4"],
    "rim-male":["pics/action/female-rim-male.mp4"],
    "rim-female":["pics/tasha/rim-female.mp4"],
    "rim-ts":["pics/action/female-rim-ts.mp4"],
    "suck-male":["pics/tasha/blowjob.mp4"],
    "suck-female":["pics/action/female-suck-female.mp4"],
    "suck-ts":["pics/tasha/blowjob.mp4"],
    "sucked-by-male":["pics/action/male-eat-pussy.mp4"],
    "sucked-by-female":["pics/action/female-eat-pussy.mp4"],
    "sucked-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "deepthroat-male":["pics/action/female-suck-male.mp4"],
    "deepthroat-female":["pics/action/strapon-deepthroat.mp4"],
    "deepthroat-ts":["pics/action/female-suck-ts.mp4"],
    "eaten-by-male":["pics/action/male-eat-pussy.mp4"],
    "eaten-by-female":["pics/action/female-eat-pussy.mp4"],
    "eaten-by-ts":["pics/action/ts-eat-pussy.mp4"],
    "facesit-female":["pics/action/female-facesit-female.mp4"],
    "facesit-male":["pics/action/female-facesit-male.mp4"],
    "facesit-ts":["pics/action/female-facesit-ts.mp4"],
    "ride-male":["pics/tasha/pussy/cowgirl.mp4"],
    "ride-female":["pics/action/female-ride-female.mp4"],
    "ride-ts":["pics/tasha/pussy/cowgirl.mp4"],
    "fucked-by-male":["pics/tasha/pussy/fucked-by-male.mp4"],
    "fucked-by-female":["pics/action/female-fuck-female.mp4"],
    "fucked-by-ts":["pics/tasha/pussy/fucked-by-male.mp4"],
    "ass-fucked-by-male":["pics/tasha/pussy/ass-fucked-by-male.mp4"],
    "ass-fucked-by-female":["pics/tasha/fucked-by-female.mp4"],
    "ass-fucked-by-ts":["pics/tasha/pussy/ass-fucked-by-male.mp4"],
    "fucked-by-male-doggy":["pics/action/male-fuck-female.mp4"],
    "fucked-by-female-doggy":["pics/tasha/fucked-by-female.mp4"],
    "fucked-by-ts-doggy":["pics/action/ts-fuck-female.mp4"],
    "ass-fucked-by-male-doggy":["pics/action/male-fuck-female.mp4"],
    "ass-fucked-by-female-doggy":["pics/tasha/fucked-by-female.mp4"],
    "ass-fucked-by-ts-doggy":["pics/action/ts-fuck-female.mp4"],
    "fuck-male":["pics/tasha/fuck.mp4"],
    "fuck-female":["pics/tasha/fuck.mp4"],
    "fuck-female-strapon":["pics/tasha/fuck.mp4"],
    "fuck-ts":["pics/tasha/fuck.mp4"],
    "kiss-male":["pics/tasha/kiss-male.mp4"],
    "kiss-female":["pics/tasha/kiss-female.mp4"],
    "kiss-ts":["pics/tasha/kiss-female.mp4"],
    "squirt":["pics/action/female-squirt.mp4"],
    "cum-on-face":["pics/tasha/cum-on-face.mp4"],
    "cum-in-mouth":["pics/tasha/cum-in-mouth.mp4"],
    "cum-on-chest":["pics/tasha/cum-on-chest.mp4"],
    "cum-on-ass":["pics/action/cum-on-ass.mp4"],
    "cum-on-back":["pics/action/cum-on-back-female.mp4"],
    "oral-creampie":["pics/action/female-oral-creampie.mp4"],
    "creampie":["pics/action/female-creampie.mp4"],
    "creampie-anal":["pics/action/female-creampie.mp4"],
    "orgasm":["pics/tasha/orgasm.mp4"]
};
/* twine-user-script #48: "defineBackgrounds.js" */
// Scripts pertaining to the age, background, and images for pit slaves

const AGES = ["Teen","Young Adult","Adult","Mature"];
const BACKGROUNDS = [
    ["female","Teen","Sugar Baby"],
    ["female","Teen","Teenage Mother"],
    ["female","Teen","Teenage Prostitute"],
    ["female","Teen","Teenage Runaway"],
    ["female","Teen","Teenage Thief"],
    ["female","Young Adult","College Student"],
    ["female","Young Adult","Low Class Escort"],
    ["female","Young Adult","Stripper"],
    ["female","Young Adult","Influencer"],
    ["female","Adult","Executive Assistant"],
    ["female","Adult","Highschool Teacher"],
    ["female","Adult","High Class Escort"],
    ["female","Adult","Porn Star"],
    ["female","Mature","Housewife"],
    ["female","Mature","Mature Escort"],
    ["female","Mature","Business CEO"],
    ["female","Mature","Mother"],
    ["ts","Teen","Sugar Baby"],
    ["ts","Teen","Teenage Prostitute"],
    ["ts","Teen","Teenage Runaway"],
    ["ts","Teen","Teenage Thief"],
    ["ts","Young Adult","College Student"],
    ["ts","Young Adult","Low Class Escort"],
    ["ts","Young Adult","Stripper"],
    ["ts","Young Adult","Influencer"],
    ["ts","Adult","Executive Assistant"],
    ["ts","Adult","Highschool Teacher"],
    ["ts","Adult","High Class Escort"],
    ["ts","Adult","Porn Star"],
    ["ts","Mature","Housewife"],
    ["ts","Mature","Mature Escort"],
    ["ts","Mature","Business CEO"],
    ["ts","Mature","Mother"],
    ["male","Teen","High School Sports Star"],
    ["male","Teen","Teen Delinquent"],
    ["male","Teen","Teen Thief"],
    ["male","Teen","Teen Prostitute"],
    ["male","Young Adult","University Student"],
    ["male","Young Adult","Newbie Worker"],
    ["male","Young Adult","Heavy Clubgoer"],
    ["male","Young Adult","Streamer"],
    ["male","Adult","Average Salaryman"],
    ["male","Adult","Trophy Husband"],
    ["male","Adult","Pickup Artist"],
    ["male","Adult","Male Porn Star"],
    ["male","Mature","Politician"],
    ["male","Mature","Mature Male Escort"],
    ["male","Mature","Business CIO"],
    ["male","Mature","Father"],
    ["lauren","Special","Company Traitor"],
    ["sarina","Special","Julia's Husband"],
    ["jag","Special","Former Driver"],
    ["elsa","Special","Your Cousin"],
];

// Set the age of a slave from the AGES array
function setAge(slave, age) {
    if (age !== "random") {
        slave.age = age;
    } else {
        slave.age = randomItem(AGES);
    };
};

// Set the background of a slave from the BACKGROUNDS array based on slave's age
function setBackground(slave) {
    //Make special cases for specific slaves
    if (slave.id.contains("lauren")) {
        slave.background = "Company Traitor";
        slave.age = "Adult";
        return;
    } else if (slave.id.contains("sarina")) {
        slave.background = "Julia's Husband";
        slave.age = "Mature";
        return;
    } else if (slave.id.contains("jag")) {
        slave.background = "Former Driver";
        slave.age = "Adult";
        return;
    } else if (slave.id.contains("elsa")) {
        slave.background = "Your Cousin";
        slave.age = "Teen";
        return;
    };
    
    // Set background based on age and gender if not a special case
    slave.background = randomItem(BACKGROUNDS.filter(bg => bg[1] == slave.age && bg[0] == slave.gender))[2];
};

// Set the image of a slave based on their age and background
function setImage(slave) {
    var age = slave.age;
    var gender = slave.gen;
    var hair = slave.hairColor;
    
    if (age == "Young Adult") {age = "Adult"};
    age = age.toLowerCase();

    return (`${gender}-${age}-${hair}`);
};

// Set the image index based on the slave's selected image
function setImageIndex(slave) {
    // Put slaves and slave imgdb into variables
    var img = slave.img;
    var pitSlaveImg = variables().thepit.img[img];
    var imgIndex = 0;

    // Return a random number based on the length of pitSlaveImg
    if (pitSlaveImg.length > 1) {
        imgIndex = Math.floor(Math.random() * pitSlaveImg.length);
    };

    return imgIndex;
};

// Generate a description for the slave based on their age and background
function setDescription(s) {
    // Define array to store description and reason possibilities
    var desc = [];
    var reason = [];

    switch (s.background) {
        case "Sugar Baby":
            desc = [
                `${s.name} was a spoiled sugarbaby, regularly using her charm to get whatever she wanted from older men. `,
                `${s.name} started sugaring just out of highschool in an effort to make ends meet for her family. `,
                `${s.name} was addicted to sex in highschool, and soon realized she could make a lot of money acting like old men's girlfriends. `
            ];
            reason = [
                `She was caught running up one of her sugar daddy's credit cards, and was sold to The Company to make up for lost finances.`,
                `After refusing one of her sugar daddy's more depraved wishes, she ended up being drugged, raped, and sold to The Company.`,
                `After one of her more possessive sugar daddies caught her "cheating" on him with her boyfriend, she was kidnapped and sold to The Company.`
            ]
            break;
        case "Teenage Mother":
        	desc = [
        		`${s.name} got involved with the highschool quarterback, ending up pregnant at 18. `,
        		`${s.name} ended up pregnant as a highschool senior, after discovering her sexuality at a church function. `,
        		`After getting drunk at a college party, ${s.name} woke up naked next to her brother, and would later learn she was carrying his baby. `
        	]
        	reason = [
        		`For fear of others finding out, ${s.name} was quietly sold to The Company by her own family. `,
        		`In an act of desperation, ${s.name} foolishly signed a contract ensuring the baby would be taken care of, in exchange for her freedom and humanity. `,
        		`Out of anger and fear, the child's father set up ${s.name} to be kidnapped and enslaved by The Company. `
        	]
            break;
        case "Teenage Prostitute":
        	desc = [
        		`After discovering her sexuality, ${s.name} started selling herself to anyone will to pay for her body. `,
        		`In an effort to help her struggling family, ${s.name} started selling her body to older men. `,
                `As a sexual deviant in highschool, ${s.name} found she could profit off her hobbies by charging older men to fuck her. `
        	]
            reason = [
                `When she accidentally found documents incriminating one of her richer clients, she was kidnapped and sold to The Company. `,
                `One of her clients, unfortunately, happened to work for The Company. After he took a liking to her, she was brought in and sold off. `,
                `After failing to meet one of her more depraved client's demands, she was drugged and sold off to The Company. `
            ]
            break;
        case "Teenage Runaway":
            desc = [
                `After a huge falling out with her family over petty nonsense, ${s.name} decided to pack her bags and try living on her own. `,
                `Bored with life, ${s.name} decided to pack her bags and head off into the world on her own. `,
                `After the death of her mother, ${s.name} couldn't stand to be in the same house as her abusive father, so she ran away. `,
                `Disgusted by the cruel way her parents ran the family business and exploited their workers, ${s.name} abandoned her wealthy family after a heated argument and ran away to start a fresh life. `,
                `Although ${s.name} loved her parents, they could barely afford to take care of themselves, let alone her, so she ran away against their wishes, hoping her absence would make their lives better. `,
            ]
            reason = [
                `An enterprising older man took the vulnerable and homeless ${s.name} in, pretending that she wanted to offer her a place to rest for the night, only to sell her to The Company.`,
                `As it turns out, Company-owned buildings are not safe places to sleep outside of; she was kidnapped in her sleep with relative ease.`,
                `${s.name} was desperate for money, so she applied to a photography gig that promised decent pay; unfortunately, it was secretly a slave kidnapping operation.`,
            ]
            break;
        case "Teenage Thief":
            desc = [
                `Wanting to help support her impoverished family, ${s.name} started stealing whenever she saw an opportunity. `,
                `In high school, ${s.name} had a dream; to make enormous piles of cash. And the most convenient way to get it was to break into houses in that wealthy neighborhood over there. `,
                `${s.name} was bored out of her mind throughout high school. By her senior year, she took up pickpocketing solely to feel some thrills in life. `,
            ]
            reason = [
                `${s.name} made one big mistake, and that mistake was stealing from a Company employee and getting caught, drugged, and sold off.`,
                `She was soon caught stealing, and the police got involved. A corrupt officer took the opportunity to sell the girl off to The Company and pretend that she ran away from the law.`,
                `Eventually, she joined a gang of thieves in the hopes of making even more money, but she was repulsed when she discovered their drug dealing side hustle. She got into an argument with the other gang members, and they decided to knock her out and sell her to the company for a quick buck rather than risk her going to the police.`,
            ]
            break;
        case "College Student":
            desc = [
                `Although she didn't qualify for many scholarships, ${s.name} was still able to get into a decent university by taking more than a few student loans. `,
                `A mix of good grades, family wealth, and nepotism allowed ${s.name} to get into one of the top universities in the country. `,
                `${s.name} wasn't thrilled by college, but she wanted to make her parents happy, so she went anyway. `,
            ]
            reason = [
                `She was unprepared for the rigors of college schoolwork, and her grades declined. Hoping to make some extra credit, she tried seducing one of the professors. Unfortunately, that professor was a Company agent, and it was easy for him to drug her and sell her off.`,
                `There was a huge party one night on campus, and she decided to get completely wasted. Another student desperate for cash took advantage of her condition and led her away from campus. The next morning, she woke up in Company custody.`,
                `One thing led to another, and ${s.name} wound up cheating on an exam. Her professor blackmailed her into becoming his personal plaything, then when he got bored of her, he sold her off to The Company.`,
            ]
            break;
        case "Low Class Escort":
            desc = [
                `After being in a few miserable jobs, ${s.name} found that prostitution was the one thing she felt she was valued in, so she decided to make it her career. `,
                `${s.name} needed the money urgently, so it didn't matter that the pimp took eighty percent of what she earned; she signed on out of desperation. `,
                `If it weren't for the consistently godawful clients, ${s.name} would have liked being a prostitute. It paid the bills and getting pounded was sort of fun. `,
            ]
            reason = [
                `An unexpected medical emergency left her with a huge bill and crippling debt, so she took up shadier work out of desperation. Her luck turned against her again when one of those shady clients drugged and sold her to The Company.`,
                `One evening, a group of clients gangbanged her, and instead of paying as she expected them to, they decided to exploit her further by drugging her and selling her to The Company.`,
                `She was the favorite prostitute of a Company employee, but after his unexpected passing, ${s.name} was kidnapped just in case she had Company secrets.`,
            ]
            break;
        case "Stripper":
            desc = [
                `${s.name} signed up for a one night stripping gig as part of a dare, but had so much fun that she decided to make it her career. `,
                `${s.name} needed money but wasn't willing to become a prostitute, so she settled for becoming a stripper. Even though she didn't have a lot of enthusiasm for the job, she was an almost instant hit among clubgoers. `,
                `An unfortunate misunderstanding led to her accidentally applying to a stripper gig at a club instead of a bartending job as she planned. That was a confusing job interview, but she accepted the position anyway. `,
            ]
            reason = [
                `Her stripper work was peaceful for a while, until she got into a heated conflict with an influential and wealthy club visitor. The club owner decided that it was better to sell her to The Company than to lose his best customer.`,
                `The club was popular among Company staff, and when ${s.name} was caught eavesdropping on them discussing Company business, she was forcibly drugged and kidnapped.`,
                `There was a phone number on one of the dollar bills a clubgoer gave her, along with a promise of cash in exchange for a private dance. When she arrived at his house, she was assaulted by a gang of men, knocked unconscious, and sold off to The Company.`,
            ]
            break;
        case "Influencer":
            desc = [
                `After gaining a little internet fame from an incident known only as the Llama Event, ${s.name} quickly leveraged that to start a decently popular makeup tutorial channel. `,
                `When ${s.name} started a channel for her mediocre at best singing, she discovered that she had an impressive knack for marketing, and managed to get quite a few views and sponsorships on her channel. `,
                `${s.name} found it thrilling to post suggestive videos that were just barely within the terms of service, and so did her quickly growing audience. `,
            ]
            reason = [
                `Her videos eventually shifted towards conspiracy content, and she was almost about to publish a video exposing Company business when she was caught and kidnapped.`,
                `When she rejected a cyberstalker's advances, he eventually kidnapped her, had his way with her, and then disposed of her by selling her to The Company.`,
                `A wealthy Company client was willing to pay top dollar for his favorite influencer, so she was kidnapped and drugged; just before the sale, the client died of natural causes, and she remained in Company custody. `,
            ]
            break;
        case "Executive Assistant":
            desc = [
                `Through sheer luck, ${s.name} managed to get a job at a prestigious accounting firm as an executive assistant. `,
                `It took a lot of work, but ${s.name} eventually climbed through the corporate ranks to land a high paying secretary position. `,
                `When you seduce the owner of a large company, it's easy to get a job as their assistant; and ${s.name} was very good at seducing wealthy businessmen. `,
            ]
            reason = [
                `After taking a peek at some accounting records out of curiosity, she noticed that someone was siphoning money out of the company; before she could dig too deep, she was caught and then sold to The Company to keep her from exposing their secrets. `,
                `She sipped a drink at a corporate party one evening, felt woozy, and then passed out in her car. The next morning, she was in Company custody, and the man who drugged her was quite a bit wealthier.`,
                `However, she soon noticed several high ranking employees groping some of the female staff; when she was caught recording one of the incidents, she was kidnapped and sold to The Company to keep her quiet.`,
            ]
            break;
        case "High School Teacher":
            desc = [
                `Born with a love of teaching, ${s.name} did everything she could to become a teacher, and she enjoyed a decently prosperous career. `,
                `${s.name}'s own horrible experiences in high school led her to become a teacher in the hopes of preventing future teenagers from going through the same things she did. `,
                `${s.name} didn't originally want to become a teacher, but her husband insisted she go down that career path, so she did anyway. `,
            ]
            reason = [
                `After being laid off and forced to work at a new school, she instantly noticed the male staff exploiting female students and workers. Her concerns were dismissed, and when she threatened to go to the police, several other teachers kidnapped her in her home and sold her to The Company.`,
                `After a few students went missing, she decided to look into it. But when she found and confronted the kidnapper, she became a victim herself and was sold off to The Company.`,
                `She was extremely strict with her grades, making her unpopular among her students. One former student, angered by how some of his grades denied him a chance to attend his favorite college, decided to get revenge by kidnapping her and selling her to The Company.`,
            ]
            break;
        case "High Class Escort":
            desc = [
                `Having been raised among the city's wealthy elite, ${s.name} found that she could act in the ways a high class escort was expected to act, and she had the looks to back it up as well. `,
                `Originally an impoverished woman looking for extra cash, ${s.name} somehow bumbled her way into the most esteemed escort work in the city. `,
                `A wealthy investor and family friend once told ${s.name} that she would make a great escort; she laughed it off at the time, but eventually tried it out of curiosity and found great success. `,
            ]
            reason = [
                `One day, she got a request from a seemingly low class client who was offering a suspiciously high amount of money; her curiosity got the best of her, and when she arrived at his run down house, she was drugged and sold off to The Company.`,
                `After agreeing to be tied up and gagged as part of a BDSM roleplay, the client took the opportunity to throw the now helpless ${s.name} into a van and sell her to the company.`,
                `She soon got a bit too curious about one of her client's shady dealings with something called The Company, and after he got suspicious of her, he sold her off, letting her experience firsthand what The Company was.`,
            ]
            break;
        case "Porn Star":
            desc = [
                `${s.name}'s boyfriend wanted to make a porn video with her; she reluctantly agreed, and it became a smash hit. After she dumped him, she went on to take some more formal work as a porn star. `,
                `${s.name}'s friend once jokingly said that becoming a porn star would be easy money for someone with her looks, but when she fell on desperate circumstances, she soon found that it was indeed easy money, at least for someone like her. `,
                `Out of the blue one day, ${s.name} received a phone call offering a lot of money to star in a porn film. Against her better judgment, she accepted the offer, and it went surprisingly well. `,
            ]
            reason = [
                `The Company caught wind of both her success and her willingness to take on shady work, so it was easy for them to orchestrate a kidnapping with the hopes of selling her to one of her biggest fans.`,
                `After accidentally biting off someone's dick in a porn shoot gone horribly wrong, the male lead sought revenge and did so by drugging her as soon as she was alone and then selling her to The Company.`,
                `She signed up to be the lead of another porn film one day, only to discover that it was completely fake. There was a mob of men ready to drug, kidnap, and rape her, and then they sold her off to The Company once they were finished.`,
            ]
            break;
        case "Housewife":
            desc = [
                `${s.name} always wanted to settle down with a nice man, and her wish was eventually fulfilled. `,
                `When ${s.name} married the wealthy man of her dreams, she decided to take up a lot of hobbies. `,
                `${s.name}, wanting to have an easier life, seduced a well off individual and quit her job, leaving her with a lot of free time. `,
            ]
            reason = [
                `She soon became suspicious when her husband started spending much less time at home and returning late in the night or early in the morning, so she followed him from his workplace one evening, discovering his secret sex dungeon where he kept several women. She was caught snooping and then sold off to The Company.`,
                `Another woman got jealous of her gorgeous husband, so she kidnapped her and sold her off to The Company so that she could have a chance to seduce him.`,
                `Although her marriage was happy, a lack of children meant that she had very little to do, so she wound up doing urban exploration to relieve the boredom. Unfortunately, that abandoned building turned out to be one of The Company's facilities, and the building's security team subdued her and added her to their stock of slaves.`,
            ]
            break;
        case "Mature Escort":
            desc = [
                `${s.name} was paranoid that her looks would fade as she got older and that she would be undesirable as an escort, but she was proven wrong as the years went by; somehow she looked better than she did in her youth. `,
                `After showing up to a halloween party in a sexy witch outfit, a lot of the wealthy businessmen attending suggested that ${s.name} might be able to make a greater living as an escort, and she eventually tried it out. `,
                `${s.name} was divorced, bored, and horny as hell, so she decided to do escort work on the weekends. `,
            ]
            reason = [
                `Unfortunately, one of her clients followed her home one evening, then kidnapped her in her sleep and sold her off to The Company.`,
                `One day, she went to a wealthy client's apartment for the evening, only for him to slip tranquilizers into her whiskey and then sell her to The Company while she was unconscious.`,
                `She kept hearing about something called The Company, and started looking into it; she arranged to meet with an employee of The Company to learn more about the shady organization, but when she arrived at the meeting destination, he and a few other men simply kidnapped her.`,
            ]
            break;
        case "Business CEO":
            desc = [
                `${s.name} started her company from scratch, eventually carrying it to lofty heights after selling stock in a successful initial public offering. `,
                `As a businesswoman with a history of miracles, ${s.name} was brought into a failing company to revive it, with modest success.  `,
                `${s.name} was second in command of the company her husband owned. After he passed away, she was selected as the next CEO. `,
            ]
            reason = [
                `However, when misfortune befell her company, she wound up borrowing money from powerful criminal organizations to try and prevent the company from going under. When things got even worse and she was unable to repay them, they kidnapped her and sold her to The Company to recoup some of their money.`,
                `However, she had an unfortunate darker side; she sexually assaulted several employees and did everything she could to silence them. After quelling several scandals and defaming her accusers, a few other employees decided to take revenge by kidnapping her and selling her to The Company.`,
                `${s.name} was well aware of The Company from several of her shady past dealings, and decided to move her own corporation up by making several business deals with them. However, after leaking several of The Company's secrets to prostitutes she was sleeping with, she was abducted and added to their stock of slaves to send a message to other would-be leakers.`,
            ]
            break;
        case "Mother":
            desc = [
                `${s.name} was an average stay at home mom, and she was absolutely happy with taking care of the kids while her husband worked a typical 9-5 job. `,
                `Despite a shaky divorce, ${s.name} still managed to keep her kids well-fed and happy, although she did work days, meaning they had to develop some independence early on. `,
                `Although ${s.name} initially planned on just having one kid, she loved her so much that she wound up having a few more. The large family was hectic, but still enjoyable. `,
            ]
            reason = [
                `When she witnessed a gang trying to kidnap one of her college age daughters, she offered herself in her place so that her daughter could go free. Although ${s.name} didn't expect to be sold off to The Company, she is still satisfied with her decision to protect her daughter..`,
                `After her kids graduated high school and moved away, ${s.name} was left with a lot of time on her hands, and she was tempted to sleep around with other men while her husband was at work. Unfortunately, one of those men was looking for women to sell to The Company, and she became his next victim.`,
                `After her most recent baby was born, a crooked doctor took advantage of her vulnerable state to sedate ${s.name} and drag her away for delivery to The Company.`,
            ]
            break;
        case "High School Sports Star":
            desc = [
            `${s.name} grew up obsessed with sports, and when he got into high school, he immediately decided to go into football and had dreams of going pro one day. `,
            `Although ${s.name} was good at soccer and won quite a few games for his team, he was much more interested in his academic pursuits. `,
            `${s.name} wasn't terribly excited about baseball, but his parents forced him into it. However, despite a rocky start, he eventually discovered a love of the game within himself. `,
            ]
            reason = [
            `Near the end of his senior year, he was quite popular and flirted with quite a few of his fellow students, angering quite a few of their boyfriends in the process. After he banged someone's girlfriend, that someone got revenge by drugging him and selling him to The Company.`,
            `Young men with his kind of physique became more highly sought after in recent years, so The Company kidnapped him to increase their supply of male slaves.`,
            `One evening after a game, he went out drinking with some buddies, and he accidentally drank a drugged vodka meant for the girl in the corner. The opportunistic man who drugged it decided to kidnap ${s.name} instead and sell him off.`,
            ]
            break;
        case "Teen Delinquent":
            desc = [
            `${s.name} had no enthusiasm for school throughout his life, so he put in the bare minimum effort needed to keep himself from getting in trouble. `,
            `One of ${s.name}'s favorite things was skipping school to hang out with friends; not because he hated school, but because doing something forbidden with his friends felt great. `,
            `${s.name} went to one of the worst high schools in the state, so he took every possible excuse to not show up. His parents were sympathetic and helped him skip class when they could. `,
            ]
            reason = [
            `While skipping class and exploring some old warehouse, ${s.name} discovered very quickly that it was one of The Company's slave storage facilities. Just before he could escape to call the police, he was apprehended by security and added to their stock of slaves`,
            `Halfway through ${s.name}'s senior year, one of the of the teachers in his school was about to be fired if he didn't improve the average grade of his class; naturally, he decided to do this by kidnapping the worst scoring student and selling them to The Company, and that student happened to be ${s.name}.`,
            `${s.name} was enticed by a prostitute one evening and followed her to a secluded area; unfortunately, she was looking for extra cash and decided to drug him and sell him to The Company.`,
            ]
            break;
        case "Teen Thief":
            desc = [
            `${s.name} occasionally wanted some extra cash so he could have nice things in high school, so he stole money and valuables whenever he was certain he wouldn't be caught. `,
            `${s.name}'s family used to be well-off, but when their finances went downhill, he started stealing to try and save up cash to save his family in case things got worse. `,
            `An unfortunate incident left ${s.name} owing lots of money to a gang; he broke into houses and looted valuables to try and avoid the gang's wrath. `,
            ]
            reason = [
            `After stealing from a perverted older man, he was kidnapped in revenge, used for a few days, and then sold to The Company.`,
            `One day, he tried stealing from a gang, and he was caught, beaten, and sold off to The Company.`,
            `While sneaking around in what he thought was an empty office building, he overheard two people discussing some of The Company's business; he was caught eavesdropping and then taken into slavery to keep him quiet.`,
            ]
            break;
        case "Teen Prostitute":
            desc = [
            `Lots of people thought ${s.name} was good looking, so when he turned eighteen, he became a prostitute so that he could get extra cash for college. `,
            `After being kicked out on his eighteenth birthday, ${s.name} had to resort to prostitution to survive. `,
            `One day, ${s.name} came across a woman who mistook him for a male prostitute: money was money, so he accepted, and then he realized he might be able to make a living as a real prostitute. `,
            ]
            reason = [
            `When he took on a shady client and drank some wine with them after sex, he soon found out that it was drugged, and he was then sold off to The Company.`,
            `After accidentally injuring an influential client during a night gone horribly wrong, the pimp who he was working under sold him off to The Company as punishment.`,
            `After making a nice pile of money and storing it under his bed, another desperate prostitute tried to steal it. When he caught them and threatened to go to the police, the other prostitute knocked him out and sold him to The Company.`,
            ]
            break;
        case "University Student":
            desc = [
            `${s.name} had no idea what he wanted to major in, but he knew one thing; he was gonna have a good time in college! `,
            `${s.name} was at the top of his class in college, and he was hoping that his academic performance would land him an excellent career. `,
            `${s.name}'s parents pressured him to go into college, so he did. Thankfully, he managed to make some new friends and find a major he liked. `,
            ]
            reason = [
            `He got an email asking if he wanted to take part in an experiment on campus; when he followed the instructions and went to a shady alley at the edge of campus, he quickly found out it was fake, and he was knocked out by a gang and sold off to The Company.`,
            `When he got paired up with another student for a group project, they hated each other so much that they tried to get each other sold off to The Company. Through a miracle, they both succeeded at getting the other kidnapped.`,
            `Unfortunately, a paperwork mistake meant he didn't qualify for the good scholarships, so he had to resort to borrowing from shady gangs to pay for his education. When he couldn't pay them back, he was sold off to The Company.`,
            ]
            break;
        case "Newbie Worker":
            desc = [
            `After graduating high school, ${s.name} looked for whatever jobs he could, and was eventually hired at a fast food cashier. `,
            `The local hardware store was hiring, and ${s.name} knew the owner, so it was easy to get a job there after graduating. `,
            `Although the pay wasn't very good, ${s.name} absolutely loved working at the local theme park. `,
            ]
            reason = [
            `When his employer laid him off, he desperately looked for work wherever he could, but unfortunately lost his apartment and became homeless after burning through his meager savings. This made him an ideal target for The Company, who was looking to gather new slaves from the area.`,
            `However, when he overheard his boss discussing their shady side gig of selling people to The Company, he confronted him alone and threatened to go to the police. He was then sold to The Company.`,
            `On the way to work one day, his car broke down and he had to get a ride from a stranger. That stranger, unfortunately, then tied him up and sold him to The Company.`,
            ]
            break;
        case "Heavy Clubgoer":
            desc = [
            `${s.name} had a boring desk job, and to unwind, he would go out and party almost every night. `,
            `${s.name} had a thing for the strippers at the local club, so he visited the place every weekend. `,
            `Although the local club had a lot of women, ${s.name} mostly just went there so he could spend time with his friends, who loved going there more than he did. `,
            ]
            reason = [
            `One night, a stunningly beautiful woman at the club lured him out into the parking lot. When they were alone, she pulled a gun on him, kidnapped him, and then sold him off to The Company.`,
            `He had an unfortunate habit of not paying attention to his drinks, and one night, this got him drugged, taken aside, and then kidnapped and sold to The Company.`,
            `After witnessing a girl being kidnapped by a gang, he tried to rescue her, only to get captured and sold off to The Company instead of her.`,
            ]
            break;
        case "Streamer":
            desc = [
            `${s.name} was lucky enough to make videos on a game just before it got popular, so his channel became a huge success. `,
            `${s.name} was charming, witty, and good looking, so when he started posting film and game criticism online, people paid attention to his content. `,
            `${s.name} had no idea how or why his short meme video took off and got millions of views, but enough people stuck around for him to make a living off it. `,
            ]
            reason = [
            `He somehow wound up with a horde of cyber-stalkers: one of them was crazy enough to kidnap him, have her way with him, and then sell him off to The Company in anger after he didn't show enthusiasm for her.`,
            `Fame unfortunately brought out all of his worst traits, and after sexually assaulting someone who happened to be an employee of The Company, he was kidnapped and enslaved as revenge.`,
            `He managed to enter a partnership with a much more popular influencer, but when he found out about her shady secrets and confronted her, she had him sold off to The Company to protect her image.`,
            ]
            break;
        case "Average Salaryman":
            desc = [
            `${s.name} landed a fairly well paying position at a local business, but it was one of the most boring things he had ever experienced. `,
            `${s.name} got his accounting job the same way he lost his virginity; by lying about his experience. `,
            `The tasks themselves at his old workplace were boring, but ${s.name} loved his job anyway due to his amazing coworkers. `,
            ]
            reason = [
            `After management grew more aggressive, ${s.name} openly advocated for unionization; this was so terrifying to upper management that they had him kidnapped and sold off to The Company.`,
            `Over the years, he started to learn more and more of the business's shady and illicit secrets, but kept quiet anyway. When the board of directors realized how much he knew, they had him sold off to The Company out of paranoia.`,
            `He gained the trust of a coworker who had ties to The Company; the moment he expressed his disgust and desire to go to the police, he was kidnapped and then sold off to The Company.`,
            ]
            break;
        case "Trophy Husband":
            desc = [
            `Having been a male model for a few years, ${s.name} eventually married a wealthy woman who was a fan of his. `,
            `${s.name} wanted to marry into wealth, and thankfully, that millionaire girl at the party wanted to marry a hot guy. It was a match made in heaven. `,
            `${s.name} used to be an ordinary pizza delivery guy, but when a rich heiress proposed to him on a whim due to his looks, he gladly accepted. `,
            ]
            reason = [
            `However, he soon discovered his new spouse was evading millions in taxes, and he did not want to go to prison for being complicit in them. She caught him attempting to contact the authorities over it, and had him sold off to The Company.`,
            `There was a sub-basement he was forbidden from entering; when he snuck in out of curiosity one day, he found a bunch of chained sex slaves that had been purchased from The Company. His wife was furious at his disobedience and had him sold off to The Company as an ironic punishment.`,
            `He was absolutely smitten with his new wife, but unfortunately, he was nothing more than a passing fancy to her. When she found a new favorite man, she sold ${s.name} off to The Company to get him
        out of the way as soon as possible.`,
            ]
            break;
        case "Pickup Artist":
            desc = [
            `${s.name} gradually grew obsessed with online pickup artist content, and he eventually worked up the courage to try it himself. `,
            `${s.name} thought of women as just disposable playthings, so the pickup artist lifestyle was perfect for him. `,
            `${s.name} wanted to have a harem of women he could phone up at any time for casual sex, and he was pretty good at gaslighting, so he took up pickup artistry. `,
            ]
            reason = [
            `He tried seducing a girl in a bar one day, thinking she would be an easy target, but he was surprised when she drugged him and sold him off to The Company.`,
            `After years of manipulating and exploiting women, several of them got together to punish him for his antics by kidnapping him and selling him to The Company.`,
            `At a bar one night, he hit on and groped a woman, unaware that the man sitting next to her was both his boyfriend and an employee of The Company. He was quickly kidnapped and added to The Company's stock of slaves as revenge.`,
            ]
            break;
        case "Male Porn Star":
            desc = [
            `With nice looks and a great dick, it was easy for ${s.name} to land some nice paying porn gigs. `,
            `${s.name} wanted to bang hot women, so he went into porn. Being on a set wasn't as fun, but at least the women were hot. `,
            `${s.name} decided to make some extra
        cash on the side by doing porn shoots with some local
        models. `,
            ]
            reason = [
            `A woman approached him with a lucrative porn gig, but when he accepted it and met her at the filming site, he was instead greeted by a gang of men who knocked him out and sold him off to The Company.`,
            `He unknowingly starred alongside a woman who was doing porn in secret to spite her husband, and when the husband found out, he had both his wife and ${s.name} kidnapped and sold off to The Company.`,
            `A wealthy businessman wanted him to star in a film
        with one of the sex slaves he bought from The Company; after learning that they were slaves and angrily refusing, he was forcibly drugged and sold off to The Company.`,
            ]
            break;
        case "Politician":
            desc = [
            `${s.name} started his political career trying to do good, but over the decades, politics gradually corrupted him and made him lose sight of his original
        goals. `,
            `${s.name} had lots of money and not much to do with it, so he decided to go into politics for fun. `,
            `${s.name} had a highly successful political career, mostly due to his willingness to use any despicable trick in the book to win. `,
            ]
            reason = [
            `After angering every other influential politician in the area through his antics, his opponents collectively decided that ${s.name} should be kidnapped and disposed of, and The Company was the perfect place to send him.`,
            `An activist with a profound hatred of everything ${s.name} stood for ambushed him on a walk one evening, kidnapped him, sold him to The Company, and donated the proceeds to charities opposed to his beliefs.`,
            `Eventually, he learned about The Company; they were too disgusting even for him to stand. He tried leaking their dealings to the public, but was almost immediately kidnapped by The Company's agents and then added to their stock of slaves.`,
            ]
            break;
        case "Mature Male Escort":
            desc = [
            `${s.name} discovered that there was indeed a market for his kind of look, so he happily let younger women pay him to have sexy times with him.`,
            `${s.name} was a male prostitute for most of his life, and his services only became more sought after with age. `,
            `${s.name} lived in an area with lots of rich women who wanted to pay for the “Daddy Experience”, so he decided to make extra cash by offering that. `,
            ]
            reason = [
            `After accidentally injuring a wealthy family's
        daughter during sex, they brutally punished him
        by kidnapping him and selling him off to The Company.`,
            `He heard about something called “The Company” from a client one night, and when he started looking into it, he was kidnapped and put into slavery before he could expose any of their secrets.`,
            `The rich girl who hired him one evening was much crazier than he thought, and she drugged him, tied him up, used him in every way imaginable for weeks, and then sold him off to The Company when she was finally done.`,
            ]
            break;
        case "Business CIO":
            desc = [
            `It took a long career, but ${s.name} managed to reach the top of the corporate ladder and become
        head of an entire company. `,
            `${s.name} was born into wealth, became wealthier through luck, and then bought a successful business that he was woefully underprepared to operate. `,
            `${s.name} inherited his father's company years ago, and he mostly left the business to its own devices as he reaped the rewards. `,
            ]
            reason = [
            `He had a fondness for buying slaves from
        The Company, but when he talked too openly about his dealings with The Company, he was kidnapped and enslaved himself as punishment.`,
            `Nobody else in the upper levels of the company liked him, so several of them hatched a plot to kidnap him and sell him off to The Company.`,
            `After committing several financial crimes and being
        caught, he concluded that his only option was to flee the country; unfortunately, the criminal contact he requested help from kidnapped him and sold him to The Company.`,
            ]
            break;
        case "Father":
            desc = [
            `${s.name} was a proud parent, and he did his best to work hard and make sure his kids were happy. `,
            `${s.name} originally didn't want kids and was terrified when his wife became pregnant, but as soon as he looked into his newborn son's eyes, he suddenly felt love and devotion wash over him. `,
            `${s.name} wanted to spend more time with his kids, but his career meant that he had to spend weeks at a time away from home. `,
            ]
            reason = [
            `When he saw a gang trying to sell drugs to his teenage children, he attempted to unleash his fatherly vengeance on them; after a fight, he was kidnapped and sold to The Company.`,
            `After being falsely diagnosed with a terminal illness, he resorted to crime so that he could leave his family with enough money to sustain them for years. Unfortunately, his criminal exploits led to him being beaten, abducted, and sold off to The Company by a rival gang.`,
            `His ambitious and scheming teenage daughter learned about the life insurance policy he had, so she cunningly faked his death while selling him off to The Company.`,
            ]
            break;
        case "Former Driver":
            desc = [`${variables().jag.name} was one of your former drivers. `]
            reason = [`Out of fear of being followed, you offered to use your TFM serum on him, turning him into a woman. Unfortunately, he found himself here in The Pit as a result. `]
            break;
        case "Company Traitor":
            desc = [`${variables().lauren.name} was sent to replace ${variables().diana.name} as the records clerk for your branch. `]
            reason = [`Once it was learned she was plotting to steal your branches's secrets, she was captured and sold to The Company. `]
            break;
        case "Your Cousin":
            desc = [`${variables().elsa.name} came to visit you for the holidays, and ended up staying for a few days. `]
            reason = [`On her way to the airport, you had her kidnapped and sold to The Company. Incidentally, she seems to be enjoying herself. `]
            break;
        case "Julia's Husband":
            desc = [`${variables().julia.name} was The Company's medical staffer for your branch. `]
            reason = [`After she was caught secretly killing other pitslaves, her husband was feminized by The Company and used as a pit slave. `]
            break;
    };

    // if either array came back as undefined, then we need to use the default description.
    if (desc.length == 0) {desc = [`Invalid description. `]};
    if (reason.length == 0) {reason = [`Invalid reason. `]};

    // Choose a random description and reason and return them as a string.
    s.history = (randomItem(desc) + randomItem(reason));
};

window.getSlaveHistory = function(s) {
    // Initialize dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg =  ``

    dlg += `${name} is ${s.getAge()} ${s.gender} with ${s.getHairLength()}, ${s.hairColor} hair. `;
    //TODO Add background dlg for installed pussy
    if (hasPerk(s, "Augmented Breasts")) {
        if (s.hasPussy) {
            dlg += `${He} has a pair of ${s.getBreastSize()} @@.sf;fake@@ breasts and `;
            if (hasPerk(s, "Get Pussy")) {
                dlg += `an artificial , functional pussy where ${his} penis used to be. `;
            } else {dlg += `a nice, shaved pussy. `};
        } else {
            if (hasPerk(s, "Castrated")) {
                dlg += `${He} has a pair of artificial ${s.getBreastSize()} breasts and a ${s.getPenisSize()} cock. ${His} ${s.getBallSize()} testicles were surgically removed, leaving ${him} unable to produce semen. `;
            } else if (hasPerk(s, "Feminized")) {
                dlg += `${He} has a pair of artificial ${s.getBreastSize()} breasts and a pair of ${s.getBallSize()} balls. ${His} ${s.getPenisSize()} penis was surgically removed, leaving ${him} unable to reach orgasm through conventional means. `;
            } else {
                dlg += `${He} has a pair of artificial ${s.getBreastSize()} breasts and a ${s.getPenisSize()} cock resting on a pair of ${s.getBallSize()} balls. `;
            };
        };
    } else {
        if (s.hasPussy) {
            if (s.hasBreasts) {
                dlg += `${He} has a pair of ${s.getBreastSize()} breasts and `;
            } else {
                dlg += `${He} has a flat chest and `;
            };
            if (hasPerk(s, "Get Pussy")) {
                dlg += `an artificial , functional pussy where ${his} penis used to be. `;
            } else {
                dlg += `a nice, shaved pussy. `;
            };
        } else if (gen == "ts") {
            if (s.hasBreasts) {
                dlg += `${He} has a pair of ${s.getBreastSize()} breasts and a ${s.getPenisSize()} cock resting on a pair of ${s.getBallSize()} balls. `;
            } else {
                dlg += `${He} has a flat chest and a ${s.getPenisSize()} cock resting on a pair of ${s.getBallSize()} balls. `;
            };
        } else {
            dlg += `${He} has a ${s.getPenisSize()} cock resting on a pair of ${s.getBallSize()} balls. `;
        };
    }

    dlg += `\n\n`;
    
    dlg += s.history + ` `;

    switch (s.trait.name) {
        case "Frigid":
            dlg += `Due to ${his} @@.bd;frigid@@ nature, ${name} has no real interest in sex at all, finding the activity completely unappealing. `;
            break;
        case "Bratty":
            dlg += `Due to ${his} @@.xxx;bratty@@ nature, ${name} has a tendancy to misbehave for attention, regardless of how harsh the punishments may be. `;
            break;
        case "Stubborn":
            dlg += `${name} has a tendancy to be @@.bd;stubborn@@ when it comes to getting ${him} to do what you want, requiring more motivation than others for similar results. `;
            break;
        case "Violent":
            dlg += `${name} in known to have @@.bd;violent@@ tendancies which make ${him} a good candidate for a dominant slave, however ${he} can also be quite unpredictable. `;
            break;
        case "Timid":
            dlg += `${name} has exhibited very @@.sf;timid@@ qualities, making ${him} the ideal sub, though extra training may be required to turn ${him} into a decent sex slave. `;
            break;
        case "Inexperienced":
            dlg += `${name} is clearly sexually @@.bd;inexperienced@@, and will need extra time and training to become a quality sex slave. `;
            break;
        case "Hypersexual":
            dlg += `${name} has shown ${him}self to be @@.xxx;hypersexual@@, and open to nearly any kind of training and experiences. However, this also means ${he} will seek pleasure from wherever ${he} can find it, regardless of who ${his} "<<master>>" might be.`;
            break;
        case "People Pleaser":
            dlg += `${name} is obviously a @@.sf;people pleaser@@, making ${him} very pliable in a good training environment. It also means it's unlikely ${he} will ever be able to take on a true dominant role as a slave. `;
            break;
        case "Oral Addict":
            dlg += `${name} has already shown signs of having a strong preference towards @@.xxx;oral sex@@, which is a desirable trait for a slave. However, this preference comes at the expense of experience and talent in other forms of pleasure. `;
            break;
        case "Anal Addict":
            dlg += `${name} has already shown signs of having a strong preference towards @@.xxx;anal sex@@, which is a desirable trait for a slave. However, this preference comes at the expense of experience and talent in other forms of pleasure. `;
            break;
        case "Oral Aversion":
            dlg += `${name} has already shown signs of having a strong @@.bd;aversion@@ towards oral sex, which is a less desirable trait for a slave. It will be difficult to instill this preference into ${him} without significant training. `;
            break;
        case "Anal Aversion":
            dlg += `${name} has already shown signs of having a strong @@.bd;aversion@@ towards anal sex, which is a less desirable trait for a slave. It will be difficult to instill this preference into ${him} without significant training. `;
            break;
        default:
            break;
    };

    if (hasPerks(s, ["Castrated","Feminized","Feminized Voice"])) {
        dlg += `\n\n`;

        if (hasPerk(s,"Get Pussy")) {
            dlg += `${name}'s @@.sf;penis and testicles have both been surgically removed@@, with ${his} ${s.getPenisSize()} cock having been converted into an artificial vagina. Special modifications have been made to ensure ${he} is permanently lubricated. `;
        } else if (hasAllPerks(s, ["Castrated", "Feminized"])) {
            dlg += `${name}'s @@.sf;penis and testicles have both been surgically removed@@. Without ${his} cock, ${name} can no longer orgasm in the conventional ways, instead being forced to learn to cum with other body parts. ${His} testicles have also since been removed, leaving ${him} with very little between ${his} legs, similar to a doll. `;
        } else if (hasPerk(s, "Castrated")) {
            dlg += `${name}'s @@.sf;testicles have been surgically removed@@, making it impossible for ${him} to ejaculate like ${he} used to. ${His} ${s.getPenisSize()} cock is still attached, though without a natural supply of testosterone it's becoming harder and harder for ${him} to maintain an erection. `;
        } else if (hasPerk(s, "Feminized")) {
            dlg += `${name}'s @@.sf;penis has been surgically removed@@, with a small hole for urine being all that remains. Without ${his} cock, ${name} can no longer orgasm in the conventional ways, instead being forced to learn to cum with other body parts. ${His} ${s.getBallSize()} testicles still hang between ${his} legs, serving as a reminder of the man ${he} once was. `;
        };

        if (hasPerk(s, "Augmented Breasts")) {
            dlg += `${name} has been given @@.xxx;fake tits@@, further diminishing what little masculinity ${name} once had. `;
        }

        if (hasPerk(s, "Feminized Voice")) {
            dlg += `Additionally, ${name}'s voice has been modified to sound like a young girl's. Every time ${he} opens ${his} mouth, ${he} can only speak like a slutty college girl, no matter hard ${he} tries not to. `;
        };
    };
    
    if (s.operations > 0) {
        dlg += `\n\n`;

        if (hasPerk(s, "Animal Ears")) {
            dlg += `${name}'s ears have been replaced with functional ${s.animal} ears, and ${he} has been given a permanent ${s.animal} tail to match it. `;
            if (hasPerk(s, "Pet")) {
                dlg += `With ${his} affinity for @@.xxx;acting as a willing pet@@, nothing could excite ${name} more than being modified this way. `;
            }
        };

        if (hasPerk(s, "Permanent Makeup")) {
            dlg += `Permanent makeup has been applied to ${name}'s face, ensuring that ${he} will forever look like a made up whore ready to serve ${his} <<master>>. `;
            if (hasPerk(s, "Nymphomaniac")) {
                dlg += `@@.xxx;As a nymphomaniac,@@ nothing could please ${name} more than being turned into a permanent slut. `;
            };
        };
        
        if (hasPerk(s, "Mute")) {
            dlg += `${name}'s vocal cords have been surgically removed, preventing ${him} from ever being able to speak again. `;
            if (hasPerk(s, "Submissive")) {
                dlg += `As a submissive slave, @@.gd;this forced silence is just another comforting reminder of ${his} place as a thing meant only for pleasing others@@. `
            } else {
                dlg += `Having ${his} voice taken from ${him}, @@.bd;${name} is unlikely to trust or respect you ever again, instead choosing to live in silent disdain@@. `
            };
        };

        if (hasPerk(s, "Clipped Heels")) {
            dlg += `${name}'s heels have been clipped, preventing ${him} from walking upgright anymore. `;
            if (hasPerk(s, "Pet" || hasPerk(s, "Submissive"))) {
                dlg += `As someone who enjoys being treated like a pet, being forced to crawl around on all fours @@.gd;is very erotic and exciting for ${name}@@. `;
            } else {
                dlg += `Now being forced to live life crawling on ${his} hands and knees, @@.bd;a sense of terror and distrust has been instilled in ${name}@@. `;
            };
        } else if (hasPerk(s, "Pulled Heels")) {
            dlg += `${name}'s calves have been surgically shortened, preventing ${him} from ever being able to stand up straight again without tall, slutty high heels. `;
            if (hasPerk(s, "Nymphomaniac")) {
                dlg += `@@.xxx;As a nymphomaniac, ${name} finds this extremely arousing@@, knowing ${he}'ll always been seen as a sex object from now on. `;
            };
        }
    };

    if (s.level > 0) {
        dlg += `\n\n`;

        if (hasPerk(s, "Nymphomaniac")) {
            dlg += `${name} has become a sex-addicted @@.xxx;nymphomaniac@@, finding ${him}self completely unable to ever be satisfied, and always looking for new partners. `;
        }

        if (hasPerk(s, "Dominant")) {
            dlg += `${name} has become very @@.xxx;dominant@@ towards other slaves as a result of ${his} repeated training. `;
        }
        if (hasPerk(s, "Sadistic")) {
            dlg += `As a @@.xxx;sadist@@, ${he} has even begun to enjoy inflicting real pain and suffering on those ${he} is allowed to dominate. `;
        }
        if (hasPerk(s, "Cruel")) {
            dlg += `Further training has instilled a true knack for gleeful @@.xxx;cruelty@@ when torturing other slaves. You can really see the sadistic streak in ${him} now. `;
        }
        if (hasPerk(s, "Evil")) {
            dlg += `Other slaves have started to become terrified of ${name}, going so far as to call ${him} pure @@.xxx;evil@@. You can't help but agree. `;
        }

        if (hasPerk(s, "Submissive")) {
            dlg += `${name} has become very @@.xxx;submissive@@ towards other slaves as a result of ${his} repeated training. `;
        };
        if (hasPerk(s, "Masochist")) {
            dlg += `As a @@.xxx;masochist@@, ${he} has even begun to enjoy inflicting real pain and suffering on ${himself} as a way to get off. `;
        };
        if (hasPerk(s, "Subservient")) {
            dlg += `Further training has instilled a true knack for gleeful @@.xxx;subservience@@ when being tortured by other slaves. You can really see the masochistic streak in ${him} now. `;
        };
        if (hasPerk(s, "Willing Slave")) {
            dlg += `${name} has become a true @@.xxx;willing slave@@, and will do anything to please ${his} <<master>>, whoever that might be at the time. `;
        };

        if (hasPerk(s, "Oral Fixation")) {
            dlg += `${name} has developed a strong @@.xxx;oral fixation@@, and will often seek out other slaves to use ${his} mouth on. `;
        };
        if (hasPerk(s, "Oral Expert")) {
            dlg += `What's more, ${name} has developed a pretty extrordinary talent for servicing others with ${his} mouth, becoming something of an @@.xxx;oral expert@@. `;
        }

        if (hasPerk(s, "Anal Fixation")) {
            dlg += `${name} has developed a strong love of anal sex, giving ${him} something of an @@.xxx;anal fixation@@. When allowed, ${he} will often seek out others to fuck ${him} in the ass with toys or cocks. `;
        };
        if (hasPerk(s, "Anal Expert")) {
            dlg += `What's more, ${name} has become so much of an @@.xxx;anal sex expert@@ that those who fuck ${him} in the ass are quick to say it's the best hole they've ever had. `;
        };

        if (hasPerk(s, "Nipple Fixation")) {
            dlg += `${name}'s nipples have become very sensative and erogenous, giving ${him} something of a @@.xxx;nipple fixation@@. When allowed, ${he} can often be found pinching and rubbing ${his} nipples while in ${his} cell. `;
        };

        if (hasPerk(s, "Breeding Kink")) {
            dlg += `After receiving so many creampies, ${name} has developed something of a @@.xxx;breeding kink@@. Whenever ${he} is getting fucked, ${he}'ll often force ${his} partner to cum inside of ${him}, even if that wasn't the plan. `;
        };

        if (hasPerk(s, "Pet")) {
            dlg += `${name} has started getting used the idea of becoming someone's fulltime @@.xxx;pet@@. The thought of being used and kept like an animal has awoken something inside of ${him}. `;
        };
        if (hasPerk(s, "Submissive Pet")) {
            dlg += `Over time, ${name} has taken on the mindset of a completely @@.xxx;submissive pet@@, and will do anything to please ${his} <<master>>. `;
        }
    };

    if (hasPerk(s, "Room Slave")) {
        dlg += `\n\n`;

        dlg += `Being especially fond of ${him}, you decided to keep ${name} for yourself. ${He} now spends ${his} days living in your bedroom, staying in your large walk-in closet and serving your every whim. `;
    }

    return dlg;
}
/* twine-user-script #49: "defineName.js" */
const maleSlaveNames = [
    "Jack","Paul","William","Daniel","Michael","David","Joseph","Andrew","Matthew","Thomas","Jason","Kevin","Mark","Richard","Steven","Brian","Jeffrey","Scott","Christopher","Robert","Charles","Kenneth","Anthony","Timothy","Donald","Gary","Ronald","Edward","Stephen","George","Terry","Peter","Larry","Gregory","Frank","Patrick","Raymond","Jerry","Roger","Douglas","Ryan","Walter","Samuel","Harry","Philip","Ralph","Keith","Phil","Albert","Billy","Bruce","Willie","Eugene","Lawrence","Gerald","Dennis","Joe","Chris","Roy","Adam","Wayne","Bobby","Victor","Benjamin","Carl","Johnny","Arthur","Henry","Jackie","Louis","Frederick","Randy","Leonard","Doug","Leroy","Marvin","Mike","Russell","Clarence","Ernest","Ronnie","Lee","Leon","Gene","Gilbert","Franklin","Tony","Jim","Lloyd","Curtis","Norman","Melvin","Allen","Stanley","Dean","Calvin"
];
  
  const femaleSlaveNames = [
    "Vannessa","Ashley","Jennifer","Linda","Patricia","Jessica","Sarah","Karen","Nancy","Lisa","Betty","Susan","Margaret","Dorothy","Megan","Kimberly","Angela","Melissa","Amy","Tracy","Christina","Rebecca","Sharon","Michelle","Samantha","Heather","Stephanie","Cynthia","Kathleen","Deborah","Carol","Helen","Donna","Lori","Catherine","Amanda","Frances","Ann","Julie","Martha","Virginia","Kelly","Tina","Brenda","Paula","Ruth","Diane","Rachel","Victoria","Janet","Carolyn","Christine","Emma","Debra","Jacqueline","Alice","Lillian","Laura","Judith","Rose","Doris","Teresa","Gloria","Marilyn","Beverly","Andrea","Kathryn","Madison","Grace","Joyce","Sara","Julia","Maria","Sandra","Hannah","Nicole","Tiffany","Olivia","Vicki","Anna","Sophia","Evelyn","Natalie","Abigail","Brooklyn","Zoe","Charlotte","Chloe","Lily","Alyssa","Addison","Emily","Isabella","Mia","Elizabeth","Ella","Avery","Sofia"
];
  
window.getSlaveName = function (slave) {
    let selectedName;
    if (slave.gender === "male") {
        selectedName = randomItem(maleSlaveNames);
        maleSlaveNames.splice(maleSlaveNames.indexOf(selectedName), 1);
    } else {
        selectedName = randomItem(femaleSlaveNames);
        femaleSlaveNames.splice(femaleSlaveNames.indexOf(selectedName), 1);
    }
    return selectedName;
};
/* twine-user-script #50: "definePerks.js" */
// Define perks for The Pit

const PERKS = {
    "Oral Fixation": {
        name: "Oral Fixation",
        perkReq: "none", traitReq: "none",
        sexReq: [1,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["oral", 1],
        value: 1500
    },
    "Oral Expert": {
        name: "Oral Expert",
        perkReq: "Oral Fixation", traitReq: "none",
        sexReq: [2,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["oral", 3],
        value: 4500
    },
    "Oral Lover": {
        name: "Oral Lover",
        perkReq: "Oral Expert", traitReq: "none",
        sexReq: [4,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["oral", 5],
        value: 9000
    },
    "Oral Obsession": {
        name: "Oral Obsession",
        perkReq: "Oral Lover", traitReq: "none",
        sexReq: [6,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["oral", 10],
        value: 18000
    },
    "Anal Fixation": {
        name: "Anal Fixation",
        perkReq: "none", traitReq: "none",
        sexReq: [1,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["anal", 1],
        value: 1500
    },
    "Anal Expert": {
        name: "Anal Expert",
        perkReq: "Anal Fixation", traitReq: "none",
        sexReq: [3,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["anal", 3],
        value: 4500
    },
    "Nipple Fixation": {
        name: "Nipple Fixation",
        perkReq: "none", traitReq: "none",
        sexReq: [1,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["breasts", 1],
        value: 1500
    },
    "Breeding Kink": {
        name: "Breeding Kink",
        perkReq: "none", traitReq: "none",
        sexReq: [2,10], wlpReq: [0,8], ltyReq: [0,10],
        skillReq: ["pussy", 1],
        value: 4500,
        bonusPerk: "Submissive", bonusValue: 10000
    },
    "Nymphomaniac": {
        name: "Nymphomaniac",
        perkReq: "none", traitReq: "none",
        sexReq: [8,10], wlpReq: [0,10], ltyReq: [0,10],
        skillReq: ["none"],
        value: 15000
    },
    "Dominant": {
        name: "Dominant",
        perkReq: "none", traitReq: "none",
        sexReq: [0,10], wlpReq: [4,10], ltyReq: [0,10],
        skillReq: ["dom", 1],
        value: 4500
    },
    "Sadistic": {
        name: "Sadistic",
        perkReq: "Dominant", traitReq: "none",
        sexReq: [4,10], wlpReq: [6,10], ltyReq: [2,10],
        skillReq: ["dom", 3],
        value: 4500
    },
    "Cruel": {
        name: "Cruel",
        perkReq: "Sadistic", traitReq: "none",
        sexReq: [2,10], wlpReq: [8,10], ltyReq: [0,10],
        skillReq: ["dom", 5],
        value: 7500
    },
    "Evil": {
        name: "Evil",
        perkReq: "Cruel", traitReq: "none",
        sexReq: [0,10], wlpReq: [10,10], ltyReq: [0,10],
        skillReq: ["dom", 10],
        value: 15000
    },
    "Submissive": {
        name: "Submissive",
        perkReq: "none", traitReq: "none",
        sexReq: [0,10], wlpReq: [0,2], ltyReq: [4,10],
        skillReq: ["sub", 1],
        value: 1500,
        bonusPerk: "Breeding Kink", bonusValue: 10000
    },
    "Masochistic": {
        name: "Masochistic",
        perkReq: "Submissive", traitReq: "none",
        sexReq: [4,10], wlpReq: [0,4], ltyReq: [6,10],
        skillReq: ["sub", 3],
        value: 4500
    },
    "Subservient": {
        name: "Subservient",
        perkReq: "Masochistic", traitReq: "none",
        sexReq: [2,10], wlpReq: [0,4], ltyReq: [8,10],
        skillReq: ["sub", 5],
        value: 7500
    },
    "Willing Slave": {
        name: "Willing Slave",
        perkReq: "Subservient", traitReq: "none",
        sexReq: [0,10], wlpReq: [0,1], ltyReq: [10,10],
        skillReq: ["sub", 10],
        value: 15000
    },
    "Pet": {
        name: "Pet",
        perkReq: "none", traitReq: "none",
        sexReq: [2,10], wlpReq: [0,8], ltyReq: [2,10],
        skillReq: ["pet", 1],
        value: 3000
    },
    "Submissive Pet": {
        name: "Submissive Pet",
        perkReq: "Pet", traitReq: "none",
        sexReq: [2,10], wlpReq: [0,8], ltyReq: [4,10],
        skillReq: ["sub", 3],
        value: 4500,
        bonusPerk: "Submissive", bonusValue: 10000
    },
    "Mute": {
        name: "Mute",
        perkReq: "none", traitReq: "Special",
        value: 4500,
        bonusPerk: "Submissive", bonusValue: 20000
    },
    "Clipped Heels": {
        name: "Clipped Heels",
        perkReq: "none", traitReq: "Special",
        value: 4500,
        bonusPerk: "Nymphomaniac", bonusValue: 20000
    },
    "Permanent Makeup": {
        name: "Permanent Makeup",
        perkReq: "none", traitReq: "Special",
        value: 4500,
        bonusPerk: "Nymphomaniac", bonusValue: 20000
    },
    "Augmented Breasts": {
        name: "Augmented Breasts",
        perkReq: "none", traitReq: "Special",
        value: 9000,
        bonusPerk: "Nymphomaniac", bonusValue: 20000
    },
    "Small Breasts": {
        name: "Small Breasts",
        perkReq: "none", traitReq: "Special",
        value: 3000
    },
    "Large Breasts": {
        name: "Large Breasts",
        perkReq: "none", traitReq: "Special",
        value: 3000,
        bonusPerk: "Nymphomaniac", bonusValue: 20000
    },
    "Feminized Voice": {
        name: "Feminized Voice",
        perkReq: "none", traitReq: "Special",
        value: 4500
    },
    "Castrated": {
        name: "Castrated",
        perkReq: "none", traitReq: "Special",
        value: 7500
    },
    "Feminized": {
        name: "Feminized",
        perkReq: "none", traitReq: "Special",
        value: 15000,
        bonusPerk: "Castrated", bonusValue: 30000
    },
    "Pulled Heels": {
        name: "Pulled Heels",
        perkReq: "none", traitReq: "Special",
        value: 13500,
        bonusPerk: "Submissive", bonusValue: 20000
    },
    "Animal Ears": {
        name: "Animal Ears",
        perkReq: "none", traitReq: "Special",
        value: 15000,
        bonusPerk: "Pet", bonusValue: 20000
    },
    "Room Slave": {
        name: "Room Slave",
        perkReq: "none", traitReq: "Special",
        value: 0,
    },
    "Get Pussy": {
        name: "Get Pussy",
        perkReq: "none", traitReq: "Special",
        value: 50000,
    },
};

window.getPerk = function(s, debug = false) {
    // Define array to store valid perks
    var p = [];
    var debugPerks = [];

    // Check against perk requirements and add to array if valid
    // loop through the items in the PERKS object
    for (var i in PERKS) {
        let pr = PERKS[i];
        // Check against perk requirements
        if (!s.perks.includes(pr.name)) {
            if (s.perks.includes(pr.perkReq) || pr.perkReq == "none") {
                if (s.trait.name == pr.traitReq || pr.traitReq == "none") {
                    if (
                        s.sex <= pr.sexReq[1] && s.sex >= pr.sexReq[0] &&
                        s.wlp <= pr.wlpReq[1] && s.wlp >= pr.wlpReq[0] &&
                        s.lty <= pr.ltyReq[1] && s.lty >= pr.ltyReq[0] &&
                        (pr.skillReq == "none" || s.skills[pr.skillReq[0]] >= pr.skillReq[1])
                    ) {
                        p.push(pr.name);
                        if (debug) {
                            if (i < PERKS.length) {
                                debugPerks.push(pr.name + ", ");
                            } else {    
                                debugPerks.push(pr.name);
                            };
                        };
                    };
                };
            };
        };
    };

    // Return a random perk from the array
    if (debug) {
        return debugPerks;
    } else if (p.length == 0) {
        return "none";
    } else {
        var returnPerk = p[Math.floor(Math.random() * p.length)];
        if (PERKS[returnPerk].value !== undefined) {
            s.value += PERKS[returnPerk].value;
        };
        if (PERKS[returnPerk].bonusPerk !== undefined) {
            if (hasPerk(s, PERKS[returnPerk].bonusPerk)) {
                s.value += PERKS[returnPerk].bonusValue;
            };
        };
        return returnPerk;
    };
};

// Set Perk: Like getPerk, but adds a specific perk to a slave
window.setPerk = function(slave, perk) {
    // Check if slave has perk
    if (!slave.perks.includes(perk)) {
        // Add perk
        slave.perks.push(perk);
        slave.value += PERKS[perk].value;

        // Add bonus value for combined perks
        if (PERKS[perk].bonusPerk !== undefined) {
            if (hasPerk(slave, PERKS[perk].bonusPerk)) {
                slave.value += PERKS[perk].bonusValue;
            };
        };
    };
};

window.hasPerk = function (slave, perk) {
    // Check if slave has perk
    return slave.perks.includes(perk);
};

window.hasPerks = function (slave, perks) {
    // Check if slave has perk
    for (let i = 0; i < perks.length; i++) {
        if (slave.perks.includes(perks[i])) {
            return true;
        }
    }
    return false;
};

window.hasAllPerks = function (slave, perks) {
    // Check if slave has perk
    for (let i = 0; i < perks.length; i++) {
        if (!slave.perks.includes(perks[i])) {
            return false;
        }
    }
    return true;
};
/* twine-user-script #51: "defineSlave.js" */
class pitSlave {
    constructor(name,img,gender,gen,hairColor,hairLength,breastSize) {
        // Global values
        this.name = name.charAt(0).toUpperCase() + name.slice(1);   // Slave name set to proper case
        this.id = name.charAt(0).toLowerCase() + name.slice(1);     // Slave ID, lowercase version of name
        this.img = img;                 // Slave image (pics/pit/slaves/img.jpg)
        this.imgIndex = 0;              // Slave image index (pics/pit/slaves/img-1.jpg)
        this.profile = img + "-pro";    // Slave profile (pics/pit/slaves/img-pro.jpg)

        // Slave core values
        this.gender = gender;                   // Starting gender
        this.gen = gen;                         // Gender tag for images (male, female, ts)
        this.perks = [];                        // Array for slave's perks
        this.operations = 0;                    // Number of operations performed
        this.value = 25000;                     // Set a current sale value
        this.startValue = 25000;                // Set a starting sale value
        this.traitName = "";                    // Slave's trait name
        this.trait = randomObject(TRAITS,["none"]);

        // Slave stats
        this.sex = 5;       // Sexuality (desire for sex)
        this.wlp = 5;       // Willpower (desire to resist)
        this.lty = 5;       // Loyalty (desire to stay)
        this.xp = 0;        // Slave's experience points
        this.level = 0;     // Slave's starting level
        this.sexMod = 0;    // Sexuality modifier
        this.wlpMod = 0;    // Willpower modifier
        this.ltyMod = 0;    // Loyalty modifier
        this.xpMod = 0;     // Experience modifier

        // Slave skills
        this.skills = {
            "anal": 0,
            "oral": 0,
            "breasts": 0,
            "pussy": 0,
            "dom": 0,
            "sub": 0,
            "pet": 0,
            "fem": 0,
        };

        this.skillTier = function(skill) {
            if (this.skills[skill] < 0) {
                return 0;
            } else if (this.skills[skill] < 5) {
                return 1;
            } else if (this.skills[skill] < 10) {
                return 2;
            } else if (this.skills[skill] < 15) {
                return 3;
            } else if (this.skills[skill] < 20) {
                return 4;
            } else {
                return 5;
            }
        };

        this.skillDlg = function(skill, hates, unskilled, novice, skilled, talented, expert) {
            switch (this.skillTier(skill)) {
                case 0: return `@@.bd;${hates}@@ `;
                case 1: return `@@.bd;${unskilled}@@ `;
                case 2: return `@@.sf;${novice}@@ `;
                case 3: return `@@.sf;${skilled}@@ `;
                case 4: return `@@.gd;${talented}@@ `;
                case 5: return `@@.gd;${expert}@@ `;
            }
        };
        
        // Slave base qualities
        this.hairColor = hairColor;
        this.hairLength = hairLength;
        this.breastSize = breastSize;
        this.hasBreasts = false;
        this.hasPenis = false;
        this.hasBalls = false;
        this.hasPussy = false;

        // Slave extended qualities
        this.animal = "none";
        this.ears = "normal";
        this.limbs = "normal";
        this.voice = "normal";
        this.eyesight = "normal";
        this.hearing = "normal";

        // Slave personality
        this.background = "slave";
        this.age = "teen";
        this.history = "";

        // Slave pronouns
        this.he = "", this.He = "";
        this.his = "", this.His = "";
        this.him = "", this.Him = "";
        this.hiss = "", this.Hiss = "";
        this.boy = "", this.Boy = "";
        this.gID = "";

        this.getPenisSize = function () {
            if (this.hasPenis == true) {
                switch (Math.floor(this.penisSize)) {
                    case 0: return "microscopic";
                    case 1: return "tiny";
                    case 2: return "small";
                    case 3: return "average";
                    case 4: return "large";
                    case 5: return "huge";
                };
            } else {
                return "";
            };
        };
        this.getBallSize = function () {
            if (this.hasBalls == true) {
                switch (Math.floor(this.ballSize)) {
                    case 0: return "microscopic";
                    case 1: return "tiny";
                    case 2: return "small";
                    case 3: return "average";
                    case 4: return "large";
                    case 5: return "huge";
                };
            } else {
                return "";
            };
        };
        this.getBreastSize = function () {
            if (this.hasBreasts == true) {
                switch (Math.floor(this.breastSize)) {
                    case 0: return "flat";
                    case 1: return "tiny";
                    case 2: return "small";
                    case 3: return "average";
                    case 4: return "large";
                    case 5: return "huge";
                };
            } else {
                return "flat";
            };
        };        
        this.getHairLength = function () {
            switch (Math.floor(this.hairLength)) {
                case 0: return "bald";
                case 1: return "short";
                case 2: return "medium length";
                case 3: return "shoulder length";
                case 4: return "long";
                case 5: return "very long";
                default: return "bald";
            };
        };
        this.getHole = function (suffix = "") {
            if (this.hasPussy) {
                return "pussy";
            } else {
                return "ass" + suffix;
            };
        };
        this.wet = function () {
            if (this.hasPenis) {
                if (hasBalls) {
                    return "hard";
                } else { return "twitching" };
            } else {
                return "wet";
            };
        };
        this.getAge = function () {
            switch (this.age) {
                case "Teen": return "a teen";
                case "Young Adult": return "a young, adult";
                case "Adult": return "an adult";
                case "Mature": return "a mature";
            };
        }
        this.noise = function (mood) {
            switch (mood) {
                case "tired":
                    switch (this.animal) {
                        case "dog": return "whimper";
                        case "cat": return "mewl";
                        case "cow": return "moo";
                    };
                case "speak":
                    switch (this.animal) {
                        case "dog": return "Woof!";
                        case "cat": return "Meow!";
                        case "cow": return "Moooo...";
                    };
                case "howl":
                    switch (this.animal) {
                        case "dog": return "Aroooooo!!!";
                        case "cat": return "Mrooowww!!!";
                        case "cow": return "MOOooooo!!!";
                    };
                case "paw":
                    switch (this.animal) {
                        case "dog": return "paw";
                        case "cat": return "paw";
                        case "cow": return "hoof";
                    };
                case undefined:
                    switch (this.animal) {
                        case "dog": return "bark";
                        case "cat": return "moew";
                        case "cow": return "moo";
                    };
            };
        };

        // Boolean return functions
        this.isAnimal = function () {
            return (this.hasAnimalVoice && this.hasAnimalLimbs && this.hasTail && this.ears !== "normal");
        };

        // Change functions
        this.changeBreastSize = function (v) {
            this.breastSize = Math.clamp(this.breastSize += v, 1, 5);
        };
        this.changePenisSize = function (v) {
            this.penisSize = Math.clamp(this.penisSize += v, 1, 5);
        };
        this.changeBallSize = function (v) {
            this.ballSize = Math.clamp(this.ballSize += v, 1, 5);
        };
        this.changeHairLength = function (v) {
            this.hairLength = Math.clamp(this.hairLength += v, 1, 5);
        };
        this.changeSex = function (v) {
            v += this.sexMod;
            this.sex = Math.clamp(this.sex += v, 1, 10);
        };
        this.changeWlp = function (v) {
            v += this.wlpMod;
            this.wlp = Math.clamp(this.wlp += v, 1, 10);
        };
        this.changeLty = function (v) {
            v += this.ltyMod;
            this.lty = Math.clamp(this.lty += v, 1, 10);
        };
        this.changeXP = function (v, PitValueMod) {
            v += this.xpMod;
            this.xp = Math.clamp(this.xp += v, 0, 5);
            this.value += v * PitValueMod;
        };
        this.changeLevel = function (v, PitValueMod) {
            this.level = Math.clamp(this.level += v, 1, 10);
            this.value += v * PitValueMod * 10;
        };

        this.updatePronouns = function(g) {
            // Set pronouns based on gender (will be overwritten if assignPitSlavePronouns() is called later)
            if (g == "masculine") {
                this.he = "he", this.He = "He";
                this.his = "his", this.His = "His";
                this.him = "him", this.Him = "Him";
                this.hiss = "his", this.Hiss = "His";
                this.boy = "boy", this.Boy = "Boy";
                this.gID = "masculine";
            } else {
                this.he = "she", this.He = "She";
                this.his = "her", this.His = "Her";
                this.him = "her", this.Him = "Her";
                this.hiss = "hers", this.Hiss = "Hers";
                this.boy = "girl", this.Boy = "Girl";
                this.gID = "feminine";
            };
        };

        this.updateValue = function (value) {
            this.value += value;
        };
    };
};

window.createSlave = function (
    name,
    img = "random",
    gender = randomItem(variables().PitSlaveGenders),
    hairColor = randomItem(["black","brown","blonde","red","white","grey","blue","green","purple","orange"]),
    hairLength = Math.floor(Math.random() * 5) + 1,
    breastSize = Math.floor(Math.random() * 4) + 1,
    penisSize = Math.floor(Math.random() * 5) + 1,
    ballSize = Math.floor(Math.random() * 5) + 1,
    age = "random",
) {

    // Confirm pitSlaves object exists, if not create it
    if (!variables().pitSlaves) { variables().pitSlaves = {} };

    // Gen truncated gender for image references
    var gen = gender;
    if (gender == "trans") { gen = "ts" };

    // Only trigger if the slave does not currently exist
    if (!variables().pitSlaves[name]) {

        // Create new slave and assign slave to easier variable
        variables().pitSlaves[name] = new pitSlave(
            name,
            img,
            gender,
            gen,
            hairColor,
            hairLength,
            breastSize
        );

        // Assign new slave to a variable for easier access
        var slave = variables().pitSlaves[name];

        // Assign a new slave ID based on name + guid
        slave.id = slave.id + "-" + generateGuid();

        // Take up a slot in the pit
        variables().PitSlots += 1;

        // Select anatomy based on gender
        if (gender == "trans" || gender == "male") {
            slave.hasPenis = true;
            slave.hasPussy = false;
            slave.hasBalls = true;
            slave.penisSize = penisSize;
            slave.ballSize = ballSize;
        } else {
            slave.hasPussy = true;
            slave.hasPenis = false;
            slave.hasBalls = false;            
        };
        if (gender !== "male") {
            slave.hasBreasts = true;
        };

        // Make special considerations for unique slaves
        if (slave.id.contains("lauren")) {
            slave.hasPussy = true;
            slave.hasPenis = false;
            slave.hasBalls = false;
            slave.hasBreasts = true;
            slave.breastSize = 3;
            slave.penisSize = 0;
            slave.ballSize = 0;
            slave.hairLength = 4;
            slave.hairColor = "red";
            slave.img = "lauren";
            slave.gender = "female";
        };
        if (slave.id.contains("elsa")) {
            slave.hasPussy = true;
            slave.hasPenis = false;
            slave.hasBalls = false;
            slave.hasBreasts = true;
            slave.breastSize = 2;
            slave.penisSize = 0;
            slave.ballSize = 0;
            slave.hairLength = 2;
            slave.hairColor = "blonde";
            slave.img = "elsa";
            slave.gender = "female";
        };
        if (slave.id.contains("sarina")) {
            slave.hasPussy = false;
            slave.hasPenis = true;
            slave.hasBalls = true;
            slave.hasBreasts = true;
            slave.breastSize = 5;
            slave.penisSize = 1;
            slave.ballSize = 1;
            slave.hairLength = 5;
            slave.hairColor = "platinum blonde";
            slave.img = "sarina";
            slave.gender = "transgirl";
            slave.gen = "ts";
        };

        // Process traits for new slave
        processTraits(slave);

        // Add age and background to slave
        setAge(slave, age);
        setBackground(slave);
        setDescription(slave);

        // Generage img if not provided
        if (img == "random") {
            slave.img = setImage(slave);
            slave.imgIndex = setImageIndex(slave);
        };

        // Set pronouns based on gender (will be overwritten if assignPitSlavePronouns() is called later)
        if (gender == "male") {
            assignPitSlavePronouns(slave, "masculine");
        } else {
            assignPitSlavePronouns(slave, "feminine");
        };
    };
};

window.sellSlave = function(slave) {
    // Convert slave list to keys
    var slaves = Object.keys(variables().pitSlaves);

    // Remove slave from pitSlaves object
    for (var i = 0; i < slaves.length; i++) {
        if (variables().pitSlaves[slaves[i]].id == slave.id) {
            // Return slave's name to name pool
            if (slave.gender == 'male') {
                maleSlaveNames.push(slave.name);
            } else {
                femaleSlaveNames.push(slave.name);
            };
            delete variables().pitSlaves[slaves[i]];
        };
    };

    // Add slave value to Money
    variables().Money += slave.value;

    // Free up a slot in the pit
    variables().PitSlots -= 1;
};

window.assignPitSlavePronouns = function(slave, gID) {
    // Set pronouns based on gender (will be overwritten if assignPitSlavePronouns() is called later)
    if (gID == "masculine") {
        slave.he = "he", slave.He = "He";
        slave.his = "his", slave.His = "His";
        slave.him = "him", slave.Him = "Him";
        slave.hiss = "his", slave.Hiss = "His";
        slave.boy = "boy", slave.Boy = "Boy";
        slave.gID = "masculine";
    } else {
        slave.he = "she", slave.He = "She";
        slave.his = "her", slave.His = "Her";
        slave.him = "her", slave.Him = "Her";
        slave.hiss = "hers", slave.Hiss = "Hers";
        slave.boy = "girl", slave.Boy = "Girl";
        slave.gID = "feminine";
    };
};

window.getSlavePronouns = function(slave) {
    return [slave.name,slave.he,slave.He,slave.his,slave.His,slave.him,slave.Him,slave.hiss,slave.Hiss,slave.boy,slave.Boy,slave.gen];
};

window.getSlaveValue = function(slave) {
    // Set initial value 'v' at 0
    var v = 0;

    // Set value based on gender plus bonus for current preferred gender
    if (slave.gender == "male") {
        v += 10000;
    } else if (slave.gender == "trans") {
        v += 12500;
    } else {
        v += 15000;
    };
    if (slave.gender == variables().PrefSlaveGender) {v += 10000};
    
    // Increase value based on physical traits
    if (slave.hasBreasts) {v += Math.floor(slave.breastSize * 2000)};
    if (slave.hasPenis) {v += Math.floor(slave.penisSize * 1500)};
    if (slave.hasBalls) {v += Math.floor(slave.ballSize * 500)};
    if (slave.hasPussy) {v += 2000};

    // Increase value based on character traits
    v += Math.floor(slave.fear * 250);
    v += Math.floor(slave.respect * 1000);
    v += Math.floor(slave.horny * 1200);
    v += Math.floor(slave.smart * 500);

    // Adjust value based on slave traits
    if (slave.traits.includes("bimbo")) {v += 5000};
    if (slave.traits.includes("castrated") && slave.penisSize < 2 && slave.hasPenis) {v += 45000};
    if (slave.traits.includes("heelsClipped")) {v += 1000};
    if (slave.traits.includes("heelsPulled")) {v += 15000};
    if (slave.hadPenis == true) {v += 35000};
    if (slave.isMute == true) {v += 5000};
    if (slave.hasAnimalLimbs == true) {v += 2500};
    if (slave.hasAnimalVoice == true) {v += 2500};
    if (slave.hasTail == true) {v += 2500};
    if (slave.ears !== "normal") {v += 2500};
    if (slave.isAnimal() == true) {v += 50000};
    
    slave.value = v;
};

// One time run function when adding new functionality to existing pit slaves
window.updatePitSlaveClass = function() {
    var slavePool = Object.keys(variables().pitSlaves);
    
    for (let i = 0;i < slavePool.length;i++) {
        var currentSlave = variables().pitSlaves[slavePool[i]];
        currentSlave.updatePronouns = function(g) {
            // Set pronouns based on gender (will be overwritten if assignPitSlavePronouns() is called later)
            if (g == "masculine") {
                this.he = "he", this.He = "He";
                this.his = "his", this.His = "His";
                this.him = "him", this.Him = "Him";
                this.hiss = "his", this.Hiss = "His";
                this.boy = "boy", this.Boy = "Boy";
                this.gID = "masculine";
            } else {
                this.he = "she", this.He = "She";
                this.his = "her", this.His = "Her";
                this.him = "her", this.Him = "Her";
                this.hiss = "hers", this.Hiss = "Hers";
                this.boy = "girl", this.Boy = "Girl";
                this.gID = "feminine";
            };
        };
    };
};
/* twine-user-script #52: "defineThePit.js" */
// Initialises the variables for the Pit
variables().PitSlots = 0;
variables().MaxPitSlots = 3;
variables().MaxSlaveXP = 5;
variables().MaxSlaveLevel = 3;
variables().TrainingPoints = 2;
variables().MaxTrainingPoints = 2;
variables().PitLevel = 1;
variables().PitMaxLevel = 6;
variables().PitXP = 0;
variables().PitXPMod = 0;
variables().PitXPReq = [0,10,20,30,40,50,60,70,80,90,100];
variables().PitSEXMod = 0;
variables().PitWLPMod = 0;
variables().PitLTYMod = 0;
variables().PitValueMod = 100;  // Value increases at 1 * PitValueMod
variables().WeeklySlavePay = 0;
variables().WeeklySlavePayMod = 0.2;

// Variables for cube slave functionality
variables().cubeSlaves = {};

// Variables for purchasing slaves
variables().PitSlaveGenders = ["female","female"];
variables().PitSlaveCost = 30000;
variables().BoughtSlave = false;

// Variables and functions for the daily slave purchase option
variables().PitDailySlaveGender = "female";
variables().PitDailySlaveName = "Anna";
variables().PitDailySlaveAge = "";
variables().PitDailySlaveHairColor = "";
variables().PitDailySlaveHairLength = Math.floor(Math.random() * 5) + 1;
variables().PitDailySlaveBreastSize = Math.floor(Math.random() * 5) + 1;
variables().PitDailySlavePenisSize = Math.floor(Math.random() * 5) + 1;
variables().PitDailySlaveBallSize = Math.floor(Math.random() * 5) + 1;
variables().PitDailySlaveDescriptionMale = "";
variables().PitDailySlaveDescriptionFemale = "";

variables().thepit = {img:[]} // Define thepit.img as an array
/* twine-user-script #53: "defineTitles.js" */
// Functions used to generate titles for slaves based on accumulated perks
const TITLES = {
    "Oral Expert": {
        name: "Oral Expert",
        type: "oral",
    },
};

window.setSlaveTitle = function(slave) {
    // Set title
    var top = slave.skills.anal;
    var title = "anal";

    if (slave.skills.oral > top) {
        top = slave.skills.oral;
        title = "oral";
    };
    if (slave.skills.breasts > top) {
        top = slave.skills.breasts;
        title = "breasts";
    };
    if (slave.skills.pussy > top) {
        top = slave.skills.pussy;
        title = "pussy";
    };
    if (slave.skills.dom > top) {
        top = slave.skills.dom;
        title = "dom";
    };
    if (slave.skills.sub > top) {
        top = slave.skills.sub;
        title = "sub";
    };
    if (slave.skills.pet > top) {
        top = slave.skills.pet;
        title = "pet";
    };

    slave.title = title;
};
/* twine-user-script #54: "defineTraits.js" */
// Variables and functions to define traits for the Pit

const TRAITS = {
    "none": {
        name: "None",
        sex: 0, wlp: 0, lty: 0
    },
    "frigid": {
        name: "Frigid",
        sex: -3, wlp: -1, lty: 0,
        oral: -5, anal: -5, pussy: -5,
        value: -5000
    },
    "bratty": {
        name: "Bratty",
        sex: 2, wlp: 3, lty: -3,
        value: -2000
    },
    "stubborn": {
        name: "Stubborn",
        sex: 0, wlp: 3, lty: -3,
        value: -1000
    },
    "violent": {
        name: "Violent",
        sex: -2, wlp: 5, lty: -5,
        dom: 5, sub: -5,
        value: -2500
    },
    "timid": {
        name: "Timid",
        sex: -3, wlp: -3, lty: 1,
        dom: -5, sub: 5,
        value: -1000
    },
    "inexperienced": {
        name: "Inexperienced",
        sex: -2, wlp: 2, lty: -2,
        oral: -1, anal: -1, pussy: -1,
        value: 0
    },
    "hypersexual": {
        name: "Hypersexual",
        sex: 3, wlp: -2, lty: -4,
        oral: 2, anal: 2, pussy: 2,
        value: 10000
    },
    "peoplepleaser": {
        name: "People Pleaser",
        sex: -2, wlp: -3, lty: 3,
        oral: 2, breasts: 2,
        value: 5000
    },
    "oraladdict": {
        name: "Oral Addict",
        sex: 1, wlp: -2, lty: 0,
        oral: 5, pussy: -3,
        value: 10000
    },
    "analaddict": {
        name: "Anal Addict",
        sex: 3, wlp: -2, lty: 0,
        anal: 5, pussy: -3,
        value: 10000
    },
    "oralaversion": {
        name: "Oral Aversion",
        oral: -5,
        value: -2000
    },
    "analaversion": {
        name: "Anal Aversion",
        anal: -5,
        value: -2000
    }
};

function processTraits(s) {
    // Put the slave's trait in a variable for easier access
    var t = s.trait;

    // If the slave has a trait, apply the trait's effects
    if (t !== undefined || t !== "none") {
        s.traitName = t.name;
        s.sex += (t.sex == undefined ? 0 : t.sex);
        s.wlp += (t.wlp == undefined ? 0 : t.wlp);
        s.lty += (t.lty == undefined ? 0 : t.lty);
        if (t.oral !== undefined) {s.skills.oral += t.oral};
        if (t.anal !== undefined) {s.skills.anal += t.anal};
        if (t.breasts !== undefined) {s.skills.breasts += t.breasts};
        if (t.pussy !== undefined) {s.skills.pussy += t.pussy};
        if (t.value !== undefined) {s.value += t.value};
        s.startValue = s.value * 2;
    };
};
/* twine-user-script #55: "slaveDialogue.js" */
window.dlgFuckSlave = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    // Generate scene dialogue
    if (s.hasAnimalLimbs) {
        dlg += `''You direct ${s.name} over to a nearby surface and instruct ${s.him} to spread ${s.his} legs. ${s.name} slowly walks over on fours, still getting used to her ${s.animal} legs, and climbs up onto the surface. You move behind them and pull out your <<StraponOrCock size>>.''\n\n`;
    } else if (s.hasClippedHeels) {
        dlg += `''No longer able to walk ${s.him}self, you help ${s.name} over to a nearby surface, pulling ${s.him} onto ${s.his} hands and knees, and instruct ${s.him} to spread ${s.his} legs. As they get into position, you move behind them and pull out your <<StraponOrCock size>>.''\n\n`;
    } else if (s.hasPulledHeels) {
        if (s.wearing("heels")) {
            dlg += `''You direct ${s.name} over to a nearby surface and instruct ${s.him} to spread ${s.his} legs. As they get into position, you move behind them and pull out your <<StraponOrCock size>>.''\n\n`;
        } else {
            dlg += `''You direct ${s.name} over to a nearby surface and instruct ${s.him} to spread ${s.his} legs. Unable to completely support their own weight, they have to carefully tiptoe over. As they get into position, you move behind them and pull out your <<StraponOrCock size>>.''\n\n`;
        };
    } else {
        dlg += `''You direct ${s.name} over to a nearby surface and instruct ${s.him} to spread ${s.his} legs. As they get into position, you move behind them and pull out your <<StraponOrCock size>>.''\n\n`;
    };

    dlg += `<<nm $player "Alright, time to test out that ${s.getHole()} of yours!">>\n`;

    if (s.isMute) {
        dlg += `<<nmc "${s.name}" "..." ${s.profile}>>\n`;
    } else if (s.hasAnimalVoice) {
        dlg += `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`;
    } else if (s.isBimbo) {
        dlg += `<<nmc "${s.name}" "@@.bf;Mmmmm, yes <<Master>>! My little ${s.getHole('hole')} is aching for you!@@" ${s.profile}>>\n`;
    } else {
        dlg += slaveRespectDesc(s,[``,
            `<<nmc "${s.name}" "..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "...Just get this over with..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "O-okay..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Yes <<sir>>." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Yes <<Master>>!" ${s.profile}>>\n`
        ]);
    };

    dlg += `''You take a moment to admire your slave from behind, `;
    if (s.hasTail) {
        dlg += `${s.his} ${s.animal} tail swaying anxiously behind ${s.him} and `;
    };
    dlg += `${s.his} legs trembling in anticipation. You line your <<StraponOrCock>> up with ${s.his} ${s.getHole()}.''\n\n`

    dlg += `<<nm $player "Ready? Here... we... GO!">>\n`;

    if (s.id == 'elsa') {
        dlg += `<<pic $elsa "fucked-by-player">>\n`;
    } else if (s.id == 'lauren') {
        dlg += `<<pic $lauren "fucked-by-player">>\n`;
    } else {
        dlg += `<<pic $action "player-fuck-${s.gen}">>\n`;
    }

    dlg += `''You relentlessly hammer away at ${s.name}'s quivering ${s.getHole('hole')}, burying your <<StraponOrCock size>> deeper and deeper into ${s.name}. `;
    dlg += slaveHornyDesc(s,[``,
        `${s.He} grunts and groans as ${s.he} takes the length of your member, `,
        `${s.He} groans in acceptance as ${s.he} takes the length of your member, `,
        `${s.He} occasionally lets a slutty moan slip as you fuck ${s.him}, `,
        `${s.He} can't help but moan as you fuck ${s.him} from behind, `,
        `${s.He} moans wildly as you fuck him from behind, `
    ]);
    if (s.hasPussy) {
        dlg += slaveHornyDesc(s,[``,
            `the dryness of ${s.his} pussy making it hard for you to keep your momentum. `,
            `the dryness of ${s.his} pussy making it hard for you to keep your momentum. `,
            `${s.his} pussy gradually getting wetter and wetter. `,
            `${s.his} pussy pouring juices out with every thrust. `,
            `${s.his} pussy spraying juices back onto your thighs with every thrust. `
        ]);
    } else {
        dlg += slaveHornyDesc(s,[``,
            `${s.his} ${s.getPenisSize()} limp cock swinging beneath ${s.him}. `,
            `${s.his} ${s.getPenisSize()} limp cock swinging beneath ${s.him}. `,
            `${s.his} ${s.getPenisSize()} cock swinging beneath ${s.him}, slightly erect. `,
            `${s.his} ${s.getPenisSize()} hard cock sticking out beneath ${s.him}. `,
            `${s.his} ${s.getPenisSize()} hard cock dribbling precum as it swings beneath ${s.him}. `
        ]);
    };
    if (s.ears !== "normal") {
        dlg += `${s.name}'s ${s.animal} ears flop up and down as you fuck ${s.him}.''\n\n`
    } else {
        dlg += `''\n\n`;
    };

    if (hasPenis()) {
        dlg += `<<nm $player "Haaa... haa... okay... Here it comes!">>\n`;
    } else {
        dlg += `<<nm $player "Mmmm... ooohhh... f-fuck I'm gonna cum!">>\n`;
    };

    if (s.isBimbo) {
        if (hasPenis) {
            dlg += `<<nmc "${s.name}" "@@.bf;F-fuck yes! Fill my slutty little ${s.getHole('hole')} with your hot fucking cum!!!@@" ${s.profile}>>\n`;
        } else {
            dlg += `<<nmc "${s.name}" "@@.bf;F-fuck yes! Fill my slutty little ${s.getHole('hole')} with your thick cock until I explode!!!@@" ${s.profile}>>\n`;
        };
    } else {
        dlg += slaveHornyDesc(s,[``,
            `<<nmc "${s.name}" "Haaa... hnggg... mmmm..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Haa... hng... ffff..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Ooohhh... mmmm... a-ahhh..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Ohh fffuck! Mmmm... H-haaa!" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "C-cumming! I'm gonna cum too!" ${s.profile}>>\n`
        ]);
    };

    if (hasPenis()) {
        dlg += `''You plung your <<pSize>> deep inside of ${s.name}'s ${s.getHole('hole')} as you unleash rope after rope of thick cum deep inside of ${s.him}. After settling, you pull out, clean up, and redress.''\n\n`;
    } else {
        dlg += `''You plung your <<accf>> deep inside of ${s.name}'s ${s.getHole('hole')} as waves of intense pleasure wash over your body. After finally settling down, you pull out, clean up, and redress.''\n\n`;
    };

    dlg += `<<nm $player "Haaa, that was nice. Now turn around and thank your <<master>>.">>\n`;

    dlg += `''`;
    if (s.isMute) {
        dlg += `${s.name} looks at you with ${s.his} mouth agape, unable to speak. `;
    } else if (s.hasAnimalVoice) {
        dlg += `${s.name} lets out an energetic ${s.noise()}, unable to form words. `;
    } else if (s.isBimbo) {
        dlg += `${s.name} nods ${s.his} head wildly, thanking you for using ${s.him}. `;
    } else {
        dlg += slaveRespectDesc(s,[``,
            `${s.name} looks away without saying a word. `,
            `${s.name} looks away, growling out a 'thanks' under ${s.his} breath. `,
            `${s.name} looks down, thanking ${s.his} <<master>>. `,
            `${s.name} looks at you, thanking ${s.his} <<master>>. `,
            `${s.name} looks at you smiling, emphatically thanking ${s.his} <<master>>. `
        ]);
    };
    if (s.hasTail) {
        if (s.respect > 2) {
            dlg += `${s.His} tail wags happily behind ${s.him}. `;
        } else {
            dlg += `${s.His} tail hangs sadly to the side. `;
        };
    };
    if (s.hasPenis) {
        if (s.hasBalls) {
            dlg += slaveHornyDesc(s,[``,
                `You notice ${s.his} ${s.getPenisSize()} cock hangs flaccid between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock hangs flaccid between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock is slightly hard as it hangs between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock is still slightly hard as it hangs between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock is still hard, and dripping copious amounts of precum. `
            ]);
            if (s.isBimbo) {dlg += `@@.bf;The puddle between ${s.his} feet implies ${s.he}'s cum a number of times@@`};
        } else {
            dlg += slaveHornyDesc(s,[``,
                `You notice ${s.his} ${s.getPenisSize()} cock hangs flaccid between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock hangs flaccid between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock is slightly hard as it hangs between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock is still slightly hard as it hangs between ${s.his} legs. `,
                `You notice ${s.his} ${s.getPenisSize()} cock is still hard, and twitching with need. `
            ]);
        };
    } else {
        dlg += slaveHornyDesc(s,[``,
            `You notice ${s.his} pussy is still closed up, and most of the fluids on it belong to you. `,
            `You notice ${s.his} pussy is still pretty dry, save for the fluids you left on it. `,
            `You notice ${s.his} pussy is slightly wet with ${s.his} own juices. `,
            `You notice ${s.his} pussy is still fairly open, ${s.his} own juices dripping from it. `,
            `You notice ${s.his} pussy is still heaving with need, and dripping between ${s.his} legs. `
        ]);
        if (s.isBimbo) {dlg += `@@.bf;The puddle between ${s.his} feet implies ${s.he}'s cum a number of times@@`};
    };
    dlg += `''\n`;
    
    s.changeRespect(0.5);
    s.changeFear(-0.5);
    dlg += `<<dom $player 3>>\n\n`;
    dlg += `<<horny 0>>\n\n`

    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgMasturbate = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    // Circumvent entire scene if slave cannot masturbate
    if (s.hasAnimalLimbs) {
        variables().passageFinished = true;
        dlg += `''You direct ${s.name} to sit in the middle of the room while you take a seat off to the side.''\n\n`;
        dlg += `<<nm $player "Okay ${s.name}, I'd like you to spread your legs and masturbate for me. I want you to cum in front of me while I watch.">>\n`;
        dlg += `''${s.name} moves to the center of the room as instructed, but is unable to comply with your request as ${s.he} no longer has the means to stimulate ${s.him}self. A look of shame streaks across ${s.his} face.'' `;
        if (s.hasAnimalVoice) {
            dlg += `${s.He} whines as ${s.he} raises a ${s.noise("paw")}.''`;
        } else if (s.isMute) {
            dlg += `${s.He} is unable to speak, but appears to be both distraught and confused. `;
        } else {
            dlg += `\n\n<<nmc "${s.name}" "Sorry, I can't anymore... You took my hands from me..." ${s.profile}>>`;
        };
        dlg += `<<nm $player "Ah, of course, my mistake...">>\n`;
        dlg += `<<btnBack>>`;

        return dlg;
    }

    // Main dialogue line
    dlg += `''You direct ${s.name} to sit in the middle of the room while you take a seat off to the side.''\n\n`;

    dlg += `<<nm $player "Okay ${s.name}, I'd like you to spread your legs and masturbate for me. I want you to cum in front of me while I watch.">>\n`;

    dlg += `''`;
    if (s.isBimbo) {
        dlg += `A lustful expression sweeps across ${s.his} face as ${s.he} moves into position. `;
    } else {
        dlg += slaveRespectDesc(s,[``,
            `${s.name} hesitates for a moment before reluctantly moving into position. `,
            `${s.name} reluctantly moves into position. `,
            `${s.name} moves into position. `,
            `${s.name} happily moves into position. `,
            `${s.name} quickly and happily moves into position. `
        ]);
    };
    if (s.hasAnimalLimbs) {
        dlg += `Since ${s.name} has ${s.animal} limbs, ${s.he} was already on the floor. `;
    } else if (s.hasClippedHeels || s.hasPulledHeels) {
        dlg += `Since ${s.name} can't walk upright anymore, ${s.he} was already on the floor. `;
    };
    if (s.hasPenis) {
        if (s.isBimbo) {
            dlg += `@@.bf;${s.His} ${s.getPenisSize()} cock is already cock hard and dripping precum.@@ `;
        } else {
            dlg += slaveHornyDesc(s,[``,
                `${s.His} ${s.getPenisSize()} cock hangs completely limp in front of ${s.him}. `,
                `${s.His} ${s.getPenisSize()} cock hangs limp in front of ${s.him}. `,
                `${s.His} ${s.getPenisSize()} cock hangs in front of ${s.him}, bobbing with some slight hardness. `,
                `${s.His} ${s.getPenisSize()} cock hangs slightly hard in front of ${s.him}. `,
                `${s.His} ${s.getPenisSize()} cock stands fully erect in front of ${s.him}. `
            ]);
        };
    } else {
        if (s.isBimbo) {
            dlg += `@@.bf;${s.His} pussy is pouring juices, in desperate need of attention.@@ `;
        } else {
            dlg += slaveHornyDesc(s,[``,
                `${s.His} pussy is dry and closed off. `,
                `${s.His} pussy is noticeably dry. `,
                `${s.His} pussy is slightly moist in anticipation. `,
                `${s.His} pussy is wet with anticipation. `,
                `${s.His} pussy is very wet and open in anticipation. `,
            ]);
        };
    };
    dlg += `''\n\n`;

    dlg += `<<nm $player "Well, go on then.">>\n`;

    dlg += `''`;
    if (s.hasPenis) {
        if (s.isBimbo) {
            dlg += `@@.bf;${s.name} eagerly starts stroking their ${s.getPenisSize()} cock, a desperate, lustful expression on ${s.his} face.@@ `;
        } else {
            dlg += `${s.name} starts stroking their ${s.getPenisSize()} cock `;
            dlg += slaveRespectDesc(s,[``,
                `while looking incredibly uncomfortable the entire time. `,
                `while looking very uncomfortable the entire time. `,
                `looking fairly indifferent about the whole thing. `,
                `while seeming to have a pretty enjoyable time. `,
                `while looking like they're thoroughly enjoying themselves. `
            ]);
        };
    } else {
        if (s.isBimbo) {
            dlg += `@@.bf;${s.name} eagerly plunges ${s.his} fingers into her drenched pussy, a depsperate, lustful expression ${s.his} face. `
        } else {
            dlg += `${s.name} starts rubbing their pussy `;
            dlg += slaveRespectDesc(s,[``,
                `while looking incredibly uncomfortable the entire time. `,
                `while looking very uncomfortable the entire time. `,
                `looking fairly indifferent about the whole thing. `,
                `while seeming to have a pretty enjoyable time. `,
                `while looking like they're thoroughly enjoying themselves. `
            ]);
        };
    };
    dlg += `''\n\n`;
    
    switch (s.id) {
        case 'sarina':
            if (s.hasPenis) {
                dlg += `<<pic $npc "sean-solo">>\n`;
            } else {
                dlg += `<<pic $npc "female-solo">>\n`;
            }
        default:
            if (s.gender !== "male") {
                dlg += `<<pic $action "${s.gen}-solo">>\n`;
            };
    };
    
    if (s.hasAnimalVoice) {
        dlg += `<<nmc "${s.name}" "H-haaaa... haaa... mmmm... nnnggg..." ${s.profile}>>\n`;
    } else if (s.isBimbo) {
        dlg += `<<nmc "${s.name}" "@@.bf;Mmmm... oooohhhh... keep watching me... mmmm...@@" ${s.profile}>>\n`;
    } else {
        dlg += slaveHornyDesc(s,[``,
            `<<nmc "${s.name}" "..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Haaa... haa..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Mmmm... oohhhh..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Mmmm, f-fuuuuck... oooohhhh..." ${s.profile}>>\n`
        ]);
    };

    dlg += `<<nm $player "That's it... Now cum for me!">>\n`;
    
    dlg += `''`;
    if (s.hasPenis) {
        dlg += `${s.name} starts stroking harder and faster, until finally `;
        if (s.hasBalls) {
            dlg += slaveHornyDesc(s,[``,
                `ejecting a weak spurt of cum. `,
                `ejecting a weak spurt of cum. `,
                `shooting a small load over ${s.his} hand. `,
                `shooting a few ropes of cum over ${s.his} hand. `,
                `shooting a huge load of cum across the floor. `
            ]);
        } else {
            dlg += `twitching and spasming in a dry orgasm. `;
        };
    } else {
        dlg += `${s.name} starts rubbing ${s.his} pussy harder and fast, until finally `;
        if (s.isBimbo) {
            dlg += `@@.bf;exploding in a huge orgasm across the floor.@@ `;
        } else {
            dlg += slaveHornyDesc(s,[``,
                `twitching in a weak, dribbling orgasm. `,
                `twitching in a weak, dribbling orgasm. `,
                `spasming in a dripping orgasm. `,
                `squirting juices onto the floor beneath ${s.him}. `,
                `spraying juices across the floor in front of ${s.him}. `
            ]);
        };
    };
    dlg += slaveRespectDesc(s,[``,
        `${s.He} hangs ${s.his} head in shame having finished in front of you. `,
        `${s.He} hangs ${s.his} head in shame having finished in front of you. `,
        `${s.He} catches ${s.his} breath, turning away from you out of embarrassment. `,
        `${s.He} catches ${s.his} breath, looking up at you as if seeking approval. `,
        `${s.He} smiles as ${s.he} catches ${s.his} breath, looking up at you with a proud expression on ${s.his} face. `
    ]);
    dlg += `''\n\n`;
    
    dlg += `<<nm $player "Mmm, good job, I must say that was fun to watch!">>\n.`;
    
    s.changeHorny(0.5);
    dlg += `<<dom $player 3>>\n\n<<horny 10>>\n`
    
    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgBlowjob = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    dlg += `''You take a seat in front of ${s.name} and motion ${s.him} over to you. ''`;
    if (s.hasAnimalLimbs) {
        dlg += `''${s.He} makes ${s.his} way over to you, crawling on ${s.his} ${s.animal} ${s.noise("paw")}s. ''`;
    } else if (s.hasPulledHeels || s.hasClippedHeels) {
        dlg += `''${s.He} makes ${s.his} way over to you, crawling on ${s.his} hands and knees, no longer able to walk upright. ''`;
    } else {
        dlg += `''${s.He} makes ${s.his} way over to you, kneeling in front of you. ''`;
    };

    dlg += `\n\n`;

    dlg += `<<nm $player "Very good! Now, let's see how your oral skills are coming along...">>\n`;

    dlg += `''You pull out <<pSize>> and stroke it in front of ${s.name}'s face. `;
    if (s.isBimbo) {
        dlg += `@@.bf;${s.His} eyes widen as drool leaks from the corner of ${s.his} mouth. ${s.He} doesn't hesitate for a moment before swallowing your cock.@@ `;
    } else {
        dlg += slaveRespectDesc(s,[``,
            `${s.He} can't hide the look of disgust on ${s.his} face as ${s.he} slowly and reluctantly takes your cock into ${s.his} mouth. `,
            `${s.He} can't hide the pained look on ${s.his} face as ${s.he} slowly and reluctantly takes your cock into ${s.his} mouth. `,
            `${s.He} reluctantly does as ${s.he}'s told, taking your cock into ${s.his} mouth. `,
            `${s.He} smiles up at you before happily taking your cock into ${s.his} mouth. `,
            `${s.He} smiles up at you before eagerly swallowing your cock. `,
        ]);
    };
    dlg += `''\n\n`;

    if (s.id == 'lauren') {
        dlg += `<<pic $lauren "suck-player">>\n`;
    } else if (s.id == 'elsa') {
        dlg += `<<pic $elsa "suck-player">>\n`;
    } else {
        dlg += `<<pic $action "${s.gen}-suck-player">>\n`;
    };

    if (s.isBimbo) {
        dlg += `<<nmc "${s.name}" "@@.bf;Mmmmm... mmmmm... haaaa... mmmph! MPH MMMPH! HHNHGPH!!!@@" ${s.profile}>>\n`;
        dlg += `''${s.name} desperately bobs up and down on your <<pSize>>, quickly pushing you to the brink of orgasm.''\n\n`;
    } else {
        dlg += slaveHornyDesc(s,[``,
            `<<nmc "${s.name}" "Mph... hmph... mph..." ${s.profile}>>\n
            ''${s.name} puts in a minimum amount of effort as ${s.he} takes your <<pSize>> into his mouth. After some time, you're finally worked up to the point of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mph, mph... mph..." ${s.profile}>>\n
            ''${s.name} unenthusiastically works your <<pSize>> with ${s.his} mouth, eventually bringing you to the brink of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mmph... mmm... mph..." ${s.profile}>>\n
            ''${s.name} works your <<pSize>> with ${s.his} mouth, occassionally getting you to the back of ${s.his} throat, until finally getting you to the brink of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mmmm... haaamph... hngph..." ${s.profile}>>\n
            ''${s.name} eagerly takes your <<pSize>> into ${s.his} mouth, bobbing up and down until you're brought to the brink of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mph! MMPH! MMmmmm..." ${s.profile}>>\n
            ''${s.name} desperately takes your <<pSize>> into ${s.his} mouth, working it deep into the back of ${s.his} throat until you're brought to the brink of orgasm.''\n\n`
        ]);
    };

    dlg += `<<nm $player "O-oh f-fuck! I'm c-cumming!">>\n`;

    if (s.id == 'lauren') {
        dlg += `<<pic $lauren "cum-in-mouth">>\n`;
    } else if (s.id == 'elsa') {
        dlg += `<<pic $elsa "cum-in-mouth">>\n`;
    } else {
        dlg += `<<pic $action "${s.gen}-oral-creampie">>\n`;
    };

    dlg += `<<nmc "${s.name}" "HNGPH!" ${s.profile}>>\n`;

    dlg += `''You hold ${s.name}'s head in place `;
    if (s.ears !== "normal") {dlg += `, wrapping your fingers around ${s.his} fluffy ${s.animal} ears, `};
    dlg += `as you empty your hot load down the back of ${s.his} throat. Once you're done, you pull your <<pSize>> out of ${s.name}'s mouth, allowing the thick cum to drip out onto the floor, and clean yourself up.''\n\n`;

    dlg += `<<nm $player "Haa, that's better. Good job, ${s.name}. Let's make sure you continue to get plenty of practice!">>\n`;

    if (s.isMute) {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `''${s.name} nods, unable to speak but accepting your praise. ''`,
            `''${s.name} is unable to speak, but smiles in appreciation of your praise. ''`,
            `''${s.name} is unable to speak, but smiles widely in appreciation of your praise ''`
        ]);
    } else if (s.hasAnimalVoice) {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `''${s.name} nods, unable to speak but accepting your praise. ''`,
            `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`
        ]);
    } else {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `<<nmc "${s.name}" "T-thanks..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "T-thank you, <<Master>>." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Thank you <<Master>>!" ${s.profile}>>\n`
        ]);
    };

    dlg += `''You finish cleaning up and return to work.''\n\n`;

    s.changeHorny(0.5);
    s.changeRespect(0.5);
    dlg += `<<dom $player 3>>\n\n`;
    dlg += `<<horny 0>>\n\n`;
    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgEatPussy = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    dlg += `''You take a seat in front of ${s.name} and motion ${s.him} over to you. ''`;
    if (s.hasAnimalLimbs) {
        dlg += `''${s.He} makes ${s.his} way over to you, crawling on ${s.his} ${s.animal} ${s.noise("paw")}s. ''`;
    } else if (s.hasPulledHeels || s.hasClippedHeels) { 
        dlg += `''${s.He} makes ${s.his} way over to you, crawling on ${s.his} hands and knees, no longer able to walk upright. ''`;
    } else {
        dlg += `''${s.He} makes ${s.his} way over to you, kneeling in front of you. ''`;
    };

    dlg += `\n\n`;

    dlg += `<<nm $player "Very good! Now, let's see how your oral skills are coming along...">>\n`;

    dlg += `''You slide out of your <<bottom>> and spread your <<vSize>> in front of ${s.name}'s face. `;
    if (s.isBimbo) {
        dlg += `@@.bf;${s.His} eyes widen as drool leaks from the corner of ${s.his} mouth. ${s.He} doesn't hesitate for a moment before diving for your mound.@@ `;
    } else {
        dlg += slaveRespectDesc(s,[``,
            `${s.He} can't hide the look of disgust on ${s.his} face as ${s.he} slowly and reluctantly takes your pussy into ${s.his} mouth. `,
            `${s.He} can't hide the pained look on ${s.his} face as ${s.he} slowly and reluctantly takes your pussy into ${s.his} mouth. `,
            `${s.He} reluctantly does as ${s.he}'s told, taking your pussy into ${s.his} mouth. `,
            `${s.He} smiles up at you before happily taking your pussy into ${s.his} mouth. `,
            `${s.He} smiles up at you before eagerly lapping away at your pussy. `,
        ]);
    };
    dlg += `''\n\n`;

    if (s.id == 'lauren') {
        dlg += `<<pic $lauren "eat-pussy">>\n`;
    } else if (s.id == 'elsa') {
        dlg += `<<pic $elsa "eat-pussy">>\n`;
    } else {
        dlg += `<<pic $action "${s.gen}-eat-pussy">>\n`;
    };

    if (s.isBimbo) {
        dlg += `<<nmc "${s.name}" "@@.bf;Mmmmm... mmmmm... haaaa... mmmph! MPH MMMPH! HHNHGPH!!!@@" ${s.profile}>>\n`;
        dlg += `''${s.name} desperately licks and slurps at your dribbling pussy, quickly pushing you to the brink of orgasm.''\n\n`;
    } else {
        dlg += slaveHornyDesc(s,[``,
            `<<nmc "${s.name}" "Mph... hmph... mph..." ${s.profile}>>\n
            ''${s.name} puts in a minimum amount of effort as ${s.he} licks your <<vSize>>. After some time, you're finally worked up to the point of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mph, mph... mph..." ${s.profile}>>\n
            ''${s.name} unenthusiastically works your <<vSize>> with ${s.his} mouth, eventually bringing you to the brink of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mmph... mmm... mph..." ${s.profile}>>\n
            ''${s.name} works your <<vSize>> with ${s.his} mouth, occassionally hitting your sweat spots with ${s.his} tongue, until finally getting you to the brink of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mmmm... haaamph... hngph..." ${s.profile}>>\n
            ''${s.name} eagerly licks your <<vSize>>, sliding up and down your slit and nibbling your clit until you're brought to the brink of orgasm.''\n\n`,
            `<<nmc "${s.name}" "Mph! MMPH! MMmmmm..." ${s.profile}>>\n
            ''${s.name} desperately licks your <<vSize>>, penetrating deep with ${s.his} tongue until you're brought to the brink of orgasm.''\n\n`
        ]);
    };

    dlg += `<<nm $player "O-oh f-fuck! I'm c-cumming!">>\n`;

    dlg += `<<pic $player "squirt">>\n`;

    dlg += `<<nmc "${s.name}" "HNGPH!" ${s.profile}>>\n`;

    dlg += `''You hold ${s.name}'s head in place `;
    if (s.ears !== "normal") {dlg += `, wrapping your fingers around ${s.his} fluffy ${s.animal} ears, `};
    dlg += `as you unleash a torrent of juices across ${s.his} face and into ${s.his} mouth. Once you're done, you pull your drenched pussy away from ${s.name}'s mouth, allowing the thick juices to drip off of ${s.him}, and clean yourself up.''\n\n`;

    dlg += `<<nm $player "Haa, that's better. Good job, ${s.name}. Let's make sure you continue to get plenty of practice!">>\n`;

    if (s.isMute) {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `''${s.name} nods, unable to speak but accepting your praise. ''`,
            `''${s.name} is unable to speak, but smiles in appreciation of your praise. ''`,
            `''${s.name} is unable to speak, but smiles widely in appreciation of your praise ''`
        ]);
    } else if (s.hasAnimalVoice) {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `''${s.name} nods, unable to speak but accepting your praise. ''`,
            `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`
        ]);
    } else {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `<<nmc "${s.name}" "T-thanks..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "T-thank you, <<Master>>." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Thank you <<Master>>!" ${s.profile}>>\n`
        ]);
    };

    dlg += `''You finish cleaning up and return to work.''\n\n`;

    s.changeHorny(0.5);
    s.changeRespect(0.5);
    dlg += `<<dom $player 3>>\n\n`;
    dlg += `<<horny 0>>\n\n`;
    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgInspection = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    dlg += `''You motion for ${s.name} to move to the center of the room. ''`;
    if (s.hasAnimalLimbs) {
        dlg += `''${s.He} makes ${s.his} way over to where you signal, crawling on ${s.his} ${s.animal} ${s.noise("paw")}s. ''\n\n`;
    } else if (s.hasPulledHeels || s.hasClippedHeels) {
        dlg += `''${s.He} makes ${s.his} way over to where you signal, crawling on ${s.his} hands and knees, no longer able to walk upright. ''\n\n`;
    } else {
        dlg += `''${s.He} makes ${s.his} way over to where you signal, standing in front of you. ''\n\n`;
    };

    dlg += `<<nm $player "Very good! Now, let's have a look at you...">>\n`;

    if (s.ears !== "normal") {
        dlg += `''You eyes immediately migrate towards ${s.name}'s ${s.animal} ears, and you can't stop yourself from reaching out and grabbing them.''\n\n`;

        dlg += `<<nm $player "They're so soft... How does that feel?">>\n`;

        if (s.isMute) {
            dlg += (s.respect > 3 ? `''${s.name} smiles lovingly at you.''\n\n` : `''${s.name} turns ${s.his} eyes from you.''\n\n`);
            dlg += `<<nm $player "Ah, right, can't speak...">>\n`;
        } else if (s.hasAnimalVoice) {
            dlg += `<<nmc "${s.name}" "Ah... Mm... ${s.noise()}!" ${s.profile}>>\n\n`;
            dlg += `<<nm $player "Hahaha, haaa...">>\n`;
        } else {
            dlg += slaveRespectDesc(s,[``,
                `<<nmc "${s.name}" "..." ${s.profile}>>\n`,
                `<<nmc "${s.name}" "...I-it's fine." ${s.profile}>>\n`,
                `<<nmc "${s.name}" "...F-fine, I guess." ${s.profile}>>\n`,
                `<<nmc "${s.name}" "It feels really nice, M-<<Master>>" ${s.profile}>>\n`,
                `<<nmc "${s.name}" "I love it when you pet them, <<Master>>!" ${s.profile}>>\n`
            ]);
        };
    };

    dlg += `''You slide your hand down to ${s.name}'s ${s.getBreastSize()} `;
    dlg += (s.hasBreasts ? `breasts` : `chest`);
    dlg += `, taking your time to feel ${s.him} up until you're satisfied.''\n\n`;

    if (s.hasAnimalLimbs) {
        dlg += `<<nm $player "Good ${s.boy}, now roll over for me.">>\n`;
        dlg += `''${s.name} does as instructed, rolling over and exposing ${s.his} belly. In this position, ${s.his} ${s.animal} legs are naturally spread opening, leaving ${s.his} `;
        dlg += (s.hasPussy ? `pussy ` : `${s.getPenisSize()} cock `);
        dlg += `in full view.''\n\n`;
    } else {
        dlg += `<<nm $player "Good ${s.boy}, now spread your legs for me.">>\n`;
        dlg += `''${s.name} does as instructed, spreading ${s.his} legs and exposing ${s.his} `;
        dlg += (s.hasPussy ? `pussy ` : `${s.getPenisSize()} cock `);
        dlg += `to you.''\n\n`;
    };

    if (s.hasPussy) {
        dlg += `''You slide your hand down between ${s.name}'s legs and rub ${s.his} pussy. `;
        if (s.isBimbo) {
            dlg += `@@.bf;${s.He}'s already sopping wet, likely just from exposing ${s.him}self to you.@@ `;
        } else {
            dlg += slaveHornyDesc(s,[``,
                `${s.He}'s completely dry, requiring a lot of stimulation before ${s.he} starts getting wet. `,
                `${s.He}'s completely dry, requiring a good bit of stimulation before ${s.he} starts getting wet. `,
                `${s.He}'s dry, but it doesn't take long before you have ${s.his} pussy nice and wet. `,
                `${s.He}'s already wet as you run your hand between ${s.his} legs. `,
                `${s.He}'s already soaking wet as you run your hand between ${s.his} legs. `
            ]);
        };
    } else {
        dlg += `''You slide your hand down between ${s.name}'s legs, wrapping your fingers around ${s.his} ${s.getPenisSize()} penis. `;
        if (s.isBimbo) {
            dlg += `@@.bf;${s.He}'s already rock hard, likely just from exposing ${s.him}self to you.@@ `;
        } else {
            dlg += slaveHornyDesc(s,[``,
                `${s.He}'s completely flaccid, requiring a lot of stimulation before ${s.he} starts getting hard. `,
                `${s.He}'s completely flaccid, requiring a good bit of stimulation before ${s.he} starts getting hard. `,
                `${s.He}'s flaccid, but it doesn't take long before you have ${s.his} cock nice and hard. `,
                `${s.He}'s already hard as you run your hand between ${s.his} legs. `,
                `${s.He}'s already rock hard as you run your hand between ${s.his} legs. `
            ]);
        };
    };
    dlg += `You play for a bit, withrawing your hand before ${s.he} gets 'too' close to orgasm.\n\n`;

    dlg += `<<nm $player "Very nice! Your owners will definitely have fun with you! Now, one last thing... Turn around for me.">>\n`;

    dlg += `<<nmc "${s.name}" "M-<<Master>>?" ${s.profile}>>\n`;

    dlg += `''You motion with your hand for ${s.him} to turn around until ${s.he} finally complies. `;
    if (s.hasClippedHeels || s.hasPulledHeels || s.hasAnimalLimbs) {
        dlg += `On ${s.his} hands and knees, you have a clear view of ${s.his} spread asshole. `;
    } else {
        dlg += `As ${s.he} turns around, you also direct ${s.him} to get down on ${s.his} hands and knees, giving you a clear view of ${s.his} spread asshole. `;
    };
    dlg += `As ${s.name} maintains ${s.his} position facing away from you, you apply a light amount of lubricant to your fingers before plunging them into ${s.name}'s asshole without warning.''\n\n`;

    if (s.isMute) {
        dlg += `<<nmc "${s.name}" "Hhhhhhhhhhaaaaaa......." ${s.profile}>>\n`;
    } else if (s.hasAnimalVoice) {
        dlg += `<<nmc "${s.name}" "${s.noise('howl')}" ${s.profile}>>\n`;
    } else if (s.isBimbo) {
        dlg += `<<nmc "${s.name}" "@@.bf;OOOooohhhhh fuuuck! MORE! HARDER!!! Mmmmm...@@" ${s.profile}>>\n`;
    } else {
        dlg += slaveHornyDesc(s,[``,
            `<<nmc "${s.name}" "HHNNNG! A-ahhh!" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "HNG! A-ahhh!" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "A-ahhh!" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "M-mmm, oohhh!" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Haaaa! Fuuuu, mmmmm..." ${s.profile}>>\n`,
        ]);
    };

    dlg += `<<nm $player "That should wrap things up for now. Good job, ${s.name}! Let's keep up the good work, okay?">>\n`;

    if (s.isMute) {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `''${s.name} nods, unable to speak but accepting your praise. ''`,
            `''${s.name} is unable to speak, but smiles in appreciation of your praise. ''`,
            `''${s.name} is unable to speak, but smiles widely in appreciation of your praise ''`
        ]);
    } else if (s.hasAnimalVoice) {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `''${s.name} nods, unable to speak but accepting your praise. ''`,
            `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`,
            `<<nmc "${s.name}" "${s.noise('speak')}" ${s.profile}>>\n`
        ]);
    } else {
        dlg += slaveRespectDesc(s,[``,
            `''${s.name}'s expression drops, as ${s.he} refuses to make eye contact. ''`,
            `''${s.name}'s expression drops, as ${s.he} struggles to make eye contact. ''`,
            `<<nmc "${s.name}" "T-thanks..." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "T-thank you, <<Master>>." ${s.profile}>>\n`,
            `<<nmc "${s.name}" "Thank you <<Master>>!" ${s.profile}>>\n`
        ]);
    };

    dlg += `''You clean up and return to work.''\n\n`;

    s.changeHorny(0.25);
    s.changeRespect(0.75);
    dlg += `<<dom $player 3>>\n\n`;
    dlg += `<<horny 0>>\n\n`;
    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgChangeGender = function (s,g) {
    // Initialize empty dialogue variable
    var dlg = "";

    // Generate scene dialogue
    if (g == "masculine") {
        dlg += `<<nm $player "From now own, we're going to start referring to you as a man. How does that make you feel?">>\n`;

        dlg += `''${s.name} thinks on it for a moment.''\n\n`;

        dlg += `<<nmc "${s.name}" "`;
        dlg += slaveGValDesc(s,[``,
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It doesn't make a difference to me...`,
                `...It doesn't make a difference to me...`,
                `It's fine by me.`,
                `That sounds okay, M-<<Master>>.`,
                `That sounds good, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It doesn't make a difference to me...`,
                `...It doesn't make a difference to me...`,
                `It's fine by me.`,
                `That sounds okay, M-<<Master>>.`,
                `That sounds good, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It doesn't make a difference to me...`,
                `...It doesn't make a difference to me...`,
                `It's fine by me.`,
                `That sounds okay, M-<<Master>>.`,
                `That sounds good, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `T-thank you...`,
                `T-thank you...`,
                `That would be great.`,
                `Thank you so much, M-<<Master>>.`,
                `Really? Thank you, <<Master>>!`
            ]),
            slaveRespectDesc(s,[``,
                `T-thank you...`,
                `T-thank you...`,
                `That would be great.`,
                `Thank you so much, M-<<Master>>.`,
                `Really? Thank you, <<Master>>!`
            ]),
            slaveRespectDesc(s,[``,
                `T-thank you...`,
                `T-thank you...`,
                `That would be great.`,
                `Thank you so much, M-<<Master>>.`,
                `Really? Thank you, <<Master>>!`
            ])
        ]);
        dlg += `" ${s.profile}>>\n`

        if (s.gVal >= 7) {
            s.changeRespect(0.5)
            s.changeFear(-0.5)
        } else if (s.gVal <= 4) {
            s.changeRespect(-0.75)
            s.changeFear(0.5)
        };
    } else {
        dlg += `<<nm $player "From now own, we're going to start referring to you as a woman. How does that make you feel?">>\n`;

        dlg += `''${s.name} thinks on it for a moment.''\n\n`;

        dlg += `<<nmc "${s.name}" "`;
        dlg += slaveGValDesc(s,[``,
            slaveRespectDesc(s,[``,
                `T-thank you...`,
                `T-thank you...`,
                `That would be great.`,
                `Thank you so much, M-<<Master>>.`,
                `Really? Thank you, <<Master>>!`
            ]),
            slaveRespectDesc(s,[``,
                `T-thank you...`,
                `T-thank you...`,
                `That would be great.`,
                `Thank you so much, M-<<Master>>.`,
                `Really? Thank you, <<Master>>!`
            ]),
            slaveRespectDesc(s,[``,
                `T-thank you...`,
                `T-thank you...`,
                `That would be great.`,
                `Thank you so much, M-<<Master>>.`,
                `Really? Thank you, <<Master>>!`
            ]),
            slaveRespectDesc(s,[``,
                `...It doesn't make a difference to me...`,
                `...It doesn't make a difference to me...`,
                `It's fine by me.`,
                `That sounds okay, M-<<Master>>.`,
                `That sounds good, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It doesn't make a difference to me...`,
                `...It doesn't make a difference to me...`,
                `It's fine by me.`,
                `That sounds okay, M-<<Master>>.`,
                `That sounds good, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It doesn't make a difference to me...`,
                `...It doesn't make a difference to me...`,
                `It's fine by me.`,
                `That sounds okay, M-<<Master>>.`,
                `That sounds good, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ]),
            slaveRespectDesc(s,[``,
                `...It's not like I have a say in the matter...`,
                `...`,
                `...It's fine...`,
                `If that's what think is best.`,
                `That's okay with me, <<Master>>.`
            ])
        ]);
        dlg += `" ${s.profile}>>\n`

        if (s.gVal >= 7) {
            s.changeRespect(-0.75)
            s.changeFear(0.5)
        } else if (s.gVal <= 4) {
            s.changeRespect(0.5)
            s.changeFear(-0.5)
        };
    };
    variables().pitSlaves[s.id].updatePronouns(g);
    s.updatePronouns(g);

    dlg += `''You scribble some things down in a notebook.''\n\n`;

    dlg += `<<nm $player "Alright then, from now on, you'll be referenced by ${s.gID} pronouns, ${s.he}, ${s.him}, ${s.hiss}, etc.">>\n`;

    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgAppraisal = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    // Generate scene dialogue
    dlg += `''You step over to the nearby intercom device on the wall and dial in a couple numbers. After a couple moments, a man's voice answers on the other end.''\n\n`;

    dlg += `<<nm $player "Heya $craig.name... yeah, it's $player.name... No, everything's fine, actually I wanted to get an appraiser over here? Yeah, yeah for ${s.name}... Uh-huh... Sounds good, we'll wait. Thanks.">>\n`;

    dlg += `''You and ${s.name} sit quietly until there's a knock at the door. Before you can get out of your seat, an older woman lets herself into the room.''\n\n`;

    dlg += `<<nmc "Appraiser" "No no, don't get up... This it?" "UnknownF">>\n`;

    dlg += `<<nm $player "Y... Yes, this is ${s.name}.">>\n`;

    dlg += `''She looks the slave ${s.boy} up and down for a few moments before turning to you.''\n\n`;

    dlg += `<<nmc "Appraiser" "You named it... cute... Anyway, let's see... `;

    if (variables().PrefSlaveGender == s.gender) {
        dlg += `I've noticed ${s.gender} slaves are in high demand right now, so you've got that going for you. `;
    } else {
        dlg += `I've noticed ${s.gender} slaves aren't particularly popular right now, $PrefSlaveGender slaves are all the rage right now. `;
    };

    if (s.hasPenis) {
        if (s.penisSize > 3) {
            dlg += `${s.His} big dick adds some value`;
        }
        if (s.hasBalls) {
            dlg += `. `;
        } else {
            dlg += `, the fact that ${s.he}'s castrated helps, too. `;
        };
    };
    if (s.hasBreasts) {
        if (s.breastSize > 3) {
            dlg += `${s.He} has some nice tits, that's always good. `;
        };
    };
    dlg += `Just by looking at ${s.him} I can tell ${s.he}'s `;
    dlg += slaveSmartDesc(s,[``,
        `dumb as rocks, `,
        `quite stupid, `,
        `not too bright, `,
        `reasonably intelligent, `,
        `quite intelligent, `
    ]);
    dlg += slaveFearDesc(s,[``,
        `a little comfortable around you, `,
        `very comfortable around you, `,
        `not too worried about you mistreating ${s.his}, `,
        `very afraid of you, `,
        `abjectly terrified of you, `,
    ]);
    dlg += slaveRespectDesc(s,[``,
        `and doesn't seem to have an ounce of respect for you. `,
        `and doesn't seem to have much respect for you. `,
        `and doesn't hold you in very high regard. `,
        `and seems to actually respect you. `,
        `and seems to have a lot of respect for you. `
    ]);
    dlg += slaveHornyDesc(s,[``,
        `Doesn't seem to have any sex drive, though. `,
        `Doesn't seem to have much sex drive, though. `,
        `${s.He} could use a higher sex drive, though. `,
        `${s.He} also seems to have a nice sex drive. `,
        `${s.He} also appears to have an excellent sex drive! `
    ]);
    dlg += `" "UnknownF">>\n`;

    dlg += `''She circles around ${s.name}, getting in closer.''\n\n`;

    if (s.animal) {
        dlg += `<<nmc "Appraiser" "Seem to also have this whole animal ${s.boy} thing going. That's been pretty popular lately and I'm sure it'll elevate what you could get for it. Other traits could make it more desirable as well, but I'm in a bit of a hurry. Let's see... `;
    } else {
        dlg += `<<nmc "Appraiser" "Yeah, there are a lot of factors that can affect a slave's value, don't have the time to get into all the details right now, though. Let's see... `;
    };

    variables().pitSlaves[s.id].updateValue(variables.PrefSlaveGender);
    s.updateValue(variables().PrefSlaveGender);

    if (s.value >= 100000) {
        dlg += `@@.gain;I'd say you're sitting on a goldmine if you decide to sell now.@@ `;
    } else if (s.value >= 75000) {
        dlg += `@@.sf;I'd say your slave is definitely worth a pretty penny if you decide to sell now.@@ `;
    } else if (s.value >= 50000) {
        dlg += `@@.tf;I'd say you could get a decent amount for this one, depending on what you've already put into it.@@ `;
    } else {
        dlg += `@@.loss;I'd say you could probably put some work in and get a little more for this one...@@ `;
    };
    
    dlg += `Anyway, that's my time for today. Call me down any time for a fresh appraisal. I'll let myself out." "UnknownF">>\n`;

    dlg += `<<nm $player "Thanks for your time!">>\n`;

    dlg += `''The woman quickly leaves the room, closing the door behind her.''\n\n`;

    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};

window.dlgSellSlave = function (s) {
    // Initialize empty dialogue variable
    var dlg = "";

    // Generate scene dialogue
    dlg += `''You step over to the nearby intercom device on the wall and dial in a couple numbers. After a couple moments, a man's voice answers on the other end.''\n\n`;

    dlg += `<<nm $player "Heya $craig.name... yeah, it's $player.name... Right, I'm down here with ${s.name}, and I think it's time to find a buyer for ${s.him}... Uh-huh... Sounds good, we'll wait. Thanks.">>\n`;

    dlg += `''You and ${s.name} wait quietly until $craig.name arrives at the door with a couple of his assistants. They move in to put the ${s.boy} in transport restraints while $craig.name approaches you.''\n\n`;

    dlg += `<<nm $craig "So, finally decide to sell this one, huh? Alright, we'll look for a buyer, shouldn't take long. In the meantime, we've been instructed to limit putting one of your projects on the market at a time, so you'll need to wait until you're paid for this one before we can accommodate any further sales. Good?">>\n`;

    dlg += `<<nm $player "Yeah, that sounds good. Thanks.">>\n`

    dlg += `<<nm $craig "Any time, kid. Alright boys, let's take this one to the yard!">>\n`

    dlg += `''And with that, $craig.name and ${s.name} were gone...''\n\n`;

    variables().SlaveForSale = true;
    variables().SlaveForSaleValue = s.value;
    variables().SlaveForSaleName = s.name;

    delete variables().pitSlaves[s.id];

    dlg += `<<btnLink "Return to The Pit" "Pit-Slave-Training" "passTime()">>`;

    return dlg;
};
/* twine-user-script #56: "slaveFunctions.js" */
window.getSlaveByID = function(id, slaves = variables().pitSlaves) {
    for (var slave in slaves) {
        if (slaves[slave].id == id) {
            return slaves[slave];
        };
    };
};

window.assignSlaveToCubicles = function(slave) {
    // define cubeSlaves if it doesn't exist
    if (!variables().cubeSlaves) {
        variables().cubeSlaves = {};
    };
    if (!variables().WeeklySlavePay) {
        variables().WeeklySlavePay = 0;
    }

    // Remove slave from pitSlaves object
    var slaves = Object.keys(variables().pitSlaves);

    for (var i = 0; i < slaves.length; i++) {
        if (variables().pitSlaves[slaves[i]].id == slave.id) {
            variables().cubeSlaves[slave.name.toLowerCase()] = slave;
            variables().WeeklySlavePay += slave.value * variables().WeeklySlavePayMod;
            delete variables().pitSlaves[slaves[i]];
        };
    };

    // Free up a slot in the pit
    variables().PitSlots -= 1;
};

window.assignSlaveToRoom = function(slave) {
    // define roomSlave if it doesn't exist
    if (!variables().roomSlave) {
        variables().roomSlave = {};
    };

    // Remove slave from pitSlaves object
    var slaves = Object.keys(variables().pitSlaves);

    for (var i = 0; i < slaves.length; i++) {
        if (variables().pitSlaves[slaves[i]].id == slave.id) {
            setPerk(slave, "Room Slave");
            variables().roomSlave = slave;
            delete variables().pitSlaves[slaves[i]];
        };
    };

    // Free up a slot in the pit
    variables().PitSlots -= 1;
};
/* twine-user-script #57: "thePitDlg.js" */
window.psGetOral = function(s) {
    // Initialize empty dialog string
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Update for pit assistant
    if (!hasWorkingPenis() && !hasPussy()) {
        var useAssist = true;
        dlg += `Since you are unable to train ${s.name} in this area yourself, you call over your training assistant to help you out. `;
    };

    // Generate scene dialog
    if (useAssist) {
        dlg += `You direct ${s.name} over to your assistant's cock, allowing it to hover over ${s.his} face for a moment. `;
    } else {
        dlg += `You direct ${s.name} over to your <<pSize>>, allowing it to hover over ${s.his} face for a moment. `;
    };
    
    if (hasPerk(s, "Clipped Heels")) {
	    dlg += `@@.sf;Since ${name} can't walk on ${his} own do to their heels being clipped, they're already kneeling in place waiting.@@ `;
	    if (hasPerk(s,"Nymphomaniac")) {
	    	dlg += `@@.xxx;While kneeling, you can see ${name} is already ${s.wet()} with excitement. `;
    	};
    } else if (hasPerk(s,"Nymphomaniac")) {
	    dlg += `@@.xxx;As ${he} approaches, you can see ${name} is already ${s.wet()} with excitement. `;
    };

	if (s.trait.name == "Oral Addict") {
		dlg += `@@.xxx;${name}'s breathing starts to intensify. The thought of getting to wrapping their mouth around a stiff cock has them salivating.@@ `;
	};
	
	if (hasPerk(s, "Oral Expert")) {
		dlg += `@@.sf;${name} starts to salivate at the thought of getting to servive a thick, hard cock. ${his} eyes are full of unabashed lust and need.@@ `;
	} else if (hasPerk(s, "Oral Fixation")) {
        dlg += `@@.sf;${s.He} licks ${s.his} lips, eager to get started.@@ `;
    } else if (s.wlp >= 4) {
        dlg += `${s.He} sneers at you, but you can see ${s.his} eyes are wide with lust. `;
    } else {
        dlg += `${s.He} licks ${s.his} lips, knowing what you're wanting from ${s.him} and happy to give it to you. `;
    };

    dlg += `\n\n`;

    if (useAssist) {
        dlg += `You order ${s.him} to open ${s.his} mouth, and ${s.he} does so. Your assistant guides his cock into ${s.his} mouth, and ${s.he} begins to suck on it. `;
    } else {
        dlg += `You order ${s.him} to open ${s.his} mouth, and ${s.he} does so. You guide your <<StraponOrCock size>> into ${s.his} mouth, and ${s.he} begins to suck on it. `;
    };

    dlg += `\n\n`;
    
    if (useAssist) {
        dlg += `<<pic $action "${s.gen}-suck-male">>\n`;
    } else {
        dlg += `<<pic $action "${s.gen}-suck-player">>\n`;
    };

    if (useAssist) {
        dlg += s.skillDlg("oral",
            `${s.name} clearly dislikes having your assistant's cock in ${s.his} mouth, choking and gagging through the barely subpar blowjob.`,
            `${s.name} doesn't quite know how to please a cock yet, and struggles to take the length of the shaft.`,
            `${s.name} slides your assistant's cock along ${s.his} tongue, taking care to keep ${s.his} teeth away from it.`,
            `${s.name} takes your assistant's cock easily into his ${s.his} throat, gagging occassionally but otherwise handling him quite nicely.`,
            `${s.name} eagerly takes your assistant's cock down ${s.his} throat, an expression of pure joy across ${s.his} lustful face.`,
            `${s.name} hungrily takes the entirety of your assistant's cock down ${s.his} throat, you can see your assistant ready to orgasm almost immediately as ${s.he} bobs up and down on his member.`
        );
    } else {
        dlg += s.skillDlg("oral",
            `${s.name} clearly dislikes having your <<StraponOrCock>> in ${s.his} mouth, choking and gagging through the barely subpar blowjob.`,
            `${s.name} doesn't quite know how to please a cock yet, and struggles to take the length of the shaft.`,
            `${s.name} slides your <<StraponOrCock size>> along ${s.his} tongue, taking care to keep ${s.his} teeth away from it.`,
            `${s.name} takes your <<StraponOrCock size>> easily into his ${s.his} throat, gagging occassionally but otherwise handling you quite nicely.`,
            `${s.name} eagerly takes your <<StraponOrCock size>> down ${s.his} throat, an expression of pure joy across ${s.his} lustful face.`,
            `${s.name} hungrily takes the entirety of your <<StraponOrCock size>> down ${s.his} throat, you can feel yourself ready to orgasm almost immediately as ${s.he} bobs up and down on your member.`
        );
    };
    
    if (hasPerk(s,"Oral Expert")) {
	    dlg += `As an @@.xxx;expert in oral pleasure@@, it's really no surprise how amazing ${name}'s skills are. ` 
    } else if (hasPerk(s, "Oral Fixation")) {
	    dlg += `Given ${his} @@.sf;oral fixation@@, there's no hiding how much ${he} enjoyed this session. `;
    }

    if (useAssist || hasPenis()) {
        dlg += `\n\n`;

        dlg += `<<pic $action "${s.gen}-oral-creampie">>`
    };

    s.skills.oral += 1;
    s.skills.sub += 0.5;
    return dlg;
};

window.psGetAnal = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Update for pit assistant
    if (!hasWorkingPenis() && !hasPussy()) {
        var useAssist = true;
        dlg += `Since you are unable to train ${s.name} in this area yourself, you call over your training assistant to help you out. `;
    };

    // Generate scene dialog
    if (useAssist) {
        dlg += `You direct ${name} over to your assistant's cock, allowing it to hover over ${his} face for a moment before instructing ${him} to turn around and present ${his} ass to him. `;
    } else {
        dlg += `You direct ${name} over to your <<pSize>>, allowing it to hover over ${his} face for a moment before instructing ${him} to turn around and present ${his} ass to you. `;
    };
    
    if (hasPerk(s, "Clipped Heels")) {
	    dlg += `@@.sf;Since ${name} can't walk on ${his} own do to their heels being clipped, they're already on their hands and knees waiting.@@ `;
	    if (hasPerk(s,"Nymphomaniac")) {
	    	dlg += `@@.xxx;While on all fours, you can see ${name} is already ${s.wet()} with excitement. `;
    	};
    } else if (hasPerk(s,"Nymphomaniac")) {
	    dlg += `@@.xxx;As ${he} approaches, you can see ${name} is already ${s.wet()} with excitement. `;
    };

    if (s.trait.name == "Anal Addict") {
        dlg += `@@.xxx;With ${his} innate addiction to anal sex, ${name} is beyond excited to get ${his} ass pounded today.@@ `;
    } else if (hasPerk(s, "Masochist")) {
        dlg += `@@.sf;As a masochist, ${name} is excited at the thought of getting brutally sodomized.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.sf;As a submissive slave, ${name} is eager to get started and please ${his} partner.@@ `;
    };

    if (useAssist) {
        if (s.trait.name == "Anal Aversion") {
            dlg += `@@.bd;Having ${his} ass exposed like this has ${him} feeling incredibly uncomfortable.@@ `;
        } else if (hasPerk(s, "Anal Fixation") || s.trait.name == "Anal Addict") {
            dlg += `@@.gd;${He} shakes ${his} ass in the air, eager to be penetrated.@@ `;
        } else if (s.wlp >= 4) {
            dlg += `${He} sighs heavily, unhappy with what's about to happen, but knowing ${he} can't do anything to prevent it. `;
        } else {
            dlg += `${He} obediently gets into position, bending over on ${his} elbows and raising ${his} ass into the air. `;
        };
    } else {
        if (s.trait.name == "Anal Aversion") {
            dlg += `@@.bd;Having ${his} ass exposed to you like this has ${him} feeling incredibly uncomfortable.@@ `;
        } else if (hasPerk(s, "Anal Fixation")) {
            dlg += `@@.gd;${He} shakes ${his} ass in the air, eager to have you penetrate ${him}.@@ `;
        } else if (s.wlp >= 4) {
            dlg += `${He} sighs heavily, unhappy with what's about to happen, but knowing ${he} can't do anything to prevent it. `;
        } else {
            dlg += `${He} obediently gets into position, bending over on ${his} elbows and raising ${his} ass into the air. `;
        };
    };

    dlg += `\n\n`;

    if (useAssist) {
        dlg += `To ensure ${name} knows ${his} place, you instruct ${him} to apply ${his} own lube, before reaching back to grab your assistant's cock and guide it in ${him}self. `;

        if (hasPerk(s, "Anal Fixation") || s.trait.name == "Anal Addict") {
            dlg += `@@.gd;${name} happily complies, using maybe a little less lubricant than ${he} should have before eagerly grabbing hold of your assistant's member and sliding it inside.@@ `;
        };

        dlg += `\n\n`;

        if (s.hasPussy) {
            dlg += `<<pic $action "male-assfuck-female-doggy">>\n`;
        } else {
            dlg += `<<pic $action "male-fuck-${gen}">>\n`;
        };
        
        dlg += s.skillDlg("anal",
            `${name} can't hide the pain and disgust on ${his} face as your assistant slides their cock into ${his} asshole. It doesn't matter, as your assistant uses their tight hole for however long it takes to reach orgasm, then a little bit longer for good measure. `,
            `${name} does their best to take your assistant's cock into their asshole, whining and moaning as he stretches them out. He doesn't relent, using their tight hole as long as it takes him to achieve orgasm, then a little longer, before finally pulling out. `,
            `${name}'s tight asshole manages to accept your assistant's cock without too much resistance. ${He} moans and winces a little as your assistant pounds ${his} hole for as long as it takes him to cum. `,
            `${name}'s asshole easily accepts your assistant's cock, allowing him to almost immediately settle into a steady rhythm. He pounds ${his} hole for a good while before finally cumming. `,
            `${name} easily takes your assistant's cock into ${his} asshole, pressing back against him with every thrust. It's not long at all before ${his} tight hole brings him to an intense orgasm. `,
            `${name}'s amazing asshole seems to almost suck your assistant's cock inside. ${He} looks back at him as ${he} matches your rhythm, moaning like a slut as ${his} expert hold brings him to a near instant orgasm. `
        );
    } else {
        dlg += `To ensure ${name} knows ${his} place, you instruct ${him} to apply ${his} own lube, before reaching back to grab your <<StraponOrCock size>> and guide it in ${him}self. `;

        if (hasPerk(s, "Anal Fixation") || s.trait.name == "Anal Addict") {
            dlg += `@@.gd;${name} happily complies, using maybe a little less lubricant than ${he} should have before eagerly grabbing hold of your member and sliding it inside.@@ `;
        };

        dlg += `\n\n`;

        if (s.hasPussy) {
            dlg += `<<pic $action "player-assfuck-female-doggy">>\n`;
        } else {
            dlg += `<<pic $action "player-fuck-${gen}">>\n`;
        };
    
        dlg += s.skillDlg("anal",
            `${name} can't hide the pain and disgust on ${his} face as you slide your <<StraponOrCock size>> into their asshole. It doesn't matter to you, using their tight hole for however long it takes to reach orgasm, then a little bit longer for good measure. `,
            `${name} does their best to take your <<StraponOrCock size>> into their asshole, whining and moaning as you stretch them out. You don't relent, using their tight hole as long as it takes you to achieve orgasm, then a little longer, before finally pulling out. `,
            `${name}'s tight asshole manages to accept your <<StraponOrCock size>> without too much resistance. ${He} moans and winces a little as your pound ${his} hole for as long as it takes you to cum. `,
            `${name}'s asshole easily accepts your <<StraponOrCock size>>, allowing you to almost immediately settle into a steady rhythm. You pound ${his} hole for a good while before finally cumming. `,
            `${name} easily takes your <<StraponOrCock size>> into ${his} asshole, pressing back against you with every thrust. It's not long at all before ${his} tight hole brings you to an intense orgasm. `,
            `${name}'s amazing asshole seems to almost suck your <<StraponOrCock size>> inside. ${He} looks back at you as ${he} matches your rhythm, moaning like a slut as ${his} expert hold brings you to a near instant orgasm. `
        );
    };

    if (hasPerk(s, "Muted")) {
        dlg += `@@.sf;Despite whatever ${name} is currently feeling, only airy gasps escape ${his} mouth as a result of having ${his} vocal cords removed.@@ `;
    }
    
    dlg += `\n\n`;

    if (useAssist) {
        dlg += `Your assistant shoots their hot, thick load deep into ${name}'s asshole, holding ${him} in place for as long as it takes him to completely empty his balls. `;
    } else if (hasPenis()) {
        dlg += `You shoot your hot, thick load deep into ${name}'s asshole, holding ${him} in place for as long as it takes you to completely empty your balls. `;
    } else {
        dlg += `You bury your strapon deep into ${name}'s asshole, the friction from the strap sending you into an intense, wet orgasm. You hold ${him} in place for as long as it takes you to come down from your climax. `
    }

    s.skills.anal += 1;
    s.skills.sub += 0.5;
    return dlg;
};

window.psGetPussy = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Update for pit assistant
    if (!hasWorkingPenis() && !hasPussy()) {
        var useAssist = true;
        dlg += `Since you are unable to train ${s.name} in this area yourself, you call over your training assistant to help you out. `;
    };

    // Generate scene dialog
    if (useAssist) {
        dlg += `You direct ${name} over to your assistant's cock, allowing it to hover over ${his} face for a moment before instructing ${him} to turn around and present ${his} bare pussy to him. `;
    } else {
        dlg += `You direct ${name} over to your <<pSize>>, allowing it to hover over ${his} face for a moment before instructing ${him} to turn around and present ${his} bare pussy to you. `;
    };
    
    if (hasPerk(s, "Clipped Heels")) {
	    dlg += `@@.sf;Since ${name} can't walk on ${his} own do to their heels being clipped, they're already on their hands and knees waiting.@@ `;
	    if (hasPerk(s,"Nymphomaniac")) {
	    	dlg += `@@.xxx;While on all fours, you can see ${name} is already ${s.wet()} with excitement@@. `;
    	};
    } else if (hasPerk(s,"Nymphomaniac")) {
	    dlg += `@@.xxx;As ${he} approaches, you can see ${name} is already ${s.wet()} with excitement@@. `;
    };

    if (s.trait.name == "Breeding Kink") {
        dlg += `@@.xxx;With ${his} innate addiction to getting bred, ${name} is beyond excited to get ${his} pussy filled with cum today.@@ `;
    } else if (hasPerk(s, "Masochist")) {
        dlg += `@@.sf;As a masochist, ${name} is excited at the thought of getting brutally fucked and used.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.sf;As a submissive slave, ${name} is eager to get started and please ${his} partner.@@ `;
    };

    if (useAssist) {
        if (s.trait.name == "Frigid") {
            dlg += `@@.bd;Due to ${his} frigid nature, having ${his} hole exposed like this has ${him} feeling incredibly uncomfortable.@@ `;
            if (hasPerk(s, "Nymphomaniac")) {
                dlg += `@@.xxx;Despite this, having become a Nymphomaniac through repeated training@@ has resulted in ${him} feeling more than a little excited for what's to come. `
            };
        } else if (hasPerks(s, ["Breeding Kink","Nymphomaniac"])) {
            dlg += `@@.gd;${He} shakes ${his} ass in the air, eager to have your assistant penetrate ${him} and fill ${him} with cum.@@ `;
        } else if (s.wlp >= 4) {
            dlg += `${He} sighs heavily, unhappy with what's about to happen, but knowing ${he} can't do anything to prevent it. `;
        } else {
            dlg += `${He} obediently gets into position, bending over on ${his} elbows and raising ${his} ass into the air. ${His} pussy is wet and ready for your assistant. `;
        };
    } else {
        if (s.trait.name == "Frigid") {
            dlg += `@@.bd;Due to ${his} frigid nature, having ${his} hole exposed to you like this has ${him} feeling incredibly uncomfortable.@@ `;
            if (hasPerk(s, "Nymphomaniac")) {
                dlg += `@@.xxx;Despite this, having become a Nymphomaniac through repeated training@@ has resulted in ${him} feeling more than a little excited for what's to come. `
            };
        } else if (hasPerks(s, ["Breeding Kink","Nymphomaniac"])) {
            if (hasPenis()) {
                dlg += `@@.gd;${He} shakes ${his} ass in the air, eager to have you penetrate ${him} and fill ${him} with cum.@@ `;
            } else {
                dlg += `@@.gd;${He} shakes ${his} ass in the air, eager to have you penetrate ${him} despite you being unable to impregnate ${him}.@@ `;
            };
        } else if (s.wlp >= 4) {
            dlg += `${He} sighs heavily, unhappy with what's about to happen, but knowing ${he} can't do anything to prevent it. `;
        } else {
            dlg += `${He} obediently gets into position, bending over on ${his} elbows and raising ${his} ass into the air. ${His} pussy is wet and ready for you. `;
        };
    };

    dlg += `\n\n`;

    if (useAssist) {
        dlg += `To ensure ${name} knows ${his} place, you instruct ${him} to apply ${his} own lube, before reaching back to grab your assistant's cock and guide it in ${him}self. `;

        if (hasPerk(s, "Breeding Kink") || s.trait.name == "Hypersexual") {
            dlg += `@@.gd;${name} happily complies, using maybe a little less lubricant than ${he} should have before eagerly grabbing hold of your assistant's member and sliding it inside.@@ `;
        };

        dlg += `\n\n`;

        dlg += `<<pic $action "male-fuck-${gen}">>\n`;

        dlg += s.skillDlg("pussy",
            `${name} can't hide the pain and disgust on ${his} face as your assistant slides his cock into their pussy. It doesn't matter to him, using their tight hole for however long it takes to reach orgasm, then a little bit longer for good measure. `,
            `${name} does their best to take your assistant's cock into their pussy, whining and moaning as he stretches them out. He doesn't relent, using their tight hole as long as it takes him to achieve orgasm, then a little longer, before finally pulling out. `,
            `${name}'s tight pussy manages to accept your assistant's cock without too much resistance. ${He} moans and winces a little as your pound ${his} hole for as long as it takes him to cum. `,
            `${name}'s pussy easily accepts your assistant's cock, allowing him to almost immediately settle into a steady rhythm. He pounds ${his} hole for a good while before finally cumming. `,
            `${name} easily takes your assistant's cock into ${his} pussy, pressing back against him with every thrust. It's not long at all before ${his} tight hole brings your assistant to an intense orgasm. `,
            `${name}'s amazing pussy seems to almost suck your assistant's cock inside. ${He} looks back at him as ${he} matches his rhythm, moaning like a slut as ${his} expert hold brings your assistant to a near instant orgasm. `
        );
    } else {
        dlg += `To ensure ${name} knows ${his} place, you instruct ${him} to apply ${his} own lube, before reaching back to grab your <<StraponOrCock size>> and guide it in ${him}self. `;

        if (hasPerk(s, "Breeding Kink") || s.trait.name == "Hypersexual") {
            dlg += `@@.gd;${name} happily complies, using maybe a little less lubricant than ${he} should have before eagerly grabbing hold of your member and sliding it inside.@@ `;
        };

        dlg += `\n\n`;

        dlg += `<<pic $action "player-fuck-female-doggy">>\n`;

        dlg += s.skillDlg("pussy",
            `${name} can't hide the pain and disgust on ${his} face as you slide your <<StraponOrCock size>> into their pussy. It doesn't matter to you, using their tight hole for however long it takes to reach orgasm, then a little bit longer for good measure. `,
            `${name} does their best to take your <<StraponOrCock size>> into their pussy, whining and moaning as you stretch them out. You don't relent, using their tight hole as long as it takes you to achieve orgasm, then a little longer, before finally pulling out. `,
            `${name}'s tight pussy manages to accept your <<StraponOrCock size>> without too much resistance. ${He} moans and winces a little as your pound ${his} hole for as long as it takes you to cum. `,
            `${name}'s pussy easily accepts your <<StraponOrCock size>>, allowing you to almost immediately settle into a steady rhythm. You pound ${his} hole for a good while before finally cumming. `,
            `${name} easily takes your <<StraponOrCock size>> into ${his} pussy, pressing back against you with every thrust. It's not long at all before ${his} tight hole brings you to an intense orgasm. `,
            `${name}'s amazing pussy seems to almost suck your <<StraponOrCock size>> inside. ${He} looks back at you as ${he} matches your rhythm, moaning like a slut as ${his} expert hold brings you to a near instant orgasm. `
        );
    };
    
    dlg += `\n\n`;

    if (useAssist) {
        dlg += `<<pic $action "${gen}-creampie">>\n`;
        
        dlg += `Your assistant shoots his hot, thick load deep into ${name}'s pussy, holding ${him} in place for as long as it takes him to completely empty his balls. `;
        
        if (hasPerk(s, "Breeding Kink")) {
            dlg += `@@.gd;The feeling of having their womb fill with hot cum is enough to send ${name} into another round of intense orgasms.@@ `
        };
    } else if (hasPenis()) {
        dlg += `<<pic $action "${gen}-creampie">>\n`;

        dlg += `You shoot your hot, thick load deep into ${name}'s pussy, holding ${him} in place for as long as it takes you to completely empty your balls. `;

        if (hasPerk(s, "Breeding Kink")) {
            dlg += `@@.gd;The feeling of having their womb fill with your cum is enough to send ${name} into another round of intense orgasms.@@ `
        };
    } else {
        dlg += `You bury your strapon deep into ${name}'s pussy, the friction from the strap sending you into an intense, wet orgasm. You hold ${him} in place for as long as it takes you to come down from your climax. `
    }

    s.skills.pussy += 1;
    s.skills.sub += 0.5;
    return dlg;
};

window.psGetDom = function(s,s2) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var [name2,he2,He2,his2,His2,him2,Him2,hiss2,Hiss2,boy2,Boy2,gen2] = getSlavePronouns(s2);
    var dlg = '';
    var cock = (s.hasPenis ? "cock" : "strapon");

    // Generate scene dialog
    dlg += `You instruct ${name} to sit quietly and wait while you go and retrieve ${his} partner for this session`;

    if (hasAllPerks(s, ["Muted","Clipped Heels"])) {
        dlg += `, @@.sf;not that ${he} has the ability to speak or stand anymore, anyway.@@ `
    } else if (hasPerk(s, "Muted")) {
        dlg += `, @@.sf;not that ${he} has the ability to speak anymore, anyway.@@ `
    } else if (hasPerk(s, "Clipped Heels")) {
        dlg += `, @@.sf;not that ${he} has the ability to stand anymore, anyway.@@ `;
    } else {
        dlg += `. `;
    };
    
    dlg += `After a moment, you return with ${name2} and close the door behind you. As ${name} watches in silence, you have ${name2} get on ${his2} hands and knees, presenting ${his2} ass to ${name}. `;

    dlg += `\n\n`;
    
    dlg += `<<nm $player "${name}, today you'll be fucking ${name2} with the intent of making ${name2} submit to you completely. We'll finish once you've sufficiently broken ${him2}.">>\n\n`

    if (hasPerk(s, "Sadistic")) {
        dlg += `@@.gd;Due to ${his} sadistic personality, ${name} is beyond excited to exert ${him}self over ${name2}.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.gd;Due to ${his} dominant personality, ${name} is more than happy to make ${name2} submit to ${him}, even if it's only for your pleasure.@@ `;
    } else if (s.trait.name == "People Pleaser") {
        dlg += `@@.gd;Due to ${his} people pleasing nature, ${name} appears eager to take on the dominant role with ${name2} today.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.bd;Due to ${his} submissive personality, ${name} is visibly uncomfortable being made to dominate ${name2}@@`;
        if (hasPerk(s2, "Submissive")) {
            dlg += `@@.bd;, despite ${name2}'s eagerness to submit to ${him}.@@ `;
        } else if (hasPerk(s2,"Dominant")) {
            dlg += `@@.bd;, with the dominant ${name2} looking just as uncomfortable to be made to submit.@@ `;
        } else {
            dlg += `.`;
        }
    } else if (s.wlp >= 4) {
        dlg += `${He} shrugs, not particularly fond of taking orders from you, but more than happy to take those frustrations out on ${name2}. `;
    } else {
        dlg += `${He} obediently gets into position, ready to take on ${name2} as you command. `;
    };

    dlg += `\n\n`;

    if (s.hasPenis) {
        dlg += `You instruct ${name2} to turn around and start to service ${name}'s ${s.getPenisSize()} cock with ${his2} mouth. Once it's sufficiently wet and hard, you have ${him} return to ${his2} position on all fours. `;
    } else {
        dlg += `You instruct ${name2} to turn around and fasten a strapon cock around ${name}'s waist. `;
        if (hasPerk(s,"Dominant")) {
            dlg += `@@.gd;${name} instinctlively wraps ${his} hands around ${name2}'s head when ${he2}'s finished, guiding ${his2}'s mouth around the artificial cock and forcing ${him2} to lubricate it with ${his2} tongue.@@  Once it's sufficiently wet, you have ${him} return to ${his2} position on all fours. `;
        } else {
            dlg += `Once done, ${name} and ${name2} both await further orders. You instruct ${name2} to service ${name}'s strapon cock with ${his2} mouth. Once it's sufficiently wet, you have ${him} return to ${his2} position on all fours. `;
        };
    };

    dlg += `\n\n`;

    if (hasPerk(s,"Dominant")) {
        dlg += `@@.gd;To ensure ${name2} knows ${his2} place, ${name} instructs ${him2} to apply ${his2} own lube, before reaching back to grab ${name}'s ${cock} and guide it in ${him2}self.@@ `;
    } else {
        dlg += `You instruct ${name} to grab ${name2}'s hips and slide ${his} ${cock} into ${name2}'s ${s2.getHole('hole')}. `;
    };

    if (hasPerk(s2, "Breeding Kink") || s2.trait.name == "Hypersexual") {
        dlg += `@@.gd;${name2} happily complies, using maybe a little less lubricant than ${he2} should have before eagerly grabbing hold of ${name2}'s member and guiding it inside.@@ `;
    };

    dlg += `\n\n`;

    dlg += `<<pic $action "${gen}-fuck-${gen2}">>\n`;

    dlg += s.skillDlg("dom",
        `@@.bd;${name} does ${his} best to play the dominant role, despite ${his} clear aversion to it.@@ `,
        `@@.bd;${name} tries ${his} best to dominate ${his} partner, despite clearly being uncomfortable in the role. Beyond some slightly more enthusiastic motions, it's really just a lot of awkward thrusting.@@ `,
        `${name} puts on an adequate show, slowly picking up on ${his} partner's signals and changing ${his} pace and force accordingly. It's still not exactly what you would call a show of dominance, though. `,
        `${name} enthusiastically fucks ${name2} from behind, making sure to throw in a few ass slaps and deep thrusts to get ${his} point across. `,
        `@@.gd;${name} easily puts ${name2} in ${his2} place, fucking ${him2} hard and slapping ${his2} ass as ${he} pounds ${him2} towards orgasm.@@ `,
        `@@.gd;Regardless of how ${name2} feels about it, ${name} is more than eager to fuck ${him2} into submission. ${name} slaps ${his2} ass and thrusts ${his} ${cock} deep inside of ${name}'s ${s2.getHole()}, all with a gleeful expression on ${his} face.@@ `
    );

    dlg += s2.skillDlg("pussy",
        `@@.bd;${name2} can't hide the pain and disgust on ${his2} face as ${name} slides ${his} ${cock} into their pussy. It doesn't matter to ${name}, using their tight hole for however long it takes to reach orgasm, then a little bit longer for good measure.@@ `,
        `@@.bd;${name2} does their best to take ${name}'s ${cock} into their pussy, whining and moaning as ${he} stretches them out. ${name} doesn't relent, using their tight hole as long as it takes ${him} to achieve orgasm, then a little longer, before finally pulling out.@@ `,
        `${name2}'s tight pussy manages to accept ${name}'s ${cock} without too much resistance. ${He2} moans and winces a little as ${name} pounds ${his2} hole for as long as it takes ${him} to cum. `,
        `${name2}'s pussy easily accepts your ${cock}, allowing you to almost immediately settle into a steady rhythm. You pound ${his2} hole for a good while before finally cumming. `,
        `@@.gd;${name2} easily takes your ${cock} into ${his2} pussy, pressing back against you with every thrust. It's not long at all before ${his2} tight hole brings you to an intense orgasm.@@ `,
        `@@.gd;${name2}'s amazing pussy seems to almost suck your ${cock} inside. ${He2} looks back at you as ${he2} matches your rhythm, moaning like a slut as ${his2} expert hold brings you to a near instant orgasm.@@ `
    );
    
    dlg += `\n\n`;

    if (s.hasPenis) {
        dlg += `${name} shoots ${his} hot, thick load deep into ${name2}'s ${s2.getHole()}, holding ${him2} in place for as long as it takes ${name} to completely empty ${his} balls. `;
        if (hasPerk(s, "Breeding Kink")) {
            dlg += `@@.gd;The feeling of having their womb filled with ${name}'s cum is enough to send ${name} into another round of intense orgasms.@@ `
        };
    } else {
        dlg += `${name} buries ${his} strapon deep into ${name2}'s ${s2.getHole()}, the friction from the strap sending ${him} into an intense, wet orgasm. ${name} holds ${name2} in place for as long as it takes ${him} to come down from ${his} climax. `
    }

    s.skills.dom += 1;
    s2.skills.sub += 1;
    if (s2.hasPussy) {s2.skills.pussy += 0.5} else {s2.skills.anal += 0.5};
    return dlg;
};

window.psGetSub = function(s,s2) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var [name2,he2,He2,his2,His2,him2,Him2,hiss2,Hiss2,boy2,Boy2,gen2] = getSlavePronouns(s2);
    var cock = (s.hasPenis ? "cock" : "pussy");
    var cock2 = (s2.hasPenis ? "cock" : "pussy");
    var dlg = '';

    // Generate scene dialog
    if (hasPerk(s2, "Clipped Heels")) {
        dlg += `You instruct ${name} to sit quietly and wait while you go and retrieve ${his} partner for this session. After a moment, you return with ${name2} and close the door behind you. As ${name} watches in silence, you walk ${name2} over on ${his2} hands and knees to the center of the room, @@.sf;as ${he2} is no longer able to walk on ${his2} own@@, instructing ${him2} to get on ${his2} back. `;
    } else {
        dlg += `You instruct ${name} to sit quietly and wait while you go and retrieve ${his} partner for this session. After a moment, you return with ${name2} and close the door behind you. As ${name} watches in silence, you have ${name2} stand in front of ${name} and guide ${him} down to ${his} knees. `;
    };

    dlg += `\n\n`;

    dlg += `<<nm $player "Today, you'll be servicing ${name2}'s ${cock2}.">>\n`

    if (hasPerk(s, "Oral Fixation") || s.trait.name == "Oral Addict") {
        dlg += `@@.gd;${name} can't help but lick ${his} lips as ${he} looks at ${name2}'s ${cock2}. ${He} eagerly leans forward and takes ${name2}'s ${cock2} into ${his} mouth, sucking and licking it with a passion.@@ `;
    } else if (s.trait.name == "Oral Aversion") {
        dlg += `@@.bd;${name} looks at ${name2}'s ${cock2} with a clear look of disgust on ${his} face. ${He} reluctantly leans forward and takes ${name2}'s ${cock2} into ${his} mouth, sucking and licking it with a clear lack of enthusiasm.@@ `;
    };

    if (s2.hasPenis) {
        dlg += `<<pic $action "${gen}-suck-${gen2}">>\n`;
    } else {
        dlg += `<<pic $action "${gen}-eat-pussy">>\n`;
    };

    if (s2.hasPussy) {
        dlg += s.skillDlg("oral",
            `${s.name} clearly dislikes having ${name2}'s pussy in ${s.his} mouth, barely making an attempt to find ${name2}'s sensative spots.`,
            `${s.name} doesn't quite know how to please a woman yet, and struggles to elicit a reaction from ${name2}.`,
            `${s.name} slides ${his} tongue along ${name2}'s glistening pussy, making it a point to stimulate ${him2} clit as well.`,
            `${s.name} gets right to work on ${name2}'s pussy, slurping and sucking and generally handling ${him2} quite nicely.`,
            `${s.name} eagerly takes ${name2}'s pussy into ${his} mouth, an expression of pure joy across ${s.his} lustful face.`,
            `${s.name} excitedly dives into ${name2}'s pussy, expertly licking and sucking it. You can see ${name2} ready to orgasm almost immediately as ${s.name} slides ${his} tongue up and down ${his2} slit.`
        );
    } else {
        dlg += s.skillDlg("oral",
            `${s.name} clearly dislikes having ${name2}'s cock in ${s.his} mouth, choking and gagging through the barely subpar blowjob.`,
            `${s.name} doesn't quite know how to please a cock yet, and struggles to take the length of the shaft.`,
            `${s.name} slides ${name2}'s cock along ${s.his} tongue, taking care to keep ${s.his} teeth away from it.`,
            `${s.name} takes ${name2}'s cock easily into his ${s.his} throat, gagging occassionally but otherwise handling him quite nicely.`,
            `${s.name} eagerly takes ${name2}'s cock down ${s.his} throat, an expression of pure joy across ${s.his} lustful face.`,
            `${s.name} hungrily takes the entirety of ${name2}'s cock down ${s.his} throat, you can see ${name2} ready to orgasm almost immediately as ${s.he} bobs up and down on his member.`
        );
    };

    s.skills.sub += 1;
    s2.skills.dom += 1;
    s.skills.oral += 1;
    return dlg;
};

window.psGetPetPlay = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You walk ${name} around the room on a leash like a dog, instructing ${him} to sit and stay on command, as well as bark and make other animal noises. `;

    dlg += `\n\n`;

    dlg += `<<nm $player "Awe, who's my good ${boy}! Who's my good ${boy}...">>\n\n`;

    dlg += s.skillDlg("pet",
        `${name} is visibly uncomfortable being treated this way. `,
        `${name} complies with your commands, but clearly has no idea what ${he} is doing. `,
        `${name} is starting to get the hang of this, and is able to follow your commands with a bit of coaxing. `,
        `${name} is starting to enjoy this, and follows your commands with a smile on ${his} face. `,
        `${name} is clearly enjoying this, and follows your commands with a smile on ${his} face. `,
        `${name} is clearly enjoying this, and follows your commands with a smile on ${his} face. ${He} even starts to bark and make other animal noises on ${his} own. `
    );

    if (s.skills.pet > 2) {
        dlg += `\n\n`;

        dlg += `<<nm $player "Oh, what's wrong? Looks like puppy needs to go outside...">>\n\n`;

        dlg += `You walk ${name} around on ${his} leash for a bit before taking ${him} over to a corner of the room and instructing ${him} to relieve ${him}self on the ground. `;

        if (hasPerk(s, "Submissive Pet")) {
            dlg += `@@.xxx;Eager to prove ${him}self as a perfect pet, ${name} happily lifts a leg like a dog and pees on the floor.@@ `;

            dlg += `\n\n`;

            dlg += `<<nm $player "Good ${boy}! Such a good ${boy}!">>\n\n`;
            
            s.lty += 1;
        } else if (s.wlp < 4 || s.lty > 6) {
            dlg += `@@.gd;While not thrilled about the idea, ${name} does as ${he} is told,@@ lifting a leg like a dog and peeing on the floor. `;
        } else {
            dlg += `@@.bd;${name} looks at you with a look of disgust on ${his} face,@@ refusing to pee on the floor.@@ `;

            dlg += `\n\n`;

            dlg += `@@SMACK!@@\n\n`;

            dlg += `<<nm $player "Bad dog! You'll do as you're told!">>\n\n`;

            dlg += `You spank ${name} a few times before taking ${him} back to the corner and instructing ${him} to relieve ${him}self on the ground. `;

            dlg += `@@.gd;While not thrilled about the idea, ${name} does as ${he} is told,@@ lifting a leg like a dog and peeing on the floor.@@.bd; You make a mental note to punish ${him} later for disobeying you. `;
        };
        s.skills.pet += 0.5;
        s.skills.sub += 1;
    };

    s.skills.pet += 1;
    s.skills.sub += 0.5;
    return dlg;
};

window.psGetNippleTraining = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You tie ${name} down to a table and begin to clamp and pinch ${his} nipples, working to make them more sensitive. `;

    if (hasPerk(s, "Nympomaniac")) {
        dlg += `@@.xxx;As a full on nymphomaniac, ${name} is already very sensitive, and this activity only serves to make ${him} even more so.@@ `;
    };

    if (hasPerk(s, "Nipple Fixation")) {
        dlg += `@@.gd;${name} seems to enjoy having ${his} nipples played with, moaning and squirming as you work on ${his} nipples.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly uncomfortable being treated this way.@@ `;
    }

    dlg += `\n\n`;

    dlg += `<<nm $player "There we go, just a little more...">>\n\n`;

    dlg += s.skillDlg("breasts",
        `${name} squirms and moans as you work on ${his} nipples, but you can tell ${he} is not enjoying it.`,
        `${name} doesn't quite know what to do with ${him}self as you work on ${his} nipples, but ${he} doesn't seem to be enjoying it.`,
        `${name} squirms and moans as you work on ${his} nipples, and you can tell ${he} is starting to enjoy it.`,
        `${name} squirms and moans as you work on ${his} nipples, and you can tell ${he} is enjoying it.`,
        `${name} squirms and moans as you work on ${his} nipples, and you can tell ${he} is really enjoying it.`,
        `${name} squirms and moans as you work on ${his} nipples, and you can tell ${he} is really enjoying it. ${He} even starts to beg you to play with ${his} nipples more.`
    );

    dlg += `\n\n`;

    dlg += `<<nm $player "There we go, all done.">>\n\n`;

    dlg += `You unbind ${name} and let ${him} get up, ${his} nipples now much more sensitive than before. `;

    s.skills.breasts += 1;
    s.skills.sub += 0.5;
    return dlg;
};

window.psGetHeelsClipped = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of clipping ${his} heels, preventing him from walking on ${his} feet anymore. `;

    if (s.skills.pet >= 5 || hasPerk(s, "Pet")) {
        dlg += `@@.gd;${name} actually seems to be somewhat excited about the procedure, knowing it will force ${him} to spend more time on ${his} hands and knees like a pet.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of being forced to walk on ${his} hands and knees due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is visibly excited by the idea of being forced to walk on ${his} hands and knees due to ${his} submissive nature.@@ `;
    }

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerk(s, "Pet")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, cutting through the tendons in ${his} heels, preventing ${him} from walking on ${his} feet anymore. `;

    s.skills.pet += 0.5;
    s.skills.sub += 1;
    s.operations += 1;
    setPerk(s, "Clipped Heels");

    return dlg;
};

window.psGetMuted = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of removing ${his} vocal cords, preventing him from speaking anymore. `;

    if (s.skills.sub >= 10 || hasPerk(s, "Masochist")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of losing ${his} ability to speak, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} voice taken from ${him} due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about having ${his} voice taken from ${him}, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} voice taken from ${him}, but ${he} doesn't dare to resist.@@ `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerk(s, "Masochist")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, removing the vocal cords from ${his} throat, preventing ${him} from speaking anymore. `;

    s.skills.pet += 0.25;
    s.skills.sub += 2;
    s.operations += 1;
    setPerk(s, "Mute");

    return dlg;
};

window.psGetPermanentMakeup = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of applying permanent makeup to ${his} face, ensuring ${he} will always look slutty and available. `;

    if (hasPerk(s, "Nymphomaniac")) {
        dlg += `@@.xxx;As a nymphomaniac, ${name} is beyond excited at the prospect of have slutty makeup permanently tattood to ${his} face, letting ${him} look ${his} sexiest at all times.@@ `;
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of having makeup permanently tattood to ${his} face, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of having makeup permanently tattood to ${his} face due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about having makeup permanently tattood to ${his} face, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of having makeup permanently tattood to ${his} face, but ${he} doesn't dare to resist.@@ `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, using a small tattoo gun to apply permanent makeup to ${name}'s face. `;

    s.skills.pet += 0.25;
    s.skills.sub += 2;
    s.operations += 1;
    s.sexMod += 0.5;
    setPerk(s, "Permanent Makeup");

    return dlg;
};

window.psGetFemVoice = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of modifying ${his} voice, making ${him} sound more feminine. `;

    if (s.skills.fem > 0) {
        if (s.skills.fem > 5) {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of getting ${his} voice raised has ${him} feeling very excited!@@ `;
        } else {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of getting ${his} voice raised actually sounds somewhat appealing.@@ `;
        };
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of having ${his} voice changed, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} voice changed due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about having ${his} voice changed, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} voice changed, but ${he} doesn't dare to resist.@@ `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerks(s, ["Submissive","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, gently scraping ${name}'s vocal cords to raise ${his} voice. `;

    s.skills.fem += 2;
    s.skills.sub += 1;
    s.sexMod += 0.5;
    setPerk(s, "Feminized Voice");

    return dlg;
};

window.psGetSmallBreasts = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of giving ${him} a small pair of breasts. `;

    if (s.skills.fem > 0) {
        if (s.skills.fem > 5) {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of getting breast implants has ${him} extremely excited!@@ `;
        } else {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of getting breast implants actually sounds somewhat appealing.@@ `;
        };
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of getting small breast implants, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of getting small breast implants due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about getting small breast implants, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of getting small breast implants, but ${he} doesn't dare to resist.@@ `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerks(s, ["Submissive","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, gently making incisions in ${name}'s chest and inserting the implants. `;

    s.skills.fem += 2;
    s.skills.sub += 1;
    s.sexMod += 0.5;
    setPerk(s, "Small Breasts");
    setPerk(s, "Augmented Breasts");
    if (s.gender == "male") {
        s.gen = "ts";
        s.gender = "trans";
        s.img = setImage(s);
    };
    s.hasBreasts = true;
    s.breastSize = 2;

    return dlg;
};

window.psGetBigBreasts = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of giving ${him} a large pair of breasts. `;

    if (s.skills.fem > 0) {
        if (s.skills.fem > 5) {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of getting breast implants has ${him} extremely excited!@@ `;
        } else {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of getting breast implants actually sounds somewhat appealing.@@ `;
        };
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of getting large breast implants, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of getting large breast implants due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about getting large breast implants, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of getting large breast implants, but ${he} doesn't dare to resist.@@ `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerks(s, ["Submissive","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, gently making incisions in ${name}'s chest and inserting the implants. `;

    s.skills.fem += 2;
    s.skills.sub += 1;
    s.sexMod += 0.5;
    setPerk(s, "Large Breasts");
    setPerk(s, "Augmented Breasts");
    if (s.gender == "male") {
        s.gen = "ts";
        s.gender = "trans";
        s.img = setImage(s);
    };
    s.hasBreasts = true;
    s.breastSize = 5;

    return dlg;
};

window.psGetCastrated = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of removing ${his} testicles. `;

    if (s.skills.fem > 0) {
        if (s.skills.fem > 5) {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of having ${his} balls removed has ${him} extremely excited!@@ `;
        } else {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of having ${his} balls removed actually sounds somewhat appealing.@@ `;
        };
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of having ${his} balls removed, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} balls removed due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about having ${his} balls removed, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} balls removed, but ${he} doesn't dare to resist.@@ `;
    };

    if (s.ballSize > 3) {
        dlg += `${name}'s ${s.getBallSize()} testicles were always a source of pride for ${him}, and losing them does make ${him} a little sad. `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerks(s, ["Submissive","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, gently making incisions in order to remove ${name}'s testicles. `;

    s.skills.fem += 2;
    s.skills.sub += 1;
    s.sexMod += 0.5;
    setPerk(s, "Castrated");
    s.hasBalls = false;

    return dlg;
};

window.psRemovePenis = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of removing ${his} penis. `;

    if (s.skills.fem > 0) {
        if (s.skills.fem > 5) {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of having ${his} cock removed has ${him} extremely excited!@@ `;
        } else {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of having ${his} cock removed actually sounds somewhat appealing.@@ `;
        };
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of having ${his} cock removed, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} cock removed due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about having ${his} cock removed, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of having ${his} cock removed, but ${he} doesn't dare to resist.@@ `;
    };

    if (s.penisSize > 3) {
        dlg += `${name}'s ${s.getPenisSize()} cock was always a source of pride for ${him}, and losing them does make ${him} a little sad. `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerks(s, ["Submissive","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, gently making incisions in order to remove ${name}'s penis. `;

    s.skills.fem += 10;
    s.skills.sub += 1;
    s.sexMod += 0.5;
    setPerk(s, "Feminized");
    s.hasPenis = false;

    return dlg;
};

window.psGetPussy = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of giving ${him} a functional vagina. `;

    if (s.skills.fem > 0) {
        if (s.skills.fem > 5) {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of being given a working pussy has ${him} extremely excited!@@ `;
        } else {
            dlg += `@@.xxx;Since ${name} is already being actively feminized, the thought of being given a working pussy actually sounds somewhat appealing.@@ `;
        };
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} actually doesn't seem to mind the idea of being given a working pussy, rather choosing to embrace you and your decisions for ${him} as a slave.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of being further modified due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is nervous about being given a vagina, however ${he} quickly comes to terms with the idea due to ${his} submissive nature.@@ `;
    } else {
        dlg += `@@.bd;${name} is visibly upset by the idea of being given a vagina, but ${he} doesn't dare to resist.@@ `;
    };

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerks(s, ["Masochist", "Nymphomaniac","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerks(s, ["Submissive","Feminized"])) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, gently making incisions in order to give ${name} a vagina. `;

    s.skills.fem += 20;
    s.skills.sub += 5;
    s.sexMod += 0.5;
    setPerk(s, "Get Pussy");
    if (s.gender !== "female") {
        s.gen = "female";
        s.gender = "female";
        s.img = setImage(s);
    };
    s.hasPussy = true;

    return dlg;
};

window.psChangePronouns = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `${name} currently identifies as a @@.xxx;${s.gender}@@, using @@.sf;${He}@@ and @@.sf;${Him}@@ pronouns. `;

    if (hasPerk,(s,"Submissive")) {
        dlg += `@@.sf;As a complete submissive, ${he} has no preference for how ${he} is referred to. `;
    } else if (gen == 'male') {
        if (s.skills.fem > 0) {
            dlg += `${He} used to prefer being seen as a man, but with changes being made to ${his} body, ${he}'s not quite as sure anymore. `;
        } else {
            dlg += `${He} prefers others see ${him} as a ${boy}, and refer to ${him} as '${he}' and '${him}'. `;
        };
    } else {
        dlg += `${He} prefers others see ${him} as a female, and refer to ${him} as 'she' and 'her'. `;
    };

    return dlg;
};

window.psGetHeelsPulled = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of pulling ${his} calves, preventing him from walking upright without wearing tall high heels. `;

    if (hasPerk(s, "Nymphomaniac")) {
        dlg += `@@.xxx;${name} actually seems to be excited about the procedure, knowing it will force ${him} to spend all ${his} time wearing slutty heels.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of being forced to walk around in slutty heels due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is visibly excited by the idea of being forced to walk around in slutty heels due to ${his} submissive nature.@@ `;
    }

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. `;

    if (hasPerk(s, "Pet")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure, pulling the tendons in ${his} calves, preventing ${him} from walking upright without high heels. `;

    s.skills.sub += 2;
    s.operations += 1;
    setPerk(s, "Pulled Heels");

    return dlg;
};

window.psGetAnimalEars = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var animal = randomItem(["dog","cat","cow","fox","bunny"]);
    var dlg = '';

    // Generate scene dialog
    dlg += `You take ${name} to the new surgical facility with the intention of replacing ${his} ears with animal ears, and giving ${him} a tail. `;

    if (s.skills.pet >= 5 || hasPerk(s, "Pet")) {
        dlg += `@@.gd;${name} actually seems to be excited about the procedure, knowing it will give ${him} a more animal-like asthetic, and making ${him} a better pet.@@ `;
    } else if (hasPerk(s, "Dominant")) {
        dlg += `@@.bd;${name} is visibly upset by the idea of being turned into an animal ${boy} due to ${his} dominant nature, but ${he} doesn't dare to resist.@@ `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} is visibly excited by the idea of being turned into an animal ${boy} due to ${his} submissive nature.@@ `;
    }

    dlg += `\n\n`;

    dlg += `You help ${name} onto the operating table as the hired surgeon prepares the equipment. After a few minutes, the surgeon is ready to begin. You can see materials for @@.sf;${animal}@@ ears and a tail laid out on a nearby table. `;

    if (hasPerk(s, "Pet")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of excitement and trust on ${his} face.@@ `;
    } else if (s.skills.sub >= 5 || hasPerk(s, "Submissive")) {
        dlg += `@@.gd;${name} looks up at you as the anesthetic is administered, a look of trust on ${his} face.@@ `;
    } else {
        dlg += `@@.bd;${name} looks up at you as the anesthetic is administered, a look of fear on ${his} face.@@ `;
    };

    dlg += `After ${he} is unconscious, the surgeon begins the procedure... `;

    s.skills.pet += 2;
    s.skills.sub += 1;
    s.operations += 1;
    s.animal = animal;
    setPerk(s, "Animal Ears");

    return dlg;
};

window.psCubicleDuty = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var animal = s.animal !== "none" ? s.animal : "animal";
    var master = s.gender == "male" ? "master" : "mistress";
    var daddy = s.gender == "male" ? "daddy" : "mommy";
    var man = s.gender == "male" ? "man" : "woman";
    setSlaveTitle(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `${name} is currently working the cubicles right now. `;

    switch (s.age) {
        case "Teen":
            if (s.title == "dom") {
                dlg += `Despite ${his} young age, other employees all happily refer to ${him} as ${master}, and even sometimes ${daddy}, due to ${his} @@.xxx;dominant@@ nature. `;
            } else if (s.title == "sub") {
                dlg += `As a @@.xxx;submissive@@ young ${boy}, ${he} is often dragged around from one desk to another, servicing the cocks and pussies of ${his} coworkers. `;
            } else if (s.title == "pet") {
                dlg += `Due to ${his} tendency to @@.xxx;act like a pet@@`;
                if (hasPerk(s, "Animal Ears")) {
                    dlg += `, not to mention the fact that ${he} has ${s.animal} ears and a tail, `;
                };
                dlg += `other employees often refer to ${him} as a good ${boy}, and ${he} is often walked around the office on a leash. `;
            } else {
                dlg += `As a sweet, young ${boy}, ${he} is quite popular around the office, and is often found servicing the cocks and pussies of ${his} coworkers. `;
            };
            break;
        case "Young Adult" || "Adult":
            if (s.title == "dom") {
                dlg += `As a result of ${his} dominant nature, other employees all happily refer to ${him} as ${master}, and even sometimes ${daddy}. `;
            } else if (s.title == "sub") {
                dlg += `As a submissive slave, ${he} is often dragged around from one desk to another, servicing the cocks and pussies of ${his} coworkers. `;
            } else if (s.title == "pet") {
                dlg += `Due to ${his} tendency to act like a pet`;
                if (hasPerk(s, "Animal Ears")) {
                    dlg += `, not to mention the fact that ${he} has ${s.animal} ears and a tail, `;
                };
                dlg += `other employees often refer to ${him} as a good ${boy}, and ${he} is often walked around the office on a leash. `;
            } else {
                dlg += `As a sweet, willing slave, ${he} is quite popular around the office, and is often found servicing the cocks and pussies of ${his} coworkers. `;
            };
            break;
        case "Mature":
            if (s.title == "dom") {
                dlg += `As a dominant, older ${man}, other employees all happily refer to ${him} as ${master}, and even sometimes ${daddy}. `;
            } else if (s.title == "sub") {
                dlg += `As an older, submissive ${man}, ${he} is often dragged around from one desk to another, servicing the cocks and pussies of ${his} coworkers. `;
            } else if (s.title == "pet") {
                dlg += `Due to ${his} tendency to act like a pet`;
                if (hasPerk(s, "Animal Ears")) {
                    dlg += `, not to mention the fact that ${he} has ${s.animal} ears and a tail, `;
                };
                dlg += `other employees often refer to ${him} as a good ${boy}, and ${he} is often walked around the office on a leash. `;
            } else {
                dlg += `As an older, more experienced slave, ${he} is quite popular around the office, and is often found servicing the cocks and pussies of ${his} coworkers. `;
            };
            break;
    };

    dlg += `\n\n`;

    switch (s.title) {
        case "anal":
            if (chance(50)) {
                if (s.hasPussy) {
                    dlg += `<<pic $action "male-assfuck-female-doggy">>\n`;
                } else {
                    dlg += `<<pic $action "male-fuck-${gen}">>\n`;
                };

                dlg += `${name} is currently bent over a desk while a group of men stand behind ${him} waiting for a turn to fuck ${him} in ${his} well-trained asshole. ${name}'s eyes roll back in pleasure as ${he} services one cock after another with ${his} mouth. `;

                dlg += `\n\n`;

                dlg += `<<pic $action "${gen}-suck-male">>\n`;
            } else {
                if (s.hasPussy) {
                    dlg += `<<pic $action "male-assfuck-female-doggy">>\n`;
                } else {
                    dlg += `<<pic $action "${gen}-ride-${randomItem(["male","ts","female"])}">>\n`;
                };

                dlg += `${name} is riding an office worker's cock in the corner of the room while others cheer ${him} on. Once the employee finally finishes with ${name}'s ass, ${he}'s passed off to the next hard cock waiting to use ${him}. `;
            }
            break;
        case "oral":
            dlg += `<<pic $action "${gen}-suck-male">>\n`;

            dlg += `${name} is on ${his} knees in the corner of the office, happily gagging on one cock after another. ${He} is made to wear nice office clothing to work every day, which the other employees take great pleasure in spraying with their cum.`;
            break;
        case "breasts":
            dlg += `${name} strokes the hair of two women currently sucking on ${his} ${s.getBreastSize()} breasts, a look of pure, lustful bliss across ${his} face.`;
            break;
        case "pussy":
            dlg += `<<pic $action "male-fuck-female-doggy">>\n`;

            dlg += `\n\n`;

            dlg += `${name} is currently bent over a desk while a group of men stand behind ${him} waiting for a turn to fuck ${him} in ${his} drenched pussy. ${name}'s eyes roll back in pleasure as ${he} services one cock after another with ${his} mouth. `;
            break;
        case "dom":
            dlg += `${name} has a smaller office worker on ${randomItem(["his","her"])} knees, `;

            if (s.hasPussy) {
                dlg += `licking ${his} soaking wet pussy while ${he} belittles them in front of their coworkers. `;
            } else {
                dlg += `sucking ${his} ${s.getPenisSize()} cock while ${he} belittles them in front of their coworkers. `;
            }
            break;
        case "sub":
            dlg += `${name} is scurrying around the cubicle area in a way-too-small maid outfit, while office workers make ridiculous and degrading demands of ${him}. Every time ${he} bends over to pick something up off the ground, someone will slide a pen or a finger into ${his} exposed ${s.getHole("hole")}. Often times the situation will escalate quickly, and ${name} will find ${him}self servicing multiple cocks and strapons at once. A look of blissful satisfaction extends across ${name}'s face. `;
            break;
        case "pet":
            dlg += `${name} is on ${his} hands and knees being walked around like a pet by other office workers who have fixed a leash and collar to ${him}, all the while forcing ${him} to make ${animal} noises. Once they've had their fun, ${name} is thrown to the ground and fucked relentlessly by one employee after another. `;
            break;
        default:
            dlg += `${name} is currently on ${his} knees in the cubicle, waiting for someone to come by and use ${him}. `;
            break;
    };

    return dlg;
};

window.psRoomSlaveOral = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var animal = s.animal !== "none" ? s.animal : "animal";
    var master = s.gender == "male" ? "master" : "mistress";
    var daddy = s.gender == "male" ? "daddy" : "mommy";
    var man = s.gender == "male" ? "man" : "woman";
    setSlaveTitle(s);
    var dlg = '';

    // Generate scene dialog
    dlg += `You move to the edge of your bed, instructing ${name} to remove your <<UnderwearOrPants>>. `;

    if (hasWorkingPenis()) {
        dlg += `Your <<pSize>> springs to life in front of ${his} face, `;
        if (hasPerk(s, "Oral Fixation") || s.trait.name == "Oral Addict") {
            dlg += `@@.gain;eliciting a look of lustful excitement from ${him}@@. After impatiently waiting for your permission, ${he} eagerly takes you into ${his} mouth, sucking and licking your shaft. `;
        } else if (s.trait.name == "Oral Aversion") {
            dlg += `@@.loss;eliciting a look of disgust from ${him}@@. Once you give ${him} permission, ${he} reluctantly takes you into ${his} mouth, sucking and licking your shaft. `;
        } else {
            dlg += `eliciting a look of surprise from ${him}. Once you give ${him} permission, ${he} takes you into ${his} mouth, sucking and licking your shaft. `;
        };

        dlg += `\n\n`;

        dlg += `<<pic $action "${gen}-suck-player">>\n`;

        if (hasPerk(s, "Oral Fixation") || s.trait.name == "Oral Addict") {
            dlg += `@@.gain;${name} excitedly bobs up and down the length of your cock, gagging ${him}self as ${he} takes you deeper and deeper. ${His} eyes roll back as ${he} loses ${him}self to the lust@@. `;
        } else if (s.trait.name == "Oral Aversion") {
            dlg += `@@.loss;${name} does ${his} best to look like ${he}'s enjoying ${him}self, clearly struggling to give an enjoyable blowjob@@. `;
        } else {
            dlg += `${name} dilligently bobs up and down the length of your cock, occassionally gagging but otherwise given an excellent blowjob! `;
        };

        dlg += `\n\n`;

        dlg += `<<nm $player "C-cumming!">>\n`

        dlg += `<<pic $action "${gen}-oral-creampie">>\n`

        if (hasPerk(s, "Oral Fixation") || s.trait.name == "Oral Addict") {
            dlg += `@@.gain;${name} moans in ecstasy as you shoot rope after rope of thick, hot cum down ${his} throat@@. ${He} rolls your load around in ${his} mouth for a moment before happily swallowing, kissing the tip of your cock when ${he}'s done. `;
        } else if (s.trait.name == "Oral Aversion") {
            dlg += `@@.loss;${name} tries and fails to keep ${his} composure as you release rope after rope of hot cum down ${his} throat@@. ${He}'s unable to swallow everything, allowing some to drip onto ${his} chest as you slide your softening cock out of ${his} mouth. `;
        } else {
            dlg += `${name} skillfully swallows your thick, hot load, making sure not to let any spill as you slide your wet cock out of ${his} mouth. `;
        };

        dlg += `\n\n`;

        dlg += `<<horny 0>>`
    };

    return dlg;
};

window.psRoomSlaveFuckSlave = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var animal = s.animal !== "none" ? s.animal : "animal";
    var master = s.gender == "male" ? "master" : "mistress";
    var daddy = s.gender == "male" ? "daddy" : "mommy";
    var man = s.gender == "male" ? "man" : "woman";
    setSlaveTitle(s);
    var dlg = '';

    // Generate scene dialog
    if (hasPerk(s, "Clipped Heels")) {
        dlg += `You instruct ${name} to crawl around the floor for your amusement. Even if ${he} wanted to say no, ${his} clipped heels prevent ${him} from walking around upright anyway. `;
        if (hasPerk(s, "Pet")) {
            dlg += `@@.xxx;As a self-proclaimed house pet@@, ${he} is more than happy to put on this display for you`;
            if (animal !== "none") {
                dlg += `, a show made all the better as you watch ${name}'s ${animal} ears and tail flop around as ${he} does so. `;
            } else {dlg += `. `};
        };
    } else if (hasPerk(s, "Pulled Heels")) {
        dlg += `You instruct ${name} to walk around the room for your amusement. As ${he} does so, ${his} pulled heels cause ${him} to walk in extremely high stripper heels, forcing ${him} to sway ${his} hips back and forth as ${he} walks. `;
        if (hasPerk(s, "Nymphomaniac")) {
            dlg += `@@.xxx;As a nymphomaniac@@, ${he} is more than happy to put on this display for you`;
            if (animal !== "none") {
                dlg += `, a show made all the better as you watch ${name}'s ${animal} ears and tail flop around as ${he} does so. `;
            } else {dlg += `. `};
        };
    };

    dlg += `You watch ${name} for a moment, enjoying the view as ${he} moves around the room, before you decide to take things further, pulling ${him} into your bed. `;

    dlg += `\n\n`;

    dlg += `<<nm $player "Get on your hands and knees.">>\n`;

    dlg += `${name} ${hasPerk(s,'Dominant') ? 'reluctantly' : 'eagerly'} complies, getting on all fours in front of you. Once in position, you rest the tip of your <<StraponOrCock size>> against ${his} ${s.getHole('hole')} and push forward, sliding into ${him} with ease. `;

    dlg += `\n\n`;

    if (s.hasPussy) {
        dlg += `<<pic $action "player-fuck-female-doggy">>\n`;
    } else {
        dlg += `<<pic $action "player-fuck-${gen}">>\n`;
    };

    dlg += `You continue to rail ${name} into your mattress, fucking ${him} hard and deep enough that ${his} teeth dig into your pillow. `;

    if (hasPerk(s, "Dominant")) {
        dlg += `@@.sf;As a dominant slave@@, it's clear that ${name} would rather have the roles reversed, which only serves to increase your pleasure. `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `${hasPerk(s,'Nymphomaniac') ? `@@.xxx;As a nymphomaniac with an intense sex addiction@@` : `@@.sf;As a submissive slave who loves to be used by others@@`}, it's not long before ${name} has become a complete drooling mess, having given ${him}self over to entirely as your personal fuck puppet. `;
    } else {
        dlg += `${name} happily takes you inside of ${his} ${s.getHole('hole')}, finding great pleasure in allowing you to use ${him} as you like. `;
    };

    dlg += `\n\n`;

    dlg += `<<nm $player "C-cumming!">>\n`;

    if (hasPenis()) {
        dlg += `${name}'s thighs tighten up as you bury your <<pSize>> deep inside of ${him}, releasing rope after rope of hot, thick cum directly into ${his} ${s.hasPussy ? `womb` : `stomach`}. `;

        dlg += `\n\n`;

        dlg += `<<pic $action "creampie-${gen}">>\n`

        dlg += `After holding ${him} against you as you drain your balls, you finally let go, allowing ${him} to fall face-first into a pool of sweat and cum. `;        
    } else {
        dlg += `${name}'s thighs tighten up as you bury your <<accf>> deep inside of ${him}, spraying wave after wave of juices out from under the harness. After holding ${him} against you as you ride your orgasm to completion, you finally let go, allowing ${him} to fall face-first into a pool of sweat and cum. `;  
    };

    dlg += `\n\n`;

    dlg += `<<nm $player "That... was great. Anyway, time to go back for now!">>\n`;

    dlg += `You leash ${name}, dragging ${him} off the bed and walking ${him} back to your closet on ${his} hands and knees. `;

    dlg += `\n\n`;

    dlg += `<<horny 0>>`;

    return dlg;
}

window.psRoomSlaveFuckMC = function(s) {
    // Initialize empty dialog string and easier pronoun variables
    var [name,he,He,his,His,him,Him,hiss,Hiss,boy,Boy,gen] = getSlavePronouns(s);
    var animal = s.animal !== "none" ? s.animal : "animal";
    var master = s.gender == "male" ? "master" : "mistress";
    var daddy = s.gender == "male" ? "daddy" : "mommy";
    var man = s.gender == "male" ? "man" : "woman";
    setSlaveTitle(s);
    var dlg = '';

    // Generate scene dialog
    if (hasPerk(s, "Clipped Heels")) {
        dlg += `You instruct ${name} to crawl around the floor for your amusement. Even if ${he} wanted to say no, ${his} clipped heels prevent ${him} from walking around upright anyway. `;
        if (hasPerk(s, "Pet")) {
            dlg += `@@.xxx;As a self-proclaimed house pet@@, ${he} is more than happy to put on this display for you`;
            if (animal !== "none") {
                dlg += `, a show made all the better as you watch ${name}'s ${animal} ears and tail flop around as ${he} does so. `;
            } else {dlg += `. `};
        };
    } else if (hasPerk(s, "Pulled Heels")) {
        dlg += `You instruct ${name} to walk around the room for your amusement. As ${he} does so, ${his} pulled heels cause ${him} to walk in extremely high stripper heels, forcing ${him} to sway ${his} hips back and forth as ${he} walks. `;
        if (hasPerk(s, "Nymphomaniac")) {
            dlg += `@@.xxx;As a nymphomaniac@@, ${he} is more than happy to put on this display for you`;
            if (animal !== "none") {
                dlg += `, a show made all the better as you watch ${name}'s ${animal} ears and tail flop around as ${he} does so. `;
            } else {dlg += `. `};
        };
    };

    dlg += `You watch ${name} for a moment, enjoying the view as ${he} moves around the room, before you decide to take things further, pulling ${him} into your bed. `;

    dlg += `\n\n`;

    dlg += `<<nm $player "Today, you're gonna fuck me, so get on your knees at the edge of the bed.">>\n`;

    if (hasPerk(s, "Dominant")) {
        dlg += `@@.xxx;${name}'s eyes light up, knowing ${he} finally has a chance to exert some power over ${his} master@@, even if it's only an act. `;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `${name} looks nervous, @@.sf;as a natural submissive, ${he}'s not sure ${he} can perform the task as expected@@. `;
    };

    if (s.hasPenis) {
        if (s.hasBalls) {
            dlg += `You play with ${name}'s ${s.getPenisSize()} cock for a little bit to get ${him} nice and hard for you, before taking your preferred position in front of ${him}. You guide ${his} lubricated cock to your <<AssOrPussy>> before tugging hard on the small leash you have around ${his} neck. `;

            dlg += `\n\n`;

            dlg += `<<pic $player "fucked-by-${gen}>>\n`;
        } else {
            dlg += `@@.sf;Since ${name} no longer has ${his} testicles, ${he}'s unable to achieve a usable erection@@. Having prepared for this, you fasten a large strap-on dildo around ${his} waist and over ${his} useless cock. The embarrassment in ${his} eyes is obvious and arousing. You guide ${his} lubricated \"cock\" to your <<AssOrPussy>> before tugging hard on the small leash you have around ${his} neck. `;

            dlg += `\n\n`;
        }

        dlg += `<<nm $player "Oooohhhh, yeahhh... There it is! You keep fucking until I cum, understand?">>\n`;

        if (hasPerk(s,"Muted")) {
            dlg += `${name} emphatically nods ${his} head, unable to speak a response. `;
        } else {
            dlg += `${name} confirms ${he} understands, picking up ${his} pace. `;
        };
    } else {
        dlg += `In preparation for this session, you fasten a large strap-on dildo around ${his} waist, half of which slides inside ${his} pussy. You guide ${his} lubricated \"cock\" to your <<AssOrPussy>> before tugging hard on the small leash you have around ${his} neck. `;

        dlg += `\n\n`;

        dlg += `<<nm $player "Oooohhhh, yeahhh... There it is! You keep fucking until I cum, understand?">>\n`;

        if (hasPerk(s,"Muted")) {
            dlg += `${name} emphatically nods ${his} head, unable to speak a response. `;
        } else {
            dlg += `${name} confirms ${he} understands, picking up ${his} pace. `;
        };

        dlg += `\n\n`;

        dlg += `<<pic $player "fucked-by-${gen}">>\n`;
    };

    dlg += `${name} ${hasPerk(s,'Dominant') ? 'enthusiastically' : 'diligently'} continues, fucking you deep and hard as you quickly work towards orgasm. It's not long before you can feel your climax welling up inside you. `;

    dlg += `\n\n`;

    dlg += `<<nm $player "C-cumming!">>\n`;
    
    dlg += `You continue to get railed into your mattress by ${name}, your hands gripping your sheets and your teeth digging into your pillow. `;

    if (hasPerk(s, "Dominant")) {
        dlg += `@@.xxx;As a dominant slave@@, it's clear that ${name} is deriving great pleasure from taking on this role. As you call out, ${he} buries himself deep into your <<AssOrPussy>>, finally sending you over the edge.`;
    } else if (hasPerk(s, "Submissive")) {
        dlg += `@@.sf;While still not comfortable in this role@@, ${name} works hard to fuck you to completion, breathing heavily and sweating through the process. `;
    } else {
        dlg += `${name} happily follows ${his} instructions, working hard to enthusiastically fuck you to completion. `;
    };

    dlg += `\n\n`;

    dlg += `<<nm $player "FFFUUUUCK!">>\n`;

    if (hasPenis()) {
        dlg += `With strong pressure applied to your prostate, rope after rope of hot cum spurts and shoots out of your dangling cock as ${name} holds you firmly in place. After a moment, you slide off of ${his} member and fall into your pillow. `;

        dlg += `\n\n`;

        dlg += `<<nm $player "That... you... g-good... good ${boy}...">>\n`
    } else {
        dlg += `With your <<vSize>> filled to the brim, wave after wave of thick juices spray out from between your thighs as ${name} holds you firmly in place. After a moment, you slide off of ${his} member and fall into your pillow. `;

        dlg += `\n\n`;

        dlg += `<<nm $player "That... you... g-good... good ${boy}...">>\n`
    };

    dlg += `${name} waits patiently as you get yourself back together. You leash ${name}, dragging ${him} off the bed and walking ${him} back to your closet on ${his} hands and knees. `;

    dlg += `\n\n`;

    dlg += `<<horny 0>>`;

    return dlg;
}
/* twine-user-script #58: "thePitLevelUp.js" */
// Functions to handle level up events and the level up screen

window.psLevelUp = function(s) {
    // Return unlocked perk from list of valid perks
    var perk = getPerk(s);

    // Add perk to slave's perk list
    s.perks.push(perk);

    // Display perk unlock message
    var dlg = `You've unlocked the @@.xxx;${perk}@@ perk!`;

    // Return dialog string
    return dlg;
}
/* twine-user-script #59: "upgrades.js" */
// Define global updates to The Pit

variables().PitUpgrade = [];
variables().PitUpgrade[0] = {
    name: "Add +2 Trainer Points",
    cost: 7500,
    locked: true,
    type: "tp", value: 2,
    level: 1
};
variables().PitUpgrade[1] = {
    name: "Add +1 Cell Slot",
    cost: 10000,
    locked: true,
    type: "slot", value: 1,
    level: 1
};
variables().PitUpgrade[2] = {
    name: "Unlock Training Assistant",
    cost: 15000,
    locked: true,
    type: "flag", flag: "PitAssistant",
    level: 1
};
variables().PitUpgrade[3] = {
    name: "Add +2 Trainer Point",
    cost: 20000,
    locked: true,
    type: "tp", value: 2,
    level: 2
};
variables().PitUpgrade[4] = {
    name: "Add +1 Cell Slot",
    cost: 20000,
    locked: true,
    type: "slot", value: 1,
    level: 2
};
variables().PitUpgrade[5] = {
    name: "Unlock Basic Surgery",
    cost: 50000,
    locked: true,
    type: "flag", flag: "PitSurgery",
    level: 2
};
variables().PitUpgrade[6] = {
    name: "Slaves gain +1 XP",
    cost: 100000,
    locked: true,
    type: "stat", stat: "PitXPMod", value: 1,
    level: 3
};
variables().PitUpgrade[7] = {
    name: "Slaves gain or lose +1 Sexuality when trained",
    cost: 200000,
    locked: true,
    type: "stat", stat: "PitSEXMod", value: 1,
    level: 3
};
variables().PitUpgrade[8] = {
    name: "Slaves gain or lose +1 Willpower when trained",
    cost: 200000,
    locked: true,
    type: "stat", stat: "PitWLPMod", value: 1,
    level: 3
};
variables().PitUpgrade[9] = {
    name: "Slaves gain or lose +1 Loyalty when trained",
    cost: 200000,
    locked: true,
    type: "stat", stat: "PitLTYMod", value: 1,
    level: 3
};
variables().PitUpgrade[10] = {
    name: "Add +3 Trainer Points",
    cost: 100000,
    locked: true,
    type: "tp", value: 3,
    level: 4
};
variables().PitUpgrade[11] = {
    name: "Add +3 Cell Slot",
    cost: 100000,
    locked: true,
    type: "slot", value: 3,
    level: 4
};
variables().PitUpgrade[12] = {
    name: "Unlock Advanced Surgery",
    cost: 500000,
    locked: true,
    type: "flag", flag: "PitSurgery2",
    level: 4
};
variables().PitUpgrade[13] = {
    name: "Slaves gain 50% more Value from training",
    cost: 1000000,
    locked: true,
    type: "stat", stat: "PitValueMod", value: 50,
    level: 5
};
variables().PitUpgrade[14] = {
    name: "Slaves gain or lose +2 Sexuality when trained",
    cost: 500000,
    locked: true,
    type: "stat", stat: "PitSEXMod", value: 2,
    level: 5
};
variables().PitUpgrade[15] = {
    name: "Slaves gain or lose +2 Willpower when trained",
    cost: 500000,
    locked: true,
    type: "stat", stat: "PitWLPMod", value: 2,
    level: 5
};
variables().PitUpgrade[16] = {
    name: "Slaves gain or lose +2 Loyalty when trained",
    cost: 500000,
    locked: true,
    type: "stat", stat: "PitLTYMod", value: 2,
    level: 5
};
variables().PitUpgrade[17] = {
    name: "Add +3 Trainer Points",
    cost: 750000,
    locked: true,
    type: "tp", value: 3,
    level: 6
};
variables().PitUpgrade[18] = {
    name: "Add +3 Cell Slot",
    cost: 750000,
    locked: true,
    type: "slot", value: 3,
    level: 6
};
variables().PitUpgrade[19] = {
    name: "Unlock feminization surgery",
    cost: 400000,
    locked: true,
    type: "flag", flag: "PitFemSurgery",
    level: 3
};


window.upgradePit = function(upgrade) {
    var pg = variables().PitUpgrade[upgrade];

    if (pg.locked) {
        if (pg.type == "tp") {
            variables().TrainingPoints += pg.value;
            variables().MaxTrainingPoints += pg.value;
        } else if (pg.type == "slot") {
            variables().MaxPitSlots += pg.value;
        } else if (pg.type == "flag") {
            variables()[pg.flag] = true;
        } else if (pg.type == "stat") {
            variables()[pg.stat] += pg.value;
        };
    };

    pg.locked = false;
    variables().Money -= pg.cost;
};