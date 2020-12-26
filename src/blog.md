---
layout: page
title: Blog
permalink: /blog/
categories: [Blog]
---

{%- if site.categories.Blog.size > 0 -%}
  <ul class="post-list">
    {%- for post in site.categories.Blog -%}
      <li class="post">
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="post-meta">{{ post.date | date: date_format }}</span>
        <h3 class="no-margin">
          <a class="post-link post-title" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h3>
        {%- if post.tags.size > 0 -%}
          {%- render "tags_list" -%}
        {%- endif -%}
        {%- if site.show_excerpts -%}
          <div class="post-content">
            {{ post.excerpt }}
            <a style="font-weight: 600" href="{{ post.url | relative_url }}">Read more</a>
          </div>
        {%- endif -%}
      </li>
    {%- endfor -%}
  </ul>
{%- endif -%}
