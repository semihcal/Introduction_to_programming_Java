---
theme: ../../theme
title: COMP 1600 – Week 12, Lecture 2 – Big Oh Examples, Color and Pictures
info: |
  COMP 1600 – Introduction to Programming. Week 12, Lecture 2.
  Big Oh examples, RGB and CMYK color, the Color class, image formats,
  and the Picture class.
layout: cover
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 12</div>

# Every pixel is three numbers: <span class="hl">red, green, blue</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Big Oh examples</span>
  <span>Color</span>
  <span>Image formats</span>
  <span>Picture class</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <path d="M124 70 C 170 70, 160 136, 206 138" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M124 160 L 206 160" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M124 250 C 170 250, 160 184, 206 182" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <rect x="4" y="44" width="120" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="64" y="78" text-anchor="middle" class="cover-art-name">R 255</text>
    <rect x="4" y="134" width="120" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="64" y="168" text-anchor="middle" class="cover-art-name">G 165</text>
    <rect x="4" y="224" width="120" height="52" rx="26" fill="#eef2ff" stroke="#3730a3" stroke-width="3" />
    <text x="64" y="258" text-anchor="middle" class="cover-art-name">B 0</text>
    <rect x="210" y="104" width="106" height="112" rx="20" fill="#ffa500" stroke="#0f172a" stroke-width="3" />
    <text x="263" y="244" text-anchor="middle" class="cover-art-name">pixel</text>
  </svg>
</div>
</div>

<!--
Welcome. Today has four parts: two more Big Oh examples, how computers represent color, how image files store pixels, and the Picture class we will use to change images with loops.

CS2023 mapping (indicative, introductory coverage): primary knowledge areas are Software Development Fundamentals (SDF) and Algorithmic Foundations (AL); secondary are Graphics and Interactive Techniques (GIT) for color and images and Architecture and Organization (AR) for data representation, with one Society, Ethics, and Professionalism (SEP) touchpoint on who owns a file format.

See also: Week 12 Lecture 1 (Big Oh notation), Week 10 (objects, constructors, and calling methods, which Color and Picture rely on), and Week 9 (2D arrays, the model for a grid of pixels).

Delivery reminders: read on-screen text aloud, describe each diagram and color in words, repeat student questions, and turn on live captions. Timing: 1 minute.
-->

---

# By the end of today, you can do four things

<div class="card">

- **Determine** the Big Oh running time of a short loop <span class="tag">AL</span>
- **Explain** how red, green, and blue values make a color <span class="tag">GIT · AR</span>
- **Choose** between JPEG and PNG for an image <span class="tag">GIT · SEP</span>
- **Write** loops that read and change pixels with `Picture` <span class="tag">SDF</span>

</div>

<!--
Read the four objectives aloud. The tags are CS2023 knowledge area codes: AL is Algorithmic Foundations, GIT is Graphics and Interactive Techniques, AR is Architecture and Organization, SEP is Society, Ethics, and Professionalism, and SDF is Software Development Fundamentals.

The last objective is the apply-level skill: by the end of class students write nested loops that change every pixel of a picture.

Likely question: "Do we need to memorize color numbers?" No. You need to know how the three values work, not a table. Timing: 1 minute.
-->

---

# Predict first: what color does this make?

<div class="cols wide-left center">
<div>

```java
Color c = new Color(255, 255, 0);
```

<p class="small">Full red, full green, no blue. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['Brown', 'Yellow', 'Green']"
  :answer="1"
  explain="Yellow. On a screen, red light plus green light makes yellow. Part 2 shows why."
/>

</div>
</div>

<!--
Hook and think-pair-share. Give 60 seconds with a neighbor before anyone clicks. Low-tech alternative: one, two, or three fingers for A, B, or C.

The code creates a Color with red 255, green 255, and blue 0. Many students expect brown, because that is what red and green paint make. On a screen the answer is yellow, because screens add light instead of mixing pigment.

Do not explain fully yet; say that by the middle of class they will be able to predict any color from its three numbers. Disposition practiced: collaborative. Timing: 3 minutes.
-->

---

# Last time: Big Oh keeps only the fastest-growing term

<div class="cols center">
<div>

- We finished **hunters and prey**
- We met **Big Oh notation**: worst case, as the input grows
- Constants and low-order terms are ignored

</div>
<div class="card">

$3n + 3$ is $O(n)$

$15n^2 + 6n + 145$ is $O(n^2)$

</div>
</div>

<!--
What did we talk about last time? We finished the hunters and prey example, and we introduced Big Oh notation.

Big Oh describes how the running time grows in the worst case as the input gets larger. All constant coefficients are ignored and all low-order terms are ignored. So 3n plus 3 is O of n, and 15 n squared plus 6n plus 145 is O of n squared.

Likely question: "Why ignore the constants?" Because for large inputs the fastest-growing term decides everything, as the interactive in a few slides shows. Timing: 2 minutes.
-->

---
layout: center
class: text-center
---

# Questions before we continue?

<!--
Pause for questions about last time. Repeat each student question aloud before answering so everyone, and the captions, can follow. Timing: 2 minutes.
-->

---
layout: section
---

<div class="kicker">Part 1</div>

# Big Oh examples

Count the steps in three short pieces of code.

<!--
Part 1 of 4. We apply Big Oh to code students already know how to write: finding the largest element of an array, and sorting an array. Timing: under 1 minute.
-->

---

# Finding the largest element looks at every item: O(n)

```java {1|2-4|5}
int largest = array[0];
for( int i = 1; i < array.length; i++ )
    if( array[i] > largest )
        largest = array[i];
System.out.println("Largest: " + largest);
```

<div class="callout">

Running time: $O(n)$, where $n$ is the length of the array.

</div>

<!--
How do we find the largest element in an array? Start by assuming the first element is the largest. Then loop over every other element, and whenever one is bigger than the largest so far, remember it. Finally print the largest. The highlighted lines move through those three steps on each click.

The loop body runs once for each of the other elements, so the work grows in step with the array: the running time is O of n, where n is the length of the array.

Likely question: "What if the largest is first?" We still have to look at every element to be sure, so it is still O of n. Timing: 3 minutes.
-->

---

# If the array is sorted, the largest is simply the last: O(1)

```java
System.out.println("Largest: " + array[array.length-1]);
```

<div class="cols" style="margin-top: 20px">
<div class="card blue">

### Any array

Look at every element: $O(n)$

</div>
<div class="card orange">

### Sorted ascending

One lookup, any length: $O(1)$

</div>
</div>

<!--
What if the array is sorted in ascending order? Then the largest element must be the last one, so we can print it with a single array lookup at index length minus 1.

That takes the same amount of time whether the array has ten elements or ten million. We call that constant time, written O of 1.

The two cards compare the cases: for any array we look at every element, O of n; for a sorted array we do one lookup, O of 1. Knowing something about your data can change the running time. Likely question: "Does sorting first make it faster overall?" No, because sorting itself costs time, as the next slide shows. Timing: 2 minutes.
-->

---

# Bubble sort compares neighbors again and again: O(n²)

```java {1|2|3-7}
for( int i = 0; i < array.length; ++i )
    for( int j = 0; j < array.length - 1; ++j )
        if( array[j] > array[j + 1] ) {
            int temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
```

<div v-click class="callout">

Running time: $O(n^2)$. A loop of $n$ inside a loop of $n$.

</div>

<!--
Here is some code that sorts an array in ascending order. It is called bubble sort. What is its running time? Ask the class before revealing the answer.

The outer loop runs n times. For each of those, the inner loop runs n minus 1 times. Inside, we compare two neighbors and swap them if they are out of order, using a temporary variable. So the comparison happens n times n minus 1 times, which is n squared minus n.

Ignoring the low-order term, the running time is O of n squared. The answer appears after the code has been stepped through. Rule of thumb: a loop inside a loop, both depending on n, is usually n squared. Timing: 4 minutes.
-->

---

# Try it: n² pulls away from n very quickly

<GrowthCompare />

<!--
This interactive compares the three pieces of code we just saw. Drag the slider to change the array length n from 1 to 100.

Each row gives the Big Oh, the exact number of steps, and a bar. The sorted-array lookup is always 1 step. Finding the largest takes n minus 1 comparisons. Bubble sort takes n times n minus 1 comparisons.

Start at n equals 10: 1, 9, and 90. Move to 100: 1, 99, and 9,900. The bar for n is barely visible next to n squared. That is why Big Oh only keeps the fastest-growing term. Ask students to predict the bubble sort count for n equals 50 before you drag: it is 2,450. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 2</div>

# Color

How a computer stores a color as numbers.

<!--
Part 2 of 4. To work with images we first need a way to store a color in a variable. Timing: under 1 minute.
-->

---

# Visible light is a narrow band of wavelengths

<div class="spectrum" role="img" aria-label="The visible spectrum drawn as a bar, running from violet at about 400 nanometers, through blue, green, yellow and orange, to red at about 700 nanometers.">
  <div class="bar"></div>
  <div class="ticks"><span>400 nm · violet</span><span>550 nm · green</span><span>700 nm · red</span></div>
</div>

- Light is electromagnetic radiation: a **wave** with a frequency
- That works well for sound, but is cumbersome for color
- Most visible colors can be made by combining a **few set colors**

<style>
.spectrum { margin: 4px 0 18px; }
.spectrum .bar {
  height: 54px;
  border-radius: 12px;
  border: 2px solid var(--c-ink);
  background: linear-gradient(90deg, #6d28d9, #2563eb, #06b6d4, #16a34a, #facc15, #f97316, #dc2626);
}
.spectrum .ticks {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-top: 4px;
}
</style>

<!--
Visible light is a form of electromagnetic radiation. We could think of it as a wave with a specific frequency. The bar shows the visible spectrum, from violet at a wavelength of about 400 nanometers, through blue, green, yellow, and orange, to red at about 700 nanometers.

Thinking in frequencies is a useful way to think about sound. It seems cumbersome for light, because most colors we see are mixtures of many frequencies.

Color theorists have discovered that we can represent most visible colors as a combination of a small number of set colors. That is the idea behind the two systems on the next slides. Likely question: "Why three colors?" Human eyes have three kinds of color receptors. Timing: 2 minutes.
-->

---

# RGB adds light: red, green, and blue together make white

<div class="cols center">
<div>

- **RGB**: Red, Green, Blue
- **Additive**: no colors means black
- Adding a color never makes it darker
- The model for computer screens

</div>
<div>
<svg viewBox="0 0 300 280" class="venn" role="img" aria-label="Three overlapping circles of red, green and blue light on a black background. Red and green overlap to make yellow, green and blue make cyan, red and blue make magenta, and all three overlap in the center to make white.">
  <rect width="300" height="280" rx="18" fill="#000000" />
  <g style="isolation: isolate">
    <circle cx="150" cy="108" r="74" fill="#ff0000" style="mix-blend-mode: screen" />
    <circle cx="108" cy="178" r="74" fill="#00ff00" style="mix-blend-mode: screen" />
    <circle cx="192" cy="178" r="74" fill="#0000ff" style="mix-blend-mode: screen" />
  </g>
  <text x="150" y="26" class="venn-light">Red</text>
  <text x="40" y="266" class="venn-light">Green</text>
  <text x="262" y="266" class="venn-light">Blue</text>
  <rect x="118" y="141" width="64" height="30" rx="15" fill="#ffffff" />
  <text x="150" y="162" class="venn-dark">White</text>
</svg>
</div>
</div>

<style>
.venn { width: 100%; max-height: 330px; }
.venn-light { text-anchor: middle; font-size: 18px; font-weight: 700; fill: #ffffff; }
.venn-dark { text-anchor: middle; font-size: 18px; font-weight: 700; fill: #000000; }
</style>

<!--
One system for representing color is RGB. With red, green, and blue components, you can combine them to make most visible colors.

Combining colors in RGB is an additive process. With no colors, the background is black. Adding colors never makes a darker color. Pure red added to pure green added to pure blue makes white. RGB is a good model for computer screens, because a screen is a black surface that emits red, green, and blue light.

The diagram shows three overlapping circles of light on black, labeled red, green, and blue. Where red and green overlap you see yellow, which answers the opening question. Green and blue make cyan, red and blue make magenta, and the center where all three overlap is white. Timing: 3 minutes.
-->

---

# Try it: any screen color is three numbers from 0 to 255

<ColorMixer />

<!--
This is a color mixer. Three sliders set the red, green, and blue values, each from 0 to 255. The swatch shows the resulting color and the text under it shows the Java code that creates it.

It starts on orange: red 255, green 165, blue 0. Use the preset buttons to jump to black, red, green, blue, orange, yellow, or white, and say the three numbers aloud each time, since the color itself is not visible to everyone.

Ask students to predict before you drag: what happens to yellow if you raise blue to 255? It becomes white. What is 128, 128, 128? Gray. Likely question: "Why 255?" Each value is stored in one byte, and a byte holds 0 to 255. Timing: 3 minutes.
-->

---

# CMYK subtracts light: inks on white paper build up to black

<div class="cols center">
<div>

- **CMYK**: Cyan, Magenta, Yellow, Key (black)
- **Subtractive**: no colors means white
- Adding a color never makes it lighter
- Used for printing, not for screens

</div>
<div>
<svg viewBox="0 0 300 280" class="venn" role="img" aria-label="Three overlapping circles of cyan, magenta and yellow ink on a white background. Where all three overlap in the center the result is black.">
  <rect width="300" height="280" rx="18" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
  <g style="isolation: isolate">
    <circle cx="150" cy="108" r="74" fill="#00ffff" style="mix-blend-mode: multiply" />
    <circle cx="108" cy="178" r="74" fill="#ff00ff" style="mix-blend-mode: multiply" />
    <circle cx="192" cy="178" r="74" fill="#ffff00" style="mix-blend-mode: multiply" />
  </g>
  <text x="150" y="26" class="venn-dark">Cyan</text>
  <text x="50" y="268" class="venn-dark">Magenta</text>
  <text x="256" y="268" class="venn-dark">Yellow</text>
  <rect x="118" y="141" width="64" height="30" rx="15" fill="#000000" />
  <text x="150" y="162" class="venn-light">Black</text>
</svg>
</div>
</div>

<style>
.venn { width: 100%; max-height: 330px; }
.venn-light { text-anchor: middle; font-size: 18px; font-weight: 700; fill: #ffffff; }
.venn-dark { text-anchor: middle; font-size: 18px; font-weight: 700; fill: #000000; }
</style>

<!--
CMYK stands for cyan, magenta, yellow, and key, which means black. CMYK is another color system, but it is a subtractive system.

With no colors, the background is white, because it is paper. Adding colors never makes a lighter color, because each ink absorbs some of the light. Pure cyan added to pure magenta added to pure yellow makes black. CMYK is useful for printing, not for computer screens.

The diagram shows three overlapping circles of ink on white, labeled cyan, magenta, and yellow, with black in the center where all three overlap. It is the mirror image of the RGB diagram. Likely question: "Why have a separate black ink?" Mixing three inks gives a muddy dark brown and wastes ink; real black is sharper and cheaper. Timing: 2 minutes.
-->

---

# Java's Color class stores one RGB color

<div class="cols center">
<div>

- `Color` uses the **RGB** model
- Each of red, green, blue is **0 to 255**
- That gives 16,777,216 different colors

</div>
<div>

```java
import java.awt.Color;

public class Painter {
    // ...
}
```

<p class="small">The import goes before the class declaration.</p>

</div>
</div>

<!--
The Color class is how Java keeps track of colors, using an RGB model. To use it, you need to type "import java.awt.Color;" at the top of your program, before the class declaration, as in the code on the right.

Each Color object represents one of 16,777,216 different colors, with a value between 0 and 255 for each of red, green, and blue. That number is 256 times 256 times 256.

Color is an object type, so everything from Week 10 applies: a Color variable is a reference, and we create Color objects with new. Likely question: "What happens with a value like 300?" The constructor throws an exception, so the program stops with an error. Timing: 2 minutes.
-->

---

# Ten common colors, written as red, green, blue

<div class="cols">
<div>

| Color | R | G | B |
| --- | --- | --- | --- |
| <span class="sw" style="background:#000000"></span>Black | 0 | 0 | 0 |
| <span class="sw" style="background:#ff0000"></span>Red | 255 | 0 | 0 |
| <span class="sw" style="background:#00ff00"></span>Green | 0 | 255 | 0 |
| <span class="sw" style="background:#0000ff"></span>Blue | 0 | 0 | 255 |
| <span class="sw" style="background:#ffa500"></span>Orange | 255 | 165 | 0 |

</div>
<div>

| Color | R | G | B |
| --- | --- | --- | --- |
| <span class="sw" style="background:#808080"></span>Gray | 128 | 128 | 128 |
| <span class="sw" style="background:#00ffff"></span>Cyan | 0 | 255 | 255 |
| <span class="sw" style="background:#ff00ff"></span>Magenta | 255 | 0 | 255 |
| <span class="sw" style="background:#ffff00"></span>Yellow | 255 | 255 | 0 |
| <span class="sw" style="background:#ffffff"></span>White | 255 | 255 | 255 |

</div>
</div>

<style>
.sw {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  vertical-align: -4px;
  border-radius: 5px;
  border: 2px solid var(--c-ink);
}
td:not(:first-child), th:not(:first-child) {
  font-family: var(--slidev-font-mono, monospace);
  text-align: right;
}
</style>

<!--
Here are ten example colors with their red, green, and blue values. Each row has a small swatch, the color's name, and the three numbers.

Left table: black is 0, 0, 0. Red is 255, 0, 0. Green is 0, 255, 0. Blue is 0, 0, 255. Orange is 255, 165, 0. Right table: gray is 128, 128, 128. Cyan is 0, 255, 255. Magenta is 255, 0, 255. Yellow is 255, 255, 0. White is 255, 255, 255.

Point out the patterns: the three pure colors have one value at 255; cyan, magenta, and yellow have two; black is nothing and white is everything. Likely question: "Do I need to memorize these?" No, but you should be able to explain why yellow is 255, 255, 0. Timing: 2 minutes.
-->

---

# A Color is created with new and read with three getters

<div class="cols center">
<div>

```java
Color c = new Color(255, 165, 0);
// orange

int green = c.getGreen();
// 165
```

</div>
<div class="card">

- Create: the constructor takes R, G, B
- Read each value:
  - `getRed()`
  - `getGreen()`
  - `getBlue()`

</div>
</div>

<!--
To create a custom color, use the constructor to specify the red, green, and blue values. The example creates orange with new Color 255, 165, 0.

To get the individual values back out of a Color, use the methods getRed, getGreen, and getBlue. In the example, c dot getGreen returns 165 and we store it in an int called green.

This is the same pattern as last week: new calls a constructor, and we use methods instead of operators to work with the object. Likely question: "Is there a setRed?" No. A Color cannot be changed once created; to get a different color you create a new Color. Timing: 2 minutes.
-->

---

# Equal red, green, and blue values make a shade of gray

<div class="cols center" style="grid-template-columns: 1fr 1.35fr">
<div>

| R, G, B | Shade |
| --- | --- |
| 255, 255, 255 | <span class="sw" style="background:#ffffff"></span>White |
| 128, 128, 128 | <span class="sw" style="background:#808080"></span>Gray |
| 0, 0, 0 | <span class="sw" style="background:#000000"></span>Black |

</div>
<div class="card nowrap">

**Luminance:** convert any color to gray

$\text{Value} = 0.3R + 0.59G + 0.11B$

Gray: `(Value, Value, Value)`

</div>
</div>

<div class="callout">The weights follow how brightly the human eye sees each color.</div>

<style>
.sw {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  vertical-align: -4px;
  border-radius: 5px;
  border: 2px solid var(--c-ink);
}
.nowrap { white-space: nowrap; }
</style>

<!--
If the red, green, and blue values happen to be the same, the color is a shade of gray. 255, 255, 255 is white. 128, 128, 128 is gray. 0, 0, 0 is black.

To convert a color to a shade of gray, use this formula: Value equals 0.3 times R, plus 0.59 times G, plus 0.11 times B. The gray color then has that Value for all three components.

The weights are based on the way the human eye perceives colors as light intensities: we are most sensitive to green and least sensitive to blue, so green counts the most. Likely question: "Why not just average the three?" An average makes pure blue and pure green the same gray, but green looks much brighter to us. Timing: 3 minutes.
-->

---

# Try it: luminance turns any color into its gray

<ColorMixer luminance />

<!--
The same mixer, now with a second swatch that shows the luminance gray of the chosen color, and the formula worked out with the current numbers underneath.

Try pure green: 0, 255, 0 gives a Value of 150, a fairly light gray. Try pure blue: 0, 0, 255 gives 28, almost black. Try pure red: 77. Even though all three are "fully on", they do not look equally bright, and the formula captures that.

Ask students to compute orange by hand first: 0.3 times 255 is 76.5, plus 0.59 times 165 is 97.35, plus zero, which rounds to 174. Disposition practiced: meticulous. Timing: 3 minutes.
-->

---
layout: section
---

<div class="kicker">Part 3</div>

# Image formats

How millions of pixels fit in a small file.

<!--
Part 3 of 4. Now that one color is three numbers, an image is just a lot of colors. This part looks at how real image files store them. Timing: under 1 minute.
-->

---

# An image is a 2D grid of pixels, each one a Color

<div class="cols center">
<div>

- We treat an image as a **2D array** of pixels
- Bitmaps (`.bmp`) are almost that simple
- `.jpg`, `.png`, and `.gif` use **compression** to stay small

</div>
<div class="card">

An uncompressed 800 × 600 image:

**3 bytes** × 800 × 600

= 1,440,000 bytes

More than 1 MB

</div>
</div>

<!--
We will be thinking of images as 2D arrays, or rectangular grids of pixels, each of which has a color stored in a Color object.

Bitmaps, which are .bmp files, are almost that simple. Most common image formats, .jpg, .png, and .gif files, are more complex. They use different forms of compression to keep the image size small.

Otherwise the files would be large. The card works it out: an 800 by 600 image at 3 bytes per pixel is 3 times 800 times 600, which is 1,440,000 bytes, more than 1 megabyte, and that is a small image by today's standards. Likely question: "Why 3 bytes?" One byte each for red, green, and blue. See also: Week 9 on 2D arrays. Timing: 2 minutes.
-->

---

# JPEG shrinks photos by throwing away detail

<div class="trio">
  <figure><img src="/jpeg-high.png" alt="Photo of a stone engraved with the letters J P G lying in autumn leaves, saved at high quality: sharp and detailed." /><figcaption>High quality</figcaption></figure>
  <figure><img src="/jpeg-medium.png" alt="The same photo at medium quality: slightly blurred, with faint blocks." /><figcaption>Medium quality</figcaption></figure>
  <figure><img src="/jpeg-low.png" alt="The same photo at low quality: large visible square blocks and washed-out color." /><figcaption>Low quality</figcaption></figure>
</div>

- **JPEG**: Joint Photographic Experts Group. Common for photographs
- **Lossy** compression: smaller file, lost detail

<style>
.trio { display: flex; gap: 14px; margin-bottom: 8px; }
.trio figure { flex: 1; margin: 0; text-align: center; font-size: 18px; }
.trio img { width: 100%; border-radius: 10px; border: 2px solid var(--c-ink); }
</style>

<!--
JPEG, or JPG, stands for Joint Photographic Experts Group. It is good for images without too much high contrast, meaning without many sharp edges. Photographs are often stored as JPEGs.

JPEG uses some serious math, called the discrete cosine transform, to reduce the amount of data needed. It is lossy compression: some of the original information is thrown away and cannot be recovered.

The three pictures show the same photo of a stone engraved with the letters J, P, G lying in autumn leaves. At high quality it is sharp. At medium quality it is slightly blurred. At low quality you can see large square blocks and washed-out color: that is the lost detail. Likely question: "Can I get the quality back by saving again at high quality?" No. Once the detail is gone it is gone. Timing: 3 minutes.
-->

---

# PNG keeps every pixel exactly

<div class="cols center">
<div>

- Best for **few colors** and **sharp edges**
- Built-in compression, a little like a zip file
- **Lossless**: nothing is thrown away
- Replaced the older GIF, which had only 256 colors

</div>
<div>

<img src="/png-flag.png" class="flag" alt="The flag of Australia: flat areas of blue, red and white with sharp edges, the kind of image PNG stores well." />

</div>
</div>

<style>
.flag { width: 100%; border-radius: 10px; border: 2px solid var(--c-ink); }
</style>

<!--
PNG images are good for images with low numbers of colors and high contrast differences. PNG has built-in compression, sort of like zip files. It is lossless compression: the image you get back is exactly the image you saved.

PNG is similar to the older GIF images. GIFs are unpopular now because they only support 256 colors. GIFs also suffered from legal battles over the algorithm used for compression, which is the next slide.

The picture is the flag of Australia: large flat areas of blue, red, and white with sharp edges. That is exactly what PNG compresses well, and exactly what JPEG smears. Likely question: "Why not use PNG for photos too?" It works, but the file is much larger, because photos have millions of slightly different colors. Timing: 2 minutes.
-->

---

# The GIF patent: algorithms can have owners

<div class="card orange">

In the 1990s, the owner of GIF's compression patent began charging fees. Developers answered with **PNG**, free for all.

</div>

<div class="cols" style="margin-top: 12px">
<div>

**Discuss in pairs:** should a file format that everyone uses be owned by one company?

</div>
<div>

**Quick check:** format for a logo?

<Quiz
  :options="['JPEG', 'PNG']"
  :answer="1"
  explain="PNG. A logo has few colors and sharp edges, and lossless keeps them crisp."
/>

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. GIF compresses with an algorithm called LZW, which was patented. In the mid-1990s the patent holder, Unisys, began requiring license fees from software that created GIFs. In response, developers designed PNG as a replacement that anyone could use freely.

Discussion prompt, 90 seconds in pairs: should a file format that everyone uses be owned by one company? Push for both sides: inventors deserve credit and payment for their work; but when a format is everywhere, one owner can charge or block everyone. Professionals need to know the license of the tools and formats they build on. Dispositions practiced: responsible and collaborative.

Then the quick check on the right: which format would you choose for a company logo, JPEG or PNG? PNG, because a logo has few colors and sharp edges. Timing: 4 minutes.
-->

---
layout: section
---

<div class="kicker">Part 4</div>

# The Picture class

Loading, changing, and showing images from Java.

<!--
Part 4 of 4. We now put everything together: a class that lets our loops read and change the pixels of a real image. Timing: under 1 minute.
-->

---

# The Picture class hides the compression details

<div class="cols center">
<div>

- JPEG and PNG files are complex
- `Picture` gives an easy interface for routine tasks
- Source: [Picture.java from the Princeton introcs library](https://introcs.cs.princeton.edu/java/stdlib/Picture.java.html)

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
Because JPEGs and PNGs are complex file types using compression, the authors of the old textbook provided us with the Picture class. The link on the slide goes to its source, Picture.java, in the Princeton introcs standard library; the address is introcs.cs.princeton.edu/java/stdlib/Picture.java.html.

It is an easy interface for doing routine things with an image: loading or saving an image, getting the height and width of an image, changing the pixels of an image, and showing the image.

We do not need to know how JPEG compression works to use it. That is the point of a class: it hides the details behind a few methods. Likely question: "Is Picture built into Java?" No. Like StdDraw, it is a file you add to your project. Timing: 2 minutes.
-->

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
Everything you would want a picture to do, in eight methods.

There are two constructors: Picture with a String creates a Picture from a file, and Picture with two ints creates a blank Picture with width w and height h. The methods width and height return the size of the image. The method get takes x and y and returns the Color of the pixel at that position. The method set takes x, y, and a Color, and sets that pixel to that Color. The method show displays the image, and save takes a file name and saves the Picture to a file.

Notice that get returns a Color and set takes a Color; that is why we learned the Color class first. Likely question: "Where is (0, 0)?" The top-left corner; x grows to the right and y grows downward. Timing: 3 minutes.
-->

---

# Try it: every pixel has an (x, y) address and a Color

<PixelPainter />

<!--
This is a tiny picture, 16 pixels wide and 10 pixels high, showing a simple sunset: a sky that fades from blue to orange, a yellow sun, and green ground. Click any pixel and the panel shows the call picture.get with that x and y, and the Color it returns as three numbers.

Click the top-left pixel to show that it is x 0, y 0, and the bottom-right to show x 15, y 9.

The buttons change every pixel, the way a nested loop with set would. Fill blue sets every pixel to 0, 0, 255: that is Example 1. Darken 50 percent halves each value: that is Example 2; click a pixel before and after to compare the numbers. Gray applies the luminance formula. Reset restores the picture. The line of text under the color always says what was just done. Timing: 4 minutes.
-->

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

### Which methods?

- `new Picture(w, h)`
- `set(x, y, color)`
- `show()`

</div>
</div>

<!--
Live coding. Write code that will read user input for width and height, then make an image that is completely filled with the color blue with the specified width and height.

Let students propose each step before you type it. One solution:

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

Point out that one Color object is created before the loops and reused for every pixel. Likely question: "Does the order of the two loops matter?" Not for the result here. Timing: 5 minutes.
-->

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

### Half of each value

`(200, 120, 40)`

becomes

`(100, 60, 20)`

</div>
</div>

<!--
Live coding. Read in the name of an image file from the user, then darken the colors in it by 50 percent.

One solution:

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

The card shows one pixel: 200, 120, 40 becomes 100, 60, 20. Halving every value moves every color toward black, which is 0, 0, 0. Likely question: "How would we brighten instead?" Multiply, but then you must make sure no value goes above 255. Disposition practiced: meticulous. Timing: 6 minutes.
-->

---

# Check: how many times does set run?

<div class="cols wide-left center">
<div>

```java
Picture p = new Picture(800, 600);
for (int x = 0; x < p.width(); x++)
    for (int y = 0; y < p.height(); y++)
        p.set(x, y, c);
```

<p class="small">Use what you know about nested loops.</p>

</div>
<div>

<Quiz
  :options="['1,400', '480,000', '1,440,000']"
  :answer="1"
  explain="480,000. The inner loop runs 600 times for each of 800 columns: width times height."
/>

</div>
</div>

<!--
Check for understanding that ties both halves of the lecture together. The code creates an 800 by 600 picture and uses nested loops to set every pixel. How many times does set run?

Give 45 seconds, then vote with fingers for A, B, or C. The answer is 480,000: the inner loop runs 600 times for each of the 800 values of x, so 800 times 600.

Common wrong answers: 1,400 adds the two numbers instead of multiplying; 1,440,000 is the number of bytes from the earlier slide, three per pixel. In Big Oh terms, processing an image is O of width times height. Timing: 3 minutes.
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

- One loop over $n$ items is $O(n)$; a loop inside a loop is $O(n^2)$
- A screen color is three numbers, 0 to 255: **red, green, blue**
- RGB **adds** light; CMYK **subtracts** it
- JPEG is **lossy**; PNG is **lossless**
- `Picture` lets loops `get` and `set` every pixel

<!--
Summarize. One: a single loop over n items is O of n, and a loop inside a loop is O of n squared. Two: a screen color is three numbers from 0 to 255 for red, green, and blue. Three: RGB adds light, starting from black, and CMYK subtracts light, starting from white. Four: JPEG is lossy and suits photographs; PNG is lossless and suits images with few colors and sharp edges. Five: the Picture class lets our loops get and set every pixel of an image.

Timing: 2 minutes.
-->

---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary areas:** Software Development Fundamentals (SDF), Algorithmic Foundations (AL)
- **Related areas:** Graphics and Interactive Techniques (GIT), Architecture and Organization (AR)
- **Competency:** write nested loops that read and change the pixels of an image
- **Dispositions:** meticulous, collaborative, responsible
- **Society and ethics:** who owns a file format (the GIF patent)
- **Accessibility:** colors named in text, alt text on images, full speaker notes

</div>

<p class="small">Indicative mapping. Introductory coverage; not full CS Core or KA Core treatment.</p>

<!--
Instructor-facing slide; skip it in class if short on time. It records how this lecture maps to Computer Science Curricula 2023 (CS2023), the ACM, IEEE Computer Society, and AAAI curricular guidelines.

The knowledge area mapping is indicative and has not been checked against the official Body of Knowledge at csed.acm.org. This lecture is introductory coverage and does not claim to satisfy CS Core or KA Core.

Timing: skip, or 30 seconds.
-->

---

# Next time: more image manipulation

<div class="cols">
<div class="card blue">

### Next time

- More on image manipulation

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 9

</div>
</div>

<!--
Next time we continue with more image manipulation using the Picture class. Reminder: keep reading Chapter 9.

See also: Week 12 Lecture 1 on Big Oh notation and Week 10 on objects and constructors. Timing: 1 minute.
-->

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
