// The Strategy
// Pre-calculation: Since Radix Sort works digit-by-digit from right to left (Least Significant Digit), the state of the array after $x$ iterations is exactly the sorted order for strings trimmed to $x$ digits.
// Stability: We must use a stable sorting algorithm (like Counting Sort) for each digit. This ensures that if two trimmed strings are identical, their original relative order (the lower index) is preserved.
// Storage: Instead of sorting the actual strings, we sort an array of indices [0, 1, 2, ...] based on the characters in the strings.

/**
 * @param {string[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var smallestTrimmedNumbers = function (nums, queries) {
  const n = nums.length;
  const strLen = nums[0].length;
  const maxTrim = Math.max(...queries.map((q) => q[1]));

  // table[trimLen] will store the sorted indices of nums after trimming to trimLen
  const table = new Map();

  // We start with indices in their original order to maintain stability
  let indices = Array.from({ length: n }, (_, i) => i);

  // Radix Sort: Sort digit by digit from right to left
  for (let step = 1; step <= strLen; step++) {
    const charIdx = strLen - step; // Current digit position from the right

    // Stable Counting Sort for the current digit
    const buckets = Array.from({ length: 10 }, () => []);
    for (const idx of indices) {
      const digit = nums[idx][charIdx];
      buckets[digit].push(idx);
    }

    // Flatten buckets back into indices array
    indices = [].concat(...buckets);

    // Store the result of this trimming length
    table.set(step, [...indices]);
  }

  // Answer each query using our pre-calculated table
  return queries.map(([k, trim]) => {
    const sortedIndices = table.get(trim);
    return sortedIndices[k - 1];
  });
};

// Logic & Explanation

// 1. Why Radix Sort?: Radix Sort is perfect for sorting strings of digits. By processing from the last character to the first, each step $i$ represents the sorted order for the rightmost $i$ digits.
// 2. Stability is Key: The problem states: "If two trimmed numbers are equal, the number with the lower index is smaller." Because Counting Sort (our bucket step) is stable, it naturally respects the original index order when the digits at the current position are the same.
// 3. The Table Approach: Instead of re-sorting for every single query, we run the Radix Sort once up to the maximum required trim length. We save the state of the indices array at every step.
