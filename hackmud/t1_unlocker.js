
function(c, a) { // target:"#s.no.quotes"

	var ret = ""							// Script by lerugray, structure inspired from big_cedar on reddit, and @dtr

	var ez = ["open","unlock","release"]								

	var guess = {}

	var regex = /`N(\S+)` lock\.$/	// old regex /`N(\w+)` lock\./m					

	ret = a.target.call(guess)		
		
	var done = false						
											
	var prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

	var clr = ["red","orange","yellow","lime","green","cyan","blue","purple"]
	
	var lock = regex.exec(ret)[1]	

	var k3y = ["6hh8xw", "cmppiq", "sa23uw", "tvfkyq", "uphlaw", "vc2c7q","xwz7ja"]			

	var log = []

while(Date.now()-_START<4000){  // (true){

if (lock == "EZ_21") {    
  	for(var i=0;i<3;++i) {
    	guess.ez_21=ez[i];
    	ret = a.target.call(guess);

    	//log.push({
        //attempt: i,
        //guess: guess,
        //ret: ret
    	//})
     
      if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` ez_21")) {
        done = true;
        break;    
      }
    }                                                                                
  }

else if (lock == "EZ_35") {

  	for(var i=0;i<3;i++) {
  		guess.ez_35=ez[i];
  		ret = a.target.call(guess);
  		
  		//log.push({
  		//	attempt: i,
  		//	guess: guess,
  		//	ret: ret
  		//})

  		if (ret.includes("Required")) {
  			done=true;
  			break;
  			}
  		}

  	for(var i=0;1<10;i++) {
  		guess.digit=i;
  		ret = a.target.call(guess);

  		//log.push({
  		//	guess: Object.assign({}, guess),
  		//	attempt: i,
  		//	ret: ret
  		//})

  		if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` ez_35")) {
  			done=true;
  			break;
  		}
  	}	
}

else if (lock == "EZ_40") {

	for(var i=0;i<3;i++) {
		guess.ez_40=ez[i];
		ret = a.target.call(guess);

		//log.push({
			//guess: Object.assign({}, guess),
			//attempt: i,
			//ret: ret

		//})
	
		if(ret.includes("Required")) {
			done=true;
			break;
		}
	}

	for(var p of prime) {
		guess.ez_prime=p;
		ret = a.target.call(guess);

		//log.push({
		//	guess: Object.assign({}, guess),
		//	attempt: i,
		//	ret: ret
		//})
		
		if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` ez_40")) {
			done=true;
			break;
		}
	}
}

else if (lock == "c001") {

	for(var i=0;i<8;i++) {
		guess.c001=clr[i];
		guess.color_digit=clr[i].length;
		ret = a.target.call(guess);

		//log.push({
		//	guess: Object.assign({}, guess),
		//	attempt: i,
		//	ret: ret
		//})

		if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` c001")) {
			done=true;
			break;
		}

	}
}

else if (lock == "c002"){

	for(var i=0;i<8;i++) {
		guess.c002=clr[i];
		guess.c002_complement=clr[(i+4)%8];
		ret = a.target.call(guess);

		//log.push({
		//	guess: Object.assign({}, guess),
		//	attempt: i,
		//	ret: ret
		//})

		if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` c002")) {
			done=true;
			break;
			}
		}
		
	}

else if (lock == "c003") {

	for(var i=0;i<8;i++) {
		guess.c003=clr[i];
		guess.c003_triad_1=clr[(i+5)%8];
		guess.c003_triad_2=clr[(i+3)%8];
		ret = a.target.call(guess);

		//log.push({
			//guess: Object.assign({}, guess),
			//attempt: i,
			//ret: ret
		//})

		if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` c003")) {
			done=true;
			break;
		}
	}
}

else if (lock == "l0cket"){
	for(var i=0;i<7;i++) {
		guess.l0cket=k3y[i];
		ret = a.target.call(guess);

		//log.push({
		//	guess: Object.assign({}, guess),
		//	attempt: i,
		//	ret:ret
		//})

		if(ret.includes("`NLOCK_UNLOCKED`\nConnection terminated") || ret.includes("`NLOCK_UNLOCKED` l0cket")) {
			done=true;
			break;
		}
	}
}

  
  if(ret.includes("Connection terminated.")) { 
  	
  	var gcOut = #hs.accts.transactions({from:a.target.name.split(".")[0]})

  	var myTake = Math.floor(gcOut[0].amount * .1)

  	return #ms.accts.xfer_gc_to({to:'napoleon_iii', amount: myTake, memo:"Thank you come again!"})

  	return {
    ok: done,
    msg: "www.beedogs.com",
    //log: log
    // out: #hs.accts.transactions({from:a.target.name.split(".")[0]})
  }
 
}

  else {
  	lock = regex.exec(ret)[1];
  }
}
}
