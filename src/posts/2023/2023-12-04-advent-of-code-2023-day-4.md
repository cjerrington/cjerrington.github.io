---
title: Advent of Code - Day 4
description: My attempt at day 4 of the Advent of Code challenge
draft: false
date: 2023-12-04T06:00:00.000Z
tags:
  - coding
  - 100DaysToOffload
  - python
  - AdventOfCode
---

I have taken a look at the past few days of tasks and either was not sure how or where to begin, or just didn't have time. For this task, I had an idea and process in mind on how to get this working.

## The setup and part 1

We have the following example of data to start with, a card with its winning numbers and my played numbers.

```
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
```

We had to find the number of matches in my played numbers are winning numbers.

My first take was to separate the segments, and do a simple if the winning number is in my string of played numbers. This quickly didn't work since 1 is a winning number but is found in 21, 14, 1 and this 3 wins instead of 1 in the example with card 3.

Next went back to regex and got all the digits, and ended up putting each match in a list. I was looking for that cross-examination of the lists, and Python's list intersection did the trick. The part that held me up the most was the final math, but finally understood what was needed.

### Solution

```python
import re

file="./inputs/day4.txt"
result = 0

with open(file, 'r') as f:
  for line in f:
    card, data = line.split(": ")
    winning_nums, my_nums = data.split("|")
    winning_digits = re.finditer(r'\d+', winning_nums)
    my_winning_nums = re.finditer(r'\d+', my_nums)

    winning_list = []
    my_nums_list = []

    for num in winning_digits:
      winning_list.append(num[0])

    for num in my_winning_nums:
      my_nums_list.append(num[0])

    winners = len(set(winning_list).intersection(my_nums_list))
    if winners > 0:
      result += 2 ** (winners - 1)

print(result)
```

## Part 2

It took me awhile on the first part, and understanding of what was needed in part 2, that I'll stick with just the one star for the day and if I have time go back to part 2. 

Still fun to try what you can and tag along in a coding challenge. 
