---
theme: ../../theme
title: COMP 1600 – Week 12, Lecture 3 – Working with the Picture Class
info: |
  A hands-on lecture on the Picture class. We plan two programs together,
  filling a picture with blue and darkening a photo by 50%, using nested loops
  that visit every pixel, then spend class time writing them.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 12</div>

# Two nested loops can repaint <span class="hl">every pixel</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Picture class review</span>
  <span>Fill with blue</span>
  <span>Darken by 50%</span>
  <span>Work time</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <path d="M100 96 C 132 96, 118 132, 150 134" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M100 224 C 132 224, 118 188, 150 186" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="4" y="70" width="96" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="52" y="104" text-anchor="middle" class="cover-art-name">x</text>
    <rect x="4" y="198" width="96" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="52" y="232" text-anchor="middle" class="cover-art-name">y</text>
    <rect x="154" y="82" width="160" height="160" rx="14" fill="#0f172a" />
    <g stroke="none">
      <rect x="160" y="88" width="46" height="46" fill="#1d4ed8" />
      <rect x="160" y="139" width="46" height="46" fill="#1d4ed8" />
      <rect x="160" y="190" width="46" height="46" fill="#1d4ed8" />
      <rect x="211" y="88" width="46" height="46" fill="#1d4ed8" />
      <rect x="211" y="139" width="46" height="46" fill="#fff7ed" stroke="#c2410c" stroke-width="4" />
      <rect x="211" y="190" width="46" height="46" fill="#ffffff" />
      <rect x="262" y="88" width="46" height="46" fill="#ffffff" />
      <rect x="262" y="139" width="46" height="46" fill="#ffffff" />
      <rect x="262" y="190" width="46" height="46" fill="#ffffff" />
    </g>
    <text x="234" y="272" text-anchor="middle" class="cover-art-name">picture</text>
  </svg>
</div>
</div>

<!--
Welcome. Today is a hands-on day. We review the Picture class, plan two programs together, filling a picture with blue and darkening a picture by 50 percent, and then you get work time to write them.

CS2023 mapping (indicative, introductory coverage): the primary knowledge area is Software Development Fundamentals (SDF); secondary are Algorithmic Foundations (AL) for nested loops and Graphics and Interactive Techniques (GIT) for images, with one Society, Ethics, and Professionalism (SEP) touchpoint on changing someone's image file.

See also: Week 12 Lecture 2 (color, image formats, and the first look at Picture), Week 10 (objects, constructors, and methods), and Week 9 (2D arrays and nested loops).
-->

---
minutes: 1
---

# By the end of today, you can do three things

<div class="card">

- **Choose** the right `Picture` method for a task <span class="tag">SDF</span>
- **Write** nested loops that visit every pixel of a picture <span class="tag">SDF · AL</span>
- **Change** a pixel's color with `get`, the `Color` getters, and `set` <span class="tag">SDF · GIT</span>

</div>

<!--
By the end of today you can choose the right Picture method for a task, write nested loops that visit every pixel of a picture, and change a pixel's color with get, the Color getters, and set. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals, AL is Algorithmic Foundations, and GIT is Graphics and Interactive Techniques.

The second and third objectives are apply-level: by the end of work time you will have written both example programs and seen them run.
-->

---
minutes: 3
---

# Predict first: where is the bottom-right pixel?

<div class="cols wide-left center">
<div>

```java
Picture picture = new Picture(4, 3);
// 4 pixels wide, 3 pixels high
```

<p class="small">Which (x, y) is the bottom-right corner? Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['(4, 3)', '(3, 2)', '(2, 3)']"
  :answer="1"
  explain="(3, 2). Counting starts at 0, so x runs 0 to 3 and y runs 0 to 2."
/>

</div>
</div>

<!--
The code creates a blank Picture that is 4 pixels wide and 3 pixels high. Which coordinates are the bottom-right corner? The answer is x 3, y 2, because counting starts at zero: x runs from 0 to 3 and y runs from 0 to 2.

Answer A, 4 comma 3, is the most common mistake and it is exactly the bug that crashes picture programs: there is no column 4. This matters when we write the loop conditions.
-->

---
minutes: 2
---

# Last time: a Color is three numbers, and a Picture is a grid of Colors

<div class="cols center">
<div class="card blue">

### `Color`

- Red, green, blue: each 0 to 255
- `new Color(255, 165, 0)`
- `getRed()`, `getGreen()`, `getBlue()`

</div>
<div class="card orange">

### `Picture`

- A grid of pixels
- Each pixel has an (x, y) address
- Each pixel holds one `Color`

</div>
</div>

<!--
Last time we met the Color and Picture classes.

A Color object stores three numbers, red, green, and blue, each from 0 to 255. We create one with new, for example new Color 255, 165, 0 for orange, and read the values back with getRed, getGreen, and getBlue.

A Picture is a grid of pixels. Each pixel has an x, y address, and each pixel holds one Color. Today we combine the two classes. The pixel at x 0, y 0 is the top-left corner; x grows to the right and y grows downward.
-->

---
layout: center
class: text-center
minutes: 2
---

# Questions before we start coding?

<!--
A chance to ask questions about color, image formats, or the Picture class before we start coding.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# The Picture class

A quick review of the tool we use today.

<!--
Part 1 of 3: a short review of what the Picture class is for and which methods it gives us.
-->

---
minutes: 2
---

# Picture lets us use images without knowing the file format

<div class="cols center">
<div>

- JPEG and PNG files are complex: they use **compression**
- The textbook authors wrote `Picture` to hide that
- It is an easy interface for routine tasks

</div>
<div class="card">

### Routine tasks

- Load or save an image
- Get its height and width
- Change its pixels
- Show it on screen

</div>
</div>

<!--
Because JPEGs and PNGs are complex file types using compression, the authors of the old textbook provided us with the Picture class.

It is an easy interface for doing routine things with an image: loading or saving an image, getting the height and width of an image, changing the pixels of an image, and showing the image.

We never deal with the compression ourselves; Picture reads the file and hands us a simple grid of colors. Picture is not part of Java: like StdDraw, it is a file you add to your project.
-->

---
minutes: 3
---

# Eight Picture methods cover everything we need

| Method | Use |
| --- | --- |
| `Picture(String file)` | Create a Picture from a file |
| `Picture(int w, int h)` | Create a blank Picture, `w` wide and `h` high |
| `int width()` | Return the width of the image |
| `int height()` | Return the height of the image |
| `Color get(int x, int y)` | Return the Color of the pixel at (x, y) |
| `void set(int x, int y, Color c)` | Set the pixel at (x, y) to `c` |
| `void show()` | Display the image |
| `void save(String file)` | Save the Picture to a file |

<style>
table { font-size: 20px !important; }
td, th { padding-top: 3px !important; padding-bottom: 3px !important; }
</style>

<!--
Everything you would want a picture to do, in eight methods. This table is a useful reference during work time.

There are two constructors: Picture with a String creates a Picture from a file, and Picture with two ints creates a blank Picture with width w and height h. The methods width and height return the size of the image. The method get takes x and y and returns the Color of the pixel at that position. The method set takes x, y, and a Color, and sets that pixel to that Color. The method show displays the image, and save takes a file name and saves the Picture to a file.

The blue picture program needs the second constructor, set, and show. The darken program needs the first constructor, width, height, get, set, and show.
-->

---
minutes: 3
---

# Try it: get reads one pixel and set changes it

<PixelPainter />

<!--
This is a tiny picture, 16 pixels wide and 10 pixels high, showing a simple sunset: a sky that fades from blue to orange, a yellow sun, and green ground. Clicking any pixel shows, in the panel, the call picture.get with that x and y, and the Color it returns as three numbers.

The top-left pixel is x 0, y 0. The bottom-right is x 15, y 9, not 16, 10. That is the same idea as the opening question.

The buttons do to every pixel what today's programs will do. Fill blue is Example 1. Darken 50 percent is Example 2: clicking one pixel before and after shows its numbers halve. Reset restores the picture. The line of text under the color always says what was just done.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Two examples

Plan each program in steps before writing any code.

<!--
Part 2 of 3: we plan two programs together. You write them during work time, so the slides give the steps and the pattern, not the finished code.
-->

---
minutes: 3
---

# Every picture program uses the same loop pattern

```java {1|2|3|all}
for (int x = 0; x < picture.width(); x++) {
    for (int y = 0; y < picture.height(); y++) {
        // get, change, or set the pixel at (x, y)
    }
}
```

<div class="callout">

Use `<`, not `<=`. The last column is `width() - 1`.

</div>

<!--
Almost every program that changes an image has this shape. The highlighted line moves on each click.

The outer loop goes through every x, from 0 up to but not including the width. For each x, the inner loop goes through every y, from 0 up to but not including the height. Inside both loops we have one pixel, at x, y, and we get it, change it, or set it.

The callout is the lesson of the opening question: use less than, not less than or equal. The last column is width minus 1. With less than or equal, the program asks for a column that does not exist and stops with an error. y can also be the outer loop; the next slide shows both orders.
-->

---
minutes: 4
---

# Try it: nested loops visit every pixel in order

<LoopFill />

<!--
This interactive traces the loop pattern on a small picture, 8 pixels wide and 5 pixels high. The numbers along the top are x values and the numbers down the side are y values.

The Step button sets one pixel at a time. Each pixel that has been set turns blue and shows the order in which it was set; the next pixel has an orange outline. The code box shows the current x and y, and the text under it says how many times set has run. The Play button runs it automatically, about two pixels per second.

With x as the outer loop, the picture fills one column at a time, top to bottom. The Swap loops button makes y the outer loop: then it fills one row at a time. Either way set runs 40 times, 8 times 5.
-->

---
minutes: 3
---

# Example 1: fill a new picture with blue

<div class="cols center">
<div>

1. Read the **width** and **height** from the user
2. Create a blank `Picture` of that size
3. For every x, for every y: `set` the pixel to blue
4. `show` the picture

</div>
<div class="card blue">

### Methods to use

- `new Picture(w, h)`
- `set(x, y, color)`
- `show()`

</div>
</div>

<!--
The task: write code that reads user input for width and height, then makes an image of that width and height completely filled with the color blue.

The four steps each map to a method on the card: the constructor for step 2, set for step 3, and show for step 4. You write this in work time. One solution:

```java
Scanner in = new Scanner(System.in);
int width = in.nextInt();
int height = in.nextInt();
Picture picture = new Picture(width, height);
Color blue = new Color(0, 0, 255);
for (int x = 0; x < width; x++)
    for (int y = 0; y < height; y++)
        picture.set(x, y, blue);
picture.show();
```

One Color object can be created before the loops and reused for every pixel. Blue is 0, 0, 255.
-->

---
minutes: 3
---

# Example 2: darken a picture by 50%

<div class="cols center">
<div>

1. Read the **file name** from the user
2. Create a `Picture` from that file
3. For every pixel: `get` its Color
4. Make a new Color with **half** of each value
5. `set` the pixel, then `show`

</div>
<div class="card orange">

### Methods to use

- `new Picture(file)`
- `width()`, `height()`
- `get(x, y)`
- `set(x, y, color)`, `show()`

</div>
</div>

<!--
The task: read in the name of an image file from the user, then darken the colors in it by 50 percent.

The slide lists five steps. The new part compared with Example 1 is that we read each pixel before we write it. One solution:

```java
Scanner in = new Scanner(System.in);
String file = in.next();
Picture picture = new Picture(file);
for (int x = 0; x < picture.width(); x++)
    for (int y = 0; y < picture.height(); y++) {
        Color c = picture.get(x, y);
        Color darker = new Color(c.getRed() / 2, c.getGreen() / 2, c.getBlue() / 2);
        picture.set(x, y, darker);
    }
picture.show();
```

Halving makes the picture darker because every value moves toward 0, 0, 0, which is black.
-->

---
minutes: 3
---

# Changing one pixel takes three moves: get, compute, set

<div class="flow" role="img" aria-label="Three steps for one pixel. Step 1, get: picture.get(x, y) returns Color 200, 120, 40. Step 2, compute: halve each value to make new Color 100, 60, 20. Step 3, set: picture.set(x, y, darker) stores the darker color in the same pixel.">
  <div class="step">
    <div class="num">1 · get</div>
    <code>get(x, y)</code>
    <div class="sw-row"><span class="sw" style="background: rgb(200, 120, 40)"></span>Color(200, 120, 40)</div>
  </div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="step">
    <div class="num">2 · compute</div>
    <code>halve each value</code>
    <div class="sw-row"><span class="sw" style="background: rgb(100, 60, 20)"></span>Color(100, 60, 20)</div>
  </div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="step">
    <div class="num">3 · set</div>
    <code>set(x, y, darker)</code>
    <div class="sw-row">same pixel, new color</div>
  </div>
</div>

<div class="callout">A Color cannot be changed. To darken a pixel, build a <b>new</b> Color and set it.</div>

<style>
.flow { display: flex; align-items: stretch; gap: 6px; margin-top: 8px; }
.flow .step {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 12px;
  border-radius: 16px;
  border: 3px solid var(--c-accent);
  background: var(--c-paper);
  font-size: 20px;
}
.flow .num { font-weight: 700; font-size: 22px; color: var(--c-accent); }
.flow code { font-size: 18px !important; white-space: nowrap; align-self: flex-start; }
.flow .arrow { align-self: center; font-size: 28px; font-weight: 700; color: var(--c-accent); }
.flow .sw-row { display: flex; align-items: center; gap: 6px; font-family: var(--slidev-font-mono, monospace); font-size: 18px; letter-spacing: -0.03em; font-weight: 700; white-space: nowrap; }
.flow .sw { width: 28px; height: 28px; border-radius: 6px; border: 2px solid var(--c-ink); flex: none; }
</style>

<!--
Inside the loops, darkening one pixel takes three moves. The diagram shows them as three boxes joined by arrows.

Move 1, get: call picture.get with x and y. In the example it returns the Color 200, 120, 40, a warm orange-brown. Move 2, compute: take half of each value, giving 100, 60, 20, and build a new Color from those numbers. Move 3, set: call picture.set with the same x and y and the darker Color, which stores it back in the same pixel.

The callout is the key point: a Color object cannot be changed. There is no setRed. To darken a pixel you build a new Color and set it. You do not need three separate variables for red, green, and blue, but naming the red, green, and blue values makes the code easier to read and debug.
-->

---
minutes: 2
---

# Check: what is half of 75 in Java?

<div class="cols wide-left center">
<div>

```java
Color c = picture.get(x, y);
// c.getRed() returns 75

int red = c.getRed() / 2;
```

<p class="small">Both numbers are <code>int</code> values.</p>

</div>
<div>

<Quiz
  :options="['37', '37.5', '38']"
  :answer="0"
  explain="37. Dividing an int by an int drops the fraction, which is fine: Color needs whole numbers."
/>

</div>
</div>

<!--
The pixel's red value is 75. In Java, 75 divided by 2, when both are int values, gives 37. Integer division drops the fraction; it does not round, so 38 is wrong, and 37.5 is wrong because an int cannot hold a fraction.

This is convenient here, because the Color constructor needs whole numbers from 0 to 255. If you multiply by 0.5 instead, you get a double and the code will not compile until you cast it back to int.
-->

---
minutes: 3
---

# Three mistakes stop most picture programs

<div class="cols3">
<div class="card">

### Off the edge

`x <= picture.width()`

There is no column `width()`.

</div>
<div class="card">

### Out of range

`new Color(300, 0, 0)`

Each value must be 0 to 255.

</div>
<div class="card">

### Nothing appears

No `picture.show()`

The work is done, but never displayed.

</div>
</div>

<div class="callout">Test on a tiny picture first, such as 4 by 3. Mistakes are easier to see.</div>

<style>
.cols3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cols3 .card { font-size: 20px; padding: 12px 16px; }
.cols3 .card h3 { font-size: 23px; }
.cols3 code { white-space: nowrap; font-size: 17px !important; }
</style>

<!--
Three mistakes account for most of the problems you will hit in work time.

First, running off the edge: writing x less than or equal to picture.width. There is no column with that number, so the program stops with an error. Use less than. Second, a value out of range: new Color with 300 for red. Each value must be from 0 to 255, or the program stops with an error. This matters when you brighten an image. Third, nothing appears: the loops ran, but you never called picture.show, so the result is never displayed.

The callout is the professional habit: test on a tiny picture first, such as 4 by 3, where you can check every pixel by eye.
-->

---
minutes: 3
---

# Saving over a file destroys the original

<div class="cols center">
<div>

- `save` replaces a file with the same name, and there is no undo
- The photo may belong to someone else
- Save your result under a **new name**

</div>
<div>

```java
picture.save("beach-dark.png");
// keeps beach.png unchanged
```

**Discuss in pairs:** when is it wrong to edit a photo without saying so?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. The save method writes the picture to a file. If you give it the name of the file you loaded, the original is replaced, and there is no undo.

That matters for two reasons. The original may be the only copy. And the photo may belong to someone else, or show someone else. The professional habit is to save your result under a new name, as in the code: the picture loaded from beach.png is saved as beach-dark.png, and beach.png is unchanged.

The discussion question is: when is it wrong to edit a photo without saying so? Examples include news photos, evidence, product photos, and pictures of other people. Editing is a normal tool; presenting an edited image as the original is where the harm starts.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Work time

Write both programs. Ask for help early.

<!--
Part 3 of 3: the rest of class is work time for writing both programs.
-->

---
minutes: 20
---

# Work time: write both examples and see them run

<div class="cols center">
<div>

1. **Blue picture:** read a width and height, fill with blue, show it
2. **Darken:** read a file name, darken by 50%, show it
3. **Finished early?** Save the darker picture under a new name

</div>
<div>

<WorkTimer :minutes="20" />

</div>
</div>

<p class="small">Stuck for more than five minutes? Compare with a neighbor, then raise your hand.</p>

<!--
Work time: write both example programs. The slide lists the three tasks: first the blue picture, which reads a width and height, fills the picture with blue, and shows it; second the darken program, which reads a file name, darkens the picture by 50 percent, and shows it; third, if you finish early, save the darker picture under a new name.

The timer on the right counts down from 20 minutes: its Start button begins the countdown, and the plus and minus buttons adjust the time. If you are stuck for more than five minutes, compare with a neighbor, then raise your hand. The most common problems are the three mistakes from the earlier slide, and the loop pattern slide shows the shape every program here uses.
-->

---
minutes: 2
---

# Four things to remember from today

- `Picture` gives eight methods; `get` and `set` do most of the work
- The loop pattern: for every x, for every y, with `<`
- Change a pixel in three moves: **get, compute, set**
- Test on a tiny picture, and save under a new name

<!--
Four things to remember. One: the Picture class gives us eight methods, and get and set do most of the work. Two: the loop pattern is for every x, for every y, using less than, not less than or equal. Three: changing a pixel takes three moves, get, compute, and set, and the compute step builds a new Color. Four: test on a tiny picture first, and save your result under a new name so the original survives.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Algorithmic Foundations (AL), Graphics and Interactive Techniques (GIT)
- **Competency:** write nested loops that read and change the pixels of an image
- **Dispositions:** meticulous, persistent, collaborative, responsible
- **Society and ethics:** protecting original files; honest image editing
- **Accessibility:** colors named in text, labeled diagrams, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
This slide records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.
-->

---
minutes: 1
---

# Next time: mirroring and rotating images

<div class="cols">
<div class="card blue">

### Next time

- Mirroring and rotation on images

</div>
<div class="card orange">

### Reminders

- Read Chapter 11
- Keep reading Chapter 9

</div>
</div>

<Credit />

<!--
Next time we cover mirroring and rotation on images, which use the same loop pattern but move pixels to new positions. Reminders: read Chapter 11, and keep reading Chapter 9.

See also: Week 12 Lecture 2 on color and image formats.
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
