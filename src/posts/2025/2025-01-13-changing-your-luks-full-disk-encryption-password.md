---
title: Changing Your LUKS Full Disk Encryption Password
description: Changing your LUKS full disk encryption password should be a normal practice as well
date: 2025-01-13
tags: 
  - linux
  - 100DaysToOffload
---

You can do a full disk encryption on you Linux devices and changing your Linux Unified Key Setup (LUKS) Full Disk Encryption Password should be a normal practice as well. When I did the installation of my operating system, it was a choice to set this up at boot. Just like passwords to online and other accounts, it is a good practice to change your user account logins on my computer as well.

## Changing the password

Here's how you can change your LUKS full disk encryption password, typically done through the command line:

1. Open Terminal
2. Identify Your Drive
    - Find the device name of your encrypted drive. You can usually find this information in your system's disk utility or by running `lsblk` in the terminal.
3. Use the `cryptsetup` Command
    - Execute the following command, replacing `/dev/sda1` with the actual device name of your encrypted drive:

    ```bash
    sudo cryptsetup luksChangeKey /dev/sda1 -S 0
    ```

    - The `-S 0` option specifies that you're changing the passphrase for the first key slot (slot 0).

4. Enter Current Passphrase.

5. Enter New Passphrase.

6. Confirm New Passphrase.

7. Reboot your system for the changes to take effect.

### Example

```bash
sudo cryptsetup luksChangeKey /dev/sda3 -S 0
Enter passphrase to be changed:
Enter new passphrase:
Verify passphrase:
Key slot 0 successfully updated in LUKS header on /dev/sda3
```

## Using a Graphical Interface (if available)

Some Linux distributions provide graphical tools for managing disk encryption. If your system has one, you might be able to change the passphrase through the graphical interface. Check your distribution's documentation for specific instructions.

## Important Notes

- __Strong Passphrase__: Choose a strong and unique passphrase that is difficult to guess.
- __Backup__: Before making any changes to your disk encryption, ensure you have a recent backup of your data.
- __Recovery Key__: If you lose your passphrase, you may need a recovery key to access your data. Keep your recovery key in a secure and accessible location.
