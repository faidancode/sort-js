// The Strategy
// 1. Find the Range: Determine the minimum and maximum values in the array to create a counting bucket of the appropriate size.

// 2. Counting Sort: Map each number to its corresponding index in a counts array.

// 3. Sorted Reconstruction: Iterate through the counts array to rebuild the sorted version of arr.

// 4. Find Minimum Difference: Iterate through the sorted array once to find the smallest gap between adjacent elements.

// 5. Collect Pairs: Iterate again to collect all pairs that match that minimum gap.

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  // 1. Find min and max to determine the range for Counting Sort
  let min = Infinity;
  let max = -Infinity;
  for (let num of arr) {
    if (num < min) min = num;
    if (num > max) max = num;
  }

  // 2. Initialize the counting array
  // Shift all numbers by |min| so the smallest number maps to index 0
  const range = max - min + 1;
  const count = new Uint8Array(range); // Using Uint8Array to save memory

  for (let num of arr) {
    count[num - min] = 1;
  }

  // 3. Reconstruct the sorted array from the counts
  const sortedArr = [];
  for (let i = 0; i < range; i++) {
    if (count[i] === 1) {
      sortedArr.push(i + min);
    }
  }

  // 4. Find the minimum absolute difference
  let minDiff = Infinity;
  for (let i = 1; i < sortedArr.length; i++) {
    let diff = sortedArr[i] - sortedArr[i - 1];
    if (diff < minDiff) {
      minDiff = diff;
    }
  }

  // 5. Collect all pairs with the minimum difference
  const result = [];
  for (let i = 1; i < sortedArr.length; i++) {
    if (sortedArr[i] - sortedArr[i - 1] === minDiff) {
      result.push([sortedArr[i - 1], sortedArr[i]]);
    }
  }

  return result;
};
