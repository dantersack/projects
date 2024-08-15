// https://leetcode.com/problems/longest-consecutive-sequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutiveSequence(nums) {
  const set = new Set(nums);
  const sortedNums = Array.from(set).sort((a, b) => a - b);
  let longestLength = 0;
  let prev = undefined;
  let prevLength = 0;
  for (let i = 0; i < sortedNums.length; i++) {
    const curr = sortedNums[i];
    if (prev === undefined || curr - prev !== 1) {
      prev = curr;
      prevLength = 1;
    } else {
      prevLength++;
      prev = curr;
    }
    if (prevLength > longestLength) longestLength = prevLength;
  }
  return longestLength;
}
