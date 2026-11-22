---
theme: ../../theme
title: COMP 1600 – Week 2, Lecture 3 – Expressions, Casting, Math Methods and Booleans
info: |
  We work out complex expressions using order of operations, convert a double
  to an int with a cast, and call Math methods such as sqrt, sin and round.
  Then we combine true and false values with the boolean operators NOT, AND,
  OR and XOR.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 2</div>

# Methods like <span class="hl">Math.sqrt()</span> do the math Java's operators can't

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Order of operations</span>
  <span>Casting</span>
  <span>Math methods</span>
  <span>Boolean operators</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <path d="M40 260 L 280 260 L 280 80 Z" fill="#eef2ff" stroke="#3730a3" stroke-width="4" />
    <rect x="256" y="236" width="24" height="24" fill="none" stroke="#3730a3" stroke-width="3" />
    <text x="160" y="296" text-anchor="middle" class="cover-art-name">a</text>
    <text x="302" y="178" text-anchor="middle" class="cover-art-name">b</text>
    <text x="138" y="152" text-anchor="middle" class="cover-art-obj">c</text>
    <text x="160" y="40" text-anchor="middle" class="cover-art-obj" style="font-size: 22px">Math.sqrt(a*a + b*b)</text>
  </svg>
</div>
</div>

<!--
This lecture has three parts. First, complex expressions: how Java uses order of operations, how parentheses change it, and how casting converts a double into an int. Second, advanced operations on numbers, done by calling methods in the Math class, such as sine, square root, and rounding, with two worked examples. Third, operations on boolean values: NOT, AND, OR, and XOR, and short circuit evaluation.

The drawing on the right is a right triangle with legs a and b and hypotenuse c, with the Java code Math.sqrt(a*a + b*b) that computes c. That is one of today's worked examples.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for expressions, casting, calling library methods, and boolean logic; secondary are Foundations of Programming Languages (FPL) for precedence and type conversion, and Mathematical and Statistical Foundations (MSF) for logic and trigonometry.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Evaluate** an int expression using order of operations <span class="tag">FPL</span>
- **Cast** a double to an int, and round it correctly <span class="tag">SDF</span>
- **Call** a Math method and store its result <span class="tag">SDF</span>
- **Evaluate** a boolean expression with `! && || ^` <span class="tag">MSF</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: FPL is Foundations of Programming Languages, SDF is Software Development Fundamentals, and MSF is Mathematical and Statistical Foundations.
-->

---
minutes: 1
---

# Last time: input review and basic math operations

<div class="cols center">
<div class="card blue">

### Input

- Scanner: import, create, use

</div>
<div class="card orange">

### Math operations

- `+` &nbsp; `-` &nbsp; `*` &nbsp; `/` &nbsp; `%`

</div>
</div>

<!--
What did we talk about last time? A review of input with Scanner, and the basic math operations: plus, minus, times, divide, and mod, on ints and on doubles.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: Scanner input and the five arithmetic operators, especially integer division and mod.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Complex expressions

Order of operations, parentheses, and casting.

<!--
Part 1 of 3. How complex can expressions get, and how Java decides what to do first.
-->

---
minutes: 2
---

# Predict first: what's the value of a?

<div class="cols wide-left center">
<div>

```java
int a = 31;
int b = 16;
int c = 1;
int d = 2;
a = b + c * d - a / b / d;
```

</div>
<div>

<Quiz
  :options="['0', '16', '18']"
  :answer="2"
  explain="18. * and / go first, left to right: c * d is 2, a / b is 1, and 1 / d is 0. Then 16 + 2 - 0 is 18."
/>

</div>
</div>

<!--
How complex can expressions get? The code sets a to 31, b to 16, c to 1, and d to 2, then computes b + c * d - a / b / d and stores it back in a. What's the value of a?

The answer is 18. The next slide works it out step by step.

0 is what you get by working strictly left to right, ignoring order of operations. 16 is the answer to a different expression with parentheses, coming up two slides from now.
-->

---
minutes: 2
---

# Order of operations holds, like in math: 18

<div class="steps">

<div>a = b + c * d - a / b / d</div>
<div v-click>a = 16 + <b>1 * 2</b> - <b>31 / 16</b> / 2</div>
<div v-click>a = 16 + 2 - <b>1 / 2</b></div>
<div v-click>a = <b>16 + 2 - 0</b></div>
<div v-click class="ans">a = 18</div>

</div>

<p class="small">Multiply and divide before add and subtract; operators at the same level go left to right.</p>

<style>
.steps { display: flex; flex-direction: column; gap: 12px; font-family: var(--slidev-font-mono, monospace); font-size: 28px; }
.steps b { color: var(--c-accent-2); }
.steps .ans { font-size: 36px; font-weight: 700; color: var(--c-accent); }
</style>

<!--
Order of operations holds like in math: multiplication and division, along with mod, come before addition and subtraction, and operators at the same level are worked left to right.

Step by step. Substituting the values: 16 + 1 * 2 - 31 / 16 / 2. The multiply and the first divide go first: 1 * 2 is 2, and 31 / 16 is 1, because integer division drops the fraction of 1.9375. Then the remaining divide: 1 / 2 is 0, again integer division. That leaves 16 + 2 - 0, worked left to right, which is 18.

The two divisions show why left to right matters: 31 / 16 / 2 means (31 / 16) / 2, which is 0, not 31 / (16 / 2), which would be 3.
-->

---
minutes: 2
---

# Parentheses clarify or change the order: now a is 16

<div class="cols wide-left center">
<div>

```java
int a = 31;
int b = 16;
int c = 1;
int d = 2;
a = (((b + c) * d) - a / b) / d;
```

</div>
<div class="steps2">

<div v-click>((16 + 1) * 2) = 34</div>
<div v-click>31 / 16 = 1</div>
<div v-click>(34 - 1) / 2 = 33 / 2</div>
<div v-click class="ans">a = 16</div>

</div>
</div>

<style>
.steps2 { display: flex; flex-direction: column; gap: 12px; font-family: var(--slidev-font-mono, monospace); font-size: 24px; }
.steps2 .ans { font-size: 32px; font-weight: 700; color: var(--c-accent); }
</style>

<!--
You can use parentheses to clarify or change the precedence. The same values, with parentheses added: (((b + c) * d) - a / b) / d.

Inner parentheses first: b + c is 17, and 17 times d is 34. Inside the outer parentheses, a / b still goes before the minus: 31 / 16 is 1. So the parentheses hold 34 - 1, which is 33. Finally 33 / 2 is 16, since integer division drops the half. Now a is 16.

Extra parentheses that do not change the order are still useful: they make the intended order obvious to whoever reads the code.
-->

---
minutes: 2
---

# Casting converts a double into an int, on purpose

- A double **cannot** be stored directly in an int variable
- A **cast** converts it: you accept the loss of precision
- An int can **always** be stored in a double

```java
int a = 2.6;        // fails!
int a = (int)2.6;   // succeeds! (a = 2)
```

<!--
You cannot directly store a double value into an int variable: int a = 2.6 fails with a compile error, "possible lossy conversion from double to int". However, you can cast the double value to convert it into an int. A cast is the type name in parentheses in front of the value: (int)2.6 succeeds, and a becomes 2.

Casting tells the compiler that you want the loss of precision to happen. The fraction is dropped, not rounded, just as with integer division: (int)2.6 is 2, not 3.

The other direction needs no cast: you can always store an int into a double, because every int value fits in a double without losing anything. double x = 5 stores 5.0.
-->

---
minutes: 1.5
---

# `System.out.format()` prints a double with a set number of decimals

```java
double x = 5.74961;
System.out.format("%.2f", x); // prints 5.75

// prints Total = $15.78 before tax
System.out.format("Total = $%.2f before tax", 15.7777);
```

- For Project 1: `"%.2f"` or `"%.3f"` gives 2 or 3 decimal places
- Include **other text** in the formatting string to save effort

<!--
A reminder for Project 1: the easiest way to print out data with 2 or 3 decimal places is to put "%.2f" or "%.3f" in the formatting string for System.out.format.

The first example prints x, 5.74961, rounded to 2 decimal places: 5.75. You can save a lot of effort by including other text in the formatting string: the second example prints "Total = $15.78 before tax", with the placeholder replaced by 15.7777 rounded to 2 places.

Note the difference from casting: format rounds the number for printing, while a cast drops the fraction.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Advanced operations on numbers

Methods do what the operators can't.

<!--
Part 2 of 3. Operations on numbers beyond plus, minus, times, divide, and mod.
-->

---
minutes: 1
---

# Adding is great, but some operations need methods

- `+ - * / %` are built in: the computer does them **directly**
- Many other operations are useful with numbers
- They are done by **calling methods**
- Methods will become very important later

<!--
Java has plus, minus, times, divide, and mod built in because the computer can do those directly; the processor has instructions for them. There are operations beyond those that you probably want to do with numbers, like square roots, powers, and trigonometry. A number of other operations can be done by calling methods. Methods will end up being very important to us later in the course.
-->

---
minutes: 1.5
---

# A method is packaged code you can use over and over

<div class="cols center">
<div>

- Usually takes some **input** and gives some **output**
- `System.out.println()` is a method
- Calling a method always needs **parentheses**

</div>
<div class="card">

### Input → method → output

`Math.sqrt(16.0)` → **4.0**

</div>
</div>

<!--
A method is a piece of Java code that has been packaged up so that you can use it over and over. Usually, a method will take some input and give some output. System.out.println is an example of a method: its input is what to print, and its output is the text on the screen.

Using a method is called calling it, and it always requires parentheses, even when there is no input. The card shows one call: Math.sqrt with input 16.0 gives back the output 4.0.
-->

---
minutes: 1.5
---

# Method example: `Math.sin()` finds the sine of an angle

<div class="cols center">
<div>

- Finds the sine of an angle **in radians**
- Lives inside the **Math** class
- Gives back a **double**

</div>
<div class="card">

### To use it

```java
double value = Math.sin(2.4);
```

</div>
</div>

<!--
The sin method allows you to find the sine of an angle, in radians, not degrees. This method is inside the Math class. The answer that it gives back is of type double. To use it, you might type double value = Math.sin(2.4); value then holds about 0.675.

Radians: a full circle is 2 pi radians, which is 360 degrees, so 2.4 radians is about 137.5 degrees.
-->

---
minutes: 2
---

# A method call has up to four parts

<div class="msyn" aria-label="result = class.method( input );">
  <span class="ms r">result</span> = <span class="ms c">class.</span><span class="ms m">method</span>( <span class="ms i">input</span> );
</div>

<div class="mlist">

<div v-click><span class="ms i">input</span> If the method takes input, put it inside the parentheses; if not, leave them empty</div>
<div v-click><span class="ms m">method</span> Next, give the name of the method you are calling</div>
<div v-click><span class="ms c">class.</span> Unless the method is inside your class, supply a class name and a dot</div>
<div v-click><span class="ms r">result</span> You can store the result, if the variable matches the type the method gives back</div>

</div>

<style>
.msyn { font-family: var(--slidev-font-mono, monospace); font-size: 40px; font-weight: 700; text-align: center; margin: 6px 0 22px; }
.ms { padding: 2px 8px; border-radius: 8px; border: 3px solid; }
.ms.r { border-color: #0f172a; }
.ms.c { border-color: var(--c-accent); color: var(--c-accent); }
.ms.m { border-color: var(--c-accent-2); color: var(--c-accent-2); }
.ms.i { border-color: #15803d; color: #15803d; border-style: dashed; }
.mlist { display: flex; flex-direction: column; gap: 10px; font-size: 21px; }
.mlist > div { display: grid; grid-template-columns: 110px 1fr; align-items: baseline; }
.mlist .ms { justify-self: start; }
.mlist .ms { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; margin-right: 10px; border-width: 2px; }
</style>

<!--
The general syntax of a method call is result = class.method( input ). The line is shown with each part boxed: result in black, class and the dot in indigo, method in orange, and input dashed in green.

The four parts, one at a time. First, if your method takes input, you put it inside the parentheses; if not, you leave them empty, but the parentheses are still required. Next, you must give the name of the method you are calling. Unless the method is inside your own class, you must supply a class name and a dot, as in Math dot. Finally, you can store the result of the method, as long as the variable matches the type that the method gives back: Math.sin gives back a double, so its result goes in a double variable.

In Math.sin(2.4): the class is Math, the method is sin, and the input is 2.4.
-->

---
minutes: 2
---

# Casting does not round; `Math.round()` does

<div class="cols center" style="grid-template-columns: 1fr 1.35fr">
<div>

- Converting a double to an int **drops the fraction**
- Positive numbers: like **floor**
- Negative numbers: like **ceiling**

</div>
<div>

```java
double x = 2.6;
int a = (int)Math.round(x);  // rounds
```

<p class="small"><code>Math.round</code> gives back a <code>long</code>, so it still needs <code>(int)</code>.</p>

</div>
</div>

<!--
In Java, the conversion of a double into an int does not use rounding. As in the case of integer division, the fractional part is dropped. For positive numbers, that's like using floor, which goes down to the next whole number: (int)2.6 is 2. For negative numbers, that's like using ceiling, which goes up: (int)-2.6 is -2. Either way, the result moves toward zero.

The right way to do rounding is to call Math.round. In the code, x is 2.6, and (int)Math.round(x) gives 3. Math.round gives back a long, a bigger integer type, so the (int) cast is still needed to store it in an int; this cast loses nothing, because the value is already whole.
-->

---
minutes: 2.5
---

# Try it: cast, round, floor, and ceiling on a number line

<RoundDemo :start="2.6" />

<!--
The interactive has a slider for a double x from negative 3.0 to 3.0, a number line showing where x is, and four ways of turning x into a whole number.

(int) x drops the fraction, toward zero. Math.round(x) gives the nearest whole number, with halves going up. Math.floor(x) gives the next whole number down, and Math.ceil(x) the next whole number up; these two give back doubles, so they print with .0.

At 2.6: the cast gives 2, round gives 3, floor 2.0, and ceiling 3.0. At negative 2.6: the cast gives negative 2, like ceiling, while floor gives negative 3.0 and round gives negative 3. At negative 2.5, round gives negative 2, because halves go up, toward positive infinity. Ceiling of a small negative number such as negative 0.5 prints as -0.0: doubles have a negative zero.
-->

---
minutes: 2
---

# Other Math methods do powers, roots, logs, and more

| Return type | Name | Job |
| --- | --- | --- |
| `double` | `sin(double theta)`, `cos`, `tan` | Sine, cosine, tangent of angle theta |
| `double` | `exp(double a)` | Raise e to the power of a (e<sup>a</sup>) |
| `double` | `log(double a)` | Natural log of a |
| `double` | `pow(double a, double b)` | Raise a to the power of b (a<sup>b</sup>) |
| `long` | `round(double a)` | Round a to the nearest integer |
| `double` | `random()` | A random number in [0, 1) |
| `double` | `sqrt(double a)` | Square root of a |
| `double` | `toDegrees(double radians)` | Convert radians to degrees |
| `double` | `toRadians(double degrees)` | Convert degrees to radians |

<style>
table { font-size: 19px !important; }
td, th { padding-top: 3px !important; padding-bottom: 3px !important; }
</style>

<!--
Other Math methods, with the type each gives back, its name and input, and its job.

sin, cos, and tan, each taking a double theta, find the sine, cosine, and tangent of angle theta, in radians. exp of a raises e to the power of a. log of a finds the natural log of a. pow of a and b raises a to the power of b; this is how Java does powers, since there is no power operator. round of a rounds a to the nearest integer and gives back a long. random, with no input, creates a random number from 0 up to but not including 1. sqrt of a finds the square root of a. toDegrees converts radians to degrees, and toRadians converts degrees to radians.

All of them are called with Math and a dot in front, for example Math.pow(2, 10), which is 1024.0.
-->

---
minutes: 3
---

# Pythagorean theorem: compute the hypotenuse of a triangle

<div class="cols center">
<div>
<svg viewBox="0 0 320 220" class="tri" role="img" aria-label="A right triangle with horizontal leg a along the bottom, vertical leg b on the right, and hypotenuse c on the diagonal.">
  <path d="M20 190 L 280 190 L 280 30 Z" class="t-shape" />
  <rect x="258" y="168" width="22" height="22" class="t-right" />
  <text x="150" y="214" class="t-lab">a</text>
  <text x="300" y="116" class="t-lab">b</text>
  <text x="132" y="96" class="t-lab c">c</text>
</svg>

$$a^2 + b^2 = c^2$$

</div>
<div>

```java {1-2|3|4}
double a = 3.0;
double b = 4.0;
double c = Math.sqrt(a * a + b * b);
// c is 5.0
```

<p v-click="3" class="small">Also works: <code>Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))</code></p>

</div>
</div>

<style>
.tri { width: 100%; max-height: 220px; }
.t-shape { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 4; }
.t-right { fill: none; stroke: var(--c-accent); stroke-width: 3; }
.t-lab { text-anchor: middle; font-family: var(--slidev-font-mono, monospace); font-size: 26px; font-weight: 700; fill: var(--c-accent); }
.t-lab.c { fill: var(--c-accent-2); }
</style>

<!--
Compute the hypotenuse of a right triangle. The diagram shows a right triangle with the horizontal leg a along the bottom, the vertical leg b on the right, a small square marking the right angle between them, and the hypotenuse c on the diagonal. The Pythagorean theorem says a squared plus b squared equals c squared, so c is the square root of a squared plus b squared.

In Java, with a = 3.0 and b = 4.0: c = Math.sqrt(a * a + b * b). a * a + b * b is 9 + 16, which is 25, and its square root is 5.0. Squaring with a * a is simple and exact; Math.pow(a, 2) works too, as shown underneath. There is no squaring operator: 3 ^ 2 in Java is not 9, because ^ means something else entirely, as Part 3 shows.
-->

---
minutes: 4
---

# Shooting a cannon: split the speed into x and y parts

<CannonDemo />

<!--
If you're shooting a cannon at velocity v metres per second, at an angle theta above the horizon, what are the x and y components of the cannon ball's speed?

The diagram shows the cannon, with a black arrow v pointing out of it at angle theta, and the arrow split into two dashed parts: x, along the ground, in indigo, and y, straight up, in orange. The three arrows form a right triangle with v as the hypotenuse, so trigonometry gives the parts: x is v times the cosine of theta, and y is v times the sine of theta.

In Java, the angle is first converted with rad = Math.toRadians(theta), because sin and cos expect radians while the angle is given in degrees. Then x = v * Math.cos(rad) and y = v * Math.sin(rad).

The sliders set theta, from 0 to 90 degrees, and v, from 10 to 60 metres per second. At 30 degrees and 50 metres per second, x is about 43.30 and y is 25.00. At 0 degrees all the speed is in x; at 90 degrees, all of it is in y; at 45 degrees the two parts are equal.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Operations on booleans

Combining true and false.

<!--
Part 3 of 3. The operations on the boolean type.
-->

---
minutes: 1
---

# Booleans seem simple, but they combine in useful ways

- The boolean type seems so simple: just `true` and `false`
- What on earth would we want to do with it?
- Like numbers, booleans **combine** with operators
- You may know these operations from a **logic** course

<!--
The boolean type seems so simple. What on earth would we want to do with it? Just like numerical types, we can combine booleans in various ways, with operators. You might be familiar with these operations if you've taken a course in logic. They will matter a lot in a couple of weeks, when programs start making decisions with conditionals.
-->

---
minutes: 1
---

# The ! operator (NOT) flips true and false

<div class="cols center">
<div>

- The **NOT** operator
- Changes a true into a false, or a false into a true

</div>
<div>

| `x` | `!x` |
| --- | --- |
| `true` | `false` |
| `false` | `true` |

</div>
</div>

<!--
The exclamation mark is the NOT operator. It changes a true into a false or a false into a true. The table, called a truth table, lists every possible value of x and the result: when x is true, NOT x is false; when x is false, NOT x is true.
-->

---
minutes: 1
---

# The way we combine statements makes a difference

<div class="cols center">
<div class="card blue">

### Two true statements

- Politicians lie. *(True)*
- Cast iron sinks. *(True)*

</div>
<div class="card orange">

### Combined badly

Politicians lie in cast iron sinks. *(Absurd)*

</div>
</div>

<!--
We can combine statements in logic together to make other interesting statements. The way we combine them makes a difference. For example: "Politicians lie" is true. "Cast iron sinks" is true. But "Politicians lie in cast iron sinks" is absurd. Words in English can be glued together in ambiguous ways; Java's boolean operators combine statements in exactly defined ways, given by their truth tables.
-->

---
minutes: 1.5
---

# The && operator (AND) is true only if both are true

<div class="cols center">
<div>

- The **AND** operator
- *If I can swim AND the pool is not filled with acid, then I will survive*

</div>
<div>

| `x` | `y` | `x && y` |
| --- | --- | --- |
| `true` | `true` | **`true`** |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

</div>
</div>

<!--
The double ampersand is the AND operator. It gives back true only if both things being combined are true. For example: if I can swim AND the pool is not filled with acid, then I will survive. Both conditions are needed.

The truth table lists all four combinations of x and y. x && y is true only in the first row, where both are true; in the other three rows it is false.
-->

---
minutes: 1.5
---

# The || operator (OR) is true if either or both are true

<div class="cols center">
<div>

- The **OR** operator
- *If I get punched in the face OR kicked in the stomach, then I will be in pain*

</div>
<div>

| `x` | `y` | `x \|\| y` |
| --- | --- | --- |
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | **`false`** |

</div>
</div>

<!--
The double vertical bar is the OR operator. It gives back true if either or both things being combined are true. For example: if I get punched in the face OR kicked in the stomach, then I will be in pain; and getting both still means pain.

The truth table shows x || y is true in the first three rows, and false only in the last row, where both are false.
-->

---
minutes: 1.5
---

# The ^ operator (XOR) is true if exactly one is true

<div class="cols center">
<div>

- The **XOR** operator: like what people often mean by "or" in English
- *If I get 1 apple XOR 3 oranges, then I will have an odd number of fruit*

</div>
<div>

| `x` | `y` | `x ^ y` |
| --- | --- | --- |
| `true` | `true` | **`false`** |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

</div>
</div>

<!--
The caret is the XOR operator, exclusive or, which is sort of like what people often mean when they say "or" in English, as in "soup or salad". It gives back true if one but not both things are true. For example: if I get 1 apple XOR 3 oranges, then I will have an odd number of fruit. One apple is odd, three oranges is odd, but both together make four, which is even.

The truth table shows x ^ y is true in the middle two rows, where exactly one is true, and false when both are true or both are false. This is why 3 ^ 2 is not 3 squared in Java.
-->

---
minutes: 2
---

# Try it: toggle x and y to see all four operators

<BoolDemo />

<!--
The interactive has two buttons, one for x and one for y, each switching between true and false. Underneath, the four operators are applied to them: NOT x, x AND y, x OR y, and x XOR y, each with its result and the reason.

It starts with x true and y false: NOT x is false, x && y is false because AND needs both, x || y is true because at least one is true, and x ^ y is true because exactly one is true. With both true, XOR becomes false while AND and OR are true. With both false, only NOT x is true.
-->

---
minutes: 2.5
---

# See how you're following: true or false?

<div class="be">

<div>(!true && (false ^ (false || true)))</div>
<div v-click>(!true && (false ^ <b>true</b>))</div>
<div v-click>(!true && <b>true</b>)</div>
<div v-click>(<b>false</b> && true)</div>
<div v-click class="ans">false</div>

</div>

<style>
.be { display: flex; flex-direction: column; gap: 14px; font-family: var(--slidev-font-mono, monospace); font-size: 30px; }
.be b { color: var(--c-accent-2); }
.be .ans { font-size: 40px; font-weight: 700; color: var(--c-accent); }
</style>

<!--
Is the expression (!true && (false ^ (false || true))) true or false? It's false.

Working from the innermost parentheses out. false || true is true, since OR needs only one. That leaves false ^ true, which is true, since exactly one is true. That leaves !true && true. NOT true is false, so it is false && true, which is false, since AND needs both.

So the whole expression is false. In fact the left side, !true, is already false, and false AND anything is false, which leads to the next slide.
-->

---
minutes: 2
---

# Short circuit evaluation: Java may skip the rest

<div class="cols">
<div class="card blue">

### `true || (...)`

Ignores everything after `||` and gives back **true**

</div>
<div class="card orange">

### `false && (...)`

Ignores everything after `&&` and gives back **false**

</div>
</div>

<div class="callout">Once the answer is certain, Java stops checking the expression.</div>

<!--
In some circumstances, Java doesn't check the whole expression. With true || some complicated expression, Java ignores everything after the OR and gives back true: OR with one true side is true no matter what the other side is. With false && some complicated expression, Java ignores everything after the AND and gives back false: AND with one false side is false no matter what.

This is called short circuit evaluation. It saves time, and later it will be used to avoid errors: for example, checking that a number is not zero before dividing by it in the same expression. XOR cannot short circuit, because its answer always depends on both sides.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- `*` `/` `%` before `+` `-`, left to right; parentheses change the order
- `(int)2.6` is 2: a **cast** drops the fraction
- Round with `(int)Math.round(x)`
- Methods: `result = Math.method(input)`, e.g. `Math.sqrt`, `Math.pow`
- `!` NOT, `&&` AND, `||` OR, `^` XOR; `&&` and `||` short circuit

<!--
Summary. One: multiply, divide, and mod come before add and subtract, operators at the same level go left to right, and parentheses change the order. Two: a cast such as (int)2.6 converts a double to an int by dropping the fraction, giving 2. Three: to round, use (int)Math.round(x). Four: Math methods are called as result = Math.method(input), for example Math.sqrt and Math.pow. Five: the boolean operators are NOT, AND, OR, and XOR, and AND and OR short circuit.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Foundations of Programming Languages (FPL), Mathematical and Statistical Foundations (MSF)
- **Competency:** evaluate arithmetic and boolean expressions, cast, and call library methods
- **Dispositions:** meticulous, persistent
- **Society and ethics:** not covered in this lecture
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

# Next time: char and String operations

<div class="cols">
<div class="card blue">

### Next time

- `char` operations
- `String` operations

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 3

</div>
</div>

<Credit />

<!--
Next time: the operations on char and String values. Reminder: keep reading Chapter 3 of the textbook.
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
The QR code opens today's exit ticket form.
-->
