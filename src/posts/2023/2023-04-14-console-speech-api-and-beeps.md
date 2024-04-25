---
title: Console Speech API and Beeps
description: How to make your computer talk with you using the .NET Speech assembly.
tags: 
  - powershell
  - 100DaysToOffload
---

I remember when Windows 95 had the command prompt text to speech and would sit and have Microsoft Sam talk and tell jokes. Text to speech is not a new thing and actually quite common and useful. It can help with the visual impaired, part of a script used for directions, and just for fun!

## Getting started

First we need to have our console ready for the speech by adding in the `System.Speech` type assembly. This will utilize the `SpeechSynthesizer` object to be able to use the built in voices that we’re looking for to use Powershell voice.

{% highlight "powershell" %}
Add-Type -AssemblyName System.Speech
$Speech = New-Object System.Speech.Synthesis.SpeechSynthesizer
{% endhighlight %}

Now we have our assembly in our `$Speech` variable and can access the other items in the assembly class.

## How to use Text to Speech

Go ahead and test the speech process:

{% highlight "powershell" %}
$Speech.Speak("Hello, World!")
{% endhighlight %}

So what all do we hae available to us? Let's see with the `Get-Member` command.

{% highlight "powershell" %}
$Speech | Get-Member

   TypeName: System.Speech.Synthesis.SpeechSynthesizer

Name                          MemberType Definition
----                          ---------- ----------
BookmarkReached               Event      System.EventHandler`1[System.Speech.Synthesis.BookmarkReachedEventArgs] BookmarkReached(System.Object, System.Speech.Synthesis.BookmarkReachedEventArgs)
PhonemeReached                Event      System.EventHandler`1[System.Speech.Synthesis.PhonemeReachedEventArgs] PhonemeReached(System.Object, System.Speech.Synthesis.PhonemeReachedEventArgs)
SpeakCompleted                Event      System.EventHandler`1[System.Speech.Synthesis.SpeakCompletedEventArgs] SpeakCompleted(System.Object, System.Speech.Synthesis.SpeakCompletedEventArgs)
SpeakProgress                 Event      System.EventHandler`1[System.Speech.Synthesis.SpeakProgressEventArgs] SpeakProgress(System.Object, System.Speech.Synthesis.SpeakProgressEventArgs)
SpeakStarted                  Event      System.EventHandler`1[System.Speech.Synthesis.SpeakStartedEventArgs] SpeakStarted(System.Object, System.Speech.Synthesis.SpeakStartedEventArgs)
StateChanged                  Event      System.EventHandler`1[System.Speech.Synthesis.StateChangedEventArgs] StateChanged(System.Object, System.Speech.Synthesis.StateChangedEventArgs)
VisemeReached                 Event      System.EventHandler`1[System.Speech.Synthesis.VisemeReachedEventArgs] VisemeReached(System.Object, System.Speech.Synthesis.VisemeReachedEventArgs)
VoiceChange                   Event      System.EventHandler`1[System.Speech.Synthesis.VoiceChangeEventArgs] VoiceChange(System.Object, System.Speech.Synthesis.VoiceChangeEventArgs)
AddLexicon                    Method     void AddLexicon(uri uri, string mediaType)
Dispose                       Method     void Dispose(), void IDisposable.Dispose()
Equals                        Method     bool Equals(System.Object obj)
GetCurrentlySpokenPrompt      Method     System.Speech.Synthesis.Prompt GetCurrentlySpokenPrompt()
GetHashCode                   Method     int GetHashCode()
GetInstalledVoices            Method     System.Collections.ObjectModel.ReadOnlyCollection[System.Speech.Synthesis.InstalledVoice] GetInstalledVoices(), System.Collections.ObjectModel.ReadOnlyCollection[System.Speech.Synthesis.InstalledVoice] GetInstalledVoices(cultuΓÇª
GetType                       Method     type GetType()
Pause                         Method     void Pause()
RemoveLexicon                 Method     void RemoveLexicon(uri uri)
Resume                        Method     void Resume()
SelectVoice                   Method     void SelectVoice(string name)
SelectVoiceByHints            Method     void SelectVoiceByHints(System.Speech.Synthesis.VoiceGender gender), void SelectVoiceByHints(System.Speech.Synthesis.VoiceGender gender, System.Speech.Synthesis.VoiceAge age), void SelectVoiceByHints(System.Speech.Synthesis.VoΓÇª
SetOutputToAudioStream        Method     void SetOutputToAudioStream(System.IO.Stream audioDestination, System.Speech.AudioFormat.SpeechAudioFormatInfo formatInfo)
SetOutputToDefaultAudioDevice Method     void SetOutputToDefaultAudioDevice()
SetOutputToNull               Method     void SetOutputToNull()
SetOutputToWaveFile           Method     void SetOutputToWaveFile(string path), void SetOutputToWaveFile(string path, System.Speech.AudioFormat.SpeechAudioFormatInfo formatInfo)
SetOutputToWaveStream         Method     void SetOutputToWaveStream(System.IO.Stream audioDestination)
Speak                         Method     void Speak(string textToSpeak), void Speak(System.Speech.Synthesis.Prompt prompt), void Speak(System.Speech.Synthesis.PromptBuilder promptBuilder)
SpeakAsync                    Method     System.Speech.Synthesis.Prompt SpeakAsync(string textToSpeak), void SpeakAsync(System.Speech.Synthesis.Prompt prompt), System.Speech.Synthesis.Prompt SpeakAsync(System.Speech.Synthesis.PromptBuilder promptBuilder)
SpeakAsyncCancel              Method     void SpeakAsyncCancel(System.Speech.Synthesis.Prompt prompt)
SpeakAsyncCancelAll           Method     void SpeakAsyncCancelAll()
SpeakSsml                     Method     void SpeakSsml(string textToSpeak)
SpeakSsmlAsync                Method     System.Speech.Synthesis.Prompt SpeakSsmlAsync(string textToSpeak)
ToString                      Method     string ToString()
Rate                          Property   int Rate {get;set;}
State                         Property   System.Speech.Synthesis.SynthesizerState State {get;}
Voice                         Property   System.Speech.Synthesis.VoiceInfo Voice {get;}
Volume                        Property   int Volume {get;set;}
{% endhighlight %}

We can see we have a lot to work with now. One neat thing is you can see what installed voices you have:

{% highlight "powershell" %}
$Speech.GetInstalledVoices() | select -ExpandProperty VoiceInfo | select Name, Gender, Description

Name                    Gender Description
----                    ------ -----------
Microsoft David Desktop   Male Microsoft David Desktop - English (United States)
Microsoft Zira Desktop  Female Microsoft Zira Desktop - English (United States)

{% endhighlight %}

By default Microsoft has the Male voice but you can change that to the female voice too.

{% highlight "powershell" %}
$Speech.SelectVoice("Microsoft Zira Desktop")
$Speech.Speak("Hello, World!")  
{% endhighlight %}

## Using it all together now

Now we just need a message and then we can talk about it!

{% highlight "powershell" %}
$Message = "I learned how to use PowerShell to have the console speak to me today"
$Speech.Speak($Message)  
{% endhighlight %}

## You said BEEP?!

You know that beep the bios makes when booting, or used to depending on your motherboard and boot post settings? You can make that same noise happen from your console as well. This style of noise might also be beneficial if you'd like to alert your user of an error for instance.

{% highlight "powershell" %}
[console]::beep(500,300)
{% endhighlight %}

To adjust the tone and duration, the first number is the tone and second is the length of the beep. Try to keep the values for the tone between 190 and 8500, anything outside of these numbers can't be heard. The lower thr number the lower the tone, the higher the number the higher the tone.

## Conclusion

How will you use the Text to Speech API - make a timer and announce the time, tell a joke, help walk a user through a process?

Here's a fun way to use the console beeps - to play the [Mario Theme Song](https://gist.github.com/davewilson/5612674).
