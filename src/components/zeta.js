 //import React from "react"
 import primesLong_100k from "../data/primesLongList_100k"
 import primesLong_200k from "../data/primesLongList_200k"
 import primesLong_300k from "../data/primesLongList_300k"
 import primesLong_400k from "../data/primesLongList_400k"
 import primesLong_500k from "../data/primesLongList_500k"
 import primesLong_600k from "../data/primesLongList_600k"
 import primesLong_700k from "../data/primesLongList_700k"
 import primesLong_800k from "../data/primesLongList_800k"
 import primesLong_900k from "../data/primesLongList_900k"
 import primesLong_1000k from "../data/primesLongList_1000k"
 
 
 const primes = [...primesLong_100k, ...primesLong_200k, ...primesLong_300k,...primesLong_400k,...primesLong_500k,...primesLong_600k,...primesLong_700k,...primesLong_800k,...primesLong_900k,...primesLong_1000k]


 export const zetaSum = (maxN,s) => {
     let sum = 0
    for(let n = 1;n<maxN;n++){
        sum += (1 / n)**s
    }
    return sum
 }

 export const zetaProd = (nPrimes,s) => {
     let prod = 1
     for (let i=0;i<nPrimes;i++) {
         prod = prod * 1 / (1 - primes[i]**(-s))
     }
     return prod
 }

 