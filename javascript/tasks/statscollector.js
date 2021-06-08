/*
* Our application servers receive approximately 20 000
* http requests  per second. Response timeout is 19000ms.
* Implement a statistics collector that calculates the
* median and average request response times for a 7 day
* dataset.
*
* Assigment:
* 1. Implement StatsCollector
* 2. Write tests (below StatsCollector)
*/

'use strict';

const TIMEOUT = 19000;

// State collector
class StatsCollector {
	constructor(/*void*/) {
  	// using object array here because it can hold more than map
    // and is more performant than array
  	this.responseTimes = {};
    this.size = 0;
    this.average = 0;
  }

	pushValue(responseTimeMs /*number*/) /*void*/ {
  	if (responseTimeMs >= TIMEOUT) {
    	throw Error(`Response time ${responseTimeMs} over or same as timeout ${TIMEOUT}`);
    }
  	this.responseTimes[this.size] = responseTimeMs;
    // calculating average upon add in order to save time
    if (this.size > 0) {
    	this.average = (this.size * this.average + responseTimeMs) / (this.size + 1);
    } else {
    	this.average = responseTimeMs;
    }
    this.size += 1;
  }

	getMedian() /*number*/ {
  	const length = this.size;
    const middle = Math.floor(length / 2);
  	const even = length % 2 === 0;    
    const values = Object.values(this.responseTimes).sort((a, b) => a - b);
    return even
    	? (values[middle] + values[middle + 1]) / 2
      : values[middle];
  }

	getAverage() /*number*/ {
  	return this.average;
  }

}

// Configure Mocha, telling both it and chai to use BDD-style tests.
mocha.setup("bdd");
chai.should();

describe('StatsCollector', function(){
  it('it should have tests', function(){
    true.should.equal(true);
  });
  
  it('should receive responseTimes', () => {
  	const collector = new StatsCollector();
    collector.pushValue(1233);
    collector.responseTimes[0].should.equals(1233);
  });
  
  it('should not accept values with response time over timeout', () => {
  	const collector = new StatsCollector();
    (() => {
      collector.pushValue(19001);
    }).should.throw(Error, /Response time 19001 over or same as timeout 19000/);
  });
  
  it('should not accept values with response time same as timeout', () => {
  	const collector = new StatsCollector();
    (() => {
      collector.pushValue(19000);
    }).should.throw(Error, /Response time 19000 over or same as timeout 19000/);
  });
  
  it('should calculate average', () => {
  	const collector = new StatsCollector();
    collector.pushValue(5);
    collector.pushValue(10);
    collector.getAverage().should.equal(7.5);
  });
  
  it('should calculate another average', () => {
  	const collector = new StatsCollector();
    collector.pushValue(5);
    collector.pushValue(5);
    collector.pushValue(10);
   	collector.pushValue(10);
    collector.getAverage().should.equal(7.5);
  });
  
  it('should calculate median with odd amount', () => {
  	const collector = new StatsCollector();
    collector.pushValue(20);
    collector.pushValue(50);
    collector.pushValue(10);
    collector.pushValue(60);
    collector.pushValue(100);
    collector.getMedian().should.equal(50);
  });
  
  it('should calculate median with even amount', () => {
  	const collector = new StatsCollector();
  	collector.pushValue(20);
    collector.pushValue(50);
    collector.pushValue(10);
    collector.pushValue(60);
    collector.pushValue(100);
    collector.pushValue(70);
    collector.getMedian().should.equal(65);
  });
  
  it('should handle average with lots of data', () => {
  	const startTime = new Date();
  	const collector = new StatsCollector();
  	const responsesInDay = 20000 * 60 * 60;
    for (let i = 0; i < responsesInDay; i++) {
    	collector.pushValue(5);
    }
    collector.getAverage().should.equal(5);
  });
  
  it('should handle median with lots of data', () => {
  	const startTime = new Date();
  	const collector = new StatsCollector();
  	const responsesInDay = 20000 * 60;
    for (let i = 0; i < responsesInDay; i++) {
    	collector.pushValue(5);
    }
    collector.getMedian().should.equal(5);
  });
});

// Run all our test suites.  Only necessary in the browser.
mocha.run();
    
