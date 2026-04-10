// Langkah :

// 1. Duplikasi: Salin array heights ke array baru (agar data asli tidak hilang).

// 2. Urutkan: Gunakan algoritma Bubble Sort pada salinan tersebut untuk mendapatkan array expected.

// 3. Bandingkan: Hitung berapa banyak posisi yang berbeda antara heights dan expected.

/**
 * @param {number[]} heights
 * @return {number}
 */
function heightChecker(heights) {
  // 1. Buat salinan dari array asli
  // Kita butuh 'expected' untuk dibandingkan dengan 'heights'
  let expected = [...heights];

  // 2. Lakukan Bubble Sort pada array 'expected'
  let n = expected.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Jika elemen kiri lebih besar dari kanan, tukar posisi
      if (expected[j] > expected[j + 1]) {
        let temp = expected[j];
        expected[j] = expected[j + 1];
        expected[j + 1] = temp;
      }
    }
  }

  // 3. Bandingkan array asli dengan yang sudah terurut
  let count = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expected[i]) {
      count++;
    }
  }

  return count;
}

// Contoh Penggunaan:
const heights = [1, 1, 4, 2, 1, 3];
console.log(heightChecker(heights)); // Output: 3
