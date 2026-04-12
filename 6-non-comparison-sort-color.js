/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    // 1. Initialize a frequency array for colors 0, 1, and 2.
    // We use a fixed size of 3 because we know the inputs are only 0, 1, and 2.
    let counts = [0, 0, 0];

    // 2. First Pass: Count how many times each color appears.
    for (let i = 0; i < nums.length; i++) {
        let colorValue = nums[i];
        counts[colorValue]++;
    }

    // 3. Second Pass: Overwrite the original 'nums' array.
    // 'writePointer' tracks which index in 'nums' we are currently updating.
    let writePointer = 0;

    // Loop through our frequency array (0 to 2)
    for (let color = 0; color < 3; color++) {
        // For the current color, write it into 'nums' as many times as we counted it.
        for (let j = 0; j < counts[color]; j++) {
            nums[writePointer] = color;
            writePointer++;
        }
    }
};


// Logic Breakdown

// Why it's "Non-Comparison": Unlike Bubble Sort or Heap Sort, this code never asks, "Is the number at index 0 bigger than the number at index 1?" Instead, it simply tallies the data and rebuilds the line based on the tally.

// The Write Pointer: The variable writePointer is crucial. It ensures that after we finish writing all the 0s, we start writing the 1s exactly where the 0s left off.

// Stability & Range: This works perfectly here because the "range" (0-2) is tiny. If the numbers ranged from 0 to 1,000,000, a standard Counting Sort would be inefficient because the counts array would be massive.