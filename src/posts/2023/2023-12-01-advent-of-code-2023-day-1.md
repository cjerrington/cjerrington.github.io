---
title: Advent of Code - Day 1
description: This year I stumbled upon this month long challenge of coding. Here is what I have been able to do.
draft: false
date: 2023-12-01T06:00:00.000Z
tags:
  - 100DaysToOffload
  - powershell
  - coding
  - AdventOfCode
---

I found the [Advent of Code](https://adventofcode.com/) this year and decided to try to take part in it. I went back through some of the tasks from last year to see what I might be expecting. So far it is fun to think outside the box and come up with a solution to solve the problem.

## Part 1

For the first task, we were given a file with some text and numbers on the lines. We were asked to select the first and last digits in the lines, then add them all together. This was fairly simple I thought at first.

```text
For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
```

I choose to start this in PowerShell. It is what I usually start things with and since it was a basic input a file, select digits, and addition, why not?

```powershell
$inputfile = get-content day1.txt

$digits = $inputfile -replace '[a-zA-Z]',''

$sum = 0 
$digits | ForEach-Object {
        $line = $_
        $first = $line.ToCharArray() | Select-Object -first 1
        $last = $line.ToCharArray() | Select-Object -last 1
        $number = "$($first)$($last)"
        $sum += [int]$number
}

Write-Host "Part one total: $sum"
```

I found my regex was not as good as it should be to select only digits. So I decided to do a replace of alpha characters with blanks. This worked and for each line, I split the numbers to an array so I could select the first and last digits. Some lines had 3,4,5 digits. After re-reading the instructions and example, this was a neat way to get the numbers. What threw me off even still is some lines only had one number... so this line, `9zml`, the number 9 counted as 99. I found this from the example in the last line with the 7.

Since this was a string, to add numbers, I had to type cast this to be an `[int]`.

## Now to Part 2

The notes said the number was right, but we saw that the text had the words spelled out.

```text
9sixsevenz3
seven1cvdvnhpgthfhfljmnq
6tvxlgrsevenjvbxbfqrsk4seven
9zml
52sevenone
41onevfsgvssxnpsix38four
```

This time I was thinking of using `Select-String` for the regex abilities and it worked mostly... Still didn't get the right answer.

```powershell
$sum2 = 0
foreach ($line in $inputfile){
    $digits2 = $line | Select-String '(?=(\d|one|two|three|four|five|six|seven|eight|nine))' -AllMatches | ForEach-Object { $_.Matches } | % { $_.Value }

    $first = $digits2 | Select-Object -first 1
    $last = $digits2 | Select-Object -last 1

    $first = convertToInteger($first)
    $last = convertToInteger($last)

    
    $completeDigit = "$($first)$($last)"
    Write-Host "$line $completeDigit"
    pause
    $sum2 += [int]$completeDigit
}

Write-Host "Part two total: $sum2"
```

I did have a little quirkiness with PowerShell on this one. The regex I did borrow from [Robb Knight](https://rknight.me/advent-of-code-2023-day-one/), thanks! But the regex just didn't work right in PowerShell. The idea is there, and I got the right numbers, somewhere in the 1000 line input file something didn't get regex'd right.

However, I was still impressed with myself to select digits and the words of the numbers. I did do a join on the `$digits2` and did see the right export of the string and it did export from the following example right.

```text
41onevfsgvssxnpsix38four

4,1,one,six,3,8,four
```

Since the `Select-String` is an array, we can get the first and last elements easily. Now the fun, convert words to integers; I built a matrix function for that.

```powershell
function convertToInteger($word){
    if (-not $word -is [ValueType]){
        switch($word){
            'one'   { return 1 } 
            'two'   { return 2 } 
            'three' { return 3 } 
            'four'  { return 4 } 
            'five'  { return 5 } 
            'six'   { return 6 } 
            'seven' { return 7 } 
            'eight' { return 8 } 
            'nine'  { return 9 } 
            default { return $word }
        }
    }
}
```

This will take each item and convert the word to the right number. Next used the similar concept to build our `$completeDigit` and complete the sum. Something in my regex and selecting of the right first/last number combo didn't get the right numbers to complete the task right.

## Overall

It was a fun process to run through. I'll see what tomorrow brings and how far I get into the process. This one took me a little longer than I wanted and almost gave up, but thought I should at least get the first parts.
