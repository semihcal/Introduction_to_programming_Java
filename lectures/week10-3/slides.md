---
theme: ../../theme
title: COMP 1600 – Week 10, Lecture 1 – Game of Life, Types and References
info: |
  We finish Conway's Game of Life, then look at how Java stores data. A
  primitive variable holds its own value, while an object variable is a
  reference that points to an object, so two names can share one object. We
  also create objects with new and see what null means.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 10 </div>

# References: two names can share <span class="hl">one object</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Game of Life wrap-up</span>
  <span>Types in Java</span>
  <span>References</span>
  <span>Creating objects</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <path d="M118 78 C 175 78, 150 138, 208 138" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M118 242 C 175 242, 150 182, 208 182" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="8" y="52" width="110" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="63" y="86" text-anchor="middle" class="cover-art-name">ham1</text>
    <rect x="8" y="216" width="110" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="63" y="250" text-anchor="middle" class="cover-art-name">ham2</text>
    <rect x="212" y="104" width="104" height="112" rx="24" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="264" y="168" text-anchor="middle" class="cover-art-obj">Ham</text>
  </svg>
</div>
</div>

<!--
Welcome. Today finishes the Game of Life program and then starts objects: the two kinds of types in Java, what a reference is, and how new objects are created.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) and Foundations of Programming Languages (FPL); secondary is Algorithmic Foundations (AL) for the Game of Life simulation, with one Society, Ethics, and Professionalism (SEP) touchpoint on null errors.

See also: Week 9 arrays (2D arrays are the Game of Life grid) and the next lecture, calling methods on objects.

Delivery reminders: read on-screen text aloud, describe each diagram in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Trace** one generation of the Game of Life on a 2D array <span class="tag">SDF · AL</span>
- **Compare** primitive types and object types <span class="tag">FPL</span>
- **Predict** what code does when two references share an object <span class="tag">FPL</span>
- **Create** objects with `new` and **justify** checking for `null` <span class="tag">SDF · SEP</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals, AL is Algorithmic Foundations, FPL is Foundations of Programming Languages, SEP is Society, Ethics, and Professionalism.

The third objective, predicting what aliasing code does, is the apply-level skill for today and it is what the exit ticket checks.

Likely question: "Is this on the exam?" Yes, tracing reference diagrams is a standard exam question. Timing: 1 minute.
-->

---

# Predict first: what does this code print?

<div class="cols wide-left center">
<div>

```java
int[] a = {1, 2, 3};
int[] b = a;
b[0] = 99;
System.out.println(a[0]);
```

<p class="small">Decide with a neighbor, then click an answer.</p>

</div>
<div>

<Quiz
  :options="['1', '99', 'Compile error']"
  :answer="1"
  explain="It prints 99. a and b are two names for one array. Today explains why."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give students 60 seconds to discuss with a neighbor before anyone clicks. Low-tech alternative: students hold up one, two, or three fingers for answer A, B, or C.

The code makes an int array a holding 1, 2, 3, then writes "int[] b = a", sets b[0] to 99, and prints a[0]. The answer is 99, because an array is an object and b becomes a second name for the same array.

Do not explain fully yet. Say that most people expect 1, and that by the end of class they will be able to draw why it is 99. Disposition practiced: collaborative. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# Finishing the Game of Life

Last time we met the rules. Today we finish the program.

<!--
Part 1 of 4. Last time we talked about Conway's Game of Life. This part recaps the rules, then walks through main and the three functions: drawGrid, nextStateofGrid, and countLiveNeighbors. Timing: under 1 minute.
-->

---

# Four rules decide whether a cell lives or dies

<div class="cols wide-left center">
<div>

| Cell now | Live neighbors | Next       |
| -------- | -------------- | ---------- |
| Alive    | fewer than 2   | Dies       |
| Alive    | 2 or 3         | Lives      |
| Alive    | more than 3    | Dies       |
| Dead     | exactly 3      | Comes alive |

<p class="small">Each cell is a block in a grid with 8 neighbors.</p>

</div>
<div>

<LifeRuleExplorer />

</div>
</div>

<!--
A cell is a block in a grid, and each cell has 8 neighbors. A live cell with fewer than 2 live neighbors dies from loneliness. A live cell with more than 3 dies from overcrowding. A live cell with exactly 2 or 3 keeps living. A dead cell with exactly 3 live neighbors comes to life.

The interactive on the right is a 3 by 3 grid: the center cell, outlined in orange, and its 8 neighbors. Clicking any cell toggles it; dark means alive. The text under the grid states the live neighbor count and which rule applies. Ask students to call out a neighbor count and predict the result before you click.

Likely question: "What about a dead cell with 2 neighbors?" It stays dead; only exactly 3 brings a cell to life. Timing: 3 minutes.
-->

---

# Every cell follows the same rules at once

<LifeGrid />

<!--
This is a live Game of Life. It starts paused with a random grid where each cell is alive with probability 0.3, the same aliveProb used in our program. Dark cells are alive, light cells are dead.

Press Step to advance one generation and ask students to predict what one small cluster will do. Press Play to run it; it stops by itself if no cells are alive, exactly like the while loop in our main. Clicking a cell toggles it, and Clear lets you draw your own pattern, for example three cells in a row, which flips between horizontal and vertical.

Cells on the edge have fewer than 8 neighbors because the grid does not wrap around. That is the reason for the bounds check later. The animation updates about twice per second and never plays automatically. Timing: 3 minutes.
-->

---

# The grid stores the state; StdDraw only draws it

<div class="cols center">
<div>

```java
boolean[][] grid;
// true  means alive
// false means dead
```

</div>
<div class="card">

- **State:** a 2D array of `boolean` values
- **Draw:** black square for alive, white for dead
- **Update:** replace the grid with the next values

</div>
</div>

<div class="callout">Each iteration: draw the grid, then update the grid.</div>

<!--
We represent the grid of cells with a 2D array of boolean values, where true means alive and false means dead. The grid stores the state of the game.

Storing is not the same as showing. Each iteration we still have to use StdDraw to draw that state onto the screen, black for alive and white for dead. Then we update the grid to contain the new values.

Likely question: "Why boolean and not int?" A cell has exactly two states, so boolean says what we mean. See also: the Week 9 lecture on 2D arrays. Timing: 2 minutes.
-->

---

# main sets up the game, then repeats draw and update

<div class="cols wide-left">
<div>

**Set up**

<v-clicks>

1. `row` and `column`: the grid size
2. `aliveProb`: set to `0.3`
3. `xScale` and `yScale` from the size
4. Fill the grid randomly

</v-clicks>

</div>
<div v-click>

**Loop**

```java
// count alive cells
while (alive > 0) {
  drawGrid(...);
  grid = nextStateofGrid(...);
}
```

</div>
</div>

<!--
In main: set the number of rows to a variable called row and the number of columns to a variable called column. Set the alive probability to 0.3 in a variable called aliveProb. Set xScale and yScale based on the rows and columns. Then set up the initial game grid randomly.

Main continues: count the alive cells, and while there are alive cells, draw the current state by calling drawGrid, then find the next state by calling nextStateofGrid.

The code on the right is a sketch of the loop, not the full program; the three dots stand for the arguments. Each numbered step appears on a click. Likely question: "When does the loop end?" When no cells are alive, or when you close the window. Timing: 3 minutes.
-->

---

# drawGrid paints a filled square for each live cell

```java
public static void drawGrid(
    boolean[][] grid, int row, int column)
```

<v-clicks>

1. Clear the background: `StdDraw.clear(StdDraw.WHITE)`
2. Set the pen color to black
3. For every row, for every column:
   if the cell is alive, draw a filled square

</v-clicks>

<!--
The drawGrid function takes the grid, the number of rows, and the number of columns, and returns nothing.

First set the background color by calling StdDraw's clear method and passing StdDraw.WHITE. Then set the pen color to black for live cells. Then, for every row and for every column, if the cell is alive, draw a filled square.

Write this one together as live coding. Likely question: "Why do we not draw the dead cells?" Clearing to white already drew them. Timing: 4 minutes.
-->

---

# nextStateofGrid builds a new grid from the old one

```java
public static boolean[][] nextStateofGrid(
    boolean[][] oldGrid, int row, int column)
```

<v-clicks>

1. Create a new grid for the next state
2. For every row, for every column:
   count live neighbors with `countLiveNeighbors`
3. Apply the four rules to that cell
4. Return the new grid

</v-clicks>

<!--
The nextStateofGrid function takes the old grid and its size and returns a new 2D boolean array.

Create a new grid to save the next state. For every row and every column, count the live neighbors of the current cell by calling countLiveNeighbors and store the result in a variable. Check the rules and take the appropriate action for that cell. Finally, return the new grid.

Likely question: "Why a new grid instead of changing the old one?" Every cell must be judged using the old generation. If we changed cells in place, later cells would count neighbors that had already been updated. Disposition practiced: meticulous. Timing: 4 minutes.
-->

---

# countLiveNeighbors checks offsets from −1 to 1

<div class="cols wide-left">
<div>

```java
public static int countLiveNeighbors(
    boolean[][] grid,
    int currentRow, int currentCol)
```

1. Counter starts at zero
2. Loop `i` and `j` over −1, 0, 1
3. Skip the cell itself
4. Count only if inside the grid

</div>
<div>

<NeighborOffsets />

</div>
</div>

<!--
The countLiveNeighbors function takes the grid, the current row, and the current column, and returns an int.

Create a counter variable initialized to zero. For rows we need the numbers minus 1, 0, and 1 to find neighbor locations; call that i. For columns we need the same three numbers; call that j. Skip the case where both are zero, because that is the cell itself. The neighbor row is currentRow plus i and the neighbor column is currentCol plus j.

The interactive shows a 4 by 5 grid surrounded by a dashed ring of positions outside the grid. Click a cell to make it the current cell, labeled "me". Its 8 offsets are labeled with i and j. Offsets that land outside the grid are crossed out in orange and reported as skipped. Click a corner: only 3 neighbors are real. Timing: 4 minutes.
-->

---

# A bounds check keeps the neighbor count from crashing

```java
if (neighborRow >= 0 && neighborRow < ROWS
    && neighborCol >= 0 && neighborCol < COLS) {
  if (grid[neighborRow][neighborCol]) {
    counter++;
  }
}
```

<div class="callout">Without the first <code>if</code>, a corner cell reads outside the array and the program stops.</div>

<!--
This is the heart of countLiveNeighbors. The outer if asks: is the neighbor row at least zero and less than ROWS, and is the neighbor column at least zero and less than COLS? Only then is it safe to look in the array. The inner if asks whether that neighbor is alive, and if so we increase the counter. After both loops, return the counter.

Without the bounds check, a cell in row zero would ask for row minus one and Java would stop the program with an ArrayIndexOutOfBoundsException.

Likely question: "Can we combine the two ifs?" Yes, with one more "and", as long as the bounds check comes first. Disposition practiced: meticulous, testing the edge cases. Timing: 3 minutes.
-->

---
layout: center
class: text-center
---

# Questions about the Game of Life?

<!--
Pause for questions before changing topic. Repeat each student question aloud before answering so everyone, and the captions, can follow. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Types in Java

Every variable has a type. There are two families.

<!--
Part 2 of 4. We have used int, double, boolean, char, String, and arrays all semester. Now we sort them into two families, because the two families behave differently. Timing: under 1 minute.
-->

---

# Java types come in two families

<div class="cols">
<div class="card blue">

### Primitive types

- `int`
- `double`
- `boolean`
- `char`

</div>
<div class="card orange">

### Object types

- `String`
- arrays
- an infinite number of others…

</div>
</div>

<!--
There are two classifications of types in Java. Primitive types include int, double, boolean, and char. Object types include String, arrays, and an infinite number of others, because programmers can define new ones.

On this slide and for the rest of the lecture, primitive things have a blue border and object things have an orange border, and each is always labeled in words as well.

Likely question: "Are there other primitive types?" Yes, eight in total, including long, float, short, and byte, but these four are the ones we use. Timing: 2 minutes.
-->

---

# A primitive is a box that holds its own value

<div class="cols center">
<div>

- A **fixed amount** of storage
- Built for one kind of data
- Changed with **operators**

| Types           | Operators            |
| --------------- | -------------------- |
| `int`, `double` | `+` `-` `*` `/` `%`  |
| `boolean`       | `\|\|` `&&` `^` `!`  |

</div>
<div class="mem" role="img" aria-label="Two labeled boxes. The box named x holds 37. The box named done holds true.">
  <div class="mem-row"><span class="mem-label">x</span><span class="mem-value">37</span></div>
  <div class="mem-row"><span class="mem-label">done</span><span class="mem-value">true</span></div>
</div>
</div>

<!--
Primitive types have a fixed amount of storage. Think of them as a box designed to hold a particular kind of data. The diagram shows two boxes: one named x that holds 37 and one named done that holds true. The value lives inside the variable.

Primitive types have basic operations used to manipulate them. For int and double these are plus, minus, times, divide, and remainder. For boolean they are or, and, exclusive or, and not.

Likely question: "How big is the box?" An int is always 32 bits and a double is always 64 bits, no matter what value is inside. Timing: 2 minutes.
-->

---

# An object variable is an arrow to data stored elsewhere

<div class="cols center">
<div>

- Holds data of **any** complexity
- **No** preset amount of storage
- Used through **methods**, not operators:
  `length()`, `charAt()`

</div>
<div class="mem" role="img" aria-label="A box named name with an arrow pointing to a separate String object that contains the text Ada.">
  <div class="mem-row">
    <span class="mem-name">name</span>
    <span class="mem-arrow"></span>
    <span class="mem-obj">String object<br><code>"Ada"</code></span>
  </div>
</div>
</div>

<!--
Object types hold arbitrarily complex kinds of data of any kind, and they do not have a pre-specified amount of storage. Think of them as arrows pointing to some concrete thing that holds primitive data. The diagram shows a variable called name with an arrow pointing to a separate String object containing the text Ada.

We use methods to interact with objects instead of operators. For example, String objects use length and charAt.

Likely question: "Why can a String be any length if an int is fixed?" Because the variable only stores the arrow, which is always the same size; the object it points to can be as big as it needs. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# References

The arrows have a name, and they change how assignment works.

<!--
Part 3 of 4. This is the central idea of the day and the reason the opening prediction printed 99. Timing: under 1 minute.
-->

---

# A reference points to an object; it does not contain it

<div class="cols center">
<div class="card blue">

### Primitive variable

Holds the **value** itself.

<div class="mem-row" role="img" aria-label="A box named x holding 37."><span class="mem-label">x</span><span class="mem-value">37</span></div>

</div>
<div class="card orange">

### Reference variable

Holds the **location** of an object.

<div class="mem-row" role="img" aria-label="A box named ham1 with an arrow pointing to a Ham object."><span class="mem-name">ham1</span><span class="mem-arrow"></span><span class="mem-obj">Ham</span></div>

</div>
</div>

<p class="small">A <b>reference</b> is a variable that holds an object type.</p>

<!--
Variables that hold object types are called references. References do not work the same way as primitive variables. A primitive variable holds a value. A reference variable merely points to the location of the object.

The left diagram shows x as a box containing 37. The right diagram shows ham1 as a box with an arrow leading to a separate Ham object.

Everyday analogy: a primitive is cash in your hand; a reference is the address of a house. Copying an address does not build a second house. Likely question: "Is a reference the same as a pointer?" It is the same idea; Java just does not let you do arithmetic on it. Timing: 2 minutes.
-->

---

# Try it: how many hams after ham2 = ham1?

<HamDemo />

<!--
Picture a ham, and imagine this ham is actually a Java object. We have a reference of type Ham pointing at it, called ham1. Now we make another Ham reference called ham2 and write "Ham ham2 = ham1".

Think-pair-share before clicking: how many hams are there now? Take a show of hands for one or two, then press the "Ham ham2 = ham1" button. A second arrow appears, pointing at the same object. There is only one ham. When you assign an object reference to another reference, you only change what it points to.

Then press "ham2.bite()". The bite count on the single Ham object goes up, so ham1 sees the bite too. They are the same ham. The line of text under the diagram always states the number of objects, references, and bites, for anyone who cannot see the diagram. Timing: 5 minutes.
-->

---

# Aliases are different names for the same object

<div class="cols center">
<div>

- One object can have **more than one** name
- These names are called **aliases**
- A change through one alias shows through all of them

</div>
<div>

```java
Ham ham2 = ham1;
ham2.bite();
// ham1's ham
// has a bite too
```

</div>
</div>

<div class="callout">Assigning a reference copies the arrow, never the object.</div>

<!--
Since reference variables are only pointers to real objects, an object can have more than one name. These names are called aliases. If the object is changed, it does not matter which reference was used to change it.

So if we tell ham2 to take a bite, it affects the ham pointed at by ham1. Remember, they are the same ham.

Likely question: "How do I get a real second ham?" You have to create one, which is Part 4 today. Timing: 2 minutes.
-->

---

# Primitives copy the value, so x and y stay independent

<CopyDemo />

<!--
This is different for primitive types. When you do an assignment with primitive types, you actually get a copy.

The demo starts with int x equal to 37. Press "int y = x" and a second box appears holding its own 37. Press "plus plus x" and only x changes, to 38. Press "minus minus y" and only y changes, to 36. If we change x it only affects x; if we change y it only affects y.

Ask students to say the values of x and y aloud before each click. Likely question: "So is y an alias of x?" No. Primitives never have aliases, because the value itself is copied. Timing: 3 minutes.
-->

---

# Back to the prediction: a and b share one array

<div class="cols wide-left center">
<div>

```java {1|2|3|4}
int[] a = {1, 2, 3};
int[] b = a;      // copy the arrow
b[0] = 99;        // change the object
System.out.println(a[0]);  // 99
```

<p class="small trace-caption" aria-live="polite">
  <span v-if="$clicks === 0">Line 1: one array, one name.</span>
  <span v-else-if="$clicks === 1">Line 2: <code>b</code> gets a copy of the arrow.</span>
  <span v-else-if="$clicks === 2">Line 3: the shared array changes.</span>
  <span v-else>Line 4: <code>a[0]</code> reads the same array: <b>99</b>.</span>
</p>

</div>
<div>
<svg
  viewBox="0 0 380 250"
  class="trace"
  role="img"
  :aria-label="`Memory diagram. ${$clicks >= 1 ? 'References a and b both point' : 'Reference a points'} to one array object holding ${$clicks >= 2 ? '99, 2, 3' : '1, 2, 3'}.${$clicks >= 3 ? ' The program prints 99.' : ''}`"
>
  <defs>
    <marker id="trace-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" class="trace-head" />
    </marker>
  </defs>

  <text x="277" y="52" class="trace-cap">array object</text>
  <rect x="196" y="62" width="162" height="66" rx="12" class="trace-obj" />
  <g v-for="(v, k) in ($clicks >= 2 ? [99, 2, 3] : [1, 2, 3])" :key="k">
    <rect :x="204 + k * 50" y="70" width="46" height="50" rx="6" class="trace-cell" :class="{ changed: k === 0 && $clicks >= 2 }" />
    <text :x="227 + k * 50" y="103" class="trace-val">{{ v }}</text>
    <text :x="227 + k * 50" y="146" class="trace-idx">[{{ k }}]</text>
  </g>

  <rect x="10" y="30" width="90" height="50" rx="10" class="trace-ref" />
  <text x="55" y="63" class="trace-name">a</text>
  <path d="M100 55 C 150 55, 150 84, 194 84" class="trace-line" marker-end="url(#trace-arrow)" />

  <g v-if="$clicks >= 1">
    <rect x="10" y="130" width="90" height="50" rx="10" class="trace-ref" />
    <text x="55" y="163" class="trace-name">b</text>
    <path d="M100 155 C 150 155, 150 108, 194 108" class="trace-line" marker-end="url(#trace-arrow)" />
  </g>
  <g v-else>
    <rect x="10" y="130" width="90" height="50" rx="10" class="trace-ref empty" />
    <text x="55" y="161" class="trace-hint">no b yet</text>
  </g>

  <g v-if="$clicks >= 3">
    <rect x="196" y="186" width="162" height="50" rx="10" class="trace-out" />
    <text x="277" y="218" class="trace-name">prints 99</text>
  </g>
</svg>
</div>
</div>

<style>
.trace { width: 100%; }
.trace-cap { text-anchor: middle; font-size: 18px; fill: var(--c-muted); }
.trace-obj { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 3; }
.trace-cell { fill: #ffffff; stroke: var(--c-accent-2); stroke-width: 2; }
.trace-cell.changed { fill: var(--c-accent-2); }
.trace-cell.changed + .trace-val { fill: #ffffff; }
.trace-val, .trace-name { text-anchor: middle; font-family: var(--slidev-font-mono, monospace); font-size: 22px; font-weight: 700; fill: var(--c-ink); }
.trace-idx { text-anchor: middle; font-family: var(--slidev-font-mono, monospace); font-size: 18px; fill: var(--c-muted); }
.trace-ref { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.trace-ref.empty { fill: none; stroke: var(--c-line); stroke-dasharray: 6 6; }
.trace-hint { text-anchor: middle; font-size: 18px; fill: var(--c-muted); }
.trace-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
.trace-head { fill: var(--c-accent); }
.trace-out { fill: #ffffff; stroke: var(--c-ink); stroke-width: 3; }
.trace-caption { min-height: 30px; }
</style>

<!--
Return to the opening question and trace it one line per click. The diagram on the right changes with the highlighted line.

Line 1: the array object holds 1, 2, 3 and only the reference a points at it. Click: line 2 copies the arrow, so b appears and points at the same array; there is still one array. Click: line 3 changes index 0 through b, and the single array now holds 99, 2, 3; the changed cell is filled in. Click: line 4 reads index 0 through a, which is the same array, so the program prints 99.

Arrays are object types, so a and b are references. Ask who changed their mind since the start of class. Likely question: "How do I copy an array for real?" Make a new array and copy the elements in a loop. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 4</div>

# Creating new objects

An arrow needs something to point at.

<!--
Part 4 of 4. So far every reference already had an object. Now: where do objects come from, and what does a reference hold before it has one? Timing: under 1 minute.
-->

---

# Declaring a reference makes an arrow, not an object

<div class="cols center">
<div>

```java
Eggplant aubergine;
DumpTruck truck1;
Idea thought;
```

<p class="small">Three declarations. Zero objects.</p>

</div>
<div class="mem" role="img" aria-label="Three reference boxes named aubergine, truck1, and thought. Each arrow leads to a dashed label reading nothing yet. No objects exist.">
  <div class="mem-row"><span class="mem-name">aubergine</span><span class="mem-arrow"></span><span class="mem-null">nothing yet</span></div>
  <div class="mem-row"><span class="mem-name">truck1</span><span class="mem-arrow"></span><span class="mem-null">nothing yet</span></div>
  <div class="mem-row"><span class="mem-name">thought</span><span class="mem-arrow"></span><span class="mem-null">nothing yet</span></div>
</div>
</div>

<!--
A reference is just an arrow. If you declare a lot of references, you have not created any objects, just lots of arrows.

The code declares three references: an Eggplant called aubergine, a DumpTruck called truck1, and an Idea called thought. The diagram shows three boxes whose arrows lead to dashed labels reading "nothing yet". No Eggplant, DumpTruck, or Idea object exists.

Likely question: "Then what is the point of declaring it?" It reserves the name and says what kind of object the arrow is allowed to point at. Timing: 2 minutes.
-->

---

# null means the arrow points at nothing

<div class="cols center">
<div>

- `null` is a Java keyword for **nothingness**
- A reference may point at `null`
- Using `null` like a real object **crashes** the program

</div>
<div>

```java
Ham ham1 = null;
ham1.bite();
// NullPointerException
```

</div>
</div>

<!--
When you first declare a reference variable, it does not point at anything, and you cannot use it unless you point it somewhere. There is a special Java keyword, null, that just means nothingness. You can point a reference at null.

However, if you try to do something with null, thinking it is a real object, you can crash your program. In the example, ham1 is null, so calling bite on it stops the program with a NullPointerException: there is no ham to bite.

Likely question: "Why does Java allow null at all?" It is useful for saying "no object yet", but it has a cost, which is the next slide. Timing: 2 minutes.
-->

---

# Null mistakes are costly, so professionals check first

<div class="card orange">

"I call it my **billion-dollar mistake**."

<p class="small">Tony Hoare, who introduced the null reference in 1965, speaking in 2009.</p>

</div>

<div class="cols" style="margin-top: 18px">
<div>

```java
if (ham1 != null) {
  ham1.bite();
}
```

</div>
<div>

**Discuss:** who is affected when an app crashes on a missing value?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Tony Hoare introduced the null reference in the language ALGOL W in 1965. In a 2009 talk he called it his billion-dollar mistake, because of the errors, vulnerabilities, and system crashes it has caused over the decades.

The professional habit is to check before you use a reference that might be null, as in the code: if ham1 is not null, then call bite.

Discussion prompt, 90 seconds in pairs: who is affected when an app crashes on a missing value? Push beyond "the programmer": a patient whose record will not load, a customer who loses a payment form. Bugs have consequences for other people, which is why careful checking is a professional responsibility. Dispositions practiced: responsible and meticulous. Timing: 3 minutes.
-->

---

# A constructor creates the object an arrow points to

<div class="cols center">
<div>

- A **constructor** is a kind of method that creates an object
- Some let you **specify attributes** of the new object
- The **default constructor** lets you specify nothing

</div>
<div class="mem" role="img" aria-label="A reference box named ham1 with an arrow pointing to a new Ham object.">
  <div class="mem-row"><span class="mem-name">ham1</span><span class="mem-arrow"></span><span class="mem-obj">new Ham object</span></div>
</div>
</div>

<!--
To make those arrows point at a new object, you must call a constructor. A constructor is a kind of method that creates an object. Some constructors allow you to specify certain attributes of the object you are creating. The default constructor does not let you specify anything.

The diagram shows ham1 with an arrow to a newly created Ham object.

Likely question: "Who writes the constructor?" Whoever wrote the class. We will write our own classes and constructors soon; today we only call them. Timing: 2 minutes.
-->

---

# The new keyword calls a constructor

````md magic-move
```java
Ham ham1;
```
```java
Ham ham1 = new Ham();
// default constructor
```
```java
Ham ham1 = new Ham();
// default constructor

Ham ham2 = new Ham(4.2);
// weight constructor: pounds
```
````

<div v-click="2" class="callout">Two calls to <code>new</code>: now there really are two hams.</div>

<!--
To call a constructor, you use the new keyword with the name of the class followed by parentheses.

The code builds up in three steps, one per click. First, "Ham ham1" alone is only an arrow. Second, "Ham ham1 = new Ham()" calls the default constructor and points ham1 at a new ham. Third, we add "Ham ham2 = new Ham(4.2)": perhaps there is a Ham constructor that takes a double, the number of pounds the ham weighs.

Each use of new creates one new object. This answers the earlier question of how to get a real second ham. Likely question: "What if I pass the wrong type?" The code will not compile; the arguments must match a constructor the class provides. Timing: 3 minutes.
-->

---

# Strings are objects that bend two rules

<div class="cols center">
<div>

- Created **without** writing a constructor
- Combined with the `+` **operator**
- A constructor still works

</div>
<div>

```java
String a = "Help";
String b = a + " me!";
String s =
    new String("Help me!");
```

</div>
</div>

<!--
The objects you are most familiar with by now are Strings. They break a few rules. It is possible to create them without explicitly using a constructor, just by writing text in double quotes. And they can be combined using the plus operator, even though objects normally use methods instead of operators.

You can still create a String object using a constructor, as the last statement shows: new String, with "Help me!" in the parentheses.

Likely question: "Which way should I use?" The double-quote form; it is shorter and is what Java programmers write. Timing: 2 minutes.
-->

---

# Check: how many Ham objects exist at the end?

<div class="cols wide-left center">
<div>

```java
Ham a = new Ham();
Ham b = new Ham(4.2);
Ham c = a;
Ham d;
```

<p class="small">Count the objects, not the names.</p>

</div>
<div>

<Quiz
  :options="['2', '3', '4']"
  :answer="0"
  explain="Two. Only new creates an object. c is an alias of a, and d points at nothing."
/>

</div>
</div>

<!--
Check for understanding. The code declares four Ham references: a is a new Ham, b is a new Ham weighing 4.2, c is assigned a, and d is only declared. How many Ham objects exist?

Give 45 seconds, then vote: fingers for A, B, or C. The answer is two. Only the keyword new creates an object, and it appears twice. c is an alias of a, and d does not point at anything.

If many students say three or four, redraw the diagram on the board: four boxes, two objects. Follow-up question to ask aloud: what happens if we now call d.bite()? It will not compile, because d was never given a value. Timing: 3 minutes.
-->

---

# Five things to remember from today

- The Game of Life **grid stores state**; StdDraw only draws it
- **Primitives** hold a value; **references** point to an object
- Assignment copies the **value** or the **arrow**, never the object
- **Aliases** share every change
- `new` creates objects; check for `null` before use

<!--
Summarize. One: in the Game of Life, the 2D boolean array stores the state and StdDraw only draws it. Two: primitive variables hold a value and reference variables point to an object. Three: assignment copies the value for primitives and the arrow for references; it never copies an object. Four: aliases are two names for one object, so a change through one shows through the other. Five: the keyword new calls a constructor to create an object, and a reference that might be null should be checked before it is used.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Foundations of Programming Languages (FPL)
- **Related area:** Algorithmic Foundations (AL)
- **Competency:** predict the result of code where references alias one object
- **Dispositions:** meticulous, collaborative, responsible
- **Society and ethics:** null errors and professional responsibility
- **Accessibility:** labeled diagrams, text alternatives, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: calling methods on objects

<div class="cols">
<div class="card blue">

### Next time

- Calling methods on objects
- Examples with classes and objects

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 9 of the textbook

</div>
</div>

<Credit />

<!--
Next time we cover calling methods on objects and work through examples with classes and objects. Reminder: keep reading Chapter 9 of the textbook.

See also: Week 9 on arrays, which are the first objects we used, and the upcoming lectures on writing our own classes. Timing: 1 minute.
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
