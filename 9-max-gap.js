// The Logic: Bucket Strategy
// If we have $n$ elements with a total range from min to max, the average gap between elements is roughly $(max - min) / (n - 1)$.
// 1. We create buckets with a size equal to this average gap.
// 2. Each bucket only needs to store two values: its minimum and its maximum.
// 3. The maximum gap cannot occur between elements within the same bucket (because the bucket size is smaller than the average gap).
// 4. Therefore, the maximum gap must occur between the maximum of one bucket and the minimum of the next non-empty bucket.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
  if (nums.length < 2) return 0;

  let min = Math.min(...nums);
  let max = Math.max(...nums);
  let n = nums.length;

  // If all elements are the same
  if (min === max) return 0;

  // Calculate the size and number of buckets
  // We want the bucket size to be at least 1
  let bucketSize = Math.max(1, Math.floor((max - min) / (n - 1)));
  let bucketCount = Math.floor((max - min) / bucketSize) + 1;

  // Initialize buckets with null/infinity
  let bucketMins = new Array(bucketCount).fill(Infinity);
  let bucketMaxs = new Array(bucketCount).fill(-Infinity);
  let bucketUsed = new Array(bucketCount).fill(false);

  // Distribute numbers into buckets
  for (let num of nums) {
    let idx = Math.floor((num - min) / bucketSize);
    bucketMins[idx] = Math.min(bucketMins[idx], num);
    bucketMaxs[idx] = Math.max(bucketMaxs[idx], num);
    bucketUsed[idx] = true;
  }

  // Iterate through buckets to find the max gap
  let maxGap = 0;
  let prevMax = min;

  for (let i = 0; i < bucketCount; i++) {
    // Skip empty buckets
    if (!bucketUsed[i]) continue;

    // Gap is between current bucket min and previous bucket max
    maxGap = Math.max(maxGap, bucketMins[i] - prevMax);
    prevMax = bucketMaxs[i];
  }

  return maxGap;
};

// Explanation
// Bucket Size Calculation: By setting the bucket size to $(max - min) / (n - 1)$, we guarantee that the maximum gap is at least this large. Since the maximum gap must be $\ge$ the average gap, we only need to compare the distance between buckets.Linear Time:Finding Min/Max takes $O(n)$.Filling buckets takes $O(n)$.Scanning buckets takes $O(n)$ (since there are at most $n$ buckets).Total: $O(n)$.Linear Space: We use three arrays of size $n$ to track the bucket properties, resulting in $O(n)$ space.

// Example Walkthrough [3, 6, 9, 1]
// min = 1, max = 9, n = 4.
// bucketSize = (9 - 1) / (4 - 1) = 2.66 -> 2.
// Buckets:
// Bucket 0 (Range 1-2): Contains [1]. min=1, max=1.
// Bucket 1 (Range 3-4): Contains [3]. min=3, max=3.
// Bucket 2 (Range 5-6): Contains [6]. min=6, max=6.Bucket 3 (Range 7-8): Empty.
// Bucket 4 (Range 9-10): Contains [9]. min=9, max=9.
// Gaps:
// 3 - 1 = 2
// 6 - 3 = 3
// 9 - 6 = 3
// maxGap = 3.
