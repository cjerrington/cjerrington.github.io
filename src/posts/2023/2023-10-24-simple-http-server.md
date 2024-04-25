---
title: Simple HTTP Server
description: Setting up a simple web server with PowerShell
draft: false
date: 2023-10-24T00:00:00.000Z
tags:
  - 100DaysToOffload
  - powershell
size: wide
---

PowerShell is very powerful when we can leverage .NET classes in our scripts. One simple task is to create a simple web server to render our results or server some simple HTML content.

To get started we need to setup our HttpListener and prefix then start the new service.

```powershell
# Http Server
$http = New-Object System.Net.HttpListener

# Hostname and port to listen on
$http.Prefixes.Add("http://localhost:4000/")

# Start the Http Server 
$http.Start()
```

From there we can start listening on the port we specified, in this case 8080.

```powershell
# Log ready message to terminal 
if ($http.IsListening) {
    write-host " HTTP Server Ready!  " -f 'black' -b 'gre'
    write-host "now try going to $($http.Prefixes)" -f 'y'
    write-host "then try going to $($http.Prefixes)other/path" -f 'y'
}
```

Now that we have our server ready we need to start some basic routes and render a response and output stream. Each route is created with a GET request by default to get the url and page we need to display.

```powershell
# ROUTE EXAMPLE 1
    # http://127.0.0.1/
    if ($context.Request.HttpMethod -eq 'GET' -and $context.Request.RawUrl -eq '/') {

        # We can log the request to the terminal
        write-host "$($context.Request.UserHostAddress)  =>  $($context.Request.Url)" -f 'mag'

        # the html/data you want to send to the browser
        # you could replace this with: [string]$html = Get-Content "C:\some\path\index.html" -Raw
        [string]$html += "<h1>A PowerShell Web Server</h1><p>home page</p>" 
        
        # respond to the request
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($html) # convert html to bytes
        $context.Response.ContentLength64 = $buffer.Length
        $context.Response.OutputStream.Write($buffer, 0, $buffer.Length) #stream to browser
        $context.Response.OutputStream.Close() # close the response
    
    }

```

Then if we have a form we can create a POST HttpMethod to handle the submission of the form.

```powershell
# ROUTE EXAMPLE 2
    # http://127.0.0.1/some/form'
    if ($context.Request.HttpMethod -eq 'GET' -and $context.Request.RawUrl -eq '/some/form') {

        # We can log the request to the terminal
        write-host "$($context.Request.UserHostAddress)  =>  $($context.Request.Url)" -f 'mag'

        [string]$html += "
        <h1>A PowerShell Web Server</h1>
        <form action='/some/post' method='post'>
            <p>A Basic Form</p>
            <p>Full name</p>
            <input type='text' name='fullname'>
            <p>message</p>
            <textarea rows='4' cols='50' name='message'></textarea>
            <br>
            <input type='submit' value='Submit'>
        </form>
        "

        # respond to the request
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($html) 
        $context.Response.ContentLength64 = $buffer.Length
        $context.Response.OutputStream.Write($buffer, 0, $buffer.Length) 
        $context.Response.OutputStream.Close()
    }

    # ROUTE EXAMPLE 3
    # http://127.0.0.1/some/post'
    if ($context.Request.HttpMethod -eq 'POST' -and $context.Request.RawUrl -eq '/some/post') {

        # decode the form post
        # html form members need 'name' attributes as in the example!
        $FormContent = [System.IO.StreamReader]::new($context.Request.InputStream).ReadToEnd()

        # We can log the request to the terminal
        write-host "$($context.Request.UserHostAddress)  =>  $($context.Request.Url)" -f 'mag'
        Write-Host $FormContent -f 'Green'

        # the html/data
        [string]$html += "<h1>A PowerShell Web Server</h1><p>Post Successful!</p><p>$FormContent</p>" 

        #resposed to the request
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($html)
        $context.Response.ContentLength64 = $buffer.Length
        $context.Response.OutputStream.Write($buffer, 0, $buffer.Length)
        $context.Response.OutputStream.Close() 
    }
```

A good example we can use would be to display the files in a directory. Below we will setup a route called 'files' and get the list of the files and add them to a list element for the web page.

```powershell
if ($context.Request.HttpMethod -eq 'GET' -and $context.Request.RawUrl -eq '/files') {

        # We can log the request to the terminal
        write-host "$($context.Request.UserHostAddress)  =>  $($context.Request.Url)" -f 'mag'

        # the html/data you want to send to the browser
        # you could replace this with: [string]$html = Get-Content "C:\some\path\index.html" -Raw
        $files = (Get-ChildItem -Path C:\scripts\powershell\* -Include *.ps1).Name
        [string]$html += "<h1>A PowerShell Web Server</h1><p>Files in $($PSScriptRoot)</p><ul>" 
        foreach ($file in $files){
            [string]$html += "<li>$file</li>"
        }
        [string]$html += "</ul>"
        
        #resposed to the request
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($html) # convert html to bytes
        $context.Response.ContentLength64 = $buffer.Length
        $context.Response.OutputStream.Write($buffer, 0, $buffer.Length) # stream to browser
        $context.Response.OutputStream.Close() # close the response
    
    }
```

This is a quick and simple way to make a web server to display the information needed to present. Some downfalls to this are the server needs to be restarted if the script file changes or the files in the directory when rendering the web page.

Each request that is brought to the PowerShell web site will be logged in the console as well. We will see the requester IP and the page they hit as well.

View the full script on my snippets for [Simple HTTP Server](https://codeberg.org/cjerrington/snippets/src/branch/main/powershell/SimpleHTTPServer.ps1)
