/**
 * Sorts the array in-place using the Dutch National Flag algorithm.
 * @param {number[]} nums - Array of integers (0, 1, or 2).
 */
function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      // Found a Red (0): Swap it to the 'low' boundary
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      // Found a White (1): It's already in the correct middle area
      mid++;
    } else {
      // Found a Blue (2): Swap it to the 'high' boundary
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      // We don't increment mid here because the new nums[mid]
      // (swapped from high) hasn't been inspected yet.
      high--;
    }
  }
}
