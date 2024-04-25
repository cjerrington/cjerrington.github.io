---
title: Console Speech API, Part 2
description: Continuation of the Console Speech with a simple game.
tags: 
  - powershell
  - 100DaysToOffload
---

In my last post, [Console Speech API and Beeps](https://claytonerrington.com/blog/console-speech-api-and-beeps/), I talked about the text to speech .NET assembly and how to get your computer to talk to you. After some searching I remembered I wrote a game in PowerShell similar to my [Python](https://claytonerrington.com/blog/python-alphbet-game/) based game. This was a simple way to help teach children letters and the keyboard.

{% highlight "powershell" %}
Add-Type -AssemblyName System.Speech
$Speech = New-Object System.Speech.Synthesis.SpeechSynthesizer
$Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.ToCharArray() -as [string[]]

while($true) {
    $Letter = $Alphabet[(Get-Random -Minimum 0 -Maximum $Alphabet.Count)]
    $Assignment = "Press the letter, $Letter"
    $Speech.Speak($Assignment)
    $Answer = Read-Host -Prompt $Assignment
    if ($Answer.Length -gt 0) {
        if ($Letter -eq $Answer) {
            $Speech.Speak("Correct! You pressed the letter, $Answer.")
        } elseif ($Answer -in $Alphabet) {
            $Speech.Speak("Incorrect. You should have pressed, $Letter, but you pressed, $Answer.")
        } else {
            $Speech.Speak("That was not a letter.")
        }
    } else {
        $Speech.Speak("You did not press anything.")
    }
}
{% endhighlight %}

Check out the source in my [PowerShell Snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/powershell/alphabet.ps1).