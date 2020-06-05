---
layout: post
title: Composition and the Strategy Pattern
date: 2020-05-25
tags: [Programming, English, Java]
category: [Blog]
---

Coming from a self-taught and bootcamp background, I recognize there are a number of fundamental CS principles I'm having to play catch up in regard to.<!-- more --> As part of my efforts to rectify this, I've recently been diving into <a href="https://www.amazon.com/gp/product/0596007124/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596007124&linkCode=as2&tag=ianbayne-20&linkId=629ed42ef88ca10e6d67dcd5cd937589">Head First Design Patterns</a>, and thought I'd write out a post solidifying some of the things I've been learning.

Since the book's examples are in Java, and I'm teaching myself Java, I'll work through examples in that language rather than one I'm more familiar with, like Ruby. Forcing myself to think about the same concept from different angles has been enormously helpful in the past, however, so in a later post I'll take a look at how implementation could be handled in a different language.

## The strategy pattern

In short, the strategy pattern is all about encapsulating the parts of our code that change and making those parts interchangeable. This allows for easy expandability with a minimum of work, and results in reusable code that requires less maintenance. Assuming you haven't fouled things up somewhere, at least.

In order to explain, I'll start with a simple example. Say we have an `Animal` class with a method for making noise:

```java
public class Animal {
    public void makeNoise() {
        System.out.println("Hi there!");
    }
}
```

Now this works just fine if the only type of animal we're instantiating is one that can talk:

```java
public static void main(String[] args) {
    Animal human = new Animal();
    human.makeNoise();
}

=> Hi there!
```

But it falls down a bit with ones that can't:

```java
public static void main(String[] args) {
    Animal dolphin = new Animal();
    dolphin.makeNoise();
}

=> Hi there!
```

(Why dolphins you ask? Because I just got finished reading <a href="{{ "reviews/startide-rising" | relative_url }}">Startide Rising</a> by David Brin and dolphins, or at least their sentient descendants, feature quite prominently. Scifi nerds take note: This is a fun one!)

All well and good, but say we want different types of animals and we want them to make noises more suitable to their distinct animal-ness? One way would be to create a couple of subclasses that inherit from our `Animal` class and define their own `makeNoise()` methods. While doing so, let's also change our `Animal` class into an abstract class to use as a reference for what methods our subclasses need to define. Why? Because it's a concept I'm just learning about and want to drum into my thick cranium with repeated forced exposure of course.

```java
public abstract class Animal {
    public abstract void makeNoise();
}

public class Human extends Animal {
    public void makeNoise() {
        System.out.println("Hi there!");
    }
}

public class Dolphin extends Animal {
    public void makeNoise() {
        System.out.println("<< Clicks and whistles >>");
    }
}
```

Our different animals now make the sort of noises we expect from them:

```java
public static void main(String[] args) {
    Human human = new Human();
    human.makeNoise();
    
    Dolphin dolphin = new Dolphin();
    dolphin.makeNoise();
}

=> Hi there!
   << Clicks and whistles >>
```

While this implementation works, it isn't especially reusable. For example, what if we then want to create a talking `Parrot` class? If we follow the inheritance implementation above, we'll have to define a `makeNoise()` method in `Parrot` that will be an exact duplicate of the one for `Human`. Or we'll have to instantiate an instance of the `Human` class for our parrot and while that's fine now since we only have a single method, what about when we start adding more methods and instance variables specific to humanity? We'll wind up with parrots with two legs and a righteous sense of self-importance.

Instead of using inheritance then let's encapsulate the parts of our classes that change so we can alter them without affecting the parts that don't. To do so, we'll start by creating a new class to represent that behavior, `NoiseBehavior`. This will be an interface that all noise classes will implement:

```java
public interface NoiseBehavior {
    public void makeNoise();
}
```

Now each noise class needs to implement its own `makeNoise()` method:

```java
public class ClicksAndWhistles implements NoiseBehavior {
    public void makeNoise() {
        System.out.println("<< Clicks and whistles >>");
    }
}

public class Speak implements NoiseBehavior {
    public void makeNoise() {
        System.out.println("Hi there!");
    }
}
```

Next let's add an instance variable to the `Animal` class and call our interface's `makeNoise()` method on it:

```java
public abstract class Animal {
    NoiseBehavior noiseBehavior;

    public void makeNoise() {
        noiseBehavior.makeNoise();
    }
}
```

Each subclass can then polymorphically set its `noiseBehavior` instance variable in its respective constructor to reference the specific behavior we require at runtime: speaking for humans and parrots, whistling and clicking for dolphins. This is a technique called <a href="https://en.wikipedia.org/wiki/Object_composition">composition</a> wherein a class references an object of another class in an instance variable.

```java
public class Dolphin extends Animal {
    public Dolphin() {
        noiseBehavior = new ClicksAndWhistles();
    }
}

public class Parrot extends Animal {
    public Parrot() {
        noiseBehavior = new Speak();
    }
}

public class Human extends Animal {
    public Human() {
        noiseBehavior = new Speak();
    }
}
```

We're now reusing our `Speak` class and each of our animals is behaving as expected:

```java
public static void main(String[] args) {
    Human human = new Human();
    human.makeNoise();
    
    Dolphin dolphin = new Dolphin();
    dolphin.makeNoise();

    Parrot parrot = new Parrot();
    parrot.makeNoise();
}

=> Hi there!
   << Clicks and whistles >>
   Hi there!
```