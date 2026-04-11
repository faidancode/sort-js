/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  let n = nums.length;

  // 1. Membangun Max Heap (Rearrange array)
  // Mulai dari parent terakhir hingga ke root
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(nums, n, i);
  }

  // 2. Satu per satu ekstrak elemen dari heap
  for (let i = n - 1; i > 0; i--) {
    // Pindahkan root saat ini (terbesar) ke akhir array
    [nums[0], nums[i]] = [nums[i], nums[0]];

    // Panggil heapify pada heap yang dikurangi ukurannya
    // Ukurannya sekarang adalah 'i', bukan 'n'
    heapify(nums, i, 0);
  }

  return nums;
};

/**
 * Fungsi untuk memastikan properti Max Heap tetap terjaga
 * @param {number[]} arr - Array
 * @param {number} n - Ukuran heap yang sedang diproses
 * @param {number} i - Indeks node yang akan di-heapify
 */
function heapify(arr, n, i) {
  let largest = i; // Inisialisasi root sebagai yang terbesar
  let left = 2 * i + 1; // Kiri = 2*i + 1
  let right = 2 * i + 2; // Kanan = 2*i + 2

  // Jika anak kiri lebih besar dari root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // Jika anak kanan lebih besar dari yang terbesar sejauh ini
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // Jika yang terbesar bukan root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Secara rekursif heapify sub-tree yang terdampak
    heapify(arr, n, largest);
  }
}
