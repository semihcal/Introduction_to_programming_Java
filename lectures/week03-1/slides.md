---
theme: ../../theme
title: COMP 1600 – Week 3, Lecture 1 – char and String Operations
info: |
  We review the boolean operators, then work with characters: stepping
  through letters, character codes in the ASCII table, and escape sequences.
  Then we join Strings with + and use String methods such as equals, length,
  charAt and substring.
layout: cover
minutes: 1
---

<div class="cover-grid">
<div class="cover-text">

<div class="cover-pill">COMP 1600 · Week 3</div>

# A String is a row of chars, <span class="hl">counted from 0</span>

<p class="cover-course">Introduction to Programming</p>

<div class="cover-topics">
  <span>char arithmetic</span>
  <span>ASCII</span>
  <span>Escape sequences</span>
  <span>String methods</span>
</div>

</div>
<div class="cover-art" aria-hidden="true">
  <svg viewBox="0 0 320 320">
    <g font-family="JetBrains Mono, monospace" font-weight="700" text-anchor="middle">
      <rect x="4" y="110" width="48" height="60" rx="8" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="28" y="152" style="font-size: 30px" fill="#0f172a">w</text><text x="28" y="196" style="font-size: 20px" fill="#475569">0</text>
      <rect x="56" y="110" width="48" height="60" rx="8" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="80" y="152" style="font-size: 30px" fill="#0f172a">a</text><text x="80" y="196" style="font-size: 20px" fill="#475569">1</text>
      <rect x="108" y="110" width="48" height="60" rx="8" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="132" y="152" style="font-size: 30px" fill="#0f172a">l</text><text x="132" y="196" style="font-size: 20px" fill="#475569">2</text>
      <rect x="160" y="110" width="48" height="60" rx="8" fill="#3730a3" stroke="#3730a3" stroke-width="3" /><text x="184" y="152" style="font-size: 30px" fill="#ffffff">n</text><text x="184" y="196" style="font-size: 20px" fill="#3730a3">3</text>
      <rect x="212" y="110" width="48" height="60" rx="8" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="236" y="152" style="font-size: 30px" fill="#0f172a">u</text><text x="236" y="196" style="font-size: 20px" fill="#475569">4</text>
      <rect x="264" y="110" width="48" height="60" rx="8" fill="#fff7ed" stroke="#c2410c" stroke-width="3" /><text x="288" y="152" style="font-size: 30px" fill="#0f172a">t</text><text x="288" y="196" style="font-size: 20px" fill="#475569">5</text>
      <text x="160" y="76" style="font-size: 22px" fill="#3730a3">charAt(3) → 'n'</text>
    </g>
  </svg>
</div>
</div>

<!--
This lecture has three parts. First, a review of the boolean operators NOT, AND, and OR. Second, operations on char values: incrementing a char, turning a char into a number, the ASCII table, and escape sequences for characters that are hard to type. Third, operations on String values: concatenation with the plus operator, and the String methods equals, compareTo, length, charAt, and substring. It ends with a worked example that prints a person's initials.

The drawing on the right shows the String "walnut" as six boxes, one per character, numbered 0 to 5 underneath. The box for index 3, the letter n, is highlighted, with the label charAt(3) gives 'n'. Positions in a String are counted from 0.

CS2023 mapping (indicative, introductory coverage): primary knowledge area is Software Development Fundamentals (SDF) for String operations and using library methods; secondary are Foundations of Programming Languages (FPL) for how + depends on types, and Architecture and Organization (AR) for character encoding.
-->

---
hide: true
minutes: 1
---

# By the end of today, you can do four things

<div class="card">

- **Predict** what `+` does with a String and a number <span class="tag">FPL</span>
- **Convert** between a char and its code, and use escape sequences <span class="tag">AR</span>
- **Use** `equals`, `compareTo`, `length`, `charAt`, and `substring` <span class="tag">SDF</span>
- **Write** a program that prints a person's initials <span class="tag">SDF</span>
</div>

<!--
These are the four objectives for today. The tags are CS2023 knowledge area codes: FPL is Foundations of Programming Languages, AR is Architecture and Organization, and SDF is Software Development Fundamentals.
-->

---
minutes: 2
---

# Predict first: what does this line print?

<div class="cols wide-left center">
<div>

```java
System.out.println(1 + 2 + " is " + 1 + 2);
```

<p class="small">+ adds numbers, and also joins Strings. Decide with a neighbor, then click.</p>

</div>
<div>

<Quiz
  :options="['3 is 3', '3 is 12', '12 is 12']"
  :answer="1"
  explain="3 is 12. + goes left to right: 1 + 2 is 3 (two ints), then &quot;3 is &quot;, then + 1 and + 2 join onto a String, giving &quot;3 is 12&quot;."
/>

</div>
</div>

<!--
The line prints 1 + 2 + " is " + 1 + 2. The plus sign adds numbers, but it also joins Strings together.

The answer is "3 is 12". Plus is worked left to right. 1 + 2 has two ints, so it is addition: 3. Then 3 + " is " has a String, so it joins them: "3 is ". From then on the left side is a String, so + 1 joins the text 1, giving "3 is 1", and + 2 joins the text 2, giving "3 is 12".

"3 is 3" assumes the second 1 + 2 is added first, but nothing groups it. "12 is 12" assumes everything is joined as text, but the first two numbers are added before any String appears. Today's String section explains this.
-->

---
minutes: 1
---

# Last time: Math methods and boolean operations

<div class="cols center">
<div class="card blue">

### Math methods

- `Math.sqrt`, `Math.pow`, `Math.sin`, `Math.round`, …

</div>
<div class="card orange">

### boolean operations

- `!` &nbsp; `&&` &nbsp; `||` &nbsp; `^`

</div>
</div>

<!--
What did we talk about last time? Math methods, such as Math.sqrt, Math.pow, Math.sin, and Math.round; and boolean operations: NOT, AND, OR, and XOR.
-->

---
layout: center
class: text-center
minutes: 1
---

# Questions about last time?

<!--
Time for questions about last lecture: casting, Math methods, and the boolean operators.
-->

---
minutes: 1.5
---

# `System.out.format()` prints a double with a set number of decimals

```java
double x = 5.74961;
System.out.format("%.2f", x); // prints 5.75

// prints Total = $15.78 before tax
System.out.format("Total = $%.2f before tax", 15.7777);
```

- For Project 1: `"%.2f"` or `"%.3f"` gives 2 or 3 decimal places
- Include **other text** in the formatting string to save effort

<!--
A reminder for Project 1: the easiest way to print out data with 2 or 3 decimal places is to put "%.2f" or "%.3f" in the formatting string for System.out.format.

The first example prints 5.74961 rounded to 2 decimal places: 5.75. You can save a lot of effort by including other text in the formatting string: the second example prints "Total = $15.78 before tax", with the placeholder replaced by 15.7777 rounded to 2 places.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 1</div>

# Operations on booleans

A quick review.

<!--
Part 1 of 3. A review of three boolean operators from last lecture.
-->

---
minutes: 1
---

# The ! operator (NOT) flips true and false

<div class="cols center">
<div>

- The **NOT** operator
- Changes a true into a false, or a false into a true

</div>
<div>

| `x` | `!x` |
| --- | --- |
| `true` | `false` |
| `false` | `true` |

</div>
</div>

<!--
The exclamation mark is the NOT operator. It changes a true into a false or a false into a true. The truth table lists both values of x: when x is true, NOT x is false; when x is false, NOT x is true.
-->

---
minutes: 1
---

# The && operator (AND) is true only if both are true

<div class="cols center">
<div>

- The **AND** operator
- *If I can swim AND the pool is not filled with acid, then I will survive*

</div>
<div>

| `x` | `y` | `x && y` |
| --- | --- | --- |
| `true` | `true` | **`true`** |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

</div>
</div>

<!--
The double ampersand is the AND operator. It gives back true only if both things being combined are true. For example: if I can swim AND the pool is not filled with acid, then I will survive. The truth table shows x && y is true only in the first row, where both x and y are true.
-->

---
minutes: 1
---

# The || operator (OR) is true if either or both are true

<div class="cols center">
<div>

- The **OR** operator
- *If I get punched in the face OR kicked in the stomach, then I will be in pain*

</div>
<div>

| `x` | `y` | `x \|\| y` |
| --- | --- | --- |
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | **`false`** |

</div>
</div>

<!--
The double vertical bar is the OR operator. It gives back true if either or both things being combined are true. For example: if I get punched in the face OR kicked in the stomach, then I will be in pain. The truth table shows x || y is false only in the last row, where both are false.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 2</div>

# Operations on char values

Characters are stored as numbers.

<!--
Part 2 of 3. What can you do with a single character?
-->

---
minutes: 2
---

# A char can be incremented and decremented

<div class="cols wide-left center">
<div>

- What operations would you expect on chars?
- Multiplication and division don't make sense
- But we **can** increment and decrement a char

```java {1|2|3|4|5}
char letter;
letter = 'x';  // letter contains 'x'
letter++;      // letter contains 'y'
letter++;      // letter contains 'z'
letter++;      // letter contains ?
```

</div>
<div class="mem" role="img" aria-label="letter goes x, y, z, then the left curly brace.">
  <div class="mem-row"><span class="mem-label">letter</span><span class="mem-value">{{ ['', "'x'", "'y'", "'z'", "'{'"][Math.min($clicks, 4)] }}</span></div>
</div>
</div>

<style>
.mem-value { min-height: 66px; min-width: 130px; }
</style>

<!--
What kinds of operations would you expect on chars? Multiplication and division don't seem to make sense. What is 'q' times 'r'? But we can increment and decrement a char.

The code sets letter to 'x'. letter++ moves it to the next character, 'y', and another letter++ moves it to 'z'. The last letter++ asks: what comes after 'z'? Not 'a', and not an error: the next character in the table of character codes, which is the left curly brace. The box on the right shows letter changing: 'x', 'y', 'z', then the left curly brace.

This works because every char is stored as a number, its character code. Incrementing a char adds 1 to its code. 'z' is 122, and 123 is the left curly brace.
-->

---
minutes: 2
---

# A char converts to an int, its character code

<div class="cols wide-left center">
<div>

```java
int number;
number = 'a';  // number contains 97
```

```java
char letter = 'r';
int number;
number = letter - 'a' + 1; // number is 18
```

</div>
<div>

- A char converts to an **int**
- Often more useful: the **offset** from a starting point
- 'r' − 'a' is 17, so 'r' is letter **18**

</div>
</div>

<!--
Sometimes it's useful to know the number. It is possible to convert a char into an int: number = 'a' stores 97 in number, because 97 is the character code of a lowercase a. No cast is needed, since every char value fits in an int.

It can be more useful to get the offset from a starting point. In the second example, letter is 'r'. letter - 'a' subtracts the two codes: 114 minus 97 is 17, so r is 17 letters after a. Adding 1 gives 18: r is the 18th letter of the alphabet. This works without knowing either code, because the lowercase letters have consecutive codes.
-->

---
minutes: 3
---

# The ASCII table gives each character a number (0–127)

<AsciiTable start="x" />

<p class="small" style="margin-top: 4px"><b>Never type these numbers in code</b>: write <code>'a'</code>, not 97.</p>

<!--
Everything in the computer is 1s and 0s, so each character has a number associated with it. These numbers can be listed in tables. The ASCII table only covers 7 bits of information, the numbers 0 to 127.

The interactive shows the printable ASCII characters, codes 32 to 126, in a grid of 16 columns, with each character's code underneath; "sp" is the space, code 32. Selecting a character shows its char literal, its code in decimal and in 7-bit binary, and, for a lowercase letter, its position in the alphabet using letter - 'a' + 1. The letter++ and letter-- buttons step to the next or previous code, like the code on the earlier slide: from 'x', three steps reach the left curly brace.

Patterns worth noticing: the digits 0 to 9 are 48 to 57, the uppercase letters are 65 to 90, and the lowercase letters are 97 to 122, exactly 32 after their uppercase versions. Codes 0 to 31 and 127 are control characters, like tab and newline, which do not print as symbols.

Never ever type these numbers in code. Writing 'a' instead of 97 is clearer, and it is correct no matter what the number is. Java's char actually uses 16 bits and Unicode, which includes ASCII as its first 128 characters.
-->

---
minutes: 2
---

# Escape sequences write characters that are hard to type

<div class="cols center">
<div>

- A char literal uses single quotes: `'z'`
- What about the apostrophe itself?
- What about tab or newline, which can't be printed?

</div>
<div class="card">

| Character | Escape |
| --- | --- |
| apostrophe | `'\''` |
| tab | `'\t'` |
| newline | `'\n'` |

</div>
</div>

<div class="callout">The backslash says a special command, an <b>escape sequence</b>, is coming.</div>

<!--
Remember that we use single quotes to designate a char literal, like 'z'. What if you want to use the apostrophe character itself? Writing three apostrophes in a row confuses the compiler, so the apostrophe is written backslash apostrophe, inside single quotes.

What if you want to use characters that can't be printed, like tab or newline? Tab is backslash t, and newline is backslash n.

The backslash is a message that a special command, called an escape sequence, is coming: the character after it means something different from usual. The backslash and the letter together make one char. To get a backslash itself, write two backslashes.
-->

---
minutes: 2
---

# Escape sequences work in String literals too

<div class="cols wide-left center">
<div>

```java
String blanks = "\t\t\t\t\n";
String quote = "He said, \"Attack!\"";
```

- Apostrophes need **no** escape in a String
- Quotation marks **do** need one: `\"`

</div>
<div class="console" aria-label="Printing quote shows: He said, quote Attack! quote">
<div class="con-h">System.out.println(quote);</div>
He said, "Attack!"
</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.con-h { font-size: 18px; color: #94a3b8; margin-bottom: 6px; }
</style>

<!--
You can put escape sequences into String literals as well. The first example, blanks, is four tabs followed by a newline. The second example, quote, holds the text He said, "Attack!", with real quotation marks inside it.

You do not have to escape apostrophes in a String, since a String ends at a double quote, not a single one: "don't" is fine. But you do have to escape quotation marks, with backslash quote, or the String would end early. The console on the right shows what printing quote displays: He said, "Attack!", with the backslashes gone.
-->

---
layout: section
minutes: 0.5
---

<div class="kicker">Part 3</div>

# Operations on String values

Concatenation and String methods.

<!--
Part 3 of 3. What we can do with Strings: join them, and call their methods.
-->

---
minutes: 1.5
---

# The + operator concatenates Strings into a new String

- `+` on Strings is **concatenation**
- It creates a **new** String from the two source Strings
- Like with numbers, it does **not change** the originals

```java
String word;
word = "tick" + "tock"; // word is "ticktock"
```

<!--
The operator we will use directly with String values is the plus operator, which for Strings means concatenation. This operator creates a new String that is the concatenation of the two source Strings: "tick" + "tock" makes "ticktock". No space is added: to get "tick tock", the space has to be part of one of the Strings.

As with numerical types, the plus operator does not change the two Strings being concatenated. Just as 5 + 6 does not change 5, "tick" + "tock" leaves "tick" and "tock" as they were.
-->

---
minutes: 2.5
---

# Concatenation merges other types into a String, left to right

```java {1-2|4|5|all}
String word;
word = 5 + " fingers";             // word is "5 fingers"

word = "love potion #" + 4 + 5;    // word is "love potion #45"
word = "love potion #" + (4 + 5);  // word is "love potion #9"
```

<div class="steps">
<div v-click="2">"love potion #" + 4 → "love potion #4", then + 5 → <b>"love potion #45"</b></div>
<div v-click="3">(4 + 5) first → 9, then "love potion #" + 9 → <b>"love potion #9"</b></div>
</div>

<style>
.steps { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; font-family: var(--slidev-font-mono, monospace); font-size: 20px; }
.steps b { color: var(--c-accent-2); }
</style>

<!--
Concatenation is a great tool for merging lots of different types into a String. When one side of a plus is a String, the other side is converted to text and joined. 5 + " fingers" gives "5 fingers".

But confusion can arise. "love potion #" + 4 + 5 gives "love potion #45", not number 9. Plus is worked left to right: "love potion #" + 4 is a String plus an int, which joins them into "love potion #4"; then that String + 5 joins again, giving "love potion #45".

With parentheses, "love potion #" + (4 + 5), the parentheses go first: 4 + 5 is two ints, so it is addition, 9; then the String + 9 gives "love potion #9". This is the same rule as the opening question.
-->

---
minutes: 1
---

# Strings are objects: they hold data and have methods

- Objects have **data** inside them, and **methods** to do things
- Among other things, a String can:
  - **Compare** itself with other Strings
  - Find its **length**
  - Say which **character** is at position i
  - Generate a **substring**

<!--
Strings are objects. Objects have data inside of them, but also have the ability to do things, with methods. Among other things, a String can compare itself with other Strings, find its length, say which character is located at position i, and generate a substring. The next slides cover each of these. A String's methods are called with the String's name, a dot, and the method name, such as word.length().
-->

---
minutes: 1.5
---

# `equals()` checks whether two Strings are identical

- Same, **including case**: returns `true`
- Otherwise: returns `false`

```java
String word1 = "lettuce";
String word2 = "let us";
boolean same = word1.equals(word2); // false
```

<!--
To see if two Strings are identical, use the equals method. If they are the same, including case, the method will return true. If they are not, the method will return false.

In the example, "lettuce" and "let us" sound alike but are different Strings, so word1.equals(word2) is false. Case matters: "Lettuce".equals("lettuce") is also false. Comparing Strings with == instead of equals is a common mistake; it checks something different, and the reasons come later in the course.
-->

---
minutes: 2
---

# `compareTo()` tells which String comes first in the dictionary

<div class="cols center">
<div>

| `value` | Meaning |
| --- | --- |
| negative | word1 first |
| positive | word2 first |
| 0 | the same |

</div>
<div>

```java
String word1 = "hard work";
String word2 = "success";
int value = word1.compareTo(word2); // < 0
```

</div>
</div>

<!--
To see which String goes first in the dictionary, use the compareTo method. If word1 comes first, value will be a negative number. If word2 comes first, value will be a positive number. If they are the same, value will be 0.

In the example, "hard work" comes before "success", because h comes before s, so value is negative: hard work comes before success. The exact number is the difference between the first characters that differ: 'h' minus 's', 104 minus 115, which is negative 11. Only the sign matters.

The order is by character code, so all uppercase letters come before all lowercase letters: "Zebra".compareTo("apple") is negative.
-->

---
minutes: 1.5
---

# `length()` counts the characters in a String

```java
String word = "a mile long";
int length = word.length(); // length = 11
```

```java
String nothing = "";
int length = nothing.length(); // length = 0
```

<div class="callout">A String of length 0 is possible: the empty String, <code>""</code>.</div>

<!--
To find the length of a String, use the length method. "a mile long" has length 11: the nine letters plus the two spaces. Spaces count as characters.

It is possible to have a String of length 0: the empty String, written as two double quotes with nothing between them. nothing.length() is 0. Note that length() has parentheses, because it is a method.
-->

---
minutes: 1.5
---

# `charAt(i)` gives the char at position i, counting from 0

```java
String word = "walnut";
char c = word.charAt(3); // c = 'n'
```

```java
String word = "short";
char c = word.charAt(10); // ouch!
```

<div class="callout">Woe betide anyone who asks for a character out of range: the program crashes.</div>

<!--
To find the char at position i in a String, use the charAt method. Positions start at 0: in "walnut", w is at 0, a at 1, l at 2, and n at 3. So word.charAt(3) is 'n', the fourth letter.

Woe betide anyone who asks for a character out of range. "short" has length 5, so its positions are 0 to 4. word.charAt(10) compiles, but when it runs the program crashes with a StringIndexOutOfBoundsException. The last valid position is always length minus 1.
-->

---
minutes: 2
---

# `substring(start, end)` starts at start and stops before end

<div class="cols center">
<div>

```java
String word1 = "disco fever";
String word2 = word1.substring(3, 7);
// word2 = "co f"
```

</div>
<div>

- First int: the char to **start on**
- Second int: the char to **stop before**
- `charAt` and `substring` use **zero-based** indexing

</div>
</div>

<!--
To get a substring of a String, use the substring method. The first int tells which char to start on, and the second int says which char to stop before.

In "disco fever", the positions are: d 0, i 1, s 2, c 3, o 4, space 5, f 6, e 7. substring(3, 7) starts at position 3, the c, and stops before position 7, the e, so it takes positions 3, 4, 5, and 6: "co f", including the space. The length of a substring is always end minus start: 7 minus 3 is 4.

Both charAt and substring use zero-based indexing: the first character is at position 0.
-->

---
minutes: 3
---

# Try it: length, charAt, and substring on a String

<StringDemo />

<!--
The interactive draws a String as numbered boxes, starting from 0. The buttons on the top left choose the String: "walnut", "disco fever", or "a mile long". The buttons on the right choose the method: length, charAt, or substring. The line at the bottom shows the call and its result.

length() highlights every box and gives the count: 6 for walnut, 11 for the others. charAt(i) highlights one box; the plus and minus buttons change i, and going below 0 or past the last box shows the crash, a StringIndexOutOfBoundsException. substring(start, end) highlights the boxes from start up to, but not including, end, marked by a dashed "stop" line. It starts at "disco fever".substring(3, 7), which is "co f".
-->

---
minutes: 2
---

# Check: what is `"walnut".substring(1, 4)`?

<div class="cols wide-left center">
<div>

```java
String word = "walnut";
String part = word.substring(1, 4);
```

<p class="small">w 0 · a 1 · l 2 · n 3 · u 4 · t 5</p>

</div>
<div>

<Quiz
  :options="['&quot;waln&quot;', '&quot;aln&quot;', '&quot;alnu&quot;']"
  :answer="1"
  explain="&quot;aln&quot;. Start on position 1 (a) and stop before position 4 (u): positions 1, 2, 3."
/>

</div>
</div>

<!--
What is "walnut".substring(1, 4)? The positions are w 0, a 1, l 2, n 3, u 4, t 5.

The answer is "aln". substring starts on position 1, the a, and stops before position 4, the u, so it takes positions 1, 2, and 3: a, l, n. Its length is 4 minus 1, which is 3.

"waln" starts at 0 instead of 1, counting from 1 instead of 0. "alnu" includes position 4, forgetting that the end position is excluded.
-->

---
minutes: 4
---

# Example: read a first and last name, print the initials

````md magic-move
```java
Scanner in = new Scanner(System.in);
System.out.print("First and last name: ");
String first = in.next();
String last = in.next();
System.out.println(first.charAt(0) + last.charAt(0));
```
```java
Scanner in = new Scanner(System.in);
System.out.print("First and last name: ");
String first = in.next();
String last = in.next();
System.out.println("" + first.charAt(0) + last.charAt(0));
```
````

<div class="cols" style="margin-top: 10px">
<div class="console" aria-label="Console">
<div>First and last name: <span class="con-in">Ada Lovelace</span></div>
<div v-if="$clicks === 0">141 &nbsp;<span class="con-bad">✗ two chars added as numbers</span></div>
<div v-else>AL &nbsp;<span class="con-ok">✓</span></div>
</div>
<div class="small">

`'A' + 'L'` is char + char: 65 + 76 = **141**. Starting with `""` makes it String concatenation.

</div>
</div>

<style>
.console { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 10px 16px; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.con-in { color: #fdba74; }
.con-bad { color: #fca5a5; font-size: 18px; }
.con-ok { color: #86efac; }
</style>

<!--
Write a program that reads a first and a last name, then outputs only the person's initials. The program, inside main and after importing Scanner, creates a Scanner, prints a prompt, reads the first name with in.next(), reads the last name with in.next(), and prints the first character of each.

The first version prints first.charAt(0) + last.charAt(0). For the input Ada Lovelace, it prints 141, not AL. Both sides of the plus are chars, and adding two chars adds their codes: 'A' is 65 and 'L' is 76, which makes 141. This is the char arithmetic from Part 2 meeting the plus rules from Part 3.

The fixed version starts with an empty String: "" + first.charAt(0) + last.charAt(0). Left to right, "" + 'A' is the String "A", and "A" + 'L' is "AL". The console shows the run: the prompt, the user's input Ada Lovelace, and the output, first the wrong 141 and then the correct AL.
-->

---
hide: true
minutes: 2
---

# Five things to remember from today

- A char is a number: `letter++` steps to the next code
- `letter - 'a' + 1` gives a letter's place; never type ASCII numbers
- Escapes: `\'` `\"` `\t` `\n` `\\`
- `+` with a String concatenates, **left to right**
- `equals`, `compareTo`, `length`, `charAt(i)`, `substring(start, end)`, from 0

<!--
Summary. One: a char is stored as a number, so letter++ steps to the next character code. Two: letter - 'a' + 1 gives a lowercase letter's position in the alphabet, and ASCII numbers should never be typed into code. Three: escape sequences such as backslash apostrophe, backslash quote, backslash t, backslash n, and double backslash write characters that are hard to type. Four: plus with a String concatenates, working left to right. Five: the String methods equals, compareTo, length, charAt, and substring, with positions counted from 0.
-->

---
hide: true
minutes: 0
---

# How this lecture connects to CS2023

<div class="card small" style="color: var(--c-ink)">

- **Primary area:** Software Development Fundamentals (SDF)
- **Related areas:** Foundations of Programming Languages (FPL), Architecture and Organization (AR)
- **Competency:** manipulate characters and Strings with operators and library methods
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

# Next time: wrapper classes and if-statements

<div class="cols">
<div class="card blue">

### Next time

- Wrapper classes
- Introduction to **if-statements**

</div>
<div class="card orange">

### Reminders

- Read Chapter 4
- Keep working on **Project 1**: due Friday!

</div>
</div>

<Credit />

<!--
Next time: wrapper classes, and an introduction to if-statements.

Reminders: read Chapter 4 of the textbook. Keep working on Project 1, which is due Friday.
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
