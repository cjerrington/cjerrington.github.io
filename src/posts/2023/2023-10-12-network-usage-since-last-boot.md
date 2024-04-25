---
title: Network Usage Since Last Boot
description: How to get the download and upload bandwidth since last boot on Linux
tags: 
  - linux
  - snippets
  - shell
  - 100DaysToOffload
draft: false
size: wide
date: 2023-10-12
---

The other day I saw someone ask on social media if there was a way to know how much bandwidth was used on their laptop. Based on the conversation I knew they were using a Linux machine, and they were using other tools to get other kinds of data, but this was information those tools wasn't capturing.

On Linux machines, what is nice is many things are stored on the system you just have to know where to look. This information was stored in the following file: `/proc/net/dev`. So what all is in this file? This is part of the kernel to provide [historical text interface](https://www.kernel.org/doc/html/latest/networking/statistics.html#procfs) to the list of interfaces and other statistics.

{% highlight "shell" %}
cat /proc/net/dev

Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo: 260668341  288912    0    0    0     0          0         0 260668341  288912    0    0    0     0       0          0
  eno1: 2102736856 5606213    0    0    0     0          0    713096 1128779181 6378842    0    0    0     0       0          0
{% endhighlight %}

Once we read the file we can see a list of all the network adapters and the history that is kept of the amount of bytes, packets, etc through the interface. What we don't need is the loop back device which is `lo: `. We can use `grep -v "lo: "` and this will get the lines not like the loopback interface. Next, we only want the data that is downloaded, and sorted to get the information we want.

{% highlight "shell" %}
cat /proc/net/dev | grep -v "lo:" | awk '{print $2}' | sort -n | tail -1

2102736856
{% endhighlight %}

This is the number of bytes that have been downloaded. So we need to do some math to get the numerical value in kilobytes, megabytes, and gigabytes as this is the human readable representation of the number. When we see the `awk '{print $2}'` this is cutting the string to get the 2nd item in sting only. This is how we can get the downloaded data. Now to get the uploaded data, we can `awk '{print $10}'` because this number is the 10th object.

Knowing this we can write a little query in `bash` to get the total received and uploaded bytes since the last boot of the machine.

{% highlight "bash" %}
total_bytes_received=$(cat /proc/net/dev | grep -v "lo:" | awk '{print $2}' | sort -n | tail -1)
total_bytes_uploaded=$(cat /proc/net/dev | grep -v "lo:" | awk '{print $10}' | sort -n | tail -1)

total_kb_received=$((total_bytes_received / 1024))
total_mb_received=$((total_kb_received / 1024))
total_gb_received=$((total_mb_received / 1024))

total_kb_uploaded=$((total_bytes_uploaded / 1024))
total_mb_uploaded=$((total_kb_uploaded / 1024))
total_gb_uploaded=$((total_mb_uploaded / 1024))

echo "Total received since last boot: $total_mb_received MB / $total_gb_received GB"
echo "Total uploaded since last boot: $total_mb_uploaded MB / $total_gb_uploaded GB"
{% endhighlight %}

I purposely kept the math separate between the kilobytes to gigabytes for the moments you want to check and you haven't gotten to a GB of downloaded data, we don't have a 0 value. Running the full script should show you something like the following.

{% highlight "shell" %}
Total received since last boot: 2005 MB / 2 GB
Total uploaded since last boot: 1081 MB / 1 GB
{% endhighlight %}

I was downloading the Fedora Live CD ISO, and while downloading the file, I ran the above process, and it was able to keep up with the amount of data that was being downloaded in real time. To test the `Transmitted` data, I used a file sharing service, and as it showed the progress of the upload, the `Transmitted` data was also matching. This was a neat way to learn some of the intricacies of what your OS knows about itself.

Check out the full source as well in my [snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/bash/getBandwith.sh).
