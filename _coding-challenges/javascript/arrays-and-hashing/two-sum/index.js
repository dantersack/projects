// https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
function twoSum(nums, target) {
  const hashObj = {};
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const diff = target - current;
    if (hashObj[diff] !== undefined) {
      return [hashObj[diff], i];
    }
    hashObj[current] = i;
  }
}

module.exports = { twoSum };
