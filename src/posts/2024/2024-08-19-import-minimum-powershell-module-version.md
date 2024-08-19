---
title: Importing minimum PowerShell module versions
description: How to import PowerShell modules and specifying a minimum version
date: '2024-08-19T15:45:52'
tags:
  - powershell
  - windows
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

One of the great things with PowerShell is the ability to import modules or blocks of code to help assist you in your current script. By default now, PowerShell will do an automatic import of the modules you install, and you can also call the `Import-Module` function to import a module only into the current session. This is helpful when writing and sharing scripts to ensure you have the right context in your shell before continuing.

Importing modules that are already installed is pretty easy.

```powershell
Import-Module -Name dbatools
```

You can even specify a specific version of the module you need. There are ways to have multiple versions installed, or if you need a specific version, you can use the `RequiredVersion` parameter.

```powershell
Import-Module -name dbatools -RequiredVersion 2.1.19
```

Recently I was working on a mass deployment where we needed a specific version of `dbatools`. I used the `RequiredVersion` but the next issue was I might need to install that version, and there is the possibility that it will install side-by-side and not update the current installation. So I came up with a few functions and processes that will:

- Check if the module is installed
  - If it is, ensure the version I am needing is installed
  - If multiple versions are installed sort them and select the highest version
- If the module is not installed, install that specific version
- Finally, import the module
- Once installed, remove the module if already imported, so we can use the new version
- Import the required version for my script

## The process

There are a few functions in this process to ensure some separation of duties along the way.

- `Get-MyModuleVersion`
- `Install-MyModule`

These functions do the logic steps and return `true` or `false` as needed. So the main login could be:

```powershell
$moduleName = "dbatools"
$requiredVersion = "2.1.19"

if (-not (Get-MyModuleVersion)) {
    if (-not (Install-MyModule)) {
        throw "Failed to install or update $moduleName module to version $requiredVersion."
    }
}

Import-Module -Name $moduleName -RequiredVersion $requiredVersion -ErrorAction Stop
```

### Get-MyModuleVersion

```powershell
# Function to check if the installed module meets the required version
function Get-MyModuleVersion {
    try {
        $module = Get-Module -Name $moduleName -ListAvailable
        if ($module -and ($module.Version -ge [version]$requiredVersion)) {
            # If there happens to be more than one version, select the highest. If only one, that is selected.
            $version = $module.Version | Sort-Object -Descending | Select-Object -First 1
            Write-Host "$moduleName is already at or above ($version) the required version ($requiredVersion)."
            # Reset the required version to the module version using a global variable 
            $global:requiredVersion = $version
            return $true
        } else {
            Write-Host "$moduleName is ($($module.Version)) below the required version ($requiredVersion)."
            return $false
        }
    } catch {
        Write-Host "$moduleName is not installed."
        return $false
    }
}
```

### Install-MyModule

```powershell
# Function to install or update the module
function Install-MyModule {
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Install-PackageProvider -Name "NuGet" -MinimumVersion "2.8.5.208" -Force -ErrorAction Stop
        Install-Module -Name $moduleName -RequiredVersion $requiredVersion -Force -AllowClobber -SkipPublisherCheck 
        Write-Host "$moduleName module updated to version $requiredVersion."
        return $true
    } catch {
        Write-Host "Failed to update $moduleName module."
        return $false
    }
}
```

## Putting it in practice

This process has worked flawless so far for me as we can turn the `RequiredVersion` of the `Import-Module` into more of a minimum version. The `Get-MyModuleVersion` does this here:

```powershell
 # If there happens to be more than one version, select the highest. If only one, that is selected.
$version = $module.Version | Sort-Object -Descending | Select-Object -First 1
$global:requiredVersion = $version
```

After I evaluate the versions, I update the scoped variable of `$version` back the to parent and global variable `$requiredVersion` to the higher number so it can continued to be used as the logic checks out.

The next steps I had issues with was needing multiple modules to be imported in my scripts. Sure, the `if` block logic could work, but that is a lot of extra lines.

I took a hash table of the modules I would like to import with their `Name` and `Value`, and loop over the keys and values in a `ForEach-Object`.

```powershell
# Define the minimum required version of your module
$ImportModules = @{
    "AWSPowerShell" = "4.1.602"
    "dbatools" = "2.1.19"
}

# Import logic
$ImportModules.GetEnumerator() | ForEach-Object {
  Write-Host "Looking for: $($_.Key) with version $($_.Value)"
  $moduleName = $($_.Key)
  $requiredVersion = $($_.Value)

  if (-not (Get-MyModuleVersion)) {

      if (-not (Install-MyModule)) {
          throw "Failed to install or update $moduleName module to version $requiredVersion."
      }
  }

  try{
      # if module is already loaded, unload it so we can import the new version.
      Remove-Module -Name $moduleName -ErrorAction SilentlyContinue
  }catch{}

  Write-Host "Module Name: $moduleName"
  Write-Host "Module version: $requiredVersion"

  Import-Module -Name $moduleName -RequiredVersion $requiredVersion -ErrorAction Stop
}

# Main Logic 
Write-Host "Modules are loaded, begin process..."
```

This will output something like the following:

```text
Looking for: dbatools with version 2.1.19
dbatools is (1.1.146) below the required version (2.1.19).
dbatools module updated to version 2.1.19.
Module Name: dbatools
Module version: 2.1.19
Looking for: AWSPowerShell with version 4.1.602
AWSPowerShell is already at or above (4.1.602) the required version (4.1.602).
Module Name: AWSPowerShell
Module version: 4.1.602
```

## Conclusion

What I wanted was to turn the `RequiredVersion` of the `Import-Module` function into a minimum version, and I think this process has accomplished that. Also, I have the ability to specify multiple PowerShell modules and the minimum version I am needing to complete the process I have in my script.

Many of the modules I work with properly update and can use a higher version than what I specify as the `MinimumVersion`. This could easily be adapted to only install and import the required version as well with some small modifications.

### Resources

- [Import-Module](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/import-module?view=powershell-7.4)
- [Remove-Module](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/remove-module?view=powershell-7.4)
- [Get-Module](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-module?view=powershell-7.4)
- [Install-MinimumVersion.ps1](https://codeberg.org/cjerrington/snippets/src/branch/main/powershell/Install-MinimumModuleVersion.ps1)
