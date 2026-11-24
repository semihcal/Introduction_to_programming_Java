---
theme: ../../theme
title: COMP 1600 – Week 4, Lecture 2 – if Pitfalls and switch Statements
info: |
  We review if, if-else and else-if chains, then look at the most common
  if-statement mistakes. We print DNA base names with if-statements and then
  with switch, including the newer arrow syntax and switch expressions.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 4</div>

# Jump straight to the <span class="hl">matching case</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>if review</span>
  <span>Pitfalls</span>
  <span>DNA example</span>
  <span>switch</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#c2410c" />
      </marker>
    </defs>
    <rect x="10" y="130" width="100" height="60" rx="12" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="60" y="168" text-anchor="middle" class="cover-art-name" style="font-size: 22px">base</text>
    <g style="font-size: 22px">
      <rect x="190" y="10" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="3" /><text x="250" y="43" text-anchor="middle" class="cover-art-name" style="font-size: 22px">case 'A'</text>
      <rect x="190" y="80" width="120" height="50" rx="10" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="250" y="113" text-anchor="middle" class="cover-art-obj" style="font-size: 22px">case 'C'</text>
      <rect x="190" y="150" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="3" /><text x="250" y="183" text-anchor="middle" class="cover-art-name" style="font-size: 22px">case 'G'</text>
      <rect x="190" y="220" width="120" height="50" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="3" /><text x="250" y="253" text-anchor="middle" class="cover-art-name" style="font-size: 22px">case 'T'</text>
    </g>
    <path d="M112 152 L 186 108" fill="none" stroke="#c2410c" stroke-width="4" marker-end="url(#cover-arrow)" />
  </svg>
</div>
</div>

<!--
This lecture has four parts. First, a review of if, if-else, nested ifs, and chains of exclusive choices. Second, pitfalls: common mistakes that make code run or skip by accident. Third, an example that prints the name of a DNA base, written three ways with if-statements. Fourth, switch statements: the classic form with break, the newer arrow form, and switch expressions that give back a value.

The drawing on the right shows a box labeled base on the left and four boxes on the right, labeled case 'A', case 'C', case 'G', and case 'T'. An orange arrow goes straight from base to case 'C', which is highlighted: a switch jumps directly to the case that matches, instead of testing each condition in turn.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for selection statements and debugging; secondary is Foundations of Programming Languages (FPL) for switch semantics, fall-through, and switch expressions.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Spot** empty statements, misleading indentation, and wrong conditions <span class="tag">SDF</span>
- **Write** an else-if chain for a list of cases <span class="tag">SDF</span>
- **Trace** a switch with and without break <span class="tag">FPL</span>
- **Write** a switch expression with `->` <span class="tag">FPL</span>

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
int balance = 50;
if (balance < 0); {
    System.out.println("You owe a fee!");
}
```

<p class="small">Look closely at the end of the if line. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['Nothing', 'You owe a fee!', 'A compile error']"
  :answer="1"
  explain="You owe a fee! The semicolon after the condition is an empty statement: the if controls nothing, and the block below always runs."
/>

</div>
</div>

<!--
The code sets balance to 50, then has an if with condition balance < 0, but with a semicolon right after the closing parenthesis, followed by a block that prints "You owe a fee!".

The answer is that it prints "You owe a fee!", even though 50 is not less than 0. The semicolon ends the if-statement: the if controls an empty statement, which does nothing. The block in braces is then an ordinary block that always runs.

"Nothing" is what the programmer intended. "A compile error" is what most people expect, but Java compiles it without complaint. This is the first pitfall in today's Part 2.
-->

---
minutes: 1
---

# Last time: if, else, and nested selection statements

<div class="cols center">
<div class="card blue">

### if and else

- `if (condition) { … } else { … }`
- `condition ? a : b`

</div>
<div class="card orange">

### Nesting

- ifs inside ifs
- else-if chains

</div>
</div>

<!--
What did we talk about last time? if-statements; else statements, and the conditional operator that picks a value; and nested selection statements: ifs inside ifs, and chains of else if.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: conditions, if-else, the conditional operator, and nesting.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# if review

if, if-else, nesting, and chains.

<!--
Part 1 of 4. A review of the shapes of if-statements.
-->

---
minutes: 1
---

# Anatomy of an if, and of an if-else

<div class="cols center">
<div>

```java
if (condition) {
    statements;
}
```

<p class="small">The if part, any boolean expression, and executable statements.</p>

</div>
<div>

```java
if (condition) {
    statements1;
}
else {
    statements2;
}
```

<p class="small">Two different outcomes.</p>

</div>
</div>

<!--
The anatomy of an if: the if part, a condition that can be any boolean expression, and a block of executable statements that run only when the condition is true.

The anatomy of an if-else: two different outcomes. statements1 run when the condition is true, statements2 run when it is false, and exactly one of the two runs.
-->

---
minutes: 1
---

# Nested ifs: an inner if runs only if the outer one does

```java
if (condition1) {
    statement1;
    if (condition2) {
        if (condition3)
            statement2;
        …
    }
}
```

<!--
Nested ifs. statement1 runs when condition1 is true. condition2 is checked only then, and condition3 only when condition2 is also true; statement2 runs only when all three conditions are true.
-->

---
minutes: 1.5
---

# A series of exclusive choices: the first true condition wins

```java
if (condition1) {
    statements1;
}
else if (condition2) {
    statements2;
}
…
else {
    defaultStatements;
}
```

<!--
A series of exclusive choices. The conditions are checked from the top: condition1, then condition2, and so on, possibly up to conditionN. The block of the first condition that is true runs, and the rest of the chain is skipped. If none is true, the final else runs its default statements. Exactly one block runs. The final else is optional; without it, possibly nothing runs.
-->

---
minutes: 2
---

# Example: you can never break the speed of light

- The speed of light **c** is about 3 × 10<sup>8</sup> m/s
- Given a double named `speed`, print an error message if speed is larger than c

<div v-click>

```java
if (speed > 3e8) {
    System.out.println("Error: faster than light!");
}
```

</div>


<!--
Sometimes you probably break the speed limit, but there's one speed limit you can never break: the speed of light, c, is about 3 times 10 to the 8 metres per second. Given a variable named speed of type double, what's an if-statement that will print an error message if speed is larger than c?

The answer, revealed on click: if (speed > 3e8), print an error message. 3e8 is Java's scientific notation for 3 times 10 to the 8, a double literal; writing 300000000.0 works too. Strictly greater than is the right choice: a speed exactly equal to c is not larger than c. The exact value is 299,792,458 metres per second.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Pitfalls

Mistakes that run or skip code by accident.

<!--
Part 2 of 4. Pitfalls with if-statements.
-->

---
minutes: 1
---

# Watch out: now you control the flow of execution

- You now control **which code runs**
- A wider range of mistakes is possible
- Huge chunks of code can be **executed or skipped** by mistake
- A few things to watch out for…

<!--
Now you are controlling the flow of execution in your program. There is a wider range of mistakes you can make when giving instructions: huge chunks of code can be executed or skipped by mistake, and the program still compiles and runs. Here are a few things to watch out for.
-->

---
minutes: 2
---

# Pitfall 1: an empty statement after the condition

- An if-statement is not a regular statement
- It does **not** end with a semicolon

```java
if (balance < 0);  // empty statement
{  // this block always runs
    System.out.println("You owe a fee!");
    balance -= 15;
}
```


<!--
Remember that an if-statement is not a regular statement: it does not end with a semicolon. In the code, the semicolon after if (balance < 0) is an empty statement, a statement that does nothing, and it is all the if controls. The block in braces below is not part of the if: it always runs, so every customer is told they owe a fee and is charged 15, whatever their balance. This is the opening question again.
-->

---
minutes: 2
---

# Pitfall 2: indentation that doesn't match the code

- In some languages, indentation actually matters
- **Java ignores whitespace**
- `"Fight!"` prints **no matter what**

```java
if (enemies > 2)
    System.out.println("Run away!");
else
    defense = true;
    System.out.println("Fight!");
```


<!--
In some languages, such as Python, indentation actually matters. Java ignores whitespace. In the code, the else has no braces, so it controls only defense = true. The println of "Fight!" is indented to look like part of the else, but it is the next statement after the whole if-else, so "Fight!" prints no matter what: even after "Run away!". The fix is braces around both statements of the else.
-->

---
minutes: 1.5
---

# Pitfall 3: imprecise conditions

- Logical errors in conditions are easy to make
- Airline rule: **two or fewer** bags

```java
if (bags < 2) {  // only allows 1 or 0
    boarding = true;
}
```

<p class="small">Too restrictive. It should be:</p>

```java
if (bags <= 2) {
    boarding = true;
}
```


<!--
It's easy to make logical errors when writing conditions. If an airline allows two or fewer bags on the plane, someone might code that as bags < 2. But that only allows 1 or 0 bags: a passenger with exactly 2 bags is turned away. That is too restrictive. It should be bags <= 2. Checking the boundary value, here exactly 2, is the quickest way to catch this kind of mistake.
-->

---
minutes: 1.5
---

# Pitfall 4: reversed conditions

- It's easy to get a condition **backwards**
- Don't assume you wrote it correctly
- **Always double check**

```java
if (number % 3 == 0) { // Wrong!
    System.out.println("Not divisible by 3!");
}
else {
    System.out.println("Divisible by 3!");
}
```


<!--
Sometimes it's easy to get a condition backwards. In the code, number % 3 == 0 is true exactly when number is divisible by 3, but that branch prints "Not divisible by 3!", and the else prints "Divisible by 3!". The two messages are swapped. Try not to assume you wrote the condition correctly; always double check, for example by tracing the code with one number that is divisible by 3, such as 9, and one that is not, such as 10.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# if examples

Printing the names of DNA bases.

<!--
Part 3 of 4. A longer example with else-if chains.
-->

---
minutes: 1
---

# DNA: print the chemical name of a base

- A variable `base` of type `char` holds one of `'A'`, `'C'`, `'G'`, `'T'`
- Print the name of the base:

| Char | Name |
| --- | --- |
| A | Adenine |
| C | Cytosine |
| G | Guanine |
| T | Thymine |

<!--
Assume that you have a variable called base of type char, containing one of 'A', 'C', 'G', or 'T'. Write a series of if- and else-statements that will print out the chemical name of the base denoted by the corresponding character: A is adenine, C is cytosine, G is guanine, and T is thymine. These are the four bases of DNA.
-->

---
minutes: 2
---

# Printing DNA bases with an else-if chain

```java {1-2|3-4|5-8|9-10}
if (base == 'A')
    System.out.println("Adenine");
else if (base == 'C')
    System.out.println("Cytosine");
else if (base == 'G')
    System.out.println("Guanine");
else if (base == 'T')
    System.out.println("Thymine");
else
    System.out.println("Your base doesn't belong to us");
```

<p class="small">What if you want to take care of upper and lower cases?</p>

<!--
Printing DNA bases with an else-if chain. If base == 'A', print "Adenine"; else if base == 'C', print "Cytosine"; else if 'G', "Guanine"; else if 'T', "Thymine"; else print "Your base doesn't belong to us". Chars are compared with double equals, because char is a primitive type. The final else catches any other character.

What if you want to take care of upper and lower cases? With this code, a lowercase 'a' falls through every test to the final else.
-->

---
minutes: 1.5
---

# Upper and lower case bases using logic: `||`

```java
if (base == 'A' || base == 'a')
    System.out.println("Adenine");
else if (base == 'C' || base == 'c')
    System.out.println("Cytosine");
else if (base == 'G' || base == 'g')
    System.out.println("Guanine");
else if (base == 'T' || base == 't')
    System.out.println("Thymine");
else
    System.out.println("Your base doesn't belong to us");
```

<p class="small">Is there a simpler way?</p>

<!--
Upper and lower case bases using logic. Each condition now uses OR: base == 'A' || base == 'a' is true for either case, and the same for C, G, and T. It works, but every condition doubles in length. Is there a simpler way?
-->

---
minutes: 1.5
---

# Upper and lower case bases using character conversion

```java {1|all}
base = Character.toUpperCase(base);
if (base == 'A')
    System.out.println("Adenine");
else if (base == 'C')
    System.out.println("Cytosine");
else if (base == 'G')
    System.out.println("Guanine");
else if (base == 'T')
    System.out.println("Thymine");
else
    System.out.println("Your base doesn't belong to us");
```

<style>
.slidev-layout .slidev-code { font-size: 19px !important; line-height: 1.4 !important; }
</style>

<!--
Upper and lower case bases using character conversion. The first line converts base to uppercase with Character.toUpperCase, from the Character wrapper class: 'a' becomes 'A', and 'A' stays 'A'. After that, the original chain that only checks uppercase letters works for both. Converting the input once, before testing it, is simpler than testing every possible form.
-->

---
minutes: 2
---

# Try it: which version recognizes which base?

<DnaDemo />

<!--
The interactive has buttons for the value of base: 'A', 'C', 'G', 'T', lowercase 'a' and 'g', and 'X'. For each value it shows what four versions print: the plain else-if chain, the chain with OR, the version that calls Character.toUpperCase first, and the switch version from Part 4.

For the uppercase letters all four agree. For lowercase 'a', the plain chain prints "Your base doesn't belong to us", while the other three print "Adenine". For 'X', all four print "Your base doesn't belong to us".
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# switch statements

A cleaner way to list possibilities.

<!--
Part 4 of 4. switch statements.
-->

---
minutes: 1
---

# if-statements are okay, but the DNA example was clunky

- Didn't that DNA example seem a little **clunky**?
- Surely there is a cleaner way to express a **list of possibilities**
- Enter: the **switch** statement

<!--
if-statements are okay. But didn't that DNA example seem a little clunky? The same variable was compared again and again. Surely there is a cleaner way to express a list of possibilities. Enter: the switch statement.
-->

---
minutes: 1.5
---

# Anatomy of a switch statement

<div class="cols center">
<div>

```java
switch (data) {
    case value1:
        statements1;
    case value2:
        statements2;
    …
    case valueN:
        statementsN;
    default:
        defaultStatements;
}
```

</div>
<div>

- `data` is the value being checked
- Each `case` gives one value it might have
- `default` handles anything else

</div>
</div>

<!--
The anatomy of a switch statement. switch, then the data being checked in parentheses, then a block. Inside, each case gives one value, followed by a colon and the statements for that value: case value1, statements1; case value2, statements2; up to case valueN. Finally, default, followed by the statements to run when no case matches. As the next slides show, without break statements execution continues from one case into the next.
-->

---
minutes: 2
---

# DNA hittin' switches

```java
switch (base) {
    case 'A': System.out.println("Adenine");
        break;
    case 'C': System.out.println("Cytosine");
        break;
    case 'G': System.out.println("Guanine");
        break;
    case 'T': System.out.println("Thymine");
        break;
    default: System.out.println("Your base doesn't "
                 + "belong to us");
        break; // unnecessary
}
```

<style>
.slidev-layout .slidev-code { font-size: 19px !important; line-height: 1.4 !important; }
</style>

<!--
The DNA example as a switch. switch (base); case 'A' prints "Adenine", then break; case 'C' prints "Cytosine", then break; and the same for 'G' and 'T'; default prints "Your base doesn't belong to us". Each break leaves the switch, so only one name is printed. The break after default is unnecessary, since the switch ends there anyway, but it does no harm.

Compared with the else-if chain, base is written once, and each case is a single value.
-->

---
minutes: 3
---

# Peculiarities of switch: without break, execution falls through

<SwitchDemo />

<p class="small">The break is optional, and so is the default.</p>

<!--
The peculiarities of switch. The code switches on data, which is 3. case 3 prints "Three" and has no break. case 4 prints "Four", then breaks. case 5 prints "Five". Both "Three" and "Four" are printed: execution jumps to case 3, prints "Three", and then keeps going into case 4's statements, because nothing stopped it, until it reaches the break. This is called fall-through. The break is optional, and the default is optional too.

The interactive has buttons for data, 2 to 6, and a checkbox that adds a break after case 3. The case it jumps to is marked, the lines that run are highlighted, and the console shows the output. With data 3 and no break, it prints Three and Four. With the break added, only Three. With 4, only Four. With 5, Five. With 2 or 6, nothing, because no case matches and there is no default.
-->

---
minutes: 2
---

# Rules for switch

1. The data must be an **int**, a **char**, or a **String**
2. The value for each case must be a **literal**
3. Execution **jumps** to the case that matches
4. If no case matches, it goes to **default**
5. If there is no default, it **skips** the whole switch
6. Execution continues until it hits a **break**

<!--
Rules for switch. One: the data that you are performing your switch on must be an int, a char, or a String. (byte, short, and enums are allowed too; double and boolean are not.) Two: the value for each case must be a literal, such as 3 or 'A' or "Feb", or a constant; it cannot be a variable or a range like x > 5. Three: execution will jump to the case that matches. Four: if no case matches, it will go to default. Five: if there is no default, it will skip the whole switch block. Six: execution will continue until it hits a break, or the end of the switch.

Rule two is why switch suits a list of specific values, while if-statements handle ranges and complex conditions.
-->

---
minutes: 1.5
---

# DNA with upper and lower case: stack the cases

```java
switch (base) {
    case 'A': case 'a':
        System.out.println("Adenine");
        break;
    case 'C': case 'c':
        System.out.println("Cytosine");
        break;
    case 'G': case 'g':
        System.out.println("Guanine");
        break;
    case 'T': case 't':
        System.out.println("Thymine");
        break;
    default: System.out.println("Your base doesn't belong to us");
}
```

<style>
.slidev-layout .slidev-code { font-size: 18px !important; line-height: 1.35 !important; }
</style>

<!--
DNA with upper and lower case, using fall-through on purpose. case 'A': case 'a': puts two labels on the same statements. If base is 'A', execution jumps there; if base is 'a', it jumps to the second label, which is right before the same println. Either way, "Adenine" is printed, then break. The same is done for C, G, and T. Fall-through is a trap when a break is forgotten, but useful when several values share the same code.
-->

---
minutes: 1.5
---

# Updated switch syntax: `->` needs no break

- A forgotten or misplaced **break** causes careless errors
- **Java 12** introduced, and **Java 14** made permanent, a new syntax
- Each case is a label, an **arrow** `->`, and **one** line of code; execution then **leaves** the switch
- More than one statement? Surround them with **braces** `{ }`

<!--
The use of break statements can result in careless errors if a break is accidentally left out, or added where it isn't needed. New syntax, introduced in Java 12 and made permanent in Java 14, makes it possible to write cases that execution will jump to, execute, and then leave the switch block, without the need for a break.

Instead of a case being followed by a label, a colon, the code to execute, and then a break, each case is followed by the label, an arrow, and then a single line of executable code. If more than one statement is included, the statements must be surrounded by curly braces. Several labels can share one case, separated by commas. The arrow form never falls through.
-->

---
minutes: 1.5
---

# DNA with upper and lower case, arrow style

```java
switch (base) {
    case 'A', 'a' -> System.out.println("Adenine");
    case 'C', 'c' -> System.out.println("Cytosine");
    case 'G', 'g' -> System.out.println("Guanine");
    case 'T', 't' -> System.out.println("Thymine");
    default -> System.out.println("Your base doesn't "
                                + "belong to us");
}
```

<!--
The DNA example with the arrow syntax. case 'A', 'a' -> prints "Adenine": the two labels are separated by a comma, and after the arrow comes one statement. No break is needed: after running its statement, execution leaves the switch. The same is done for C, G, and T, and default -> prints the error message. This is the shortest correct version of the example.
-->

---
minutes: 2
---

# switch expressions give back a value

```java
int length = switch (month) {
    case "Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec" -> 31;
    case "Apr", "Jun", "Sep", "Nov" -> 30;
    case "Feb" -> 28;
    default -> 0;
};
```

- A **switch expression** returns a value
- First way to return a value from a case: the **arrow** `->`

<!--
A switch expression returns a value, like the conditional operator does. Here the switch on the String month is on the right of int length =. If month is "Jan", "Mar", "May", "Jul", "Aug", "Oct", or "Dec", the value after the arrow is 31; for "Apr", "Jun", "Sep", or "Nov", it is 30; for "Feb", 28 (ignoring leap years); and for anything else, the default gives 0. That value is stored in length. Note the semicolon after the closing brace: the whole switch is part of an assignment statement.

There are two ways to return a value from a case. The first is the arrow syntax: the value after the arrow is the result.
-->

---
minutes: 1.5
---

# The second way is yield: for a case that needs several statements

```java
String dayText = switch (day) {
    case 1 -> {
        System.out.println("Monday selected");
        yield "Monday";
    }
    case 2 -> "Tuesday";
    default -> "Another day";
};
```

<!--
The second way is yield. Use yield when a case needs multiple statements. In the code, case 1 has a block in braces: it prints "Monday selected", and then yield "Monday" makes "Monday" the value of the whole switch expression. A case with a single value, like case 2 -> "Tuesday", needs no yield. The default gives "Another day". (The original slide showed only case 1; case 2 and the default were added here so the example is complete.)

yield is to a switch expression roughly what break is to a switch statement, except that it also hands back a value.
-->

---
minutes: 1.5
---

# Pitfall: a switch expression must cover every value

```java
String dayType = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
};   // compile-time error
```

- A switch expression gives back a value, so it must be **exhaustive**
- Values such as 8, 10, or -1 would have **no result**

<!--
A pitfall: a switch expression that doesn't cover all values. Here day is an int, with cases for 1 to 5, giving "Weekday", and 6 and 7, giving "Weekend". Because a switch expression gives back a value, it must be exhaustive, meaning that it covers every possible value. Otherwise, if some input to the switch has no matching case, the overall value of the switch cannot be determined.

Java gives a compile-time error, saying the switch expression does not cover all possible input values, because values such as 8, 10, or -1 would have no result. Adding default -> "Invalid" fixes it.
-->

---
minutes: 1
---

# A caution about switch

- Using if-statements is usually **safer**
- if-statements are generally **clearer** and more **flexible**
- switch statements are only for **long lists of specific cases**
- Be careful about **inconsistent use of break**

<!--
A caution about switch. Using if-statements is usually safer, and if-statements are generally clearer and more flexible: they can test ranges, doubles, and combined conditions. switch statements are only for long lists of specific cases. With the classic syntax, be careful about inconsistent use of break; the arrow syntax avoids that problem.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- No semicolon after `if (…)`; Java ignores indentation
- Check boundaries (`<` vs `<=`) and double-check reversed conditions
- `Character.toUpperCase` simplifies case-insensitive tests
- Classic switch: jump to the case, run until **break**
- Arrow switch `->` never falls through; switch expressions must be exhaustive

<!--
Summary. One: never put a semicolon right after an if's condition, and remember that Java ignores indentation. Two: check boundary values, such as less than versus less than or equal to, and double-check that conditions are not reversed. Three: converting input with Character.toUpperCase makes case-insensitive tests simpler. Four: a classic switch jumps to the matching case and runs until a break. Five: the arrow switch never falls through, and a switch expression must cover every possible value.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Foundations of Programming Languages (FPL)
- **Competency:** write, trace, and debug selection statements, including switch
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

# Next time: review

<div class="cols">
<div class="card blue">

### Next time

- Review

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 4

</div>
</div>

<Credit />

<!--
Next time: review. Reminder: keep reading Chapter 4 of the textbook.
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
