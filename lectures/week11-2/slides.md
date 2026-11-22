---
theme: ../../theme
title: COMP 1600 – Week 11, Lecture 2 – A Ball Class and Bouncing Balls
info: |
  We design a Ball class whose objects know their color, position, size and
  velocity. Each ball can draw itself and update its own position, so an
  array of Ball objects fills the screen with bouncing balls.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 11</div>

# An array of objects can fill the screen with <span class="hl">motion</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>Class examples</span>
  <span>A Ball class</span>
  <span>Velocity and bouncing</span>
  <span>Arrays of objects</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <rect x="20" y="20" width="280" height="280" rx="14" fill="#ffffff" stroke="#0f172a" stroke-width="3" />
    <circle cx="96" cy="216" r="28" fill="#fff7ed" stroke="#c2410c" stroke-width="4" />
    <path d="M118 198 L 168 156" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <circle cx="214" cy="96" r="22" fill="#eef2ff" stroke="#3730a3" stroke-width="4" />
    <path d="M232 110 L 270 150" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <circle cx="232" cy="236" r="18" fill="#fff7ed" stroke="#c2410c" stroke-width="4" />
    <path d="M214 236 L 160 236" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
  </svg>
</div>
</div>

<!--
Welcome. Today we go back to class examples and build one complete, visual class: a Ball. Each Ball object knows its own color, position, size, and velocity, and can draw itself and update itself. Then we put many Ball objects in an array and make them bounce around the screen.

CS2023 mapping (indicative, introductory coverage): the primary knowledge area is Software Development Fundamentals (SDF); secondary are Graphics and Interactive Techniques (GIT) for animation and Mathematical and Statistical Foundations (MSF) for velocity as a change in position, with one Society, Ethics, and Professionalism (SEP) touchpoint on trusting simulations.

See also: Week 11 Lecture 1 (members, methods, and constants) and Week 12 Lecture 1 (hunters and prey, which builds directly on today's balls).
-->

---
minutes: 1
---

# By the end of today, you can do three things

<div class="card">

- **Design** the members of a class from a description of what it must do <span class="tag">SDF</span>
- **Write** an `update` method that moves an object and makes it bounce <span class="tag">SDF · MSF</span>
- **Use** an array of objects in an update-and-draw loop <span class="tag">SDF · GIT</span>

</div>

<!--
These are the three objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals, MSF is Mathematical and Statistical Foundations, and GIT is Graphics and Interactive Techniques.

All three are apply-level: by the end of class we have written the Ball class and a program that uses an array of balls. The same pattern, objects that update and draw themselves in a loop, is what Project 4 and the next lectures build on.

The drawing uses the same StdDraw library we used for the Game of Life.
-->

---
minutes: 3
---

# Predict first: what happens to vx?

<div class="cols wide-left center">
<div>

A ball's center is at `x = 0.97`, its radius is `0.03`, and its velocity `vx` is `0.01`.

The canvas runs from 0 to 1.

<p class="small">The ball moves one step: x becomes 0.98. Its right edge is now past 1. What should happen to <code>vx</code>?</p>

</div>
<div>

<Quiz
  :options="['It stays 0.01', 'It becomes -0.01', 'It becomes 0']"
  :answer="1"
  explain="-0.01. Flipping the sign of vx makes the ball move left: it bounces off the right wall."
/>

</div>
</div>

<!--
A ball's center is at x 0.97, its radius is 0.03, and its velocity in x is 0.01, so each step it moves 0.01 to the right. The canvas runs from 0 to 1. Before the step, its right edge is at 0.97 plus 0.03, exactly 1. After one step, x is 0.98, so its right edge, at 0.98 plus 0.03, is past the wall at 1. What should happen to vx?

The answer is that vx becomes minus 0.01. Flipping the sign makes the ball move left, which is exactly a bounce. That one idea, flip the velocity when you hit a wall, is most of today's update method.
-->

---
minutes: 2
---

# Last time: class examples, class variables, and constants

<div class="cols center">
<div class="card blue">

### Class examples

- A `Student` class
- A roster: an array of `Student` objects

</div>
<div class="card orange">

### Static and final

- **Class variables:** one copy for the whole class
- **Constants:** `final` and `static final`

</div>
</div>

<!--
What did we talk about last time? Class examples, class variables, and class constants.

We wrote a Student class and used an array of Student objects as a class roster. Then we met static members, one copy shared by the whole class, and constants declared with final, or static final for constants like Math.PI.

Today we write another class from scratch, and this time its objects move.
-->

---
layout: center
class: text-center
minutes: 4
---

# Project 4: where are you, and what is unclear?

<p class="small">Questions about the project or about last time are welcome now.</p>

<!--
A check-in on Project 4 and questions about last lecture.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Back to class examples

Designing and writing a Ball class.

<!--
Part 1 of 2. We design a Ball class: what each ball needs to know, and what it needs to be able to do.
-->

---
minutes: 3
---

# A Ball needs to know six things about itself

<div class="cols center">
<div>

| Member | Type |
| --- | --- |
| color | `Color` |
| x location | `double` |
| y location | `double` |
| radius | `double` |
| x velocity | `double` |
| y velocity | `double` |

</div>
<div class="card orange">

### Methods we need

- A **constructor** that sets all six
- `draw`: draw the ball
- `update`: move the ball over time

</div>
</div>

<!--
We can make a Ball class. Each Ball will have a color, which is a Color object; an x location and a y location, both doubles; a radius, a double; and an x velocity and a y velocity, both doubles.

We will need a constructor specifying these values, a method to draw the ball, and a method to update the position of the ball over time.

The two velocities say how far the ball moves in x and in y on each step. Color is a Color and not a String because StdDraw's setPenColor takes a Color object, the class from the Picture lectures to come, and from java.awt.
-->

---
minutes: 4
---

# The members are private; the constructor sets them

```java {2|3|4|5-10|all}
public class Ball {
    private Color color;
    private double x, y, radius;
    private double vx, vy;     // velocity
    public Ball(Color c, double newX, double newY,
                double r, double newVx, double newVy) {
        color = c;   radius = r;
        x = newX;    y = newY;
        vx = newVx;  vy = newVy;
    }
}
```

<style>
.slidev-layout { --slidev-code-font-size: 18px; }
</style>

<!--
Here are the members and the constructor. The highlighted lines move on each click.

Line 2: a private Color called color. Line 3: three private doubles, x and y for the location and radius for the size; Java lets us declare several variables of the same type on one line. Line 4: two private doubles, vx and vy, for the velocity: how much x and y change on each step.

Lines 5 to 10 are the constructor. It takes six parameters, one for each member, and copies each into its member; two short assignments share each line to keep it on one slide. This is the same pattern as the Point class from last lecture, just with more members. The parameters are called newX and so on instead of x so that the parameter does not hide the member with the same name.
-->

---
minutes: 3
---

# Velocity is how far the ball moves on each step

<div class="cols center">
<div>

- Each step, the ball moves by its velocity:
  `x += vx` and `y += vy`
- A **positive** `vx` moves right; **negative** moves left
- A **positive** `vy` moves up; **negative** moves down

</div>
<div>
<svg viewBox="0 0 300 230" class="vel" role="img" aria-label="A ball at position x, y with an arrow to its next position, x plus vx, y plus vy. The arrow is split into a horizontal part labeled vx and a vertical part labeled vy.">
  <defs>
    <marker id="vel-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
    </marker>
  </defs>
  <circle cx="70" cy="170" r="26" class="vel-ball" />
  <text x="70" y="218" class="vel-cap">(x, y)</text>
  <circle cx="220" cy="70" r="26" class="vel-ghost" />
  <text x="220" y="30" class="vel-cap">(x + vx, y + vy)</text>
  <path d="M96 170 L 194 170" class="vel-part" />
  <text x="145" y="194" class="vel-cap">vx</text>
  <path d="M220 170 L 220 98" class="vel-part" />
  <text x="242" y="140" class="vel-cap">vy</text>
  <path d="M90 152 L 198 86" class="vel-line" marker-end="url(#vel-arrow)" />
</svg>
</div>
</div>

<style>
.vel { width: 100%; max-height: 300px; }
.vel-ball { fill: var(--c-accent-2-soft); stroke: var(--c-accent-2); stroke-width: 4; }
.vel-ghost { fill: none; stroke: var(--c-accent-2); stroke-width: 3; stroke-dasharray: 6 5; }
.vel-cap { text-anchor: middle; font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; fill: var(--c-ink); }
.vel-part { fill: none; stroke: var(--c-muted); stroke-width: 2; stroke-dasharray: 5 5; }
.vel-line { fill: none; stroke: var(--c-accent); stroke-width: 4; }
</style>

<!--
Velocity is how far the ball moves on each step. Each step, x increases by vx and y increases by vy.

The diagram shows a ball at position x, y, and a dashed outline of the same ball at its next position, x plus vx, y plus vy. A solid arrow joins them. Dashed lines split that movement into a horizontal part, labeled vx, and a vertical part, labeled vy.

The signs give the direction: a positive vx moves right and a negative vx moves left; a positive vy moves up and a negative vy moves down. In StdDraw, y grows upward, unlike Picture, where y grows downward. Velocity is not the same as speed: speed is how fast; velocity also includes the direction, which is why it can be negative.
-->

---
minutes: 4
---

# update moves the ball, then flips its velocity at a wall

```java {2-3|4-5|6-7|all}
public void update() {
    x += vx;
    y += vy;
    if (x - radius < 0 || x + radius > 1)
        vx = -vx;      // hit the left or right wall
    if (y - radius < 0 || y + radius > 1)
        vy = -vy;      // hit the bottom or top wall
}
```

<div class="callout">StdDraw's canvas runs from 0 to 1 unless you change its scale.</div>

<!--
The update method moves the ball and makes it bounce. The highlighted lines move on each click.

Lines 2 and 3 move the ball by its velocity. Lines 4 and 5: if the left edge of the ball, x minus radius, has gone past 0, or its right edge, x plus radius, has gone past 1, the ball has hit a side wall, so we flip the sign of vx. Lines 6 and 7 do the same for the bottom and top walls with vy.

The callout explains the 0 and 1: StdDraw's canvas runs from 0 to 1 in both directions unless you change its scale with setXscale and setYscale. A simplification: if a ball moves far past a wall in one step, this simple flip can leave it stuck jiggling at the edge. With small velocities it works well.
-->

---
minutes: 2
---

# draw is two StdDraw calls

```java
public void draw() {
    StdDraw.setPenColor(color);
    StdDraw.filledCircle(x, y, radius);
}
```

<div class="cols" style="margin-top: 16px">
<div class="card blue">

### `update`

Changes the members. Draws nothing.

</div>
<div class="card orange">

### `draw`

Reads the members. Changes nothing.

</div>
</div>

<!--
The draw method is just two StdDraw calls: set the pen color to this ball's color, then draw a filled circle at this ball's x and y with this ball's radius.

The two cards make a design point: update changes the members and draws nothing; draw reads the members and changes nothing. Keeping the two jobs separate means we can update without drawing, for example to skip frames, or draw without moving, for example when paused.

StdDraw gets the color from our Color member. That is why the member's type is Color.
-->

---
minutes: 2
---

# Check: why compare x - radius with 0, and not x?

<div class="cols wide-left center">
<div>

```java
if (x - radius < 0 || x + radius > 1)
    vx = -vx;
```

<p class="small">What is wrong with testing <code>x &lt; 0</code> instead?</p>

</div>
<div>

<Quiz
  :options="['Nothing, it is the same', 'Half the ball would leave the screen first', 'The ball would never bounce']"
  :answer="1"
  explain="x is the center. With x < 0 the ball bounces only after its center reaches the wall, so half of it is already off the screen."
/>

</div>
</div>

<!--
The update method tests x minus radius less than 0, or x plus radius greater than 1. What would be wrong with testing just x less than 0?

The answer is B. x is the center of the ball, not its edge. With x less than 0, the ball would only bounce once its center reached the wall, so half of the ball would already be off the screen. Subtracting and adding the radius tests the edges instead.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Make them bounce

Many Ball objects, one loop.

<!--
Part 2 of 2. With the Ball class written, the program that uses it is short.
-->

---
minutes: 3
---

# An array holds many Ball objects

```java {1|2-7}
Ball[] balls = new Ball[20];
for (int i = 0; i < balls.length; i++) {
    double vx = 0.02 * Math.random() - 0.01;
    double vy = 0.02 * Math.random() - 0.01;
    balls[i] = new Ball(StdDraw.BLUE,
        Math.random(), Math.random(), 0.05, vx, vy);
}
```

<div class="callout"><code>new Ball[20]</code> makes 20 empty references. The loop creates the 20 objects.</div>

<!--
With the Ball class created, it is easy to make a program that shows balls bouncing all over the screen. First, we create an array of Ball objects.

Line 1 creates an array of 20 Ball references. Lines 2 to 7 fill it: for each index, pick a random velocity, then create a new Ball, blue, at a random position, with radius 0.05, and with random velocities between minus 0.01 and plus 0.01 in each direction. Math.random returns a number from 0 up to 1, so 0.02 times Math.random minus 0.01 is between minus 0.01 and 0.01.

The callout connects to Week 10: new Ball 20 only makes 20 empty references, all null. The objects themselves are created by the 20 calls to new Ball inside the loop. A ball that starts overlapping a wall will just bounce on its first steps.
-->

---
minutes: 4
---

# The animation loop updates and draws every ball, again and again

```java {1|3|4-7|8-9|all}
StdDraw.enableDoubleBuffering();
while (true) {
    StdDraw.clear();
    for (int i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }
    StdDraw.show();
    StdDraw.pause(20);
}
```

<!--
Then we update the balls and draw them repeatedly. The highlighted lines move on each click.

Line 1 turns on double buffering: drawing happens off screen, and nothing appears until we call show, which stops the animation from flickering. Line 3 clears the canvas at the start of each frame. Lines 4 to 7 loop over the array; each ball updates its own position and then draws itself. Lines 8 and 9 show the finished frame and pause 20 milliseconds, giving about 50 frames per second.

The loop never ends, so the program runs until you close the window. Notice how little this code knows about bouncing: all of that lives inside the Ball class. If you forget clear, every ball leaves a trail, because the old frames are never erased.
-->

---
minutes: 4
---

# Try it: every ball runs its own update

<BouncingBalls />

<!--
This interactive is the program we just wrote, on a canvas that runs from 0 to 1 in both directions, like StdDraw, with y growing upward. Each ball is numbered with its index in the array. The panel on the right lists the members of the selected ball: its color, x, y, radius, vx, and vy. Clicking any ball selects it. It starts paused with four balls.

Each press of Step moves every ball once, and the selected ball's x and y change by exactly vx and vy. Play runs the animation continuously. When a ball hits a side wall, the sign of its vx flips, and the label changes from "moving right" to "moving left"; the same happens to vy at the top and bottom.

Add ball creates another Ball object in the array, up to twelve, and Reset starts over. Every ball runs the same update method, but each one has its own members, so they all move differently.
-->

---
minutes: 2
---

# Check: what happens if the loop that creates the balls is missing?

<div class="cols wide-left center">
<div>

```java
Ball[] balls = new Ball[20];
// no loop creating the balls
balls[0].update();
```

</div>
<div>

<Quiz
  :options="['Nothing is drawn', 'NullPointerException', 'A default ball bounces']"
  :answer="1"
  explain="NullPointerException. new Ball[20] makes 20 null references, and calling update on null crashes the program."
/>

</div>
</div>

<!--
This question links back to Week 10. The array is created with new Ball 20, but the loop that calls new Ball for each element is missing. Then the program calls balls 0 dot update. What happens?

The answer is a NullPointerException. new Ball 20 creates an array of 20 references, and every one of them is null. Calling a method on null crashes the program.

This is one of the most common bugs with arrays of objects. The fix is the loop from two slides back.
-->

---
minutes: 3
---

# A simulation is only as good as its rules

<div class="cols center">
<div>

- Our balls ignore **gravity, friction, and collisions** with each other
- The animation still looks convincing
- Real simulations guide decisions: traffic, weather, disease

</div>
<div class="card orange">

### Discuss in pairs

A simulation looks realistic. How would you check whether its results can be trusted?

</div>
</div>

<!--
Society, ethics, and professionalism touchpoint. Our bouncing balls look convincing, but they ignore gravity, friction, and collisions between balls. That is fine for a demo; it would not be fine if someone used it to predict how real balls behave.

Real simulations, built from objects that update in a loop just like ours, are used to plan traffic, forecast weather, and model the spread of disease, and their results guide real decisions.

A question to consider: a simulation looks realistic; how would you check whether its results can be trusted? Good answers include: compare it with real measurements, state its simplifications openly, test cases with known answers, and let other people check the rules. Looking right is not the same as being right.
-->

---
minutes: 2
---

# Four things to remember from today

- A `Ball` keeps its color, position, radius, and velocity as **private members**
- `update` moves by the velocity and **flips** it at a wall
- `draw` only reads the members and draws
- An array of objects plus an update-and-draw loop makes an **animation**

<!--
In summary. One: a Ball keeps its color, position, radius, and velocity as private members, set by its constructor. Two: update moves the ball by its velocity and flips the sign of vx or vy when an edge passes a wall. Three: draw only reads the members and draws the ball. Four: an array of objects, with a loop that updates and draws each one, again and again, makes an animation.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Graphics and Interactive Techniques (GIT), Mathematical and Statistical Foundations (MSF)
- **Competency:** write a class whose objects update and draw themselves, and animate an array of them
- **Dispositions:** collaborative, meticulous, responsible
- **Society and ethics:** when a simulation's results can be trusted
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

# Next time: more class examples

<div class="cols">
<div class="card blue">

### Next time

- Class examples, continued

</div>
<div class="card orange">

### Reminders

- Work on Project 4
- Keep reading Chapter 9

</div>
</div>

<Credit />

<!--
Next time we continue with class examples, building on today's balls. Reminders: work on Project 4, and keep reading Chapter 9.

See also: Week 12 Lecture 1, where the balls become hunters and prey.
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
The exit ticket: scanning the QR code opens today's exit ticket form. If you cannot scan the code, ask for the link.
-->
