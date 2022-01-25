---
layout: post
title:  Ruby Standard Libraries
date:   2020-04-22
tags: [TIL, Ruby, Programming, English]
category: [Blog]
---

## FileUtils
```ruby
pwd = FileUtils.pwd
FileUtils.mkdir_p(pwd + '/directory')
```
<!-- more -->

## Dir
```ruby
pwd = Dir.pwd
```

## Pathname
```ruby
path = Pathname.new(pwd)
path.directory?
path.dirname
path.read
```

## SecureRandom
```ruby
SecureRandom.uuid
SecureRandom.hex(10)
```

## strscan

## Base64
```ruby
enc = Base64.encode64('Send reinforcements')
# -> "U2VuZCByZWluZm9yY2VtZW50cw==\n"
plain = Base64.decode64(enc)
# -> "Send reinforcements"
```

## OpenURI vs. Net::HTTP
OpenURI is a wrapper for Net::HTTP. Has dangerous security flaw though:
`Kernel#open` leaves you vulnerable to remote code execution:
`open("| ls")`

Instead:
```ruby
uri = URI.parse("http://example.com/image.jpg") #=> #<URI::HTTP>
uri.open #=> #<Tempfile:/var/folders/k7/6zx6dx6x7ys3rv3srh0nyfj00000gn/T/20160524-10403-xpdakz>
```

```ruby
Net::HTTP.get(URI('http://www.stackoverflow.com'))
```

## Tempfile
```ruby
file = Tempfile.new('foo')
file.path      # => A unique filename in the OS's temp directory,
               #    e.g.: "/tmp/foo.24722.0"
               #    This filename contains 'foo' in its basename.
file.write('hello world')
file.rewind
file.read      # => "hello world"
file.close
file.unlink    # deletes the temp file
```

`#create` accepts a block:

```ruby
Tempfile.create do |f|
    f << "abc\n"
    f.rewind
    f.read
end
```

Good practice to close and unlink tempfiles, otherwise they stick around until garbage-collected:

```ruby
file = Tempfile.new('foo')
begin
   # ...do something with file...
ensure
   file.close
   file.unlink   # deletes the temp file
end
```

## File

```ruby
f = File.new('newfile',  'w+')
f.write ('bob')
f.rewind
f.read
```
