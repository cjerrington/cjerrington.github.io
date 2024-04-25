---
title: What is in Your Headers?
description: Understanding the Headers your web server returns
tags: 
  - web design
  - 100DaysToOffload
---

Understanding the Headers your web server returns is an important item in todays online, connected world, and those providing the content. When your web client, browser, makes a request to it's destination web server location, the server sends a response to the client about the page or request that is trying to be made.

Now your client then knows how to properly continue to render the response. This is different than the HTML rendered code that gets displayed and the the HEAD content that is there too.

## The Method

Your client sends a request to a server over a Method, the server then sends an HTTP Response. The common four HTTP methods specified in [RFC 7231](https://www.rfc-editor.org/rfc/rfc7231) are:

- GET - read data
- POST - modify data or process data
- PUT - a replacement of data typically used when working with databases
- DELETE - deleting a record, typically used when working with databases

Making a HEAD request is asking the server for the request content without sending a message body response. The requests are extra metadata style information that is sent back and forth between the client and the server.

## The Response

Once the server accepts the request it needs to send a response according to the request type. the response will include:

- Status Code
- Response Headers
- Response Body

### Status Codes

The status codes are what help the client infer the message it is about to receive. These are those 3-digit codes, and a few of the most frequent are:

- **200 - OK** - the request is handled successfully and able to provide a valid response.
- **301 - Moved Permanently** - when the request is redirected to another URL permanently. Like when you have [www.claytonerrington.com](https://www.claytonerrington.com) redirect to [claytonerrington.com](https://claytonerrington.com).
- **404 - Not found** - usually when the requested item is not found on the server or access or authorization is not presented to access the content.
- **500 - Server Error** - when the request generated an error on the server.

### Response Headers

Once these status codes are sent, we now can see some server details about the requested content.

HTTP headers let the client and the server pass additional information with an HTTP request or response. Headers can be grouped according to their contexts:

- [Request headers](https://developer.mozilla.org/en-US/docs/Glossary/Request_header) contain more information about the resource to be fetched, or about the client requesting the resource.
- [Response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) hold additional information about the response, like its location or about the server providing it.
- [Representation headers](https://developer.mozilla.org/en-US/docs/Glossary/Representation_header) contain information about the body of the resource, like its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types), or encoding/compression applied.
- [Payload header](https://developer.mozilla.org/en-US/docs/Glossary/Payload_header) contain representation-independent information about payload data, including content length and the encoding used for transport.

Every web request has [HTTP request headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). These headers help the web client know information about the host, server, but also about the content. Some familiar ones we might see are:

- Connection
- Keep-Alive
- Authorization
- Server
- Cache-Control
- Date
- Last-Modified
- Connection
- Content-Type
- Content-Length

All of these headers are configured on the web server and the also the application that is running to serve the content to the end users.

### Response body

The response body is the full content that is sent from the server to the client. This is typically the full rendered HTML content, images, octet-stream data. This is not to be confused with just the `<body>` of the rendered HTML page.

## Conclusion

This is part one of getting into HTTP Headers. Hopefully this helps explain som of what your web client and server are doing to render the page or content you are browsing to. Part two will be how to query the HEAD and see some of the data that is passed in the request and also the response.
