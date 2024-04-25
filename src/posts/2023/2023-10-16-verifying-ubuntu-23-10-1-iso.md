---
title: Verifying Ubuntu 23.10.1 ISO
description: How to verify the latest download of Ubuntu on Windows
tags: 
  - windows
  - 100DaysToOffload
draft: false
date: 2023-10-16
---

After downloading the latest [Ubuntu Desktop 23.10.1](https://ubuntu.com/download/desktop) we want to verify the ISO for it's authenticity. On the "Thank you page" there is a link to [verify your download](https://ubuntu.com/download/desktop/thank-you?version=23.10.1&architecture=amd64#), but only has instructions to verify on a Linux OS. For Windows, the assume you're already using WSL, and do dont directly show you where the checksum file is to download for the verification.

On a Linux machine you can run the following:

```shell
echo "3b6c5275366d02160554fa5703add462da3b8ce9be1749f8806e8dbbffaa2b5a *ubuntu-23.10.1-desktop-amd64.iso" | shasum -a 256 --check
```

When seeing this we see the hash value is the SHA256 value, Canonical provides as the SHA256, and you check that against the ISO file. If you go a little further, we see there is a [How to verify your Ubuntu download](https://ubuntu.com/tutorials/how-to-verify-ubuntu#1-overview) with some pretty steps. This is where if are on Windows they assume you have bash and WSL installed and kinda stop at the verification process.

We need to head over to [the releases](https://releases.ubuntu.com/) page and browse to our version folder and download the `SHA256SUMS` and `SHA256SUMS.gpg`. Next, we like to check that the `SHA256SUMS` is verified as well.

```text
$ gpg --keyid-format long --verify SHA256SUMS.gpg SHA256SUMS

gpg: Signature made 10/16/2023 9:22:06 AM Central Daylight Time
gpg:                using RSA key 843938DF228D22F7B3742BC0D94AA3F0EFE21092
gpg: Good signature from "Ubuntu CD Image Automatic Signing Key (2012) <cdimage@ubuntu.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 8439 38DF 228D 22F7 B374  2BC0 D94A A3F0 EFE2 1092
```

If you need to obtain the keys, you can run the following, but also confirm with Ubuntu as well for their [signing keys](https://ubuntu.com/tutorials/how-to-verify-ubuntu#4-retrieve-the-correct-signature-key). Then rerun the verification.

```shell
$ gpg --keyid-format long --keyserver hkp://keyserver.ubuntu.com --recv-keys 0x46181433FBB75451 0xD94AA3F0EFE21092
```

Now to check the ISO. On Windows we have a different way to check file hashes using `Get-FileHash`

```powershell
PS > Get-FileHash -Algorithm SHA256 -Path .\ubuntu-23.10.1-desktop-amd64.iso

Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          3B6C5275366D02160554FA5703ADD462DA3B8CE9BE1749F8806E8DBBFFAA2B5A       C:\Users\username\Downloads\ubuntu-23.10.1-desktop-amd64.iso
```

Now we need to confirm the hash from our `SHA256SUMS`:

```shell
$ Get-Content .\SHA256SUMS | Select-String "ubuntu-23.10.1-desktop-amd64.iso"

3b6c5275366d02160554fa5703add462da3b8ce9be1749f8806e8dbbffaa2b5a *ubuntu-23.10.1-desktop-amd64.iso
```

Now you can compare the hash values and ensure you have a proper ISO downloaded. Ensuring the signatures and the hash values is a way to confirm validity of the file. You should always make sure you have a file provided by the source, and that it downloaded correctly and didn't get corrupt either in the process. There is nothing worse, than downloading an ISO, burning the image to a flash drive and then it does not boot. Also making sure your file didn't get intercepted by a malicious actor as well.
