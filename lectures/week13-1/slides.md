---
theme: ../../theme
title: COMP 1600 – Week 13, Lecture 1 – Mirroring, Rotation, Resizing, Big Oh Classes and Memory
info: |
  COMP 1600 – Introduction to Programming. Week 13, Monday.
  Mirroring, rotating and resizing images, a comparison of Big Oh classes,
  and how much memory Java types use.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 13</div>

# Moving a pixel takes one <span class="hl">index formula</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Mirroring</span>
  <span>Rotation</span>
  <span>Resizing</span>
  <span>Big Oh classes</span>
  <span>Memory</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <rect x="20" y="28" width="280" height="100" rx="14" fill="#0f172a" />
    <rect x="27" y="35" width="86" height="86" fill="#fed7aa" />
    <rect x="117" y="35" width="86" height="86" fill="#ffffff" />
    <rect x="207" y="35" width="86" height="86" fill="#ffffff" />
    <text x="70" y="90" text-anchor="middle" class="cover-art-obj">A</text>
    <path d="M70 136 C 70 176, 250 152, 250 188" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="20" y="192" width="280" height="100" rx="14" fill="#0f172a" />
    <rect x="27" y="199" width="86" height="86" fill="#ffffff" />
    <rect x="117" y="199" width="86" height="86" fill="#ffffff" />
    <rect x="207" y="199" width="86" height="86" fill="#fed7aa" />
    <text x="250" y="254" text-anchor="middle" class="cover-art-obj">A</text>
  </svg>
</div>
</div>

<!--
Welcome. Today has five parts. The first three change images by moving pixels: mirroring, rotating, and resizing. Then we compare the common Big Oh classes, and finish with how much memory our data uses.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) and Algorithmic Foundations (AL); secondary are Graphics and Interactive Techniques (GIT) for image transforms and Architecture and Organization (AR) for the memory hierarchy and data sizes, with one Society, Ethics, and Professionalism (SEP) touchpoint on enlarged images.

See also: Week 12 Lecture 3 (the Picture loop pattern), Week 12 Lectures 1 and 2 (Big Oh notation and examples), and Week 10 (references, which cost memory too).

Delivery reminders: read on-screen text aloud, describe each diagram in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Trace** where a pixel moves in a mirror, a rotation, or a resize <span class="tag">SDF · GIT</span>
- **Write** nested loops that build a new picture from an old one <span class="tag">SDF</span>
- **Rank** the Big Oh classes and judge which are practical <span class="tag">AL</span>
- **Estimate** the memory an array or String uses <span class="tag">AR · SDF</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals, GIT is Graphics and Interactive Techniques, AL is Algorithmic Foundations, and AR is Architecture and Organization.

The first two are what Project 5 needs: knowing where each pixel goes, and writing the loops that put it there. The last two help you judge whether a program will be fast enough and small enough.

Likely question: "Which of these is on the project?" Mirroring, rotation, and growing an image. Timing: 1 minute.
-->

---

# Predict first: where does the left edge go?

<div class="cols wide-left center">
<div>

A picture is **3 pixels wide**.

We mirror it left to right.

<p class="small">The pixel in column <code>x = 0</code> moves to which column? Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['Column 3', 'Column 2', 'Column 1']"
  :answer="1"
  explain="Column 2. The columns are 0, 1, 2, so the left edge lands on the last one: 3 − 0 − 1."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give 45 seconds with a neighbor before anyone clicks. Low-tech alternative: one, two, or three fingers for A, B, or C.

A picture is 3 pixels wide and we mirror it left to right. The pixel in column 0, the left edge, moves to which column? The answer is column 2. The columns are numbered 0, 1, 2, so the last column is 2, not 3.

Column 3 is the tempting answer and it is the same off-by-one mistake as last week: there is no column 3. Today's formulas all contain a "minus 1" for exactly this reason. Disposition practiced: collaborative. Timing: 3 minutes.
-->

---

# Last time: get a pixel, compute, then set a pixel

<div class="cols center">
<div>

- We wrote two **Picture examples**: fill with blue, darken by 50%
- Both used the same loop pattern
- Both changed pixels **in place**

</div>
<div class="card">

### The loop pattern

For every `x`, for every `y`:

**get**, **compute**, **set**

</div>
</div>

<div class="callout">Today the pixel keeps its color but changes its <b>position</b>.</div>

<!--
What did we talk about last time? The Picture examples: filling a picture with blue, and darkening a picture by 50 percent.

Both used the same loop pattern, summarized in the card on the right: for every x, for every y, get the pixel, compute something, and set the pixel. Both changed each pixel in place, at the same x and y.

Today is the other kind of image program. The color stays the same, but the pixel moves to a new position in a new picture. Likely question: "Why a new picture?" If we wrote into the same picture, we would overwrite pixels we still need to read. Timing: 2 minutes.
-->

---
layout: center
class: text-center
---

# Questions before we move pixels?

<!--
Pause for questions about the Picture examples or work time. Repeat each student question aloud before answering so everyone, and the captions, can follow. Timing: 2 minutes.
-->

---

# Today's transforms use the same eight Picture methods

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
A reminder of everything a picture can do, in eight methods. Nothing new is needed today.

There are two constructors: Picture with a String creates a Picture from a file, and Picture with two ints creates a blank Picture with width w and height h. The methods width and height return the size. The method get returns the Color of the pixel at x, y, and set changes the pixel at x, y to a Color. The method show displays the image and save writes it to a file.

Today we use both constructors in the same program: one to load the original, and one to make the blank picture we copy into. Timing: 1 minute.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# Mirroring

Flip an image left to right, or top to bottom.

<!--
Part 1 of 5. Mirroring is the simplest transform: the picture keeps its size, and each pixel moves to the opposite side. Timing: under 1 minute.
-->

---

# A horizontal mirror flips an image around the y-axis

<div class="cols center">
<div>

- A straightforward idea: left becomes right
- The picture keeps its width and height
- Useful for reading **mirror writing**, such as Leonardo da Vinci's notebooks

</div>
<div class="mirror-demo" role="img" aria-label="The word CODE written normally, and below it the same word mirrored left to right so the letters read backwards.">
  <div class="word">CODE</div>
  <div class="word flipped">CODE</div>
  <div class="small">Original above, mirrored below</div>
</div>
</div>

<style>
.mirror-demo { text-align: center; }
.mirror-demo .word {
  font-size: 76px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.06em;
  color: var(--c-accent);
}
.mirror-demo .flipped { transform: scaleX(-1); color: var(--c-accent-2); }
</style>

<!--
Mirroring an image horizontally is a straightforward idea: flip the image around the y-axis, so that left becomes right. The picture keeps the same width and height.

The diagram shows the word CODE written normally, and below it the same word mirrored left to right, so the letters are reversed and each letter faces the other way.

One use: maybe you want to decipher some of Leonardo da Vinci's writings. He wrote many of his notebooks in mirror script, and mirroring a photo of a page makes it readable. Likely question: "Is this the same as a selfie being flipped?" Yes, phone cameras do exactly this. Timing: 2 minutes.
-->

---

# Try it: column x moves to column w − x − 1

<TransformDemo mode="mirror-h" />

<!--
How to perform a horizontal mirror: given an image with width w and height h, move from left to right in the original image, copy each column, and store each column from right to left in the new image.

The interactive shows a small picture, 3 pixels wide and 4 pixels high, with a letter in each pixel, and its mirror image beside it. The numbers along the top are x values and the numbers down the side are y values. Click any pixel: it is outlined in both pictures, and the box underneath works out the formula with the actual numbers.

Start with the pixel at x 0, y 1, the letter D. With w equal to 3 it goes to 3 minus 0 minus 1, which is 2, so it lands at x 2, y 1. Click a pixel in the middle column: it stays in the middle column. The y value never changes. Timing: 4 minutes.
-->

---

# The mirror code copies each pixel into a new picture

```java {1|2-3|4-5|6|7|all}
Picture picture = new Picture(file);   // to be mirrored
Picture mirrored = new Picture(
    picture.width(), picture.height());
for (int x = 0; x < picture.width(); ++x) {
    for (int y = 0; y < picture.height(); ++y) {
        Color color = picture.get(x, y);
        mirrored.set(picture.width() - x - 1, y, color);
    }
}
```

<!--
What would the code for mirroring look like? The highlighted lines move on each click.

Line 1 loads the picture to be mirrored from a file. Lines 2 and 3 create a second, blank picture called mirrored, with the same width and height. Lines 4 and 5 are the usual loop pattern: for every x, for every y. Line 6 gets the Color of the pixel at x, y in the original. Line 7 sets a pixel in the mirrored picture: the column is the width minus x minus 1, and the row is the same y.

Notice there are two pictures. We read from one and write to the other. Likely question: "Can we mirror inside one picture?" Yes, by swapping pairs of pixels and stopping halfway across, but two pictures is simpler and harder to get wrong. Timing: 4 minutes.
-->

---

# Check: a picture is 10 wide. Where does x = 7 go?

<div class="cols wide-left center">
<div>

```java
mirrored.set(
    picture.width() - x - 1, y, color);
```

<p class="small">The width is 10 and <code>x</code> is 7.</p>

</div>
<div>

<Quiz
  :options="['Column 2', 'Column 3', 'Column 7']"
  :answer="0"
  explain="Column 2. 10 − 7 − 1 = 2. Column 7 is the third from the right; column 2 is the third from the left."
/>

</div>
</div>

<!--
Check for understanding. The picture is 10 pixels wide and the loop is at x equals 7. Which column does the mirror code write to?

Give 30 seconds, then vote with fingers for A, B, or C. The answer is column 2: 10 minus 7 minus 1.

Sanity check to say aloud: the columns are 0 through 9. Column 7 is the third from the right, counting 9, 8, 7. Column 2 is the third from the left, counting 0, 1, 2. Students who answered 3 forgot the minus 1. Disposition practiced: meticulous. Timing: 2 minutes.
-->

---

# A vertical mirror reverses the rows instead

<TransformDemo mode="mirror-v" />

<!--
Mirroring vertically is pretty much the same thing. Instead of copying each column in reverse order, we copy each row in reverse order.

The interactive shows the same 3 by 4 picture mirrored top to bottom. Click a pixel in the top row: it moves to the bottom row. With h equal to 4, the pixel at x 0, y 1 goes to row 4 minus 1 minus 1, which is 2. This time the x value never changes.

Ask students to say the line of code before you point at the formula in the box: mirrored.set, x, the height minus y minus 1, color. Only one argument differs from the horizontal mirror. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Rotation

Turn an image by 90 degrees.

<!--
Part 2 of 5. Rotation is the first transform where the new picture has a different shape from the original. Timing: under 1 minute.
-->

---

# Rotating turns a landscape picture into a portrait one

<div class="cols center">
<div>

- Another straightforward idea
- Needed in **camera software**: the user may turn the camera sideways
- The width and height **swap**

</div>
<div>
<svg viewBox="0 0 390 230" class="rot" role="img" aria-label="A wide rectangle labeled 4 wide, 3 high, an arrow labeled rotate 90 degrees right, and a tall rectangle labeled 3 wide, 4 high.">
  <defs>
    <marker id="rot-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <rect x="6" y="60" width="140" height="105" rx="8" class="rot-box" />
  <text x="76" y="118" class="rot-text">4 × 3</text>
  <text x="76" y="192" class="rot-cap">4 wide, 3 high</text>
  <path d="M160 112 L 250 112" class="rot-line" marker-end="url(#rot-arrow)" />
  <text x="204" y="96" class="rot-cap">90° right</text>
  <rect x="266" y="20" width="105" height="140" rx="8" class="rot-box" />
  <text x="318" y="96" class="rot-text">3 × 4</text>
  <text x="318" y="186" class="rot-cap">3 wide, 4 high</text>
</svg>
</div>
</div>

<style>
.rot { width: 100%; }
.rot-box { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 3; }
.rot-text { text-anchor: middle; font-size: 26px; font-weight: 700; fill: var(--c-ink); }
.rot-cap { text-anchor: middle; font-size: 18px; fill: var(--c-muted); }
.rot-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
</style>

<!--
Rotating an image is another straightforward idea. It is necessary if you are writing software for a digital camera, because the user might turn the camera sideways for a portrait photo instead of a landscape one.

The important difference from mirroring is that the width and height swap. The diagram shows a wide rectangle, 4 wide and 3 high, an arrow labeled 90 degrees right, and a tall rectangle, 3 wide and 4 high.

Likely question: "How does a phone know which way it was held?" A sensor records the orientation, and software rotates the pixels, or just records the orientation in the file. Timing: 2 minutes.
-->

---

# Try it: a 90° right rotation turns each column into a row

<TransformDemo mode="rotate" />

<!--
How to perform a 90 degree right rotation: given an image with width w and height h, create a new image with width h and height w. Then copy each column in the original image into a row in the new image, remembering to move back along the row.

The interactive shows the 3 by 4 picture and its rotation, which is 4 wide and 3 high. Click the letters in the first column, A, D, G, J, top to bottom. They end up in the top row of the rotated picture, but in reverse: J, G, D, A, reading left to right. That is the "moving back along the row".

The formula box shows it for one pixel: with h equal to 4, the pixel at x 0, y 1 goes to column 4 minus 1 minus 1, which is 2, and row 0. The old y decides the new column, and the old x becomes the new row. Timing: 4 minutes.
-->

---

# Rotation swaps the sizes and the coordinates

```java {1|2-3|4-5|6|7|all}
Picture picture = new Picture(file);   // to be rotated
Picture rotated = new Picture(
    picture.height(), picture.width());
for (int x = 0; x < picture.width(); ++x) {
    for (int y = 0; y < picture.height(); ++y) {
        Color color = picture.get(x, y);
        rotated.set(picture.height() - y - 1, x, color);
    }
}
```

<div class="callout">Two swaps: the size of the new picture, and the arguments to <code>set</code>.</div>

<!--
What would the code for a rotation look like? The highlighted lines move on each click.

Line 1 loads the picture to be rotated. Lines 2 and 3 create the new picture, and here is the first swap: its width is the original's height and its height is the original's width. Lines 4 and 5 loop over the original as usual. Line 6 gets the Color at x, y. Line 7 sets a pixel in the rotated picture: the column is the height minus y minus 1, and the row is x. That is the second swap.

Compare with the mirror code: the loops and the get are identical; only the size of the new picture and the arguments to set changed. Likely question: "What happens if I forget to swap the sizes?" For a non-square picture, set will try to write outside the new picture and the program stops with an error. Timing: 4 minutes.
-->

---

# Other right-angle rotations repeat the same move

<div class="cols center">
<div class="card blue">

### Multiples of 90°

180°, 270°, −90°, −180°, −270°

Use a similar formula, or rotate right several times.

</div>
<div class="card orange">

### Any other angle

Much trickier: the result is not a rectangle, and it needs trigonometry.

**Not needed in this course.**

</div>
</div>

<!--
Rotating by 180 degrees, 270 degrees, minus 90, minus 180, or minus 270 degrees can be done using similar techniques, or simply by performing right rotations multiple times. For example, rotating left by 90 degrees is the same as rotating right three times.

Rotations that are not multiples of 90 degrees are much trickier. They result in non-rectangular final images and need some trigonometry. Do not worry about rotations that are not multiples of 90 degrees.

Likely question: "Is rotating three times slower than one direct formula?" Yes, about three times the work, but it is still the same Big Oh class, as we will see in Part 4. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# Resizing

Make an image larger.

<!--
Part 3 of 5. Resizing changes the number of pixels. We focus on growing, because that is what the project needs. Timing: under 1 minute.
-->

---

# Doubling builds a new image twice as wide and twice as high

<div class="cols center">
<div>

1. Create a new image: **2 × width**, **2 × height**
2. Go through every pixel of the **new** image
3. Copy from the original pixel at **half** the column and **half** the row

</div>
<div class="card">

### Why focus on growing?

That is what you need to do in **Project 5**.

You have seen resizing many times: an image that does not fit a slide gets stretched.

</div>
</div>

<!--
You have seen resizing many times before: sometimes an image will not fit nicely on a PowerPoint slide, and you drag a corner to stretch it.

Let's just focus on growing, because that is what you need to do in your project. If we are just doubling the image, we create a new image whose width and height are twice the original. Then we go through the new image, copying the pixels from the original, using pixels whose column and row are half as big as the ones we are putting into the new image.

Notice the direction: this time the loops run over the new picture, and we ask "which old pixel do I copy?" The slide does not show the code, because writing it is part of Project 5. Timing: 3 minutes.
-->

---

# Try it: each old pixel becomes four new ones

<TransformDemo mode="double" />

<!--
The interactive shows a tiny original picture, 2 pixels wide and 2 pixels high, with the letters A, B, C, D, and the doubled picture, 4 wide and 4 high. Each old pixel maps to four new ones: the doubled picture has a 2 by 2 block of A, a block of B, a block of C, and a block of D.

Click any pixel of the doubled picture. The box shows which old pixel it copies: the new column divided by 2 and the new row divided by 2, using integer division. For example, new pixel 3, 1 copies old pixel 3 divided by 2, which is 1, and 1 divided by 2, which is 0: that is B.

Click all four pixels of one block to show that they all give the same old pixel. This is where integer division, which drops the fraction, does exactly what we want. Timing: 3 minutes.
-->

---

# Simple resizing works, but better methods average and guess

<div class="cols center">
<div class="card blue">

### Shrinking

A clever resize **averages** neighboring pixels together.

</div>
<div class="card orange">

### Growing

Better methods fill in **guesses** for the pixels between the originals, instead of duplicating them.

</div>
</div>

<div class="callout">Our doubling is crude but correct. Photo-editing software uses far more refined methods.</div>

<!--
This kind of resize works but is crude: a doubled image looks blocky, because every pixel became a 2 by 2 square.

To shrink an image, a clever resize might average together pixels, so that no detail is simply thrown away. When growing an image, different techniques can be used to fill in guesses for pixels that sit between pixels from the original image, instead of just duplicating them.

People who program tools like Photoshop have thought long and hard about how to do these tasks better. Likely question: "Do we need the better methods for the project?" No. Simple duplication is what the project asks for. Timing: 2 minutes.
-->

---

# Enlarging an image cannot add real detail

<div class="cols center">
<div>

- Every new pixel is a **copy** or a **guess**
- The result can look sharp and still be invented
- "Enhance" in films is fiction

</div>
<div class="card orange">

### Discuss in pairs

An enlarged security photo shows a blurry face. Should it be used to identify someone?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. When we enlarge an image, every new pixel is either a copy of an old one, as in our doubling, or a guess made by a cleverer method. No new information about the real scene is created.

That matters because the result can look sharp and convincing and still be invented. The "enhance" button in films and television, which reveals a face or a number plate from a few pixels, is fiction.

Discussion prompt, 90 seconds in pairs: an enlarged security photo shows a blurry face. Should it be used to identify someone? Listen for the idea that software which guesses pixels can produce a plausible face that is not the real person, and that people affected deserve to know how an image was processed. Dispositions practiced: responsible and collaborative. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 4</div>

# Comparing Big Oh classes

Which running times are practical?

<!--
Part 4 of 5. We return to Big Oh and line up the common classes side by side. Timing: under 1 minute.
-->

---

# Eight complexity classes, from fastest to slowest

<BigOhTable />

<!--
Here is a table of several different complexity measures, in ascending order, with their functions evaluated at the value of n chosen by the slider. It starts at n equals 100.

At n equals 100: constant is 1. Logarithmic, log base 2 of n, is 6.64. Linear is 100. Linearithmic, n log n, is 664.39. Quadratic, n squared, is 10,000. Cubic, n cubed, is 1,000,000. Exponential, 2 to the n, is about 1.27 times 10 to the 30. Factorial is about 9.33 times 10 to the 157.

The bar in the last column shows roughly how many digits each number has, because the numbers themselves are too far apart to draw to scale. Drag the slider down to 10 and the classes look close together; drag it back up and the last two run away. Ask students to predict 2 to the n at n equals 20 before you move the slider: about a million. Timing: 4 minutes.
-->

---

# Faster computers barely help the slowest classes

<p class="small">If computers become <b>10 times faster</b>, this is how much larger a solvable problem can be.</p>

| Description | Big Oh | Problem can grow by |
| --- | --- | --- |
| Constant | $O(1)$ | Unlimited |
| Logarithmic | $O(\log n)$ | 1000 times |
| Linear | $O(n)$ | 10 times |
| Linearithmic | $O(n \log n)$ | 10 times |
| Quadratic | $O(n^2)$ | 3 to 4 times |
| Cubic | $O(n^3)$ | 2 to 3 times |
| Exponential | $O(2^n)$ | Hardly changes |
| Factorial | $O(n!)$ | Hardly changes |

<style>
table { font-size: 20px !important; }
td, th { padding-top: 2px !important; padding-bottom: 2px !important; }
</style>

<!--
Computers get faster, but not in unlimited ways. If computers get 10 times faster, the table shows how much a problem from each class could grow and still be solvable in the same time.

For constant time, the growth is unlimited. For logarithmic time, about 1000 times. For linear and linearithmic time, about 10 times, matching the speed-up. For quadratic time, only 3 to 4 times. For cubic time, only 2 to 3 times. For exponential and factorial time, the problem size hardly changes at all.

The practical implication: buying a faster computer does not rescue a slow algorithm. Choosing a better algorithm does. Likely question: "Why 3 to 4 for quadratic?" Because the square root of 10 is about 3.2: tripling n multiplies the work by about 10. Timing: 3 minutes.
-->

---

# Rules of thumb for each class

| Class | What it means in practice |
| --- | --- |
| Constant | Nothing is better |
| Logarithmic | The problem can become much larger and take only a little longer |
| Linear | Time grows with the problem |
| Linearithmic | Just a little worse than linear |
| Quadratic | A much larger problem could become impractical |
| Cubic | About the reasonable maximum if the problem will grow |
| Exponential, factorial | Only the most trivial problem sizes can be solved |

<style>
table { font-size: 20px !important; }
td, th { padding-top: 3px !important; padding-bottom: 3px !important; }
</style>

<!--
Some rules of thumb. There is nothing better than constant time. Logarithmic time means that the problem can become much larger and only take a little longer. Linear time means that time grows with the problem. Linearithmic time is just a little worse than linear.

Quadratic time means that expanding the problem size significantly could make it impractical. Cubic time is about the reasonable maximum if we expect the problem to grow. Exponential and factorial time mean that we cannot solve anything but the most trivial problem instances.

Connect to what we have written: finding the largest element was linear, and bubble sort was quadratic. Next time we meet sorting methods that are linearithmic. Timing: 3 minutes.
-->

---

# Check: what is the running time of mirroring?

<div class="cols wide-left center">
<div>

```java
for (int x = 0; x < w; ++x)
    for (int y = 0; y < h; ++y) {
        Color color = picture.get(x, y);
        mirrored.set(w - x - 1, y, color);
    }
```

<p class="small">The picture is <code>w</code> wide and <code>h</code> high.</p>

</div>
<div>

<Quiz
  :options="['O(w + h)', 'O(w × h)', 'O(1)']"
  :answer="1"
  explain="O(w × h). The inner loop runs h times for each of w columns: once per pixel."
/>

</div>
</div>

<!--
Check for understanding that ties the two halves of the lecture together. The code is the mirror loop, for a picture w wide and h high. What is its running time?

Give 45 seconds, then vote with fingers for A, B, or C. The answer is O of w times h. The inner loop body runs h times for each of the w columns, so once per pixel.

In terms of the number of pixels, that is linear: every pixel is handled exactly once, and you cannot do better than looking at each pixel. Rotation and doubling are the same class. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 5</div>

# Memory

Running time is not the only cost.

<!--
Part 5 of 5. Programs use memory as well as time. This part covers where data lives and how to estimate how much space it takes. Timing: under 1 minute.
-->

---

# Each level of memory is about 500 times larger and slower

<svg viewBox="0 0 860 250" class="memlv" role="img" aria-label="Three levels of memory in a row. Cache, inside the processor, is the smallest and fastest. RAM is about 500 times larger and 500 times slower than cache. The hard drive is about 500 times larger and 500 times slower than RAM.">
  <defs>
    <marker id="mem-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <rect x="10" y="80" width="170" height="90" rx="14" class="memlv-box" />
  <text x="95" y="120" class="memlv-name">Cache</text>
  <text x="95" y="148" class="memlv-cap">in the processor</text>
  <rect x="335" y="60" width="180" height="130" rx="14" class="memlv-box" />
  <text x="425" y="120" class="memlv-name">RAM</text>
  <text x="425" y="148" class="memlv-cap">main memory</text>
  <rect x="670" y="30" width="180" height="190" rx="14" class="memlv-box" />
  <text x="760" y="120" class="memlv-name">Hard drive</text>
  <text x="760" y="148" class="memlv-cap">storage</text>
  <path d="M192 125 L 322 125" class="memlv-line" marker-end="url(#mem-arrow)" />
  <text x="257" y="100" class="memlv-x">500× larger</text>
  <text x="257" y="158" class="memlv-x">500× slower</text>
  <path d="M527 125 L 657 125" class="memlv-line" marker-end="url(#mem-arrow)" />
  <text x="592" y="100" class="memlv-x">500× larger</text>
  <text x="592" y="158" class="memlv-x">500× slower</text>
  <text x="95" y="208" class="memlv-cap">smallest, fastest</text>
  <text x="760" y="244" class="memlv-cap">largest, slowest</text>
</svg>

<style>
.memlv { width: 100%; margin-top: 6px; }
.memlv-box { fill: var(--c-accent-soft); stroke: var(--c-accent); stroke-width: 3; }
.memlv-name { text-anchor: middle; font-size: 26px; font-weight: 700; fill: var(--c-ink); }
.memlv-cap { text-anchor: middle; font-size: 18px; fill: var(--c-muted); }
.memlv-x { text-anchor: middle; font-size: 18px; font-weight: 700; fill: var(--c-accent-2); }
.memlv-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
</style>

<!--
Remember, there are multiple levels of memory on a computer. Each next level is on the order of 500 times larger and 500 times slower.

The diagram shows three boxes in a row, growing in size from left to right. Cache, inside the processor, is the smallest and fastest. RAM, the main memory, is about 500 times larger and about 500 times slower than cache. The hard drive, which is storage, is about 500 times larger and about 500 times slower than RAM.

These are rough orders of magnitude, not exact figures, and they vary between machines. The pattern is what matters: the more room a level has, the longer it takes to reach. Likely question: "Where do my variables live?" In RAM, with the most recently used ones copied into cache. Timing: 3 minutes.
-->

---

# Programs run fastest when their data stays in fast memory

<div class="cols3">
<div class="card">

### In cache

Lots of number crunching without leaving cache is **very fast**.

</div>
<div class="card">

### From RAM

Fetching data from RAM **slows things down**.

</div>
<div class="card">

### On the hard drive

Reading and writing the drive slows things down **a lot**.

</div>
</div>

<div class="callout">Large data, such as digital movies, cannot avoid the hard drive.</div>

<style>
.cols3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cols3 .card { font-size: 22px; }
</style>

<!--
What does the hierarchy mean for speed? If you can do a lot of number crunching without leaving cache, that will be very fast. If you have to fetch data from RAM, that will slow things down. If you have to read and write data to the hard drive, you will slow things down a lot.

Using the hard drive is unavoidable with large pieces of data like digital movies, which do not fit in RAM.

This is one reason two programs with the same Big Oh can run at very different speeds: Big Oh counts steps, but not every step costs the same. Likely question: "Can I control what is in cache?" Not directly, but working through an array in order helps, because neighboring elements are loaded together. Timing: 2 minutes.
-->

---

# Memory use can be counted

<div class="cols center">
<div>

- Memory is often **easier to estimate** than running time
- A program allocates objects, arrays, and primitive values
- Count the storage for each one

</div>
<div class="card orange">

### Do not forget the arrow

A **reference** to an object or an array costs 4 or 8 more bytes, on top of the object itself.

</div>
</div>

<!--
Memory can be easier to estimate than running time. Depending on your input, you will allocate a certain number of objects, arrays, and primitive data types. It is possible to count the storage for each item allocated.

Remember that a reference to an object or an array costs an additional 4 or 8 bytes on top of the size of the object. This is the arrow from Week 10: the variable that points at the object takes space too.

Likely question: "4 or 8, which is it?" It depends on the Java virtual machine and its settings; the tables on the next slide use 8. Timing: 2 minutes.
-->

---

# Java types have known memory footprints

<div class="foot">
<div>

| Type | Bytes |
| --- | --- |
| `boolean` | 1 |
| `char` | 2 |
| `int` | 4 |
| `double` | 8 |

</div>
<div>

| Type | Bytes |
| --- | --- |
| `boolean[]` | 16 + N |
| `char[]` | 16 + 2N |
| `int[]` | 16 + 4N |
| `double[]` | 16 + 8N |

</div>
<div>

| Type | Bytes |
| --- | --- |
| reference | 8 |
| `String` | 40 + 2N |
| object | 8 + members |
| object array | 16 + (8 + members)N |

</div>
</div>

<p class="small">N is the number of elements in the array or characters in the String.</p>

<style>
.foot { display: grid; grid-template-columns: 0.8fr 1fr 1.45fr; gap: 26px; }
.foot table { font-size: 20px !important; }
.foot td, .foot th { white-space: nowrap; }
.foot td:last-child, .foot th:last-child { text-align: right; font-family: var(--slidev-font-mono, monospace); }
</style>

<!--
Here are the sizes of various types in Java, in three small tables. N refers to the number of elements in the array or the number of characters in the String.

Primitive types: a boolean is 1 byte, a char is 2 bytes, an int is 4 bytes, and a double is 8 bytes. Arrays of primitives: each has 16 bytes of overhead plus the elements, so a boolean array is 16 plus N, a char array is 16 plus 2N, an int array is 16 plus 4N, and a double array is 16 plus 8N.

Object types: a reference is 8 bytes. A String is 40 plus 2N. An object is 8 bytes plus the size of its members. An array of objects is 16 plus N times the quantity 8 plus the size of the members.

These are typical figures; the exact numbers depend on the Java virtual machine. Likely question: "Why 16 extra for an array?" The array stores its own length and some bookkeeping. Timing: 3 minutes.
-->

---

# Check: how many bytes is an int array of 100 elements?

<div class="cols wide-left center">
<div>

```java
int[] scores = new int[100];
```

<p class="small">An <code>int[]</code> uses 16 + 4N bytes.</p>

</div>
<div>

<Quiz
  :options="['400 bytes', '416 bytes', '800 bytes']"
  :answer="1"
  explain="416 bytes. 100 ints at 4 bytes each is 400, plus 16 bytes for the array itself."
/>

</div>
</div>

<!--
Check for understanding. The code creates an int array with 100 elements. Using the formula 16 plus 4N, how many bytes does the array use?

Give 30 seconds, then vote with fingers for A, B, or C. The answer is 416 bytes: 100 ints at 4 bytes each is 400, plus 16 bytes of overhead for the array itself.

Follow-up to ask aloud: and the variable scores? It is a reference, so 8 more bytes. Timing: 2 minutes.
-->

---

# Try it: the array type and length decide the bytes

<MemoryCalc />

<!--
This is a memory calculator. Choose a type with the buttons, boolean array, char array, int array, double array, or String, and set the number of elements N with the slider, from 0 to 1000. The box shows the formula for that type and the total number of bytes worked out.

It starts on an int array of 100 elements: 16 plus 4 times 100 is 416 bytes, matching the question we just answered. Switch to a double array: 16 plus 8 times 100 is 816 bytes, almost double. Switch to boolean: 116 bytes.

Set N to zero to show that an empty array still costs 16 bytes. Then connect to images: an 800 by 600 picture has 480,000 pixels, and at 4 bytes per pixel that is about 1.9 million bytes, before any overhead. Timing: 3 minutes.
-->

---

# Five things to remember from today

- Mirror: column `x` moves to column `w - x - 1`
- Rotate right: the sizes swap, and `(x, y)` moves to `(h - y - 1, x)`
- Double: new pixel `(x, y)` copies old pixel `(x / 2, y / 2)`
- A faster computer does not rescue an exponential algorithm
- An array costs 16 bytes plus its elements

<!--
Summarize. One: in a horizontal mirror, column x moves to column w minus x minus 1. Two: in a 90 degree right rotation, the width and height swap, and the pixel at x, y moves to h minus y minus 1, x. Three: to double an image, each new pixel at x, y copies the old pixel at x divided by 2, y divided by 2. Four: a faster computer does not rescue an exponential or factorial algorithm; a better algorithm does. Five: an array costs 16 bytes plus the space for its elements.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Algorithmic Foundations (AL)
- **Related areas:** Graphics and Interactive Techniques (GIT), Architecture and Organization (AR)
- **Competency:** trace and code the index formula that moves each pixel of an image
- **Dispositions:** meticulous, collaborative, responsible
- **Society and ethics:** enlarged images contain guessed pixels, not new evidence
- **Accessibility:** letters with colors in diagrams, text alternatives, full notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: searching, sorting, and inheritance

<div class="cols">
<div class="card blue">

### Next time

- Searching and sorting
- Inheritance

</div>
<div class="card orange">

### Reminders

- Read Chapter 11
- Work on **Project 5**: it is challenging 

</div>
</div>



---
layout: center
class: text-center
---

# Exit ticket: scan before you leave

<img src="/exit-ticket.png" class="qr mx-auto" alt="QR code that opens today's exit ticket form." />

<p class="small">If you cannot scan the code, ask for the link.</p>

<!--
Exit ticket. Students scan the QR code to open today's exit ticket form. Read the instruction aloud and offer the link directly to anyone who cannot scan the code; paste the form's address here in the notes before class so you can share it in the chat or on the board.

Timing: 3 minutes.
-->
