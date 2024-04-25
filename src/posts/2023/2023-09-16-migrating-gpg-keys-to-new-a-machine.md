---
_schema: default
title: Migrating GPG keys to a new machine
description: How to migrate your GPG keys to a new machine
tags: 
    - 100DaysToOffload
    - shell
draft: false
---

Along with setting up the software on my reinstalled laptop, I had to migrate my [GPG](https://gnupg.org/) keys.

Sure, I could get my GPG public key from [Keyoxide](https://keyoxide.org/22A87774A7342FE3DF25E15D08528E69B3B9CA3E) which verifies the key found on [keys.openpgp.org](https://keys.openpgp.org/search?q=me%40claytonerrington.com), but that is still the public key. I'll need to export my public and private keys and reimport them on the new machine. Since I'm doing a reinstall I can't SSH my keys to the new machine.

First we need to list our keys.

{% highlight "shell" %}
$ gpg --list-secret-keys --keyid-format LONG

--------------------------------
sec   ed25519/[your key]  2023-01-10 [SC]
      ABCDEFGHIJKLMNOPQRSTUVWXYZ
uid                 [ultimate] Clayton Errington <me@claytonerrington.com>
ssb   cv25519/ABCDEFGHIJKL 2023-01-10 [E]
{% endhighlight %}

The key identifier we will need is after the key size `ed25519`.

Now that we know the key ID, we can export the public key.

{% highlight "shell" %}
$ gpg --export -a [your key] > gpg-pub.asc
{% endhighlight %}

Next we can export the secret keys that include your sub keys for signing and encryption. That way on the new machine I can continue to sign things, mostly git commits.

{% highlight "shell" %}
$ gpg --export-secret-keys -a [your key] > gpg-sc.asc
{% endhighlight %}

The `-a` is short for `-armor` which will ASCII-armor the output file in a format that can be safely emailed or shared.

I then copied these to a safe media for moving them to the new machine. Once on the new machine we can import the key files on the new machine. During the export and import you will be asked for the encryption password for the key to export and reimport the keys.

{% highlight "shell" %}
$ gpg --import gpg-*.asc
{% endhighlight %}

Now your key is imported, but you might want to change the trust level of your own key. This will drop you to the gpg prompt and you can choose your trust level and confirmation.

{% highlight "shell" %}
$ gpg --edit-key [your key]

gpg> trust
Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 

gpg> save
{% endhighlight %}

After these steps I was able to successfully move my GPG keys from my old laptop to my new one.