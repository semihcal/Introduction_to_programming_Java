---
theme: ../../theme
title: COMP 1600 – Week 14, Lecture 1 – instanceof, Files and Exceptions
info: |
  Files let data outlive the program. We read text files with Scanner, write
  them with PrintWriter, and meet exceptions, Java's way of reporting errors
  such as a missing file.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 14</div>

# Files keep data after the program <span class="hl">ends</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>instanceof</span>
  <span>Reading files</span>
  <span>Exceptions</span>
  <span>Writing files</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <rect x="6" y="40" width="130" height="56" rx="28" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="71" y="76" text-anchor="middle" class="cover-art-name">program</text>
    <rect x="6" y="224" width="130" height="56" rx="28" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="71" y="260" text-anchor="middle" class="cover-art-name">program</text>
    <path d="M136 68 C 180 68, 170 130, 204 138" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M204 186 C 170 194, 180 252, 144 252" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M208 96 h70 l28 28 v100 h-98 z" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <path d="M278 96 v28 h28" fill="none" stroke="#c2410c" stroke-width="3" />
    <text x="257" y="172" text-anchor="middle" class="cover-art-obj">file</text>
    <text x="178" y="56" text-anchor="middle" class="cover-art-name" style="font-size: 18px">write</text>
    <text x="182" y="282" text-anchor="middle" class="cover-art-name" style="font-size: 18px">read</text>
  </svg>
</div>
</div>

<!--
Welcome. Today we finish inheritance with one more look at instanceof, and then start a new topic: files. We read from a text file, write to a text file, and meet exceptions, which is how Java reports that something went wrong.

CS2023 mapping (indicative, introductory coverage): the primary knowledge area is Software Development Fundamentals (SDF); secondary are Foundations of Programming Languages (FPL) for exceptions and Operating Systems (OS) for files, with one Society, Ethics, and Professionalism (SEP) touchpoint on writing over other people's data.

See also: Week 13 Lecture 3 (inheritance and instanceof), Week 12 (the Picture class, which read and wrote image files for us), and Week 13 Lecture 2 (sorting, used in today's example).

Delivery reminders: read on-screen text aloud, describe each diagram in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Test** an object's type with `instanceof` <span class="tag">FPL</span>
- **Read** values from a text file with `Scanner` <span class="tag">SDF</span>
- **Distinguish** checked exceptions from unchecked ones <span class="tag">FPL</span>
- **Write** values to a text file, and close it <span class="tag">SDF · OS</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: FPL is Foundations of Programming Languages, SDF is Software Development Fundamentals, and OS is Operating Systems.

The second and fourth objectives are the apply-level skills: by the end of class we write one program that saves numbers to a file and another that reads them back.

Likely question: "Do we need to catch exceptions?" Not today. We only need to recognize them and pass them on. Timing: 1 minute.
-->

---

# Predict first: where do the numbers go?

<div class="cols wide-left center">
<div>

A program reads 10 numbers from the user into an array.

Then the program ends.

<p class="small">You run the program again. What is in the array? Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['The same 10 numbers', 'Nothing: they are gone', 'It depends on the computer']"
  :answer="1"
  explain="Gone. Variables live only while the program runs. To keep data, write it to a file."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give 45 seconds with a neighbor before anyone clicks. Low-tech alternative: one, two, or three fingers for A, B, or C.

A program reads 10 numbers from the user into an array, and then ends. You run the program again. What is in the array? The answer: nothing. They are gone. Variables and arrays live in memory only while the program runs.

That is the reason for today's topic. To keep data between runs, a program has to write it to a file. Disposition practiced: collaborative. Timing: 2 minutes.
-->

---

# Last time: subclasses, overriding, and a cost example

<div class="cols center">
<div class="card blue">

### Inheritance in Java

- `class Car extends Vehicle`
- A child can **override** a method
- The object's own version runs

</div>
<div class="card orange">

### Inheritance examples

- `Vehicle`, `Car`, `Truck`
- Each overrides `calculateCost`
- `getClass()` and `instanceof`

</div>
</div>

<!--
What did we talk about last time? Inheritance examples.

We wrote subclasses with the extends keyword, and saw that a child class can override a method, in which case the object's own version runs. We designed a vehicle cost calculator with a Vehicle parent and Car and Truck children, each overriding calculateCost. And we met two ways to ask what kind of object we have: getClass and instanceof.

We start today by finishing instanceof. Timing: 2 minutes.
-->

---
layout: center
class: text-center
---

# Project 5: where are you, and what is unclear?

<p class="small">Questions about the project or about last time are welcome now.</p>

<!--
Project 5 check-in and questions. Ask for a show of hands on progress, and take questions about the project and about inheritance. Repeat each student question aloud before answering so everyone, and the captions, can follow.

Fill in any project details you want to announce here. Timing: 4 minutes.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# One more inheritance example

Finishing the instanceof keyword.

<!--
Part 1 of 4. A short part that completes last lecture. Timing: under 1 minute.
-->

---

# instanceof is true for a type and for all its children

<div class="cols center">
<div>

```java
if (dog instanceof Mammal) {
    System.out.println(
        "It's a mammal!");
}
```

</div>
<div>

- An alternative to `getClass()`
- True if the object **has** the type, or is a **child** of it
- Here: prints for a `Mammal` or any child class, including `Dog`

</div>
</div>

<!--
An alternative to the getClass method is the instanceof keyword. You can use it to see if an object has a type or is a child of the given type.

The code will print "It's a mammal!" if dog is a Mammal or any child class of Mammal, including Dog.

So instanceof asks an "is a kind of" question. A Dog is a kind of Mammal, so the test is true. Likely question: "What if dog is null?" Then instanceof is false, and no exception is thrown. Timing: 3 minutes.
-->

---

# Check: which test is true for a Dog object?

<div class="cols wide-left center">
<div>

```java
Mammal m = new Dog();

// A
m instanceof Mammal
// B
m instanceof Cat
// C
m.getClass() == Mammal.class
```

</div>
<div>

<Quiz
  :options="['Only A', 'A and C', 'All three']"
  :answer="0"
  explain="Only A. A Dog is a kind of Mammal, is not a Cat, and its exact class is Dog, not Mammal."
/>

</div>
</div>

<!--
Check for understanding. A new Dog is stored in a Mammal reference called m. Three tests are listed: A, m instanceof Mammal. B, m instanceof Cat. C, m.getClass equals Mammal.class. Which are true?

Give 45 seconds, then vote with fingers for A, B, or C. The answer is only A.

A is true because a Dog is a kind of Mammal. B is false because a Dog is not a Cat. C is false because getClass gives the exact class of the object, which is Dog, even though the reference has type Mammal. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Files

Data that outlives the program.

<!--
Part 2 of 4. A new topic: reading from and writing to files. Timing: under 1 minute.
-->

---

# A file exists after the program is done

<div class="cols center">
<div>

- You have used image and audio files, but not read or written them **directly**
- A program can read and write individual pieces of data in a file
- It works much like the command line: `Scanner` and `System.out`

</div>
<div>
<svg viewBox="0 0 340 220" class="life" role="img" aria-label="Two bars over time, with a dashed line marking where the program ends. The bar for a variable stops at the line: it is gone after the program ends. The bar for a file continues past the line: it is still there.">
  <text x="6" y="20" class="life-cap">time →</text>
  <text x="160" y="20" class="life-cap" style="text-anchor: middle">program ends</text>
  <line x1="160" y1="30" x2="160" y2="206" class="life-line" />
  <rect x="6" y="44" width="142" height="50" rx="10" class="life-var" />
  <text x="77" y="76" class="life-name">variable</text>
  <text x="174" y="75" class="life-cap">gone after it ends</text>
  <rect x="6" y="136" width="328" height="50" rx="10" class="life-file" />
  <text x="81" y="168" class="life-name">file</text>
  <text x="247" y="167" class="life-cap" style="text-anchor: middle; fill: var(--c-ink)">still there</text>
</svg>
</div>
</div>

<style>
.life { width: 100%; }
.life-var { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.life-file { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 3; }
.life-name { text-anchor: middle; font-size: 22px; font-weight: 700; fill: var(--c-ink); }
.life-cap { text-anchor: start; font-size: 18px; fill: var(--c-muted); }
.life-line { stroke: var(--c-ink); stroke-width: 2; stroke-dasharray: 6 5; }
</style>

<!--
In this course, you have already dealt with image and audio files, but you did not do any direct input or output to them; classes like Picture did it for you. It is possible to read and write individual pieces of data to a file.

Files are great because they exist after the program is done. The diagram shows two bars over time, with a dashed line marking the moment the program ends. The bar for a variable stops at that line: the variable is gone. The bar for a file continues past it: the file is still there.

Reading and writing to a file is very similar to reading and writing to the command line, using Scanner and System.out. So most of what you need, you already know. Timing: 3 minutes.
-->

---

# Reading a file uses the Scanner you already know

```java
Scanner in = new Scanner(new File("input.txt"));
```

<div class="cols" style="margin-top: 18px; grid-template-columns: 1fr 1.35fr">
<div class="card blue">

### From the keyboard

`new Scanner(System.in)`

</div>
<div class="card orange">

### From a file

`new Scanner(new File("input.txt"))`

</div>
</div>

<div class="callout">After that, <code>nextInt()</code>, <code>next()</code>, and <code>nextLine()</code> work exactly the same.</div>

<!--
Reading from a text file is almost ridiculously easy. We use Scanner, just like reading from the command line. We just have to create a new File object that gives the file we want to read from.

The code at the top reads from a file called input.txt, as if someone were typing its contents into the command line. The two cards compare the versions: for the keyboard we wrote new Scanner of System.in; for a file we write new Scanner of new File with the file name.

After that line, nextInt, next, and nextLine work exactly the same as before. Likely question: "Where does the file have to be?" In the project folder, unless you give a full path. Both Scanner and File need imports: java.util.Scanner and java.io.File. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# Exceptions

What happens when the file is not there?

<!--
Part 3 of 4. The line we just wrote does not compile by itself. This part explains why. Timing: under 1 minute.
-->

---

# A missing file is an error Java makes you plan for

<div class="cols center">
<div>

- Type that line into IntelliJ and you get a **red squiggle**
- The problem: what if `input.txt` does not exist?
- Java reports errors with **exceptions**

</div>
<div class="card orange">

### Exception

An object that signals an error while the program runs.

Code can **catch** it and recover, or pass it on.

</div>
</div>

<!--
Unfortunately, if you type that line into IntelliJ, you will get a red squiggle underneath the code. The problem is this: what would happen if input.txt does not exist?

This is an error situation, and Java uses something called exceptions to deal with errors. The card defines the term: an exception is an object that signals an error while the program runs. You can catch an exception and do something to recover from the situation, or pass it on.

Likely question: "Why is it an error before I even run it?" Because Java can see that this line might fail, and insists that you decide what should happen. That is the next slide. Timing: 3 minutes.
-->

---

# Checked exceptions must be handled or the code will not compile

<div class="cols center" style="grid-template-columns: 1fr 1.2fr">
<div class="card orange">

### Checked

`FileNotFoundException`

The compiler **checks** that your code deals with it.

</div>
<div class="card blue">

### Unchecked

- `NullPointerException`
- `ArrayIndexOutOfBoundsException`

No need to deal with them. They usually mean the program has a bug.

</div>
</div>

<!--
The error if the file is not there is called a FileNotFoundException, and it is a checked exception. If there is the possibility of throwing a checked exception, your code has to deal with it, or else your program will not compile.

You have seen exceptions before: NullPointerException, ArrayIndexOutOfBoundsException, and others. These are called unchecked exceptions, because you do not have to deal with them. You usually cannot deal with them: they mean that your program has a bug.

The difference in one sentence: a missing file is something a correct program must expect, so Java checks that you planned for it; an index out of bounds is a mistake in the program, so the fix is to correct the code. Timing: 3 minutes.
-->

---

# throws passes the exception up to the caller

```java {1-2|3}
public static void main(String[] args)
        throws FileNotFoundException {
    Scanner in = new Scanner(new File("input.txt"));
```

<div class="callout">The program still stops if the file is missing, but now it <b>compiles</b>.</div>

<!--
The alternative to catching an exception is throwing it up to the next level, making it someone else's problem. Sure, your program will crash if no one deals with it, but at least your code will compile.

We do this by putting "throws FileNotFoundException" on the declaration of main, or whatever method we are in. Lines 1 and 2 show main with the throws clause. Line 3 is the same Scanner line as before, now without the red squiggle.

So today's rule is simple: any method that opens a file gets "throws FileNotFoundException" on its declaration. Catching exceptions with try and catch is a topic for a later course. FileNotFoundException needs an import from java.io. Timing: 3 minutes.
-->

---

# Check: which exception does the compiler force you to handle?

<div class="cols wide-left center">
<div>

```java
int[] a = new int[5];
a[10] = 1;                        // A

String s = null;
s.length();                       // B

new Scanner(new File("x.txt"));   // C
```

</div>
<div>

<Quiz
  :options="['Line A', 'Line B', 'Line C']"
  :answer="2"
  explain="Line C. A missing file is a checked exception. A and B are unchecked: bugs to fix."
/>

</div>
</div>

<!--
Check for understanding. Three lines can each cause an exception. Line A stores into index 10 of an array of 5 elements. Line B calls length on a null String. Line C opens a file with a Scanner. Which one does the compiler force you to handle?

Give 45 seconds, then vote with fingers for A, B, or C. The answer is line C: a missing file causes FileNotFoundException, which is checked.

Lines A and B cause ArrayIndexOutOfBoundsException and NullPointerException. Both are unchecked: the program compiles, and stops when it reaches the line. They are bugs to fix, not situations to plan for. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 4</div>

# Writing files

Sending output to a file instead of the screen.

<!--
Part 4 of 4. Writing is the mirror image of reading. Timing: under 1 minute.
-->

---

# Writing to a file takes a PrintWriter

```java
PrintWriter out = new PrintWriter(
    new FileOutputStream("output.txt"));
```

<div class="cols" style="margin-top: 16px">
<div class="card blue">

### To the screen

`System.out.println(x);`

</div>
<div class="card orange">

### To a file

`out.println(x);`

</div>
</div>

<!--
Java loves objects. If you want to write to a file, you have got to create a PrintWriter object, based on a FileOutputStream object, which takes the file name as a parameter.

Once you have got a PrintWriter, you can use it just like System.out. The two cards compare them: to print to the screen we write System.out.println of x; to print to the file we write out.println of x. The methods print and println behave the same way.

Both classes need imports from java.io: PrintWriter and FileOutputStream. Likely question: "What if output.txt already exists?" It is replaced. We come back to that at the end. Timing: 3 minutes.
-->

---

# Opening a file for writing can also throw FileNotFoundException

<div class="cols center">
<div>

- Making a `PrintWriter` from a `FileOutputStream` can throw a `FileNotFoundException`
- Odd: you do not expect to *find* a file you are about to create
- The same fix works

</div>
<div class="card">

### The fix

Add `throws FileNotFoundException` to the method declaration.

</div>
</div>

<!--
Just like making a Scanner from a File, making a PrintWriter from a FileOutputStream will potentially throw a FileNotFoundException.

Weird, isn't it? You do not expect to find a file when you are about to write one. Sometimes Java's names do not match the situation. In practice it happens when the file cannot be created, for example because the folder does not exist or you are not allowed to write there.

Anyway, adding "throws FileNotFoundException" to the method declaration will still solve the problem. Timing: 2 minutes.
-->

---

# Close every file when you are done with it

```java {1-3|4|5-6}
Scanner in = new Scanner(new File("input.txt"));
PrintWriter out = new PrintWriter(
    new FileOutputStream("output.txt"));
// do stuff
in.close();
out.close();
```

<div class="callout">Forget to close a file you are writing, and what you wrote <b>might not show up</b>.</div>

<!--
Unlike the command line, you should really close files when you are done reading from them. Lines 1 to 3 open one file for reading and one for writing. Line 4 stands for the work. Lines 5 and 6 close both.

If you forget to close a file you are writing to, everything you write might not show up. The reason is that output is collected in memory and written to the file in batches; close writes out whatever is still waiting.

And for situations where you are accessing multiple files, it may be even more important to close them. Likely question: "Does the program close files when it ends?" Often, but not reliably for output. Call close yourself. Disposition practiced: meticulous. Timing: 3 minutes.
-->

---

# Example: save 10 numbers, then read and sort them

<div class="cols center">
<div class="card blue">

### Program 1: writer

1. Prompt the user for 10 `int` values
2. Write them to `numbers.txt`
3. Close the file

</div>
<div class="card orange">

### Program 2: reader

1. Open `numbers.txt`
2. Read all 10 numbers
3. Sort them
4. Print them in order

</div>
</div>

<!--
Live coding. Let's write a program that prompts the user for 10 int values and then writes them to a file called numbers.txt. Then let's write another program that opens numbers.txt, reads all 10 numbers, sorts them, and prints them out in order.

One solution for the writer, for the instructor:

```java
Scanner in = new Scanner(System.in);
PrintWriter out = new PrintWriter(new FileOutputStream("numbers.txt"));
for (int i = 0; i < 10; i++) {
    System.out.print("Enter a number: ");
    out.println(in.nextInt());
}
out.close();
```

And for the reader: open a Scanner on new File("numbers.txt"), read 10 values into an int array with nextInt, sort the array with bubble sort or selection sort from last week, print each element, and close the Scanner. Both main methods need "throws FileNotFoundException". Timing: 10 minutes.
-->

---

# Try it: the file connects two separate programs

<FileDemo />

<!--
This interactive simulates the two programs. On the left is the writer, with the 10 numbers the user types. In the middle is the file numbers.txt. On the right is the reader, which reads the file, sorts the numbers, and prints them.

First press Run reader before anything else: the file does not exist, so the reader stops with a FileNotFoundException. Then press Run writer: the 10 numbers appear in numbers.txt, one per line. Press Run reader again: it prints the numbers in sorted order.

Now untick "call out.close" and run the writer again. The file is created but empty, because the numbers were still waiting in memory when the program ended. Run the reader: it fails because there is nothing to read. Real programs may write some of the data or none; the point is that you cannot rely on it. The line of text at the bottom always says what just happened. Timing: 4 minutes.
-->

---

# More practice: write the first million primes to a file

<div class="cols center">
<div>

1. Open a `PrintWriter` on a file
2. Test each number: is it prime?
3. If so, `println` it to the file and count it
4. Stop at 1,000,000 primes, then **close** the file

</div>
<div class="card">

### Why a file?

A million lines would scroll past on the screen. In a file, they can be opened, searched, and reused.

</div>
</div>

<!--
More file practice. Let's write a program that prints the first million prime numbers to a file.

The steps: open a PrintWriter on a file. Test each number in turn to see whether it is prime. If it is, print it to the file and count it. Stop when the count reaches one million, and then close the file.

The card explains why this is a file problem: a million lines would scroll past on the screen and be lost. In a file, they can be opened, searched, and reused by another program. Use this as live coding if time allows, or leave it as practice. Hint for the prime test: try dividing by every number from 2 up to the square root. Timing: 8 minutes if coded in class.
-->

---

# Writing a file replaces whatever was there

<div class="cols center">
<div>

- Opening a file for writing **erases** its old contents
- There is no warning and no undo
- The file might be someone's only copy

</div>
<div class="card orange">

### Discuss in pairs

Your program asks the user for an output file name. What should it do if that file already exists?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Opening a file for writing with FileOutputStream erases its old contents immediately. There is no warning and no undo. The file might be someone's only copy of their work.

Discussion prompt, 90 seconds in pairs: your program asks the user for an output file name. What should it do if that file already exists? Listen for options: ask before replacing, choose a new name, or add to the end of the file instead. There is no single right answer, but silently destroying data is the wrong one. Software that handles other people's files carries responsibility for them.

Dispositions practiced: responsible and collaborative. Timing: 3 minutes.
-->

---
layout: center
class: text-center
---

# Quiz time

<p class="small">Put away your notes. Work on your own.</p>

<!--
In-class quiz. Hand out or open the quiz and give students the planned amount of time. Read the instructions aloud and say when the time starts and ends. Timing: as planned for the quiz.
-->

---

# Five things to remember from today

- `instanceof` is true for a type and all of its children
- Read a file: `new Scanner(new File("input.txt"))`
- A **checked** exception must be handled; `throws` passes it on
- Write a file: `new PrintWriter(new FileOutputStream(...))`
- Always `close()` a file, especially one you write

<!--
Summarize. One: instanceof is true for a type and all of its children. Two: to read a file, create a Scanner on a new File. Three: a checked exception, such as FileNotFoundException, must be handled, and adding throws to the method declaration passes it on. Four: to write a file, create a PrintWriter on a new FileOutputStream, and then use it like System.out. Five: always close a file, especially one you are writing, or the output may be lost.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Foundations of Programming Languages (FPL), Operating Systems (OS)
- **Competency:** write programs that save data to a text file and read it back
- **Dispositions:** meticulous, collaborative, responsible
- **Society and ethics:** protecting existing files from being overwritten
- **Accessibility:** labeled diagrams, text alternatives, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: review

<div class="cols">
<div class="card blue">

### Next time

- Next week, we review
- Next Monday: review up to Exam 1

</div>
<div class="card orange">

### Reminders

- Keep working on Project 5
- No class Wednesday through Friday
- There is still **lab tomorrow**

</div>
</div>

<Credit />

<!--
Next week we will review, and next Monday will be review of the material up to Exam 1.

Reminders: keep working on Project 5. There is no class on Wednesday through Friday this week, but there is still lab tomorrow.

Timing: 1 minute.
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
