---
layout: post
title: Using closures
date: 2020-04-25
tags: [TIL, JavaScript, English, Programming]
category: [Blog]
---

This doesn't work<!-- more -->

```javascript
function displayCurrentYear(tagID) {
  const currentYear = new Date().getFullYear();
  const copyrightYear = document.getElementById(tagID);
  copyrightYear.textContent = currentYear;
}

const tagID = 'copyright-year';
document.addEventListener('DOMContentLoaded', displayCurrentYear(tagID));
```

But this does

```javascript
function displayCurrentYear(tagID) {
  return function() {
    const currentYear = new Date().getFullYear();
    const copyrightYear = document.getElementById(tagID);
    copyrightYear.textContent = currentYear;
  }
}

const tagID = 'copyright-year';
document.addEventListener('DOMContentLoaded', displayCurrentYear(tagID));

```