const { describe, it } = require("node:test");
const assert = require("node:assert");

const { twoSum } = require("./index.js");

const testCases = [
  {
    nums: [2, 7, 11, 15],
    target: 9,
    outputs: [
      [0, 1],
      [1, 0],
    ],
  },
  {
    nums: [3, 2, 4],
    target: 6,
    outputs: [
      [1, 2],
      [2, 1],
    ],
  },
  {
    nums: [3, 3],
    target: 6,
    outputs: [
      [0, 1],
      [1, 0],
    ],
  },
  {
    nums: [0, 4, 3, 0],
    target: 0,
    outputs: [
      [0, 3],
      [3, 0],
    ],
  },
];

describe("https://leetcode.com/problems/two-sum/", () => {
  for (let i = 0; i < testCases.length; i++) {
    it(`should pass test case #${i + 1}`, () => {
      const { nums, target, outputs } = testCases[i];
      const output = twoSum(nums, target);

      let firstAssertionPassed = false;
      let secondAssertionPassed = false;

      try {
        assert.deepStrictEqual(output, outputs[0]);
        firstAssertionPassed = true;
      } catch (error) {}

      try {
        assert.deepStrictEqual(output, outputs[1]);
        secondAssertionPassed = true;
      } catch (error) {}

      assert(firstAssertionPassed || secondAssertionPassed);
    });
  }
});
