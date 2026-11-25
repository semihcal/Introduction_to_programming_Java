---
theme: ../../theme
title: COMP 1600 – Week 5, Lecture 2 – while Loop Examples and Pitfalls
info: |
  More while loop examples: summing, averaging, finding the biggest input,
  and a guessing game that finds any number from 1 to 100 in at most seven
  guesses. Then the common loop mistakes: infinite loops, off-by-one errors,
  skipped loops and misplaced semicolons.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 5</div>

# Loops that work, and loops that <span class="hl">never end</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Sentinels</span>
  <span>Biggest input</span>
  <span>Guessing game</span>
  <span>Loop pitfalls</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <rect x="10" y="130" width="300" height="44" rx="8" fill="#e2e8f0" />
    <rect x="10" y="130" width="150" height="44" rx="8" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <rect x="156" y="118" width="8" height="68" rx="3" fill="#c2410c" />
    <text x="160" y="104" text-anchor="middle" class="cover-art-obj" style="font-size: 26px">50?</text>
    <text x="16" y="210" class="cover-art-name" style="font-size: 20px">1</text>
    <text x="304" y="210" text-anchor="end" class="cover-art-name" style="font-size: 20px">100</text>
    <text x="160" y="262" text-anchor="middle" class="cover-art-name" style="font-size: 20px">too high → 1 to 49</text>
  </svg>
</div>
</div>

<!--
This lecture has two parts. First, while loop examples: summing and averaging with a sentinel value, finding the biggest input, and a guessing game. Second, common pitfalls with while loops: infinite loops, almost infinite loops, off-by-one errors, loops that are skipped entirely, and misplaced semicolons.

The drawing on the right shows the guessing game's idea. A bar runs from 1 to 100. The left half, 1 to 50, is highlighted as the remaining range, and an orange marker at 50 is labeled "50?", the computer's guess. Underneath: "too high, then 1 to 49". Each answer cuts the range in half.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for loops, debugging, and simple algorithms; secondary is Algorithmic Foundations (AL) for the halving search strategy.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do three things

<div class="card">

- **Combine** an if-statement with a while loop to track the biggest input <span class="tag">SDF</span>
- **Explain** why halving the range finds a number from 1 to 100 in 7 guesses <span class="tag">AL</span>
- **Spot** infinite loops, fencepost errors, skipped loops, and stray semicolons <span class="tag">SDF</span>

</div>

<!--
These are the three objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and AL is Algorithmic Foundations.
-->

---
minutes: 2
---

# Predict first: how many lines does this loop print?

<div class="cols wide-left center">
<div>

```java
int i = 1;
while (i < 40) {
    System.out.println(i);
    ++i;
}
```

<p class="small">Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['39', '40', '41']"
  :answer="0"
  explain="39. It prints 1 to 39. When i reaches 40, 40 < 40 is false, so 40 is never printed. This is an off-by-one, or fencepost, error."
/>

</div>
</div>

<!--
The code starts i at 1 and, while i is less than 40, prints i and adds 1. How many lines does it print?

The answer is 39: it prints 1 through 39. When i becomes 40, the condition 40 < 40 is false, so the loop ends before printing 40. If the goal was 1 to 40, this is a bug called an off-by-one, or fencepost, error; the fix is i <= 40. It is one of today's pitfalls.

40 is the common answer, from reading "less than 40" as "up to 40". 41 would mean the loop runs past its limit.
-->

---
minutes: 1
---

# Last time: repetition and while loops

<div class="cols center">
<div class="card blue">

### Repetition

- Loops repeat a block of code
- The variables change each pass

</div>
<div class="card orange">

### while loops

- Check, run, jump back to the top
- Sentinel values end input

</div>
</div>

<!--
What did we talk about last time? Repetition: loops repeat a block of code, and the variables change on each pass. And while loops: check the condition, run the body, jump back to the top; and a sentinel value to end input.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: while loops, tracing them, and sentinel values.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# while loop examples

Sums, averages, maximums, and a guessing game.

<!--
Part 1 of 2. Examples of while loops.
-->

---
minutes: 1
---

# Summing numbers: stop at a sentinel value

- while loops help us deal with **input**
- Sum all the numbers a person enters
- How would we know when to **stop**?
- Keep adding until the person enters a **negative number**: a **sentinel value**

<!--
We can also use while loops to help us deal with input. What if we wanted to sum all of the numbers that a person entered? How would we know when to stop? One solution is to keep adding numbers until the person enters a negative number. This is called using a sentinel value.
-->

---
minutes: 1.5
---

# Summing numbers: the solution

```java
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
The solution, as last lecture. i starts at 0 and sum at 0. While i is not negative, add i to sum, then prompt and read the next number into i. Each number is added at the start of the next pass, after the condition has checked it, so the negative sentinel is never added. For 4, 6, and -1, it prints "Sum: 10".
-->

---
minutes: 1.5
---

# Finding the average: count the numbers too

```java
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
We could also find the average. sum is a double so that the division keeps its fraction, and count goes up on every pass. count ends up one too high, because the first pass happens before any number is read, and --count fixes it. For 4, 6, and -1: sum is 10.0, count is 2 after the fix, and it prints "Average: 5.0".
-->

---
minutes: 3
---

# Tracking the biggest input: an if-statement inside a while loop

<div class="cols wide-left">
<div>

```java {all|3-4|6|7-8|10}
Scanner in = new Scanner(System.in);
System.out.print("Enter number: ");
int i = in.nextInt();
int max = i;
while (i >= 0) {
    if (i > max) max = i;
    System.out.print("Enter number: ");
    i = in.nextInt();
}
System.out.println("Biggest: " + max);
```

</div>
<div class="console" aria-label="Console">
<div class="con-h">Console</div>
<div>Enter number: <span class="con-in">7</span></div>
<div>Enter number: <span class="con-in">12</span></div>
<div>Enter number: <span class="con-in">3</span></div>
<div>Enter number: <span class="con-in">-1</span></div>
<div v-click="4">Biggest: 12</div>
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 19px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.con-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
.con-in { color: #fdba74; }
.slidev-layout .slidev-code { font-size: 19px !important; }
</style>

<!--
What if we wanted to find the biggest input? Somehow we would have to check each input and see if it is larger than the current largest. The solution: use an if-statement inside of a while loop. (The original slide does this live in IntelliJ; this is one way to write it.)

The program reads the first number before the loop, and max starts as that number: the biggest seen so far, since it is the only one seen. Inside the loop, if i > max, max becomes i. Then it reads the next number. When a negative number arrives, the loop ends and max is printed.

For the inputs 7, 12, 3, and -1: max starts at 7, becomes 12, stays 12 when 3 arrives, and the program prints "Biggest: 12".

Starting max at the first input matters. Starting it at 0 works only when inputs are never negative; starting it at the first value always works. If the first number is already negative, the loop never runs, and that number is printed, which a real program would check with an if.
-->

---
minutes: 1.5
---

# Guessing game: the computer guesses your number

- You think of a number between **1 and 100**
- The computer guesses; you answer:

| Answer | Meaning |
| --- | --- |
| **H** | the guess is too high |
| **L** | the guess is too low |
| **F** | the number was found |

<!--
Let's say that you wanted to write a program to guess a number that a person had come up with. The number is between 1 and 100. Every time the computer guesses a number, the person enters H if the guess is too high, L if it is too low, or F if the number was found. The program keeps guessing, in a loop, until it hears F.
-->

---
minutes: 2
---

# Guessing game algorithm: always guess the midpoint

1. Start with the **minimum** and **maximum** of the range
2. Find the **midpoint**
3. Ask the user if the midpoint is correct
4. **Too high:** go to Step 1 with the minimum and the midpoint as the new range
5. **Too low:** go to Step 1 with the midpoint and the maximum as the new range
6. **Correct:** you're done!

<!--
The guessing game algorithm. Start with the minimum and maximum of the range, 1 and 100. Find the midpoint. Ask the user if the midpoint is correct. If the answer is too high, go back to step 1, using the minimum and the midpoint as the new range. If the answer is too low, go back to step 1 using the midpoint and the maximum as the new range. If the midpoint is correct, you're done.

One refinement for the Java version: the midpoint has already been ruled out, so the new range should be minimum to midpoint minus 1, or midpoint plus 1 to maximum. With integer midpoints, keeping the midpoint in the range can get stuck: for the range 1 to 2, the midpoint is 1, and "too low" would give 1 to 2 again, forever. The interactive on the next slide uses the minus 1 and plus 1 version.

Every answer cuts the range roughly in half: 100, 50, 25, 12, 6, 3, 1. So at most 7 guesses are ever needed, because 2 to the 7 is 128, more than 100. This halving strategy is called binary search.
-->

---
minutes: 4
---

# Try it: think of a number and answer H, L, or F

<GuessDemo />

<!--
The interactive plays the guessing game. The bar shows the range from 1 to 100; the highlighted part is the range that is still possible, and the orange marker is the current guess, the midpoint. The buttons answer H for too high, L for too low, and F for found. The list underneath records each guess, the answer, and the new range.

The first guess is always 50. If the number is 37: 50 is too high, so the range becomes 1 to 49 and the next guess is 25; too low, 26 to 49, guess 37; found, in 3 guesses. No number from 1 to 100 needs more than 7 guesses. Answers that contradict each other, such as answering "too low" to every guess and then "too high" to 100, leave no possible number, and the demo says so.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Common pitfalls with while loops

Loops that run forever, too little, or not at all.

<!--
Part 2 of 2. Common pitfalls with while loops. (The original divider slide spells it "C0mmon", with a zero, presumably as a joke.)
-->

---
minutes: 1.5
---

# Infinite loops: forgetting to change the variable

```java
int n = 40;
int i = 1;
while (i <= 40) {
    System.out.println(i);
    // Supposed to print all the numbers
    // less than 40, but i never increases
}
```

<div class="callout">Loops can go on forever if you aren't careful.</div>

<!--
Loops can go on forever if you aren't careful. In the code, the loop is supposed to print all the numbers up to 40, but nothing in the body changes i. i is always 1, the condition 1 <= 40 is always true, and the program prints 1 forever. This is an infinite loop. In IntelliJ, the red stop button ends a program that is stuck.

The variable n is declared but never used here; the condition uses 40 directly, which is another small bug: if n were changed, the loop would not follow.
-->

---
minutes: 2
---

# (Almost) infinite loops: overflow eventually ends them

```java
int n = 40;
int i = 1;
while (i <= 40) {
    System.out.println(i);
    --i;  // Whoops, should have been ++i
}
```

<div class="callout">i counts down 1, 0, −1, … past −2,147,483,648, <b>underflows</b> to 2,147,483,647, and the loop ends.</div>

<!--
Overflow and underflow will make some badly written loops eventually terminate. In the code, the body subtracts 1 from i instead of adding 1. i goes 1, 0, -1, -2, and so on, always less than or equal to 40, so the loop seems infinite.

But an int has a minimum, -2,147,483,648. Subtracting 1 from that underflows, wrapping around to the maximum, 2,147,483,647. That is not less than or equal to 40, so the loop ends, after printing about 2.1 billion lines. Printing that many lines takes minutes or hours; the program is still wrong.
-->

---
minutes: 1.5
---

# Fencepost errors: being off by one

<div class="cols center">
<div>

```java
int n = 40;
int i = 1;
// Won't reach 40
while (i < 40) {
    System.out.println(i);
    ++i;
}
```

</div>
<div>
<svg viewBox="0 0 300 120" class="fence" role="img" aria-label="A fence with 4 sections needs 5 posts: the posts are numbered 1 to 5 and the 4 gaps between them are sections.">
  <line x1="20" y1="50" x2="280" y2="50" class="f-rail" />
  <line x1="20" y1="80" x2="280" y2="80" class="f-rail" />
  <rect v-for="k in 5" :key="k" :x="12 + (k - 1) * 65" y="30" width="16" height="70" class="f-post" />
  <text v-for="k in 5" :key="'t' + k" :x="20 + (k - 1) * 65" y="118" class="f-t">{{ k }}</text>
</svg>
<p class="small" style="text-align: center">4 sections of fence need 5 posts.</p>
</div>
</div>

<style>
.fence { width: 100%; max-height: 160px; }
.f-rail { stroke: var(--c-accent-2); stroke-width: 6; }
.f-post { fill: var(--c-accent); }
.f-t { text-anchor: middle; font-size: 18px; font-weight: 700; fill: var(--c-muted); }
</style>

<!--
Being off by one is a very common loop error. In the code, the comment says it: with i < 40, the loop won't reach 40, and prints only 1 to 39, as in the opening question.

The name comes from a puzzle drawn on the right: a fence with 4 sections needs 5 posts, numbered 1 to 5, with the 4 sections in the gaps between them. Counting sections when you should count posts, or the reverse, is off by one. In loops, the questions are: does the first value get processed, and does the last? Checking the first and last pass by hand catches most fencepost errors.
-->

---
minutes: 1.5
---

# Skipping loops entirely: a condition that starts out false

```java
int n = 40;
int i = 1;
while (i >= 40) { // Oops, should be <=
    System.out.println(i);
    ++i;
}
```

<div class="callout">If the condition isn't true to begin with, the loop is just skipped.</div>

<!--
If the condition isn't true to begin with, the loop will just be skipped. In the code, the comparison is reversed: i >= 40 instead of i <= 40. i starts at 1, and 1 >= 40 is false at the very first check, so the body never runs and nothing is printed. There is no error message: the program simply does nothing, which can be harder to notice than a crash.
-->

---
minutes: 1.5
---

# Misplaced semicolon: an empty loop body

```java
int n = 40;
int i = 1;
while (i <= 40); { // Semicolon is wrong
    System.out.println(i);
    ++i;
}
```

<div class="callout">The loop's body is the empty statement before <code>{</code>; it runs forever.</div>

<!--
A misplaced semicolon can cause an empty loop body to be executed, often infinitely. In the code, the semicolon right after while (i <= 40) is the entire body of the loop: an empty statement. That empty body cannot change i, so 1 <= 40 stays true and the empty loop runs forever. The block in braces, which would print and increment, is never reached. The program prints nothing and never ends. This is the loop version of last week's if pitfall.
-->

---
minutes: 3
---

# Try it: compare the correct loop with each pitfall

<LoopPitfalls />

<!--
The interactive shows the print-1-to-40 loop in six versions: the correct one, in green, and the five pitfalls, in red. Choosing a version shows its code, with the faulty part highlighted, the start of what the program prints, and what happens in the end.

Correct: 1 to 40, then the loop ends. Infinite: 1 forever. Almost infinite: counting down past the minimum, then the underflow ends it after about 2.1 billion lines. Fencepost: 1 to 39. Skipped: nothing. Semicolon: nothing, forever.
-->

---
minutes: 1.5
---

# Things to remember about while loops

- The condition is **not followed by a semicolon**
- Be careful about **starting and ending** conditions
- When in doubt, use **braces**
- The print statement must be **inside** the loop to print multiple times
- There's **no magic formula**; you have to think it through

<!--
Things to remember. The condition of the while loop is not followed by a semicolon. Be careful about starting and ending conditions: check the first and last pass. When in doubt, use braces. The print statement must be inside the loop in order to get printed multiple times; a println after the closing brace runs once. And there's no magic formula: you have to think it through, often by tracing the loop by hand.
-->

---
layout: center
class: text-center
minutes: 5
---

# Quiz

<!--
Time for the in-class quiz, on while loops and their pitfalls.
-->

---
hide: true
minutes: 2
---

# Four things to remember from today

- Sentinel loops: read, check, use; count carefully
- An **if inside a while** tracks the biggest value so far
- Guessing the midpoint finds 1–100 in at most **7** guesses
- Pitfalls: infinite loops, off by one, skipped loops, stray semicolons

<!--
Summary. One: sentinel loops read a value, check it, and use it, and counting needs care. Two: an if-statement inside a while loop can track the biggest value seen so far. Three: always guessing the midpoint finds any number from 1 to 100 in at most 7 guesses. Four: the common pitfalls are infinite loops, off-by-one errors, loops that are skipped, and misplaced semicolons.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Algorithmic Foundations (AL)
- **Competency:** write loops that combine selection and repetition, and debug common loop errors
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

# Next time: for loops and more loop examples

<div class="cols">
<div class="card blue">

### Next time

- **for** loops
- More loop examples

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 5

</div>
</div>

<Credit />

<!--
Next time: for loops, and more loop examples. Reminder: keep reading Chapter 5 of the textbook.
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
