---
theme: ../../theme
title: COMP 1600 – Week 10, Lecture 2 – Calling Methods, Equality and Classes
info: |
  We call methods on objects and find new ones in the Java API, and see why
  == and equals() can disagree. Then we write our own classes, with private
  members, constructors, accessors and mutators, and build a Student roster.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 10</div>

# A class is a template; objects are what you call <span class="hl">methods</span> on

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Calling methods</span>
  <span>== and equals()</span>
  <span>Classes</span>
  <span>Class examples</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <rect x="96" y="20" width="128" height="76" rx="12" fill="#eef2ff" stroke="#3730a3" stroke-width="3" stroke-dasharray="8 6" />
    <text x="160" y="56" text-anchor="middle" class="cover-art-obj">Car</text>
    <text x="160" y="82" text-anchor="middle" class="cover-art-name" style="font-size: 18px">class</text>
    <path d="M136 98 L 90 194" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M184 98 L 230 194" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="16" y="198" width="136" height="76" rx="14" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="84" y="242" text-anchor="middle" class="cover-art-name">car1</text>
    <rect x="168" y="198" width="136" height="76" rx="14" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="236" y="242" text-anchor="middle" class="cover-art-name">car2</text>
    <text x="160" y="304" text-anchor="middle" class="cover-art-name" style="font-size: 18px">objects</text>
  </svg>
</div>
</div>

<!--
Welcome. Today has four parts. We start by calling methods on objects, which you have already done with Strings. Then we look at a classic trap: testing whether two objects are the same. Then we write our own classes: members, constructors, accessors, and mutators. Finally we design a Student class and a class roster.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) and Foundations of Programming Languages (FPL); secondary is Software Engineering (SE) for reading API documentation and hiding data, with one Society, Ethics, and Professionalism (SEP) touchpoint on keeping personal data private.

See also: Week 10 Lecture 1 (objects and references), Week 10 Lecture 3 (references, aliases, and null in depth), and Week 11 Lecture 1 (members, methods, static, and constants, which revisits today's class material).

Delivery reminders: read on-screen text aloud, describe each diagram in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Call** methods on objects, and find new ones in the Java API <span class="tag">SDF</span>
- **Predict** whether `==` and `equals()` say two objects are the same <span class="tag">FPL</span>
- **Write** a class with private members, a constructor, accessors, and mutators <span class="tag">SDF</span>
- **Explain** when a method needs an object and when it is static <span class="tag">FPL</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and FPL is Foundations of Programming Languages.

The second and third objectives are the apply-level skills. Predicting the result of == and equals is a standard exam question, and writing a small class is the core of Project 4.

Likely question: "Is this a lot at once?" Yes; Week 11 comes back to classes, so today is a first pass. Timing: 1 minute.
-->

---

# Predict first: what does this print?

<div class="cols wide-left center">
<div>

```java
String s1 = new String("identical");
String s2 = new String("identical");
if (s1 == s2)
    System.out.println("Same!");
else
    System.out.println("Different!");
```

</div>
<div>

<Quiz
  :options="['Same!', 'Different!', 'Compile error']"
  :answer="1"
  explain="Different! == asks whether s1 and s2 point to the same object, and they point to two separate objects."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give 60 seconds with a neighbor before anyone clicks. Low-tech alternative: one, two, or three fingers for A, B, or C.

The code creates two Strings with new, both containing the text "identical", and compares them with ==. What does it print? Most people expect "Same!", because the text is the same. It prints "Different!". For objects, == asks whether the two references point to the same object, and these are two separate objects.

Do not explain the fix yet; Part 2 shows the right way to compare. Disposition practiced: collaborative. Timing: 3 minutes.
-->

---

# Last time: objects live elsewhere, and variables point to them

<div class="cols center">
<div class="card blue">

### Primitive variables

Hold the **value** itself: `int`, `double`, `boolean`, `char`.

</div>
<div class="card orange">

### Object variables

Hold a **reference**: an arrow to an object created with `new`.

</div>
</div>

<!--
What did we talk about last time? Objects.

A primitive variable, such as an int, double, boolean, or char, holds its value directly. An object variable holds a reference: an arrow to an object stored somewhere else, created with the new keyword and a constructor.

Keep the arrow picture in mind today. It is the key to the opening question, and it is what a method call follows to find its object. Timing: 2 minutes.
-->

---
layout: center
class: text-center
---

# Questions before we start?

<!--
Pause for questions about objects and references. Repeat each student question aloud before answering so everyone, and the captions, can follow. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# Calling methods on objects

Asking an object a question, or telling it to do something.

<!--
Part 1 of 4. You have called methods on Strings all semester. Now we look at what is really going on, and apply it to any object. Timing: under 1 minute.
-->

---

# An object method can use the data inside its object

<div class="cols center">
<div>

- Before, we wrote **static** methods
- **Object methods** are called **on an object**
- They can use the information **inside** that object

</div>
<div>

<div class="card blue">

### Ask a question

A value-returning method: `h.getWeight()`

</div>

<div class="card orange" style="margin-top: 12px">

### Tell it to do something

A `void` method: `h.bite()`

</div>

</div>
</div>

<!--
Previously we talked about static methods. Object methods are those methods called on objects. They are different from static methods because they can also use information inside the object to perform some task.

Think of them as asking an object a question, for value-returning methods, or telling an object to do something, for void methods. The two cards give an example of each with a Ham object: getWeight asks the ham how heavy it is, and bite tells the ham to lose a bite.

Likely question: "Can one method do both?" It can, but well-designed methods usually do one or the other. Timing: 2 minutes.
-->

---

# A method call is: object, dot, method name, arguments

<div class="cols center">
<div>

```java
String s = new String("Help me!");
char c = s.charAt(3);  // c gets 'p'
```

</div>
<div>

- You already do this with `String` objects
- Type the **object's name**, a **dot**, the **method name**, then the **arguments** in parentheses

</div>
</div>

<div class="callout">Counting starts at 0: H is 0, e is 1, l is 2, p is 3.</div>

<!--
You are already familiar with calling methods on Strings, and applying this knowledge to other objects should be a piece of cake. Simply type the name of the object, put a dot, then type the method name, with the arguments in parentheses.

In the example, s is a String containing "Help me!". s dot charAt with argument 3 asks s for the character at index 3, which is the letter p. The callout counts it out: H is index 0, e is 1, l is 2, and p is 3.

The dot follows the arrow from the variable to its object, and runs the method on that object. Likely question: "What if s is null?" Then there is no object to follow the arrow to, and the program stops with a NullPointerException. Timing: 2 minutes.
-->

---

# Every kind of object has its own methods

```java
Ham h = new Ham(3.2);
h.bite();                       // takes a bite out of the ham
double weight = h.getWeight();  // gets the current ham weight
```

- It works exactly the same way for objects that are not Strings
- You know many `String` methods; other classes have **their own** methods
- To use them, you have to **learn them or look them up**

<!--
It is exactly the same for non-String objects. The example creates a Ham that weighs 3.2 pounds. h dot bite tells the ham to take a bite out of itself. h dot getWeight asks the ham for its current weight, which we store in a double called weight.

You have learned lots of methods that work on String objects. Every kind of object has its own methods, and you will have to learn them, or look them up, if you want to use them. The next slide shows where to look.

Likely question: "Where does the Ham class come from?" Someone has to write it; by the end of today you will be able to. Timing: 2 minutes.
-->

---

# The Java API documents thousands of ready-made classes

<div class="cols center">
<div>

- You can write your own classes and methods
- Java also provides **many, many** useful classes
- Each class's page lists its constructors and methods

</div>
<div class="card">

### How to find a class

- Browse the [Java API documentation](https://docs.oracle.com/en/java/javase/26/docs/api/index.html)
- Or search for the class name, such as **Java String**: the API page is usually the first result

</div>
</div>

<!--
It is possible to create your own classes and define your own methods for objects. However, Java has designed many, many useful classes that you can create objects from.

You can find them listed in the Java API, the application programming interface documentation. The link on the slide is the Java API documentation for Java 26; its address is docs.oracle.com/en/java/javase/26/docs/api/index.html. Other versions of Java have their own pages with the same layout. Or you can type the name of the class you are interested in, like String, into a search engine; the API page is usually the first result.

Show the String page live if you have internet access: the method summary table lists every method, what it takes, and what it returns. Reading documentation is a skill every programmer uses daily. Disposition practiced: self-directed. Timing: 3 minutes.
-->

---

# Check: which call asks the ham a question?

<div class="cols wide-left center">
<div>

```java
Ham h = new Ham(3.2);
h.bite();
double w = h.getWeight();
```

</div>
<div>

<Quiz
  :options="['h.bite()', 'h.getWeight()', 'Both of them']"
  :answer="1"
  explain="h.getWeight(). It returns a value. h.bite() returns nothing: it tells the ham to do something."
/>

</div>
</div>

<!--
Check for understanding. The code creates a ham, calls bite, and then calls getWeight and stores the result. Which call asks the ham a question?

Give 30 seconds, then vote with fingers for A, B, or C. The answer is getWeight: it returns a value, the weight. bite is a void method; it returns nothing and tells the ham to do something.

A quick test: if you can store the call's result in a variable, it asks a question. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Equivalence testing

When are two objects "the same"?

<!--
Part 2 of 4. Back to the opening question. Timing: under 1 minute.
-->

---

# == on objects only asks: same object?

<div class="cols center">
<div class="card blue">

### Primitives

`==` compares the **values**.

`3 == 3` is `true`.

</div>
<div class="card orange">

### Objects

`==` compares the **references**.

It is `true` only if both point to **exactly the same object**.

</div>
</div>

<div class="callout">Sometimes that is what you need, but objects can be equivalent in other ways too.</div>

<!--
How do you tell if two objects are the same? If you have two primitive variables, you just use the == operator, and it compares their values.

However, with objects, == only gives you back true if the two references are pointing at exactly the same object. It compares the arrows, not what they point to.

Sometimes you need to know that, but objects can be equivalent in other ways too: two different String objects can hold exactly the same text. Timing: 2 minutes.
-->

---

# equals() compares what is inside the objects

```java {1-2|3-6|7-10}
String s1 = new String("identical");
String s2 = new String("identical");
if (s1 == s2)
    System.out.println("Same!");
else
    System.out.println("Different!");      // this runs
if (s1.equals(s2))
    System.out.println("Same!");           // this runs
else
    System.out.println("Different!");
```

<p class="small">Every object has an <code>equals()</code> method.</p>

<style>
.slidev-layout { --slidev-code-font-size: 19px; }
</style>

<!--
In this example, the == operator will say they are different, but the equals method will say that they are the same. The highlighted lines move on each click.

Lines 1 and 2 create two separate String objects, both containing "identical". Lines 3 to 6 compare them with ==; they are different objects, so "Different!" is printed. Lines 7 to 10 compare them with equals, which for Strings compares the characters; the text matches, so "Same!" is printed.

Every object has an equals method. For Strings it compares the text. The rule to remember: to compare the contents of two objects, use equals, not ==. Likely question: "Why did == work for me with Strings before?" Two string literals with the same text, written in quotes without new, may share one object, so == can happen to say true. Never rely on it. Timing: 3 minutes.
-->

---

# Try it: == and equals() can disagree

<EqualsDemo />

<!--
This interactive keeps s1 fixed as a new String containing "identical", and lets you choose how s2 is created with the three buttons. The memory diagram on the left shows where each reference points. On the right, two rows show the result of s1 == s2, which asks "same object?", and s1.equals(s2), which asks "same text?". The sentence underneath summarizes the result.

First button, s2 is a new String containing "identical": two separate objects with the same text, so == is false and equals is true. That is the opening question. Second button, s2 equals s1: one object with two names, so both tests are true. Third button, s2 is a new String containing "different": both are false.

Ask students to call out both answers before each click. Timing: 3 minutes.
-->

---

# Check: what do == and equals() say now?

<div class="cols wide-left center">
<div>

```java
String a = new String("cat");
String b = a;
```

<p class="small">What are <code>a == b</code> and <code>a.equals(b)</code>?</p>

</div>
<div>

<Quiz
  :options="['false and true', 'true and true', 'true and false']"
  :answer="1"
  explain="Both true. b = a copies the arrow, so a and b point to the same object, and an object always equals itself."
/>

</div>
</div>

<!--
Check for understanding. a is a new String containing "cat", and b is assigned a. What are a == b and a.equals(b)?

Give 30 seconds, then vote with fingers for A, B, or C. The answer is both true. b equals a copies the reference, so a and b point to the same object: == is true. And an object always has the same contents as itself, so equals is true too.

If something is == another, it is also equal; the reverse is not always true, as the previous slide showed. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# Classes

Writing the template for our own objects.

<!--
Part 3 of 4. So far we have used classes other people wrote. Now we write our own. Timing: under 1 minute.
-->

---

# A class is a template for creating objects

<div class="cols center">
<div>

| | Example |
| --- | --- |
| **Class** | Car |
| **Object** | Mitsubishi Lancer Evolution X |
| **Type** | `int` |
| **Instance** | `34` |

</div>
<div>

- An **object** is the actual data you use in your code
- A **class** is a template for creating objects of a certain kind
- Unlike `int`, you can **define new classes**

</div>
</div>

<!--
An object is the actual data that you can use in your code. A class is a template for creating objects of a certain kind.

The table gives two analogies. The class is Car, and an object is one particular car, a Mitsubishi Lancer Evolution X. Just like int is a type and 34 is an instance of that type.

A key difference is that you can define new classes: Java gives you a fixed set of primitive types, but you can write as many classes as you need. Likely question: "Is a class an object?" No. The class is the blueprint; objects are built from it with new. Timing: 2 minutes.
-->

---

# A class definition holds members, constructors, and methods

<div class="cols wide-left center">
<div>

```java {1,11|2-4|5-7|8-10}
public class Name {
    private int member1;
    private double member2;
    private Hedgehog member3;
    public Name() {
        ...
    }
    public int method1(double x) {
        ...
    }
}
```

</div>
<div class="card">

### Four parts

1. Class definition
2. Member declarations
3. Constructor definition
4. Method definitions

</div>
</div>

<!--
When designing classes, they contain two kinds of elements: members and methods. Here is the anatomy of a class definition; the highlighted lines move through its parts on each click.

Lines 1 and 11 are the class definition: public class, the class name, and braces around everything. Lines 2 to 4 are member declarations: data the object holds, here an int, a double, and an object type, a Hedgehog. Lines 5 to 7 are the constructor definition: it has the same name as the class and no return type. Lines 8 to 10 are a method definition: here a method called method1 that takes a double and returns an int.

The card on the right lists the same four parts. Likely question: "Does the order matter?" Not to Java, but this order is the usual convention and makes classes easy to read. Timing: 3 minutes.
-->

---

# Members are the data inside an object

<div class="cols center">
<div>

- Members are the **actual data** inside an object
- They can be primitive types or object types
- They are usually hidden (**private**) from the outside world

</div>
<div>

```java
public class Point {
    private double x;  // member
    private double y;  // member
}
```

</div>
</div>

<!--
Members are the actual data inside an object. They can be primitive types or other object types. They are usually hidden, which Java writes as private, from the outside world.

The code shows a Point class with two members: a private double called x and a private double called y. Every Point object gets its own x and its own y.

The next slide explains what private actually means. Timing: 2 minutes.
-->

---

# private and public decide who can use a member or method

| Keyword | Who can use the item |
| --- | --- |
| `private` | Only methods in the **same class** |
| `public` | **Any** method |
| `protected` | Comes later, with child classes |

<div class="callout">Usual pattern: members are private, methods are public.</div>

<!--
What do private and public mean? These keywords let you specify the scope, or permissions, of members and methods.

private means that only methods from the same class can access an item. public means that any method can access the item. Later, the modifier protected will come into play when you create child classes, which we will see with inheritance.

The callout is the usual pattern: keep members private and make methods public, so other code works with an object through its methods instead of reaching into its data. Likely question: "Then how does anyone read a private member?" Through a public method, an accessor, in a few slides. Timing: 2 minutes.
-->

---

# Only non-static methods can use an object's members

<div class="cols center">
<div>

- Methods let you **do things**
- Object methods usually work with the members
- They are usually **public**

</div>
<div class="card">

### Static or non-static?

Methods can be either.

Only **non-static** methods can use the members of an object.

</div>
</div>

<!--
Methods allow you to do things. Object methods usually allow you to manipulate the members, and they are usually visible, public, to the outside world.

Methods can be static or non-static. Only non-static methods can interact with the members of an object. A static method belongs to the class as a whole, so it has no particular object whose members it could use.

Every method you wrote before today, including main, was static. Most methods inside our classes will now be non-static. Timing: 2 minutes.
-->

---

# A constructor sets up an object when it is created

```java {4-8}
public class Point {
    private double x;  // member variable
    private double y;  // member variable
    // constructor
    public Point(double newX, double newY) {
        x = newX;
        y = newY;
    }
}
```

<div class="callout">A constructor has the same name as the class and no return type.</div>

<style>
.slidev-layout { --slidev-code-font-size: 19px; }
</style>

<!--
Constructors are a special kind of method. They allow you to customize an object with particular attributes when it is created.

The highlighted lines are the constructor for Point. It is public, it is named Point, the same as the class, and it takes two doubles, newX and newY. Inside, it stores them in the members x and y.

The callout gives the two ways to recognize a constructor: it has the same name as the class, and it has no return type, not even void. Timing: 2 minutes.
-->

---

# A constructor runs once, when new creates the object

<div class="cols center">
<div>

- Constructors are almost always **public**, otherwise no one could create an object
- They are **not called** like other methods
- They run **once**, when the object is created with `new`

</div>
<div>

```java
Point p = new Point(0.5, 0.25);
// the constructor sets
// x to 0.5 and y to 0.25
```

</div>
</div>

<!--
Constructors are almost always public; otherwise you could not create an object. Constructors are not called like other methods: you never write p dot Point. They are invoked once, when an object is created, and the new keyword is used to do this.

The example creates a Point with new Point 0.5, 0.25. Java creates the object and runs the constructor once, which sets x to 0.5 and y to 0.25.

Likely question: "Can I call the constructor again to reset an object?" No. To get a fresh object you call new again, which makes a new object. Timing: 2 minutes.
-->

---

# Accessors read a member; mutators change one

<div class="cols">
<div>

**Accessors**

```java
public double getX() {
    return x;
}
public double getY() {
    return y;
}
```

</div>
<div>

**Mutators**

```java
public void setX(double newX) {
    x = newX;
}
public void setY(double newY) {
    y = newY;
}
```

</div>
</div>

<div class="callout">Members are private, so reading or changing one from outside needs a method.</div>

<!--
Because members are usually private, it is common to use methods specifically just to find out what their values are. A method that just returns the value of a member variable is called an accessor. The left column shows two accessors: getX returns x, and getY returns y.

Again, because members are usually private, it is common to use methods specifically just to change their values. A method that just changes the value of a member variable is called a mutator. The right column shows setX, which stores its parameter newX in x, and setY, which does the same for y.

By convention, accessors start with "get" and mutators with "set". Accessors return a value and take no parameters; mutators take a parameter and return void. Timing: 3 minutes.
-->

---

# Try it: the methods are the only way in

<PointDemo />

<!--
This interactive shows one Point object, called p. The orange box is the object; inside it, a dashed box holds the private members x and y with their current values, and below that is the list of public methods. The buttons along the top are statements you can run, and the box on the right shows the last statement and its result.

Press p.getX: the accessor returns 3, and nothing changes. Press p.setX: the mutator changes x to 8, and the value in the object updates. Press new Point 3, 4 to start again with the constructor.

Now press the last button, p.x = 10, which has a dashed border. The compiler refuses it: x has private access in Point. Outside the class, the only way to reach the members is through the public methods. Timing: 3 minutes.
-->

---

# A static method needs only the class name, not an object

```java
public static double distance(double x1, double y1,
                              double x2, double y2) {
    double xDelta = x1 - x2;
    double yDelta = y1 - y2;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
}
```

```java
double d = Point.distance(0.4, 0.5, 0.3, 2.2);
```

<p class="small">Non-static methods need an object: <code>p.getX()</code>. Static methods need only the class: <code>Point.distance(...)</code>.</p>

<style>
.slidev-layout { --slidev-code-font-size: 19px; }
</style>

<!--
Remember, you need an object to call a non-static method, but you only need to know the name of the class to call a static method. We can put a static distance method inside the Point class.

The method is public static, returns a double, and takes four doubles: the x and y of two points. It computes the difference in x and the difference in y, and returns the square root of the sum of their squares: the distance formula.

The second block calls it with the class name: Point.distance with 0.4, 0.5, 0.3, and 2.2. No Point object is needed. The result is the square root of 0.1 squared plus 1.7 squared, which is the square root of 2.9, about 1.70. Likely question: "Why make it static?" It works only on the numbers it is given and never looks at an object's members. Timing: 3 minutes.
-->

---

# Check: which call needs an object?

<div class="cols wide-left center">
<div>

```java
Point p = new Point(0.5, 0.25);
```

<p class="small">Which of the three calls can only be made on an object such as <code>p</code>?</p>

</div>
<div>

<Quiz
  :options="['Point.distance(0, 0, 3, 4)', 'p.getX()', 'Math.sqrt(16)']"
  :answer="1"
  explain="p.getX(). It is non-static: it returns this point's x, so it needs a Point object. The other two are static."
/>

</div>
</div>

<!--
Check for understanding. p is a Point. Which of the three calls needs an object? A is Point.distance with 0, 0, 3, 4. B is p.getX. C is Math.sqrt of 16.

Give 30 seconds, then vote with fingers for A, B, or C. The answer is B. getX is a non-static method: it returns the x of a particular point, so it must be called on a Point object. A and C are static methods, called with a class name: Point and Math.

Bonus question: what do A and C return? A returns 5.0, the classic 3, 4, 5 triangle, and C returns 4.0. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 4</div>

# Class examples

A Student class and a class roster.

<!--
Part 4 of 4. We put everything from Part 3 together in one useful class. Timing: under 1 minute.
-->

---

# A Student class groups four pieces of data

<div class="cols center">
<div>

| Member | Type |
| --- | --- |
| First name | `String` |
| Last name | `String` |
| GPA | `double` |
| ID | `int` |

</div>
<div class="card orange">

### Methods we need

- A **constructor** that sets all four
- **Accessors** to read them later
- **Mutators** to change GPA and ID

</div>
</div>

<!--
Let's create a Student class. Each Student will contain a first name, a String; a last name, a String; a GPA, a double; and an ID, an int.

We need a constructor specifying each of these things, accessors to read them later, and mutators to change the GPA and the ID.

Write this class together as live coding if time allows. Ask the class why there are mutators for GPA and ID but not for the names: the design decides which data outside code may change. Timing: 6 minutes with live coding.
-->

---

# A roster is an array of Student objects

<div class="cols center">
<div>

- The roster is just an **array of `Student` objects**
- Read student information from a **file**
- Create one `Student` object per line

</div>
<div class="card blue">

### Then, with the array

1. Print a nicely formatted roster
2. Find the average GPA
3. Determine the valedictorian

</div>
</div>

<!--
Using the Student class, we can create a roster of students. The roster is just an array of Student objects. We will read in some student information from a file and create lots of Student objects.

Then, with our array, we can do some operations: print out a nicely formatted roster, find the average GPA of all students, and determine the valedictorian, the student with the highest GPA.

Each operation is a loop over the array that calls accessors on each Student. Timing: 3 minutes.
-->

---

# Try it: three loops over the same array

<RosterDemo />

<!--
This interactive is a roster of five students. The table has one row per Student object: its position in the array, from roster 0 to roster 4, then first name, last name, GPA, and ID. The three buttons run the three operations, and the box underneath states the result in words.

Print roster lists the students. Average GPA highlights the GPA column and shows the sum of the five GPAs divided by 5, which is 3.40. Valedictorian outlines the row with the highest GPA, Cara Diaz with 3.9.

Ask before each click: which accessor does this loop call? The average and the valedictorian both call getGPA on every Student. The names and numbers are made up for the example. Timing: 3 minutes.
-->

---

# Private data in code mirrors private data about people

<div class="cols center">
<div>

- An app's objects often hold **personal data**: location, grades, contacts
- `private` limits which code can read it
- Good design shares **only what each part needs**

</div>
<div class="card orange">

### Discuss in pairs

An app stores your location in an object. Which parts of the app should be able to read it, and why?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Real programs are full of objects that hold personal data: a location, a grade, a list of contacts. Making members private is a small technical habit with the same spirit as a big ethical principle: share only what each part needs.

private limits which code can read a member; a public accessor opens a deliberate, controlled door. Leaving everything public is like giving every part of a company access to every customer record.

Discussion prompt, 90 seconds in pairs: an app stores your location in an object; which parts of the app should be able to read it, and why? Listen for: the map feature needs it, the advertising code should not without permission, and users should be told. Dispositions practiced: responsible and collaborative. Timing: 3 minutes.
-->

---

# Five things to remember from today

- Call a method with **object . method (arguments)**
- `==` on objects asks **same object?**; `equals()` asks **same contents?**
- A **class** is a template; **objects** are made from it with `new`
- Members are usually `private`; methods are usually `public`
- Constructors create, accessors read, mutators change

<!--
Summarize. One: call a method by writing the object, a dot, the method name, and the arguments in parentheses. Two: for objects, == asks whether two references point to the same object, while equals asks whether the contents are the same. Three: a class is a template, and objects are made from it with new. Four: members are usually private and methods usually public. Five: constructors create objects, accessors read members, and mutators change them.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Foundations of Programming Languages (FPL)
- **Related area:** Software Engineering (SE)
- **Competency:** predict the result of == and equals(), and write a class with private members and public methods
- **Dispositions:** collaborative, self-directed, responsible
- **Society and ethics:** sharing personal data only where it is needed
- **Accessibility:** labeled diagrams, text alternatives, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: a class example

<div class="cols">
<div class="card blue">

### Next time

- Class example

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 9

</div>
</div>

<Credit />

<!--
Next time we work through a class example. Reminder: keep reading Chapter 9.

See also: Week 10 Lecture 3 for more on references, aliases, and null. Timing: 1 minute.
-->

---
layout: center
class: text-center
---

# Exit ticket: scan before you leave

<ExitTicket />

<p class="small">If you cannot scan the code, ask for the link.</p>

<!--
Exit ticket. Students scan the QR code to open today's exit ticket form. Read the instruction aloud and offer the link directly to anyone who cannot scan the code; paste the form's address here in the notes before class so you can share it in the chat or on the board.

Timing: 3 minutes.
-->
