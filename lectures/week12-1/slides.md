---
theme: ../../theme
title: COMP 1600 – Week 12, Lecture 1 – Big Oh Notation
info: |
  We meet Big Oh notation, a way to describe how a program's running time
  grows as its input gets bigger. We learn to simplify running-time formulas
  and use Big Oh on an algorithm everyone knows: multiplication by hand.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 12</div>

# Big Oh keeps only the term that <span class="hl">grows fastest</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Big Oh notation</span>
  <span>Simplifying</span>
  <span>Multiplication by hand</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <line x1="40" y1="276" x2="304" y2="276" stroke="#0f172a" stroke-width="3" />
    <line x1="40" y1="276" x2="40" y2="30" stroke="#0f172a" stroke-width="3" />
    <path d="M40 276 Q 200 270 290 46" fill="none" stroke="#c2410c" stroke-width="5" />
    <path d="M40 252 L 300 186" fill="none" stroke="#3730a3" stroke-width="5" />
    <rect x="236" y="44" width="56" height="36" rx="18" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="264" y="70" text-anchor="middle" class="cover-art-name">n²</text>
    <rect x="236" y="214" width="56" height="36" rx="18" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="264" y="240" text-anchor="middle" class="cover-art-name">n</text>
    <text x="172" y="306" text-anchor="middle" class="cover-art-name" style="font-size: 18px">input size n</text>
  </svg>
</div>
</div>

<!--
Welcome. Today we start Big Oh notation: a short, standard way to say how fast a program's running time grows as its input gets bigger.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Algorithmic Foundations (AL) for Big Oh; secondary are Mathematical and Statistical Foundations (MSF) for growth of functions and Software Development Fundamentals (SDF) for counting the steps of code, with one Society, Ethics, and Professionalism (SEP) touchpoint on the energy cost of slow code.

See also: Week 11 (classes and methods) and Week 12 Lecture 2 (more Big Oh examples, then color and pictures).
-->

---
minutes: 1
---

# By the end of today, you can do three things

<div class="card">

- **Explain** what "worst case" and "asymptotic" mean for running time <span class="tag">AL</span>
- **Simplify** a running-time formula to its Big Oh <span class="tag">AL · MSF</span>
- **Count** the steps of a simple algorithm and state its Big Oh <span class="tag">AL</span>

</div>

<!--
By the end of today you can explain what "worst case" and "asymptotic" mean for running time, simplify a running-time formula to its Big Oh, and count the steps of a simple algorithm and state its Big Oh. The tags are CS2023 knowledge area codes: AL is Algorithmic Foundations and MSF is Mathematical and Statistical Foundations.

The second and third objectives are the apply-level skills, and they are what the exit ticket checks: given a formula, give its Big Oh; given a short algorithm, count its steps.

This is not math heavy: you only need to compare how fast a few familiar functions grow.
-->

---
minutes: 3
---

# Predict first: which part is biggest when n = 100?

<div class="cols wide-left center">
<div>

A program takes this many steps:

$$147n^3 + 2n^2 + 5n + 12083$$

<p class="small">When n is 100, which of the four terms is largest? Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['12083', '147n³', '2n²']"
  :answer="1"
  explain="147n³: it is 147,000,000, while all the other terms together are about 32,600."
/>

</div>
</div>

<!--
A program takes 147 n cubed plus 2 n squared plus 5 n plus 12,083 steps. When n is 100, which term is largest? Many people pick 12,083 because it is the biggest number written down. The answer is 147 n cubed: 147 times a million is 147,000,000. The others are 20,000, 500, and 12,083, about 32,600 together.

That is the whole idea of Big Oh in one example: as n grows, the fastest-growing term takes over and the rest stop mattering.
-->

---
minutes: 2
---

# Last time: balls that move on their own

<div class="cols center">
<div>

- We built a **hunter and prey** example from moving balls
- Each ball is an **object** with its own position
- Every frame, each object **updates**, then is drawn

</div>
<div class="card">

### The loop

1. Update every object
2. Draw every object
3. Repeat

</div>
</div>

<!--
Last time we built the hunter and prey example. We built it from the moving balls: each ball is an object with its own position, and every frame each object updates itself and is then drawn.

The card shows the main loop: update every object, draw every object, repeat. Today we change topic to how fast programs run. Last week's starter code is on the course page.
-->

---
layout: center
class: text-center
minutes: 4
---

# Project 4 is due Friday at midnight. Questions?

<p class="small">Questions about the project or about last time are welcome now.</p>

<!--
Project 4 check-in: Project 4 is due Friday by midnight. This is the time for questions about the project and about last lecture.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Big Oh notation

A short way to say how running time grows.

<!--
Part 1 of 2: how to compare the speed of two programs in a way that does not depend on the computer.
-->

---
minutes: 3
---

# We describe running time by its worst case, as input grows

<div class="cols center">
<div>

- Goal: compare the running time of one program to another
- We want a **mathematical description**

</div>
<div class="card">

### Two characteristics

- **Worst case:** we care most about how bad things could be
- **Asymptotic:** we focus on what happens as the input size gets larger and larger

</div>
</div>

<!--
We want to compare the running time of one program to another. So we want a mathematical description, with two characteristics.

Worst case: we care mostly about how bad things could be. A search that sometimes gets lucky on the first element is still judged by the times it has to look at everything.

Asymptotic: we focus on the behavior as the input size gets larger and larger. Small inputs are fast whatever you do; it is the big ones that separate good programs from bad.

Why not just time a program with a stopwatch? A time in seconds depends on the computer, the language, and what else is running. Counting steps as a function of the input size does not.
-->

---
minutes: 3
---

# Big Oh drops constant factors and smaller terms

<div class="cols center">
<div>

- Big Oh turns a complicated running time into a **simple statement** about its worst-case growth
- Ignore all **constant coefficients**
- Ignore all **low-order terms**

</div>
<div class="card orange">

### Example

$3n + 3$ is $O(n)$

<p class="small">Drop the coefficient 3 and the low-order term +3.</p>

</div>
</div>

<div class="callout">

Big Oh says a running time is **no worse than** some function, once constants are allowed.

</div>

<!--
Enter Big Oh notation. Big Oh simplifies a complicated running time function into a simple statement about its worst-case growth rate. All constant coefficients are ignored, and all low-order terms are ignored.

The card shows the example: 3n plus 3 is O of n. We drop the coefficient 3 in front of n and the low-order term plus 3, and we are left with n.

The callout is the precise meaning: Big Oh is a statement that a particular running time is no worse than some function, with appropriate constants. 3n plus 3 is never more than, say, 4 times n once n is at least 3. 3n really is three times slower than n, but only by a constant factor; Big Oh deliberately ignores that, because a faster computer changes constant factors but not the shape of the growth.
-->

---
minutes: 3
---

# Try it: as n grows, the biggest term takes over

<TermShare preset="cubic" />

<!--
This interactive shows the running time from the opening question, 147 n cubed plus 2 n squared plus 5 n plus 12,083, with a slider for n from 1 to 100. Each row is one term: its value and its share of the total, as a bar and a percentage.

At n equals 1, the constant 12,083 is almost everything, about 98 percent. At 5, the n cubed term already makes up most of the total; this is the crossover point, where the n cubed term passes 12,083. At 10, it is over 90 percent. By 100, it is more than 99.9 percent, and the other three terms are invisible.

That is why Big Oh keeps only n cubed, and why this running time is O of n cubed.
-->

---
minutes: 4
---

# Simplifying keeps only the fastest-growing term

| Running time | | Big Oh |
| --- | --- | --- |
| $147n^3 + 2n^2 + 5n + 12083$ | is | <span v-click>$O(n^3)$</span> |
| $n^{1000} + 2^n$ | is | <span v-click>$O(2^n)$</span> |
| $15n^2 + 6n + 7\log n + 145$ | is | <span v-click>$O(n^2)$</span> |
| $659n + n\log n + 87829$ | is | <span v-click>$O(n \log n)$</span> |

<div class="callout">

In computer science, $\log$ means $\log_2$ unless stated otherwise.

</div>

<!--
Simplification examples. Each Big Oh answer appears on a click.

Row 1: 147 n cubed plus 2 n squared plus 5 n plus 12,083 is O of n cubed. Row 2: n to the 1000 plus 2 to the n is O of 2 to the n. This one surprises people: n to the thousand looks enormous, but any exponential eventually outgrows any polynomial. Row 3: 15 n squared plus 6 n plus 7 log n plus 145 is O of n squared. Row 4: 659 n plus n log n plus 87,829 is O of n log n, because n log n grows faster than n.

The callout: in computer science we use log base 2 unless stated otherwise. 2 to the n passes n to the 1000 only for very large n, a little under n equals 14,000, but it does pass it, and Big Oh is about large n.
-->

---
minutes: 2
---

# Check: what is the Big Oh of this running time?

<div class="cols wide-left center">
<div>

$$5n^2 + 1000n + 7$$

<p class="small">Drop constants and low-order terms.</p>

</div>
<div>

<Quiz
  :options="['O(1000n)', 'O(n²)', 'O(n² + n)']"
  :answer="1"
  explain="O(n²). The 1000n term is low-order and the coefficient 5 is a constant, so both are dropped."
/>

</div>
</div>

<!--
The running time is 5 n squared plus 1000 n plus 7. Its Big Oh is O of n squared. The coefficient 5 is a constant and is dropped; 1000 n and 7 are low-order terms and are dropped too.

Common mistakes: O of 1000 n keeps a big-looking coefficient and drops the wrong term; O of n squared plus n keeps a low-order term. For small n, 1000 n really is larger than 5 n squared, until n reaches 200; Big Oh is about large n.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Big Oh examples

Counting the steps of something we all know how to do.

<!--
Part 2 of 2: we use Big Oh on an algorithm everyone learned in school: multiplication by hand.
-->

---
minutes: 3
---

# Multiplying by hand: every digit meets every digit

<div class="cols center">
<div>

```text
      123
    x 456
    -----
      738
     615
    492
    -----
    56088
```

</div>
<div>

- Let the two numbers each have **n digits**
- Each digit of the bottom number multiplies **every** digit of the top
- Then the rows are **added**

</div>
</div>

<!--
How long does it take to do multiplication by hand? The worked example multiplies 123 by 456. First 6 times 123 gives 738. Then 5 times 123 gives 615, shifted one place left. Then 4 times 123 gives 492, shifted two places. Adding the three rows gives 56,088.

Let's assume that the length of each number is n digits; here n is 3. The key observation: each digit of the bottom number has to be multiplied by every digit of the top number, and then all the rows are added up.

A natural question: if both numbers had 6 digits instead of 3, would it take twice as long, or more? The next slide answers it.
-->

---
minutes: 3
---

# Counting the steps gives about 3n², which is O(n²)

<div class="cols center">
<div class="card">

### For each of the n bottom digits

- n multiplications
- n carries

So $(n + n) \times n = 2n^2$

</div>
<div class="card">

### Then add the rows

- $n$ additions of about $n + 1$ digits

So $(n + 1) \times n = n^2 + n$

</div>
</div>

<div class="callout">

Total: $2n^2 + n^2 + n = 3n^2 + n$, so the running time is $O(n^2)$.

</div>

<!--
Now count. For each of the n digits of the bottom number, we do n multiplications and n carries. That is n plus n, times n digits: 2 n squared. Then we add up the rows: about n additions of n plus 1 digits each, which is n plus 1 times n, or n squared plus n.

The callout adds them: 2 n squared plus n squared plus n is 3 n squared plus n. Dropping the coefficient and the low-order term, the running time is O of n squared.

This is the answer to the question from the last slide: doubling the digits from 3 to 6 does not double the work; it makes it about four times as much, because the work grows with n squared.
-->

---
minutes: 3
---

# Try it: double the digits, four times the work

<TermShare preset="mult" />

<!--
This interactive counts the steps of multiplication by hand, using the counts from the previous slide. The slider sets the number of digits n, from 1 to 30. The three rows are multiplications, n times n; carries, n times n; and additions, n plus 1 times n. The last line gives the total.

At 3 digits, the 123 times 456 example, there are 9 multiplications, 9 carries, 12 additions, 30 steps. At 6 digits: 36, 36, 42, 114 steps, almost four times as many. At 12: 444 steps, about four times again.

Every time n doubles, the total roughly quadruples. That is what O of n squared means in practice.
-->

---
minutes: 3
---

# Slow code costs time and energy for everyone who runs it

<div class="cols center">
<div>

- Programs run **many times**, on **many** computers
- An $O(n^2)$ method where an $O(n)$ one exists wastes work on every run
- Wasted work is wasted **electricity**

</div>
<div class="card orange">

### Discuss in pairs

When is it worth a programmer's time to make code faster? Who benefits?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Programs are not run once. Popular software runs many times a day on many computers and in large data centers. If a programmer uses an O of n squared method where an O of n method exists, every single run does extra work for large inputs, and that extra work is paid for in people's time and in electricity.

The card asks: when is it worth a programmer's time to make code faster, and who benefits? There are two sides: for small inputs or code that runs rarely, clear and correct code matters more than speed; for code that runs constantly or on large inputs, a better algorithm helps users, saves energy, and lowers costs. Choosing the right algorithm is part of a programmer's responsibility.
-->

---
minutes: 2
---

# Four things to remember from today

- Big Oh describes the **worst case** as input **grows**
- Drop **constant coefficients** and **low-order terms**
- $3n + 3$ is $O(n)$; $147n^3 + \dots$ is $O(n^3)$
- Multiplying two $n$-digit numbers by hand is $O(n^2)$

<!--
Four things to remember. One: Big Oh describes the worst-case running time as the input grows. Two: to simplify, drop constant coefficients and low-order terms. Three: 3n plus 3 is O of n, and 147 n cubed plus lower terms is O of n cubed. Four: multiplying two n-digit numbers by hand takes about 3 n squared plus n steps, which is O of n squared.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Algorithmic Foundations (AL)
- **Related areas:** Mathematical and Statistical Foundations (MSF), Software Development Fundamentals (SDF)
- **Competency:** count the steps of a simple algorithm and state its Big Oh
- **Dispositions:** meticulous, collaborative, responsible
- **Society and ethics:** the energy and time cost of inefficient code
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

# Next time: finish Big Oh, then color and pictures

<div class="cols">
<div class="card blue">

### Next time

- Finish Big Oh
- Color
- `Picture` class

</div>
<div class="card orange">

### Reminders

- Finish Project 4: due **Friday by midnight**
- Keep reading Chapter 9

</div>
</div>

<Credit />

<!--
Next time we finish Big Oh with more examples, then move on to color and the Picture class. Reminders: finish Project 4, which is due Friday by midnight, and keep reading Chapter 9.

See also: Week 12 Lecture 2 continues directly from today.
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
Exit ticket: scan the QR code to open today's exit ticket form and answer its questions before leaving. If you cannot scan the code, ask for the link.
-->
