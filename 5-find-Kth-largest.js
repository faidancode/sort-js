/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // We only need to keep k elements in our "heap"
  let heap = [];

  for (let num of nums) {
    // 1. Push the new number into our min-heap
    heap.push(num);
    siftUp(heap, heap.length - 1);

    // 2. If we have more than k elements, remove the smallest (the root)
    if (heap.length > k) {
      // Swap root with last element and pop
      heap[0] = heap.pop();
      // Restore Min-Heap property
      siftDown(heap, heap.length, 0);
    }
  }

  // The root of a min-heap of size k is the kth largest element
  return heap[0];
};

// Standard Sift Down for a MIN-heap
function siftDown(arr, size, i) {
  let smallest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && arr[left] < arr[smallest]) smallest = left;
  if (right < size && arr[right] < arr[smallest]) smallest = right;

  if (smallest !== i) {
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    siftDown(arr, size, smallest);
  }
}

// Sift Up to maintain Min-Heap property after insertion
function siftUp(arr, i) {
  let parent = Math.floor((i - 1) / 2);
  if (parent >= 0 && arr[i] < arr[parent]) {
    [arr[i], arr[parent]] = [arr[parent], arr[i]];
    siftUp(arr, parent);
  }
}
