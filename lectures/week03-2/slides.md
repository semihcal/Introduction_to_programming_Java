---
theme: ../../theme
title: COMP 1600 – Week 3, Lecture 2 – Wrapper Classes and if-Statements
info: |
  We use the wrapper classes Integer, Double and Character to turn Strings
  into numbers and to test characters, and write three short programs with
  them. Then programs start making choices with the if-statement.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 3</div>

# Programs start to <span class="hl">make choices</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Integer.parseInt</span>
  <span>Double, Character</span>
  <span>if-statements</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <path d="M160 20 L 260 100 L 160 180 L 60 100 Z" fill="#eef2ff" stroke="#3730a3" stroke-width="4" />
    <text x="160" y="108" text-anchor="middle" class="cover-art-name" style="font-size: 26px">x &lt; 5 ?</text>
    <path d="M110 150 L 70 222" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M210 150 L 250 222" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <text x="64" y="186" text-anchor="middle" class="cover-art-name" style="font-size: 20px">true</text>
    <text x="258" y="186" text-anchor="middle" class="cover-art-name" style="font-size: 20px">false</text>
    <rect x="10" y="226" width="120" height="60" rx="12" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="70" y="264" text-anchor="middle" class="cover-art-obj" style="font-size: 20px">print</text>
    <rect x="190" y="226" width="120" height="60" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8 6" />
    <text x="250" y="264" text-anchor="middle" class="cover-art-name" style="font-size: 20px; fill: #475569">skip</text>
  </svg>
</div>
</div>

<!--
This lecture has two parts. First, wrapper classes: Integer and Double, which turn Strings into numbers and back, and Character, which answers questions about a char. Three example programs use them. Second, conditional execution: the if-statement, which lets a program choose whether to run some code.

The drawing on the right is a small flowchart: a diamond asks "x < 5 ?". The arrow labeled true leads to a box that prints; the arrow labeled false leads to a dashed box labeled skip. That choice is what an if-statement adds.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for library classes, type conversion, and conditional statements; secondary is Foundations of Programming Languages (FPL) for selection as a control structure.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Convert** between Strings and numbers with `Integer` and `Double` <span class="tag">SDF</span>
- **Test** a char with `Character.isDigit` and friends <span class="tag">SDF</span>
- **Write** an if-statement with a boolean condition <span class="tag">FPL</span>
- **Compare** a String with `equals` inside an if <span class="tag">SDF</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and FPL is Foundations of Programming Languages.
-->

---
minutes: 2
---

# Predict first: what does this code print?

<div class="cols wide-left center">
<div>

```java
String number = "847";
System.out.println(number + 1);
```

<p class="small">number holds digits, but its type is String. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['848', '8471', 'An error']"
  :answer="1"
  explain="8471. number is a String, so + 1 is concatenation: the text 1 is joined onto &quot;847&quot;."
/>

</div>
</div>

<!--
The code stores "847" in a String and prints number + 1.

The answer is 8471. number holds digits, but its type is String, so plus is concatenation: the text 1 is joined onto the end, giving "8471". A String that looks like a number is still text.

848 is what we want, and today's first part shows how to get it: turn the String into an int first. "An error" is reasonable to expect, but String plus int is allowed; it is concatenation, as in last lecture.
-->

---
minutes: 1
---

# Last time: operations on char and String values

<div class="cols center">
<div class="card blue">

### char

- `letter++`, `letter - 'a' + 1`
- ASCII and escape sequences

</div>
<div class="card orange">

### String

- Concatenate (`+`)
- `equals()`, `compareTo()`, `length()`, `charAt()`, `substring()`

</div>
</div>

<!--
What did we talk about last time? Operations on char values: incrementing, converting to numbers, the ASCII table, and escape sequences. And operations on String values: concatenation with plus, and the methods equals, compareTo, length, charAt, and substring.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: char arithmetic, escape sequences, concatenation, and the String methods.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Wrapper classes

Classes that go with the primitive types.

<!--
Part 1 of 2. Wrapper classes, and three example programs that use them.
-->

---
minutes: 1
---

# How do you turn the String "847" into the int 847?

- Classes and objects are useful
- Some things are hard with the operations we've seen
- Example: `"847"` → `847`

<div class="callout">The answer: <b>wrapper classes</b>.</div>

<!--
Classes and objects are useful. There are certain things that are difficult to do with the operations we've shown you. For example, how do you turn a String representation of a number, like "847", into the actual int 847? The opening question showed that plus does not do it. The answer: wrapper classes.

This matters for real programs: text read from a file, a web form, or a command line arrives as Strings, even when it holds numbers.
-->

---
minutes: 1
---

# Each primitive type has a wrapper class

<div class="cols center">
<div>

- Every primitive type in Java has a **wrapper class**
- We will focus on three

</div>
<div>

| Primitive | Wrapper class |
| --- | --- |
| `int` | `Integer` |
| `double` | `Double` |
| `char` | `Character` |

</div>
</div>

<!--
Each primitive data type in Java has a wrapper class. We will focus on three: Integer, the wrapper class for int; Double, for double; and Character, for char. Wrapper class names start with a capital letter, like every class name. The others are Boolean, Byte, Short, Long, and Float.
-->

---
minutes: 2
---

# `Integer` converts ints to and from Strings

<div class="cols center">
<div>

- String → int: `parseInt()`
- int → String: `toString()`, or just concatenate

</div>
<div>

```java
String number = "345";
int value = Integer.parseInt(number);
```

```java
int value = 543;
String number = Integer.toString(value);
```

</div>
</div>

<!--
The main uses of the Integer class are converting ints to and from Strings. To convert a String to an int, use the parseInt method: Integer.parseInt("345") gives the int 345, which can be used in arithmetic.

To convert an int to a String, use the toString method: Integer.toString(543) gives the String "543". You can also just concatenate: "" + 543 gives the same String.

These are called with the class name, Integer dot, just like Math methods.
-->

---
minutes: 2
---

# `Double` works the same way for doubles

<div class="cols center">
<div>

- String → double: `parseDouble()`
- double → String: `toString()`, or just concatenate

</div>
<div>

```java
String number = "-0.4581";
double value = Double.parseDouble(number);
```

```java
double value = 6.02e23;
String number = Double.toString(value);
```

</div>
</div>

<!--
The Double class is much like the Integer class. To convert a String to a double, use the parseDouble method: Double.parseDouble("-0.4581") gives the double -0.4581.

To convert a double to a String, use the toString method, or just concatenate. Double.toString(6.02e23) gives the String "6.02E23": Java writes very large and very small doubles in scientific notation, with a capital E.
-->

---
minutes: 2.5
---

# Try it: which Strings can be parsed?

<ParseDemo />

<!--
The interactive has six Strings to choose from. For each one it shows what Integer.parseInt and Double.parseDouble give.

"847" works for both: 847 and 847.0. "-0.4581" works only as a double; parseInt crashes with a NumberFormatException, because an int cannot have a decimal point. "6.02e23" is scientific notation, so it is also double only, printed as 6.02E23. "007" works for both, and the leading zeros disappear: 7 and 7.0. "12abc" and the empty String are not numbers at all, so both methods crash with a NumberFormatException.

A program that parses input typed by a person must expect this crash; handling it comes later in the course.
-->

---
minutes: 2
---

# `Character` answers questions about a char

<div class="cols center" style="grid-template-columns: 0.8fr 1.2fr">
<div>

- **Digit**? `isDigit()`
- **Letter**? `isLetter()`
- **Uppercase**? `isUpperCase()`
- **Lowercase**? `isLowerCase()`

</div>
<div>

<CharInfo />

</div>
</div>

```java
char c = '8';
boolean value = Character.isDigit(c); // true
```

<!--
The Character class is mostly useful for getting information about a particular char. For example, you can find out whether a char is a digit, is a letter, is uppercase, or is lowercase by calling the isDigit, isLetter, isUpperCase, or isLowerCase methods, respectively. Each gives back a boolean. In the code, c is the char '8', and Character.isDigit(c) is true.

The interactive on the right runs all four tests on a chosen char. '8' is a digit only. 'q' is a letter and lowercase. 'Q' is a letter and uppercase. '$' and the space are none of the four. 'é' is a letter and lowercase: these methods work for letters from many languages, not only A to Z.
-->

---
minutes: 1
---

# Examples: three short programs with what we know

1. Read an alphabetic character and tell its **position in the alphabet**
2. Read three String values and print them in **reverse order**
3. Read an int value and say how many **digits** it contains

<!--
Three example programs. First: read in an alphabetic character and tell what position in the alphabet it has. Second: read three String values and print them out in reverse order. Third: read in an int value and say how many digits it contains. Each one uses only what we have covered: Scanner, chars, Strings, and the wrapper classes. The next three slides work through them.
-->

---
minutes: 3
---

# Example 1: the position of a letter in the alphabet

<div>
<div>

```java {1-2|3|4|5|all}
Scanner in = new Scanner(System.in);
System.out.print("Enter a letter: ");
char letter = in.next().charAt(0);
int position = letter - 'a' + 1;
System.out.println(letter + " is letter " + position);
```

</div>
<div class="console" aria-label="Console" style="margin-top: 12px">
<div class="con-h">Console</div>
<div>Enter a letter: <span class="con-in">r</span></div>
<div v-click="4">r is letter 18</div>
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 120px; }
.con-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
.con-in { color: #fdba74; }
</style>

<!--
Read in an alphabetic character and tell what position in the alphabet it has. Scanner has no method that reads a char, so line 3 reads a word with in.next() and takes its first character with charAt(0). Line 4 uses the offset from last lecture: letter - 'a' + 1. For r, that is 114 minus 97 plus 1, which is 18. Line 5 prints "r is letter 18": the String "r is letter " comes after the char letter, so the plus joins text, not numbers, because a String is involved.

This version expects a lowercase letter. For an uppercase letter, subtract 'A' instead; Character.isUpperCase can tell which one applies, once we have if-statements.
-->

---
minutes: 3
---

# Example 2: three Strings in reverse order

<div>
<div>

```java {1|2-4|5|all}
Scanner in = new Scanner(System.in);
String first = in.next();
String second = in.next();
String third = in.next();
System.out.println(third + " " + second + " " + first);
```

</div>
<div class="console" aria-label="Console" style="margin-top: 12px">
<div class="con-h">Console</div>
<div><span class="con-in">ready set go</span></div>
<div v-click="3">go set ready</div>
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 120px; }
.con-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
.con-in { color: #fdba74; }
</style>

<!--
Read three String values and print them out in reverse order. Lines 2 to 4 read three words into first, second, and third. in.next() reads one word at a time, so the user can type all three on one line, separated by spaces, or on three lines. Line 5 prints them backwards, third, second, first, with spaces concatenated between them. For the input "ready set go", it prints "go set ready".

The trick is that the variables hold all three words at once; nothing needs to be printed until all of them have been read.
-->

---
minutes: 3
---

# Example 3: how many digits does an int have?

<div>
<div>

```java {1|2|3|4|all}
Scanner in = new Scanner(System.in);
int value = in.nextInt();
String text = Integer.toString(value);
int digits = text.length();
System.out.println(value + " has " + digits + " digits");
```

</div>
<div class="console" aria-label="Console" style="margin-top: 12px">
<div class="con-h">Console</div>
<div><span class="con-in">2023</span></div>
<div v-click="4">2023 has 4 digits</div>
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 120px; }
.con-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
.con-in { color: #fdba74; }
</style>

<!--
Read in an int value and say how many digits it contains. Counting digits with arithmetic needs loops, which come later; but a wrapper class makes it easy. Line 2 reads the int. Line 3 converts it to a String with Integer.toString, so 2023 becomes "2023". Line 4 asks the String for its length, 4, which is the number of digits.

One catch: a negative number such as -45 becomes "-45", whose length is 3, counting the minus sign. Integer.toString(Math.abs(value)) fixes that.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Conditional execution

Programs that choose.

<!--
Part 2 of 2. Conditional execution: running code only when a condition holds.
-->

---
minutes: 1
---

# Until now, programs did one thing after another

- So far: Java programs that run **in sequence**
- They could not **choose** between possibilities
- Now, they will!

<!--
So far we have only considered Java programs that do one thing after another, in sequence: the first line, then the second, then the third, every time. Our programs have not had the ability to choose between different possibilities. Now, they will.
-->

---
minutes: 2
---

# Behold the if-statement: code that runs only when a condition is true

<div class="cols wide-left center">
<div>

```java
int x = 4;
if (x < 5) {
    System.out.println("x is small!");
}
```

</div>
<div>

- `x is small!` prints **only if** x is less than 5
- Here we know it is, but x could come from **user input** or a file

</div>
</div>

<!--
Behold! The if-statement. The code sets x to 4. Then if, in parentheses, x < 5, followed by a block in braces containing a println. "x is small!" will only print out if x is less than 5.

In this case, we know that it is, since x is 4. But x could come from user input, a file, or elsewhere, and then the program would not know in advance; the if-statement lets it decide while running. The less-than sign is a comparison: it gives back a boolean, true or false.
-->

---
minutes: 2
---

# Anatomy of an if: a condition and a block of statements

<div class="anat">

<div class="an-code">
<span class="an-if">if</span>( <span class="an-cond">condition</span> ){<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="an-st">statements;</span><br>
}
</div>

<div class="an-labels">
<div><span class="an-if">if</span> The if part</div>
<div><span class="an-cond">condition</span> Any boolean expression</div>
<div><span class="an-st">statements;</span> Executable statements</div>
</div>

</div>

<style>
.anat { display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; align-items: center; margin-top: 10px; }
.an-code { font-family: var(--slidev-font-mono, monospace); font-size: 34px; font-weight: 700; line-height: 1.9; }
.an-if, .an-cond, .an-st { padding: 1px 8px; border-radius: 8px; border: 3px solid; }
.an-if { border-color: var(--c-accent); color: var(--c-accent); }
.an-cond { border-color: var(--c-accent-2); color: var(--c-accent-2); }
.an-st { border-color: #15803d; color: #15803d; border-style: dashed; }
.an-labels { display: flex; flex-direction: column; gap: 16px; font-size: 22px; }
.an-labels span { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; margin-right: 10px; border-width: 2px; }
</style>

<!--
The anatomy of an if, with each part boxed in its own color. The word if, in indigo, is the if part. Inside the parentheses, in orange, is the condition, which can be any boolean expression: a comparison like x < 5, a boolean variable, a call like word.equals("yes"), or several combined with AND, OR, and NOT. Inside the braces, dashed in green, are the executable statements: any number of lines, which run only if the condition is true.

There is no semicolon after the closing parenthesis. A semicolon there ends the if-statement immediately, and the block below then runs every time, a classic bug.
-->

---
minutes: 1.5
---

# The idea of an if: if the condition is true, then do something

<div class="cols center">
<div>

- A very natural **if-then** relationship
- If the condition is true, then do something

</div>
<div class="card orange">

**If** I win a million dollars,<br>
**then** I'll yodel like an insane Swiss monkey.

</div>
</div>

<!--
The idea of an if is a very natural if-then sort of relationship: if the condition is true, then do something. For example: if I win a million dollars, then I'll yodel like an insane Swiss monkey. "I win a million dollars" is the condition, which is true or false. "Yodel like an insane Swiss monkey" is the action, which happens only when the condition is true. If the condition is false, the action is skipped, and life continues with whatever comes after.
-->

---
minutes: 2.5
---

# Try it: change x and watch the body run or get skipped

<IfDemo />

<!--
The interactive has a slider for x, from 0 to 10, and the if-statement from the earlier slide, followed by a line that prints "done". Next to the condition, a tag shows its value for the current x, such as "4 < 5 is true".

When the condition is true, the println inside the braces is marked "runs", and the console shows "x is small!" and then "done". When x is 5 or more, the condition is false: the line inside is crossed out and marked "skipped", and the console shows only "done". The line after the closing brace runs either way, because it is not part of the if. At exactly 5, 5 < 5 is false.
-->

---
minutes: 4
---

# Example: does the user know the secret password?

<div>
<div>

```java
Scanner in = new Scanner(System.in);
System.out.print("What is the secret password? ");
String guess = in.next();
if (guess.equals("eggplant")) {
  System.out.println("Congratulations! You know the password.");
}
```

</div>
<div style="margin-top: 10px">

<PasswordDemo />

</div>
</div>

<style>
.slidev-layout .slidev-code { font-size: 18px !important; }
</style>

<!--
Write a program that prompts the user for the secret password. If they enter the word "eggplant", congratulate them for knowing the password.

The code prompts with print, reads one word with in.next(), and then uses an if-statement whose condition is guess.equals("eggplant"). equals gives back a boolean, so it can be the condition directly. If it is true, the congratulations are printed; otherwise nothing is printed.

The interactive on the right has a text box for the guess. It shows whether guess.equals("eggplant") is true or false, and the console shows what the program would print. Only exactly eggplant works: "Eggplant" with a capital E is false, because equals checks case.

Comparing Strings with == instead of equals is a common mistake that often appears to work and then fails; the reason comes later in the course. For Strings, always use equals.
-->

---
layout: center
class: text-center
minutes: 5
---

# Quiz

<!--
Time for the in-class quiz, on wrapper classes and if-statements.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- Wrapper classes: `Integer`, `Double`, `Character`
- `Integer.parseInt("847")` is 847; bad text throws **NumberFormatException**
- `Integer.toString(543)` or `"" + 543` gives `"543"`
- `Character.isDigit`, `isLetter`, `isUpperCase`, `isLowerCase`
- `if (condition) { statements; }` runs the statements only when the condition is true

<!--
Summary. One: Integer, Double, and Character are the wrapper classes for int, double, and char. Two: Integer.parseInt turns a String of digits into an int, and text that is not a number throws a NumberFormatException. Three: Integer.toString, or concatenating with an empty String, turns an int into a String. Four: Character's isDigit, isLetter, isUpperCase, and isLowerCase test a char. Five: an if-statement runs its statements only when its condition is true.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Foundations of Programming Languages (FPL)
- **Competency:** convert between Strings and numbers, and write a simple conditional
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

# Next time: more on if-statements, else, and conditions

<div class="cols">
<div class="card blue">

### Next time

- More on **if** statements
- **else** statements
- Conditions

</div>
<div class="card orange">

### Reminders

- Read Chapter 4

</div>
</div>

<Credit />

<!--
Next time: more on if-statements, else statements, and conditions. Reminder: read Chapter 4 of the textbook.
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
