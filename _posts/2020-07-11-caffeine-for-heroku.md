---
layout: post
title: "Herokuにカフェインを"
date: 2020-07-11
tags: [日本語, TIL, Heroku, Programming]
category: [Blog]
---

<div lang="ja">
    <a href="https://jp.heroku.com/home/">Heroku</a>はウェブアプリの開発から実行、運用を簡単にするプラートフォームで、うちの殆ど全てのアプリをHerokuでホスティングしている。
    <!-- Necessary to ensure vertical space above Read More link -->
    <div style="margin-bottom: 15px"></div>
    <!-- more -->
    プロフェッショナルアプリの場合、月極めのホスティング費用が高くなるが、DevOpsは不要なのでトータル料金が安くなる。<br>
    趣味で作ったアプリも利用できるHerokuは無料サーバーを提供。メモリーや速さなどの限度はあるがCLIからpushすることだけでデプロイできるのでものすごく便利。<br>
    ただし、無料の場合アクセスがないと30分でスリープしてしまい、スリープしてしまうと、アクセスした時点で起動するのでサイトが遅くなる。<br>
    <br>
    どうやってこれを回避できるかと今日考えたけど、解決方法が意外と楽チンだった。<br>
    30分毎にアクセスが必要だし、そのアクセスの発信元がどこからでも良いので、アプリが自分を叩けばスリープしないはず。<br>
    <br>
    Herokuの環境では色々なAddonを追加できる。そのAddonの一つは<a href="https://elements.heroku.com/addons/scheduler"><span style="font-weight: 600">スケジューラ</span></a>といい、cronjobみたいなものだ。インターフェースは下記の通り。
</div>
<br>
<img src="/assets/images/heroku_scheduler.png" loading="lazy" alt="Job editor for Heroku Scheduler Addon" width="300px" style="margin: 0 auto;">
<br>
<div lang="ja">
    "Every 10 minutes"を選択し、下記のようなcurlコマンドを入れてみた。
</div>
<div style="margin-bottom: 15px"></div>
```bash
$ curl https://your-app-name-here.herokuapp.com/
```
<div lang="ja">
    そして30分待つともう一度アプリをアクセスしてみたら… 大成功！このような小さな問題の解決でもやっぱり楽しい。
</div>


