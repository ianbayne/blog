---
layout: post
title: Hoisting
date: 2020-05-11
tags: [JavaScript, Programming]
category: [Blog]
---

This (returning a function before declaring it) works because of hoisting:

```javascript
function a() {
    return b();
    function b() {
        return "Hello world";
    }
}
```
