---
theme: ../../theme
title: COMP 1600 – Week 11, Lecture 1 – Members, Methods, Static and Constants
info: |
  We look inside a class: the private members that hold an object's data and
  the public methods that let other code use it. Then we build a Student
  roster, and meet static members and constants declared with final.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 11</div>

# An object keeps its data private and shares <span class="hl">methods</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Members</span>
  <span>Methods</span>
  <span>Class examples</span>
  <span>Static</span>
  <span>Constants</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <rect x="4" y="74" width="118" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="63" y="108" text-anchor="middle" class="cover-art-name">getX()</text>
    <rect x="4" y="194" width="118" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="63" y="228" text-anchor="middle" class="cover-art-name">setX()</text>
    <path d="M122 100 L 178 126" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M122 220 L 178 194" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="180" y="60" width="136" height="200" rx="20" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="248" y="96" text-anchor="middle" class="cover-art-obj">Point</text>
    <rect x="198" y="116" width="100" height="124" rx="12" fill="#ffffff" stroke="#0f172a" stroke-width="3" stroke-dasharray="7 6" />
    <text x="248" y="150" text-anchor="middle" class="cover-art-name" style="font-size: 18px">private</text>
    <text x="248" y="186" text-anchor="middle" class="cover-art-name">x</text>
    <text x="248" y="220" text-anchor="middle" class="cover-art-name">y</text>
  </svg>
</div>
</div>

<!--
Welcome. Today we look inside a class. We separate the two things a class contains, members and methods, write a Student class and use it to build a roster, and then meet two keywords that change how a member behaves: static and final.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) and Foundations of Programming Languages (FPL); secondary is Software Engineering (SE) for encapsulation as a design habit, with one Society, Ethics, and Professionalism (SEP) touchpoint on protecting records such as grades.

See also: Week 10 (objects, references, and constructors from the outside) and Week 13 (inheritance, which builds on today's classes).
-->

---
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Write** a class with private members, a constructor, accessors, and mutators <span class="tag">SDF</span>
- **Use** an array of objects to answer questions about data <span class="tag">SDF</span>
- **Explain** the difference between a static member and a normal member <span class="tag">FPL</span>
- **Declare** constants with `final` and `static final` <span class="tag">FPL</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and FPL is Foundations of Programming Languages.

The first two objectives are the apply-level skills: by the end of class we have written a Student class and used an array of Student objects. Project 4 uses the same pattern.

The difference from last week: last week we used classes other people wrote. This week we write our own.
-->

---
minutes: 2
---

# Predict first: what happens on the second line?

<div class="cols wide-left center">
<div>

```java
Point p = new Point(3, 4);
p.x = 10;
```

<p class="small">In the <code>Point</code> class, <code>x</code> is declared <code>private double x;</code></p>

</div>
<div>

<Quiz
  :options="['x becomes 10', 'x stays 3, silently', 'Compile error']"
  :answer="2"
  explain="Compile error. x is private, so code outside the Point class cannot touch it."
/>

</div>
</div>

<!--
The first line creates a Point with x 3 and y 4. The second line tries to set p.x to 10 from outside the class. In the Point class, x is declared private. What happens? The answer is a compile error: x has private access in Point, so code outside the class cannot read or change it directly.

Why this is a good thing is the subject of today's first half.
-->

---
minutes: 2
---

# Last time: a class is the blueprint for its objects

<div class="cols center">
<div class="card blue">

### Classes

- A class describes a kind of object
- Each object is one **instance** of the class

</div>
<div class="card orange">

### Methods we met

- **Constructors** create objects
- **Accessors** read data
- **Mutators** change data

</div>
</div>

<!--
What did we talk about last time? Classes, and methods: constructors, accessors, and mutators.

A class describes a kind of object, and each object is one instance of that class. We met three kinds of methods: constructors create objects, accessors read their data, and mutators change it.

Today we go through each of those again, slowly, with the code for a complete class in front of us.
-->

---
layout: center
class: text-center
minutes: 4
---

# Project 4: where are you, and what is unclear?

<p class="small">Questions about the project or about last time are welcome now.</p>

<!--
A check-in on Project 4 and questions about last lecture.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Members

The data inside an object.

<!--
Part 1 of 5. A class has two kinds of contents. We start with the data.
-->

---
minutes: 3
---

# Members are the data inside an object

<div class="cols center">
<div>

- Members are the **actual data** inside an object
- They can be primitive types or other object types
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
Members are the actual data inside an object. They can be primitive types or other object types. They are usually hidden, which in Java is written private, from the outside world.

The code shows a class called Point with two members: a private double called x and a private double called y. They are also called member variables. Every Point object gets its own x and its own y.

They are hidden so that the class controls how its data is read and changed. If x could be changed from anywhere, a bug anywhere could corrupt a Point. That is the reason the opening example did not compile.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Methods

The ways to interact with an object.

<!--
Part 2 of 5. The second kind of content in a class: what you can do with it.
-->

---
minutes: 3
---

# Methods are the ways to interact with an object

<div class="cols center">
<div>

- Methods let you **do things**
- Object methods usually work with the members
- They are usually visible (**public**) to the outside world

</div>
<div class="card">

### Static or non-static?

Methods can be either.

Only **non-static** methods can use the members of an object.

</div>
</div>

<!--
Methods allow you to do things. Object methods usually allow you to manipulate the members. They are usually visible, which in Java is written public, to the outside world. So the usual pattern is: private data, public methods.

Methods can be static or non-static. Only non-static methods can interact with the members of an object. A static method belongs to the class and is not called on any particular object, so it has no object's members to work with.

The methods we have been writing all semester, such as main, are static. From now on, most methods inside our classes will be non-static.
-->

---
minutes: 3
---

# A constructor sets up an object when it is created

```java {1-3|4-8|all}
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
Constructors are a special kind of method. They allow you to customize an object with particular attributes when it is created. The highlighted lines move on each click.

Lines 1 to 3 are the class and its two members, as before. Lines 4 to 8 are the constructor: it is public, it is called Point, the same as the class, and it takes two doubles, newX and newY. Inside, it stores them in the members x and y.

So writing new Point 3, 4 creates an object whose x is 3 and whose y is 4. The callout gives the two ways to recognize a constructor: it has the same name as the class, and it has no return type, not even void.
-->

---
minutes: 2
---

# An accessor returns the value of a member

```java
public double getX() {  // accessor for x
    return x;
}

public double getY() {  // accessor for y
    return y;
}
```

<div class="callout">Members are private, so reading one from outside needs a method.</div>

<!--
Because members are usually private, it is common to use methods specifically just to find out what their values are. A method that just returns the value of a member variable is called an accessor.

The code shows two accessors. getX is public, returns a double, and returns x. getY does the same for y. By convention, accessor names start with "get".

Accessors are also called getters. getX does not let other code change x: it hands back a copy of the value, and x itself stays private.
-->

---
minutes: 3
---

# A mutator changes the value of a member

```java
public void setX(double newX) {  // mutator for x
    x = newX;
}

public void setY(double newY) {  // mutator for y
    y = newY;
}
```

<div class="callout">A mutator is the one place where a class can check a new value before accepting it.</div>

<!--
Again, because members are usually private, it is common to use methods specifically just to change their values. A method that just changes the value of a member variable is called a mutator.

The code shows two mutators. setX is public, returns nothing, takes a double called newX, and stores it in x. setY does the same for y. By convention, mutator names start with "set", and they are also called setters.

The callout is the reason to bother: a mutator is the one place where the class can check a new value before accepting it. These two accept anything, but a setGPA method could refuse a negative number. Not every member needs a mutator: only provide one if outside code should be allowed to change that member.
-->

---
minutes: 4
---

# Try it: the methods are the only way in

<PointDemo />

<!--
This interactive shows one Point object, called p. The orange box is the object. Inside it, a dashed box holds the private members x and y with their current values, and below that is the list of public methods. The buttons along the top are statements you can run, and the box on the right shows the last statement and its result.

The p.getX button runs the accessor: it returns 3, and nothing changes. The p.setX button runs the mutator: it changes x to 8, and the value in the object updates. The new Point 3, 4 button starts again.

The last button, p.x = 10, has a dashed border. The compiler refuses it: x has private access in Point. That is the opening question. The only way to reach the members is through the public methods.
-->

---
minutes: 2
---

# Check: which kind of method is this?

<div class="cols wide-left center">
<div>

```java
public String getName() {
    return name;
}
```

<p class="small"><code>name</code> is a private member of the class.</p>

</div>
<div>

<Quiz
  :options="['Constructor', 'Accessor', 'Mutator']"
  :answer="1"
  explain="Accessor. It only returns the value of a member and changes nothing."
/>

</div>
</div>

<!--
The method is public, returns a String, is called getName, and returns the private member name. Which kind of method is it? The answer is an accessor: it only returns the value of a member and changes nothing.

How to tell them apart: a constructor has the class's name and no return type. An accessor returns a member. A mutator takes a parameter and stores it in a member, and usually returns void.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Class examples

A Student class and a class roster.

<!--
Part 3 of 5. We put members, a constructor, accessors, and mutators together in one useful class.
-->

---
minutes: 8
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
Let's create a Student class. Each Student will contain a first name, which is a String, a last name, which is a String, a GPA, which is a double, and an ID, which is an int.

We need a constructor specifying each of these things, accessors to read them later, and mutators to change the GPA and the ID.

There are mutators for GPA and ID but not for the names: the design says which data outside code is allowed to change. One possible outline: public class Student, four private members, a constructor with four parameters, getFirstName, getLastName, getGPA, getID, setGPA, and setID.
-->

---
minutes: 6
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

Each of the three is a loop over the array that calls accessors: a loop that prints, a loop that sums and divides, and the find-the-largest loop.
-->

---
minutes: 3
---

# Try it: three loops over the same array

<RosterDemo />

<!--
This interactive is a roster of five students. The table has one row per Student object: its position in the array, from roster 0 to roster 4, then first name, last name, GPA, and ID. The three buttons run the three operations from the previous slide, and the box underneath states the result in words.

Print roster just lists the students. Average GPA highlights the GPA column and shows the sum of the five GPAs divided by 5, which is 3.40. Valedictorian outlines the row with the highest GPA, Cara Diaz with 3.9, and labels it "highest GPA".

The average and the valedictorian both call the accessor getGPA on every Student. The names and numbers are made up for the example.
-->

---
minutes: 3
---

# Private members protect records such as grades

<div class="cols center">
<div>

- A GPA is a **record about a person**
- If `gpa` were public, any line of code could change it
- With a mutator, the class decides **what** is allowed

</div>
<div class="card orange">

### Discuss in pairs

Who should be allowed to change a student's GPA in a real system? How would the software enforce that?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. A GPA is a record about a person, and people's opportunities depend on it. If the gpa member were public, any line of code anywhere in the program could change it, by accident or on purpose. With a private member and a mutator, the class decides what is allowed: setGPA can refuse a value outside 0 to 4, and it is the one place to add a check or keep a log.

A question to consider: who should be allowed to change a student's GPA in a real system, and how would the software enforce that? Good answers include: only certain roles, a record of who changed what, and the student's right to see their own data. Private members are a small technical habit that supports those larger protections.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# Class variables

Data that belongs to the class as a whole.

<!--
Part 4 of 5. So far every piece of data lived inside one object. Now we meet data shared by all objects of a class.
-->

---
minutes: 2
---

# Some data belongs to the whole class, not to one object

<div class="cols center">
<div>

- Members are the data inside **each object**
- Sometimes data should be linked to the **class as a whole**
- Example: the total number of objects of that kind created so far

</div>
<div class="card orange">

### The question

Where would you store a count of every `Item` ever created?

</div>
</div>

<!--
Objects have members: members are the data inside objects. But sometimes, wouldn't it be nice if some data were linked to the class as a whole, rather than just to one object?

What if you wanted to keep track of the total number of a particular kind of object you create? The card asks the question: where would you store a count of every Item ever created?

It cannot live in one Item object: which one, and what happens before the first one exists? It has to live with the class.
-->

---
minutes: 4
---

# A static member is stored once, with the class

```java {2|3|4-7|9-11|all}
public class Item {
    private static int count = 0;  // one copy in total
    private String name;           // one copy per object
    public Item(String s) {
        name = s;
        ++count;                   // updates the shared counter
    }
    public String getName() { return name; }
    public static int getItemsInUniverse() {
        return count;
    }
}
```

<style>
.slidev-layout { --slidev-code-font-size: 20px; }
</style>

<!--
Static members are stored with the class, not with the object. The highlighted lines move on each click.

Line 2: count is declared private static int and starts at 0. There is one copy in total, however many Item objects exist. Line 3: name is a normal member, so there is one copy per object. Lines 4 to 7 are the constructor: it stores the name in the new object, and it adds one to count, updating the shared counter. Line 8 is an ordinary accessor for name. Lines 9 to 11 are a static method, getItemsInUniverse, which returns count.

Because that last method is static, we call it on the class: Item.getItemsInUniverse, with no object needed.
-->

---
minutes: 3
---

# Try it: one count for the class, one name per object

<StaticDemo />

<!--
This interactive runs the Item class. On the left, a blue box is the Item class, holding the single static member count. On the right is the space for Item objects, each of which will hold its own name. The box at the bottom describes what the last statement did.

Pressing new Item three times adds three orange objects, each with its own name, Sword, Shield, Potion, and the count in the class box goes up by one each time. There is always exactly one count, however many objects there are. After a fourth press there would be four names and one count.

The Item.getItemsInUniverse button returns the count, and the text points out that it is a static method called on the class itself. Reset starts over.
-->

---
minutes: 3
---

# Static members follow three rules, and one warning

<div class="cols center">
<div>

- Static members are also called **class variables**
- **Any** method can use them, static or not
- They can be `public` or `private`

</div>
<div class="card orange">

### Warning

In general, static variables should **not** be used.

Shared data that anything can change is hard to reason about.

</div>
</div>

<p class="small">The reverse does not work: a static method cannot use normal members.</p>

<!--
Static members are also called class variables. Static members can be accessed by either static methods or regular methods. That is unlike normal members, which cannot be accessed by static methods, because a static method has no object to look inside. Static members can be either public or private.

The warning on the right: in general, static variables should not be used. A static variable is shared by the whole program, so any code that can reach it can change it, and that makes programs hard to reason about and to test. The counter is a reasonable use; most data belongs in objects.

Java has them for the few things that really are one-per-class, and, combined with final, for constants, which is the last part of today.
-->

---
minutes: 2
---

# Check: how many copies of each member exist?

<div class="cols wide-left center">
<div>

```java
Item a = new Item("Sword");
Item b = new Item("Shield");
Item c = new Item("Potion");
```

<p class="small"><code>count</code> is static. <code>name</code> is not.</p>

</div>
<div>

<Quiz
  :options="['3 counts, 3 names', '1 count, 3 names', '1 count, 1 name']"
  :answer="1"
  explain="One count, shared by the class and now equal to 3, and three names, one inside each object."
/>

</div>
</div>

<!--
Three Item objects are created: Sword, Shield, and Potion. count is static and name is not. How many copies of each member exist?

The answer is one count and three names. The single count is stored with the class and now equals 3. Each of the three objects has its own name. Item.getItemsInUniverse now returns 3.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 5</div>

# Constants

Values that never change once they are set.

<!--
Part 5 of 5. The last keyword of the day: final.
-->

---
minutes: 2
---

# The final keyword makes a member constant

<div class="cols center">
<div>

- Some values never change after an object is created
- Example: a ball keeps **one color** for its whole life
- `final` enforces it

</div>
<div class="card blue">

### A `final` member

Can be assigned a value **only once**.

Afterwards, it never changes.

</div>
</div>

<!--
Members can be constant. Sometimes a value will not change after an object has been created. For example, a ball has a single color after it is created.

You can enforce the fact that the value will not change with the final keyword. A member declared final can only be assigned a value once. Afterwards, it will never change.

"Enforce" is the important word: without final, not changing the color is a promise. With final, the compiler checks it.
-->

---
minutes: 3
---

# A final member is set once, usually in the constructor

```java {3|4-7|8-10}
public class Animal {
    private String name;
    private final boolean MAMMAL;  // never changes
    public Animal(String s, boolean mammal) {
        name = s;
        MAMMAL = mammal;           // set once, here
    }
    public void evolve() {
        MAMMAL = !MAMMAL;          // compile-time error!
    }
}
```

<p class="small">By custom, constant names are written in ALL CAPS.</p>

<style>
.slidev-layout { --slidev-code-font-size: 19px; }
</style>

<!--
Using final, we can fix the value of a member. It will only be set once, usually when the constructor is called. It is customary to use all capital letters for constant names. The highlighted lines move on each click.

Line 3: MAMMAL is declared private final boolean. Lines 4 to 7 are the constructor, which sets name, and sets MAMMAL from its parameter: that is the one assignment allowed. Lines 8 to 10 are a method called evolve that tries to flip MAMMAL. That line is a compile-time error: a final member cannot be assigned again.

The error is the feature. A whole category of bug, changing something that should never change, is caught before the program runs.
-->

---
minutes: 2
---

# A static final member is a constant for the whole class

<div class="cols center">
<div>

- `static` + `final`: **one copy** that **never changes**
- Used for global constants
- Making these `public` is reasonable

</div>
<div class="card orange">

### Why public is safe here

The value can never change, so no user can corrupt the data inside an object.

</div>
</div>

<!--
It is possible to set a static member to be constant using the final keyword. Putting the two keywords together gives one copy, stored with the class, that never changes. Usually, this is used for global constants that will never ever change.

Making these values public is reasonable. Since they never change, we never have to worry about a user corrupting the data inside of the object.

This is the exception to both of today's warnings: public data is normally risky, and static data is normally discouraged, but a value that cannot change is safe to share with everyone.
-->

---
minutes: 3
---

# Pentagon.SIDES works exactly like Math.PI

```java {4}
public class Pentagon {
    private double x;
    private double y;
    public static final int SIDES = 5;  // never changes
    public Pentagon(double newX, double newY) {
        x = newX;
        y = newY;
    }
    public double getX() { return x; }
    public double getY() { return y; }
}
```

<p class="small">Other code reads it as <code>Pentagon.SIDES</code>, just like <code>Math.PI</code> or <code>Math.E</code>.</p>

<style>
.slidev-layout { --slidev-code-font-size: 20px; }
</style>

<!--
The number of sides of a pentagon is always 5. Line 4, highlighted, declares it: public static final int SIDES equals 5. The rest of the class is ordinary: two private members x and y, a constructor, and two accessors.

Other code can access this information by using the value Pentagon.SIDES. That is exactly like Math.PI or Math.E, which are public static final members of the Math class. You have been using static constants all semester.

Why not just write 5? A name says what the number means, and if the value is used in twenty places it is defined in one.
-->

---
minutes: 3
---

# Check: which line does not compile?

<div class="cols wide-left center">
<div>

```java
public class Ball {
    public static final int MAX = 10;
    private final String COLOR;
    public Ball(String c) {
        COLOR = c;          // A
    }
    public void paint() {
        COLOR = "red";      // B
    }
}
```

</div>
<div>

<Quiz
  :options="['Line A', 'Line B', 'Both compile']"
  :answer="1"
  explain="Line B. COLOR is final and was already set in the constructor, so it cannot be assigned again."
/>

</div>
</div>

<style>
.slidev-layout { --slidev-code-font-size: 20px; }
</style>

<!--
The Ball class has a public static final int MAX equal to 10 and a private final String COLOR. Line A, in the constructor, assigns COLOR from the parameter. Line B, in a method called paint, assigns COLOR the value "red". Which line does not compile?

The answer is line B. COLOR is final, and it was already set once in the constructor, so it cannot be assigned again.

Line A is fine: a final member gets exactly one assignment, and the constructor is the usual place for it.
-->

---
minutes: 2
---

# Five things to remember from today

- **Members** are an object's data, usually `private`
- **Methods** are how other code uses the object, usually `public`
- Constructor creates, accessor reads, mutator changes
- A `static` member is one copy for the whole class
- `final` means set once; `static final` is a shared constant

<!--
In summary. One: members are an object's data, and they are usually private. Two: methods are how other code uses the object, and they are usually public. Three: a constructor creates an object, an accessor reads a member, and a mutator changes one. Four: a static member is stored once, with the class, and shared by all its objects. Five: final means a member is set once and never changes, and static final makes a constant shared by the whole class, like Math.PI.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Foundations of Programming Languages (FPL)
- **Related area:** Software Engineering (SE)
- **Competency:** write a class with private members and public methods, and use an array of its objects
- **Dispositions:** meticulous, collaborative, responsible
- **Society and ethics:** protecting personal records such as grades
- **Accessibility:** labeled diagrams, text alternatives, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
This slide records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.
-->

---
minutes: 1
---

# Next time: more class examples

<div class="cols">
<div class="card blue">

### Next time

- More class examples

</div>
<div class="card orange">

### Reminders

- Work on Project 4
- Keep reading Chapter 9

</div>
</div>

<Credit />

<!--
Next time we work through more class examples. Reminders: work on Project 4, and keep reading Chapter 9.

See also: Week 10 on objects and references, which is what a Student variable or a roster element really holds.
-->

---
layout: center
class: text-center
minutes: 3
---

# Exit ticket: scan before you leave

<ExitTicket />

<p class="small">If you cannot scan the code, ask for the link.</p>

<!--
The exit ticket: scanning the QR code opens today's exit ticket form. If you cannot scan the code, ask for the link.
-->
