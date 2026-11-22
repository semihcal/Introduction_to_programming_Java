---
theme: ../../theme
title: COMP 1600 – Week 1, Lecture 2 – Computer Science, Compiling Java and Data Representation
info: |
  We finish our tour of hardware, then ask what computer science and
  programming are. We follow a Java program from source code to bytecode to
  machine code, and start on how computers represent numbers with 0s and 1s.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 1</div>

# Java code becomes bytecode, then <span class="hl">machine code</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Hardware</span>
  <span>Computer science</span>
  <span>Compiling Java</span>
  <span>Base 10</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <rect x="40" y="16" width="240" height="64" rx="14" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="160" y="56" text-anchor="middle" class="cover-art-name">Hello.java</text>
    <path d="M160 82 L 160 120" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="40" y="124" width="240" height="64" rx="14" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="160" y="164" text-anchor="middle" class="cover-art-name">Hello.class</text>
    <path d="M160 190 L 160 228" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="40" y="232" width="240" height="64" rx="14" fill="#0f172a" />
    <text x="160" y="272" text-anchor="middle" class="cover-art-name" style="fill: #ffffff">0101 1100</text>
  </svg>
</div>
</div>

<!--
Welcome back. Today has four parts. We finish our tour of hardware with memory and input and output. Then we ask what computer science and programming actually are. Then we follow a Java program from the code you type to the instructions the hardware runs. Finally, we start on data representation: how computers store numbers using only 0s and 1s.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) for the development process and Foundations of Programming Languages (FPL) for compilers and the JVM; secondary are Architecture and Organization (AR) for memory and I/O and Mathematical and Statistical Foundations (MSF) for number bases, with one Society, Ethics, and Professionalism (SEP) touchpoint on the cost of software bugs.

See also: Week 1 Lecture 1 (Hello World and the CPU) and Week 2 (binary numbers in detail).
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Compare** the levels of computer memory by speed and cost <span class="tag">AR</span>
- **Trace** a Java program from source code to bytecode to machine code <span class="tag">FPL</span>
- **List** the phases of software development, in order <span class="tag">SDF</span>
- **Expand** a base 10 number into its place values <span class="tag">MSF</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: AR is Architecture and Organization, FPL is Foundations of Programming Languages, SDF is Software Development Fundamentals, and MSF is Mathematical and Statistical Foundations.

The second and fourth objectives are the apply-level skills. Expanding a number into place values is the first step toward binary, next lecture. Converting to binary is not part of today; today makes sure base 10 is really understood, because binary works the same way.
-->

---
minutes: 2
---

# Predict first: what does the 4 in 3,482,931 stand for?

<div class="cols wide-left center">
<div>

$$3{,}482{,}931$$

<p class="small">The digit 4 is the second from the left. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['4', '4,000', '400,000']"
  :answer="2"
  explain="400,000. The 4 is in the hundred thousands place, so it stands for 4 × 100,000."
/>

</div>
</div>

<!--
In the number 3,482,931, what does the digit 4 stand for? It is the second digit from the left. The answer is 400,000: the 4 is in the hundred thousands place, so it is worth 4 times 100,000. The answer 4 gives only the digit itself and ignores its place; 4,000 puts it in the wrong place.

Everyone does this without thinking. The point of today's last part is to think about it on purpose, because a digit's value depends on its place, and that is exactly how binary works too.
-->

---
minutes: 2
---

# Last time: basic Java syntax and hardware

<div class="cols center">
<div class="card blue">

### Java syntax

- Hello World: a class with a `main` method
- Semicolons, case sensitivity, whitespace, comments

</div>
<div class="card orange">

### Hardware

- CPU, memory, and I/O
- Clock speed, Moore's law, multicore

</div>
</div>

<!--
What did we talk about last time? Basic Java syntax and hardware.

For syntax: the Hello World program, with everything in a class and the program starting in main; and the rules about semicolons, case sensitivity, whitespace, and comments.

For hardware: the CPU, memory, and input and output; clock speed; Moore's law; and multicore processors. Today we finish the hardware tour, starting with parallel processing.
-->

---
layout: center
class: text-center
minutes: 2
---

# Questions about last time?

<!--
Time for questions about last lecture: Hello World, Java syntax, and hardware.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Back to hardware

Parallel processing, memory, and input and output.

<!--
Part 1 of 4. We finish the hardware tour from last time.
-->

---
minutes: 1
---

# Try it: more washers help only while there are loads to share

<ParallelDemo />

<!--
A quick review of parallel processing from last time. Parallel processing works well for problems like washing loads of laundry in a laundromat. But if you have 3 loads of clothes, there is no way to wash them faster with 4 washers.

The interactive has sliders for the number of loads of laundry and the number of washers, which stand for cores. The grid shows which washer does which load in each round, and the sentence underneath gives the number of rounds. 3 loads with 3 washers take one round; 3 loads with 4 washers still take one round, and one washer sits idle.

Parallel processing also works very poorly when different processors have to work on the same data and conflicts can happen: brain surgery with 100 surgeons is not 20 times faster than with 5, and it is not safer either.
-->

---
minutes: 2
---

# Memory stores everything as bits: 0s and 1s

<div class="cols center">
<div>

- Memory holds all the **data and instructions**
- Everything is stored as **bits**: binary digits, each 0 or 1

</div>
<div>

| Unit | Size |
| --- | --- |
| 1 byte | 8 bits |
| 1 kilobyte (KB) | $2^{10}$ = 1,024 bytes |
| 1 megabyte (MB) | $2^{20}$ bytes |
| 1 gigabyte (GB) | $2^{30}$ bytes |
| 1 terabyte (TB) | $2^{40}$ bytes |

</div>
</div>

<!--
Memory is the storage for all the data and instructions on your computer. Modern computers store everything as binary digits, or bits, which have a value of 0 or 1.

The table gives the units. 1 byte is 8 bits. 1 kilobyte is 2 to the 10, which is 1,024 bytes. 1 megabyte is 2 to the 20 bytes, about a million. 1 gigabyte is 2 to the 30 bytes, about a billion. 1 terabyte is 2 to the 40 bytes, about a trillion.

Simplification: drive makers and some standards use powers of 10, so 1 kilobyte means 1,000 bytes; that is why a "1 TB" drive shows as about 931 GB.
-->

---
minutes: 3
---

# Faster memory costs more, so computers use several kinds

| Kind | Where it is used | Speed and cost |
| --- | --- | --- |
| **Cache** | Actually on the CPU | Fast and expensive |
| **RAM** | Primary memory | Pretty fast; relatively expensive |
| **Flash drive / SSD** | Secondary memory; USB drives and SSDs | Faster than hard drives |
| **Hard drive** | Secondary memory | Slow and cheap |
| **Optical drive** | Secondary; often written only once | Very slow and very cheap |

<style>
table { font-size: 20px !important; }
</style>

<!--
Kinds of memory, from fastest to slowest. Cache is actually on the CPU; it is fast and expensive. RAM is the primary memory for a desktop computer; it is pretty fast and relatively expensive. Flash memory is faster than hard drives; it is seen on USB drives, and solid-state drives, or SSDs, are now common in laptops and desktops. A hard drive is secondary memory for a desktop computer; it is slow and cheap. An optical drive, such as a CD or DVD, is secondary memory that can usually only be written once; it is very slow and very cheap.

The pattern: the faster the memory, the more it costs per byte, so computers combine a little fast memory with a lot of slower memory. Primary memory loses its contents when the power is off; secondary memory keeps them. Making all memory as fast as cache would cost far too much and use too much power.
-->

---
minutes: 2
---

# Input devices bring data in; output devices send it out

<div class="cols">
<div class="card blue">

### Input

- **Keyboard:** common input device
- **Mouse:** common input device

</div>
<div class="card orange">

### Output

- **Monitor:** common visual output device
- **Speakers:** common audio output device

</div>
</div>

<!--
Input and output devices connect the computer to the world. The keyboard and the mouse are common input devices: they bring data in. The monitor is a common visual output device, and speakers are a common audio output device: they send data out.

More examples: a touchscreen is both input and output; a microphone and a camera are input; a printer is output. A network connection is both.

The Hello World program used output: System.out.println sends text to the screen. Soon we will use input too, reading what the user types.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Computer science

What it is, and what programming is.

<!--
Part 2 of 4. Now that we have sort of defined computers, what is computer science?
-->

---
minutes: 2
---

# Computer science studies information, computation, and solving problems with programs

<div class="cols center">
<div>

**Some subfields**

- Theoretical computer science
- Programming languages and compilers
- Operating systems and networking
- Graphics

</div>
<div>

&nbsp;

- Numerical computing
- Information storage, retrieval, and security
- Architecture and hardware
- Artificial intelligence and machine learning

</div>
</div>

<!--
Now that we have, sort of, defined computers, what is computer science? A good definition: the study of information, computation, and solving problems with programs.

It has many subfields: theoretical computer science; programming languages and compilers; operating systems and networking; graphics; numerical computing; information storage, retrieval, and security; architecture and hardware; and artificial intelligence and machine learning.

Programming is a tool used in all of them, the way writing is used in every subject. This course teaches the tool. Software development draws on all of these subfields.
-->

---
minutes: 2
---

# Programming is giving a fast but literal machine very detailed instructions

<div class="cols center">
<div>

- Computers are **stupid, but fast**
- Programming gives them **very detailed** instructions
- It uses a rigid, formal language, like **Java**

</div>
<div class="card orange">

### English is not enough

*"Computer! Solve my relationship problems!"*

A program would need every step spelled out explicitly.

</div>
</div>

<!--
What is programming? Computers are stupid, but fast. Programming is the process of giving them very detailed instructions about what to do. Usually programming is done in a rigid, formalized language, like Java.

English is insufficient. For example: "Computer! Solve my relationship problems!" A person might try to help; a computer cannot. Writing a program to solve your relationship problems in Java would require you to be far more detailed and explicit about every step.

"Stupid" here means literal: the computer does exactly what you say, not what you meant. Most bugs come from that gap.
-->

---
minutes: 2
---

# Computer science is built in layers, and we program in one of them

<div class="cols center">
<div>
<svg viewBox="0 0 440 250" class="layers" role="img" aria-label="Four stacked layers, from top to bottom: User, Application, Operating System, Hardware. An arrow marks the Application layer as where we will program.">
  <rect x="10" y="10" width="220" height="50" rx="10" class="ly" />
  <text x="120" y="42" class="ly-t">User</text>
  <rect x="10" y="68" width="220" height="50" rx="10" class="ly here" />
  <text x="120" y="100" class="ly-t">Application</text>
  <rect x="10" y="126" width="220" height="50" rx="10" class="ly" />
  <text x="120" y="158" class="ly-t">Operating System</text>
  <rect x="10" y="184" width="220" height="50" rx="10" class="ly" />
  <text x="120" y="216" class="ly-t">Hardware</text>
  <text x="246" y="99" class="ly-here">← we program here</text>
</svg>
</div>
<div>

- Built from **layers**, like a burrito
- No one can understand everything
- People tend to **focus on one layer**

</div>
</div>

<style>
.layers { width: 100%; max-height: 300px; }
.ly { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.ly.here { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 4; }
.ly-t { text-anchor: middle; font-size: 22px; font-weight: 700; fill: var(--c-ink); }
.ly-here { font-size: 18px; font-weight: 700; fill: var(--c-accent-2); }
</style>

<!--
Computer science is built out of layers, like a burrito. No one can understand everything, so people tend to focus on a particular level.

The diagram shows four layers stacked from top to bottom: the user; applications; the operating system; and the hardware. Each layer uses the one below it without needing to know all of its details. The Application layer is marked: that is where we will program in this course.

This idea is called abstraction: hiding details so you can think about one level at a time. Your Hello World program printed text without you knowing how the operating system draws letters on the screen.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Software development

From instructions a person can read to instructions a computer can run.

<!--
Part 3 of 4. How do we turn instructions written so that a human can read them into instructions a computer can read?
-->

---
minutes: 2
---

# There are thousands of programming languages, each good at different things

<div class="cols center">
<div>

- Programming means giving computers very detailed instructions
- First, we need a **programming language**
- Examples: **Java**, **C and C++**, **ML**, and thousands more

</div>
<div class="card">

### The question

How does code a **person** can read become instructions the **computer** can run?

</div>
</div>

<!--
What is programming again? The process of giving computers very detailed instructions about what to do. How do we do that exactly? First, we need a programming language, like Java.

There are many different programming languages: Java, C and C++, ML, and thousands more. Each has different advantages in different situations.

The card asks the real question: how do we turn a set of instructions written so that a human can read them into a set of instructions that a computer can read? The original notes answer "Magic, of course!" The next slides replace the magic with the real answer.
-->

---
minutes: 2
---

# Low-level languages talk to hardware; high-level languages talk like people

<div class="cols center">
<div>
<svg viewBox="0 0 330 270" class="lvl" role="img" aria-label="A ladder of languages from low level at the bottom to high level at the top: Machine Code, Assembly Language, C, C++, Java, Python.">
  <defs>
    <marker id="lvl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <path d="M24 258 L 24 14" class="lvl-line" marker-end="url(#lvl-arrow)" />
  <text x="40" y="22" class="lvl-cap">High</text>
  <text x="40" y="262" class="lvl-cap">Low</text>
  <rect x="100" y="8" width="200" height="34" rx="8" class="lvl-box" /><text x="200" y="32" class="lvl-t">Python</text>
  <rect x="100" y="50" width="200" height="34" rx="8" class="lvl-box java" /><text x="200" y="74" class="lvl-t">Java</text>
  <rect x="100" y="92" width="200" height="34" rx="8" class="lvl-box" /><text x="200" y="116" class="lvl-t">C++</text>
  <rect x="100" y="134" width="200" height="34" rx="8" class="lvl-box" /><text x="200" y="158" class="lvl-t">C</text>
  <rect x="100" y="176" width="200" height="34" rx="8" class="lvl-box" /><text x="200" y="200" class="lvl-t">Assembly Language</text>
  <rect x="100" y="218" width="200" height="34" rx="8" class="lvl-box" /><text x="200" y="242" class="lvl-t">Machine Code</text>
</svg>
</div>
<div>

- **High level:** abstract commands, closer to human thinking or math
- **Low level:** explicit instructions for the hardware

</div>
</div>

<style>
.lvl { width: 100%; max-height: 310px; }
.lvl-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
.lvl-cap { font-size: 18px; font-weight: 700; fill: var(--c-muted); }
.lvl-box { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 2; }
.lvl-box.java { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 4; }
.lvl-t { text-anchor: middle; font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; fill: var(--c-ink); }
</style>

<!--
We can classify languages as high or low level. High level languages allow you to give more abstract commands that are more like human thought processes or mathematics. Low level languages are closer to the computer world and give explicit instructions for the hardware to follow.

The diagram is a ladder of six languages with an arrow from low at the bottom to high at the top: machine code, assembly language, C, C++, Java, and Python. Java is highlighted.

The higher the level, the less you have to say about the hardware, and the more the language does for you. Higher is not always better: low level languages give more control and speed, which matters for operating systems and devices.
-->

---
minutes: 2
---

# A compiler turns a high-level language into a low-level one

<div class="cols center">
<div>

- A **compiler** is a program that translates code
- Usually the result is **machine code**: instructions the hardware runs directly
- With Java it is a little more complex

</div>
<div>
<svg viewBox="0 0 300 260" class="cmp" role="img" aria-label="Source code, such as Computer! Solve a problem;, goes through Compile to become machine code, 0s and 1s, which goes through Execute on the hardware.">
  <defs>
    <marker id="cmp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <rect x="40" y="6" width="220" height="56" rx="10" class="c-src" />
  <text x="150" y="40" class="c-t">Source code</text>
  <path d="M150 64 L 150 98" class="c-line" marker-end="url(#cmp-arrow)" /><text x="162" y="86" class="c-cap">compile</text>
  <rect x="40" y="102" width="220" height="56" rx="10" class="c-mc" />
  <text x="150" y="136" class="c-t" style="fill: #ffffff">Machine code</text>
  <path d="M150 160 L 150 194" class="c-line" marker-end="url(#cmp-arrow)" /><text x="162" y="182" class="c-cap">execute</text>
  <rect x="40" y="198" width="220" height="56" rx="10" class="c-hw" />
  <text x="150" y="232" class="c-t">Hardware</text>
</svg>
</div>
</div>

<style>
.cmp { width: 100%; max-height: 300px; }
.c-src { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.c-mc { fill: #0f172a; }
.c-hw { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 3; }
.c-t { text-anchor: middle; font-size: 22px; font-weight: 700; fill: var(--c-ink); }
.c-cap { font-size: 18px; fill: var(--c-muted); }
.c-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
</style>

<!--
We use a program called a compiler to turn a high level language into a low level language. Usually the low level language is machine code, the 0s and 1s that the hardware executes directly. With Java it is a little more complex, which is the next slide.

The diagram shows the general process top to bottom: source code, the instructions a person writes, is compiled into machine code, which is then executed on the hardware.

You do not have to run the compiler yourself: IntelliJ runs it for you when you press Run.
-->

---
minutes: 3
---

# Java compiles to bytecode, and the JVM turns it into machine code

<div class="jflow" role="img" aria-label="Java source code, Hello.java, is compiled to Java bytecode, Hello.class. The JVM compiles the bytecode just in time to machine code, which is executed on the hardware.">
  <div class="jbox src">Java source code<br><code>Hello.java</code></div>
  <div class="jarrow">compile<br>→</div>
  <div class="jbox bc">Java bytecode<br><code>Hello.class</code></div>
  <div class="jarrow">JVM<br>→</div>
  <div class="jbox mc">Machine code</div>
  <div class="jarrow">execute<br>→</div>
  <div class="jbox hw">Hardware</div>
</div>

<style>
.jflow { display: flex; align-items: center; gap: 6px; }
.jbox { flex: 1; text-align: center; font-size: 19px; font-weight: 700; line-height: 1.3; padding: 10px 6px; border-radius: 12px; border: 3px solid var(--c-accent); background: var(--c-accent-soft); }
.jbox code { font-size: 17px !important; }
.jbox.bc { border-color: var(--c-accent-2); background: var(--c-accent-2-soft); }
.jbox.mc { background: #0f172a; border-color: #0f172a; color: #ffffff; }
.jarrow { text-align: center; font-size: 18px; line-height: 1.1; color: var(--c-muted); font-weight: 600; }
</style>

<div class="cols" style="margin-top: 10px">
<div class="card blue">

### Bytecode is platform independent

The same `.class` file runs on Windows, macOS, or Linux.

</div>
<div class="card orange">

### Machine code is platform dependent

The **Java Virtual Machine (JVM)** makes the right machine code for each computer.

</div>
</div>

<!--
What is the issue with Java? Java is more complicated. Java runs on a virtual machine, called the JVM, the Java Virtual Machine.

The diagram reads left to right, in four boxes. Java source code, such as Hello.java, is compiled to an intermediate stage called bytecode, such as Hello.class. Whenever you run a Java program, the JVM runs a just-in-time compiler that turns the bytecode into machine code, which the hardware executes.

The two cards explain why: bytecode is platform independent, so the same class file runs on Windows, macOS, or Linux; machine code is platform dependent, so the JVM on each computer produces the right machine code for that computer. This is the meaning of Java's old slogan, "write once, run anywhere".
-->

---
minutes: 2
---

# The three steps we will use for every program

<div class="cols center">
<div>

1. **Write** a program in Java
2. **Compile** the program into bytecode
3. **Run** the bytecode using the JVM, which compiles it to machine code automatically

</div>
<div class="card">

### In IntelliJ

Pressing **Run** does steps 2 and 3 for you.

</div>
</div>

<!--
Let's review the steps we will use. Step 1: write a program in Java. Step 2: compile the program into bytecode. Step 3: run the bytecode using the JVM, which automatically compiles the bytecode to machine code.

The card is the practical version: in IntelliJ, pressing Run does steps 2 and 3 for you, so you mostly see step 1. When you get a compile error, it is step 2 that failed; when the program crashes while running, it is step 3.

IntelliJ puts the bytecode, the class files, in an output folder, usually called out or build.
-->

---
minutes: 2
---

# Check: what does the JVM run?

<div class="cols wide-left center">
<div>

You write `Hello.java` and compile it.

<p class="small">What does the Java Virtual Machine take as its input when you run the program?</p>

</div>
<div>

<Quiz
  :options="['Java source code', 'Java bytecode', 'Machine code']"
  :answer="1"
  explain="Bytecode. The compiler turns source code into bytecode; the JVM turns bytecode into machine code as it runs."
/>

</div>
</div>

<!--
You write Hello.java and compile it. What does the Java Virtual Machine take as its input when you run the program?

The answer is Java bytecode, the class file. The compiler turns source code into bytecode; the JVM turns bytecode into machine code as the program runs.

Java source code is what the compiler takes, not the JVM. Machine code is what comes out of the JVM, not what goes in.
-->

---
minutes: 3
---

# Software development moves through five phases

<div class="cols center">
<div>

1. **Understand** the problem
2. **Plan** a solution
3. **Implement** it in a programming language
4. **Test** the solution
5. **Maintain** it and fix bugs

</div>
<div class="card orange">

### Factor of 10 rule

A mistake costs roughly **10 times more** to fix for each phase it survives.

</div>
</div>

<!--
Software development often goes through phases similar to these: understand the problem; plan a solution to the problem; implement the solution in a programming language; test the solution; and maintain the solution and fix bugs.

The card is the factor of 10 rule: a mistake costs roughly ten times more to fix for each phase it survives. A misunderstanding caught while planning costs a conversation; the same mistake found after the software is released can cost a recall, a patch to millions of users, or worse.

The lesson for this course: most students start typing code immediately. Spend the first minutes understanding the problem and planning. It saves time. The factor of 10 is a rule of thumb, not an exact figure.
-->

---
hide: true
minutes: 3
---

# Bugs found late are expensive, and sometimes dangerous

<div class="cols center">
<div>

- Software runs **cars, planes, medical devices, and banks**
- A bug that escapes testing reaches **real people**
- Testing is part of a programmer's **responsibility**

</div>
<div class="card orange">

### Discuss in pairs

Who should pay for a software bug that harms someone: the programmer, the company, or the user?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Software now runs cars, planes, medical devices, and banks. A bug that survives into the maintain phase does not just cost the company money; it reaches real people.

That is why testing is part of a programmer's professional responsibility, not an optional extra. Engineers who build bridges are expected to check their work; so are people who write software.

Who should pay for a software bug that harms someone: the programmer, the company, or the user? Companies are usually held responsible, but individual programmers still have a duty to test and to raise concerns.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# Data representation

What do all the 1s and 0s really mean?

<!--
Part 4 of 4. You have heard people talking about all the 1s and 0s inside a computer. What does that really mean?
-->

---
minutes: 2
---

# Billions of tiny switches, each OFF or ON, store the 0s and 1s

<div class="cols center">
<div>

- Semiconductor physics lets a tiny part of a chip be in **one of two states**
- Like a switch: **OFF** or **ON**
- Call OFF **0** and ON **1**
- With many switches, we can store many 0s and 1s

</div>
<div class="switches" role="img" aria-label="Eight switches in a row, showing OFF, ON, OFF, ON, ON, OFF, OFF, ON, which stand for the bits 0 1 0 1 1 0 0 1.">
  <div v-for="(b, i) in [0,1,0,1,1,0,0,1]" :key="i" class="sw" :class="{ on: b }">
    <span class="sw-state">{{ b ? 'ON' : 'OFF' }}</span>
    <span class="sw-bit">{{ b }}</span>
  </div>
</div>
</div>

<style>
.switches { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.sw { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 4px; border-radius: 12px; border: 3px dashed var(--c-line); }
.sw.on { border: 3px solid var(--c-accent); background: var(--c-accent-soft); }
.sw-state { font-size: 18px; font-weight: 700; color: var(--c-muted); }
.sw.on .sw-state { color: var(--c-accent); }
.sw-bit { font-family: var(--slidev-font-mono, monospace); font-size: 34px; font-weight: 700; }
</style>

<!--
Using semiconductor physics, we can make a tiny piece of a microchip be in one of two states, say OFF and ON, like a switch. If we say that OFF is 0 and ON is 1, then by using a lot of these switches, we can represent a lot of 1s and 0s.

The diagram shows eight switches in a row: OFF, ON, OFF, ON, ON, OFF, OFF, ON. Under each is its bit: 0 1 0 1 1 0 0 1. Off switches have a dashed border; on switches a solid border.

Eight bits make one byte, from the memory table earlier. The transistors from last lecture are these switches.
-->

---
minutes: 3
---

# A number system's base is how many digits it uses

<div class="cols center">
<div>

- What do we do with the 1s and 0s?
- To begin with, we represent **numbers**
- Who has heard of **base 10**? Of **base 2**?

</div>
<div class="card">

### Base 10, our normal system

- Digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- Ten needs **2 digits**: 1 and 0
- Each place to the left is worth **10 times** more

</div>
</div>

<!--
What do we do with those 1s and 0s? To begin with, we represent numbers, using a number system with a given base.

Our normal number system is base 10. This means that our digits are 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9: ten of them. Base 10 means that you need 2 digits to represent ten, namely 1 and 0. Each place in the number, as you move left, corresponds to an increase by a factor of 10.

The general rule: base b has b digits, from 0 to b minus 1, and each place is worth b times the place to its right. Base 2 has just two digits, 0 and 1, which is why it fits switches.
-->

---
minutes: 4
---

# Try it: each place is worth 10 times the place to its right

<PlaceValue :start="3482931" />

<!--
This interactive shows the number 3,482,931 as seven digits, each in its own place. Under each digit is its place value, times 1, times 10, times 100, and so on up to times a million, and the place's name: ones, tens, hundreds, thousands, ten thousands, hundred thousands, millions. The line at the bottom writes out the number as a sum of digit times place value.

The sum reads: 3 times a million, plus 4 times 100,000, plus 8 times 10,000, plus 2 times 1,000, plus 9 times 100, plus 3 times 10, plus 1 times 1, equals 3,482,931. The arrows above and below each digit change it, and the sum updates to match.

The "2 (binary)" button gives a preview of next lecture. The places are then worth 1, 2, 4, 8, 16, 32, and 64, each twice the one to its right, and every digit is 0 or 1. The value is capped at 127, the largest seven-bit number. Same idea, different base.
-->

---
minutes: 2
---

# Check: what is 7 × 1,000 + 5 × 10 + 2?

<div class="cols wide-left center">
<div>

$$7 \times 1{,}000 + 5 \times 10 + 2 \times 1$$

<p class="small">Write it as an ordinary base 10 number.</p>

</div>
<div>

<Quiz
  :options="['752', '7,052', '7,502']"
  :answer="1"
  explain="7,052. There is no hundreds term, so the hundreds place holds 0."
/>

</div>
</div>

<!--
The expression is 7 times 1,000, plus 5 times 10, plus 2 times 1. Write it as an ordinary base 10 number.

The answer is 7,052. There is no hundreds term, so the hundreds place holds a 0. The zero is what keeps the 7 in the thousands place.

The common mistake, 752, forgets the zero placeholder. 7,502 puts the 5 in the hundreds place instead of the tens place. Binary uses zeros as placeholders the same way.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- Faster memory costs more: cache, RAM, then secondary storage
- Computer science is built in **layers**; we program applications
- A **compiler** translates high-level code to low-level code
- Java: source code → **bytecode** → JVM → machine code
- In base 10, each place is worth **10 times** the one to its right

<!--
Summary. One: faster memory costs more per byte, so computers combine cache, RAM, and slower secondary storage. Two: computer science is built in layers, and in this course we program at the application layer. Three: a compiler translates a high level language into a low level one. Four: Java source code is compiled to bytecode, which the JVM turns into machine code when the program runs. Five: in base 10, each place is worth 10 times the place to its right.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Foundations of Programming Languages (FPL)
- **Related areas:** Architecture and Organization (AR), Mathematical and Statistical Foundations (MSF)
- **Competency:** trace a Java program from source code to execution, and expand a number into place values
- **Dispositions:** collaborative, meticulous, responsible
- **Society and ethics:** the cost and harm of software bugs
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

# Next time: more data representation

<div class="cols">
<div class="card blue">

### Next time

- More on data representation

</div>
<div class="card orange">

### Reminders

- Read Chapter 3

</div>
</div>

<Credit />

<!--
Next time we continue with data representation: binary numbers in detail, and how to convert between base 10 and base 2. Reminder: read Chapter 3.

See also: today's place value interactive in binary mode, which previews next lecture.
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
