---
theme: ../../theme
title: COMP 1600 – Week 13, Lecture 2 – Searching, Sorting and the Idea of Inheritance
info: |
  How do you find a value in an array? We compare linear search with binary
  search, solve a classic balance puzzle, and trace bubble sort and selection
  sort step by step. We end with a first look at inheritance.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 13</div>

# A sorted list can be searched by <span class="hl">halving</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Searching</span>
  <span>Binary search</span>
  <span>Bubble sort</span>
  <span>Selection sort</span>
  <span>Inheritance</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <rect x="10" y="40" width="300" height="52" rx="12" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="160" y="74" text-anchor="middle" class="cover-art-name">n</text>
    <rect x="10" y="134" width="150" height="52" rx="12" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="85" y="168" text-anchor="middle" class="cover-art-name">n / 2</text>
    <rect x="10" y="228" width="75" height="52" rx="12" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="47" y="262" text-anchor="middle" class="cover-art-name">n/4</text>
  </svg>
</div>
</div>

<!--
Welcome. Today has three themes. First, searching: finding a value in an array, slowly and then quickly. Second, sorting: two classic algorithms, bubble sort and selection sort. Third, a first look at inheritance, which we continue next time.

CS2023 mapping (indicative, introductory coverage): the primary knowledge area is Algorithmic Foundations (AL); secondary are Software Development Fundamentals (SDF) for the array code and Foundations of Programming Languages (FPL) for inheritance, with one Society, Ethics, and Professionalism (SEP) touchpoint on ranking people with a sorted list.

See also: Week 12 Lectures 1 and 2 and Week 13 Lecture 1 (Big Oh notation, examples, and classes), Week 6 (the guessing game, which was binary search in disguise), and Week 10 (objects and references).
-->

---
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Trace** a linear search and a binary search step by step <span class="tag">AL</span>
- **Explain** why binary search takes $O(\log n)$ time <span class="tag">AL</span>
- **Trace** one pass of bubble sort and of selection sort <span class="tag">AL · SDF</span>
- **Describe** how a child class relates to its parent class <span class="tag">FPL</span>

</div>

<!--
There are four objectives. The tags are CS2023 knowledge area codes: AL is Algorithmic Foundations, SDF is Software Development Fundamentals, and FPL is Foundations of Programming Languages.

The tracing objectives are the apply-level skills: on an exam you may be given an array and asked to show it after one pass, or to list which elements a binary search checks.

You do not need to memorize the code: you should be able to write linear search and bubble sort from understanding, not from memory.
-->

---
minutes: 3
---

# Predict first: how many guesses do you need?

<div class="cols wide-left center">
<div>

I pick a number from **1 to 100**.

After each guess I say **too high**, **too low**, or **correct**.

<p class="small">Playing as well as possible, what is the most guesses you could need? Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['7 guesses', '50 guesses', '100 guesses']"
  :answer="0"
  explain="7. Each guess halves what is left: 100, 50, 25, 13, 7, 4, 2, 1."
/>

</div>
</div>

<!--
I pick a number from 1 to 100, and after each guess I say too high, too low, or correct. Playing as well as possible, the most guesses you could need is 7, because each guess can cut what is left in half: 100, 50, 25, 13, 7, 4, 2, 1. Answers like 50 or 100 come from guessing without halving; 100 is what guessing 1, 2, 3, and so on could take in the worst case.

This is the guessing game from Week 6, and it is the idea behind today's fast search.
-->

---
minutes: 2
---

# Last time: moving pixels, and comparing Big Oh classes

<div class="cols center">
<div class="card blue">

### Image examples

- Mirroring
- Rotation
- Resizing

</div>
<div class="card orange">

### Big Oh

- Eight classes, from $O(1)$ to $O(n!)$
- $O(\log n)$ is far better than $O(n)$
- $O(n^2)$ gets impractical as $n$ grows

</div>
</div>

<!--
Last time we covered image examples: mirroring, rotation, and resizing. And Big Oh notation: we lined up eight classes from constant to factorial.

Two facts from that comparison matter today. Logarithmic time is far better than linear time: the problem can become a thousand times larger and take only a little longer. And quadratic time becomes impractical as n grows.

Today we meet one algorithm in each of those classes: a logarithmic search and two quadratic sorts.
-->

---
layout: center
class: text-center
minutes: 4
---

# Project 5: where are you, and what is unclear?

<p class="small">Questions about the project or about last time are welcome now.</p>

<!--
A check-in on Project 5 and questions about last lecture.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Searching

Is this value in the array, and where?

<!--
Part 1 of 6. Searching is one of the most common things programs do. We start with the obvious method.
-->

---
minutes: 2
---

# Finding a number is easy for people, on a short list

<div class="cols center">
<div>

- "Is **37** on this list?"
- A person answers at a glance, if the list is short
- What if the list is an **array**, and a Java program must find the number?

</div>
<div class="card">

`54  7  91  23  70  2  37  99`

<p class="small">Is 37 here? Where?</p>

</div>
</div>

<!--
Let's say that I give you a list of numbers, and I ask you, "Is 37 on this list?" As a human, you have no problem answering this question, as long as the list is reasonably short. The card shows eight numbers: 54, 7, 91, 23, 70, 2, 37, 99. Yes, 37 is there, in the seventh position.

What if the list is an array, and I want you to write a Java program to find some number? The program cannot glance; it has to look at one element at a time.

The program should give back the position where it found the number, or a signal that it is not there.
-->

---
minutes: 3
---

# Linear search checks every element until it finds a match

```java {1|2|3-5|7|all}
public static int find(int[] array, int number) {
    for (int i = 0; i < array.length; i++) {
        if (array[i] == number) {
            return i;
        }
    }
    return -1;
}
```

<div class="callout">Found: return the <b>index</b>. Not found: return <b>-1</b>.</div>

<!--
Easy! We look through every element in the array until we find it or run out. If we find it, we return the index; otherwise we return minus 1.

Line 1: the method find takes an int array and the number to look for, and returns an int. Line 2 loops over every index. Lines 3 to 5: if the element at i equals the number, return i immediately. Line 7 is reached only if the loop finished without finding it, so we return minus 1.

Minus 1 is used because it can never be a real index, so the caller can tell "not found" apart from every possible position.
-->

---
minutes: 3
---

# Try it: linear search may have to look at everything

<SearchDemo mode="linear" />

<!--
This interactive runs linear search on an unsorted array of 15 numbers. Buttons choose the number to search for, 37, 2, 99, or 50, and a Step button checks one element at a time. The element being checked has a thick orange border, elements already ruled out are faded with a dashed border, and a found element is filled in. The text underneath says what happened and counts the comparisons.

A search for 37 finds it at index 6, so it takes 7 comparisons. A search for 50, which is not in the array, checks all 15 elements, and the result is minus 1.

The number of comparisons depends entirely on where the number happens to be.
-->

---
minutes: 3
---

# Linear search is O(n), and average luck does not help

<div class="cols center">
<div>

- **Worst case:** look at every element: $O(n)$
- **On average:** about half: $\tfrac{1}{2}n$, which is still $O(n)$
- Only two classes are smaller: $O(1)$ and $O(\log n)$

</div>
<div class="card orange">

### Can we do better?

Not without knowing something more about the list.

</div>
</div>

<!--
How long does it take? We know about Big Oh notation, so we have a way to measure this algorithm. If n is the length of the array, linear search takes O of n time, because in the worst case we have to look through every element.

Can we do better? Is there any way to go smaller than O of n? The only complexity classes smaller than O of n are O of 1 and O of log n. On average we only need to check half the numbers, but that is one half n, which is still O of n. Darn.

The card gives the way forward: we cannot do better unless we know something more about the list.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Binary search

More information makes a faster search.

<!--
Part 2 of 6. The extra information we need is that the list is sorted.
-->

---
minutes: 3
---

# If the list is sorted, we can play High-Low

<div class="cols center">
<div>

1. Check the **middle** element
2. Too high? Keep the **left** half
3. Too low? Keep the **right** half
4. Repeat until found, or nothing is left

</div>
<div class="card">

### Looking for 37

- Middle is 54: too high
- Middle is 23: too low
- Middle is 31: too low
- Middle is 37: found it!

</div>
</div>

<!--
We can do better with more information. For example, if the list is sorted, then we can use that information. How? We can play a High-Low game, exactly like the opening question.

Binary search repeatedly divides the search space in half. Check the middle element. If it is too high, the number we want can only be in the left half. If it is too low, it can only be in the right half. Repeat until we find it or nothing is left.

The card traces a search for 37: check the middle, 54, too high. Check the middle of what is left, 23, too low. Check the middle again, 31, too low. Check the middle again, 37, found it.
-->

---
minutes: 4
---

# Try it: binary search throws away half the list each step

<SearchDemo mode="binary" />

<!--
This interactive runs binary search on a sorted array of 15 numbers. As before, buttons choose the number to search for and Step moves one step at a time. Each step checks the middle of what is left, outlined in orange. The half that is ruled out becomes faded with a dashed border.

In a search for 37, step 1 checks index 7, which holds 54: too high, so everything from index 7 up is ruled out. Step 2 checks index 3, 23: too low. Step 3 checks index 5, 31: too low. Step 4 checks index 6: 37, found, in 4 comparisons. Linear search needed 7 for the same number.

In a search for 50, which is not there, nothing is left after 4 comparisons, so it is not in the list. Linear search needed 15. The first index checked is always index 7.
-->

---
minutes: 3
---

# Halving n until 1 remains takes log₂ n steps

<div class="cols center">
<div>

- Each look cuts the search space in half
- At worst, we halve $n$ until 1 element is left
- Let $x$ be the number of looks

</div>
<div class="card">

$\left(\tfrac{1}{2}\right)^x n = 1$

$n = 2^x$

$x = \log_2 n$

</div>
</div>

<div class="callout">

The running time of binary search is $O(\log n)$.

</div>

<!--
So, is that faster than linear search? How long can it take? What if you never find what you are looking for? Then you have narrowed it down to a single spot in the array that does not have what you want. What is the maximum amount of time that could have taken?

We cut the search space in half every time. At worst, we keep cutting n in half until we get 1. Let x be the number of times we look. The card shows the algebra: one half to the power x, times n, equals 1. So n equals 2 to the x, and x equals log base 2 of n.

The running time is O of log n. For our 15 elements, log base 2 of 15 is just under 4, which matches the 4 comparisons we counted.
-->

---
minutes: 2
---

# Check: a sorted array has 1,000,000 elements

<div class="cols wide-left center">
<div>

Binary search looks for a value that is **not** in the array.

<p class="small">About how many elements does it check before giving up?</p>

</div>
<div>

<Quiz
  :options="['About 20', 'About 1,000', 'About 500,000']"
  :answer="0"
  explain="About 20. 2 to the power 20 is just over a million, so 20 halvings reach one element."
/>

</div>
</div>

<!--
A sorted array has one million elements, and binary search looks for a value that is not there. It checks about 20 elements before giving up, because 2 to the power 20 is 1,048,576, just over a million.

Compare: linear search would check all one million. 500,000 is the average for linear search; 1,000 is the square root, a common wrong guess. This is what "logarithmic is far better than linear" means in practice.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# A search puzzle

A classic interview question.

<!--
Part 3 of 6. A puzzle that uses the same idea as binary search, with a twist.
-->

---
minutes: 3
---

# Nine balls, one slightly heavier: find it with a balance

<div class="cols center">
<div>

- You have **9 red balls**
- One is slightly heavier, too slightly to feel
- You have an accurate **two-pan balance**

</div>
<div class="card orange">

### The question

Find the heavy ball in the **smallest number of weighings**.

</div>
</div>

<p class="small">A classic interview question at large technology companies.</p>

<!--
This is a classic interview question asked by large technology companies. Imagine that you have 9 red balls. One of them is just slightly heavier than the others, but so slightly that you cannot feel it. You have a very accurate two-pan balance you can use to compare balls. Find the heaviest ball in the smallest number of weighings.

What is the smallest possible number? It has got to be 8 or fewer, because we could easily test one ball against every other ball. There must be some cleverer way to divide them up, something related somehow to binary search.
-->

---
minutes: 5
---

# Try it: how few weighings can you manage?

<BallsDemo />

<!--
This interactive is the puzzle. Nine numbered balls start on the table, in the middle. Clicking a ball picks it up (it gets an orange outline), and clicking a place then puts it there: the left pan, the table, or the right pan, each marked "put here". Any ball can go straight to any place. Clicking a picked-up ball again puts it down where it was.

The Weigh button works when both pans hold the same number of balls. The heavier pan drops and is labeled "heavier", the other "lighter", or both say "balanced". Each weighing is added to the list underneath, for example "Weighing 1: 1, 2, 3 against 4, 5, 6: right pan heavier", and the counter shows how many weighings you have used. Moving any ball clears the tilt, ready for the next weighing. Reveal answer shows which ball is heavy, and New puzzle picks a different one.

A natural first strategy is halving: 4 against 4, leaving one out. If those balance, it is the one left out; otherwise take the heavier 4 and weigh 2 against 2, then 1 against 1. That is up to 3 weighings.

The real question is whether it can be done in 2 weighings, every time. The next slide answers it.
-->

---
minutes: 3
---

# Dividing into three parts beats dividing into two

<div class="cols center">
<div class="card blue">

### Halves: up to 3 weighings

Weigh 4 against 4, then 2 against 2, then 1 against 1.

</div>
<div class="card orange">

### Thirds: always 2 weighings

Weigh **3 against 3**. If they balance, the heavy ball is in the 3 left out.

Then weigh **1 against 1** from those 3.

</div>
</div>

<div class="callout">A balance has three outcomes: left, right, or balanced. Each one points to a different third.</div>

<!--
One approach: we can divide the balls in half each time, and if they all balance, it must be the one we left out to begin with. That takes up to 3 weighings.

Nope, we can do better. The key is that you can actually cut the number of balls into three parts each time. We weigh 3 against 3. If they balance, then we know the 3 left out have the heavy ball; otherwise it is in the heavier pan. When it is down to 3, weigh 1 against 1, again knowing that it is the one left out that is heavy if they balance.

The callout explains why this works: a balance has three possible outcomes, so one weighing can tell three groups apart. With this method the puzzle on the previous slide is solved in 2 weighings every time.
-->

---
minutes: 2
---

# Trisecting the search space takes log₃ n weighings

<div class="cols center">
<div>

- Each weighing cuts the candidates to **one third**
- So $n$ balls need $\log_3 n$ weighings
- Thinking outside the box, or the ball

</div>
<div>

| Balls | Weighings |
| --- | --- |
| 9 | 2 |
| 27 | 3 |
| 81 | 4 |

</div>
</div>

<!--
The cool thing, and yes, this is cool in the computer science sense, is that we are trisecting the search space each time. This means that it takes log base 3 of n weighings to find the heaviest ball.

The table shows it: 9 balls take 2 weighings, 27 balls take 3 weighings, and 81 balls take 4 weighings. Each extra weighing triples the number of balls we can handle.

It is the same idea as binary search, where each comparison halves the candidates, but here each measurement gives three answers instead of two. Log base 3 is not a different Big Oh from log base 2: they differ only by a constant factor, so both are O of log n.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# Sorting

Binary search needs a sorted array. How do we get one?

<!--
Part 4 of 6. Sorting is the other half of the story: binary search is only possible if someone sorted the data first.
-->

---
minutes: 2
---

# Sorting is everywhere, and binary search depends on it

<div class="cols center">
<div>

- Sorting a column in a spreadsheet
- Organizing a playlist by artist name
- Ranking a graduating class
- Finding the median score on an exam

</div>
<div class="card orange">

### And one more

We must be able to **sort** in order to make **binary search** work.

</div>
</div>

<!--
The importance of sorting should be evident to you by now. Applications include sorting a column in a spreadsheet such as Excel, organizing your music playlists by artist name, ranking a high school graduating class, finding a median score to report on an exam, and countless others.

And of course, we need to be able to sort in order to make binary search work.

Keep the ranking example in mind; we return to it at the end of this part.
-->

---
minutes: 3
---

# Sorting is tricky because a computer compares two items at a time

<div class="cols center">
<div class="card blue">

### It gets hard at scale

100 names on index cards: no problem.

1,000,000 names: you need a system.

</div>
<div class="card orange">

### Computers are literal

A computer cannot "jump to the M section" unless you build one.

It compares **two values**, then takes one more step.

</div>
</div>

<!--
But is sorting interesting? Yes, because it is tricky. You might say: no, it is not; give me 100 names written on 100 index cards and I can sort them, no problem. One way to remind yourself that it is tricky is by increasing the problem size. What if I gave you 1,000,000 names written on 1,000,000 index cards? You might need some organizational system.

And there is that mantra of this class: computers are stupid. A computer cannot jump to the M section, unless you explicitly create an M section. For most common sorts, the computer has to compare two numbers, or Strings, or whatever, at a time. Based on that comparison, it takes another step in the algorithm. And remember, we have to swap things around in an array.
-->

---
minutes: 2
---

# Bubble sort swaps out-of-order neighbors until none are left

<div class="cols center">
<div>

- A classic sorting algorithm
- Very simple to **understand**
- Very simple to **code**
- Not very **fast**

</div>
<div class="card">

### The idea

Go through the array, swapping neighbors that are out of order, until nothing is out of order.

</div>
</div>

<!--
Bubble sort is a classic sorting algorithm. It is very simple to understand. It is very simple to code. It is not very fast.

The idea is simply to go through your array, swapping out-of-order elements until nothing is out of order.

We saw this code briefly in Week 12 as a Big Oh example. Today we look at how it actually works. It is called bubble sort because the largest values drift to the end of the array one pass at a time, like bubbles rising.
-->

---
minutes: 3
---

# One pass compares each pair of neighbors once

```java {1|2|3-5|all}
for (int j = 0; j < array.length - 1; ++j) {
    if (array[j] > array[j + 1]) {
        int temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
    }
}
```

<div class="callout">The loop stops at <code>length - 1</code> because it looks at <code>j + 1</code>.</div>

<!--
One pass of the bubble sort algorithm goes through the array once, swapping out-of-order elements.

Line 1 loops j from 0 up to, but not including, the length minus 1. Line 2 compares the element at j with its right-hand neighbor at j plus 1. Lines 3 to 5 swap them if they are out of order, using a temporary variable so that neither value is lost.

The callout explains the loop bound: the body looks at j plus 1, so j must stop one short of the last index, or we would read past the end of the array. The variable temp is needed because, without it, the first assignment overwrites one of the two values.
-->

---
minutes: 4
---

# Try it: watch one pass carry the largest value to the end

<SortDemo mode="bubble" />

<!--
This interactive runs bubble sort on the array 7, 45, 0, 54, 37, 108, 51. The Step button makes one comparison at a time, and Play runs it. The two elements being compared have a thick orange border. The text underneath says whether they were swapped, and the counters show the pass number, the comparisons, and the swaps. Elements that have reached their final place are shaded and labeled "done".

The first pass goes like this: 7 and 45, no swap. 45 and 0, swap. 45 and 54, no swap. 54 and 37, swap. 54 and 108, no swap. 108 and 51, swap. After one pass the largest value, 108, is at the end.

Running to the end shows that this array is sorted after two passes, and the third pass makes no swaps, so the demo stops there: that is the flag idea mentioned on a later slide.
-->

---
minutes: 3
---

# A reverse-sorted array needs n − 1 passes

<SortDemo mode="bubble" :values="[7, 6, 5, 4, 3, 2, 1]" />

<!--
How many passes do we need? How bad could it be? What if the array was in reverse-sorted order?

This is the same interactive, starting from 7, 6, 5, 4, 3, 2, 1. In the first pass every comparison is a swap, and the 7 moves one place at a time to the end. One pass only moves the largest number to its place.

The pass counter shows that each pass settles exactly one more element, so we need n minus 1 passes to sort the whole array: 6 passes for 7 elements. After pass 2 the array is 5, 4, 3, 2, 1, 6, 7.
-->

---
minutes: 3
---

# Full bubble sort repeats the pass n − 1 times

```java {1|2-8|all}
for (int i = 0; i < array.length - 1; ++i) {
    for (int j = 0; j < array.length - 1; ++j) {
        if (array[j] > array[j + 1]) {
            int temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
    }
}
```

<p class="small">Alternative: keep a flag, and stop as soon as a pass makes no swaps.</p>

<!--
The full Java method for bubble sort requires us to have at least n minus 1 passes. Line 1 is the new outer loop, which repeats n minus 1 times. Lines 2 to 8 are the single pass from before, unchanged.

Alternatively, we could keep a flag to indicate that no swaps were needed on a given pass. If a whole pass makes no swaps, the array is already sorted and we can stop early. The interactive on the earlier slide did exactly that.

The flag does not change the worst-case Big Oh: a reverse-sorted array still needs every pass.
-->

---
minutes: 2
---

# Changing one symbol sorts in descending order

```java {3}
for (int i = 0; i < array.length - 1; ++i) {
    for (int j = 0; j < array.length - 1; ++j) {
        if (array[j] < array[j + 1]) {
            int temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
    }
}
```

<div class="callout">Only the comparison changed: <code>&gt;</code> became <code>&lt;</code>.</div>

<!--
The bubble sort we saw sorts integers in ascending order. What if you wanted to sort them in descending order? Only a single change is needed to the inner loop.

Line 3, highlighted, is the only difference: the comparison is now less than instead of greater than. So we swap whenever the left neighbor is smaller, which pushes the smallest values to the end.

The lesson is general: the comparison decides the order, and everything else about the algorithm stays the same.
-->

---
minutes: 2
---

# Bubble sort takes O(n²) time

<div class="cols center">
<div>

- The outer loop runs $n - 1$ times
- The inner loop runs $n - 1$ times
- The work inside is constant: call it $c$

</div>
<div class="card">

$(n-1)(n-1)c$

$= cn^2 - 2cn + c$

which is $O(n^2)$

</div>
</div>

<div class="callout">Not great. Let's try another sort.</div>

<!--
What is the running time of bubble sort? The outer loop runs n minus 1 times. The inner loop runs n minus 1 times. The inner loop has a constant amount of work inside of it; call it c.

The card multiplies it out: n minus 1, times n minus 1, times c, equals c n squared minus 2 c n plus c. Dropping the constants and the lower-order terms, that is O of n squared.

Hmm, not great. Last time we saw that quadratic algorithms become impractical as n grows. Let's try another sort.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 5</div>

# Selection sort

Find the smallest, put it first, repeat.

<!--
Part 5 of 6. A second sorting algorithm with a different strategy.
-->

---
minutes: 2
---

# Selection sort finds the smallest value and puts it first

1. Search through **all** the numbers to find the smallest, and put it first
2. Move to the **next position**, and find the smallest of those that are left
3. Keep going, always finding the smallest of those that are left

<div class="callout">Each pass needs two variables: <code>min</code>, the smallest value so far, and <code>minIndex</code>, where it is.</div>

<!--
Selection sort: instead of bubbling down the largest or smallest number, search through all the numbers to find the smallest, and put it first. Then move on to the next position in the array, and find the smallest number out of those that are left. Keep going, always finding the smallest number out of those that are left.

The callout names the two things each pass keeps track of: min, the smallest value seen so far, and minIndex, the position where it was found. At the end of the pass we swap the value at minIndex with the position we are filling.

Notice that finding the smallest is the same loop as finding the largest element, from Week 12.
-->

---
minutes: 4
---

# Try it: each pass makes at most one swap

<SortDemo mode="selection" />

<!--
This interactive runs selection sort on the same array: 7, 45, 0, 54, 37, 108, 51. Step and Play work as before. The element being examined has a thick orange border, and the smallest value found so far in this pass is labeled "min" with a dashed border.

In the first pass, 7 at index 0 starts as the smallest so far. 45 is not smaller. 0 is smaller, so minIndex becomes 2. Then 54, 37, 108, and 51 are not smaller than 0. At the end of the pass, the lowest value, 0, is swapped with index 0, the position we were filling. The first element is now done.

When it finishes, the counters show that, compared with bubble sort, selection sort makes about the same number of comparisons, but far fewer swaps, at most one per pass. Its running time is still O of n squared.
-->

---
minutes: 3
---

# A sorted list is a ranking, and rankings affect people

<div class="cols center">
<div>

- Sorting needs **one number** per item
- Ranking a class by grade average ignores everything else about a student
- Small differences become fixed positions

</div>
<div class="card orange">

### Discuss in pairs

What does a ranking of students by grade average leave out? Who decides the number?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. One of our applications was ranking a high school graduating class. Sorting needs one number per item to compare. When the items are people, choosing that number is a decision with consequences.

Ranking a class by grade average ignores everything else about a student: the difficulty of their courses, improvement over time, circumstances outside school. And sorting turns small differences into fixed positions: two students a hundredth of a point apart become "third" and "fourth".

The slide asks a question to discuss: what does a ranking of students by grade average leave out, and who decides the number? The algorithm is neutral; the choice of what to sort by is not.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 6</div>

# The concept of inheritance

Building a new class from an existing one.

<!--
Part 6 of 6. A change of topic for the last few minutes: a first look at inheritance, which we continue next time.
-->

---
minutes: 2
---

# A child class has everything its parent has, plus more

<div class="cols center">
<div>

- Take one class and create a **child class** from it
- The child has all the parent's **members** and **methods**
- You can **add** more to the child
- The child is a specialized version of the parent

</div>
<div>
<svg viewBox="0 0 300 250" class="inh" role="img" aria-label="Two boxes joined by an arrow. The top box is the parent class, Vehicle. The bottom box is the child class, Car. The arrow points from Car up to Vehicle and is labeled: is a kind of.">
  <defs>
    <marker id="inh-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <rect x="60" y="10" width="180" height="70" rx="12" class="inh-parent" />
  <text x="150" y="42" class="inh-name">Vehicle</text>
  <text x="150" y="66" class="inh-cap">parent class</text>
  <path d="M150 170 L 150 88" class="inh-line" marker-end="url(#inh-arrow)" />
  <text x="214" y="134" class="inh-cap">is a kind of</text>
  <rect x="60" y="172" width="180" height="70" rx="12" class="inh-child" />
  <text x="150" y="204" class="inh-name">Car</text>
  <text x="150" y="228" class="inh-cap">child class</text>
</svg>
</div>
</div>

<style>
.inh { width: 100%; max-height: 300px; }
.inh-parent { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.inh-child { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 3; }
.inh-name { text-anchor: middle; font-family: var(--slidev-font-mono, monospace); font-size: 24px; font-weight: 700; fill: var(--c-ink); }
.inh-cap { text-anchor: middle; font-size: 18px; fill: var(--c-muted); }
.inh-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
</style>

<!--
The idea of inheritance is to take one class and generate a child class. This child class has everything that the parent class has, both members and methods. But you can also add more functionality to the child. The child can be considered to be a specialized version of the parent.

The diagram shows two boxes. The top box is the parent class, Vehicle. The bottom box is the child class, Car. An arrow points from Car up to Vehicle, labeled "is a kind of": a Car is a kind of Vehicle.

In Java a class cannot have more than one parent; each class has exactly one parent class.
-->

---
minutes: 2
---

# Inheritance lets old code work on new classes safely

<div class="cols center">
<div>

- The key idea is **safe code reuse**
- Code written to sort lists of `Vehicle` objects also works on lists of `Car` objects
- All you need: `Car` is a **subclass** of `Vehicle`

</div>
<div class="card">

### Two names for each role

- Parent class = **superclass**
- Child class = **subclass**

</div>
</div>

<!--
The key idea behind inheritance is safe code reuse. You can use old code that was designed to, say, sort lists of Vehicles, and apply that code to lists of Cars. All that you have to do is make sure that Car is a subclass, or child class, of Vehicle.

The card lists the vocabulary: the parent class is also called the superclass, and the child class is also called the subclass. Java uses the words superclass and subclass, so you will see both pairs.

This connects today's two halves: a sort written once can be reused for many kinds of objects.
-->

---
minutes: 2
---

# Predict: which line will not compile?

<div class="cols wide-left center">
<div>

```java
Vehicle v = new Car("Lancer");     // A
Vehicle[] vehicles = new Vehicle[100];
vehicles[0] = new RocketShip();    // B
Car c = new Vehicle();             // C
```

<p class="small"><code>Car</code> and <code>RocketShip</code> are subclasses of <code>Vehicle</code>.</p>

</div>
<div>

<Quiz
  :options="['Line A', 'Line B', 'Line C']"
  :answer="2"
  explain="Line C. A Car reference needs a Car. A plain Vehicle is not necessarily a Car."
/>

</div>
</div>

<!--
Car and RocketShip are both subclasses of Vehicle. Line A stores a new Car in a Vehicle reference. Line B stores a new RocketShip in an element of a Vehicle array. Line C stores a new Vehicle in a Car reference. Line C is the one that will not compile: a Car reference needs a Car, and a plain Vehicle is not necessarily a Car. Lines A and B are fine, because a subclass object can be stored where its superclass is expected.

The next slide gives the rule.
-->

---
minutes: 3
---

# A Car fits anywhere a Vehicle is expected, but not the reverse

<div class="cols center">
<div class="card blue">

### Allowed

A `Vehicle` reference can hold a `Car`, even inside an array.

A subclass is a more specific version of its superclass.

</div>
<div class="card orange">

### Not allowed

A `Car` reference cannot hold a plain `Vehicle`.

Not every Vehicle is a Car.

</div>
</div>

<div class="callout">Java respects the subclass relationship: use a <code>Car</code> anywhere you can use a <code>Vehicle</code>.</div>

<!--
Java respects the subclass relationship. If you have a Vehicle reference, you can store a Car object in that reference. A subclass, in this case a Car, is a more specific version of the superclass, Vehicle. For this reason, you can use a Car anywhere you can use a Vehicle. You cannot use a Vehicle anywhere you would use a Car.

So in the previous code: as long as Car is a subclass of Vehicle, we can store a Car in a Vehicle reference. Even in an array is fine, which is why the RocketShip line works. Storing a Vehicle into a Car does not work, and gives a compile error.

Everyday version: every car is a vehicle, but not every vehicle is a car. A Vehicle reference to a Car is useful so that one array, or one method, can handle every kind of vehicle.
-->

---
minutes: 2
---

# Five things to remember from today

- Linear search checks every element: $O(n)$
- Binary search halves a **sorted** list: $O(\log n)$
- Bubble sort swaps out-of-order neighbors: $O(n^2)$
- Selection sort finds the smallest and puts it first
- A subclass can be used wherever its superclass is expected

<!--
Five things to remember. One: linear search checks every element, so it is O of n. Two: binary search halves a sorted list at each step, so it is O of log n, but only works on sorted data. Three: bubble sort repeatedly swaps out-of-order neighbors, and takes O of n squared time. Four: selection sort finds the smallest remaining value and puts it in the next position. Five: a subclass object can be used wherever its superclass is expected, but not the reverse.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Algorithmic Foundations (AL)
- **Related areas:** Software Development Fundamentals (SDF), Foundations of Programming Languages (FPL)
- **Competency:** trace a search or a sort on a given array and state its running time
- **Dispositions:** collaborative, inventive, responsible
- **Society and ethics:** ranking people with a sorted list
- **Accessibility:** borders and labels as well as color in demos, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
This slide records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.
-->

---
minutes: 1
---

# Next time: more on inheritance

<div class="cols">
<div class="card blue">

### Next time

- More on inheritance

</div>
<div class="card orange">

### Reminders

- Keep working on Project 5

</div>
</div>

<Credit />

<!--
Next time we continue with inheritance: how to actually write a subclass in Java. Reminder: keep working on Project 5.

See also: Week 10 on references, which is what makes "a Vehicle reference holding a Car" possible.
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
The exit ticket: scanning the QR code opens today's exit ticket form, and the link is available for anyone who cannot scan the code.
-->
