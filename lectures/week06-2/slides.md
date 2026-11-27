---
theme: ../../theme
title: COMP 1600 – Week 6, Lecture 2 – Primes, for Loop Pitfalls and do-while Loops
info: |
  We use for loops to test whether a number is prime and to list all the
  primes up to a number, look at the common mistakes with for loops, and
  meet the do-while loop, which always runs at least once, with a menu
  program as the example.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 6</div>

# A do-while loop runs <span class="hl">at least once</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Prime numbers</span>
  <span>for loop pitfalls</span>
  <span>do-while</span>
  <span>Menus</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#c2410c" />
      </marker>
    </defs>
    <rect x="60" y="30" width="200" height="70" rx="14" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="160" y="72" text-anchor="middle" class="cover-art-obj" style="font-size: 22px">body</text>
    <path d="M160 102 L 160 156" fill="none" stroke="#c2410c" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="60" y="160" width="200" height="70" rx="14" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="160" y="202" text-anchor="middle" class="cover-art-name" style="font-size: 22px">condition?</text>
    <path d="M262 195 C 310 195, 310 65, 264 65" fill="none" stroke="#c2410c" stroke-width="4" marker-end="url(#cover-arrow)" />
    <text x="160" y="280" text-anchor="middle" class="cover-art-name" style="font-size: 20px; fill: #475569">body first, check after</text>
  </svg>
</div>
</div>

<!--
This lecture has three parts. First, a quick review of for loops and two examples: testing whether a number is prime, and listing all the primes up to a number with nested loops. Second, common loop errors, this time with for loops. Third, the do-while loop, which runs its body at least once, with a menu program as the example.

The drawing on the right shows a do-while loop. The body box is at the top and the condition box is below it: an arrow runs from the body down to the condition, and a curved arrow runs from the condition back up to the body. The body comes first and the check comes after, so the body always runs at least once.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for loops, nested loops, and debugging; secondary are Foundations of Programming Languages (FPL) for the do-while form, and Mathematical and Statistical Foundations (MSF) for primality.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do three things

<div class="card">

- **Test** whether a number is prime with a for loop, and list primes with nested loops <span class="tag">SDF</span>
- **Spot** infinite, off-by-one, skipped, and semicolon errors in for loops <span class="tag">SDF</span>
- **Write** a do-while loop for a menu <span class="tag">FPL</span>

</div>

<!--
These are the three objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and FPL is Foundations of Programming Languages.
-->

---
minutes: 2
---

# Predict first: what does this code print?

<div class="cols wide-left center">
<div>

```java
int x = 10;
do {
    System.out.println(x);
    ++x;
} while (x < 5);
```

<p class="small">10 < 5 is false from the start. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['Nothing', '10', '10 11 12 … forever']"
  :answer="1"
  explain="10. A do-while runs its body first and checks the condition after. The body prints 10, then 11 < 5 is false, and the loop ends."
/>

</div>
</div>

<!--
The code sets x to 10 and has a loop that starts with the word do, prints x, adds 1, and only at the bottom says while (x < 5).

The answer is that it prints 10, once. A do-while loop runs its body first and checks the condition afterwards. So the body runs once, printing 10 and making x 11; then the condition 11 < 5 is false, and the loop ends.

"Nothing" is what a while loop with the same condition would print, since 10 < 5 is false at the first check. "Forever" would need the condition to stay true, but x only grows. Today's third part covers the do-while loop.
-->

---
minutes: 1
---

# Last time: for loops and loop examples

<div class="cols center">
<div class="card blue">

### for loops

- `for (init; condition; inc)`
- Enhanced for: every element

</div>
<div class="card orange">

### Examples

- Nested loops and triangles
- Odd numbers, Monte Carlo π

</div>
</div>

<!--
What did we talk about last time? for loops, with their three-part header, and the enhanced for loop that visits every element of a collection. And loop examples: nested loops printing triangles, the first n odd numbers, and estimating pi with random darts.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: nested loops, for loops, the enhanced for loop, and the examples.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# for loops and primes

A review, then two examples.

<!--
Part 1 of 3. A quick review of for loops, then two examples with prime numbers.
-->

---
minutes: 1.5
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
A review of the anatomy of a for loop. The header has three parts: init, the starting point; condition, the ending point; and inc, the way to progress. init runs once; then the condition, body, and increment repeat until the condition is false.
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
A for loop will usually have multiple statements in its body. However, it is possible to make a for loop with only a single statement; then, like if-statements and while loops, the braces are optional.
-->

---
minutes: 1.5
---

# Prime? Test whether n can be divided by a smaller number

- Prompt the user for a number **n**
- Use a **for loop** to see whether n can be evenly divided by numbers **smaller than n**
- If it can't, it is **prime**
- You only know the answer **after the loop runs**
- Print **Prime** or **Composite**

<!--
Write a program that prompts the user for a number n. Use a for loop to try to see if n can be evenly divided by numbers smaller than n, other than 1. If it can't, then it is prime. You'll only know whether or not a number is prime after the loop runs: one divisor proves it is composite, but proving it is prime means checking every candidate. Print "Prime" if the number is prime and "Composite" if it is not.
-->

---
minutes: 3
---

# Prime? A boolean flag that the loop can switch off

```java {all|3|4-7|8-11}
Scanner in = new Scanner(System.in);
int n = in.nextInt();
boolean prime = n > 1;
for (int d = 2; d < n; ++d) {
    if (n % d == 0)
        prime = false;
}
if (prime)
    System.out.println("Prime");
else
    System.out.println("Composite");
```

<style>
.slidev-layout .slidev-code { font-size: 19px !important; line-height: 1.4 !important; }
</style>

<!--
One solution. The program reads n. A boolean variable, prime, starts out true for any n greater than 1; 1 and smaller numbers are not prime by definition. This variable is called a flag.

The for loop tries every d from 2 up to n - 1. If n % d == 0, d divides n evenly, so the flag is switched off: prime becomes false. Nothing ever switches it back on.

After the loop, the flag holds the answer: if no d divided n, prime is still true, and the program prints "Prime"; otherwise it prints "Composite". The if comes after the loop, not inside it, because the answer is only known once every d has been tried.

A faster version could stop at the first divisor, or only try d up to the square root of n; this version keeps the idea simple.
-->

---
minutes: 3
---

# Try it: which numbers divide n?

<PrimeDemo />

<!--
The interactive shows the trial division. The slider sets n from 2 to 60. Each candidate d from 2 to n - 1 is shown, and the ones that divide n evenly are highlighted. If none are, the verdict is Prime; otherwise it names the first divisor and how many there are, and the verdict is Composite. The bottom row lists all the primes from 2 up to n, which is the next problem.

At 21, 3 and 7 divide it, so it is composite. At 23, nothing does: prime. At 2, there is no d to try, so the loop body never runs and the flag stays true: 2 is prime, correctly.
-->

---
minutes: 3
---

# Lists of primes: put the prime test inside another loop

```java {1|2-5|6-7|all}
for (int k = 2; k <= n; ++k) {
    boolean prime = true;
    for (int d = 2; d < k; ++d)
        if (k % d == 0)
            prime = false;
    if (prime)
        System.out.print(k + " ");
}
```

<div class="callout">The inner loop is the test from before, applied to each k from 2 to n.</div>

<!--
Now, ask the user to enter a number and print out all the prime numbers from 2 up to that number. Using nested loops, you can use the loop from the previous problem to test whether a given number is prime.

The outer loop goes through every candidate k from 2 to n. For each k, a fresh flag starts true, and the inner loop is the prime test from before, with k in place of n: every d from 2 to k - 1. After the inner loop, if the flag is still true, k is printed. For n = 20, it prints 2 3 5 7 11 13 17 19.

The flag must be reset to true at the start of every outer pass, inside the outer loop. Declaring it once before the outer loop is a classic bug: after the first composite number, it would stay false, and no more primes would be printed.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Common loop errors

This time with for loops.

<!--
Part 2 of 3. Common loop errors, this time with for loops.
-->

---
minutes: 2
---

# Infinite for loops are unusual, but possible

```java
for ( ; ; ) {
    System.out.println("Hey!");
}
```

<p class="small">No condition means always true. This situation is more likely:</p>

```java
for (int i = 0; i < 10; ++i) {
    System.out.println(i);
    // Lots of other code
    --i; // Whoops, maybe changed from while?
}
```


<style>
.slidev-layout .slidev-code { font-size: 19px !important; }
</style>

<!--
Infinite for loops are unusual, but possible. All three parts of the header are optional: for ( ; ; ) has no initialization, no condition, and no increment. A missing condition counts as true, so it prints "Hey!" forever.

The second situation is more likely. The header increments i, but somewhere in the body, among lots of other code, --i undoes it, perhaps left over from converting a while loop into a for loop. Every pass adds 1 and subtracts 1, so i is 0 at every check and the loop prints 0 forever. The rule: in a for loop, change the loop variable only in the header.
-->

---
minutes: 1.5
---

# (Almost) infinite for loops: overflow eventually ends them

```java
for (int i = 1; i <= 40; --i) {
// Whoops, should have been ++i
    System.out.println(i);
}
```

<div class="callout">i goes 1, 0, −1, … past −2,147,483,648, <b>underflows</b> to 2,147,483,647, and the loop ends.</div>

<!--
Overflow and underflow will make some badly written loops eventually terminate. Here the header says --i instead of ++i. i goes down from 1: 0, -1, -2, and so on, always less than or equal to 40. After about 2.1 billion passes, i reaches the minimum int, -2,147,483,648; one more decrement underflows to 2,147,483,647, which is greater than 40, and the loop ends. It is the same bug as last week's while version.
-->

---
minutes: 1.5
---

# Fencepost errors: being off by one

```java
// Runs 39 times
for (int i = 1; i < 40; ++i) {
    System.out.println(i);
}
```

<div class="callout">To run 40 times starting at 1, use <code>i &lt;= 40</code>; starting at 0, use <code>i &lt; 40</code>.</div>

<!--
Being off by one is a very common loop error. This loop runs 39 times: i goes from 1 to 39, and stops when i < 40 becomes false at 40.

The callout gives the two common patterns. Starting at 1 and going up to and including the count uses <=: i from 1 to 40. Starting at 0 and stopping before the count uses <: i from 0 to 39. Both run 40 times. Mixing them, starting at 1 with <, loses one pass. Starting at 0 with < is the usual pattern in Java, because positions in Strings and arrays start at 0.
-->

---
minutes: 1.5
---

# Skipping loops entirely: a condition that starts out false

```java
// Oops, should be <=
for (int i = 1; i >= 40; ++i) {
    System.out.println(i);
}
```

<div class="callout">If the condition isn't true to begin with, the loop is just skipped.</div>

<!--
If the condition isn't true to begin with, the loop will just be skipped. The condition here is i >= 40, but i starts at 1: 1 >= 40 is false at the very first check, so the body never runs and nothing is printed. In a for loop, the condition is checked before the first pass, exactly as in a while loop.
-->

---
minutes: 2
---

# Misplaced semicolon: the loop runs, then prints only 41

```java
int i = 0;
for (i = 1; i <= 40; ++i); { // Semicolon is wrong
    System.out.println(i);
}
```

- Everything looks good, and the loop even **terminates**
- But only **one** number is printed: **41**
- This wouldn't even **compile** if i were declared inside the loop

<!--
A misplaced semicolon can cause an empty loop body to be executed. The semicolon after the for header is the loop's entire body: an empty statement. The loop runs 40 times doing nothing but incrementing i, and it terminates, so everything looks fine. When it ends, i is 41. Then the block in braces runs once, as an ordinary block, and prints 41.

Fortunately, this code would not even compile if i were declared inside the loop, as in for (int i = 1; ...): that i would only exist inside the loop, so the println after it could not see any i, and the compiler would report an error. Declaring the loop variable in the header protects against this mistake.
-->

---
minutes: 2
---

# Check: how many times does this loop body run?

<div class="cols wide-left center">
<div>

```java
for (int i = 10; i > 0; i -= 2) {
    System.out.print(i + " ");
}
```

</div>
<div>

<Quiz
  :options="['4', '5', '10']"
  :answer="1"
  explain="5. It prints 10 8 6 4 2. Then i becomes 0, and 0 > 0 is false."
/>

</div>
</div>

<!--
The loop starts i at 10, runs while i is greater than 0, and subtracts 2 each time.

The answer is 5. It prints 10, 8, 6, 4, and 2. After 2, i becomes 0, and 0 > 0 is false, so the loop ends. The increment part can count down, and it can step by more than 1.

4 forgets that 10 itself is printed. 10 counts the starting value as the number of passes, ignoring the step of 2.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# do-while loops

The loop that runs at least once.

<!--
Part 3 of 3. The do-while loop.
-->

---
minutes: 1.5
---

# do-while loops are guaranteed to run at least once

- No one really uses do-while loops
- They work just like while loops, but are guaranteed to execute **at least once**
- The condition isn't checked the **first** time into the loop
- Sometimes especially useful for getting **input** from the user
- The syntax is a little bit different

<!--
No one really uses do-while loops; they are the least common of the three. They work just like while loops. The only difference is that they are guaranteed to execute at least once: unlike a while loop, the condition isn't checked the first time you go into the loop. This is sometimes especially useful for getting input from the user, where the program must ask at least once before it can check the answer. The syntax is a little bit different, as the next slide shows.
-->

---
minutes: 1.5
---

# Anatomy of a do-while loop: the condition comes last

<div class="cols center">
<div>

```java
do {
    statement1;
    statement2;
    …
    statementn;
} while (condition);
```

</div>
<div>

- `do`, then the **body**
- `while (condition)` **after** the body
- A **semicolon** at the end: this one is required

</div>
</div>

<!--
The anatomy of a do-while loop: the keyword do, then the body in braces, statement1 to statementn, and after the closing brace, while with the condition in parentheses, followed by a semicolon.

The position of the condition shows when it is checked: after the body. Run the body, check, run the body again if true. Unlike the while and for pitfalls, here the semicolon after the condition is required, because the do-while statement ends there.
-->

---
minutes: 1.5
---

# Menu with a do-while: show the menu at least once

- Certain kinds of input suit a do-while
- A program that gives a **menu** of options:
  1. Add two numbers
  2. Subtract two numbers
  3. Multiply two numbers
  4. Quit

<!--
The do-while loop is rarely used, but certain kinds of input are well suited to it. For example, a program that gives a menu of options: add two numbers, subtract two numbers, multiply two numbers, or quit. The menu must be shown at least once, and the program only knows whether to show it again after the user has chosen. That is exactly the shape of a do-while: body first, check after.
-->

---
minutes: 2.5
---

# The menu program: repeat until the user chooses Quit

```java {2|3-4|5-10|11|all}
int choice;
do {
    System.out.println("1. Add  2. Subtract  3. Multiply  4. Quit");
    choice = in.nextInt();
    if (choice >= 1 && choice <= 3) {
        int a = in.nextInt();
        int b = in.nextInt();
        if (choice == 1) System.out.println(a + b);
        else if (choice == 2) System.out.println(a - b);
        else System.out.println(a * b);
    }
} while (choice != 4);
```

<style>
.slidev-layout .slidev-code { font-size: 18px !important; line-height: 1.35 !important; }
</style>

<!--
One way to write the menu, assuming a Scanner named in. choice is declared before the loop, because the condition at the bottom uses it, and a variable declared inside the braces would not exist there.

Inside the do: print the menu, and read the choice. If the choice is 1, 2, or 3, read two numbers a and b and print their sum, difference, or product, using an else-if chain; a switch would work too. Choice 4 skips the arithmetic. At the bottom, while (choice != 4): the loop repeats until the user chooses Quit.

With a plain while loop, choice would need a made-up starting value just to get into the loop the first time; the do-while avoids that.
-->

---
minutes: 3
---

# Try it: run the menu

<MenuDemo />

<!--
The interactive runs the menu program. The console starts with the menu already printed: the body has run once before any check. The plus and minus buttons set a and b, and the buttons choose 1 Add, 2 Subtract, 3 Multiply, or 4 Quit. Each choice from 1 to 3 prints the result and then the menu again, and the counter shows how many times the loop body has run. Choosing 4 makes choice != 4 false, so the loop ends. Reset starts a new run.

With a = 7 and b = 3: Add prints 10, Subtract 4, and Multiply 21.
-->

---
hide: true
minutes: 2
---

# Four things to remember from today

- A **flag** that the loop switches off tells you afterwards if n is prime
- Nested loops apply a test to **every** number in a range
- for pitfalls: changing i in the body, off by one, skipped, stray semicolon
- **do-while**: body first, check after; it runs at least once

<!--
Summary. One: a boolean flag, switched off inside the loop, holds the answer after the loop, as in the prime test. Two: nested loops can apply a test to every number in a range, as in the list of primes. Three: the for loop pitfalls are changing the loop variable in the body, being off by one, a condition that starts false, and a stray semicolon. Four: a do-while loop runs its body first and checks the condition after, so it always runs at least once.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Foundations of Programming Languages (FPL), Mathematical and Statistical Foundations (MSF)
- **Competency:** write and debug for, nested, and do-while loops
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

# Next time: introduction to arrays

<div class="cols">
<div class="card blue">

### Next time

- Introduction to **arrays**

</div>
<div class="card orange">

### Reminders

- Read Chapter 6

</div>
</div>

<Credit />

<!--
Next time: an introduction to arrays, the collections that the enhanced for loop works on. Reminder: read Chapter 6 of the textbook.
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
