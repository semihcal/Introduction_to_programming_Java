---
theme: ../../theme
title: COMP 1600 – Week 6, Lecture 3 – do-while Review and Introduction to Arrays
info: |
  After a short review of do-while loops, we meet arrays: a fixed-size list
  of values of one type. We declare and create arrays, read and change their
  elements by index, find their length, fill them, and see how an array is
  laid out in memory.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 6</div>

# Arrays: numbered boxes <span class="hl">from 0</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>do-while</span>
  <span>Arrays</span>
  <span>Indexing</span>
  <span>Memory</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <g font-family="JetBrains Mono, monospace" font-weight="700" text-anchor="middle">
      <rect x="10" y="120" width="60" height="64" fill="#eef2ff" stroke="#3730a3" stroke-width="3" /><text x="40" y="162" style="font-size: 24px" fill="#0f172a">12</text><text x="40" y="214" style="font-size: 20px" fill="#475569">0</text>
      <rect x="70" y="120" width="60" height="64" fill="#eef2ff" stroke="#3730a3" stroke-width="3" /><text x="100" y="162" style="font-size: 24px" fill="#0f172a">43</text><text x="100" y="214" style="font-size: 20px" fill="#475569">1</text>
      <rect x="130" y="120" width="60" height="64" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="160" y="162" style="font-size: 24px" fill="#0f172a">-9</text><text x="160" y="214" style="font-size: 20px" fill="#c2410c">2</text>
      <rect x="190" y="120" width="60" height="64" fill="#eef2ff" stroke="#3730a3" stroke-width="3" /><text x="220" y="162" style="font-size: 24px" fill="#0f172a">6</text><text x="220" y="214" style="font-size: 20px" fill="#475569">3</text>
      <rect x="250" y="120" width="60" height="64" fill="#eef2ff" stroke="#3730a3" stroke-width="3" /><text x="280" y="162" style="font-size: 24px" fill="#0f172a">…</text><text x="280" y="214" style="font-size: 20px" fill="#475569">…</text>
      <text x="160" y="90" style="font-size: 22px" fill="#c2410c">list[2]</text>
    </g>
  </svg>
</div>
</div>

<!--
This lecture has four parts. First, a short review of do-while loops. Second, arrays: what they are and where we have already seen one. Third, array syntax: declaring and creating arrays, reading and changing elements, the length, and filling an array. Fourth, how an array is laid out in memory, which explains why indexes start at 0.

The drawing on the right shows an array as a row of boxes holding 12, 43, -9, 6, and more, with their indexes 0, 1, 2, 3 underneath. The box at index 2, holding -9, is highlighted and labeled list[2].

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for arrays and iteration over them; secondary is Architecture and Organization (AR) for the memory layout of an array.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Declare** and **create** an array of a given type and size <span class="tag">SDF</span>
- **Read** and **change** an element by index, from 0 to length − 1 <span class="tag">SDF</span>
- **Fill** an array with a list or with a loop <span class="tag">SDF</span>
- **Explain** why indexes start at 0, using memory addresses <span class="tag">AR</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and AR is Architecture and Organization.
-->

---
minutes: 2
---

# Predict first: what happens?

<div class="cols wide-left center">
<div>

```java
int[] list = new int[5];
System.out.println(list[5]);
```

<p class="small">list has 5 elements. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['0', 'The program crashes', 'Nothing is printed']"
  :answer="1"
  explain="The program crashes with an ArrayIndexOutOfBoundsException. The 5 elements are list[0] to list[4]; there is no list[5]."
/>

</div>
</div>

<!--
The code creates an array of 5 ints and prints list[5].

The answer is that the program crashes with an ArrayIndexOutOfBoundsException. An array of 5 elements has indexes 0, 1, 2, 3, and 4: the first element is list[0] and the last is list[4]. There is no list[5], and Java stops the program rather than read memory that does not belong to the array.

0 is a reasonable guess, since a new int array is filled with zeros, but only list[0] to list[4] exist. "Nothing is printed" would mean Java silently skipped the line. This lecture explains why indexes start at 0.
-->

---
minutes: 1
---

# Last time: loop examples and do-while loops

<div class="cols center">
<div class="card blue">

### Loop examples

- Prime numbers and lists of primes
- for loop pitfalls

</div>
<div class="card orange">

### do-while loops

- Body first, condition after
- A menu program

</div>
</div>

<!--
What did we talk about last time? Loop examples: testing whether a number is prime, listing primes with nested loops, and the common for loop errors. And an introduction to do-while loops, with a menu program.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# do-while loops

A short review.

<!--
Part 1 of 4. A short review of do-while loops.
-->

---
minutes: 1
---

# do-while loops are guaranteed to run at least once

- No one really uses do-while loops
- They work just like while loops, but always execute **at least once**
- The condition isn't checked the **first** time into the loop
- Especially useful for getting **input** from the user

<!--
No one really uses do-while loops. They work just like while loops; the only difference is that they are guaranteed to execute at least once, because the condition isn't checked the first time you go into the loop. This is sometimes especially useful for getting input from the user. The syntax is a little bit different.
-->

---
minutes: 1
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
- `while (condition);` **after** the body, with a semicolon

</div>
</div>

<!--
The anatomy of a do-while loop: do, then the body in braces, then while with the condition in parentheses, and a required semicolon. The body runs, then the condition is checked, and the body runs again while it is true.
-->

---
minutes: 1
---

# Menu with a do-while: show the menu at least once

- Certain kinds of input suit a do-while
- A program that gives a **menu** of options:
  1. Add two numbers
  2. Subtract two numbers
  3. Multiply two numbers
  4. Quit

<!--
The do-while loop is rarely used, but certain kinds of input are well suited to it, such as a program that gives a menu of options: add, subtract, or multiply two numbers, or quit. The menu must be shown at least once, and whether to show it again is only known after the user chooses: body first, check after. Last lecture's menu interactive runs exactly this program.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Arrays

A list of variables under one name.

<!--
Part 2 of 4. Arrays.
-->

---
minutes: 1
---

# What good is a loop without something to loop over?

- Loops are great
- But without a way to talk about a **list of variables**, we can't get their full potential
- Enter: the **array**

<!--
What good is a loop without something to loop over? Loops are great, but without a way to talk about a list of variables, we can't get the full potential out of a loop. Storing 100 test scores in 100 separately named variables would mean 100 separate lines of code to add them up. Enter: the array, which lets a loop visit every value with one line in its body.
-->

---
minutes: 2
---

# An array is a homogeneous, static data structure

<div class="cols center">
<div class="card blue">

### Homogeneous

Everything in the array is the **same type**: int, double, String, etc.

</div>
<div class="card orange">

### Static

The **size** of the array is **fixed** when you create it.

</div>
</div>

<!--
The definition: an array is a homogeneous, static data structure. Homogeneous means that everything in the array is the same type: an array of ints holds only ints, an array of Strings only Strings. Static, in this case, means that the size of the array is fixed when you create it: an array created with room for 100 values always has exactly 100 slots. It cannot grow or shrink; a bigger list needs a new, bigger array.

A data structure is a way of organizing data so that a program can use it. The array is the simplest one.
-->

---
minutes: 1.5
---

# You have seen an array before: `args` in `main`

```java
public static void main(String[] args)
```

- `args` is an **array of type String**
- It has a set number of Strings (maybe **zero**) that a program can use as input
- Now you can **create and manipulate** your own arrays

<!--
Where have you seen arrays before? In every program: the args variable passed into the main method is an array of type String, which is what String with square brackets means. It holds a set number of Strings, maybe zero, that can be given to the program as input when it starts, for example from the command line or IntelliJ's run configuration. Programs so far have ignored it. Now, we are giving you the ability to create and manipulate your own arrays.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Array syntax

Declaring, creating, indexing, and filling.

<!--
Part 3 of 4. The syntax for working with arrays.
-->

---
minutes: 1.5
---

# Declaring an array: add [] after the type

<div class="cols center">
<div>

```java
type[] name;
```

</div>
<div>

```java
int[] list;
```

</div>
</div>

<div class="callout">Just like any variable declaration, but with <code>[]</code> after the type.</div>

<!--
To declare an array of a specified type with a given name, write the type, square brackets, and the name: type[] name. For example, int[] list declares a variable named list that can refer to an array of ints. It is just like any variable declaration, but with square brackets after the type. The brackets are what say "an array of", so int[] is read "int array".
-->

---
minutes: 2
---

# Instantiating an array: `new` creates it with a specific size

<div class="cols center">
<div>

```java
int[] list;
list = new int[100];
```

<p class="small">Declaring only makes a variable that <b>can</b> hold an array; <code>new</code> creates the array: 100 ints.</p>

</div>
<div>

```java
int[] list = new int[100];
```

<p class="small">Most people do it all in one line.</p>

</div>
</div>

<!--
When you declare an array, you are only creating a variable that can hold an array; no array exists yet. To use it, you have to create an array, supplying a specific size, with the new keyword: list = new int[100] creates an array of 100 ints and stores it in list. Creating an object with new is called instantiation, the same word as for Scanner objects.

Most people would do this all in one line: int[] list = new int[100]. The size can also be a variable, such as new int[n] where n was read from the user, but once created, the size is fixed.
-->

---
minutes: 2
---

# Accessing elements: index with square brackets, from 0

<div class="cols center">
<div>

```java
list[9] = 142;
System.out.println(list[9]);
```

</div>
<div>

- `list[9]` behaves exactly like an **int variable**
- You can **read** from it and **store** into it
- Indexes go from **0** to **length − 1**

</div>
</div>

<!--
You can access an element of an array by indexing into it, using square brackets and a number. Once you have indexed into an array, that element behaves exactly like any other variable of that type: list[9] is an int, so you can store 142 into it, and then print it, which prints 142.

Indexing starts at 0 and stops at 1 less than the length. In an array of 100 elements, the first is list[0] and the last is list[99]; list[9] is the tenth element. The index can be any int expression, such as list[i] inside a loop, which is what makes arrays and loops work so well together.
-->

---
minutes: 1.5
---

# The length of an array: `list.length`

```java
int[] list = new int[42];
int size = list.length;
// Prints 42
System.out.println("List has " + size + " elements");
```

<div class="callout"><code>length</code> has <b>no parentheses</b> for arrays: <code>list.length</code>, not <code>list.length()</code>.</div>

<!--
When you instantiate an array, you specify the length. Sometimes, like in the case of args, you are given an array of unknown length. You can use its length member to find out: list.length is 42 for an array created with new int[42], and the code prints "List has 42 elements".

A common confusion: for a String, length is a method, written with parentheses, word.length(). For an array, length is a value stored with the array, written without parentheses, list.length. The last valid index is always list.length - 1.
-->

---
minutes: 2
---

# Automatic initialization: new arrays start with default values

<div class="cols center">
<div>

| Type | Value |
| --- | --- |
| `int` | `0` |
| `double` | `0.0` |
| `char` | `'\0'` |
| `boolean` | `false` |

</div>
<div>

- int, double, char, and boolean arrays are **filled automatically**
- For other types, including **Strings**, each element must be filled **explicitly**

</div>
</div>

<!--
When you create an int, double, char, or boolean array, the array is automatically filled with certain values: 0 for int, 0.0 for double, the null character, written backslash zero, for char, and false for boolean. So new int[100] is a hundred zeros, ready to be used as counters or sums.

For other types, including Strings, each index in the array must be filled explicitly. A new String array is filled with null, which means "no String at all"; calling a method such as length() on a null element crashes the program.
-->

---
minutes: 2
---

# Check: what does this code print?

```java
double[] prices = new double[4];
prices[2] = 9.99;
System.out.println(prices[1] + " " + prices.length);
```

<div style="max-width: 520px; margin-top: 10px">

<Quiz
  :options="['9.99 4', '0.0 4', '0.0 3']"
  :answer="1"
  explain="0.0 4. prices[1] was never set, so it keeps the default 0.0. The length is 4, the size given to new, even though the last index is 3."
/>

</div>

<!--
The code creates an array of 4 doubles, stores 9.99 at index 2, and prints prices[1] followed by the length.

The answer is "0.0 4". Only index 2 was set; index 1 still holds the default value for a double array, 0.0. The length is 4, the size given when the array was created, no matter which elements have been filled.

9.99 confuses index 1 with index 2, which is the third element. 3 is the last index, not the length; the length is always one more than the last index.
-->

---
minutes: 2.5
---

# Explicit initialization: with a list, or with a loop

```java
String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday",
                 "Friday", "Saturday", "Sunday"};
```

```java
String[] numbers = new String[100];
for (int i = 0; i < numbers.length; ++i) {
    numbers[i] = "" + (i + 1);
}
```

<!--
Explicit initialization can be done with a list in braces: String[] days = {"Monday", "Tuesday", and so on to "Sunday"}. Java counts the values and creates an array of exactly that length, 7, with days[0] being "Monday" and days[6] being "Sunday". No new or size is written; the list supplies both.

Or, a loop could be used to set all the values. numbers is an array of 100 Strings. The for loop runs i from 0 up to, but not including, numbers.length, which is the standard way to visit every index. Each element gets "" + (i + 1), the number one more than its index, as a String: numbers[0] is "1" and numbers[99] is "100". Using numbers.length instead of 100 keeps the loop correct if the size changes.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# Array memory

Why the first index is 0.

<!--
Part 4 of 4. How an array is stored in memory.
-->

---
minutes: 2
---

# Memory: an index is an offset from the start of the array

- An array takes up the **size of each element × the length**
- Each array starts at some point in computer **memory**
- The index is actually an **offset** from that starting point
- That's why the first element is at index **0**

<!--
An array takes up the size of each element times the length of the array: an int is 4 bytes, so an array of 100 ints takes 400 bytes, in one continuous block. Each array starts at some point in computer memory. The index used for the array is actually an offset from that starting point: how many elements to skip past. The first element is at the start, skipping nothing, which is why it is at index 0.
-->

---
minutes: 2
---

# A look at memory: an int array of length 10 starting at 524

<ArrayMemory />

<!--
Imagine an array of type int of length 10. Java decides what address in memory is going to be used, but let's say it starts at address 524. The interactive shows the array as a row of ten cells holding 12, 43, -9, 6, 789, 0, -23, 23, 10, and 6. Above each cell is its address: 524, 528, 532, and so on, going up by 4 because each int takes 4 bytes, ending at 560. Below each cell is its index, 0 to 9.

The rule: the address of element i is the start plus 4 times i. list[0] is at 524 + 0 = 524; list[3], which holds 6, is at 524 + 12 = 536. The plus and minus buttons change the index. Going to -1 or to 10 shows the ArrayIndexOutOfBoundsException: those addresses are outside the array, so Java refuses to use them. Because the address can be computed directly, reaching list[9] takes no longer than reaching list[0].
-->

---
minutes: 2
---

# Check: where in memory is `list[7]`?

<div class="cols wide-left center">
<div>

- The int array starts at address **524**
- Each int takes **4** bytes

</div>
<div>

<Quiz
  :options="['531', '552', '556']"
  :answer="1"
  explain="552. Address = 524 + 4 × 7 = 524 + 28 = 552."
/>

</div>
</div>

<!--
The int array starts at address 524, and each int takes 4 bytes. Where is list[7]?

The answer is 552: the start plus 4 times the index, 524 + 4 × 7 = 524 + 28. 531 adds 7 bytes instead of 7 ints. 556 is the address of list[8], counting the index from 1 instead of 0.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- do-while runs its body **at least once**
- An array is **homogeneous** (one type) and **static** (fixed size)
- `int[] list = new int[100];` then `list[i]`, from **0** to `list.length - 1`
- New number and boolean arrays start at **0, 0.0, '\0', false**
- Address of element i = start + size × **i**: that's why indexes start at 0

<!--
Summary. One: a do-while loop runs its body at least once. Two: an array is homogeneous, holding one type, and static, with a fixed size. Three: an array is created with new and a size, and its elements are list[0] to list[list.length - 1]. Four: new arrays of numbers, chars, and booleans start filled with default values. Five: the address of element i is the start plus the element size times i, which is why the first index is 0.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Architecture and Organization (AR)
- **Competency:** declare, create, index, and initialize arrays, and relate indexes to memory addresses
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

# Next time: more arrays, and sound inside a computer

<div class="cols">
<div class="card blue">

### Next time

- More on arrays
- Representing **sound** inside a computer
- StdAudio

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 6

</div>
</div>

<Credit />

<!--
Next time: more on arrays, representing sound inside a computer, and the StdAudio library. Reminder: keep reading Chapter 6 of the textbook.
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
