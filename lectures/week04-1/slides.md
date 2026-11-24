---
theme: ../../theme
title: COMP 1600 – Week 4, Lecture 1 – Conditions, if-else and Nesting
info: |
  We write conditions with the relational operators, then give programs two
  ways to go with if-else and the short conditional operator ?:. Finally we
  nest if-statements inside each other and chain them with else if.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 4</div>

# If the condition is true go one way, <span class="hl">else the other</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>== != &lt; &lt;= &gt; &gt;=</span>
  <span>if-else</span>
  <span>? :</span>
  <span>Nesting, else if</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <defs>
      <marker id="cover-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
      </marker>
    </defs>
    <path d="M160 20 L 270 100 L 160 180 L 50 100 Z" fill="#eef2ff" stroke="#3730a3" stroke-width="4" />
    <text x="160" y="108" text-anchor="middle" class="cover-art-name" style="font-size: 24px">balance &lt; 0</text>
    <path d="M105 140 L 70 222" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <path d="M215 140 L 250 222" fill="none" stroke="#3730a3" stroke-width="4" marker-end="url(#cover-arrow)" />
    <text x="62" y="180" text-anchor="middle" class="cover-art-name" style="font-size: 20px">true</text>
    <text x="260" y="180" text-anchor="middle" class="cover-art-name" style="font-size: 20px">false</text>
    <rect x="6" y="226" width="134" height="64" rx="12" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="73" y="266" text-anchor="middle" class="cover-art-obj" style="font-size: 20px">in debt</text>
    <rect x="180" y="226" width="134" height="64" rx="12" fill="#fff7ed" stroke="#c2410c" stroke-width="3" />
    <text x="247" y="266" text-anchor="middle" class="cover-art-obj" style="font-size: 20px">has $</text>
  </svg>
</div>
</div>

<!--
This lecture has four parts. First, a review of the if-statement. Second, conditions: any boolean expression, and especially the six relational operators that compare two values. Third, else, for choosing between two outcomes, and the conditional operator, question mark colon, which chooses between two values in a single expression. Fourth, nesting if-statements inside each other, and chains of else if.

The drawing on the right is a flowchart with a diamond asking "balance < 0". The true arrow leads to a box saying "in debt"; the false arrow leads to a box saying "has $". Unlike last lecture's if, both arrows lead somewhere: exactly one of the two boxes happens. That is an if-else.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for conditional statements and boolean expressions; secondary is Foundations of Programming Languages (FPL) for selection constructs and the conditional operator.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Write** conditions with `== != < <= > >=` <span class="tag">SDF</span>
- **Choose** between two outcomes with if-else <span class="tag">SDF</span>
- **Pick** one of two values with `condition ? a : b` <span class="tag">FPL</span>
- **Trace** nested ifs and else-if chains <span class="tag">SDF</span>

</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: SDF is Software Development Fundamentals and FPL is Foundations of Programming Languages.
-->

---
minutes: 2
---

# Predict first: what does this code print?

<div class="cols wide-left center">
<div>

```java
int x = 3;
if (x == 4)
    System.out.println("four");
    System.out.println("done");
```

<p class="small">There are no braces. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['Nothing', 'done', 'four\ndone']"
  :answer="1"
  explain="done. Without braces, the if controls only the next statement. The indentation of the last line means nothing to Java: it always runs."
/>

</div>
</div>

<!--
The code sets x to 3, then has an if with no braces, followed by two indented printlns.

The answer is that it prints "done". Without braces, an if controls only the single statement right after it, the println of "four". That one is skipped, because 3 == 4 is false. The second println is indented as if it belonged to the if, but Java ignores indentation: it is the next statement after the if, and it always runs.

"Nothing" assumes both lines belong to the if. "four done" ignores the condition. The braces slide later today explains this rule.
-->

---
minutes: 1
---

# Last time: wrapper classes, examples, and if-statements

<div class="cols center">
<div class="card blue">

### Wrapper classes

- `Integer.parseInt`, `Double.parseDouble`
- `Character.isDigit` and friends

</div>
<div class="card orange">

### if-statements

- Run code only when a condition is true

</div>
</div>

<!--
What did we talk about last time? Wrapper classes: Integer and Double for converting between Strings and numbers, and Character for testing chars; some example programs; and the if-statement, which runs code only when a condition is true.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: wrapper classes, the example programs, and the if-statement.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Conditional execution

A quick review.

<!--
Part 1 of 4. A review of the if-statement from last lecture.
-->

---
minutes: 1
---

# Until now, programs did one thing after another

- So far: Java programs that run **in sequence**
- They could not **choose** between possibilities
- Now, they will!

<!--
So far we have only considered Java programs that do one thing after another, in sequence. Our programs have not had the ability to choose between different possibilities. Now, they will.
-->

---
minutes: 1.5
---

# Behold the if-statement: code that runs only when a condition is true

<div class="cols wide-left center">
<div>

```java
int x = 4;
if (x < 5) {
    System.out.println("x is small!");
}
```

</div>
<div>

- `x is small!` prints **only if** x is less than 5
- Here we know it is, but x could come from **user input** or a file

</div>
</div>

<!--
Behold! The if-statement. "x is small!" will only print out if x is less than 5. In this case, we know that it is, since x is 4, but x could come from user input, a file, or elsewhere, and then the program decides while it runs.
-->

---
minutes: 1.5
---

# Anatomy of an if: a condition and a block of statements

<div class="anat">

<div class="an-code">
<span class="an-if">if</span>( <span class="an-cond">condition</span> ){<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="an-st">statements;</span><br>
}
</div>

<div class="an-labels">
<div><span class="an-if">if</span> The if part</div>
<div><span class="an-cond">condition</span> Any boolean expression</div>
<div><span class="an-st">statements;</span> Executable statements</div>
</div>

</div>

<style>
.anat { display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; align-items: center; margin-top: 10px; }
.an-code { font-family: var(--slidev-font-mono, monospace); font-size: 34px; font-weight: 700; line-height: 1.9; }
.an-if, .an-cond, .an-st { padding: 1px 8px; border-radius: 8px; border: 3px solid; }
.an-if { border-color: var(--c-accent); color: var(--c-accent); }
.an-cond { border-color: var(--c-accent-2); color: var(--c-accent-2); }
.an-st { border-color: #15803d; color: #15803d; border-style: dashed; }
.an-labels { display: flex; flex-direction: column; gap: 16px; font-size: 22px; }
.an-labels span { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; margin-right: 10px; border-width: 2px; }
</style>

<!--
The anatomy of an if, with each part boxed in its own color. The word if, in indigo, is the if part. Inside the parentheses, in orange, is the condition, which can be any boolean expression. Inside the braces, dashed in green, are the executable statements, which run only when the condition is true.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Conditions

What can go inside the parentheses.

<!--
Part 2 of 4. Conditions: what can go inside the parentheses of an if.
-->

---
minutes: 1.5
---

# Any expression that evaluates to a boolean is a legal condition

<div class="cols center">
<div>

```java
x == y
true
Character.isDigit('r')
s.equals("Help me!") && (z < 4)
```

</div>
<div>

- A comparison
- A boolean literal
- A method that gives back a boolean
- Booleans combined with `&&`, `||`, `!`

</div>
</div>

<!--
Any statement that evaluates to a boolean is legal as a condition. Examples: x == y, a comparison, which is true when x and y are equal. true, a boolean literal; an if with condition true always runs, which is legal but pointless. Character.isDigit('r'), a method that gives back a boolean, here false. And s.equals("Help me!") && (z < 4), two booleans combined with AND, which is true only if s is "Help me!" and z is less than 4.

What is not legal is a condition of another type: if (x), where x is an int, is a compile error in Java, even though some other languages allow it.
-->

---
minutes: 1.5
---

# Six relational operators compare two values

<div class="cols center">
<div>

| Operator | Meaning |
| --- | --- |
| `==` | equals |
| `!=` | does not equal |
| `<` | less than |
| `<=` | less than or equal to |
| `>` | greater than |
| `>=` | greater than or equal to |

</div>
<div class="card">

The most common condition is a **comparison** between two things. These operators are called **relational operators**.

</div>
</div>

<!--
The most common condition you will find is a comparison between two things. In Java, that comparison can be: double equals for equals; exclamation mark equals for does not equal; less than; less than or equal to, written with the less-than sign followed by equals; greater than; and greater than or equal to. These are called relational operators. Each one compares two values and gives back a boolean.

The two-character operators are always written in this order, with the equals sign second: <= and >=, never =< or =>.
-->

---
minutes: 2
---

# `==` compares two things of the same type

- Any two things of the **same type**
- Different numerical types too: `3 == 3.0` is true
- **Careful with doubles:** 0.33333333 ≠ 0.33333332

```java
int x = 3;
if (x == 4) {
    System.out.println("This doesn't print");
}
```

<!--
You can use the double equals operator to compare any two things of the same type. Different numerical types can be compared as well: 3 == 3.0 is true, because the int 3 is converted to the double 3.0 before comparing. In the code, x is 3, so x == 4 is false and "This doesn't print" does not print.

Be careful with double types: 0.33333333 is not equal to 0.33333332, even though they differ only in the last digit. Because doubles are stored in binary with tiny rounding errors, even 0.1 + 0.2 == 0.3 is false in Java. Comparing doubles for exact equality is risky; checking whether they are very close is safer, and comes later.

For Strings, use equals, not ==, as last lecture showed.
-->

---
minutes: 1.5
---

# `!=` is the opposite of `==`

<div class="cols center">
<div>

- Anywhere you can use `==`, you can use `!=`
- If `==` gives true, `!=` gives false, and vice versa
- `!` negates **any** condition

</div>
<div>

```java
if (x != 4)
```

<p class="small" style="text-align: center">is the same as</p>

```java
if (!(x == 4))
```

</div>
</div>

<!--
Any place you could have used the double equals operator, you can use the not equals operator, exclamation mark equals. If double equals gives true, not equals will always give false, and vice versa.

If you want to negate a condition, you can always use the exclamation mark as a NOT. if (x != 4) is the same as if (!(x == 4)). The parentheses around x == 4 are needed: NOT applies first otherwise, and !x is not allowed for an int.
-->

---
minutes: 2
---

# `=` is not `==`: one assigns, the other compares

- `=` is **assignment**: a left-pointing arrow; `==` is a **comparison**

<div class="cols">
<div>

```java
int y = 10;
if (y = 6) {
    …
}
```

<p class="small">✗ <b>Compiler error!</b> y = 6 is an int, not a boolean.</p>

</div>
<div>

```java
boolean b = false;
if (b = false) {
    …
}
```

<p class="small">⚠ <b>No error, but wrong:</b> it assigns false to b, so the condition is always false.</p>

</div>
</div>

<!--
Remember, a single equals sign is the assignment operator; think of a left-pointing arrow. A double equals is a comparison operator.

In the first example, y is 10, and the condition is y = 6, with one equals sign. That stores 6 in y, and the result is the int 6, not a boolean, so it is a compiler error: an int cannot be converted to a boolean. The compiler catches this mistake for numbers.

The second example is worse. b is false, and the condition is b = false, again with one equals sign. That stores false in b, and the result is false, which is a boolean, so it compiles without any error. But the block never runs, no matter what b was before. It is wrong, and nothing warns you. For booleans, the cleanest style avoids comparing at all: if (!b) instead of if (b == false).
-->

---
minutes: 1.5
---

# `<` and `<=` check a threshold: watch strict vs non-strict

- Act while a value is **below a threshold**
- Example: keep bidding at an auction until the price is more than you can afford
- **Strict** `<` vs **non-strict** `<=`

```java
if (x <= 4) {
    System.out.println("x is less than 5");
}
```

<!--
Inequality is important in programming. You may want to take an action as long as a value is below a certain threshold. For example, you might want to keep bidding at an auction until the price is greater than what you can afford.

Watch for strict inequality, less than, versus non-strict inequality, less than or equal to. In the code, x <= 4 prints "x is less than 5". For ints, x <= 4 and x < 5 mean exactly the same thing. For doubles they do not: 4.5 is less than 5 but not less than or equal to 4. Choosing the wrong one is called an off-by-one error, one of the most common bugs.
-->

---
minutes: 1.5
---

# The opposite of <= is >, not >=

- Just like less than or equal to, except the opposite
- Thanks to the All-Powerful Math Gods:

| Negated | Equivalent |
| --- | --- |
| `!(x <= y)` | `x > y` |
| `!(x >= y)` | `x < y` |

<!--
Greater than, and greater than or equal to, are just like less than or equal to, except the opposite. Note that, because of the All-Powerful Math Gods, the opposite of less than or equal to is greater than, and the opposite of greater than or equal to is less than. Thus, NOT (x <= y) is equivalent to x > y, and NOT (x >= y) is equivalent to x < y.

The common mistake is to think the opposite of <= is >=. It is not: if x equals y, then x <= y is true, so its opposite must be false, and x >= y would also be true. Only x > y is false when they are equal.
-->

---
minutes: 1.5
---

# Check: what is the opposite of x >= 10?

<div class="cols wide-left center">
<div>

```java
if (!(x >= 10)) {
    System.out.println("single digits");
}
```

</div>
<div>

<Quiz
  :options="['x <= 10', 'x < 10', 'x > 10']"
  :answer="1"
  explain="x < 10. The opposite of >= is <. At x = 10, x >= 10 is true, so its opposite must be false, and only x < 10 is false there."
/>

</div>
</div>

<!--
Which condition means the same as NOT (x >= 10)?

The answer is x < 10. The opposite of greater than or equal to is strictly less than. The way to check is the boundary: at x = 10, x >= 10 is true, so NOT (x >= 10) is false. x < 10 is also false at 10, so they agree. x <= 10 is true at 10, so it disagrees. x > 10 points the wrong way entirely.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Else

One way or the other.

<!--
Part 3 of 4. else, for choosing between two outcomes, and the conditional operator.
-->

---
minutes: 1
---

# Either/or: sometimes you have to make a decision

- If a condition is true, you go one way; if not, the other
- For example:
  - **If** I pass COMP 1600,
    - **then** I throw a kegger to celebrate
  - **Otherwise,**
    - I will ...

<!--
Sometimes you have to make a decision: if a condition is true, you go one way; if not, you go the other. For example: if I pass COMP 1600, then I throw a kegger to celebrate. Otherwise, I will ... . The condition is passing the course; there is one action for true and a different action for false.
-->

---
minutes: 1
---

# Exclusivity: exactly one of the two outcomes happens

- Notice the nature of this kind of condition
- **Both outcomes cannot happen**
- Either a kegger gets thrown, or you will ...
- For these situations, we use the **else** construct

<!--
Notice the nature of this kind of condition. Both outcomes cannot happen: either a kegger gets thrown or Dr. Wittman gets punched in the face, never both, and never neither. For these situations, we use the else construct.

Two separate ifs, one checking passing and one checking not passing, would also work, but they check the condition twice and invite mistakes. else says directly: in every other case.
-->

---
minutes: 1.5
---

# Anatomy of an if-else: two different outcomes

<div class="anat2">

<div class="an-code2">
if( <span class="an-cond">condition</span> ) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="an-a">statements1;</span><br>
}<br>
else {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="an-b">statements2;</span><br>
}
</div>

<div class="an-labels2">
<div><span class="an-a">statements1;</span> run when the condition is <b>true</b></div>
<div><span class="an-b">statements2;</span> run when it is <b>false</b></div>
</div>

</div>

<style>
.anat2 { display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; align-items: center; }
.an-code2 { font-family: var(--slidev-font-mono, monospace); font-size: 30px; font-weight: 700; line-height: 1.7; }
.an-cond, .an-a, .an-b { padding: 1px 8px; border-radius: 8px; border: 3px solid; }
.an-cond { border-color: var(--c-accent-2); color: var(--c-accent-2); }
.an-a { border-color: #15803d; color: #15803d; }
.an-b { border-color: var(--c-accent); color: var(--c-accent); border-style: dashed; }
.an-labels2 { display: flex; flex-direction: column; gap: 18px; font-size: 22px; }
.an-labels2 span { font-family: var(--slidev-font-mono, monospace); font-size: 18px; margin-right: 10px; border-width: 2px; }
</style>

<!--
The anatomy of an if-else, with two different outcomes. if, the condition in parentheses, and a first block of statements, statements1, in green; then the keyword else and a second block, statements2, in dashed indigo. statements1 run when the condition is true; statements2 run when it is false. Exactly one of the two blocks runs, every time. The else has no condition of its own: it means "otherwise".
-->

---
minutes: 2
---

# else example: in debt or not?

```java
Scanner in = new Scanner(System.in);
int balance = in.nextInt();
```

<ElseDemo />

<!--
An else example. The program reads an int balance. If balance is less than 0, it prints "You are in debt!"; else, it prints "You have $" followed by the balance.

The interactive on the right has a slider for balance, from negative 50 to 50. The condition's value is shown next to it, the branch that runs is highlighted, the other is crossed out, and the console shows the output. At 25 it prints "You have $25". At negative 5 it prints "You are in debt!". At exactly 0, 0 < 0 is false, so it prints "You have $0".
-->

---
minutes: 2
---

# The conditional operator `? :` picks one of two values

<div class="tsyn">condition <span>?</span> valueIfTrue <span>:</span> valueIfFalse</div>

```java
String status = (balance < 0) ? "in debt" : "fine";
System.out.println(n + (n == 1 ? " apple" : " apples"));
```

- A short **if-else that gives back a value**: it is an expression, not a statement
- Use it for **simple** choices; use if-else when there are statements to run

<style>
.tsyn { font-family: var(--slidev-font-mono, monospace); font-size: 30px; font-weight: 700; text-align: center; margin: 4px 0 14px; }
.tsyn span { color: var(--c-accent-2); }
</style>

<!--
Java has a shorter way to write an if-else that picks between two values: the conditional operator, written with a question mark and a colon. It is also called the ternary operator, because it has three parts. The syntax is: condition, question mark, the value to use if the condition is true, colon, the value to use if it is false.

In the first example, if balance < 0, status becomes "in debt"; otherwise it becomes "fine". In the second, the condition n == 1 chooses between " apple" and " apples", so the output reads "1 apple" but "3 apples".

It is an expression: it produces a value, so it can go anywhere a value can go, on the right of an equals sign or inside a println. An if-else is a statement, which runs code but produces no value. The two values must be of compatible types, since the result has to fit where it is used. Use the conditional operator for simple choices between two values; when there are statements to run, or the condition is long, an if-else is clearer.
-->

---
minutes: 2
---

# Try it: `max = (a > b) ? a : b`

<TernaryDemo />

<!--
The interactive computes the larger of two ints with the conditional operator: int max = (a > b) ? a : b. The plus and minus buttons set a and b, from negative 9 to 9. The value that gets chosen is highlighted, and the sentence underneath explains why.

It starts with a = 3 and b = 8: 3 > 8 is false, so the second value, b, is chosen, and max is 8. Making a larger than b chooses a instead. When they are equal, a > b is false, so b is chosen, which is the same number anyway.

The box underneath shows the same logic as an if-else: declare max, then if a > b assign a, else assign b. The conditional operator does this in one line. Java also has Math.max(a, b), which does the same job.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 4</div>

# Nesting

Decisions inside decisions.

<!--
Part 4 of 4. Nesting: if-statements inside if-statements, and else-if chains.
-->

---
minutes: 1.5
---

# A special exception: braces are optional for a single statement

- Braces can hold one or many statements
- With **only one** statement, you may leave them off
- Use braces until you really know what you're doing; some programmers always do

<div class="cols">
<div>

```java
if (x == 4) {
  System.out.println("I hate 4");
}
```

</div>
<div>

```java
if (x == 4)
  System.out.println("I hate 4");
```

<p class="small">Braces not needed: only one statement.</p>

</div>
</div>

<style>
.slidev-layout .slidev-code { font-size: 19px !important; }
</style>

<!--
You can have one or many statements inside the braces of an if or an else. However, you can optionally leave off the braces if there's only a single statement. The two versions of the code do the same thing: print "I hate 4" when x is 4.

It's probably a good idea to use the braces until you really know what you're doing, and some programmers always use them. The danger is the opening question: without braces, only the first statement belongs to the if, and adding a second indented line later does not make it part of the if, whatever the indentation suggests.
-->

---
minutes: 1
---

# Nesting: if-statements can go inside other if-statements

- Sometimes one set of decisions depends on another
- If-statements can be **nested** inside the bodies of other if-statements
- As deep as you like: ifs inside ifs inside ifs…

<!--
Sometimes you want to make one set of decisions based on another set of decisions. if-statements can be nested inside the bodies of other if-statements. You can put if-statements inside of if-statements inside of if-statements, going arbitrarily deep. In practice, more than two or three levels becomes hard to read.
-->

---
minutes: 1.5
---

# Nested ifs: an inner if runs only if the outer one does

```java
if (condition1) {
    statement1;
    if (condition2) {
        if (condition3)
            statement2;
        …
    }
}
```

<!--
The general shape of nested ifs. If condition1 is true, statement1 runs, and then the program checks condition2. If condition2 is also true, it checks condition3, and if that is true too, statement2 runs. So statement2 runs only when all three conditions are true, and condition3 is not even checked unless condition1 and condition2 are both true. The innermost if has no braces, which is allowed because it controls a single statement.
-->

---
minutes: 1.5
---

# An example using the four quadrants of the plane

<div class="cols center">
<div>
<svg viewBox="0 0 300 300" class="quad" role="img" aria-label="The Cartesian plane: a horizontal x axis and a vertical y axis crossing at the origin, 0 comma 0. Quadrant 1 is top right, 2 top left, 3 bottom left, 4 bottom right.">
  <line x1="20" y1="150" x2="280" y2="150" class="q-ax" />
  <line x1="150" y1="20" x2="150" y2="280" class="q-ax" />
  <text x="270" y="140" class="q-l">x</text>
  <text x="14" y="140" class="q-l">-x</text>
  <text x="160" y="30" class="q-l">y</text>
  <text x="160" y="280" class="q-l">-y</text>
  <text x="160" y="170" class="q-o">(0,0)</text>
  <text x="215" y="90" class="q-n">1</text>
  <text x="85" y="90" class="q-n">2</text>
  <text x="85" y="225" class="q-n">3</text>
  <text x="215" y="225" class="q-n">4</text>
</svg>
</div>
<div>

- Recall the **four quadrants** of the Cartesian coordinate system
- Numbered **counterclockwise**, starting at the top right

</div>
</div>

<style>
.quad { width: 100%; max-height: 300px; }
.q-ax { stroke: var(--c-ink); stroke-width: 3; }
.q-l { font-family: var(--slidev-font-mono, monospace); font-size: 20px; font-weight: 700; fill: var(--c-muted); }
.q-o { font-family: var(--slidev-font-mono, monospace); font-size: 18px; fill: var(--c-muted); }
.q-n { text-anchor: middle; font-size: 40px; font-weight: 700; fill: var(--c-accent-2); }
</style>

<!--
For the next example, recall the four quadrants of the Cartesian coordinate system. The diagram shows a horizontal x axis, with positive x to the right and negative x to the left, and a vertical y axis, with positive y up and negative y down, crossing at the origin, (0,0). The quadrants are numbered counterclockwise: 1 at the top right, where x and y are both positive; 2 at the top left; 3 at the bottom left, where both are negative; and 4 at the bottom right.
-->

---
minutes: 3
---

# Nesting example: find which quadrant the point (x, y) is in

<QuadrantDemo />

<!--
Find which quadrant the point (x, y) is in. The code is a nested if-else. The outer if checks x >= 0.0. If it is true, the point is on the right, and an inner if-else checks y >= 0.0: true prints "Quadrant 1", false prints "Quadrant 4". If the outer condition is false, the point is on the left, and the else block has its own inner if-else: y >= 0.0 prints "Quadrant 2", otherwise "Quadrant 3".

The interactive shows the plane on the left; clicking it, or using the x and y sliders, moves the point. On the right is the code, with the value of each condition that is checked, the lines on the path taken in dark text, the println that runs highlighted, and the quadrant printed underneath. Only two conditions are ever checked for any point: the outer one, and one of the two inner ones.

Points on an axis follow the code's choice of >= : the origin, and the point (0, -3), count as quadrants 1 and 4. Mathematically, points on an axis belong to no quadrant; a real program might handle them separately.
-->

---
minutes: 2
---

# if and else if list a sequence of exclusive possibilities

<ElseIfDemo />

<!--
You can list a sequence of exclusive possibilities using nesting. The code checks if index == 1, printing "First"; else if index == 2, printing "Second"; else if index == 3, printing "Third"; else printing index followed by "th".

The interactive has a slider for index, from 0 to 25. The conditions are checked from the top. The first one that is true runs its println, highlighted, and everything after it is skipped, marked "not checked". If none is true, the final else runs. At 2, the first test is false, the second is true, and it prints "Second"; the third test is never checked.

Some outputs show the limits of this code: 21 prints "21th" and 0 prints "0th". Handling 21st, 22nd, and 23rd would need more conditions, for example using index % 10.
-->

---
minutes: 2
---

# else-if doesn't actually exist: it is an if inside an else

<div class="cols center">
<div>

```java
if (…)
    statement1;
else if (…)
    statement2;
else
    statement3;
```

</div>
<div class="eq">=</div>
<div>

```java
if (…) {
    statement1;
}
else {
    if (…)
        statement2;
    else
        statement3;
}
```

</div>
</div>

<p class="small">A block counts as one statement, and so does a whole if-else.</p>

<style>
.cols.center { grid-template-columns: 1fr auto 1fr; }
.eq { font-size: 48px; font-weight: 700; color: var(--c-accent-2); }
</style>

<!--
else-if doesn't actually exist in Java. A block of code in braces is treated just like one statement, and a whole if-else is treated the same way, as one statement.

The left version reads: if something, statement1; else if something, statement2; else statement3. The right version is the same code written with braces: if something, statement1; else, a block containing an if-else that chooses between statement2 and statement3. The equals sign between them says they are identical to Java. "else if" is just an else whose single statement happens to be another if. Writing it on one line, without the extra braces and indentation, keeps long chains readable.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- Conditions are booleans: `== != < <= > >=`, `&&`, `||`, `!`
- `=` assigns, `==` compares; the opposite of `<=` is `>`
- if-else: exactly **one** of two blocks runs
- `cond ? a : b` picks a **value**
- Without braces, an if controls **one** statement; else if is an if inside an else

<!--
Summary. One: a condition is any boolean expression, usually built from the relational operators and combined with AND, OR, and NOT. Two: a single equals sign assigns while a double equals compares, and the opposite of <= is >, not >=. Three: in an if-else, exactly one of the two blocks runs. Four: the conditional operator, condition ? a : b, picks one of two values in an expression. Five: without braces an if controls only one statement, and else if is simply an if placed inside an else.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related area:** Foundations of Programming Languages (FPL)
- **Competency:** write and trace conditional statements, including nesting and the conditional operator
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

# Next time: examples, pitfalls, and switch statements

<div class="cols">
<div class="card blue">

### Next time

- Examples
- Pitfalls with if statements
- **switch** statements

</div>
<div class="card orange">

### Reminders

- Keep reading Chapter 4

</div>
</div>

<Credit />

<!--
Next time: more examples, pitfalls with if-statements, and switch statements. Reminder: keep reading Chapter 4 of the textbook.
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
