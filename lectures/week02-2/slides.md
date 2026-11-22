---
theme: ../../theme
title: COMP 1600 – Week 2, Lecture 2 – Formatting, Variable Names and Arithmetic
info: |
  We print numbers with a set number of decimal places, learn the rules for
  naming variables, and review Scanner input. Then we work through Java's
  arithmetic operators on ints and doubles, including integer division and
  the % operator.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 2</div>

# In Java, 3 / 2 is <span class="hl">1, not 1.5</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>System.out.format</span>
  <span>Variable names</span>
  <span>int operators</span>
  <span>double operators</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <rect x="16" y="40" width="288" height="96" rx="18" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="160" y="102" text-anchor="middle" class="cover-art-name" style="font-size: 34px">7 / 2 → 3</text>
    <rect x="16" y="184" width="288" height="96" rx="18" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="160" y="246" text-anchor="middle" class="cover-art-obj" style="font-size: 34px">7 % 2 → 1</text>
  </svg>
</div>
</div>

<!--
This lecture covers printing numbers with a set number of decimal places using System.out.format, the rules and conventions for naming variables, a review of Scanner input, and then Java's arithmetic operators on ints and doubles. It ends with a worked example converting Celsius to Fahrenheit.

The drawing on the right shows two int operations: 7 divided by 2 gives 3, because integer division drops the fraction, and 7 mod 2 gives 1, the remainder.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for expressions, variables, and output; secondary is Foundations of Programming Languages (FPL) for how a type decides what an operator does.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Print** a double with 2 or 3 decimal places using `System.out.format` <span class="tag">SDF</span>
- **Name** variables legally, using camel case and ALL CAPS constants <span class="tag">SDF</span>
- **Predict** the result of `+ - * / %` on ints and on doubles <span class="tag">FPL</span>
- **Explain** why `(9 / 5)` breaks a temperature conversion <span class="tag">SDF</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and FPL is Foundations of Programming Languages.

Formatting output and naming variables are needed for Project 1. Predicting operator results, especially integer division and the remainder, is the central skill of the lecture.
-->

---
minutes: 2
---

# Predict first: what does this code print?

<div class="cols wide-left center">
<div>

```java
double b = 3 / 2;
System.out.println(b);
```

<p class="small">b is a double. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['1.5', '1.0', '2.0']"
  :answer="1"
  explain="1.0. 3 and 2 are both ints, so 3 / 2 is integer division and gives 1. Only then is 1 stored in the double b, as 1.0."
/>

</div>
</div>

<!--
The code divides 3 by 2, stores the result in a double named b, and prints b.

The answer is 1.0. Java works out the right-hand side first, and it looks only at the types in that expression: 3 and 2 are both int literals, so 3 / 2 is integer division, which drops the fraction and gives 1. Only after that is the int 1 stored in the double b, where it becomes 1.0.

1.5 is what math says, and it is the most common answer. 2.0 would mean the result was rounded, but integer division never rounds; it drops the fraction. This is the "mystery" that today's double section explains.
-->

---
minutes: 1
---

# Last time: types and basic input

<div class="cols center">
<div class="card blue">

### Types

- `int`, `double`, `boolean`
- `char`, `String`

</div>
<div class="card orange">

### Basic input

- Import, create, and use a `Scanner`

</div>
</div>

<!--
What did we talk about last time? Types: int, boolean, double, char, and String. And basic input with a Scanner object: import it, create it, and use it to read data.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: the five types, variables and assignment, and Scanner input.
-->

---
minutes: 3
---

# `System.out.format()` prints a double with a set number of decimals

```java {1-2|4-5}
double x = 5.74961;
System.out.format("%.2f", x);

// prints Total = $15.78 before tax
System.out.format("Total = $%.2f before tax", 15.7777);
```

<div class="cols center" style="margin-top: 12px">
<div>

- `"%.2f"` gives 2 decimal places, `"%.3f"` gives 3
- Put **other text** in the same formatting string

</div>
<div class="console" aria-label="Console output">
<div class="con-h">Console</div>
<div>5.75</div>
<div v-click="1">Total = $15.78 before tax</div>
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 110px; }
.con-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
</style>

<!--
For Project 1, the easiest way to print out data with 2 or 3 decimal places is to put "%.2f" or "%.3f" in the formatting string for System.out.format.

The first example stores 5.74961 in x and calls System.out.format with "%.2f" and x. The %.2f is a placeholder: it is replaced by the value of x, written with 2 digits after the decimal point and rounded, so it prints 5.75.

You can save a lot of effort by including other text in the formatting string. The second example's formatting string is "Total = $%.2f before tax". Everything except the placeholder is printed as it is, and the placeholder is replaced by 15.7777 rounded to 2 places, so it prints "Total = $15.78 before tax".

Reading the placeholder: the percent sign starts it, .2 means two digits after the decimal point, and f means a floating-point number, a double. Unlike println, format does not end the line; adding %n to the formatting string ends it.
-->

---
minutes: 2
---

# Variable names follow rules, and conventions make them readable

<div class="cols">
<div class="card">

### Rules

- Start with a **letter** or an **underscore**
- Then any letters, digits, and underscores
- **No spaces**

</div>
<div>
<div class="card blue">

### Regular variables: camel case

`elegantBalloons` <br> `reallyLongUselessVariableName`

</div>
<div class="card orange" style="margin-top: 12px">

### Constants: ALL CAPS

`GRAVITATIONAL_CONSTANT`

</div>
</div>
</div>

<!--
Rules for variables: they must start with a lowercase letter, an uppercase letter, or an underscore. After that, you can have as many letters, digits, and underscores as you want. No spaces in variable names! Breaking a rule is a compile error. (Java also allows a dollar sign, but it is not used in normal code.) Java's keywords, such as int or class, cannot be used as names either.

Then there are conventions, which the compiler does not check but every Java programmer follows. Regular variables should be in lowercase. The camel case convention says that new words start with an uppercase letter, as in elegantBalloons or reallyLongUselessVariableName; the capital letters are the camel's humps.

Constants, values that never change, should be in all caps. Then underscores are used to separate the words, as in GRAVITATIONAL_CONSTANT.
-->

---
minutes: 2
---

# Check: which one is a legal variable name?

<div class="cols wide-left center">
<div>

Only one of these compiles as a variable name.

<p class="small">Use the three rules: first character, then letters, digits, underscores, and no spaces.</p>

</div>
<div>

<Quiz
  :options="['2ndPlace', 'my score', '_total2']"
  :answer="2"
  explain="_total2. It starts with an underscore, then has letters and a digit. 2ndPlace starts with a digit, and my score has a space."
/>

</div>
</div>

<!--
Which one of 2ndPlace, my score, and _total2 is a legal variable name?

The answer is _total2: it starts with an underscore, which is allowed, and the rest is letters and a digit. 2ndPlace is illegal because it starts with a digit; secondPlace would be fine. my score is illegal because it has a space; in camel case it would be myScore.

_total2 is legal but does not follow the convention for regular variables; total2 would be the usual style.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Input

A review of Scanner.

<!--
Part 1 of 4. A review of reading input with Scanner, from last lecture.
-->

---
minutes: 1
---

# Using a Scanner takes three steps

1. **Import** it, so your program knows what a Scanner is
2. **Create** a Scanner object, with a name you choose
3. **Use** the object to read in data

<!--
There are three parts to using Scanner for input. First, include the appropriate import statement, import java.util.Scanner, so that your program knows what a Scanner object is. Second, create a specific Scanner object with a name you choose. Third, use the object you create to read in data.
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

The code creates a Scanner named in that reads from the keyboard. in.nextInt() reads an int into number, in.nextDouble() reads a double into radius, and in.next() reads the next word into word.
-->

---
minutes: 2
---

# Putting it all together: a program that doubles your age

<div class="cols wide-left">
<div>

```java {1|4|5|6|7|8-9|all}
import java.util.Scanner;
public class Age {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    System.out.println("What is your age?");
    int years = in.nextInt();
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
The full program, step by step. Line 1 imports Scanner, before the class. Line 4 creates the Scanner named in. Line 5 prints "What is your age?". Line 6 declares years and reads an int into it in one line; the program waits, and the user types 19. Line 7 doubles years: it takes 19, multiplies by 2, and stores 38 back in years. Lines 8 and 9 print "Your age doubled is " without ending the line, then the value of years, so the console shows "Your age doubled is 38".

Compared with last lecture's version, line 6 now declares years and assigns it in one line instead of two. Both forms do the same thing.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Basic operations

What each type lets you do.

<!--
Part 2 of 4. The basic operations Java gives each type.
-->

---
minutes: 1
---

# Each type comes with a fixed set of operations

- Each data type has a set of **basic operations** you can perform
- You **cannot** define new operations or change how they behave
- Some languages allow this, but **not Java**

<div class="callout">Today: the operations for the numerical types, <code>int</code> and <code>double</code>.</div>

<!--
In Java, each data type has a set of basic operations you are allowed to perform. It's not possible to define new operations or change how the operations behave. Some programming languages allow this, but not Java.

Today we consider the basic operations for the numerical types: int and double. The same symbols, such as the slash, can behave differently depending on the type, which is the main lesson of the lecture.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Operations on ints

Add, subtract, multiply, divide, and remainder.

<!--
Part 3 of 4. The five arithmetic operators on ints.
-->

---
minutes: 2
---

# The + operator adds two ints

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5|6}
int a;
int b;
a = 5 + 6;  // a contains 11
b = a + 3;  // b contains 14
a + b;      // not allowed, does nothing
a = a + 1;  // a contains 12, and b?
```

<div v-click="3" class="small">✗ <code>a + b;</code> alone is a compile error: the sum is not stored anywhere.</div>

</div>
<div class="mem" role="img" aria-label="Two variables: a ends at 12 and b stays 14.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 4 ? 12 : $clicks >= 1 ? 11 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 14 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
Use the plus operator to add two ints together. The code declares two ints, a and b. a = 5 + 6 stores 11 in a. b = a + 3 takes the value of a, 11, adds 3, and stores 14 in b.

The line a + b, on its own, is not allowed: it computes a sum but does nothing with it. Java treats it as a compile error, "not a statement", because a calculation has to be stored or used.

a = a + 1 takes the value of a, 11, adds 1, and stores 12 back in a. And b? b is still 14. Changing a later does not change b: b received a copy of a value when it was assigned, not a link to a.

The boxes on the right fill in as each line runs: a becomes 11, b becomes 14, and then a becomes 12 while b stays 14.
-->

---
minutes: 2
---

# Shortcuts: `x += y` and `x++` change x in place

- `x = x + y;` can be written `x += y;`
- `x = x + 1;` can be written `x++;` or `++x;`

<div class="cols wide-left center">
<div>

```java {1|2|3|4|5}
int x;
x = 6;    // x contains 6
x += 4;   // x contains 10
x++;      // x contains 11
++x;      // x contains 12
```

</div>
<div class="mem" role="img" aria-label="Variable x goes 6, 10, 11, 12.">
  <div class="mem-row"><span class="mem-label">x</span><span class="mem-value">{{ [ '', 6, 10, 11, 12 ][Math.min($clicks, 4)] }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
Some expressions are used so often that Java gives us a shortcut. x = x + y can be written x += y. x = x + 1 can be written x++ or ++x.

The code declares x and sets it to 6. x += 4 adds 4 to x, so x contains 10. x++ adds 1, so x contains 11. ++x adds 1 again, so x contains 12. The box on the right shows x changing: 6, 10, 11, 12.

On a line by themselves, x++ and ++x do exactly the same thing. They differ only when used inside a larger expression, which is best avoided for now.
-->

---
minutes: 1.5
---

# The - operator subtracts, exactly like +

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5|6}
int a;
int b;
a = 5 - 6;  // a contains -1
b = 3 - a;  // b contains 4
a -= 10;    // shortcut for a = a - 10;
a--;        // shortcut for a = a - 1;
```

</div>
<div class="mem" role="img" aria-label="a goes -1, -11, -12; b is 4.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 4 ? -12 : $clicks >= 3 ? -11 : $clicks >= 1 ? -1 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 4 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
The minus operator is exactly like plus, except it performs subtraction. a = 5 - 6 stores negative 1 in a. b = 3 - a is 3 minus negative 1, which is 4. a -= 10 is the shortcut for a = a - 10, so a becomes negative 11. a-- is the shortcut for a = a - 1, so a becomes negative 12.

The boxes on the right follow along: a is negative 1, then negative 11, then negative 12; b is 4.
-->

---
minutes: 1
---

# The * operator multiplies

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5}
int a;
int b;
a = 5 * 6;  // a contains 30
b = a * 3;  // b contains 90
a *= 2;     // shortcut for a = a * 2;
```

</div>
<div class="mem" role="img" aria-label="a goes 30 then 60; b is 90.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 3 ? 60 : $clicks >= 1 ? 30 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 90 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
The star operator performs multiplication. a = 5 * 6 stores 30 in a. b = a * 3 is 30 times 3, so b contains 90. a *= 2 is the shortcut for a = a * 2, so a becomes 60. The boxes on the right show a as 30 and then 60, and b as 90.
-->

---
minutes: 2
---

# The / operator on ints drops the fraction; it does not round

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5}
int a;
int b;
a = 3;      // a contains 3
b = a / 2;  // b contains 1
a /= 2;     // shortcut for a = a / 2;
```

- **Integer division**: not the same as regular division
- 3 / 2 is 1.5 in math; Java keeps **1**

</div>
<div class="mem" role="img" aria-label="a goes 3 then 1; b is 1.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 3 ? 1 : $clicks >= 1 ? 3 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 1 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
The slash operator on ints performs integer division. It is not the same as regular division: the fractional part is dropped, not rounded.

a = 3 stores 3. b = a / 2 is 3 divided by 2, which is 1.5 in math; the .5 is dropped, so b contains 1. a /= 2 is the shortcut for a = a / 2, so a also becomes 1.

Dropped, not rounded: 7 / 2 is 3, and even 19 / 10 is 1, although 1.9 is close to 2. For negative numbers the fraction is dropped toward zero: negative 7 divided by 2 is negative 3.
-->

---
minutes: 2
---

# The % operator gives the remainder after division

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5}
int a;
int b;
a = 8;      // a contains 8
b = a % 5;  // b contains 3
a %= 2;     // shortcut for a = a % 2;
```

- **Mod**: 8 ÷ 5 is 1 remainder **3**
- `n % 2` is 0 when n is **even**, 1 when **odd**

</div>
<div class="mem" role="img" aria-label="a goes 8 then 0; b is 3.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 3 ? 0 : $clicks >= 1 ? 8 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 3 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
The percent operator is the mod operator. It finds the remainder after division.

a = 8 stores 8. b = a % 5: 5 goes into 8 once, with 3 left over, so b contains 3. a %= 2 is the shortcut for a = a % 2: 2 goes into 8 four times with nothing left over, so a becomes 0.

This operator is a good way to find out if a number is even or odd: n % 2 is 0 when n is even and 1 when n is odd. Integer division and mod work as a pair: 8 / 5 is 1 and 8 % 5 is 3, and 1 times 5 plus 3 gives back 8.
-->

---
minutes: 3
---

# Try it: the same operator can give different answers for int and double

<OpCalc :a="7" :b="2" op="/" />

<!--
The interactive computes a op b the way Java does. The buttons at the top choose the type, int or double, and the operator: plus, minus, star, slash, or percent. The arrows change a and b, from negative 20 to 20. The box on the right shows Java's result, and the line underneath explains it.

It starts at 7 / 2 with ints, which gives 3: in math the answer is 3.5, and integer division drops the fraction. Switching to %, 7 % 2 is 1, because 7 = 3 × 2 + 1; and since 7 % 2 is not 0, 7 is odd. Switching the type to double, 7.0 / 2.0 is 3.5.

Some edge cases: with ints, dividing by zero crashes the program with an ArithmeticException; with doubles, it gives Infinity instead. With negative numbers, integer division drops the fraction toward zero, so negative 7 divided by 2 is negative 3, and the remainder takes the sign of the left number: negative 7 % 2 is negative 1.
-->

---
minutes: 2
---

# Check: what are 17 / 5 and 17 % 5?

<div class="cols wide-left center">
<div>

```java
int x = 17;
System.out.println(x / 5);
System.out.println(x % 5);
```

</div>
<div>

<Quiz
  :options="['3 and 2', '3.4 and 2', '3 and 0.4']"
  :answer="0"
  explain="3 and 2. 5 goes into 17 three times (15), with 2 left over. Integer division keeps the 3; mod gives the 2."
/>

</div>
</div>

<!--
The code prints 17 / 5 and then 17 % 5, where 17 is an int.

The answer is 3 and 2. 5 goes into 17 three times, which is 15, with 2 left over. Integer division gives the 3, dropping the fraction, and mod gives the remainder, 2.

3.4 is the math answer for 17 divided by 5, but x and 5 are both ints, so the result is an int. 0.4 is the fractional part, not the remainder: the remainder is the whole number left over, 2, and 2 divided by 5 is that 0.4.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# Operations on doubles

The same operators, now with fractional parts.

<!--
Part 4 of 4. The same operators on doubles, and a worked example.
-->

---
minutes: 1.5
---

# The + operator on doubles keeps the fractional part

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5|6}
double a;
double b;
a = 3.14159;  // a contains 3.14159
b = a + 2.1;  // b contains 5.24159
a += 1.6;     // shortcut for a = a + 1.6;
a++;          // shortcut for a = a + 1.0;
```

</div>
<div class="mem" role="img" aria-label="a goes 3.14159, 4.74159, 5.74159; b is 5.24159.">
  <div class="mem-row"><span class="mem-label">a</span><span class="mem-value">{{ $clicks >= 4 ? 5.74159 : $clicks >= 3 ? 4.74159 : $clicks >= 1 ? 3.14159 : '' }}</span></div>
  <div class="mem-row"><span class="mem-label">b</span><span class="mem-value">{{ $clicks >= 2 ? 5.24159 : '' }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 190px; }
</style>

<!--
Plus for doubles is exactly the same as plus for int, except now you can have fractional parts. a = 3.14159 stores 3.14159. b = a + 2.1 stores 5.24159. a += 1.6 is the shortcut for a = a + 1.6, so a becomes 4.74159. a++ is the shortcut for a = a + 1.0, so a becomes 5.74159. The boxes on the right follow each line.
-->

---
minutes: 1
---

# The - and * operators on doubles: no surprises

<div class="cols wide-left center">
<div>

```java
double a;
double b;
a = 3.14159;  // a contains 3.14159
b = a - 2.1;  // b contains 1.04159
a = b * 0.5;  // a contains 0.520795
```

<p class="small">println would show 1.0415899999999998 and 0.5207949999999999: a double is stored in binary, so tiny rounding errors appear.</p>

</div>
<div class="card">

They do **subtraction** and **multiplication**.

</div>
</div>

<!--
Minus and star on doubles hold no surprises: they do subtraction and multiplication. a = 3.14159 stores 3.14159. b = a - 2.1 gives 1.04159. a = b * 0.5 gives half of that, 0.520795.

The small print is a detail worth knowing: printing b with println actually shows 1.0415899999999998, and a shows 0.5207949999999999. A double is stored in binary, and most decimal fractions, like 0.1, cannot be written exactly in binary, just as one third cannot be written exactly in decimal. The error is tiny, and System.out.format with %.2f hides it.
-->

---
minutes: 2
---

# The / operator on doubles keeps the fraction, but 3 / 2 is still 1

<div class="cols wide-left center">
<div>

```java {1-2|3|4|5}
double a;
double b;
a = 3;      // a contains 3.0
b = a / 2;  // b contains 1.5
b = 3 / 2;  // b contains 1.0
```

</div>
<div class="card orange">

### Can you explain this mystery?

<div v-click="4">

`3 / 2` has **two ints**, so it is integer division: **1**. Then 1 is stored in b as **1.0**.

</div>
</div>
</div>

<!--
Unlike int, this division does have fractional parts. a = 3 stores the int 3 in a double, so a contains 3.0. b = a / 2 divides a double by an int; when either side is a double, Java does double division, so b contains 1.5.

Then the mystery: b = 3 / 2 gives b the value 1.0, even though b is a double. The explanation, revealed on the card: the right-hand side is worked out first, using only the types in it. 3 and 2 are both ints, so 3 / 2 is integer division and gives 1. Only then is 1 stored in the double b, as 1.0. The type of the variable on the left does not affect the calculation on the right.

The fix is to make one side a double: 3.0 / 2 or 3 / 2.0 both give 1.5. This was the opening question.
-->

---
minutes: 0.5
---

# The % operator works on doubles too, but it is rarely used

- Yes, there is a `%` for doubles
- Don't worry about it for now

<!--
Yes, there is a % operator for double, but it is rarely used. Don't worry about it for now. For example, 7.5 % 2 is 1.5: 2 goes into 7.5 three times, with 1.5 left over.
-->

---
minutes: 4
---

# Conversion example: Celsius to Fahrenheit

$$T_F = \frac{9}{5}\,T_C + 32$$

<TempDemo />

<!--
Given a temperature in Celsius, what is the equivalent in Fahrenheit? The formula is T F equals nine fifths times T C, plus 32.

Typed straight into Java as (9 / 5) * c + 32, the formula is wrong. 9 and 5 are both ints, so 9 / 5 is integer division and gives 1, not 1.8, and the program computes c + 32. Writing 9.0 / 5 makes the division a double division, which gives 1.8.

The interactive has a slider for the Celsius temperature, c, from negative 40 to 100, and shows both versions side by side. At 100 degrees Celsius, the int version gives 132.0, while the double version gives the correct 212.0. At 0, both give 32.0, which is why testing with only 0 would not find the bug. At negative 40, the correct answer is negative 40.0, where the two scales meet.

A complete program would read c with in.nextDouble(), compute 9.0 / 5 * c + 32, and print the result, perhaps with System.out.format("%.1f", f).
-->

---
layout: center
class: text-center
minutes: 5
---

# Quiz

<!--
Time for the in-class quiz, on today's material: formatting output, variable names, and the int and double operators.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- `System.out.format("%.2f", x)` prints x with **2 decimals**
- Names: start with a letter or `_`, no spaces; **camelCase**, **ALL_CAPS** constants
- `x += y` and `x++` are **shortcuts**
- int `/` **drops the fraction**; `%` gives the **remainder**
- `3 / 2` is 1 even in a double: **the types on the right decide**

<!--
Summary. One: System.out.format with %.2f prints a double with 2 decimal places. Two: variable names start with a letter or underscore and have no spaces; regular variables use camel case and constants use all caps. Three: x += y and x++ are shortcuts for x = x + y and x = x + 1. Four: integer division drops the fraction, and % gives the remainder. Five: 3 / 2 is 1 even when stored in a double, because the types on the right-hand side decide which division happens.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Foundations of Programming Languages (FPL)
- **Competency:** predict the result of arithmetic on ints and doubles, and format numeric output
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

# Next time: practice with math, then boolean and char operations

<div class="cols">
<div class="card blue">

### Next time

- Practice using mathematical operations
- Operations on `boolean` and `char` values

</div>
<div class="card orange">

### Reminders

- Lab 2 is tomorrow
- Keep reading Chapter 3
- Work on **Project 1**

</div>
</div>

<Credit />

<!--
Next time: practice using mathematical operations, and the operations on boolean and char values.

Reminders: Lab 2 is tomorrow. Keep reading Chapter 3 of the textbook. Work on Project 1.
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
