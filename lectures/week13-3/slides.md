---
theme: ../../theme
title: COMP 1600 – Week 13, Lecture 3 – Inheritance Mechanics and Overriding
info: |
  We write subclasses in Java with extends and see how a child class can
  override a method it inherits. A vehicle cost calculator puts it all
  together, along with getClass() and instanceof.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 13</div>

# A subclass <span class="hl">extends</span> a class and can override it

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>extends</span>
  <span>Overriding</span>
  <span>Vehicle cost example</span>
  <span>instanceof</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <rect x="20" y="24" width="280" height="272" rx="20" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="44" y="62" class="cover-art-name">Car</text>
    <text x="44" y="96" class="cover-art-name" style="font-weight: 400">startEngine()</text>
    <rect x="44" y="124" width="232" height="148" rx="16" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="66" y="164" class="cover-art-name">Vehicle</text>
    <text x="66" y="200" class="cover-art-name" style="font-weight: 400">travel()</text>
  </svg>
</div>
</div>

<!--
Welcome. Last time we met the idea of inheritance. Today we write it in Java: how to create a subclass, how a subclass can change a method it inherits, and a worked example that calculates travel costs for different vehicles.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Foundations of Programming Languages (FPL) and Software Development Fundamentals (SDF); secondary is Software Engineering (SE) for code reuse and design, with one Society, Ethics, and Professionalism (SEP) touchpoint on the responsibility that comes with reusing code.

See also: Week 13 Lecture 2 (the concept of inheritance and the subclass relationship) and Week 10 (classes, objects, constructors, and references).

Delivery reminders: read on-screen text aloud, describe each diagram in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Write** a subclass with the `extends` keyword <span class="tag">FPL · SDF</span>
- **Predict** which version of a method runs on an object <span class="tag">FPL</span>
- **Override** a method to customize a subclass <span class="tag">SDF</span>
- **Test** an object's type with `instanceof` <span class="tag">FPL</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: FPL is Foundations of Programming Languages and SDF is Software Development Fundamentals.

The second objective, predicting which version of a method runs, is the apply-level skill and a standard exam question: you are given a few small classes and asked what the code prints.

Likely question: "Is inheritance in Project 5?" Answer for your project. Timing: 1 minute.
-->

---

# Predict first: what does this print?

<div class="cols wide-left center">
<div>

```java
Mammal m = new Dog();
m.makeNoise();
```

<p class="small"><code>Mammal</code> prints "Grunt!". <code>Dog</code> is a subclass with its own <code>makeNoise()</code> that prints "Woof".</p>

</div>
<div>

<Quiz
  :options="['Grunt!', 'Woof', 'Compile error']"
  :answer="1"
  explain="Woof. The object is a Dog, so the Dog version runs, whatever the type of the reference."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give 60 seconds with a neighbor before anyone clicks. Low-tech alternative: one, two, or three fingers for A, B, or C.

The Mammal class has a method makeNoise that prints "Grunt!". Dog is a subclass of Mammal with its own makeNoise that prints "Woof". The code stores a new Dog in a Mammal reference and calls makeNoise. What does it print?

The answer is Woof. The object is a Dog, so the Dog version of the method runs, whatever the type of the reference. Do not explain fully yet; we get there in Part 2. Disposition practiced: collaborative. Timing: 3 minutes.
-->

---

# Last time: searching, sorting, and the idea of inheritance

<div class="cols center">
<div class="card blue">

### Searching and sorting

- Linear search: $O(n)$
- Binary search: $O(\log n)$
- Bubble and selection sort: $O(n^2)$

</div>
<div class="card orange">

### Inheritance

- A child class has everything its parent has
- A `Car` can be used wherever a `Vehicle` is expected

</div>
</div>

<!--
What did we talk about last time? Searching, sorting, and inheritance.

Linear search takes O of n time; binary search on a sorted array takes O of log n; bubble sort and selection sort take O of n squared.

For inheritance, we saw the idea: a child class has everything its parent has, and can add more. And Java respects that relationship: a Car can be used wherever a Vehicle is expected, but not the reverse. Today we write the classes. Timing: 2 minutes.
-->

---
layout: center
class: text-center
---

# Project 5: where are you, and what is unclear?

<p class="small">Questions about the project or about last time are welcome now.</p>

<!--
Project 5 check-in and questions. Ask for a show of hands on progress, and take questions about the project and about searching, sorting, or the idea of inheritance. Repeat each student question aloud before answering so everyone, and the captions, can follow.

Fill in any project details you want to announce here. Timing: 4 minutes.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# Inheritance mechanics

How to actually create a subclass.

<!--
Part 1 of 4. All of last time's ideas are well and good, but how do you actually create a subclass? Timing: under 1 minute.
-->

---

# Start with an ordinary class: Vehicle

```java
public class Vehicle {
    public void travel(String destination) {
        System.out.println("Traveling to " + destination);
    }
}
```

<div class="callout">Nothing new here. A superclass is written like any other class.</div>

<!--
All this is well and good, but how do you actually create a subclass? Let's start by writing the Vehicle class.

Vehicle is a public class with one method, travel, which takes a String called destination and prints "Traveling to" followed by the destination.

The callout makes the point: there is nothing special about this class. A superclass is written like any other class; it does not need to know that subclasses will exist. Timing: 2 minutes.
-->

---

# The extends keyword creates a subclass

```java {1|2-4|5-7|all}
public class Car extends Vehicle {
    private String model;
    public Car(String s) { model = s; }
    public String getModel() { return model; }
    public void startEngine() {
        System.out.println("Vrooooom!");
    }
}
```

<div class="callout">A <code>Car</code> can do everything a <code>Vehicle</code> can, plus more.</div>

<!--
We use the extends keyword to create a subclass from a superclass. The highlighted lines move on each click.

Line 1: public class Car extends Vehicle. Those two words, "extends Vehicle", are all it takes. Lines 2 to 4 add things a Vehicle does not have: a private String member called model, a constructor that sets it, and a getModel method that returns it. Lines 5 to 7 add a startEngine method that prints "Vrooooom!".

Notice what is not written: travel. A Car can do everything that a Vehicle can, plus more, and it gets travel without repeating it. Likely question: "Can Car see Vehicle's private members?" No; private members are still inside the object, but only Vehicle's own code can use them. Timing: 4 minutes.
-->

---

# A Car can use Vehicle's methods as its own

```java {1|2-3|4-5|6-7}
Car car = new Car("Camry");
// Prints "Camry"
System.out.println(car.getModel());
// Prints "Vrooooom!"
car.startEngine();
// Prints "Traveling to New York City"
car.travel("New York City");
```

<!--
This is the power of inheritance: there is a part of the Car class that knows all the Vehicle members and methods. The highlighted lines move on each click.

Line 1 creates a Car with the model Camry. Lines 2 and 3 call getModel, which Car defines, and print "Camry". Lines 4 and 5 call startEngine, which Car defines, and print "Vrooooom!". Lines 6 and 7 call travel with "New York City". Car never defined travel, but it works, and prints "Traveling to New York City".

Ask the class before the last click: will the travel line compile? Yes, because Car inherited it from Vehicle. Timing: 3 minutes.
-->

---

# Try it: Java looks in Car first, then deeper in Vehicle

<MethodLookup />

<!--
Each Car object actually has a Vehicle object buried inside of it. If code tries to call a method that is not found in the Car class, it will look deeper and see if it is in the Vehicle class. The outermost method will always be called.

The diagram shows a Car box containing model, getModel, and startEngine, and inside it a Vehicle box containing travel. Choose a method call with the buttons. The method that Java finds is outlined and marked "found", and the text on the right describes the search in words.

car.getModel and car.startEngine are found in Car straight away. car.travel is not in Car, so Java looks deeper and finds it in Vehicle. The last button, car.fly, is in neither, so the code does not compile. "The outermost method will always be called" sets up overriding, next. Timing: 4 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Overriding methods

Changing what an inherited method does.

<!--
Part 2 of 4. Adding to existing classes is nice, but sometimes you want to do more than add. Timing: under 1 minute.
-->

---

# Overriding replaces an inherited method with a new version

<div class="cols center">
<div>

- Sometimes you want to **change** a method, not just add one
- Write a method in the child with the **same name** as one in the parent
- The **child's version** always gets called

</div>
<div class="card orange">

### Overriding

Writing a method in a subclass that replaces the method of the same name in its superclass.

</div>
</div>

<!--
Adding to existing classes is nice. But sometimes you want to do more than add: you want to change a method to do something different.

You can write a method in a child class that has the same name as a method in a parent class. The child version of the method will always get called. This is called overriding a method.

The card gives the definition: overriding is writing a method in a subclass that replaces the method of the same name in its superclass. Likely question: "Does the method need the same parameters?" Yes. Same name and same parameters; otherwise you have added a different method instead of replacing one. Timing: 3 minutes.
-->

---

# Mammal defines the default noise

```java
public class Mammal {
    public void makeNoise() {
        System.out.println("Grunt!");
    }
}
```

<div class="callout">Every mammal can make a noise. By default, it grunts.</div>

<!--
We can define the Mammal class as follows. It has one method, makeNoise, which prints "Grunt!".

So every mammal can make a noise, and unless a subclass says otherwise, the noise is a grunt. This is the version that subclasses will inherit, and may override.

Timing: 1 minute.
-->

---

# Each subclass overrides makeNoise in its own way

```java
public class Dog extends Mammal {
    public void makeNoise() { System.out.println("Woof"); }
}

public class Cat extends Mammal {
    public void makeNoise() { System.out.println("Meow"); }
}

public class Human extends Mammal {
    public void makeNoise() { System.out.println("Hello"); }
}
```

<style>
.slidev-layout { --slidev-code-font-size: 20px; }
</style>

<!--
From there, we can define the Dog, Cat, and Human subclasses, overriding the makeNoise method appropriately.

Dog extends Mammal, and its makeNoise prints "Woof". Cat extends Mammal, and its makeNoise prints "Meow". Human extends Mammal, and its makeNoise prints "Hello".

All three have the same method name with the same empty parameter list as Mammal's, so each one replaces the grunt. Likely question: "What if I add a Horse class with no makeNoise?" Then a Horse inherits the Mammal version and grunts. Timing: 2 minutes.
-->

---

# Try it: the object decides which version runs

<NoiseDemo />

<!--
This interactive answers the opening question. The code always stores the new object in a Mammal reference called m, and then calls m.makeNoise. Choose which kind of object to create with the buttons: Mammal, Dog, Cat, or Human.

With Dog, it prints Woof. With Cat, Meow. With Human, Hello. With a plain Mammal, Grunt. The line under the output says why: the subclass overrides makeNoise, so its version runs.

The key idea: the type of the reference, Mammal, decides which methods you are allowed to call. The type of the object decides which version of the method actually runs. Ask students to call out the output before each click. Timing: 3 minutes.
-->

---

# Check: which noise does an array of mammals make?

<div class="cols wide-left center">
<div>

```java
Mammal[] zoo = { new Cat(),
    new Mammal(), new Dog() };
for (int i = 0; i < zoo.length; i++)
    zoo[i].makeNoise();
```

</div>
<div>

<Quiz
  :options="['Grunt! Grunt! Grunt!', 'Meow Grunt! Woof', 'Meow Meow Meow']"
  :answer="1"
  explain="Meow, Grunt!, Woof. Each element runs the version that belongs to its own object."
/>

</div>
</div>

<!--
Check for understanding. An array of Mammal references holds a new Cat, a new Mammal, and a new Dog. A loop calls makeNoise on each element. What is printed?

Give 45 seconds, then vote with fingers for A, B, or C. The answer is Meow, Grunt!, Woof. Each element runs the version of makeNoise that belongs to its own object.

This is the payoff of inheritance: one loop, written once, handles every kind of mammal, including kinds that are written later. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# An inheritance example

A vehicle cost calculator.

<!--
Part 3 of 4. We design a small program together that uses everything so far. Timing: under 1 minute.
-->

---

# Goal: the cost of a trip depends on the vehicle type

<div class="cols center">
<div>

- Parent class: `Vehicle`
- Child classes: `Car` and `Truck`
- Each child customizes behavior by **overriding** `calculateCost`

</div>
<div class="card orange">

### Goal

Calculate the total cost of traveling a given distance, based on the vehicle type.

</div>
</div>

<!--
Let's use inheritance to make a vehicle cost calculator. The parent class is Vehicle, and the child classes are Car and Truck. Each subclass customizes behavior by overriding the calculateCost method.

The goal: calculate the total cost for traveling a specific distance, based on the vehicle type.

This is a live-coding example. The next two slides give the design; the interactive after them shows the result we are aiming for. Timing: 2 minutes.
-->

---

# Vehicle holds what every vehicle shares

<div class="cols center">
<div>

| Member | Type |
| --- | --- |
| `name` | `String` |
| `costPerMile` | `double` |

</div>
<div class="card blue">

### Methods

- `calculateCost(distance)`: the total travel cost
- `getName()`: the name of the vehicle

</div>
</div>

<!--
The Vehicle class has two members: name, a String, and costPerMile, a double.

We give the Vehicle class two methods. calculateCost takes a double called distance and calculates the total travel cost. getName returns the name of the vehicle.

For a plain vehicle, the cost is the distance times the cost per mile. Likely question: "Why put name in Vehicle and not in Car and Truck?" Because every vehicle has a name; writing it once in the parent means the children get it for free. Timing: 2 minutes.
-->

---

# Car and Truck each add one member and override the cost

<div class="cols">
<div class="card blue">

### `Car`

- Inherits `name`, `costPerMile`
- Adds `fuelEfficiency`: `double`
- Overrides `calculateCost` to include **fuel usage**

</div>
<div class="card orange">

### `Truck`

- Inherits `name`, `costPerMile`
- Adds `cargoWeight`: `double`
- Overrides `calculateCost` to account for **heavier loads**

</div>
</div>

<!--
The Car class has name and costPerMile, which it inherits, plus one new member: fuelEfficiency, a double. It overrides the calculateCost method to include fuel usage.

The Truck class has name and costPerMile, also inherited, plus one new member: cargoWeight, a double. It overrides the calculateCost method to account for heavier loads.

Write the three classes together as live coding. One reasonable design, for the instructor: Car's version returns the Vehicle cost plus distance divided by fuelEfficiency times a fuel price; Truck's version returns the Vehicle cost plus cargoWeight times a rate. Inside an overriding method, super.calculateCost(distance) calls the parent's version. Timing: 8 minutes with live coding.
-->

---

# Try it: one method call, three different costs

<CostCalc />

<!--
This interactive shows the finished calculator. Choose the vehicle type, Vehicle, Car, or Truck, and set the distance with the slider. The table breaks the result of calculateCost into parts and says which class's code produced each part.

At 100 miles: a plain Vehicle at 50 cents per mile costs 50 dollars, all from Vehicle's code. A Car at 40 cents per mile costs 40 dollars from Vehicle's code plus fuel, added by Car's override. A Truck has the per-mile cost, a 10 dollar insurance charge added in Vehicle, which is the next two slides, and a load charge added by Truck's override.

The rates and formulas here are example values chosen for the demonstration; use whatever numbers you write in the live-coded version. The point is that the same call, calculateCost, gives different results depending on the object. Timing: 3 minutes.
-->

---

# getClass() tells you the class of an object

<div class="cols center">
<div>

- New rule: add a **$10 insurance cost** if the vehicle is a truck
- Every object has a `getClass()` method
- Compare the result with `Car.class` or `Truck.class`

</div>
<div>

```java
if (getClass() == Truck.class) {
    baseCost += 10;
}
```

</div>
</div>

<!--
Suppose we add an insurance cost of 10 dollars if the vehicle is a truck. How can code inside Vehicle know what kind of vehicle it is running on?

Every object has a getClass method. We can test to see if an object's getClass method gives back Car.class or Truck.class. By doing so, we can tell the class of a given object.

The code on the right shows the test: if getClass equals Truck.class, add 10 to the base cost. Likely question: "What does getClass give for a subclass of Truck?" That subclass, not Truck, so this test would be false. That is the difference from instanceof, on the next slide. Timing: 3 minutes.
-->

---

# instanceof tests for a type or any of its children

```java
if (this instanceof Truck) {
    baseCost += 10;   // $10 insurance cost for trucks
}
```

<div class="cols" style="margin-top: 16px">
<div class="card blue">

### `getClass()`

True only for **exactly** that class.

</div>
<div class="card orange">

### `instanceof`

True for that class **or any child** of it.

</div>
</div>

<!--
An alternative to the getClass method is the instanceof keyword. You can use it to see if an object has a type, or is a child of the given type.

The code adds 10 dollars to the cost in the Vehicle class when the object is a Truck: if this instanceof Truck, add 10 to baseCost. The word "this" means the object the method is running on.

The two cards compare them: getClass is true only for exactly that class, and instanceof is true for that class or any child of it. Likely question: "Which should I use?" Usually instanceof, because it keeps working when someone adds a subclass. But if you find yourself testing types often, an overridden method is usually the cleaner design. Timing: 3 minutes.
-->

---

# Reused code spreads its mistakes too

<div class="cols center">
<div>

- Every subclass **inherits** the parent's behavior
- A bug in `Vehicle.calculateCost` is a bug in every `Car` and `Truck`
- A fix in the parent fixes them all

</div>
<div class="card orange">

### Discuss in pairs

If you reuse someone else's class and it gives a customer the wrong price, who is responsible?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Inheritance is about safe code reuse, and reuse cuts both ways. Every subclass inherits the parent's behavior, so a bug in Vehicle's calculateCost is a bug in every Car and every Truck. The good news is the same fact in reverse: a fix in the parent fixes them all.

Discussion prompt, 90 seconds in pairs: if you reuse someone else's class and it gives a customer the wrong price, who is responsible? Listen for both sides: the original author should test and document their class; the person who reuses it chose to rely on it and should test their own program. Professionals check the code they build on. Dispositions practiced: responsible and meticulous. Timing: 3 minutes.
-->

---

# Four things to remember from today

- `class Car extends Vehicle` makes `Car` a subclass
- A subclass inherits every member and method, and can add more
- **Overriding:** same method name in the child; the child's version runs
- `instanceof` tests whether an object is a type or one of its children

<!--
Summarize. One: writing "class Car extends Vehicle" makes Car a subclass of Vehicle. Two: a subclass inherits every member and method of its parent, and can add more. Three: overriding means writing a method with the same name in the child; the child's version is the one that runs, whatever the type of the reference. Four: instanceof tests whether an object is a given type or one of its children.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Foundations of Programming Languages (FPL), Software Development Fundamentals (SDF)
- **Related area:** Software Engineering (SE)
- **Competency:** predict and write the behavior of a subclass that overrides a method
- **Dispositions:** collaborative, meticulous, responsible
- **Society and ethics:** responsibility for the code you reuse
- **Accessibility:** labeled diagrams, text alternatives, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: reading and writing files

<div class="cols">
<div class="card blue">

### Next time

- File input and output (I/O)

</div>
<div class="card orange">

### Reminders

- Read Chapter 20
- Keep working on Project 5

</div>
</div>

<Credit />

<!--
Next time we cover file I/O, which stands for input and output: reading from and writing to files. Reminders: read Chapter 20, and keep working on Project 5.

See also: Week 13 Lecture 2 for the idea behind today's code. Timing: 1 minute.
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
