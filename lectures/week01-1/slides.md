---
theme: ../../theme
title: COMP 1600 – Week 1, Lecture 1 – Your First Java Program and How Computers Work
info: |
  We start with how to succeed in this course, then write our first Java
  program, Hello World, and learn the basic rules of Java syntax. We finish
  with what a computer is: hardware, software, the CPU, and memory.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 1</div>

# Every Java program starts in <span class="hl">main</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>How to succeed</span>
  <span>Hello World</span>
  <span>Java syntax</span>
  <span>What is a computer?</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <rect x="10" y="40" width="300" height="190" rx="16" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="30" y="80" class="cover-art-name" style="font-size: 18px">class Hello {</text>
    <rect x="44" y="94" width="250" height="96" rx="12" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="60" y="126" class="cover-art-name" style="font-size: 18px">main(...) {</text>
    <text x="76" y="160" class="cover-art-name" style="font-size: 18px">println(...);</text>
    <text x="30" y="216" class="cover-art-name" style="font-size: 18px">}</text>
    <rect x="60" y="250" width="200" height="50" rx="12" fill="#0f172a" />
    <text x="160" y="282" text-anchor="middle" class="cover-art-name" style="font-size: 18px; fill: #ffffff">Hello, world!</text>
  </svg>
</div>
</div>

<!--
Welcome to COMP 1600. Today has three parts. First, how to succeed in this course. Then we write our first Java program and learn the basic rules of Java syntax. Finally, we step back and look at what a computer actually is.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) for the first program and Architecture and Organization (AR) for the CPU and memory; secondary are Foundations of Programming Languages (FPL) for syntax and Parallel and Distributed Computing (PDC) for multicore processors, with one Society, Ethics, and Professionalism (SEP) touchpoint on academic integrity and learning.

See also: Week 1 Lecture 2 (software development and data representation) and Lab 1 (setting up IntelliJ and running Hello World yourself).

Delivery reminders: read on-screen text aloud, describe each diagram in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Describe** the habits that lead to success in this course <span class="tag">SEP</span>
- **Write** and explain each line of a Hello World program in Java <span class="tag">SDF</span>
- **Apply** Java's rules for semicolons, case, whitespace, and comments <span class="tag">SDF · FPL</span>
- **Explain** the roles of the CPU, memory, and I/O in a computer <span class="tag">AR</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: SEP is Society, Ethics, and Professionalism, SDF is Software Development Fundamentals, FPL is Foundations of Programming Languages, and AR is Architecture and Organization.

The second and third objectives are the apply-level skills: tomorrow in Lab 1 you write, compile, and run this program yourself.

Likely question: "Do I need to have programmed before?" No. This course assumes no programming experience. Timing: 1 minute.
-->

---

# Predict first: does this compile?

<div class="cols wide-left center">
<div>

```java
system.Out.Println("Word!");
```

<p class="small">The correct line is <code>System.out.println("Word!");</code></p>

</div>
<div>

<Quiz
  :options="['Yes, Java ignores case', 'No, case matters in Java', 'Yes, but it prints nothing']"
  :answer="1"
  explain="No. Java is case sensitive: system is not System, and Println is not println."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give 45 seconds with a neighbor before anyone clicks. Low-tech alternative: one, two, or three fingers for A, B, or C.

The line is system dot Out dot Println, "Word!", with a lowercase s, a capital O, and a capital P. The correct line, shown underneath, is System with a capital S, out lowercase, println lowercase. Does the first version compile?

No. Java is case sensitive: system is not the same as System, and Println is not println. Many people expect a computer to be forgiving about capital letters, as search engines are; compilers are not. We come back to this in Part 3. Disposition practiced: collaborative. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# How to succeed in this course

What the students who do well actually do.

<!--
Part 1 of 4. Before any code, how to get the most out of this course. Timing: under 1 minute.
-->

---

# Good students treat learning as something they do, not something done to them

<div class="cols">
<div class="card orange">

### Struggling students…

- Don't ask questions
- Don't come to office hours
- Don't ask for help
- Treat education as **passive**
- Are happy when a class is easy

</div>
<div class="card blue">

### Successful students…

- Ask questions
- Come to office hours
- Ask for help
- **Actively** pursue knowledge and skills
- Are angry when a class is easy

</div>
</div>

<!--
Two columns compare habits. Students who struggle don't ask questions, don't come to office hours, and don't ask for help. They treat education as a passive experience, and they are happy when a class is easy. In other words, they act as if college is high school.

Students who succeed ask questions, come to office hours, and ask for help. They actively pursue all the knowledge and skills they can, and they are angry when a class is easy, because an easy class means they are paying for something they are not getting.

The original notes call these "bad students" and "good students"; the slide describes habits instead, because habits can change. Every column on the left can move to the right. Likely question: "Is it bad to ask a question that seems obvious?" No. If you are wondering, others are too. Timing: 3 minutes.
-->

---

# Success builds understanding at every step

<div class="flows">
<div class="card blue">

### Flowchart for success

<div class="flow-steps">
  <span>Read the textbook before class</span>
  <span>Participate in class and ask questions</span>
  <span>Practice programming what we talk about</span>
  <span>Work on labs and projects</span>
  <span>Come to exams prepared</span>
</div>

</div>
<div class="card orange">

### Flowchart for failure

<div class="flow-steps">
  <span>Come to class without reading</span>
  <span>Ask no questions in class</span>
  <span>Don't practice at home</span>
  <span>Finish projects without understanding them</span>
  <span>Skim the chapters before the exam</span>
</div>

</div>
</div>

<style>
.flows { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.flows .card { padding: 10px 18px 14px; }
.flow-steps { display: flex; flex-direction: column; align-items: stretch; }
.flow-steps span {
  font-size: 18px;
  line-height: 1.25;
  padding: 4px 12px;
  border-radius: 8px;
  border: 2px solid currentColor;
  background: var(--c-paper);
  color: var(--c-ink);
}
.flow-steps span + span { margin-top: 14px; position: relative; }
.flow-steps span + span::before {
  content: '↓';
  position: absolute;
  left: 50%;
  top: -19px;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 700;
  color: var(--c-muted);
}
</style>

<!--
Two flowcharts, side by side, each read top to bottom.

The flowchart for success: read the textbook before class; participate in class and ask questions; practice programming what we talk about; work on labs and projects; come to exams prepared.

The flowchart for failure: come to class without reading anything; ask no questions in class; don't practice at home; finish the projects without understanding them; skim the chapters before the exam.

Point out that the two paths take about the same time. The difference is when the effort happens and whether it builds understanding. Programming is a skill like a musical instrument: you learn it by practicing, not by watching. Disposition practiced: self-directed. Timing: 3 minutes.
-->

---

# Finishing a project is not the same as learning from it

<div class="cols center">
<div>

- Projects exist to build **skills you will need later**
- Copied or AI-generated code can finish a project and teach you nothing
- Exams, and later jobs, test what **you** can do

</div>
<div class="card orange">

### Discuss in pairs

When is getting help with code fair, and when does it stop you from learning?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. One step in the failure flowchart was "finish the projects without understanding them". Today that is easier than ever: code can be copied from a friend or a website, or generated by an AI tool, and a project can be finished without any learning.

Projects exist to build skills you will need later in this course and in your career. Exams, and later jobs, test what you can do yourself.

Discussion prompt, 90 seconds in pairs: when is getting help with code fair, and when does it stop you from learning? Listen for: asking the instructor or a tutor, discussing ideas, and looking up how a method works are fair; submitting code you did not write or cannot explain is not. Refer students to the course policy on collaboration and AI tools. Dispositions practiced: responsible and self-directed. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Writing a Java program

From an empty file to Hello, world!

<!--
Part 2 of 4. We write our first program, one piece at a time. Timing: under 1 minute.
-->

---

# A Java program is an ordinary text file

<div class="cols center">
<div>

- You can write Java in **any text editor**
- Examples: Notepad, Notepad++, jEdit, UltraEdit
- In this course we edit, compile, and run everything in **IntelliJ**

</div>
<div class="card">

### Three steps

1. **Edit:** write the code
2. **Compile:** translate it
3. **Run:** execute it

</div>
</div>

<!--
A Java program is stored as an ordinary text file. You can write a Java program using any text editor, such as Notepad, jEdit, UltraEdit, or Notepad++.

We will be editing, compiling, and executing all with IntelliJ, an integrated development environment, or IDE: one program that does all three steps. The card lists them: edit, which means writing the code; compile, which means translating it into a form the computer can run; and run, which means executing it.

Likely question: "Can I use a different editor?" You can, but labs and help sessions assume IntelliJ, so please set it up before tomorrow's lab. Timing: 2 minutes.
-->

---

# Syntax is the set of rules for a meaningful statement

<div class="cols center">
<div class="card blue">

### English

A sentence needs a **subject** and a **predicate**.

*"The dog barks."*

</div>
<div class="card orange">

### Java

Has many, many rules too.

Break one, and the program **will not compile**.

</div>
</div>

<!--
Every language has syntax. Syntax is the set of rules that govern how you can make meaningful statements.

In English, the basic syntax for a sentence says that you must have a subject and a predicate: "The dog barks" has the subject "the dog" and the predicate "barks".

Just like English, Java has many, many different rules you will need to learn. The difference is that a person can understand a sentence with a grammar mistake; the Java compiler refuses a program with a syntax mistake. Timing: 2 minutes.
-->

---

# In Java, everything must be inside a class

<div class="cols center">
<div>

- One of the most basic rules of Java syntax
- For now, think of a class as **a way to organize things**
- Our program will be called `Hello`

</div>
<div class="card orange">

### The rule

A class called `Hello` goes in a file called `Hello.java`.

</div>
</div>

<!--
In Java, one of the most basic rules of syntax is that everything must be inside a class. For now, just think of a class as a way to organize things; we will see much more about classes later in the course.

We are going to create a Java program called Hello. We must create a file called Hello.java and put a class called Hello inside it. The file name and the class name must match exactly, including capital letters.

Likely question: "What happens if they don't match?" The compiler reports an error and refuses to compile. Timing: 2 minutes.
-->

---

# Building Hello.java, one piece at a time

````md magic-move
```java
public class Hello {
}
```
```java
public class Hello {
    public static void main(String[] args) {
    }
}
```
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```
````

<div class="callout" v-if="$clicks === 0">An empty class: it compiles, but it will not run. It has no starting point.</div>
<div class="callout" v-else-if="$clicks === 1">A <code>main</code> method: the starting point. It runs, but does nothing.</div>
<div class="callout" v-else>A print statement: now it prints <b>Hello, world!</b></div>

<!--
We build the program in three steps, one per click; the code changes smoothly and the line underneath explains each step.

Step 1: public class Hello, followed by an opening brace and a closing brace. Ignore the keyword public for now. The keyword class announces that a new class is about to be named; Hello is the name; the braces mark the beginning and end of the contents of class Hello. This empty class will compile, but it will not run.

Step 2: we need to give our class a starting point. The starting point for any Java program is a main method: public static void main, String square brackets args, with its own braces. This program will run, but it won't do anything.

Step 3: we add a print statement inside main: System.out.println, "Hello, world!", followed by a semicolon. Now the program prints Hello, world! when it runs. Timing: 4 minutes.
-->

---

# The full Hello World program, line by line

```java {1|2|3|all}
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

- Everything is **in a class**
- The class name **matches the file name**, `Hello.java`
- `main` is **where the program starts**
- The print statement **outputs** information to the screen

<!--
A recap of the full Hello World program. The highlighted line moves on each click.

Line 1: everything is in a class, and the class name must match the file name, Hello.java. Line 2: the main method is where the program starts. Line 3: the print statement outputs information on the screen. Lines 4 and 5 close main and the class; every opening brace needs a matching closing brace.

You do not need to understand every word of line 2 yet; public, static, void, and String args will each make sense later in the course. For now, every program you write starts with these lines. Timing: 3 minutes.
-->

---

# println prints a line; print stays on the same line

<div class="cols center">
<div>

```java
System.out.println("43 eggplants");
System.out.println(3.14159);
System.out.print("No newline, ");
System.out.print("same line");
```

</div>
<div class="card">

### Output

```text
43 eggplants
3.14159
No newline, same line
```

</div>
</div>

<p class="small">You can print any text in quotes, or any number.</p>

<!--
Basic output is done with System.out.println. You put what you want to print out inside the parentheses. You can print any text enclosed in quotes, such as "43 eggplants", or any number, such as 3.14159.

You can use System.out.print instead if you don't want a newline after the output. The example's last two statements use print, so "No newline, " and "same line" end up on the same line of output. The card on the right shows the full output: three lines.

Likely question: "What does ln mean?" Line: println prints, then moves to the next line. Timing: 2 minutes.
-->

---

# Check: what is printed?

<div class="cols wide-left center">
<div>

```java
System.out.print("Hi ");
System.out.println("there");
System.out.println("!");
```

</div>
<div>

<Quiz
  :options="['Hi there!', 'Hi there\n!', 'Hi\nthere\n!']"
  :answer="1"
  explain="print stays on the line, so &quot;Hi there&quot; is one line. println then moves on, so ! is on the next line."
/>

</div>
</div>

<!--
Check for understanding. The code is: print "Hi " with a space, then println "there", then println "!". What is printed?

Each option shows the exact output. A is "Hi there!" on one line. B is "Hi there" on one line and the exclamation mark on the next. C is "Hi", "there", and the exclamation mark on three lines.

Give 30 seconds, then vote with fingers for A, B, or C. The answer is B: "Hi there" on one line, then the exclamation mark on the next line. print does not move to a new line, so "there" continues the same line; println then ends that line, so the exclamation mark starts a new one.

Disposition practiced: meticulous. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# More Java syntax

Five rules you will use in every program.

<!--
Part 3 of 4. Semicolons, sequencing, case, whitespace, and comments. Timing: under 1 minute.
-->

---

# Statements run in order, each ending with a semicolon

```java
System.out.println("Hello, world!");
System.out.println("Hello, galaxy!");
System.out.println("Goodbye, world!");
```

<div class="cols" style="margin-top: 14px">
<div class="card blue">

### Semicolons

Like C and C++, Java ends each statement with `;`

</div>
<div class="card orange">

### Sequencing

Each statement is one instruction, carried out **in order**

</div>
</div>

<!--
In Java, like C, C++, and many other languages, we separate different statements with a semicolon. If we want to do a number of statements, we just type them in order, with a semicolon after each one.

For example, instead of one print statement, we can have several, as in the code: "Hello, world!", "Hello, galaxy!", then "Goodbye, world!". Each statement is an instruction to the computer, and they are carried out in order, one by one: this is called sequencing.

Likely question: "What if I forget a semicolon?" The program does not compile, and the error usually points at the line just after the missing semicolon. Timing: 2 minutes.
-->

---

# Java is case sensitive

<div class="cols center">
<div>

| Code | Result |
| --- | --- |
| `System.out.println("Word!");` | Prints correctly |
| `system.Out.Println("Word!");` | Does not compile |

</div>
<div class="card orange">

### The rule

`Class` is not the same as `class`.

Every capital letter matters.

</div>
</div>

<!--
Java is a case sensitive language: Class with a capital C is not the same as class with a lowercase c.

The table shows the opening example. System.out.println, with a capital S and everything else lowercase, prints correctly. system.Out.Println, with the capitals in the wrong places, does not compile.

This is the answer to the opening question. The convention to remember: class names such as System and String start with a capital letter, and method names such as println start with a lowercase letter. Timing: 2 minutes.
-->

---

# Java ignores extra whitespace, but people don't

<div class="cols center">
<div>

```java
System.out.println("Hello, world!");
```

is the same as

```java
        System.out.
println(              "Hello, world!");
```

</div>
<div class="card blue">

### Use whitespace well

Spaces, tabs, and blank lines make code **readable**.

Indent the inside of every pair of braces.

</div>
</div>

<!--
Java generally ignores whitespace: tabs, newlines, and spaces. The two pieces of code do exactly the same thing. The first is System.out.println "Hello, world!" on one line. The second splits it across two lines with lots of random spaces, and Java does not care.

People do care. Use whitespace effectively to make your code readable: indent the inside of every pair of braces, as in Hello.java, and use blank lines to separate steps. IntelliJ can indent your code for you.

One exception to mention: spaces inside the quotes are printed exactly as written. Timing: 2 minutes.
-->

---

# Comments are notes for people; the compiler skips them

```java
System.out.println("Hi!");  // a single-line comment

System.out.println("Hi!");  /* a multi-line
                               comment */
```

<div class="cols" style="margin-top: 12px">
<div class="card blue">

### `//`

Comments out the rest of the line

</div>
<div class="card orange">

### `/* … */`

Comments out everything in between, across lines

</div>
</div>

<!--
Programs can be confusing. Sometimes you want to leave notes for yourself or anyone else who is reading your code. The standard way to do this is with comments. Although comments appear in the code, they do not affect the final program.

There are two kinds of comments, actually three. Single-line comments start with two slashes and run to the end of the line. Multi-line comments start with slash star and end with star slash, and can cover several lines. The third kind, starting with slash star star, is a documentation comment, used to generate documentation like the Java API pages.

Likely question: "How many comments should I write?" Enough that someone else, or you in a month, can understand why the code does what it does. Timing: 2 minutes.
-->

---

# Check: which line does not compile?

<div class="cols wide-left center">
<div>

```java
System.out.println("A")   // A
System.out.println( "B" );  // B
// System.out.println("C")  // C
```

</div>
<div>

<Quiz
  :options="['Line A', 'Line B', 'Line C']"
  :answer="0"
  explain="Line A is missing its semicolon. Line B has extra spaces, which Java ignores. Line C is a comment, so the compiler skips it."
/>

</div>
</div>

<!--
Check for understanding that uses three of today's rules. Line A prints "A" but has no semicolon before its comment. Line B prints "B" with extra spaces inside the parentheses. Line C starts with two slashes. Which line does not compile?

Give 45 seconds, then vote with fingers for A, B, or C. The answer is line A: it is missing its semicolon. Line B is fine, because Java ignores the extra whitespace. Line C is entirely a comment, so the compiler skips it, missing semicolon and all.

Disposition practiced: meticulous. Timing: 2 minutes.
-->

---

# You already know two of Java's few kinds of task

<div class="cols">
<div class="card blue">

### What we know

- Sequencing
- Basic output

</div>
<div class="card orange">

### Where we are headed

- Storing numbers and text
- Basic math
- Choosing between options
- Repeating a task
- Storing lists of things
- More input and output
- Naming a task to reuse it

</div>
</div>

<!--
Java is a large, complex language. Even so, there are only a few tasks that you can ask it to do. You have already learned two: sequencing, doing statements in order, and basic output.

There are not that many other things you can tell Java to do: storing numbers and text, basic mathematical operations, choosing between several options, doing a task repetitively, storing lists of things, more complicated input and output, and naming a task so that you can use it over and over again. That is basically it.

These map onto the rest of the course: variables, arithmetic, if statements, loops, arrays, files, and methods. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 4</div>

# Back to computers

What is actually running our program?

<!--
Part 4 of 4. We step back from code and look at the machine that runs it. Timing: under 1 minute.
-->

---

# A computer manipulates data according to a list of instructions

<div class="cols center">
<div>

- Hard to define exactly
- "Computer" originally meant a **person** who did computations
- Today: a **machine** that manipulates data according to a list of instructions

</div>
<div class="card">

### Data + instructions

The list of instructions is a **program**, like `Hello.java`.

</div>
</div>

<!--
What is a computer? It is hard to define exactly. The term "computer" originally referred to a person who did computations, often by hand, for things like navigation tables and engineering.

A useful definition: a computer is a machine that manipulates data according to a list of instructions. That list of instructions is a program, like the Hello.java program we just wrote.

Likely question: "Is a calculator a computer?" A simple calculator follows fixed instructions built into it; a computer can run any program you give it. Timing: 2 minutes.
-->

---

# Computers come in many sizes, and most are hidden

| Kind | What sets it apart |
| --- | --- |
| **Supercomputers** | Extremely expensive; often special purpose now |
| **Desktops** | Home and office; some of the most powerful machines are clusters of them |
| **Laptops** | Hardly different from desktops now |
| **Tablets** | Taking the niche laptops once held; even lower power, usually no hard drive |
| **Embedded** | Tiny, low-power computers in watches, phones, toasters, cars; **more of these than any other kind** |

<style>
table { font-size: 20px !important; }
</style>

<!--
Kinds of computers. Supercomputers are extremely expensive and are often special purpose now. Desktop computers are for home and office use, and some of the most powerful computers in the world are clusters of desktop-style machines. Laptop computers are hardly different from desktops now. Tablet computers are taking the niche laptops once held; they use even lower power and usually have no hard drive.

Embedded computers focus on low power usage. They are tiny computers inside watches, phones, toasters, cars, and so on, and there are more embedded computers than any other kind.

Ask the class: how many computers are in the room right now? Count phones, watches, laptops, the projector, and the building's systems. Timing: 2 minutes.
-->

---

# From counting aids to billions of operations per second

| Era | Key idea |
| --- | --- |
| **Mechanical calculation devices** (2400 BCE onward) | Aids to human calculation; no stored program |
| **Mechanical computers** (1725 onward) | Programmed with punch cards; serious limitations |
| **Early electronic computers** (1941 onward) | Electronic, using vacuum tubes; general purpose, stored programs |
| **Microprocessors** (1970s onward) | A whole processor on one chip of transistors; billions of operations per second |

<style>
table { font-size: 20px !important; }
</style>

<!--
A short history of computers, in four eras.

Mechanical calculation devices, from about 2400 BCE onward, such as the abacus, were aids to human calculation with no stored program. Mechanical computers, from 1725 onward, could be programmed with punch cards, like early looms, but had serious limitations. Early electronic computers, from 1941 onward, were electronic, using vacuum tubes, and became general purpose, stored-program computers. Microprocessors, from the 1970s onward, put a whole processor on one chip built from transistors, which had replaced vacuum tubes, and now do billions of computations per second with parts measured in nanometers.

Simplification: the exact firsts and dates are debated by historians; the slide gives the broad sequence. Timing: 2 minutes.
-->

---

# Hardware is what you can touch; software is what runs on it

<div class="cols">
<div class="card blue">

### Hardware

The physical parts

- Processor
- Memory
- Hard disk
- Monitor

</div>
<div class="card orange">

### Software

The programs and data

- Operating systems: Windows, macOS
- Browsers: Edge, Chrome
- Applications: Word
- Games

</div>
</div>

<!--
Hardware refers to the physical parts of the computer: the processor, memory, the hard disk, and the monitor.

Software refers to the programs and data that run on it: the operating system, such as Windows, macOS, Linux, or Unix; web browsers, such as Edge, Safari, Firefox, and Chrome; business applications, such as Word and PowerPoint; and games.

In this course you write software. Your Hello.java program is software, and so is IntelliJ, which you use to write it. Timing: 2 minutes.
-->

---

# Every modern computer has a CPU, memory, and input and output

<svg viewBox="0 0 860 240" class="vn" role="img" aria-label="Von Neumann architecture. Three boxes: the CPU in the middle, memory on the left, and input and output on the right. Two-way arrows connect the CPU to memory and the CPU to input and output.">
  <defs>
    <marker id="vn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <rect x="10" y="50" width="220" height="140" rx="16" class="vn-box" />
  <text x="120" y="112" class="vn-name">Memory</text>
  <text x="120" y="142" class="vn-cap">data and instructions</text>
  <rect x="320" y="30" width="220" height="180" rx="16" class="vn-cpu" />
  <text x="430" y="112" class="vn-name">CPU</text>
  <text x="430" y="142" class="vn-cap">does the computing</text>
  <rect x="630" y="50" width="220" height="140" rx="16" class="vn-box" />
  <text x="740" y="112" class="vn-name">Input / Output</text>
  <text x="740" y="142" class="vn-cap">keyboard, screen, disk</text>
  <path d="M238 120 L 312 120" class="vn-line" marker-start="url(#vn-arrow)" marker-end="url(#vn-arrow)" />
  <path d="M548 120 L 622 120" class="vn-line" marker-start="url(#vn-arrow)" marker-end="url(#vn-arrow)" />
</svg>

<p class="small">This layout is called the <b>von Neumann architecture</b>.</p>

<style>
.vn { width: 100%; margin-top: 10px; }
.vn-box { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.vn-cpu { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 4; }
.vn-name { text-anchor: middle; font-size: 28px; font-weight: 700; fill: var(--c-ink); }
.vn-cap { text-anchor: middle; font-size: 18px; fill: var(--c-muted); }
.vn-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
</style>

<!--
The von Neumann architecture is the basic layout of all modern computers. It has three parts: the central processing unit, or CPU; memory; and input and output, or I/O.

The diagram shows three boxes in a row. Memory, on the left, holds data and instructions. The CPU, in the middle, does the computing. Input and output, on the right, connects to the outside world: the keyboard, the screen, the disk. Two-way arrows connect the CPU with memory and with input and output, because data flows in both directions.

The key idea, from John von Neumann and colleagues in the 1940s, is that the program's instructions are stored in memory alongside the data. Timing: 2 minutes.
-->

---

# The CPU fetches instructions and data, and computes

<div class="cols center">
<div>

- The **"brains"** of the computer
- **Fetches** instructions and data from memory
- **Computes** on the data, following the instructions
- Can send results to **I/O**

</div>
<div class="card orange">

### What it is made of

Electronic circuits on a small **silicon chip**, with billions of tiny switches called **transistors**.

</div>
</div>

<!--
The CPU is the "brains" of the computer. It fetches instructions and data from memory, performs computations on the data based on the instructions, and can send results to I/O, for example to show them on the screen.

A modern CPU is made of electronic circuitry embedded in a small silicon chip. The circuitry is built from billions of tiny electronic switches called transistors.

The original slide showed photos of a processor; this version describes it in words. If you have a real CPU or a motherboard, passing it around works well here. Timing: 2 minutes.
-->

---

# A 1.7 GHz processor runs 1.7 billion cycles each second

<div class="cols center">
<div>

- 1.7 GHz = **1,700,000,000** cycles per second
- Each cycle, the CPU can do something simple:
  - add, subtract, multiply
  - usually **not** divide: that takes several cycles

</div>
<div class="card blue">

### In one second

Counting to 1.7 billion, one number per second, would take a person about **54 years**.

</div>
</div>

<!--
How fast are computers? The original notes were typed on a computer running at 1.7 gigahertz. That is 1,700,000,000 cycles per second.

Each cycle, a computer can do something like an addition, a subtraction, or a multiplication; usually not a division, which takes several cycles.

The card puts the number in human terms: counting to 1.7 billion at one number per second would take a person about 54 years, and the processor does that many cycles every second. Modern processors also do several operations per cycle on each core, so the real count is even higher. Timing: 2 minutes.
-->

---

# Moore's law: transistor counts double about every two years

<div class="cols center">
<div>

- Transistors on a chip have doubled roughly every **2 years** (often quoted as 18 months)
- For decades, that made CPUs **faster**
- **Heat and power** now stop clock speeds from rising much
- But we can still fit more **stuff** on a chip

</div>
<div class="card orange">

### The question

If a chip can't get faster, what do we do with the extra transistors?

</div>
</div>

<!--
Moore's law, named after Gordon Moore, says that the density of transistors on a chip doubles regularly. The original notes say every 18 months; Moore's own 1975 estimate was every two years, and both figures are widely quoted.

Historically, this meant that CPU speeds doubled too. But since the mid-2000s, clock speeds have not risen much, because faster chips produce too much heat and use too much power. We can still put more "stuff" onto a chip.

The card asks the question for the next slide: if a chip can't get faster, what do we do with the extra transistors? Timing: 2 minutes.
-->

---

# A multicore CPU has several processors inside

<div class="cols center">
<div>

- Almost every modern laptop and desktop is **multicore**
- Each CPU has several independent processors called **cores**
- A 4-core CPU can compute **4 things at the same time**

</div>
<div class="card blue">

### Parallel processing

Doing several computations **at the same time**, on different cores.

</div>
</div>

<!--
The answer: modern laptops and desktops are now almost all multicore. Multicore means that each CPU actually has several independent processors, called cores, inside it.

A CPU with 4 cores can actually be computing 4 different things at the same time. This is called parallel processing.

Likely question: "Does a 4-core computer run my program 4 times faster?" Only if the program is written to split its work into 4 parts, and only if the work can be split. The next two slides show when that works. Timing: 2 minutes.
-->

---

# Try it: more washers help only while there are loads to share

<ParallelDemo />

<!--
Parallel processing works well for problems like washing loads of laundry in a laundromat. This interactive shows it. Use the sliders to set the number of loads of laundry and the number of washers, which stand for cores. The grid shows which washer washes which load in each round, and the sentence underneath gives the number of rounds and the speedup.

Start at 3 loads and 1 washer: 3 rounds. Move to 3 washers: 1 round, 3 times as fast. Now move to 4 washers. Still 1 round: if you have 3 loads of clothes, there is no way to wash them faster with 4 washers. The fourth washer sits idle, marked with a dashed border.

Try 8 loads with 3 washers: 3 rounds, because the last round has only 2 loads. Ask students to predict the rounds before you move a slider. Timing: 3 minutes.
-->

---

# Parallel work fails when workers must share the same thing

<div class="cols center">
<div>

- Parallel processing works poorly when processors work on the **same data**
- They get in each other's way, and **conflicts** can happen

</div>
<div class="card orange">

### Brain surgery

100 surgeons are not 20 times faster than 5.

It is not safer, either.

</div>
</div>

<!--
Parallel processing works very poorly when different processors have to work on the same data and conflicts can happen.

The card gives the classic example: brain surgery with 100 surgeons is not 20 times faster than brain surgery with 5. It is not safer, either. There is only one patient, and the surgeons get in each other's way.

Compare with the laundry: each load is separate, so washers never conflict. Programs are the same; work that splits into independent pieces speeds up on more cores, and work on shared data often does not. Timing: 2 minutes.
-->

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

Simplification to mention: drive makers and some standards use powers of 10 instead, so 1 kilobyte means 1,000 bytes, and the powers-of-2 units are sometimes written KiB, MiB, and so on. That is why a "1 TB" drive shows up as about 931 GB on your computer. Next lecture covers how numbers become bits. Timing: 3 minutes.
-->

---

# Check: how many bits are in one kilobyte?

<div class="cols wide-left center">
<div>

1 byte is 8 bits.

1 kilobyte is $2^{10}$ = 1,024 bytes.

</div>
<div>

<Quiz
  :options="['1,024 bits', '8,192 bits', '10,240 bits']"
  :answer="1"
  explain="8,192 bits: 1,024 bytes times 8 bits per byte."
/>

</div>
</div>

<!--
Check for understanding. One byte is 8 bits, and one kilobyte is 1,024 bytes. How many bits are in one kilobyte?

Give 30 seconds, then vote with fingers for A, B, or C. The answer is 8,192 bits: 1,024 bytes times 8 bits per byte.

The common mistake is answer A, which forgets to convert bytes to bits. Disposition practiced: meticulous. Timing: 2 minutes.
-->

---

# Five things to remember from today

- Success comes from **active** habits: read, ask, practice
- A Java program lives in a **class**, starts in **main**, and the class name matches the file name
- Statements end with `;`, run **in order**, and Java is **case sensitive**
- A computer has a **CPU**, **memory**, and **I/O**
- More cores help only when work can be **split into independent pieces**

<!--
Summarize. One: success in this course comes from active habits: read before class, ask questions, and practice. Two: a Java program lives in a class, starts in the main method, and the class name must match the file name. Three: statements end with a semicolon, run in order, and Java is case sensitive. Four: a computer has a CPU, memory, and input and output. Five: more cores help only when the work can be split into independent pieces.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Architecture and Organization (AR)
- **Related areas:** Foundations of Programming Languages (FPL), Parallel and Distributed Computing (PDC)
- **Competency:** write, explain, and correct a short Java program that prints output
- **Dispositions:** self-directed, collaborative, meticulous, responsible
- **Society and ethics:** academic integrity and learning from projects
- **Accessibility:** labeled diagrams, text alternatives, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: software development and data representation

<div class="cols">
<div class="card blue">

### Next time

- **Lab 1** is tomorrow
- On Friday: software development and data representation

</div>
<div class="card orange">

### Reminders

- Read Chapter 2 of the textbook
- Come to lab ready to program in **IntelliJ**

</div>
</div>

<Credit />

<!--
Next time: Lab 1 is tomorrow, where you write and run Hello World yourself. On Friday we will talk about software development and data representation, which explains how numbers and text become the bits from today's last slides.

Reminders: read Chapter 2 of the textbook, and come to lab ready to program in IntelliJ, installed and working. Timing: 1 minute.
-->

---
layout: center
class: text-center
---

# Exit ticket: scan before you leave

<ExitTicket />

<p class="small">If you cannot scan the code, ask for the link.</p>

<!--
Exit ticket. Students scan the QR code to open today's exit ticket form. Read the instruction aloud and offer the link directly to anyone who cannot scan the code; paste the form's address here in the notes before class so you can share it in the chat or on the board.

Timing: 3 minutes.
-->
