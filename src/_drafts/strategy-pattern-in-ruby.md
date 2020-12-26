---
layout: post
title: And now in Ruby
date: 2020-04-22
tags: [Ruby, Programming, English]
category: [Blog]
---

## And now in Ruby

First of all, in Ruby we don't actually have the concept of abstract classes. In Rails we could add the following to an `ActiveRecord` model, which would prevent instantiating:

```ruby
class AnAbstractClass
    self.abstract_class = true
end

AnAbstractClass.new
=> NotImplementedError (AnAbstractClass is an abstract class and cannot be instantiated.)
```

We could monkeypatch the class method `.new` and raise an error if the class is the parent class:

```ruby
class AnAbstractClass
    def self.new
        raise NotImplementedError if self.is_a? AnAbstractClass
        super
    end
end
```