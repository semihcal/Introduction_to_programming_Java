---
theme: ../../theme
title: COMP 1600 – Week 5, Lecture 1 – Repetition and while Loops
info: |
  Programs learn to repeat. We meet the while loop, trace exactly how it
  checks its condition and jumps back to the top, and use it to print
  numbers and to sum and average numbers a user types until a sentinel value.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 5</div>

# Repeat <span class="hl">while</span> the condition is true

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Repetition</span>
  <span>while loops</span>
  <span>Tracing</span>
  <span>Sentinel values</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#c2410c" />
      </marker>
    </defs>
    <rect x="60" y="20" width="200" height="60" rx="14" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="160" y="58" text-anchor="middle" class="cover-art-name" style="font-size: 22px">i &lt;= 100 ?</text>
    <rect x="60" y="130" width="200" height="60" rx="14" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="160" y="168" text-anchor="middle" class="cover-art-obj" style="font-size: 22px">print i; ++i</text>
    <path d="M160 82 L 160 126" fill="none" stroke="#c2410c" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M260 160 C 310 160, 310 50, 264 50" fill="none" stroke="#c2410c" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M60 50 C 10 50, 10 260, 100 260" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="8 6" />
    <text x="160" y="268" text-anchor="middle" class="cover-art-name" style="font-size: 20px; fill: #475569">false: done</text>
  </svg>
</div>
</div>

<!--
This lecture has three parts. First, repetition: the last basic tool, which lets a program do something over and over. Second, the while loop: how it is written, and exactly how it runs, step by step. Third, using a while loop with input: summing and averaging numbers that a user types, stopping at a sentinel value.

The drawing on the right is a loop. A box at the top asks "i <= 100 ?". An orange arrow leads down to a box that says "print i; ++i", and a second orange arrow curves from that box back up to the question. A dashed gray line leaves the question on the left and leads to "false: done". The program keeps going around the orange cycle while the condition is true, and leaves when it becomes false.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for iteration and tracing; secondary is Foundations of Programming Languages (FPL) for loop semantics.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do three things

<div class="card">

- **Write** a while loop that counts or repeats a task <span class="tag">SDF</span>
- **Trace** a while loop line by line, including when the condition is checked <span class="tag">SDF</span>
- **Read** input until a sentinel value, and sum or average it <span class="tag">SDF</span>

</div>

<!--
These are the three objectives for today. SDF is the CS2023 knowledge area Software Development Fundamentals.
-->

---
minutes: 2
---

# Predict first: how many times does the loop body run?

<div class="cols wide-left center">
<div>

```java
int i = 10;
while (i > 0) {
    i -= 3;
}
```

<p class="small">Count the passes through the body. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['3 times', '4 times', 'Forever']"
  :answer="1"
  explain="4 times. i goes 10, 7, 4, 1, then -2. The condition is checked before each pass; it is false only once i reaches -2."
/>

</div>
</div>

<!--
The code sets i to 10, then, while i is greater than 0, subtracts 3 from i. How many times does the body run?

The answer is 4 times. Before the first pass, 10 > 0 is true, and i becomes 7. 7 > 0 is true, and i becomes 4. 4 > 0 is true, and i becomes 1. 1 > 0 is still true, and i becomes -2. Now -2 > 0 is false, and the loop ends. The condition was checked 5 times, and the body ran 4 times.

3 times is the common answer: 10 divided by 3 is about 3, but the last pass happens at i = 1, which is still greater than 0. "Forever" would need i to never reach 0 or below, but it decreases every pass.
-->

---
minutes: 1
---

# Last time: if and switch statements

<div class="cols center">
<div class="card blue">

### if

- if, if-else, else-if chains
- Pitfalls: empty statements, indentation

</div>
<div class="card orange">

### switch

- Jump to the matching case; break
- Arrow syntax and switch expressions

</div>
</div>

<!--
What did we talk about last time? if and switch statements: if, if-else, and else-if chains, with their pitfalls; and switch, classic with break, and the newer arrow syntax and switch expressions.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: if-statements, their pitfalls, and switch.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Repetition

Doing something over and over.

<!--
Part 1 of 3. Repetition, the last of the basic tools.
-->

---
minutes: 1.5
---

# The past: the tools we already have

<div class="cols center">
<div class="card">

*"Those who cannot remember the past are condemned to repeat it."*

— George Santayana

</div>
<div>

What is our past?

- Basic data types
- Mathematical and String operations
- Input and output
- Conditional execution

</div>
</div>

<!--
"Those who cannot remember the past are condemned to repeat it", wrote the philosopher George Santayana. Today, repeating is the goal.

What is our past? The tools we have so far: basic data types, like int, double, char, boolean, and String; mathematical and String operations; input and output, with Scanner and System.out; and conditional execution, with if and switch.
-->

---
minutes: 1.5
---

# Repetition: doing something over and over again

- To these tools, we add **repetition**
- With repetition, we can solve practically **any problem** that can be solved with a computer
- It uses the computer's most famous ability: **speed**

<!--
To these tools, we add repetition: the ability to do something over and over again. With repetition in the mix, we can solve practically any problem that can be solved with a computer; sequence, selection, and repetition are, in principle, all a programming language needs. Repetition leverages the most famous ability of the computer, speed: a modern processor can run a simple loop body a billion times in about a second.
-->

---
minutes: 1.5
---

# Mechanics: a loop runs a block of code repeatedly

- Repetition in Java works mainly through **loops**
- A loop is a block of code executed repeatedly some number of times, **perhaps zero**
- As the statements run, the **variables change**
- It isn't the same thing over and over (unless a mistake was made)

<!--
The main way that repetition works in Java is through loops. A loop is a block of code that will be executed repeatedly some number of times, perhaps even zero, if the condition is false from the start. As the statements are executed, the variables change, so each pass does something different: it prints the next number, or adds the next input. It isn't just repeating the same thing over and over, unless a mistake was made, such as forgetting to change the variable that the condition depends on.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# while loops

The simplest loop in Java.

<!--
Part 2 of 3. The while loop.
-->

---
minutes: 1.5
---

# A while loop is an if-statement that jumps back to the top

<div class="cols center">
<div>

- The **simplest** loop in Java
- Looks like an **if** statement
- At the **end** of the body, it jumps back to the **top**
- If the condition is still true, the body runs **again**

</div>
<div>

```java
if (condition) {
    statements;
}

while (condition) {
    statements;
}
```

</div>
</div>

<!--
The simplest loop in Java is the while loop. It looks similar to an if statement, as the two pieces of code show: the only difference in writing is the word while instead of if. The difference in running is that, when you get to the end of the while loop's body, execution jumps back to the top and checks the condition again. If the condition is still true, it executes the body of the loop again. An if runs its body at most once; a while runs it as many times as the condition stays true.
-->

---
minutes: 1.5
---

# Anatomy of a while loop

<div class="anat">

<div class="an-code">
<span class="an-w">while</span>( <span class="an-cond">condition</span> ) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="an-st">statement1;<br>
&nbsp;&nbsp;&nbsp;&nbsp;statement2;<br>
&nbsp;&nbsp;&nbsp;&nbsp;…<br>
&nbsp;&nbsp;&nbsp;&nbsp;statementn;</span><br>
}
</div>

<div class="an-labels">
<div><span class="an-cond">condition</span> checked before every pass</div>
<div><span class="an-st">statements</span> a whole bunch of statements: the body</div>
</div>

</div>

<style>
.anat { display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; align-items: center; }
.an-code { font-family: var(--slidev-font-mono, monospace); font-size: 28px; font-weight: 700; line-height: 1.6; }
.an-w, .an-cond { padding: 1px 8px; border-radius: 8px; border: 3px solid; }
.an-w { border-color: var(--c-accent); color: var(--c-accent); }
.an-cond { border-color: var(--c-accent-2); color: var(--c-accent-2); }
.an-st { color: #15803d; }
.an-labels { display: flex; flex-direction: column; gap: 18px; font-size: 22px; }
.an-labels span { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; margin-right: 10px; border-width: 2px; }
.an-labels .an-st { padding: 1px 8px; border: 2px dashed #15803d; border-radius: 8px; }
</style>

<!--
The anatomy of a while loop. The keyword while, in indigo; a condition in parentheses, in orange, which is checked before every pass; and a body in braces, in green: a whole bunch of statements, statement1, statement2, up to statementn. The body runs, top to bottom, every time the condition is true.
-->

---
minutes: 1
---

# A while loop with only one statement needs no braces

<div class="cols center">
<div>

- A while loop usually has **multiple** statements
- With only **one**, the braces are optional, like an if

</div>
<div>

```java
while (condition)
    statement;
```

</div>
</div>

<!--
A while loop will usually have multiple statements in its body. However, it is possible to make a while loop with only a single statement. Then, like an if-statement, the braces are optional. The same warning applies as for if: without braces, only the first statement is in the loop, whatever the indentation suggests.
-->

---
minutes: 2
---

# Printing the numbers from 1 to 100

<div class="cols center">
<div>

- Print the numbers from **1 to 100**
- We could do this with lots of copy/paste, or…

</div>
<div>

```java {1|2|3|4|2|all}
int i = 1;
while (i <= 100) {
    System.out.println(i);
    ++i;
}
```

</div>
</div>

<!--
Let's print the numbers from 1 to 100. We could do this with lots of copy and paste: 100 println statements. Or with a loop.

The code sets i to 1. While i is less than or equal to 100, it prints i and then adds 1 to i. The first pass prints 1, and i becomes 2; the condition is checked again, 2 <= 100 is true, so it prints 2, and so on. After printing 100, i becomes 101, the condition 101 <= 100 is false, and the loop ends. Three lines inside a loop replace 100 lines of code, and changing 100 to a million is a one-character edit.
-->

---
minutes: 1
---

# Rules for while

1. The loop executes each statement **one by one**
2. When execution gets to the **bottom**, it jumps to the **top**
3. If the condition is **still true** (i.e., `i <= 100`), it repeats the loop

<!--
Rules for while. The while loop executes each statement one by one, from the top of the body to the bottom. When execution gets to the bottom, it jumps to the top. If the condition is still true, in the example i <= 100, it repeats the loop; otherwise it continues with the first statement after the loop.

The condition is only checked at the top. If i became 101 halfway through the body, the rest of the body would still run before the check.
-->

---
minutes: 3
---

# Try it: step through the loop one line at a time

<LoopTrace :n="4" />

<!--
The interactive steps through a smaller version of the printing loop: int i = 1; while (i <= 4), print i, then ++i. Each press of Step moves one line. The current line is highlighted, the box shows the value of i, the console shows what has been printed, and the sentence underneath explains the step.

The pattern: check the condition, print, add 1, jump back to the top, check again. When i reaches 5, the check 5 <= 4 is false, and execution leaves the loop. The final message counts that the condition was checked 5 times while the body ran 4 times: the condition is always checked one more time than the body runs, because the last check is the one that fails.
-->

---
minutes: 3
---

# Workings of a while loop: what we know about the condition

<div class="cols center">
<div>

```java
// line A
while (condition) {
    // line B
    statement1;
    statement2;
    // line C
    …
    statementn;
}
// line D
```

</div>
<div>

| Line | Condition |
| --- | --- |
| A | <span v-click="1">Unknown</span> |
| B | <span v-click="2"><b>True</b></span> |
| C | <span v-click="3">Unknown</span> |
| D | <span v-click="4"><b>False</b></span> |

</div>
</div>

<!--
The workings of a while loop: at each marked line, what do we know about the condition? Line A is just before the loop, line B is the first line inside the body, line C is in the middle of the body, after some statements, and line D is just after the loop.

At line A, the condition is unknown: nothing has checked it yet. At line B, it is true: the only way to get inside the body is for the condition to have just been checked and found true. At line C, it is unknown again: statement1 and statement2 may have changed the variables it depends on. At line D, it is false: the only way out of a while loop is for the condition to be checked and found false. (A break statement is an exception, but these loops do not use one.)

These facts are useful for reasoning about loops: right after a while loop, you always know its condition is false.
-->

---
minutes: 2
---

# Check: what does this loop print?

<div class="cols wide-left center">
<div>

```java
int n = 1;
while (n < 20) {
    n = n * 3;
}
System.out.println(n);
```

</div>
<div>

<Quiz
  :options="['9', '20', '27']"
  :answer="2"
  explain="27. n goes 1, 3, 9, 27. At 27 the condition 27 < 20 is false, so the loop stops, and 27 is printed: after the loop, the condition is always false."
/>

</div>
</div>

<!--
The code sets n to 1, triples it while it is less than 20, and then prints n.

The answer is 27. n goes from 1 to 3, then 9, then 27. 9 < 20 is true, so 9 is tripled to 27; then 27 < 20 is false, so the loop stops and 27 is printed. This matches line D from the previous slide: after the loop, n < 20 is false, so the printed value must be 20 or more.

9 stops one pass too early. 20 is the limit in the condition, but n never equals 20: it only takes the values 1, 3, 9, and 27.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Loops and input

Summing until a sentinel.

<!--
Part 3 of 3. Using a while loop to read input.
-->

---
minutes: 1.5
---

# Summing numbers: how do we know when to stop?

- while loops help us deal with **input**
- Sum all the numbers a person enters
- How would we know when to **stop**?
- Keep adding until the person enters a **negative number**
- This is called using a **sentinel value**

<!--
We can also use while loops to help us deal with input. What if we wanted to sum all of the numbers that a person entered? How would we know when to stop? The program cannot know in advance how many numbers there will be. One solution is to keep adding numbers until the person enters a negative number. A special value that marks the end of the input is called a sentinel value, like a sentry who signals that nothing more is coming. It only works when the sentinel could never be real data; here, the numbers being summed are never negative.
-->

---
minutes: 3
---

# Summing numbers: the solution

```java {1-3|4|5|6-7|4|9|all}
int i = 0;
int sum = 0;
Scanner in = new Scanner(System.in);
while (i >= 0) {
    sum += i;
    System.out.print("Enter number: ");
    i = in.nextInt();
}
System.out.println("Sum: " + sum);
```

<!--
The solution. i, the number most recently entered, starts at 0, and sum starts at 0. While i is not negative, the body adds i to sum, then prompts and reads the next number into i. When the user types a negative number, the condition i >= 0 is false at the next check, and the program prints the sum.

The order inside the body is the trick. Each number is added at the start of the next pass, after the condition has confirmed it is not negative, so the negative sentinel is never added. Starting i at 0 makes the first pass harmless: it adds 0 to sum, then reads the first real number. For the inputs 4, 6, and -1, the sum is 10.
-->

---
minutes: 3
---

# Finding the average: count the numbers too

```java {all|3,7|11|12}
int i = 0;
double sum = 0;
int count = 0;
Scanner in = new Scanner(System.in);
while (i >= 0) {
    sum += i;
    ++count;
    System.out.print("Enter number: ");
    i = in.nextInt();
}
--count; // Fixes extra count for sentinel
System.out.println("Average: " + (sum / count));
```

<style>
.slidev-layout .slidev-code { font-size: 19px !important; line-height: 1.35 !important; }
</style>

<!--
We could also find the average. The changes from the sum: sum is now a double, so that sum / count is double division and keeps its fraction; and a new variable count is incremented in every pass.

After the loop, --count subtracts one, and then the average, sum / count, is printed. Why subtract one? count goes up on every pass, including the first pass, which happens before any number is read and adds the starting 0. The sentinel itself is never counted, because the loop ends before the pass that would count it. So count is always one more than the number of real values, and --count fixes it. For 4, 6, and -1: count reaches 3, becomes 2, and the average is 10.0 / 2 = 5.0.

If the very first number is negative, count becomes 0 and the program prints NaN, "not a number", because 0.0 / 0 has no answer. Checking for that needs an if, after the loop.
-->

---
minutes: 4
---

# Try it: type numbers until a negative one ends the loop

<SentinelDemo />

<!--
The interactive runs the average program. Typing a number and pressing Enter runs one more pass of the loop, exactly as the code does: the boxes show i, sum, and count after each number, and the console shows the conversation.

Typing 4, then 6, shows sum 10.0 and count 3: the count includes the first pass, which added the starting 0. Typing a negative number, such as -1, ends the loop: it is not added, --count brings count to 2, and the console prints "Average: 5.0". Reset starts again. Typing a negative number first shows the NaN case from the previous slide.
-->

---
hide: true
minutes: 2
---

# Four things to remember from today

- A **loop** repeats a block of code; the variables change each pass
- `while (condition) { body }`: check, run, jump back to the top
- After the loop, the condition is **false**
- A **sentinel value** (like a negative number) marks the end of input

<!--
Summary. One: a loop repeats a block of code, and the variables change on each pass. Two: a while loop checks its condition, runs its body if it is true, and jumps back to the top to check again. Three: right after a while loop, its condition is false. Four: a sentinel value, such as a negative number, can mark the end of input when the program cannot know in advance how much input there will be.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Foundations of Programming Languages (FPL)
- **Competency:** write and trace while loops, including sentinel-controlled input
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

# Next time: more loop examples and loop pitfalls

<div class="cols">
<div class="card blue">

### Next time

- More loop examples
- Loop pitfalls

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 5

</div>
</div>

<Credit />

<!--
Next time: more loop examples, and loop pitfalls. Reminder: keep reading Chapter 5 of the textbook.
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
