---
title: Cleaning up Scoop
description: Managing Scoop and cleaning up old application cache and versions.
date: '2024-08-12'
tags:
  - powershell
  - automation
  - windows
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

I've moved from Chocolately to Scoop a while ago and it's been a great change. Chocolately seemed to have a lot of bloat after awhile and got into the enterprise market and I've felt some of the quality has worn off. I found the alternative called [Scoop](https://scoop.sh/), and it's easy to install and manage the applications more like a package manager I'm familiar with on my Linux devices.

## Installing Scoop and applications

The install of Scoop is really simple.

```powershell
PS > Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
PS > Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

From here you can `search` for applications and then install them.

```powershell
PS > scoop search python
Results from local buckets...

Name      Version  Source Binaries
----      -------  ------ --------
python    3.10.5   main
winpython 3.10.4.0 main

PS > scoop install python
```

## Updating applications

From looking at the [commands](https://github.com/ScoopInstaller/Scoop/wiki/Commands) that Scoop has we can see there us one for `update`. This will update apps or scoop itself.

Running update without specifying an application will update the local repository of application information and inform you if there are additional updates.

```powershell
PS > scoop update
```

To update an application or application we can run the following.

```powershell
PS > scoop update python
PS > scoop update *
```

The wildcard `*` will tell scoop to update any applications it finds updates for.

## Cleaning up Scoop

When you run an application update with Scoop, it downloads the new version and updates the shim it makes for that app to point the app to the `current` version, keeping the older versions. Keeping the older versions installed makes it easy to quickly downgrade if there is an issue with a new version

```powershell
PS > scoop cleanup *

Removing python: 3.12.4
```

This cleanup only removes the installed versions of the applications installed to yours `scoops\apps` directory. This is good to run frequently as well as this adds more space taken for applications that are no longer used.

The other cleanup part is taking a look at the cache. When you run your update process, scoop will download the installer file, and place it in the `cache`. This is then used for the install process and some uninstall processes. What can happen is this cache indefinitely saves these locally for a future reinstall or uninstall process. We can easily look at the cache too. I've trimmed up the output for simplicity sake.

```powershell
PS > scoop cache

Total: 18 files, 943.8 MB
Name       Version                 Length
----       -------                 ------
...
python     3.12.5                26508648
...
```

That total size is getting close to 1 GB of installer files over all the updates I've run over time. This is precious space we can regain on our system. Again, we can specify a specific application or all versions.

```powershell
PS > scoop cache rm python
PS > scoop cache rm *

...
Removing python#3.12.5#cf7f41d.exe...

Deleted: 18 files, 943.8 MB
```

## Conclusion

Scoop is a great tool to help you install your applications and has a massive list of [apps](https://scoop.sh/#/apps) across various [application buckets](https://github.com/ScoopInstaller/Scoop?tab=readme-ov-file#known-application-buckets). There are some official buckets for `main`, `extras`, `games`, etc and I'd be cautious of using 3rd party buckets.

Hopefully this `cleanup` and `cache` cleanup process helps you in your application management as well.
