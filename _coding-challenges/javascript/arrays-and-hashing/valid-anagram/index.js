// https://leetcode.com/problems/valid-anagram/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function validAnagram(s, t) {
  if (s.length !== t.length) return false;

  const hashObj = {};

  for (let i = 0; i < s.length; i++) {
    const value = s[i];
    if (hashObj[value]) hashObj[value]++;
    else hashObj[value] = 1;
  }

  for (let i = 0; i < t.length; i++) {
    const value = t[i];
    if (!hashObj[value]) return false;
    hashObj[value]--;
    if (hashObj[value] < 0) return false;
  }

  return true;
}

module.exports = { validAnagram };
