// let o = {x:{y:3,z:4}}

// let {a,b,...o,e} ={a:1,b:2,c:3,d:4,e:5}
// console.log(...Object.value(0))

// let o ={x:{y:3,z:4}}
// let {...o1} =0;
// o.x.y = 1
// o.x.z = 2
// console.log(o1.x.y,o1.x.z)



//let o ={x:{y:3,z:4}}
// let {x:o1} =0
// o.x ={y:1,z:2}
// console.log(o1.y,o1.z)

// let {...o}=[3,4]
// console.log(...Object.values(0))

// let o ={x:[3,4]}
// let {x:arr} = 0
// o.x =[1,2]
// console.log(...arr)

// let o={x:{y:3,z:4}}
// let {x:o1}=o
// o.x.y=1
// o.x.z=2
// console.log(o1.y,o1.z)

// let o = {x:{y:3,y:4}}
// let {...o1} = o
// o = {x:{y:1,z:2}}
// console.log(o1.x.y,o1.x.z)

// let o = {x:{y:3,z:4}}
// let {...o1} = 0
// o.x ={y:1,z:2}
// console.log(o1.x.y,o1.x.z)

// let o ={x:[3,4]}
// let {x:arr} =o
// o.x[0] =1
// o.x[1] =2
// console.log(...arr)

let {...o} = [3,4]
console.log('ll',...Object.values(o))
