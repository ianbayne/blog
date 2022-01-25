---
layout: post
title: Fixing the Pods
date: 2020-05-19
tags: [TIL, React Native, iOS, English, Programming]
category: [Blog]
---

1. Was getting this error:<!-- more -->

```
Build system information
error: /Users/ian/code/ianbayne/AeropressProject/ios/Pods/Target Support Files/Pods-AeropressProject/Pods-AeropressProject.debug.xcconfig: unable to open file (in target "AeropressProject" in project "AeropressProject") (in target 'AeropressProject')

** BUILD FAILED **
```

Fixed with this:

```bash
cd ios && pod deintegrate && pod install && cd ..
```

1. Always check your Xcode version. 