---
title: "Python: Alphabet Game"
description: "This is a console based game I made to help children learn their alphabet and typing."
tags: python
date: 2020-12-04
---

## Everyone likes games

I saw a post a while ago with a similar project but with PowerShell. I wanted to try something new and decided to use Python and the text to speech option.

What we need to get this started is the random, string, os, and platform modules. Then created a few functions to get a random letter and a custom ```say``` command depending on the operating system a user is using.

## Random letter

```python
def get_letter(length):
    letters = string.ascii_uppercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
```

The string module allows us to quickly get all the ascii letters by choice. In this case I wanted the uppercase letters so I didnt have to ```string.upper()``` latter on. We utilize the ```random.choice()``` command to get our letter in the length we specify. For this application we only need 1, but still pass that in as a variable if we wanted to have the user input multiple letters instead.

## Getting the phrase

Windows and Linux both have a text to speech command. Here we will define our operating system and use the correct speech operator.

```python
def say(phrase):
    if platform.system() == "Windows":
        speaker = win32com.client.Dispatch("SAPI.SpVoice")
        speaker.Speak(phrase)
    if platform.system() == "Linux":
        os.system(f"spd-say --wait '{phrase}'")
```

For Windows we have to call the SAPI driver and then pass our phrase to the Speak command. In Linux most modern distributions have the command ```spd-say```. We have to pass the ```--wait``` command in to have the system say the whole phrase before continuing.

## Putting it together

To make it a constant loop we can have a while true loop. After that we need to generate our letter and our assignment and begin the game.

```python
while True:
    letter = get_letter(1)
    assignment = f"Press the letter {letter}: "

    # Speak assignment
    say(assignment)
    guess = str(input(assignment))
    if guess.isalpha():
        if guess.lower() == letter.lower():
            print(f"Great! You pressed the letter {letter}")
            say(f"Great! You pressed the letter {letter}")
        else:
            print(f"You pressed {guess}. You should have pressed {letter}")
            say(f"You pressed {guess}. You should have pressed {letter}")
    else:
        print("You did not choose a letter.")
        say("You did not choose a letter.")
```

This is a pretty simple solution that will take the letter and assignement then speak and print to the console. A input field is then asking for the letter. If the guess is an alpha character then we check if its the same as the generated. Simple checks let the user know if its the same letter or the letter the pressed and what they should have pressed. If a non alpha character is pressed like a number or special character we let them know as well.

Happy playing!

[Full source on GitHub](https://github.com/cjerrington/UsefulScripts/blob/master/Python/alphagame.py)
