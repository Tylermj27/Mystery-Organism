// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//object factory to get a new pAequor object
const pAequorFactory = (num, arr) => {
  let organism = {
    specimenNum: num,
    dna: arr,
    mutate() { //this randomly selects one dna base in the object and returns a new base that is not the same as the old one
      let len =arr.length;
      let dnaChange = Math.floor(Math.random() * len);
      let newBase = returnRandBase();
      if(this.dna[dnaChange] != newBase) { this.dna.splice(dnaChange, 1, newBase) }
      else {this.mutate};
    },
    compareDNA(object) {
      let len = this.dna.length;
      let count = 0;
      let result;
      for (let i=0; i<len; i++) {
        if(this.dna[i] === object.dna[i]) {
          count += 1;
        }
      }
      result = Math.floor((count / len) *100);
      console.log(`specimen #${this.specimenNum} and specimen #${object.specimenNum} have ${result}% DNA in common`)
    },
    willLikelySurvive() { //goes through the dna to see if 60% of it is C or G and returns if it is likely to survive or not
      let len = this.dna.length;
      let count = 0;
        for(let i=0; i<len; i++) {
          if(this.dna[i] === 'C' || this.dna[i] ==='G') {
            count += 1;
          }
        }
      let result = Math.floor((count/len) *100);
      if(result >= 60) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  return organism;
}
let testStrand = pAequorFactory(1, mockUpStrand());
let testStrand2 = pAequorFactory(2, mockUpStrand());
let organismBatch = [];

for(let i=1; i <= 30; i++) {
    let currentOrganism = pAequorFactory(i, mockUpStrand());
    if (currentOrganism.willLikelySurvive() === true) {
      organismBatch.push(currentOrganism);
    }
    else {
      i--;
    }
}
console.log(organismBatch);
