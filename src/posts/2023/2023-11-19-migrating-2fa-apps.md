---
title: Migrating 2FA apps
description: >-
  Recently I migrated 2FA apps and introduced my first YubiKey to the
  authentication process.
draft: false
date: 2023-11-19T06:00:00.000Z
tags:
  - 100DaysToOffload
---

Over the last few years, I have moved things away from Google for my 2FA codes. There are plenty of 2FA apps out there for your mobile device. What I have found, since Apple added the tracking and data collection notice to the App Store, is "why does this app need to collect this data?". Even for a simple app that provides a time based token, they don't need to know how often I use the app, or collect anything else.

So I moved to [Raivo OTP](https://raivo-otp.com/), even [created the website](https://raivo-otp.com/) the author and community wanted. This was my way to contribute to a great app and fill a need I saw that was missing and something I could help with. What was great was this was simple, didn't collect data and was open source, kept your stuff private and just provided a solution. Well, like most apps you want to keep them updated, and even something this simple has an update every so often. But then one day, I went to check the website and keep my part updated and saw a [change of ownership](https://github.com/raivo-otp/marketing-website/issues/19#issuecomment-1655181820) in the project that left quite a few others concerned about the app in general and as a whole. I kept using the app, but after some time wanted to ensure what I was using was also kept up to date as well, and no real change in the situation, so I migrated my 2FA application to [2FAS](https://2fas.com/).

![2FAS logo](/assets/images/blog/2fas_logo.png "2FAS Logo")

This migration could not have been any simpler. The app had an import process that walks you through how to export the data from one multifactor app into this one. This has the same open source aspect, and also has a team of people behind the solution. What I also liked was the idea of the web browser and curious on how this would work. It is pretty genius if you ask me. Link your phone to the browser app, then when you are prompted to enter your 2FA code, you tap the plugin, it pings your phone, after confirmation which code you need to send, it types it in the browser for you.

I was amazed how easy it was to migrate, and use this browser feature. But wait... the whole purpose of 2FA is to confirm you are the one logging into a service. I found it a little ironic that we've been advised to use 2FA that is confirming your identity from another device, and now we are able to still use one device, essentially after the "code and website connection" is made between the browser plugin and your multifactor device. Are we getting lazy again with our 2FA devices after needing to use them so frequently during the day?

There are benefits I can see with this process. My phone is usually locked in my pocket. I have to get my phone out, unlock, find the app, type a code... time elapsed, retype the code, wrong site, retype the code, and now we've logged in. Along with this change. I also added a hardware key to my authentication process, a [YubiKey](https://www.yubico.com/). This has been a life changer for me. Once the hardware key is added to my accounts, I can just give a gentle, light tap on the key and away I go. No need for the phone process mentioned. There are a few logins I have where they only support the TOTP process and no push app process like Okta has for a few of my other daily logins. I guess the push notification process of Otka is like 2FAS plugin process.

![List of current YubiKey models](/assets/images/blog/yubikey.png "List of current YubiKey models")

Since I do have a lot of machines I use regularly, I was a bit concerned about the support of my hardware key across machines and operating systems. So far I have not had any issues, and is a much smoother process in my workflow during the day. Setting up the YubiKey could not be simpler, as well as long as the logins that support it. I've only found one that doesn't support it, but can use the new 2FAS process. The YubiKey I purchased supports a wide variety of uses and have not had any problems with it. I see the thought process of having a primary and secondary hardware key as suggested, but with my budget, getting the one hardware key now to get introduced to the process, and having my 2FA on my mobile device as a backup is the route I am going for now. Maybe later I can get a spare hardware key and adding it to the mix.

The other benefit I've used a little of is seeing what it is like to have your GPG key on your YubiKey as well. The one confusing thing is the use of PINs. I've set one in the browser to unlock on some websites when signing in, another to manage the hardware key, and yet another one for GPG. It could be me, but that process is a bit all over the place in management.

Overall, I've enjoyed my migration to a new 2FA app and the introduction of a hardware key. It has been a life changer in my daily process and glad I finally made the switch and addition to my security landscape.
