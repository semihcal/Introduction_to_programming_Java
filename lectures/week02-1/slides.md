---
theme: ../../theme
title: COMP 1600 – Week 2, Lecture 1 – Binary Numbers, Data Types and Input
info: |
  We finish data representation by reading binary numbers, then meet Java's
  five basic types: int, double, boolean, char and String. We store values in
  variables, read input with Scanner, and do arithmetic with Java's operators.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 2</div>

# Every value lives in a <span class="hl">typed box</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Binary</span>
  <span>int and double</span>
  <span>boolean, char, String</span>
  <span>Scanner input</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <rect x="10" y="20" width="124" height="70" rx="14" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="72" y="66" text-anchor="middle" class="cover-art-name">5</text>
    <text x="146" y="66" class="cover-art-name" style="font-size: 24px">int i</text>
    <rect x="10" y="120" width="124" height="70" rx="14" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="72" y="166" text-anchor="middle" class="cover-art-name">3.14</text>
    <text x="146" y="166" class="cover-art-name" style="font-size: 24px">double x</text>
    <rect x="10" y="220" width="124" height="70" rx="14" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="72" y="266" text-anchor="middle" class="cover-art-obj">"Hi"</text>
    <text x="146" y="266" class="cover-art-obj" style="font-size: 24px">String word</text>
  </svg>
</div>
</div>

<!--
This lecture has six parts. We finish data representation by reading binary numbers. Then we meet Java's built-in types of data: int, double, boolean, char, and String, and how a variable stores a value of one type. Then we read input from the user with a Scanner object, and finish with Java's basic arithmetic operators.

The drawing on the right shows three variables as labeled boxes: an int named i holding 5, a double named x holding 3.14, and a String named word holding "Hi". The int and double boxes are indigo, the color this course uses for primitive types; the String box is orange, the color for objects.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) for types, variables, input and expressions, and Foundations of Programming Languages (FPL) for type rules; secondary is Mathematical and Statistical Foundations (MSF) for binary numbers.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Convert** a binary number to base 10 <span class="tag">MSF</span>
- **Choose** a type for a value: int, double, boolean, char, or String <span class="tag">SDF</span>
- **Read** an int, a double, or a word from the user with Scanner <span class="tag">SDF</span>
- **Predict** what a line of arithmetic stores in a variable <span class="tag">FPL</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: MSF is Mathematical and Statistical Foundations, SDF is Software Development Fundamentals, and FPL is Foundations of Programming Languages.

Converting binary to base 10 finishes last lecture's data representation. Choosing a type, reading input, and predicting arithmetic are the first skills needed for Project 1.
-->

---
minutes: 2
---

# Predict first: what happens when an int gets too big?

<div class="cols wide-left center">
<div>

```java
int big = 2147483647;
big = big + 100;
System.out.println(big);
```

<p class="small">2,147,483,647 is the largest value an int can hold. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['2147483747', '-2147483549', 'An error']"
  :answer="1"
  explain="-2147483549. The int runs past its maximum and wraps around to the most negative values. This is called overflow, and Java gives no warning."
/>

</div>
</div>

<!--
The code puts 2,147,483,647, the largest value an int can hold, into the variable big, adds 100, and prints the result.

The answer is -2,147,483,549. An int has a fixed number of binary digits, 32 of them, so it cannot hold 2,147,483,747. Instead it wraps around past the maximum to the most negative values, like a car odometer rolling over. This is called overflow, and Java does not warn you or stop the program.

The answer 2,147,483,747 is what math says, but Java is not math: every number is stored in a fixed number of bits. "An error" is reasonable to expect, but Java does not check for overflow. Today explains why this happens.
-->

---
minutes: 1
---

# Last time: software development and data representation

<div class="cols center">
<div class="card blue">

### Software development

- Source code → bytecode → machine code
- Understand, plan, implement, test, maintain

</div>
<div class="card orange">

### Data representation

- Billions of switches store 0s and 1s
- Base 10: each place is worth 10 times more

</div>
</div>

<!--
What did we talk about last time? Software development and data representation.

For software development: a Java program is compiled from source code to bytecode, and the JVM turns the bytecode into machine code; and software development moves through phases: understand, plan, implement, test, and maintain.

For data representation: billions of tiny switches, each off or on, store 0s and 1s; and in base 10, each place in a number is worth 10 times the place to its right. Today we use that idea to read numbers in base 2.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: compiling Java, the phases of software development, and base 10.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Data representation

From base 10 to base 2.

<!--
Part 1 of 6. We finish data representation: the same place value idea as base 10, but with only two digits.
-->

---
minutes: 1
---

# Base 10 uses ten digits, and each place is worth 10 times more

<div class="cols center">
<div>

- Our normal number system is **base 10**
- Digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- Ten needs **2 digits**: 1 and 0

</div>
<div class="card">

### Moving left

Each place in the number is worth **10 times** the place to its right.

</div>
</div>

<!--
Our normal number system is base 10. This means that our digits are 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. Base 10 means that you need 2 digits to represent ten, namely 1 and 0. Each place in the number, as you move left, corresponds to an increase by a factor of 10: ones, tens, hundreds, thousands, and so on.
-->

---
minutes: 1.5
---

# Base 10 example: 3,482,931 is a sum of digits times place values

<PlaceValue :start="3482931" :allow-base2="false" />

<!--
The base 10 example is 3,482,931. The interactive shows its seven digits, each in its own place. Under each digit is its place value and the place's name: ones, tens, hundreds, thousands, ten thousands, hundred thousands, and millions.

The line at the bottom writes the number as a sum: 3 times a million, plus 4 times 100,000, plus 8 times 10,000, plus 2 times 1,000, plus 9 times 100, plus 3 times 10, plus 1 times 1, which equals 3,482,931. The arrows above and below each digit change it, and the sum updates to match.
-->

---
minutes: 1
---

# Base 2 uses two digits, and each place is worth 2 times more

<div class="cols center">
<div>

- The **binary** number system is **base 2**
- Digits: 0 and 1
- Two needs **2 digits**: 1 and 0

</div>
<div class="card">

### Moving left

Each place is worth **2 times** the place to its right, instead of 10.

</div>
</div>

<!--
The binary number system is base 2. This means that its digits are 0 and 1. Base 2 means that you need 2 digits to represent two, namely 1 and 0: two is written 10 in binary. Each place in the number, as you move left, corresponds to an increase by a factor of 2 instead of 10: ones, twos, fours, eights, sixteens, and so on.

Two digits match the switches from last lecture: off is 0 and on is 1.
-->

---
minutes: 2
---

# Base 2 example: the places of 11111100111 are powers of 2

<PlaceValue :start="2023" :base="2" :places="11" :allow-base2="false" />

<!--
The base 2 example is 11111100111, eleven binary digits. Under each digit is its place value. From the right: ones, twos, fours, eights, sixteens, thirty-twos, sixty-fours, 128s, 256s, 512s, and 1024s. Each is twice the one to its right.

The line at the bottom adds up the places that hold a 1: 1024 plus 512 plus 256 plus 128 plus 64 plus 32 plus 4 plus 2 plus 1, which is 2,023. The places that hold a 0, the sixteens and the eights, add nothing. The arrows flip a digit between 0 and 1, and the sum updates.
-->

---
minutes: 2
---

# So 11111100111 in binary is 2023 in base 10

<div class="b2">

<div>11111100111 =</div>

<div v-click class="b2-long">1·2<sup>10</sup> + 1·2<sup>9</sup> + 1·2<sup>8</sup> + 1·2<sup>7</sup> + 1·2<sup>6</sup> + 1·2<sup>5</sup> + 0·2<sup>4</sup> + 0·2<sup>3</sup> + 1·2<sup>2</sup> + 1·2<sup>1</sup> + 1·2<sup>0</sup> =</div>

<div v-click>1024 + 512 + 256 + 128 + 64 + 32 + 4 + 2 + 1 =</div>

<div v-click class="b2-ans">2023</div>

</div>

<style>
.b2 { display: flex; flex-direction: column; gap: 18px; font-family: var(--slidev-font-mono, monospace); font-size: 24px; font-weight: 600; line-height: 1.5; }
.b2 sup { font-size: 0.75em; }
.b2-long { font-size: 20px; letter-spacing: -0.02em; white-space: nowrap; }
.b2-ans { font-size: 44px; font-weight: 700; color: var(--c-accent-2); }
</style>

<!--
So, what's the value? The binary number 11111100111 is written out in three steps.

First, each digit times its power of 2: 1 times 2 to the 10, plus 1 times 2 to the 9, plus 1 times 2 to the 8, plus 1 times 2 to the 7, plus 1 times 2 to the 6, plus 1 times 2 to the 5, plus 0 times 2 to the 4, plus 0 times 2 to the 3, plus 1 times 2 to the 2, plus 1 times 2 to the 1, plus 1 times 2 to the 0.

Second, the powers worked out, keeping only the terms with a 1: 1024 plus 512 plus 256 plus 128 plus 64 plus 32 plus 4 plus 2 plus 1.

Third, the total: 2023. This is the same method as base 10, with powers of 2 instead of powers of 10. Note that 2 to the 0 is 1, so the rightmost place is always the ones place, in any base.
-->

---
minutes: 1
---

# The good news: Java does binary for you, but numbers have limits

<div class="cols center">
<div>

- You don't do binary conversions when coding Java
- It explains how **Java is different from math**

</div>
<div class="card orange">

### Math vs Java

- Math: numbers can be **arbitrarily large**
- Java: each number has a **fixed number of binary digits**
- So there are **limits** on how big or small it can be

</div>
</div>

<!--
The good news: you don't actually have to worry about doing binary conversions when you're coding Java. You should know this information because it explains how Java is different from math.

In math, you can talk about an arbitrarily large number. In Java, each number is stored with a specific number of binary digits, so there are limits on how big, or how small, a given number can be. That is exactly what happened in the opening question: the int ran out of digits and wrapped around.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Built-in types of data

Simple pieces that Java builds everything else from.

<!--
Part 2 of 6. The built-in types of data that Java gives us.
-->

---
minutes: 1
---

# Music, video, and photos are built from simpler kinds of data

<div class="cols center">
<div>

What if you want a Java program that can…

- Edit music files
- Stream video
- Organize your photo album

</div>
<div class="card">

### Complicated data

Audio, video, and images are **lots of data**. Java builds them out of much **simpler kinds** of data.

</div>
</div>

<!--
What if you want to write a Java program that can edit music files, stream video, or organize your photo album? Each of these tasks manipulates a lot of data.

Audio, video, and images are complicated kinds of data. Java must build these kinds of data out of much simpler kinds of data: for example, a picture is a grid of colors, and each color is a few numbers. Today is about those simplest kinds.
-->

---
minutes: 1
---

# Java has five basic types we will focus on

| Type | For |
| --- | --- |
| `int` | Whole numbers |
| `double` | Rational numbers (with a fractional part) |
| `boolean` | `true` or `false` values |
| `char` | Single characters |
| `String` | Words and text |

<p class="small"><code>String</code> is a little different from the rest; more on that later.</p>

<!--
We are going to focus on five basic types of data in Java. int is for whole numbers. double is for rational numbers, numbers with a fractional part. boolean is for true or false values. char is for single characters. String is for words.

String is a little different from the rest, but we'll get into that later. The difference: the first four are primitive types built into the language, while String is a class, and a String is an object. That is why String starts with a capital letter, and why this course draws it in orange.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# The int type

Whole numbers, literals, and variables.

<!--
Part 3 of 6. The int type, and with it the ideas of literals and variables.
-->

---
minutes: 1
---

# An int stores a whole number in 4 bytes, or 32 bits

<div class="cols center">
<div>

- **int** stores integers: positive and negative whole numbers, and zero
- Examples: `54`, `-893992`, `0`

</div>
<div class="card blue">

### Inside the computer

An int takes up **4 bytes** of space: **32 bits**, each a 1 or a 0.

</div>
</div>

<!--
The int type is used to store integers: positive and negative whole numbers, and zero. Examples are 54, negative 893,992, and 0.

Inside the computer, an int takes up 4 bytes of space, which is 32 bits, 32 ones and zeros. Every int uses exactly 32 bits, whether it holds 0 or 2 billion.
-->

---
minutes: 1
---

# With 32 bits, an int holds about −2 billion to 2 billion

<div class="cols center">
<div>

- Positive numbers are stored in **binary**, like we just saw
- Negative numbers need an extra trick (not covered here)

</div>
<div class="card orange">

### The actual limits

Maximum: **2,147,483,647**

Minimum: **−2,147,483,648**

</div>
</div>

<!--
With 32 bits, an int can hold integers from about negative 2 billion up to 2 billion. Positive numbers are represented in binary, like we've seen. Negative numbers need an extra trick that we aren't going to go into.

The actual maximum value is 2,147,483,647, which is 2 to the 31 minus 1. The minimum is negative 2,147,483,648, which is negative 2 to the 31. One of the 32 bits effectively goes to the sign, which is why the limit is about 2 billion and not about 4 billion. In Java these limits are available as Integer.MAX_VALUE and Integer.MIN_VALUE.
-->

---
minutes: 2
---

# Going past the limit wraps around: overflow and underflow

<div class="cols center">
<div>

- Max int **2,147,483,647** + 100 is **not** 2,147,483,747
- It becomes **−2,147,483,549**: this is **overflow**
- Going too negative wraps the other way: **underflow**

</div>
<div>
<svg viewBox="0 0 400 330" class="wrap" role="img" aria-label="The int values drawn as a circle. Zero is at the top. Positive values run clockwise down the right side to the maximum, 2,147,483,647, at the bottom right. The minimum, negative 2,147,483,648, sits right next to it at the bottom left. An arrow labeled plus 100 goes from the maximum across the bottom to the negative side.">
  <defs>
    <marker id="wrap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#c2410c" />
    </marker>
  </defs>
  <circle cx="200" cy="140" r="100" class="w-ring" />
  <text x="200" y="28" class="w-t">0</text>
  <text x="312" y="148" class="w-t" style="text-anchor: start">+</text>
  <text x="88" y="148" class="w-t" style="text-anchor: end">−</text>
  <circle cx="222" cy="238" r="7" class="w-dot" />
  <circle cx="178" cy="238" r="7" class="w-dot" />
  <path d="M226 226 Q 200 168 174 226" class="w-arr" marker-end="url(#wrap-arrow)" />
  <text x="200" y="188" class="w-a">+100</text>
  <text x="232" y="276" class="w-c" style="text-anchor: start">max</text>
  <text x="232" y="300" class="w-s" style="text-anchor: start">2,147,483,647</text>
  <text x="168" y="276" class="w-c" style="text-anchor: end">min</text>
  <text x="168" y="300" class="w-s" style="text-anchor: end">−2,147,483,648</text>
</svg>
</div>
</div>

<style>
.wrap { width: 100%; max-height: 320px; }
.w-ring { fill: none; stroke: var(--c-accent); stroke-width: 4; }
.w-t { text-anchor: middle; font-size: 26px; font-weight: 700; fill: var(--c-ink); }
.w-s { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; fill: var(--c-ink); }
.w-dot { fill: var(--c-accent); }
.w-c { font-size: 18px; font-weight: 700; fill: var(--c-muted); }
.w-arr { fill: none; stroke: var(--c-accent-2); stroke-width: 4; }
.w-a { text-anchor: middle; font-size: 20px; font-weight: 700; fill: var(--c-accent-2); }
</style>

<!--
Say you add 100 to the maximum int value, 2,147,483,647. You do not get 2,147,483,747. Instead, it becomes a very negative number: negative 2,147,483,549. This phenomenon is called overflow. The opposite thing happens if you have a very negative number and you subtract a number that makes it too negative: it wraps around to a large positive number. This phenomenon is called underflow.

The diagram draws all the int values as a circle. Zero is at the top. The positive values run clockwise down the right side, ending at the maximum, 2,147,483,647, at the bottom. Right next to it, at the bottom left, is the minimum, negative 2,147,483,648, and the negative values climb back up the left side to zero. An orange arrow labeled plus 100 shows the jump: one step past the maximum lands on the minimum, so adding 100 lands 99 steps after the minimum, at negative 2,147,483,549.

Strictly, many books call both directions overflow; "underflow" for integers is the name used in this course.
-->

---
minutes: 1
---

# A literal is a concrete value written in the code

<div class="cols center">
<div>

- Each type has its own **literals**
- A literal is a **concrete value** within a type

</div>
<div class="card blue">

### int literals

Numbers exactly as you would expect:

`115` &nbsp; `-9837461` &nbsp; `2`

</div>
</div>

<!--
Each type has a number of literals associated with it. A literal is a concrete value within a given type, written directly in the code. Literals for the int type are numbers exactly like what you would expect: 115, negative 9,837,461, and 2.

Note that an int literal has no commas: 2,147,483,647 is written 2147483647 in Java code.
-->

---
minutes: 1
---

# A variable is a named box that holds a value of one type

<div class="cols center">
<div>

- Every data type can have **variables**
- Think of a variable as a **box** you put values into
- Its name is an **identifier**

</div>
<div class="card">

### Declaring an int named `i`

```java
int i;
```

</div>
</div>

<!--
It is also possible to create variables for each data type. Think of a variable as a box that you can put values into. The name of a variable is an identifier. We can declare a variable of type int with identifier i using this line of code: int i, semicolon. The type comes first, then the name.
-->

---
minutes: 1
---

# A Java variable changes; a math variable does not

<div class="cols center">
<div>

- Math variables have a **fixed** (but unknown) value
- A Java variable can be **changed** by a line of code
- The **assignment operator** `=` sets its value

</div>
<div class="card">

### Assigning 5 to `i`

```java
i = 5;
```

</div>
</div>

<!--
Java variables are not like variables in math, which have a fixed but unknown value. In math, x = 5 states a fact. In Java, a variable can be changed by a line of code. We use the assignment operator, the equals sign, to set the value of a variable: i = 5, semicolon.

This is why a line like i = i + 1 makes sense in Java, even though it is impossible in math: it means "take the value in i, add 1, and put the result back in i".
-->

---
minutes: 1.5
---

# Declaring makes the box; assigning fills it

<div class="cols center">
<div>

```java {1|2}
int i;
i = 5;
```

- The box is named `i` and holds **only ints**
- Think of `=` as an **arrow pointing left**
- Try it in IntelliJ

</div>
<div>

<VarBox type="int" name="i" value="5" bits="32 bits" :filled="$clicks >= 1" />

</div>
</div>

<!--
The first line, int i, creates a box named i that is designed only to hold ints. For one thing, it is 32 bits in size. At this point the box is empty: Java will not let you use i until a value has been stored in it.

The second line, i = 5, stores 5 into i. Think of the equals operator as an arrow pointing left: the value on the right goes into the variable on the left.

The diagram shows the box named i, labeled "holds only int values, 32 bits". After the first line it is drawn dashed and empty. After the second line, the value 5 arrives from the right along an arrow pointing left, and the box holds 5. The same two lines can be run in IntelliJ, where the debugger shows i holding 5.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# double, boolean, char, and String

The same pattern: declare a box, then assign a value.

<!--
Part 4 of 6. The other four types work the same way as int: a declaration creates a box for one type, and an assignment stores a value in it.
-->

---
minutes: 1.5
---

# A double stores a number with a fractional part

<div class="cols center">
<div>

- Sometimes you need a **fractional part**: `double` fits
- Declared just like an int
- Its box has a **different size** from an int's

```java {1|2}
double x;
x = 3.14159;
```

</div>
<div>

<VarBox type="double" name="x" value="3.14159" bits="64 bits" :filled="$clicks >= 1" />

</div>
</div>

<!--
You will use the int type very often. Sometimes, however, you need to represent numbers with a fractional part. The double type is well suited to this purpose. Declaration of a double variable is just like an int variable: double x, semicolon.

That line creates a box named x that is designed only to hold doubles. It has a different size from an int: a double uses 64 bits, twice as many. The second line, x = 3.14159, stores 3.14159 into x. Remember that the equals operator is like an arrow pointing left.

The diagram shows the empty box x, labeled "holds only double values, 64 bits"; after the assignment, 3.14159 arrives along the left-pointing arrow and the box holds it. The same lines can be run in IntelliJ.
-->

---
minutes: 1.5
---

# A boolean stores only true or false

<div class="cols center">
<div>

- Sometimes you only need to know: **true or false?**
- Clearer once we cover **conditionals**, in a couple of weeks
- A boolean box **cannot** store numbers

```java {1|2}
boolean value;
value = false;
```

</div>
<div>

<VarBox type="boolean" name="value" value="false" :filled="$clicks >= 1" />

</div>
</div>

<!--
Numbers are great, but sometimes you only need to keep track of whether or not something is true or false. This is what the boolean type is for. It will make more sense when we cover conditionals in a couple of weeks. Declaration of a boolean variable looks like this: boolean value, semicolon.

That line creates a box named value that is designed only to hold booleans. It cannot be used to store numbers. The second line, value = false, stores false into value; the equals operator is like an arrow pointing left.

The diagram shows the empty box named value, labeled "holds only boolean values"; after the assignment, false arrives along the arrow and the box holds it. true and false are the only two boolean literals, and they are written without quotes.
-->

---
minutes: 1.5
---

# A char stores one character, in single quotes

<div class="cols center">
<div>

- Holds a **single character**, like `'$'` or `'q'`
- Covers most of the world's **scripts**
- Single quotes mean the character `'a'`, not a variable named `a`

```java {1|2}
char c;
c = 'a';
```

</div>
<div>

<VarBox type="char" name="c" value="'a'" bits="16 bits" :filled="$clicks >= 1" />

</div>
</div>

<!--
Sometimes you need to deal with characters. This is what the char type is for. The char type only allows you to store a single character, like a dollar sign or the letter q. Declaration of a char variable looks like this: char c, semicolon.

That line creates a box named c that is designed only to hold chars. It is used to store characters from most of the different scripts in the world. A char uses 16 bits.

The second line, c = 'a', stores the letter a into c. We must use the single quotes so that Java knows we are talking about the character a and not a variable named a. The diagram shows the empty box c, labeled "holds only char values, 16 bits"; after the assignment, 'a' arrives along the arrow and the box holds it.
-->

---
minutes: 1.5
---

# A String stores text of any length, in double quotes

<div class="cols center">
<div>

- Different from the other types in several ways
- For now: it holds **many chars**, not just one
- We used a String literal in Hello, World

```java {1|2}
String word;
word = "Mad flavor";
```

</div>
<div>

<VarBox type="String" name="word" value='"Mad flavor"' object :filled="$clicks >= 1" />

</div>
</div>

<!--
The String type is different from the other types in several ways. The important thing to focus on now is that it can hold a large number of chars, not just a single value. A String literal is what we used in the Hello, World program. Declaration looks like this: String word, semicolon.

That line creates a box named word that is designed only to hold Strings. It is used to store text of any length from most of the different scripts in the world. The second line stores the String "Mad flavor" into word. We must use the double quotes so that Java knows we are talking about the text Mad flavor, and not two variables named Mad and flavor.

The diagram shows the box named word in orange, the course's color for objects, labeled "holds only String values". After the assignment, "Mad flavor" arrives along the arrow and the box holds it.
-->

---
minutes: 1.5
---

# Recap: five types, each with its own kind of literal

| Type | Kind of values | Sample literals |
| --- | --- | --- |
| `int` | Integers | `-5` &nbsp; `0` &nbsp; `900031` |
| `double` | Floating-point numbers | `3.14` &nbsp; `-0.6` &nbsp; `6.02e23` |
| `boolean` | Boolean values | `true` &nbsp; `false` |
| `char` | Single characters | `'A'` &nbsp; `'Z'` &nbsp; `'&'` |
| `String` | Sequences of characters | `"If you dis Dr. Dre"`<br>`"10 Sesquipedalians"` |

<!--
A summary of the types. int holds integers, with sample literals negative 5, 0, and 900,031. double holds floating-point numbers, with sample literals 3.14, negative 0.6, and 6.02e23, which is scientific notation for 6.02 times 10 to the 23. boolean holds the boolean values true and false. char holds single characters, such as 'A', 'Z', and the ampersand, always in single quotes. String holds sequences of characters, such as "If you dis Dr. Dre" and "10 Sesquipedalians", always in double quotes.

Note that "10 Sesquipedalians" starts with digits but is still a String, because it is in double quotes. The quotes, or the decimal point, decide the type of a literal.
-->

---
minutes: 2.5
---

# Check: which values fit in which box?

<TypeBoxes />

<!--
The interactive has ten literals across the top and five variables underneath, one of each type: int i, double x, boolean value, char c, and String word. Choosing a literal and then a box tries the assignment, and the message says whether it compiles and what the box now holds.

The same-type assignments all compile: -5 into i, 3.14 into x, true into value, 'A' into c, "Mad flavor" into word.

Some mixed ones compile too. An int fits in a double box: x = 900031 stores 900031.0, because Java widens the int to a double without losing anything. A char fits in an int or a double, because a char is stored as a number: i = 'A' stores 65, the character code for A. This surprises most people.

The rest are compile errors. A double does not fit in an int box, since the fraction would be lost: i = 3.14 does not compile. "10" is a String, not the number 10, so it fits only in word. Only true and false go in a boolean box, and they go in no other box. And only text in double quotes is a String.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 5</div>

# Input

Reading what the user types, with a Scanner.

<!--
Part 5 of 6. Programs so far only produce output; now they read input.
-->

---
minutes: 1
---

# Output is one line of code; input needs a Scanner object

<div class="cols center">
<div class="card blue">

### Output

```java
System.out.println("Hi");
```

</div>
<div class="card orange">

### Input

A little trickier: we create a new object of type **Scanner**.

</div>
</div>

<!--
We've got output: to output stuff, we just use System.out.println. What about input? Input is a little trickier. We need to create a new object of type Scanner, which reads what the user types on the keyboard.
-->

---
minutes: 1
---

# Using a Scanner takes three steps

1. **Import** it, so your program knows what a Scanner is
2. **Create** a Scanner object, with a name you choose
3. **Use** the object to read in data

<!--
There are three parts to using Scanner for input. First, include the appropriate import statement so that your program knows what a Scanner object is. Second, create a specific Scanner object with a name you choose. Third, use the object you create to read in data. The next three slides take these one at a time.
-->

---
minutes: 1
---

# Step 1: import Scanner at the top of the file, before the class

<div class="cols center">
<div>

- Lots of people have written useful Java code
- **Importing** lets us use it to solve our problems
- Type `import`, then the package or class name

</div>
<div class="card">

### First line of the file

```java
import java.util.Scanner;
```

</div>
</div>

<!--
Lots of people have written all kinds of useful Java code. By importing that code, we can use it to help solve our problems. To import code, you type import and then the name of the package or class.

To import Scanner, type import java.util.Scanner, semicolon, at the top of your program, before the class. java.util is the package, a group of related classes, and Scanner is the class inside it. Forgetting this line gives the compile error "cannot find symbol: class Scanner".
-->

---
minutes: 1.5
---

# Step 2: create a Scanner object with `new`

```java
Scanner in = new Scanner(System.in);
```

<div class="cols" style="margin-top: 14px">
<div>

- Declare a reference of type `Scanner`
- `new` creates a Scanner reading from `System.in`, the keyboard

</div>
<div class="card">

The name `in` is a choice; any name works. Doesn't make sense yet? That's okay for now.

</div>
</div>

<!--
Once you have imported the Scanner class, you have to create a Scanner object. To do so, declare a reference of type Scanner, and use the new keyword to create a new Scanner with System.in as a parameter, as in the line shown: Scanner in = new Scanner(System.in).

Reading it piece by piece: Scanner in declares a variable named in that can refer to a Scanner. The equals sign stores something in it. new Scanner(System.in) creates the Scanner object, and System.in tells it to read from standard input, the keyboard.

You can call it whatever you want; this course calls it in. If it doesn't make complete sense yet, that's okay: objects and new come later in the course. For now, it is a line to copy exactly.
-->

---
minutes: 1.5
---

# Step 3: read an int with `nextInt()`

<div class="cols center">
<div>

- The Scanner reads the **next piece of data** the user types
- You must know its type: **int, double, or String**
- To read the user's age into `years`:

</div>
<div>

```java {1|2}
int years;
years = in.nextInt();
```

</div>
</div>

<!--
Now that you've got a Scanner object, you can use it to read some data. It has a method that will read in the next piece of data the user types in, but you have to know if that data is going to be an int, a double, or a String.

Say the user is going to input their age, an int, and you want to store it in an int variable called years. The first line declares the int variable years. The second line calls the nextInt method on the Scanner named in: the program waits until the user types a number and presses Enter, and the number is stored in years. The equals sign is still an arrow pointing left: the value nextInt reads goes into years.
-->

---
minutes: 1
---

# Three Scanner methods read an int, a double, or a String

```java
Scanner in = new Scanner(System.in);
int number = in.nextInt();
double radius = in.nextDouble();
String word = in.next();
```

<p class="small">Scanner has many methods (ways to accomplish tasks); for now we use these three.</p>

<!--
Scanner has a lot of methods, ways to accomplish some tasks. For now, we're only interested in three. They allow us to read the next int, the next double, and the next String, respectively.

The code creates the Scanner, then: in.nextInt() reads an int into number; in.nextDouble() reads a double into radius; in.next() reads the next word into word. Each line declares the variable and assigns to it in one step, which is allowed. in.next() reads one word, stopping at a space. If the user types something that is not an int when nextInt is called, the program crashes with an InputMismatchException.
-->

---
minutes: 2.5
---

# Putting it all together: a program that doubles your age

<div class="cols wide-left">
<div>

```java {1|4|5|6-7|8|9-10|all}
import java.util.Scanner;
public class Age {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    System.out.println("What is your age?");
    int years;
    years = in.nextInt();
    years = years * 2;
    System.out.print("Your age doubled is ");
    System.out.println(years);
  }
}
```

</div>
<div class="console" aria-label="Console output">
<div class="con-h">Console</div>
<div v-click="2">What is your age?</div>
<div v-click="3" class="con-in">19</div>
<div v-click="5">Your age doubled is 38</div>
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 200px; }
.con-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
.con-in { color: #fdba74; }
.slidev-layout .slidev-code { font-size: 19px !important; }
</style>

<!--
The full program, step by step. Line 1 imports Scanner, before the class. Line 4 creates the Scanner named in. Line 5 prints the question "What is your age?", which appears in the console. Lines 6 and 7 declare years and read an int into it; the program waits, and in the console the user types 19. Line 8 doubles years: it takes the value in years, 19, multiplies it by 2, and stores 38 back in years. Lines 9 and 10 print "Your age doubled is " with print, which does not end the line, and then println prints the value of years, so both appear on one line: "Your age doubled is 38".

The console on the right shows exactly this conversation: the question, the user's input 19 in orange, and the answer. Line 8 is the "Java is not math" idea again: years = years * 2 is a step that changes years, not an equation.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 6</div>

# Basic operations

Arithmetic on numbers.

<!--
Part 6 of 6. The basic operations Java provides for each type, starting with arithmetic.
-->

---
minutes: 1
---

# Each type comes with a fixed set of operations

- Each data type has a set of **basic operations** you can perform
- You **cannot** define new operations or change how they behave
- Some languages allow this, but **not Java**

<!--
In Java, each data type has a set of basic operations you are allowed to perform. It's not possible to define new operations or change how the operations behave. Some programming languages allow this, for example C++ and Python let a programmer decide what plus means for their own types, but not Java. In Java, plus always means what the language says it means.
-->

---
minutes: 1
---

# Five operators do arithmetic on numbers

<div class="cols wide-left center">
<div>

| Operator | Meaning |
| --- | --- |
| `+` | Add |
| `-` | Subtract |
| `*` | Multiply |
| `/` | Divide (some tricky things here) |
| `%` | Modulus (more on this later) |

</div>
<div class="card">

### Not operators

Powers and square roots exist, but they are **not built-in operators**.

</div>
</div>

<!--
The basic operations you can use on numerical values are: plus to add, minus to subtract, star to multiply, slash to divide, and percent for modulus. Division has some tricky things, and modulus will be covered more later, both next lecture.

There are ways to raise numbers to powers or find square roots, but they are not built-in operators. In particular, the caret symbol does not mean "to the power of" in Java. Powers and square roots come from Math methods, also covered later.
-->

---
minutes: 2
---

# Operators work on literals, variables, or both

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5|6}
int a;
int b;
a = 5 + 6;    // a contains 11
b = a * 3;    // b contains 33
double c = 2.5;
c = c - a;    // c contains -8.5
```

</div>
<div class="mem" role="img" aria-label="Three variables: a holds 11, b holds 33, c holds negative 8.5 after the last line.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 1 ? 11 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 33 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">c</span><span class="mem-value">{{ $clicks >= 4 ? -8.5 : $clicks >= 3 ? 2.5 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
You can use these operators on literals, actual values, on variables, or on both.

The code declares two ints, a and b. a = 5 + 6 uses two literals, so a contains 11. b = a * 3 uses a variable and a literal: the value of a, 11, times 3, so b contains 33. double c = 2.5 declares a double and assigns it in one line. c = c - a uses two variables: 2.5 minus 11, so c contains negative 8.5. Mixing a double and an int gives a double.

The boxes on the right fill in as each line runs: a becomes 11, b becomes 33, c becomes 2.5 and then negative 8.5.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- Binary places are worth 1, 2, 4, 8, …; 11111100111 is 2023
- An int has **32 bits**, so it **overflows** past 2,147,483,647
- `int`, `double`, `boolean`, `char` (`'a'`), `String` (`"text"`)
- `=` is an **arrow pointing left**: it changes the variable
- Input: **import**, **create** a Scanner, **use** `nextInt()`

<!--
Summary. One: binary place values are powers of 2, so 11111100111 is 2023. Two: an int uses 32 bits, so it has a maximum of 2,147,483,647, and going past it wraps around, which is overflow. Three: the five basic types are int, double, boolean, char in single quotes, and String in double quotes. Four: the equals sign is assignment, an arrow pointing left that changes the variable. Five: input takes three steps: import Scanner, create a Scanner object, and use methods such as nextInt.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Foundations of Programming Languages (FPL)
- **Related area:** Mathematical and Statistical Foundations (MSF)
- **Competency:** choose a type for a value, read input, and predict simple arithmetic
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

# Next time: deeper into math operations

<div class="cols">
<div class="card blue">

### Next time

- More on math operations

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 3
- Start **Project 1**: you have most of the tools
- Tomorrow's lab is a great time to work on it

</div>
</div>

<Credit />

<!--
Next time we go deeper into math operations, including the tricky parts of division and the modulus operator.

Reminders: keep reading Chapter 3 of the textbook. Start working on Project 1: you've got most of the tools you need to finish it, and tomorrow during lab is a great time to work on it.
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
