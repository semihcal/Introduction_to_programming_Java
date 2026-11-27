---
theme: ../../theme
title: COMP 1600 – Week 6, Lecture 1 – Nested Loops and for Loops
info: |
  We nest one loop inside another to print triangle patterns, compare
  Java's three kinds of loops, and learn the for loop and the enhanced for
  loop. Then we print odd numbers and estimate π by throwing random darts.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 6</div>

# Start, end, and step <span class="hl">in one line</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Nested loops</span>
  <span>for loops</span>
  <span>Enhanced for</span>
  <span>Monte Carlo π</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <g font-family="JetBrains Mono, monospace" font-weight="700">
      <text x="40" y="60" style="font-size: 34px" fill="#3730a3">*</text>
      <text x="40" y="110" style="font-size: 34px" fill="#3730a3">* *</text>
      <text x="40" y="160" style="font-size: 34px" fill="#3730a3">* * *</text>
      <text x="40" y="210" style="font-size: 34px" fill="#3730a3">* * * *</text>
    </g>
    <path d="M 220 260 A 70 70 0 0 1 290 190" fill="none" stroke="#c2410c" stroke-width="4" />
    <rect x="220" y="190" width="70" height="70" fill="none" stroke="#0f172a" stroke-width="2" />
    <circle cx="240" cy="230" r="4" fill="#3730a3" /><circle cx="262" cy="214" r="4" fill="#3730a3" /><circle cx="282" cy="200" r="4" fill="#c2410c" /><circle cx="230" cy="205" r="4" fill="#3730a3" />
    <text x="255" y="296" text-anchor="middle" class="cover-art-obj" style="font-size: 20px">≈ π / 4</text>
  </svg>
</div>
</div>

<!--
This lecture has four parts. First, nested loops: a loop inside another loop, used to print a triangle pattern. Second, Java's three kinds of loops, and when each one fits. Third, for loops, and the enhanced for loop that steps through every element of a collection. Fourth, two examples with for loops: printing the first n odd numbers, and estimating pi with random numbers.

The drawing on the right shows two of today's ideas. On the left, a triangle of stars: one star, then two, then three, then four, printed by nested loops. On the right, a square with a quarter circle and a few dots, darts thrown at random; the fraction inside the quarter circle is about pi over 4.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for for loops, nested iteration, and choosing a loop; secondary are Foundations of Programming Languages (FPL) for loop forms, and Mathematical and Statistical Foundations (MSF) for the Monte Carlo method.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Write** nested loops and count how many times the inner body runs <span class="tag">SDF</span>
- **Choose** between while, for, and do-while <span class="tag">SDF</span>
- **Write** a for loop and an enhanced for loop <span class="tag">FPL</span>
- **Estimate** π with a Monte Carlo simulation <span class="tag">MSF</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals, FPL is Foundations of Programming Languages, and MSF is Mathematical and Statistical Foundations.
-->

---
minutes: 2
---

# Predict first: what is count at the end?

<div class="cols wide-left center">
<div>

```java
int count = 0;
int i = 0;
while (i < 3) {
    int j = 0;
    while (j < 4) {
        ++count;
        ++j;
    }
    ++i;
}
```

</div>
<div>

<Quiz
  :options="['7', '12', '4']"
  :answer="1"
  explain="12. The inner loop runs 4 times for each of the 3 passes of the outer loop: 3 × 4 = 12."
/>

</div>
</div>

<!--
The outer loop runs with i equal to 0, 1, and 2: three passes. Each pass starts j at 0 and runs the inner loop with j equal to 0, 1, 2, and 3: four passes, each adding 1 to count.

The answer is 12: 3 outer passes times 4 inner passes. 7 adds the two loop counts instead of multiplying them. 4 counts the inner loop only once, forgetting that j is reset to 0 on every outer pass.
-->

---
minutes: 1
---

# Last time: while loop examples and loop pitfalls

<div class="cols center">
<div class="card blue">

### Examples

- Sums, averages, biggest input
- The guessing game

</div>
<div class="card orange">

### Pitfalls

- Infinite loops, off by one
- Skipped loops, stray semicolons

</div>
</div>

<!--
What did we talk about last time? while loop examples: sums, averages, the biggest input, and the guessing game. And loop pitfalls: infinite and almost infinite loops, fencepost errors, skipped loops, and misplaced semicolons.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: while loop examples and pitfalls.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Nested loops

A loop inside a loop.

<!--
Part 1 of 4. Nested loops.
-->

---
minutes: 1.5
---

# Nested loops: a repetitive task inside another repetitive task

- Just as with if-statements, loops can be **nested**
- A repetitive task can be done **inside** another repetitive task
- **Be careful!** You can make the computer do a lot of work

<!--
Just as with if-statements, it's possible to nest loops. A repetitive task can be done inside of another repetitive task: for every row, print every column; for every student, process every grade.

Be careful: you can make the computer do a lot of work. The inner body runs once for every combination: an outer loop of 1,000 passes around an inner loop of 1,000 passes runs the inner body a million times, as the opening question showed on a small scale.
-->

---
minutes: 2
---

# Triangular numbers: 1, 3, 6, 10, …

<div class="cols center">
<div>

| n | Triangular number |
| --- | --- |
| 1 | 1 = 1 |
| 2 | 3 = 1 + 2 |
| 3 | 6 = 1 + 2 + 3 |
| 4 | 10 = 1 + 2 + 3 + 4 |

</div>
<div>

Print the nth triangular number as a picture:

```text
*
**
***
****
```

</div>
</div>

<!--
Triangular numbers are 1, 3, 6, 10, and so on. 1 is 1. 3 is 1 + 2. 6 is 1 + 2 + 3. 10 is 1 + 2 + 3 + 4. The nth triangular number is the sum of the numbers from 1 to n. (The original slide has a typo, "10 + 1 + 2 + 3 + 4"; it means 10 = 1 + 2 + 3 + 4.)

Let's write a program that expresses the nth triangular number by printing 1 on the first line, 1 and 2 on the second line, 1, 2, and 3 on the third line, and so on; or, as pictured, one star, then two, then three, then four. The total number of symbols printed is the triangular number: 10 stars for n = 4. Each line is a repetitive task, printing symbols, inside another repetitive task, printing lines: a nested loop.
-->

---
minutes: 3
---

# Try it: nested while loops print the triangle

<NestedStars />

<!--
The interactive shows the nested while loops and their output. The outer loop counts row from 1 to n. For each row, the inner loop counts col from 1 to row, printing one symbol each time; then println ends the line, and row goes up. The inner loop's limit is row, so each line is one longer than the last. The slider sets n from 1 to 8, and the checkbox switches between stars and the numbers 1 to row, as described on the previous slide.

The sentence underneath counts how many times the inner body ran: 1 + 2 + 3 + 4 = 10 for n = 4, the 4th triangular number. Unlike the opening question, where the inner loop always ran 4 times, here it runs a different number of times on each outer pass.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Other kinds of loops

while is not the only loop.

<!--
Part 2 of 4. Java's other kinds of loops.
-->

---
minutes: 1.5
---

# Java has 3 loops, each for a different situation

| Loop | Used when |
| --- | --- |
| **while** | you **don't know** how many times you will repeat |
| **for** | you **do know** how many times you will repeat |
| **do-while** | never… oh okay: the loop must run **at least once** |

<!--
There are three loops in Java. while loops are used when you don't know how many times you are going to need to repeat, like reading input until a sentinel. for loops are used when you do know how many times you are going to repeat, like printing 100 numbers. do-while loops are used never. Oh, okay: they're used whenever you need to be guaranteed that the loop runs at least once, because a do-while checks its condition at the end instead of the beginning. do-while loops come next lecture.
-->

---
minutes: 1
---

# Loops are interchangeable

- Any problem that uses loops can use **any kind** of loop
- The choice is meant to make things **easier for the programmer**
- Some loops are more **convenient** for certain problems

<!--
Loops are interchangeable. Any problem that uses loops can use any kind of loop: anything written with a for loop can be rewritten with a while loop, and the reverse. The choice is supposed to make things easier on the programmer. Some loops are more convenient for certain kinds of problems, and choosing the natural one makes the code shorter and the intent clearer.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# for loops

The most commonly used loop.

<!--
Part 3 of 4. for loops, and the enhanced for loop.
-->

---
minutes: 1.5
---

# for loops are great when you know how many times a loop will run

- The **most commonly used** of all loops
- Perfect for any task that needs to run, say, **100 times**
- A for loop has **3 parts** in its header:
  1. **Initialization**
  2. **Condition**
  3. **Increment**

<!--
for loops are great when you know how many times a loop will run. They are the most commonly used of all loops, and they are perfect for any task that needs to run, say, 100 times. A for loop has 3 parts in its header: an initialization, a condition, and an increment.
-->

---
minutes: 2
---

# Anatomy of a for loop: starting point, ending point, way to progress

<div class="fan">
<div class="fan-code">for( <span class="f1">init</span>; <span class="f2">condition</span>; <span class="f3">inc</span> ) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;statement1;<br>
&nbsp;&nbsp;&nbsp;&nbsp;statement2;<br>
&nbsp;&nbsp;&nbsp;&nbsp;…<br>
&nbsp;&nbsp;&nbsp;&nbsp;statementn;<br>
}</div>
<div class="fan-l">
<div><span class="f1">init</span> Starting point</div>
<div><span class="f2">condition</span> Ending point</div>
<div><span class="f3">inc</span> Way to progress</div>
</div>
</div>

<style>
.fan { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; align-items: center; }
.fan-code { font-family: var(--slidev-font-mono, monospace); font-size: 23px; font-weight: 700; line-height: 1.6; }
.f1, .f2, .f3 { padding: 1px 8px; border-radius: 8px; border: 3px solid; }
.f1 { border-color: #15803d; color: #15803d; }
.f2 { border-color: var(--c-accent); color: var(--c-accent); }
.f3 { border-color: var(--c-accent-2); color: var(--c-accent-2); }
.fan-l { display: flex; flex-direction: column; gap: 18px; font-size: 24px; }
.fan-l span { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; margin-right: 10px; border-width: 2px; }
</style>

<!--
The anatomy of a for loop. In the parentheses after for are three parts separated by semicolons: init, in green, the starting point; condition, in indigo, the ending point; and inc, in orange, the way to progress. Then the body: statement1 to statementn, in braces.

The order they run in: init runs once, at the very start. Then the condition is checked; if true, the body runs, then inc runs, and the condition is checked again. When the condition is false, the loop ends. So a for loop is a while loop with its setup and its update moved into the header.
-->

---
minutes: 1
---

# A for loop with only one statement needs no braces

<div class="cols center">
<div>

- A for loop usually has **multiple** statements
- With only **one**, the braces are optional, like if and while

</div>
<div>

```java
for (init; condition; inc)
    statement;
```

</div>
</div>

<!--
A for loop will usually have multiple statements in its body. However, it is possible to make a for loop with only a single statement. Then, like if-statements and while loops, the braces are optional, with the same warning: only the first statement belongs to the loop.
-->

---
minutes: 1
---

# for loop example: print 1 to 100, first with while

```java
int i = 1;
while (i <= 100) {
    System.out.println(i);
    ++i;
}
```

<div class="callout">Start, end, and step are on <b>three different lines</b>.</div>

<!--
Let's print the numbers from 1 to 100, again. Remember how this was done with while: int i = 1 before the loop, the condition i <= 100 in the while, and ++i at the bottom of the body. The three pieces that control the loop, start, end, and step, are spread over three different lines, and forgetting the ++i gives an infinite loop.
-->

---
minutes: 1.5
---

# The same loop as a for loop: initialization and increment are built in

```java
for (int i = 1; i <= 100; ++i) {
    System.out.println(i);
}
```

<div class="callout">Same start, same end, same step, all in <b>one header</b>.</div>

<!--
A for loop is specifically designed for this sort of thing. The initialization, int i = 1, and the increment, ++i, are built into the header, next to the condition, i <= 100. The body is just the println. It does exactly what the while version did, in three lines instead of five, and the increment cannot be forgotten at the bottom of the body.

One difference: i is declared inside the for header, so it only exists inside the loop. After the closing brace, i can no longer be used.
-->

---
minutes: 3
---

# Try it: the order the three parts of a for loop run in

<ForTrace :n="3" />

<!--
The interactive steps through for (int i = 1; i <= 3; ++i) with a println in the body. Each Step highlights the part that runs, shows the value of i, adds the part to the running order, and shows the console.

The order is: init once; then cond, body, inc; cond, body, inc; cond, body, inc; and a final cond that is false. The initialization runs once, the body and the increment 3 times, and the condition 4 times. The increment happens after the body, so the body sees i = 1, 2, and 3, and the loop ends when i is 4.
-->

---
minutes: 2.5
---

# The enhanced for loop visits every element of a collection

<div class="esyn">for ( <span class="e1">type name</span> : <span class="e2">collection</span> ) { … }</div>

```java
int[] scores = {90, 75, 88};
for (int score : scores) {
    System.out.println(score);
}
```

- Read `:` as **"in"**: for each score **in** scores
- No index, no condition, no increment: Java visits **every element in order**
- Works on **arrays** and **collections**, not on a plain number range

<style>
.esyn { font-family: var(--slidev-font-mono, monospace); font-size: 26px; font-weight: 700; text-align: center; margin-bottom: 10px; }
.e1, .e2 { padding: 1px 8px; border-radius: 8px; border: 3px solid; }
.e1 { border-color: var(--c-accent); color: var(--c-accent); }
.e2 { border-color: var(--c-accent-2); color: var(--c-accent-2); }
</style>

<!--
Right after the regular for loop, Java has a second form: the enhanced for loop, also called the for-each loop. Its header is a type and a variable name, a colon, and a collection of values. Read the colon as "in": for each score in scores.

The example uses an array, a list of values stored under one name; int[] scores = {90, 75, 88} is an array of three ints. Arrays are covered properly later in the course; for now it is enough to know it holds several values in order. The loop runs once per element: score is 90 on the first pass, 75 on the second, and 88 on the third, so it prints 90, 75, 88.

There is no index, no condition, and no increment to write or get wrong: Java visits every element, in order, from first to last. The trade-off is that the enhanced for only works on arrays and collections; it cannot count from 1 to 100 by itself, and it gives no position number. Changing score inside the loop changes only the copy, not the array.
-->

---
minutes: 2.5
---

# Regular for vs enhanced for: same output

```java
String word = "hi!";
```

```java
for (int i = 0; i < word.length(); ++i)
    System.out.println(word.charAt(i));
```

<p class="small">Regular for: you control the <b>index</b> i.</p>

```java
for (char c : word.toCharArray())
    System.out.println(c);
```

<p class="small">Enhanced for: Java hands you <b>each char</b>.</p>

<div class="callout">Enhanced for: visit <b>every</b> element. Regular for: you need the <b>index</b>, another step, or only part.</div>

<style>
.slidev-layout .slidev-code { font-size: 19px !important; }
.slidev-layout p.small { margin: 2px 0 6px; }
</style>

<!--
The same job written both ways: printing each character of "hi!" on its own line.

Both loops use the String word, "hi!", declared once at the top. On the left, a regular for loop counts an index i from 0 up to, but not including, word.length(), and prints word.charAt(i). On the right, an enhanced for loop: word.toCharArray() turns the String into an array of chars, and for each char c in that array, it prints c. Both print h, i, and an exclamation mark, on three lines.

The callout gives the rule of thumb. Use the enhanced for to visit every element, in order, when the position does not matter: it is shorter and cannot go out of bounds. Use the regular for when you need the index, for example to print "position 2 is !", to go backwards, to skip every other element, or to visit only part of the collection.
-->

---
minutes: 2
---

# Check: what does this enhanced for loop print?

<div class="cols wide-left center">
<div>

```java
int total = 0;
int[] nums = {4, 7, 1};
for (int n : nums) {
    total += n;
}
System.out.println(total);
```

</div>
<div>

<Quiz
  :options="['3', '12', '471']"
  :answer="1"
  explain="12. n is 4, then 7, then 1, and each is added to total: 4 + 7 + 1 = 12."
/>

</div>
</div>

<!--
The code adds up the elements of an array with an enhanced for loop and prints the total.

The answer is 12. The loop body runs once per element: n is 4, then 7, then 1, and each value is added to total, giving 4 + 7 + 1 = 12.

3 is the number of elements, which is how many times the body runs, not what it adds. 471 would be concatenating the numbers as text, but total is an int, so += adds.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# for loop examples

Odd numbers and an estimate of π.

<!--
Part 4 of 4. Two examples with for loops.
-->

---
minutes: 3
---

# Odd numbers: print the first n odd numbers

<div class="cols" style="grid-template-columns: 0.75fr 1.25fr">
<div>

- Ask the user for a positive integer **n**
- Print the first **n** odd numbers
- If the user enters 10:

```text
1 3 5 7 9 11 13 15 17 19
```

</div>
<div v-click>

```java
Scanner in = new Scanner(System.in);
int n = in.nextInt();
for (int i = 1; i <= n; ++i) {
    System.out.print((2 * i - 1) + " ");
}
```

<p class="small">Or step by 2: <code>for (int k = 1; k &lt; 2 * n; k += 2)</code></p>

</div>
</div>

<style>
.slidev-layout .slidev-code { font-size: 19px !important; }
</style>

<!--
Ask the user to input a positive integer n. Now, write a for loop to print out the first n odd numbers. For example, if the user enters 10, print out 1 3 5 7 9 11 13 15 17 19.

One solution, revealed on click: read n, then let i count from 1 to n, and print 2 times i minus 1, followed by a space. For i = 1 that is 1, for i = 2 it is 3, and for i = 10 it is 19. The loop runs exactly n times, so a for loop is the natural choice: the number of passes is known before the loop starts.

Another solution uses the increment part of the header: start k at 1 and add 2 each time, while k is less than 2n. The increment does not have to be ++.
-->

---
minutes: 2.5
---

# Approximating π: throw darts at a square

<div class="cols center">
<div>

- **Monte Carlo** approximation of π
- "Throw" random darts at a **1 × 1 square** in the upper right of a circle of radius 1
- Count the darts **inside** the circle, divide by the **total**
- That fraction ≈ the area of **one fourth** of the circle
- Multiply by **4** to approximate π

</div>
<div>

```java
int inside = 0;
for (int k = 0; k < darts; ++k) {
    double x = Math.random();
    double y = Math.random();
    if (x * x + y * y <= 1.0)
        ++inside;
}
double pi = 4.0 * inside / darts;
```

</div>
</div>

<!--
We can do something called a Monte Carlo approximation of pi, named after the casino, because it uses randomness. We "throw" darts at a 1 by 1 square in the upper right corner of a circle with radius 1, centered at the origin. We count the ones that fall inside the circle and divide by the total darts thrown. That fraction is an estimate of the area of one fourth of the circle, compared with the area of the square, 1. The quarter circle's area is pi times 1 squared, divided by 4, so multiplying the fraction by 4 approximates pi.

The code: for each dart, Math.random() gives a random x and a random y between 0 and 1. The dart is inside the circle when its distance from the origin is at most 1, which by Pythagoras means x squared plus y squared is at most 1. After the loop, 4.0 times inside divided by darts is the estimate. 4.0 is a double, so the division keeps its fraction.
-->

---
minutes: 3
---

# Try it: throw darts and watch the estimate approach π

<MonteCarlo />

<!--
The interactive throws random darts at the unit square. Darts inside the quarter circle are drawn in indigo, darts outside in orange. The buttons throw 1, 10, 100, or 1000 more darts, and the panel shows the counts and the estimate, 4 times inside divided by total.

With 10 darts, the estimate is rough, often 2.8 or 3.6. With a few thousand, it is usually within a few hundredths of 3.1416. The error shrinks slowly: to get one more correct digit, you need about 100 times as many darts. Monte Carlo methods are used for problems that are hard to solve exactly, such as weather and financial risk.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- Nested loops: the inner body runs once per **combination**
- while: unknown count; for: known count; do-while: at least once
- `for (init; condition; inc)`: init once, then condition, body, inc
- `for (type x : collection)` visits **every element** in order
- Random sampling (Monte Carlo) can estimate π

<!--
Summary. One: in nested loops, the inner body runs once for every combination of outer and inner passes. Two: while loops suit an unknown number of repetitions, for loops a known number, and do-while loops a body that must run at least once. Three: in a for loop, init runs once, then the condition, body, and increment repeat. Four: the enhanced for loop visits every element of an array or collection, in order. Five: random sampling, the Monte Carlo method, can estimate pi.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Foundations of Programming Languages (FPL), Mathematical and Statistical Foundations (MSF)
- **Competency:** write nested loops, for loops, and enhanced for loops, and choose a loop for a task
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

# Next time: do-while loops and more examples

<div class="cols">
<div class="card blue">

### Next time

- **do-while** loops
- Examples with for loops and do-while loops

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 5

</div>
</div>

<Credit />

<!--
Next time: do-while loops, and examples with for loops and do-while loops. Reminder: keep reading Chapter 5 of the textbook.
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
