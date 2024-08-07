---
title: Conditioning the Shell
description: 'Quick glance at how to properly use conditional statements in shell scripting.'
date: 2024-06-25 16:34:40
tags:
  - shell
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

Writing conditions in a bash or shell script is an inevitable part of writing a small script, program, and part of daily life. Bash makes scripting easy for your daily Linux usage, and your newly created shell script comes with all the benefits of the terminal commands in your scripts.

Bash supports if/else statements and the simple logical reasoning in your scripts. A generic syntax for a simple process would be:

```shell
if [ expression ]; then
    ## Do something
elif [ expression ]; then 
    ## Do soemthing else
else
    ## finally, if nothing else is true, do this
fi
```

The first thing we see is the `elif` is used for the "else if" and the condition will always end with `fi`.

## Conditions

Like most scripts we have the same conditional statements for numeric comparisons.

| Condition | Meaning |
| --------- | ------- |
| -lt | Less than |
| -gt | Greater than |
| -le | Less than or equal |
| -ge | Greater than or equal |
| -eq | Equal |
| -ne | Not equal |

When comparing strings, these are the test conditions.

| Condition | Meaning |
| --------- | ------- |
| =   | Strings are equal |
| ==  | Strings are equal |
| !=  | Strings are different |
| -z | The variable is empty |

Bash even makes it simple to check the file types. Here a few basic FILE operators.

| Condition | Meaning |
| --------- | ------- |
| -f  | object is a file |
| -d  | object is a directory |
| -L  | object is a file and is a symbolic link |

A simple way to see this in practice is:

```shell
if [ 3 -lt 5 ]; then
    echo "the number is less!"
fi

if [ "test" -eq "test" ]; then
    echo "The words are the same"
fi
```

## Logical operators

No script is complete without comparing items and also with multiple conditions. We can have multiple conditions in our test expression and make use of the logical operators like AND (`&&`) and OR (`||`).

Let's say we want to check if two files exist we can add the AND operator. If both items exists, we'll echo a true statement.

```shell
if [[ -f ~/.profile && ~/.bash_aliases ]]; then 
    echo "Both files exist."
fi
```

Did you notice the double `[[ ]]`? When using multiple logical operators you need to put the test expression in double brackets. This evaluates both statements then do the action if both are true.

## Shortcuts

The conditions explained so far are great for a full script, but you can use some shortcut methods. These work because after every execution you are given an exit code of the at process. If the process ran successfully you should have an exit code of 0. When the process does not exit in a success, you usually receive a positive number. These numbers could relate to system values for multiple events, or the process could have their own.

For a quick `if / else` statement you can make use of the AND (`&&`), OR (`||`), and continue `;` statements.

Using the file comparison from earlier, the following is equivalent.

```shell
[[ -f /etc/resolv.conf && -f /etc/hosts ]] && echo "Both files exist."
```

Since we are asking if the file `/etc/resolv.conf` and the file `/etc/hosts` exists, and they do, we get an exit code of 0. The `&&` is then processed to run the next statement which is to echo to the terminal the files exist.

If the statement in the `[[ ]]` is successive in the test expression, the following commands will run.

Similarly, the `||` would allow the successive command to execute if the preceding test expression fails.

Other quick uses could be creating folders and the change directories to the new folder.

```shell
mddir test && cd test
```

This could also be used with a `git clone` then you can quicker get into the folder to do the initial install and setup needed.

```shell
git clone https://git.url/repo && cd repo
```

One of my favorites was when I need to update my system. Typically you have the `apt update` then you `apt upgrade`. Well we can put those together.

```shell
apt update && apt upgrade
```

Of course you most likely need to run as your elevated user process, but we are combining the two commands in one. This is also helpful if and when your update fails due to privileges, internet connection, or a bad typo, we don't need to worry about stopping the upgrade.

Now, if you are a great typist, or just need to run two commands regardless of the outcome, you can use the shell command separator, `;`. The semicolon (`;`) allows you to put more than one command on one line, and this will not look at the previous exit codes like the `&&` or `||` will.

```shell
apt update ; apt upgrade
```

This quick trick for this process saves one character in the command line, and I'm pretty sure I can always spell `update` and `upgrade` correctly each time. However, if you need to elevate the command, you may need to run it for both commands. If the first `sudo` attempt succeeds, the elevation continues to the next statement, but if that statement needs elevation to run, you need to specify as so. Your successful elevation will remain in the terminal session for the same desired time.

## Conclusion

These methods of test expressions and conditions are nice for your script process, having things the "long" way. It ensures you and others, if the script is shared, that you both can follow along and keep up with what is going on in the logic.

Shortcuts are great, but sometimes [knowing the long way](/blog/knowing-the-long-way/) ensures that you can follow along later, an diagnose when things don't work.

As always there is more to learn for [Bash conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).
