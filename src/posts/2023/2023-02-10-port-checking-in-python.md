---
title: "Port Checking in Python"
description: "Using Python and Sockets to check for port connections on local and remotes hosts"
tags: 
  - python
  - 100DaysToOffload
date: 2023-02-10 
---

Python's [Sockets](https://docs.python.org/3/library/socket.html) library allows us to make connections to other hosts and we can use this to establish new sockets for our scripts or check if they are open on remote hosts.

With platforms like [Octopus](https://octopus.com/) for software delivery, we need servers to be able to connect to your company's Octopus server on certain ports. Also, some software needs to check if a connection can be made to a host on a port. In this class we can check if a port is open on a host and have some logging.

Today we will focus on the class itself and how to setup the hosts. You can take a look at Python's built in [logging](https://docs.python.org/3/library/logging.html) function if you'd like as well.

{% highlight "python" %}
import socket, time, logging
from colorama import init, Fore

# Setup colorama
init()

class PortCheck:
    def __init__(self, domain, port):
        self.domain = domain
        self.port = port
        self.retry = 1
        self.delay = 5
        self.timeout = 3


    def isOpen(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(self.timeout)
        try:
            s.connect((self.domain, int(self.port)))
            s.shutdown(socket.SHUT_RDWR)
            return True
        except:
            return False
        finally:
            s.close()


    def checkHost(self):
        ipup = False
        for i in range(self.retry):
            if self.isOpen():
                ipup = True
                break
            else:
                time.sleep(self.delay)
        return ipup
    
    
    def portReturn(self):
        if self.checkHost():
            print(f"{self.domain}:{self.port} is {Fore.GREEN} OPEN {Fore.RESET}")
            logging.info(f"{self.domain}:{self.port} is OPEN")
        else:
            print(f"{Fore.RED}{self.domain}:{self.port} is CLOSED {Fore.RESET}")
            logging.error(f"{self.domain}:{self.port} is CLOSED")
{% endhighlight %}

In the class we call checkHost() to connect to the host and port and return if it is open or closed. The portReturn() function we can then have a static and built in way to give us the status of the connection.

To begin we need to create a new instance of the class to check port 443 on google.com.

{% highlight "python" %}
google = PortCheck("google.com", 443)
{% endhighlight %}

The variable, google, will now have our class attributes. To make sure we can call google.domain or google.port and this will return google.com and 443 respectfully in this case. To run the work, we call

{% highlight "python" %}
google.portReturn()
{% endhighlight %}

Once called the class will run the portReturn function that checks our host and connects on the port specified. 

Now, lets add a few more hosts.

{% highlight "python" %}
# Setup hosts and ports
google = PortCheck("google.com", 443)
facebook = PortCheck("facebook.com", 443)
usefulscriptingnetwork = PortCheck("usefulscripting.network", 80)
localhost = PortCheck("localhost", 445)
badhost = PortCheck("usefulscripting.network", 4000)

# run checks
google.portReturn()
facebook.portReturn()
usefulscriptingnetwork.portReturn()
localhost.portReturn()
badhost.portReturn()
{% endhighlight %}

We have now create 5 instances of our PortCheck class each with it's own information, then running the checks. Once complete we should see something like the following.

![](/assets/images/blog/python-socket-connection.png)

I have used [colorama](https://pypi.org/project/colorama/) to help with a visual on showing the status results in OPEN and CLOSED.

I hope this helps and you can view the full source code in my [Codeberg Snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/python/portcheck.py). This is the basics of how I made this into a Python Package on [PyPi.org](https://pypi.org/project/netutil/) as well.