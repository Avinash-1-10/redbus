// //                      y    m  d  h    m  s  mil
// const date = new Date(2023, 10, 26, 15, 30, 0, 0);
// const startDate = new Date("2023-11-24")
// console.log("Start date:", Date.parse(startDate))

// const endDate = new Date("2023-11-28")
// console.log("End date:", Date.parse(endDate))

// const Departure = new Date(2023, 10, 24, 9, 30, 0, 0)
// console.log("Departure time:",Date.parse(Departure))

// const arrival = new Date(2023, 10, 28, 14, 30, 0, 0);
// console.log("Arrival time:", Date.parse(arrival))




















// var garbageCollection = function (garbage, travel) {
//     let n = garbage.length;
//     let G_idx = 0;
//     let P_idx = 0;
//     let M_idx = 0;
//     let TimeToTake = 0;
  
//     for (let i = 0; i < n; i++) {
//       for (let j = 0; j < garbage[i].length; j++) {
//         if (garbage[i][j] === "M") {
//           M_idx = i;
//         } else if (garbage[i][j] === "P") {
//           P_idx = i;
//         } else {
//           G_idx = i;
//         }
//         TimeToTake++;
//       }
//     }
//     console.log(G_idx, P_idx, M_idx);
//     console.log(TimeToTake);
//     for (let i = 1; i < travel.length; i++) {
//       travel[i] += travel[i - 1];
//     }
  
//     TimeToTake += M_idx > 0 ? travel[M_idx - 1] : 0;
//     TimeToTake += P_idx > 0 ? travel[P_idx - 1] : 0;
//     TimeToTake += G_idx > 0 ? travel[G_idx - 1] : 0;
  
//     return TimeToTake;
//   };
  
//   // Example usage
//   const garbage = ["G", "P", "GP", "GG"];
//   const travel = [2, 4, 3];
//   const result = garbageCollection(garbage, travel);
//   console.log(result); // Output: 21
  




// 38. Count and Say

var countAndSay = function(n) {
    if(n===1){
        return "1"
    }
    console.log(n)
    return countAndSay(n-1)
};
console.log(countAndSay(4))