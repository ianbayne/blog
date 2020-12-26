---
layout: post
title: On Parsing
date: 2020-04-22
tags: [TIL, Ruby, Programming, English]
category: [Blog]
---

I came across a great little tutorial on parsing strings in Ruby [here](https://www.rubyguides.com/2015/04/parsing-with-ruby/).

[Backus–Naur form or Backus normal form (BNF)](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form)
<!-- more -->

```ruby
require 'strscan'
require_relative 'tag'

class Parser
  attr_reader :tags

  def initialize(str)
    @buffer = StringScanner.new(str)
    @tags   = []
    parse
  end

  def parse
    until @buffer.eos?
      skip_spaces
      parse_element
    end
  end

  def skip_spaces
    @buffer.skip(/\s+/)
  end

  def parse_element
    if @buffer.peek(1) == '<'
      @tags << find_tag
      last_tag.content = find_content
    end
  end

  def find_tag
    @buffer.getch
    tag = @buffer.scan_until />/
    Tag.new(tag.chop)
  end

  def find_content
    tag = last_tag.name
    content = @buffer.scan_until /<\/#{tag}>/
    content.sub("</#{tag}>",'')
  end

  def last_tag
    @tags.last
  end

end
```

```ruby
class Tag
  attr_reader   :name
  attr_accessor :content

  def initialize(name)
    @name = name
  end
end
```

```ruby
string = "<body>testing</body> <title>parsing with ruby</title>"
parser = Parser.new(string)
p parser
p parser.tags
```
