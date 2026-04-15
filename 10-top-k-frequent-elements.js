// The Strategy

// 1.Count Frequencies: Use a Hash Map (Object or Map) to count how many times each number appears.
// 2.Bucket by Frequency: Create an array of buckets where the index represents the frequency. For example, bucket[3] will hold all numbers that appeared exactly 3 times.
// 3.Collect Top K: Iterate through the buckets from highest index to lowest and collect elements until we have $k$ numbers.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const n = nums.length;
  const freqMap = new Map();

  // 1. Build the frequency map
  // Time: O(n)
  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 2. Create buckets where index = frequency
  // The maximum possible frequency is n
  const buckets = Array.from({ length: n + 1 }, () => []);

  // 3. Fill buckets
  // Time: O(n)
  for (let [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // 4. Gather the top k frequent elements
  // Iterate backwards from the highest possible frequency
  const result = [];
  for (let i = n; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      // Add all numbers with this frequency
      for (let num of buckets[i]) {
        result.push(num);
        // Stop once we reach k elements
        if (result.length === k) return result;
      }
    }
  }

  return result;
};


// Logic & Explanation

// This approach is extremely efficient because it avoids the $O(n \log n)$ cost of a traditional sort or the $O(n \log k)$ cost of a Heap.
// - Why Bucket Sort?: Since the maximum frequency an element can have is limited by the size of the array ($n$), we can use those frequencies as array indices. This allows us to "sort" the frequencies in linear time.
// - The Bucket Structure:Suppose nums = [1,1,1,2,2,3].
// -- Frequencies: {1: 3, 2: 2, 3: 1}.
// -- Buckets:index 3: [1]index 2: [2]index 1: [3]
// --- To get k = 2, we look at index 3 (get 1) then index 2 (get 2). Result: [1, 2].