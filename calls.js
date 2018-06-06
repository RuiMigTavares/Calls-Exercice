#!/usr/bin/env node

var S = "00:01:07,400-234-090\n00:05:01,701-080-080\n00:05:00,400-234-090";

console.log('solution:'+solution (S))

function solution(S) {

    let billArr = [];
    let calls = S.split('\n');

    if( calls.length > 100 ){
        return;
    }

    calls.map((call) => {
        let duration = getTimeInSeconds(call.split(',')[0]);
        let callCost = 0;
    
        if( duration < 300 ) {
            callCost = duration * 3;
        }else {
            const durationMin = Math.ceil(duration / 60);
            callCost = durationMin * 150;
        }
    
        const index = billArr.findIndex( bill => bill.number == call.split(',')[1] );
    
        if( index >= 0 ){
            billArr[index].duration = billArr[index].duration + getTimeInSeconds(call.split(',')[0]);
    
            billArr[index].cost = billArr[index].cost + callCost;
        }else{
    
            billArr = [...billArr,
            {
                'number' : call.split(',')[1],
                'duration' : duration,
                'cost' : callCost
            }];
        }
    })

    var output = billArr.reduce( ( max, call ) => Math.min(max.cost, call.cost));
    return output;
}

function getTimeInSeconds (time){
    const timeArr = time.split(':');
    let converted = 0;

    converted = parseInt(timeArr[0]*3600) + parseInt(timeArr[1]*60) + parseInt(timeArr[2]);

    return converted;
}
