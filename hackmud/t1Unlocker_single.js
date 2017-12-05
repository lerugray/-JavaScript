
function(context, args) { // target:"#s.no.quotes"

	var ret = ""							// Script by lerugray, structure inspired from big_cedar on reddit, and @dtr

	var ez = ["open","unlock","release"]	
											

	var guess = {}

	var regex = /`N(\w+)` lock\./			
										

	ret = args.target.call(guess)		
		
	var done = false						
											
	var prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

	var clr = ["red","orange","yellow","lime","green","cyan","blue","purple"]
	
	var lock = regex.exec(ret)	

	var k3y = ["6hh8xw", "cmppiq", "sa23uw", "tvfkyq", "uphlaw", "vc2c7q","xwz7ja"]			

	var log = []

if (lock[1] == "EZ_21") {    
  	for(var i=0;i<3;++i) {
    	guess.ez_21=ez[i];
    	ret = args.target.call(guess);

    	log.push({
        attempt: i,
        guess: guess,
        ret: ret
    	})
     
      if(ret.includes("LOCK_UNLOCKED")){
        done = true;
        break;    
      }
    }                                                                                
  }

else if (lock[1] == "EZ_35") {

  	for(var i=0;i<3;i++) {
  		guess.ez_35=ez[i];
  		ret = args.target.call(guess);
  		
  		log.push({
  			attempt: i,
  			guess: guess,
  			ret: ret
  		})

  		if (ret.includes("Required")) {
  			done=true;
  			break;
  			}
  		}

  	for(var i=0;1<10;i++) {
  		guess.digit=i;
  		ret = args.target.call(guess);

  		log.push({
  			guess: Object.assign({}, guess),
  			attempt: i,
  			ret: ret
  		})

  		if(ret.includes("LOCK_UNLOCKED")) {
  			done=true;
  			break;
  		}
  	}	
}

else if (lock[1] == "EZ_40") {

	for(var i=0;i<3;i++) {
		guess.ez_40=ez[i];
		ret = args.target.call(guess);

		log.push({
			guess: Object.assign({}, guess),
			attempt: i,
			ret: ret

		})
	
		if(ret.includes("Required")) {
			done=true;
			break;
		}
	}

	for(var p of prime) {
		guess.ez_prime=p;
		ret = args.target.call(guess);

		log.push({
			guess: Object.assign({}, guess),
			attempt: i,
			ret: ret
		})
		
		if(ret.includes("LOCK_UNLOCKED")) {
			done=true;
			break;
		}
	}
}

else if (lock[1]== "c001"){

	for(var i=0;i<8;i++) {
		guess.c001=clr[i];
		guess.color_digit=clr.length;
		ret = args.target.call(guess);

		log.push({
			guess: Object.assign({}, guess),
			attempt: i,
			ret: ret
		})

		if(ret.includes("LOCK_UNLOCKED")) {
			done=true;
			break;
		}

	}
}

else if (lock[1]== "c002"){

	for(var i=0;i<8;i++) {
		guess.c002=clr[i];
		guess.c002_complement=clr[(i+4)%8];
		ret = args.target.call(guess);

		log.push({
			guess: Object.assign({}, guess),
			attempt: i,
			ret: ret
		})

		if(ret.includes("LOCK_UNLOCKED")) {
			done=true;
			break;
			}
		}
		
	}

else if (lock[1]== "c003") {

	for(var i=0;i<8;i++) {
		guess.c003=clr[i];
		guess.c003_triad_1=clr[(i+5)%8];
		guess.c003_triad_2=clr[(i+3)%8];
		ret = args.target.call(guess);

		log.push({
			guess: Object.assign({}, guess),
			attempt: i,
			ret: ret
		})

		if(ret.includes("LOCK_UNLOCKED")) {
			done=true;
			break;
		}
	}
}

else if (lock[1]== "l0cket"){
	for(var i=0;i<7;i++) {
		guess.l0cket=k3y[i];
		ret = args.target.call(guess);

		log.push({
			guess: Object.assign({}, guess),
			attempt: i,
			ret:ret
		})

		if(ret.includes("LOCK_UNLOCKED")) {
			done=true;
			break;
		}
	}
}

  return {
    ok: done,
    msg: "www.beedogs.com",
    log: log
  }
}




	

