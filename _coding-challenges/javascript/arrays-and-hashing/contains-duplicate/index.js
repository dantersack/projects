// https://leetcode.com/problems/contains-duplicate/
/**
 * @param {nums[]} nums
 * @returns {boolean}
 */
function containsDuplicate(nums) {
  const hashObj = {};
  for (let i = 0; i < nums.length; i++) {
    if (hashObj[nums[i]]) return true;
    hashObj[nums[i]] = 1;
  }
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1]));

module.exports = { containsDuplicate };
