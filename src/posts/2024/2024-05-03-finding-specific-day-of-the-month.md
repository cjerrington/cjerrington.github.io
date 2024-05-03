---
title: Finding the specific day of the month with PowerShell
description: Advanced usage of PowerShell's Get-Date function for finding dates
date: 2024-05-03 
tags:
  - powershell
  - coding
---

Finding the specific day of the month with powershell could be a pretty common thing. Finding the first, second, third, or last weekday of the month is simpler than we might think.

For a recent process I was needing to run a process on the 10th of the month but if it was a weekend, send it the Friday before. 

## Getting started

As I started the coding process I thought, this would just make more sense if I ran this on the first Friday of the month. I was going to use Windows Task Scheduler to run the final process every day and had the script to the deciding of the right day. Task Scheduler failed to provide such scheduled timing. 

Trying a few things first, I then found a few approaches that worked, but were complicated in achieving the final result. 

```powershell

function Get-LastFridayOfMonth([DateTime] $d) {
    $lastDay = new-object DateTime($d.Year, $d.Month, [DateTime]::DaysInMonth($d.Year, $d.Month))
    $diff = ([int] [DayOfWeek]::Friday) - ([int]
    $lastDay.DayOfWeek)
    if ($diff -ge 0) {
        return $lastDay.AddDays(- (7-$diff))
    }
    else
    {
        return $lastDay.AddDays($diff)
    }
}
```

While this might work, there’s a lot of math involved. After creating a `DateTime` object, you find the number of days in the month, and do a lot of math. The other issue I had, I was wanting to find the first Friday, or second Tuseday, etc. 

## Getting closer

Later on I found a simpler solution. Each month has max of 31 days. So loop over each day, have `Get-Date` add 1 day, then select the object where the day is the one I’m looking for. 

```powershell
(0..31 | %{([datetime](Get-Date)).AddDays($_)}|?{$_.DayOfWeek -eq 'Friday'})

Friday, May 3, 2024 1:09:03 PM
Friday, May 10, 2024 1:09:03 PM
Friday, May 17, 2024 1:09:03 PM
Friday, May 24, 2024 1:09:03 PM
Friday, May 31, 2024 1:09:03 PM

```

Since this returns and array, we can select the index we want. We pass along `0..31` and for each number we add that number to the `Get-Date` of today. Next we can select the day of the week we'd like, Friday, in this case. 

If we'd like the first Friday we can simply choose the `[0]` index or use `Select-Object` to get the first or last elements. 


```powershell
(0..31 | %{([datetime](Get-Date)).AddDays($_)}|?{$_.DayOfWeek -eq 'Friday'}) | Select-Object -First 1

Friday, May 3, 2024 1:09:03 PM

(0..31 | %{([datetime](Get-Date)).AddDays($_)}|?{$_.DayOfWeek -eq 'Friday'}) | Select-Object -Last 1

Friday, May 31, 2024 1:09:03 PM

```

If we would like the third Friday we can get that as well! 

```powershell
(0..31 | %{([datetime](Get-Date)).AddDays($_)}|?{$_.DayOfWeek -eq 'Friday'})[2]

Friday, May 17, 2024 1:09:03 PM

```

## Future plans

The process so far looks at the current month and the specific days. If we'd like to look at a future month, we can do that as well. PowerShell lets us pass a month to the `Get-Date` function and get the date accordingly. 

```powershell 
Get-Date -Month 08 -Day 1

Thursday, August 1, 2024 1:09:03 PM

```

Now to apply this we can make a few adjustments along the way. We need to update the `Get-Date` to pass the month and day, this is also setting the starting point for our monthly date lookup. 

```powershell
(0..31 | %{([datetime](Get-Date -Month 08 -Day 1)).AddDays($_)}|?{$_.DayOfWeek -eq 'Friday'})

Friday, August 2, 2024 1:09:03 PM
Friday, August 9, 2024 1:09:03 PM
Friday, August 16, 2024 1:09:03 PM
Friday, August 23, 2024 1:09:03 PM
Friday, August 30, 2024 1:09:03 PM

```

### Wrap-up

After going through this date finding excursion, I learned some new neat tricks you can do with `Get-Date` and manipulating the object data for what I need.

Another awesome module I came across was the [PSCalendar](https://github.com/jdhitsolutions/PSCalendar) and the `Show-Calendar` function. 


```text

                 May 2024

 Sun   Mon   Tue   Wed   Thu   Fri   Sat
                     1     2     3     4
   5     6     7     8     9    10    11
  12    13    14    15    16    17    18
  19    20    21    22    23    24    25
  26    27    28    29    30    31      

```