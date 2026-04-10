// The Strategy
// 1. Dummy Header: We create a dummy node to serve as the start of our new sorted list. This makes it easier to insert nodes at the very beginning.

// 2. Current Node: We iterate through the original list one node at a time.

// 3. Find the Spot: For each node, we start from the dummy and traverse the sorted list until we find the correct position where the node's value fits.

// 4. Re-link: We insert the node and move to the next element in the original list.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  if (!head || !head.next) return head;

  // Dummy node acts as the predecessor of the sorted list
  let dummy = new ListNode(0);
  let curr = head;

  while (curr !== null) {
    // At each iteration, we save the next node to process
    let nextNode = curr.next;

    // Find the right place to insert 'curr' in the sorted list
    // We always start searching from the dummy node
    let prev = dummy;
    while (prev.next !== null && prev.next.val < curr.val) {
      prev = prev.next;
    }

    // Insert 'curr' between 'prev' and 'prev.next'
    curr.next = prev.next;
    prev.next = curr;

    // Move to the next node in the original unsorted list
    curr = nextNode;
  }

  return dummy.next;
};
