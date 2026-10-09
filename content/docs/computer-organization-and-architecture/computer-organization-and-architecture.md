# Computer Organization & Architecture

Organized from fundamentals to advanced topics, with two lenses throughout: **Learning Perspective** (understand the concept properly, with worked examples where the math matters) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Built from general computer science fundamentals, since no source content was provided. This subject is unusually hands-on and numeric — reading alone gets you the vocabulary and the "why," but genuine fluency with number conversions, cache address math, and pipelining hazards comes from working problems by hand. Wherever the math matters, this file walks through a full worked example — redo them yourself with different numbers to actually build the skill, don't just read the answer.

---

## PART 1 — FOUNDATIONS: DATA REPRESENTATION

## 1. Number Systems

### Learning Perspective
Computers store and process everything as **binary** (base 2) — just `0`s and `1`s — because digital circuits most reliably represent two distinct physical states (voltage on/off). Humans commonly also use:
- **Decimal** (base 10) — the everyday number system
- **Binary** (base 2) — digits 0–1
- **Octal** (base 8) — digits 0–7
- **Hexadecimal** (base 16) — digits 0–9, then A–F (representing 10–15); popular because each hex digit maps *exactly* to 4 binary bits, making hex a compact, human-readable shorthand for binary

**Converting binary → decimal:** multiply each bit by 2 raised to its position (counting from 0, right to left), and sum.

**Worked example:** convert `1011₂` to decimal.
```
1011
= (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)
= 8 + 0 + 2 + 1
= 11
```

**Converting decimal → binary:** repeatedly divide by 2, recording remainders, then read remainders bottom-to-top.

**Worked example:** convert `13` to binary.
```
13 ÷ 2 = 6 remainder 1
 6 ÷ 2 = 3 remainder 0
 3 ÷ 2 = 1 remainder 1
 1 ÷ 2 = 0 remainder 1
Read bottom-to-top: 1101
```
Check: `(1×8)+(1×4)+(0×2)+(1×1) = 13` ✓

**Converting binary → hex:** group bits into sets of 4 (from the right), convert each group independently.

**Worked example:** convert `10110110₂` to hex.
```
1011 0110
 B    6
= 0xB6
```

### Interview Perspective
**Q: Why does hexadecimal map so cleanly onto binary, and why is that useful?**
> Because 16 is 2⁴ — exactly 4 binary bits produce 16 possible values (0000–1111), matching hex's 16 digits (0–F) one-to-one. This makes hex a compact way to write binary values — a 32-bit value that would take 32 binary digits to write takes only 8 hex digits, while still letting you mentally convert back to binary trivially, 4 bits at a time, unlike decimal.

**Q: Convert `0x2F` to binary and to decimal.** (Be ready to do this live, on the spot.)
> Binary: `2 = 0010`, `F = 1111` → `00101111`. Decimal: `(2×16) + (15×1) = 32 + 15 = 47`.

⭐ **Extremely frequently asked, and frequently done live on a whiteboard** — practice several binary/hex/decimal conversions by hand until they're fast and automatic, not just understood in principle.

---

## 2. Signed Numbers & Two's Complement

### Learning Perspective
Binary alone has no inherent concept of negative numbers — a representation scheme is needed. The near-universal standard is **two's complement**.

**Why two's complement, and not simpler alternatives** (sign-magnitude, one's complement)? Two's complement has exactly **one representation of zero** (sign-magnitude and one's complement both have a "+0" and "−0", wasting a bit pattern and complicating comparisons), and critically, **addition/subtraction circuitry works identically for positive and negative numbers** — the hardware doesn't need special-case logic for signs, simplifying the CPU's arithmetic unit significantly.

**To find the two's complement (negative) of a binary number:**
1. Invert all the bits (flip 0s to 1s and vice versa) — this is **one's complement**
2. Add 1

**Worked example:** represent `−5` in 8-bit two's complement.
```
5 in binary (8-bit):     00000101
Invert all bits:         11111010
Add 1:                   11111011
→ -5 = 11111011
```

**Check it:** add `5 + (−5)` using these representations and confirm you get zero:
```
  00000101   (5)
+ 11111011   (-5)
-----------
  00000000   (carry out of the 9th bit is discarded) ✓
```

**Range for n-bit two's complement:** from `−2^(n−1)` to `2^(n−1) − 1`. For 8 bits: −128 to 127 (note the asymmetry — one more negative number than positive, since zero "uses up" one of the positive-side slots).

**Overflow** — occurs when the result of an arithmetic operation falls outside the representable range for the given number of bits (e.g., adding two large positive 8-bit numbers and getting a result that wraps into what looks like a negative number). Detected by checking whether the carry *into* the sign bit differs from the carry *out of* the sign bit.

### Interview Perspective
**Q: Why is two's complement used for representing negative numbers, instead of simply flagging a sign bit (sign-magnitude)?**
> Two's complement has a single, unambiguous representation of zero (sign-magnitude has both +0 and −0), and — most importantly — standard binary addition circuitry works correctly for both positive and negative numbers without any special-case logic, since subtraction can be implemented as "add the two's complement." This significantly simplifies the ALU's hardware design compared to needing separate logic paths for signed arithmetic.

**Q: Convert `−12` to 8-bit two's complement, showing your work.**
> `12` in binary: `00001100`. Invert: `11110011`. Add 1: `11110100`. So `−12 = 11110100`.

**Q: What is integer overflow, and how is it detected in two's complement arithmetic?**
> Overflow occurs when an arithmetic result falls outside the range representable in the given number of bits — e.g., adding two 8-bit numbers and getting a result requiring a 9th bit. It's detected by comparing the carry bit going *into* the sign bit (the leftmost bit) against the carry bit coming *out* of it — if they differ, overflow occurred.

---

## 3. Floating-Point Representation

### Learning Perspective
Real (fractional) numbers are represented using the **IEEE 754** standard, splitting a fixed number of bits into three fields:
- **Sign bit** (1 bit) — 0 for positive, 1 for negative
- **Exponent** — stores the power-of-2 scaling factor, biased (offset) so it can represent both positive and negative exponents using only unsigned storage
- **Mantissa/significand** — stores the significant digits of the number

**Single precision (32-bit):** 1 sign bit + 8 exponent bits + 23 mantissa bits.
**Double precision (64-bit):** 1 sign bit + 11 exponent bits + 52 mantissa bits.

**Why floating-point introduces precision issues:** since only a finite number of bits represent the mantissa, many real numbers (especially most decimal fractions, like `0.1`) **cannot be represented exactly** in binary floating-point — they're stored as the closest representable approximation. This is why `0.1 + 0.2 === 0.3` is famously `false` in most programming languages — tiny rounding errors accumulate.

### Interview Perspective
**Q: Why does `0.1 + 0.2` not exactly equal `0.3` in most programming languages?**
> Because `0.1` and `0.2` cannot be represented exactly in binary floating-point (IEEE 754) — much like `1/3` can't be written exactly in finite decimal digits. Each is stored as the closest representable approximation, and the tiny rounding errors in those approximations don't perfectly cancel out when added, producing a result that's extremely close to but not bit-for-bit exactly `0.3`.

**Q: What are the three components of an IEEE 754 floating-point number?**
> Sign bit (positive/negative), exponent (the power-of-2 scale, stored with a bias), and mantissa/significand (the significant digits of the value) — together representing the number in a form similar to scientific notation, but in binary.

---

## PART 2 — DIGITAL LOGIC

## 4. Boolean Algebra & Logic Gates

### Learning Perspective
**Boolean algebra** operates on binary values (`0`/`1`, or `False`/`True`) using a small set of operations — the mathematical foundation all digital circuits are built from.

**Basic logic gates:**
| Gate | Output is 1 when... | Symbol logic |
|---|---|---|
| **AND** | both inputs are 1 | `A · B` |
| **OR** | at least one input is 1 | `A + B` |
| **NOT** | input is 0 (inverts) | `A'` or `¬A` |
| **NAND** | NOT(AND) — 0 only when both inputs are 1 | `(A · B)'` |
| **NOR** | NOT(OR) — 1 only when both inputs are 0 | `(A + B)'` |
| **XOR** | inputs differ (exactly one is 1) | `A ⊕ B` |
| **XNOR** | inputs are the same | `(A ⊕ B)'` |

**Why NAND and NOR matter specially:** both are **functionally complete** — meaning *any* Boolean function/any other gate can be built using *only* NAND gates (or only NOR gates). This matters practically because it simplifies chip manufacturing — building a chip from one repeated, simple gate type is more efficient/uniform than needing several different gate types.

### Interview Perspective
**Q: What does it mean for NAND to be "functionally complete"?**
> It means any Boolean logic function — AND, OR, NOT, XOR, anything — can be constructed using only NAND gates, combined appropriately. This matters practically because chip fabrication benefits from uniformity — being able to build an entire processor's logic out of one repeated, simple building block (NAND) simplifies manufacturing compared to needing many different gate types.

**Q: Build an AND gate using only NAND gates.**
> A NAND gate followed immediately by a NOT gate gives AND (since AND = NOT(NAND)). Since NOT itself can be built from a NAND gate with both inputs tied together (NAND(A, A) = NOT A), you can build a full AND gate using two NAND gates: first NAND(A,B), then feed that result into both inputs of a second NAND gate to invert it.

---

## 5. Combinational vs. Sequential Circuits

### Learning Perspective
- **Combinational circuits** — output depends **only** on the **current inputs**, with no memory of past inputs (e.g., an adder, a multiplexer, a decoder) — built directly from logic gates with no feedback loop.
- **Sequential circuits** — output depends on **both current inputs and the circuit's current stored state** — meaning sequential circuits have **memory** (e.g., a flip-flop, a register, a counter) — achieved via feedback loops that let the circuit's output influence its own future behavior.

**Flip-flop** — the basic memory element of sequential circuits, storing a single bit, typically updated on a clock signal's edge (transition). Multiple flip-flops together form a **register** (storing multiple bits as one unit — directly connecting to the "registers" covered in Part 3).

### Interview Perspective
**Q: What's the fundamental difference between a combinational and a sequential circuit?**
> A combinational circuit's output depends purely on its current inputs — no memory of the past. A sequential circuit's output depends on both current inputs *and* its internal stored state, meaning it has memory — implemented via feedback loops and memory elements like flip-flops, synchronized typically by a clock signal.

**Q: What is a flip-flop, and how does it relate to a CPU register?**
> A flip-flop is the basic single-bit memory element in sequential circuits, typically updating its stored value on a clock edge. A CPU register is built from multiple flip-flops working together — e.g., a 32-bit register is essentially 32 flip-flops, one per bit, all updated together in sync with the clock.

---

## PART 3 — CPU ARCHITECTURE

## 6. CPU Components

### Learning Perspective
The **CPU (Central Processing Unit)** is the component that actually executes instructions. Its core internal components:

- **ALU (Arithmetic Logic Unit)** — performs all arithmetic (add, subtract, multiply) and logical (AND, OR, comparisons) operations
- **Control Unit (CU)** — directs the overall operation of the CPU: fetching instructions, decoding what they mean, and coordinating the other components to actually carry them out
- **Registers** — small, extremely fast storage locations directly inside the CPU, holding data actively being worked on. Far faster to access than RAM, but very limited in number/capacity.
  - **General-purpose registers** — hold data/addresses for ongoing computation
  - **Program Counter (PC)** — holds the memory address of the *next* instruction to be fetched
  - **Instruction Register (IR)** — holds the instruction currently being decoded/executed
  - **Accumulator** — (in simpler/historical architectures) a register specifically used to hold intermediate arithmetic results
  - **Stack Pointer (SP)** — holds the address of the top of the current call stack
- **Buses** — the physical pathways carrying data/addresses/control signals between CPU components and other parts of the computer:
  - **Data bus** — carries actual data being transferred
  - **Address bus** — carries the memory address being read from/written to
  - **Control bus** — carries control signals (read/write commands, clock signals, interrupt signals)

### Interview Perspective
**Q: What are the main internal components of a CPU, and what does each do?**
> The ALU performs arithmetic and logical operations. The Control Unit directs overall CPU operation — fetching, decoding, and coordinating execution of instructions. Registers are small, extremely fast storage locations holding data actively being worked on, including special-purpose ones like the Program Counter (address of the next instruction) and Instruction Register (the currently executing instruction).

**Q: What's the difference between the data bus, address bus, and control bus?**
> The data bus carries the actual data being transferred between components. The address bus carries the memory address specifying *where* that data should be read from or written to. The control bus carries coordination signals — like whether an operation is a read or a write, and clock/timing signals — that govern how the data and address buses are actually used in a given cycle.

---

## 7. The Fetch-Decode-Execute Cycle

### Learning Perspective
Every instruction a CPU runs goes through the same fundamental cycle, repeated continuously:

1. **Fetch** — the CPU reads the instruction located at the address currently held in the **Program Counter**, loading it into the **Instruction Register**. The Program Counter is then incremented to point to the next instruction.
2. **Decode** — the Control Unit interprets the fetched instruction, determining what operation it specifies and what operands (data/registers/memory addresses) it needs.
3. **Execute** — the actual operation is carried out — the ALU performs a computation, data moves between registers/memory, or control flow changes (e.g., a jump instruction updates the Program Counter to something other than simply "the next instruction").
4. **(Store/Writeback)** — if the instruction produces a result, it's written back to a register or memory location.

```
Fetch → Decode → Execute → (Writeback) → back to Fetch (next instruction)
```

**Clock cycle and clock speed:** each step (or group of steps) in this cycle is synchronized to a **clock signal** — a regular, repeating electrical pulse. **Clock speed** (measured in GHz) indicates how many clock cycles occur per second — a higher clock speed generally means more instructions can be processed per second, though it's far from the *only* factor determining actual performance (see Part 5's discussion of IPC and pipelining).

### Interview Perspective
**Q: Walk through the fetch-decode-execute cycle.**
> Fetch: the CPU retrieves the instruction at the address in the Program Counter, loading it into the Instruction Register, and increments the Program Counter. Decode: the Control Unit figures out what the instruction actually means — what operation, what operands. Execute: the operation actually happens — the ALU computes something, data moves, or control flow changes. If there's a result, it's written back to a register or memory. This cycle then repeats for the next instruction.

**Q: Does a higher clock speed always mean a faster CPU?**
> Not necessarily — clock speed is only one factor. How much *useful work* gets done per clock cycle (related to the CPU's architecture — pipelining, how many instructions can execute in parallel) matters just as much. A CPU with a lower clock speed but a more efficient architecture (higher instructions-per-cycle) can outperform a higher-clock-speed CPU with a less efficient design — this is formalized in Part 5's performance equation.

---

## 8. Instruction Set Architecture (ISA)

### Learning Perspective
The **Instruction Set Architecture (ISA)** defines the vocabulary of operations a CPU understands — the contract between hardware and software, specifying exactly what instructions exist, what data types they operate on, and how they're encoded in binary.

**Two major competing philosophies:**
- **CISC (Complex Instruction Set Computer)** — a large set of instructions, including complex ones that can do multiple operations in a single instruction (e.g., directly load from memory, perform an arithmetic operation, and store the result, all as one instruction). Fewer instructions needed per program, but each instruction is more complex to decode and execute internally. **x86** (Intel/AMD) is the classic CISC example.
- **RISC (Reduced Instruction Set Computer)** — a smaller set of simple, uniform instructions, each typically completing in roughly one clock cycle. More instructions are needed to accomplish the same task, but each is fast and predictable, which enables more effective pipelining (Part 5). **ARM** (used in most mobile devices, and increasingly in laptops/servers like Apple Silicon) and **MIPS** are classic RISC examples.

**The practical trend:** modern CISC processors (like x86) internally translate complex instructions into simpler, RISC-like **micro-operations** before actual execution — meaning the CISC/RISC distinction today is less about raw hardware simplicity and more about the external instruction set the programmer/compiler sees, with both philosophies converging somewhat in practice.

### Interview Perspective
**Q: What's the core difference between CISC and RISC architectures?**
> CISC uses a larger set of more complex instructions, where a single instruction might accomplish multiple operations, reducing the number of instructions needed per program but making each instruction more complex to decode/execute. RISC uses a smaller set of simple, uniform instructions that each execute quickly and predictably (typically one per clock cycle), requiring more instructions overall but enabling more effective pipelining and generally higher clock speeds.

**Q: Why has ARM (RISC) become so dominant in mobile and increasingly in laptop/server CPUs?**
> RISC's simpler, more uniform instructions generally allow for more power-efficient designs and more effective pipelining, which matters enormously for battery-powered mobile devices where power efficiency is a top priority. As power efficiency has become increasingly important even in laptops and data centers (not just phones), ARM's efficiency advantages have driven its adoption well beyond its original mobile stronghold — notably in Apple Silicon Macs.

---

## PART 4 — MEMORY HIERARCHY

## 9. The Memory Hierarchy

### Learning Perspective
Computer memory exists in a **hierarchy**, trading off **speed vs. capacity vs. cost**: faster memory is more expensive and available in smaller quantities, so systems layer several types together, each acting as a cache for the slower layer below it.

```
Registers (fastest, smallest, most expensive per byte)
   ↓
Cache (L1 → L2 → L3, progressively larger and slower)
   ↓
Main Memory (RAM)
   ↓
Secondary Storage (SSD/HDD)
   ↓
(Tertiary/Archival storage — tape, cloud cold storage — slowest, cheapest, largest)
```

**The core principle making this hierarchy effective: locality of reference** — programs tend to access a relatively small subset of their total data/instructions repeatedly over short periods, so keeping that "hot" subset in fast memory captures most of the benefit without needing *everything* to be fast.
- **Temporal locality** — recently accessed data is likely to be accessed again soon
- **Spatial locality** — data near recently accessed data is likely to be accessed soon too (e.g., the next element in an array)

### Interview Perspective
**Q: Why does the memory hierarchy exist, rather than just building one huge, uniformly fast memory?**
> Because speed and cost/capacity trade off directly — faster memory technologies are dramatically more expensive per byte and can't be manufactured in large capacities cost-effectively. The hierarchy exploits locality of reference: programs tend to repeatedly access a relatively small "working set" of data, so a small amount of very fast memory (cache) captures most of the performance benefit, backed by progressively larger, slower, cheaper tiers for everything else.

**Q: What's the difference between temporal and spatial locality?**
> Temporal locality means recently accessed data is likely to be accessed again soon (e.g., a loop variable accessed every iteration). Spatial locality means data physically near recently accessed data is likely to be accessed soon too (e.g., iterating through consecutive elements of an array). Both justify caching strategies: temporal locality justifies keeping recently used data cached; spatial locality justifies fetching data in contiguous blocks ("cache lines") rather than one byte at a time.

---

## 10. Cache Memory — Mapping Techniques (Worked Examples)

### Learning Perspective
**Cache** is small, very fast memory sitting between the CPU and main memory, storing copies of recently/frequently used data. Since cache is much smaller than main memory, a **mapping scheme** determines exactly *where* in the cache a given piece of main memory can be placed.

**Key terms:**
- **Cache hit** — the requested data is found in the cache
- **Cache miss** — the requested data is NOT in the cache, requiring a (slower) fetch from main memory
- **Cache line/block** — the unit of data transferred between cache and main memory at once (typically larger than one byte/word, exploiting spatial locality)
- **Hit rate** — the fraction of memory accesses that are cache hits

**Three main mapping techniques:**

### Direct-Mapped Cache
Each main memory block maps to **exactly one** specific cache line, determined by `(block number) MOD (number of cache lines)`.

**Worked example:** a cache has 8 lines (0–7). Which cache line does memory block 19 map to?
```
19 MOD 8 = 3
→ Block 19 maps to cache line 3
```
**Trade-off:** simple and fast to check, but suffers from **conflict misses** — if two frequently-used blocks happen to map to the same line (e.g., blocks 3 and 11 both map to line 3 in an 8-line cache), they'll repeatedly evict each other even if the rest of the cache is empty.

### Fully Associative Cache
A memory block can be placed in **any** available cache line — no fixed mapping.
**Trade-off:** maximizes flexibility (eliminates conflict misses entirely), but requires checking **every** cache line to determine a hit/miss, which is expensive and slow to implement in hardware as cache size grows.

### N-Way Set-Associative Cache
A middle ground: the cache is divided into **sets**, each containing **N lines**. A memory block maps to exactly one **set** (via modulo, same as direct-mapped), but within that set, it can go in **any** of the N lines.

**Worked example:** a cache has 16 lines, organized as a **4-way** set-associative cache (so 16 ÷ 4 = 4 sets). Which set does memory block 19 map to?
```
Number of sets = 16 / 4 = 4
19 MOD 4 = 3
→ Block 19 maps to Set 3, and can occupy any of the 4 lines within Set 3
```
**Trade-off:** balances direct-mapped's simplicity against fully-associative's flexibility — most real CPU caches use some form of set-associative mapping (commonly 4-way, 8-way, or 16-way).

**Replacement policy** — when a set/cache is full and a new block needs to be placed, which existing line gets evicted? Common policies: **LRU (Least Recently Used)** — evict whichever line hasn't been accessed in the longest time (exploits temporal locality); **FIFO**; **Random**.

### Interview Perspective
**Q: Compare direct-mapped, fully associative, and set-associative cache designs.**
> Direct-mapped: each memory block maps to exactly one cache line (via modulo) — simple and fast to check, but prone to conflict misses if frequently-used blocks collide on the same line. Fully associative: a block can go anywhere in the cache — eliminates conflict misses, but requires checking every line, which is expensive in hardware. Set-associative is the practical middle ground real CPUs use: a block maps to one specific *set*, but can occupy any line within that set, balancing simplicity against flexibility.

**Q: A cache has 32 lines, organized as an 8-way set-associative cache. Which set does memory block 50 map to?**
> Number of sets = 32 / 8 = 4. `50 MOD 4 = 2` → block 50 maps to Set 2 (and can occupy any of the 8 lines within that set).

**Q: What is LRU replacement, and why is it a reasonable default policy?**
> LRU evicts the cache line that hasn't been accessed for the longest time, when a new block needs to be placed in a full set/cache. It's a reasonable default because it directly exploits temporal locality — data that hasn't been used in a while is statistically less likely to be needed again soon than data accessed more recently, so evicting it is a relatively low-risk choice.

⭐ **Very frequently asked, with live math** — be ready to compute modulo-based cache mappings on the spot for direct-mapped and set-associative schemes, with different numbers than shown here. Practice several until it's automatic.

---

## 11. Cache Performance & Virtual Memory (Link to OS)

### Learning Perspective
**Average Memory Access Time (AMAT)** — a formula quantifying overall memory performance, accounting for the cache hierarchy:
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```
Where **Hit Time** is how long a cache hit takes, **Miss Rate** is the fraction of accesses that miss, and **Miss Penalty** is the extra time needed to fetch from the next, slower level when a miss occurs.

**Worked example:** a cache has a hit time of 2ns, a miss rate of 5%, and a miss penalty of 20ns. What's the AMAT?
```
AMAT = 2 + (0.05 × 20) = 2 + 1 = 3ns
```

**Cache misses, classified ("the three Cs"):**
- **Compulsory miss** — the very first access to a block (it was never in the cache, since it's never been fetched yet) — unavoidable
- **Capacity miss** — the cache isn't large enough to hold everything needed, so useful blocks get evicted and later re-fetched
- **Conflict miss** — (specific to direct-mapped/set-associative caches) a block is evicted because another block mapped to the same line/set, even though the overall cache isn't full

**Connection to virtual memory:** the same hierarchical/caching principle extends beyond hardware cache — virtual memory (covered in depth in `operating-systems.md`) treats RAM itself as a kind of "cache" for data that otherwise lives on disk, using the same locality-of-reference principle and even similar terminology (a page fault is conceptually a "cache miss" at the RAM/disk level).

### Interview Perspective
**Q: A cache has a hit time of 1ns, a 10% miss rate, and a 100ns miss penalty. Calculate the AMAT.**
> AMAT = Hit Time + (Miss Rate × Miss Penalty) = 1 + (0.10 × 100) = 1 + 10 = 11ns.

**Q: What are the "three Cs" of cache misses?**
> Compulsory (first-ever access to a block — unavoidable), capacity (the cache is too small to hold the full working set, so needed data gets evicted and later re-fetched), and conflict (specific to direct-mapped/set-associative designs — a block is evicted due to mapping collisions with another block, even though overall cache space remains available elsewhere).

**Q: How does virtual memory relate conceptually to CPU cache?**
> Both apply the same underlying principle — using a smaller, faster resource as a "cache" for a larger, slower one, exploiting locality of reference. CPU cache sits between the CPU and RAM; virtual memory, in effect, treats RAM as a cache for disk-backed virtual address space, and a page fault is the conceptual equivalent of a cache miss at that level — the needed data isn't in the fast tier (RAM) and must be fetched from the slow tier (disk).

---

## PART 5 — PERFORMANCE & PARALLELISM

## 12. Performance Metrics

### Learning Perspective
**CPU time** (the fundamental performance equation):
```
CPU Time = Instruction Count × CPI × Clock Cycle Time
```
Where **CPI (Cycles Per Instruction)** is the average number of clock cycles each instruction takes, and **Clock Cycle Time** is the inverse of clock speed (e.g., a 2GHz CPU has a clock cycle time of 0.5ns).

**This equation is why "clock speed alone doesn't determine performance"** (referenced back in Part 3): a CPU with a higher clock speed but a higher CPI (less efficient per-instruction execution) can be slower overall than a CPU with a lower clock speed but a lower CPI.

**IPC (Instructions Per Cycle)** — the inverse framing of CPI (`IPC = 1/CPI`), often used to describe how many instructions a CPU completes per clock cycle on average — a key metric for comparing architectural efficiency independent of raw clock speed.

**Amdahl's Law** — quantifies the theoretical speedup achievable when only *part* of a task can be improved/parallelized:
```
Speedup = 1 / [(1 - P) + (P / S)]
```
Where **P** is the proportion of the task that can be improved, and **S** is the speedup factor applied to that improvable portion.

**Worked example:** a program spends 80% of its time in a section that can be parallelized, and you apply a 4x speedup to that section. What's the overall speedup?
```
Speedup = 1 / [(1 - 0.8) + (0.8 / 4)]
        = 1 / [0.2 + 0.2]
        = 1 / 0.4
        = 2.5x
```
**The key insight Amdahl's Law reveals:** the **unimproved portion** of a task increasingly dominates overall performance as you speed up the improvable portion more and more — even an *infinite* speedup on the parallelizable 80% here would cap overall speedup at `1 / 0.2 = 5x`, never more, because the remaining 20% is untouched.

### Interview Perspective
**Q: Why doesn't clock speed alone determine CPU performance? What's the fuller picture?**
> CPU time = Instruction Count × CPI × Clock Cycle Time. Clock speed only affects the Clock Cycle Time term — a CPU could have a very high clock speed but still perform worse overall if its CPI (cycles needed per instruction, reflecting architectural efficiency) is proportionally worse, or if a given program requires executing substantially more instructions on that architecture. Real performance comparison requires accounting for all three factors together, not clock speed in isolation.

**Q: A program spends 50% of its execution time in a section you can speed up by 10x. What's the maximum overall speedup, even with an infinite speedup on that section?**
> Using Amdahl's Law with P = 0.5 and S approaching infinity: Speedup = 1 / [(1 - 0.5) + (0.5/∞)] → 1 / 0.5 = 2x maximum. Even an infinitely fast improvement to half the program can only ever double overall performance, since the other, untouched half still takes exactly as long as before.

**Q: What practical lesson does Amdahl's Law teach about optimization efforts?**
> It teaches you to focus optimization effort on the parts of a task that consume the largest proportion of total time — optimizing a section that's already a small fraction of overall runtime yields limited benefit no matter how dramatically you speed it up, since the rest of the program's unoptimized time increasingly dominates and caps your achievable overall speedup.

⭐ **Extremely frequently asked, with live math** — Amdahl's Law calculations are a classic computer architecture interview exercise; practice several variations.

---

## 13. Pipelining

### Learning Perspective
**Pipelining** overlaps the execution of multiple instructions by breaking the fetch-decode-execute cycle into discrete **stages**, and letting different instructions occupy different stages **simultaneously** — similar to an assembly line, where multiple cars are in different stages of construction at once, rather than building one car completely before starting the next.

**A classic 5-stage pipeline:** IF (Instruction Fetch) → ID (Instruction Decode) → EX (Execute) → MEM (Memory access) → WB (Writeback).

**Without pipelining**, each instruction fully completes all 5 stages before the next instruction starts. **With pipelining**, while instruction 1 is in its EX stage, instruction 2 can simultaneously be in its ID stage, and instruction 3 can simultaneously be in its IF stage — dramatically increasing instruction throughput (though not reducing the *latency* of any single instruction).

**Pipeline hazards** — situations that prevent the next instruction from executing in its designated clock cycle, disrupting the smooth overlap:
- **Structural hazard** — two instructions need the same hardware resource at the same time (e.g., both need to access memory simultaneously, but there's only one memory port)
- **Data hazard** — an instruction depends on the result of a previous instruction that **hasn't finished yet** (e.g., instruction 2 needs a value that instruction 1 is still computing) — commonly mitigated via **forwarding/bypassing** (routing a result directly from one pipeline stage to another that needs it, without waiting for it to be formally written back) or, when forwarding isn't possible, inserting a **pipeline stall (bubble)**
- **Control hazard** — caused by branch instructions (if/else, loops) — the pipeline doesn't know which instruction to fetch next until the branch is actually resolved, since that depends on a condition not yet evaluated. Mitigated via **branch prediction** — guessing which way a branch will go and speculatively continuing down that path, rolling back if the guess turns out wrong

### Interview Perspective
**Q: What is pipelining, and why does it improve performance?**
> Pipelining breaks instruction execution into discrete stages and overlaps multiple instructions across those stages simultaneously, like an assembly line — rather than fully completing one instruction before starting the next. This increases overall instruction *throughput* (more instructions completed per unit time), even though it doesn't reduce the *latency* (total time) of any single individual instruction.

**Q: Explain the three types of pipeline hazards.**
> Structural hazards occur when two instructions need the same hardware resource simultaneously. Data hazards occur when an instruction needs a result from a previous instruction that hasn't finished computing yet — mitigated via forwarding (routing the result directly where it's needed) or stalling. Control hazards occur specifically with branch instructions — the pipeline doesn't know what to fetch next until the branch condition resolves, mitigated via branch prediction (speculatively guessing and proceeding, then rolling back if wrong).

**Q: What happens when a branch prediction turns out to be wrong?**
> The CPU must discard ("flush") all the speculatively-executed instructions that were fetched based on the incorrect prediction, and restart fetching from the actual correct branch target — this "misprediction penalty" can cost several clock cycles' worth of wasted work, which is why modern CPUs invest heavily in increasingly sophisticated branch prediction algorithms to minimize how often this happens.

⭐ **Extremely frequently asked** — pipeline hazards (especially data hazards and forwarding) are a staple of computer architecture interviews.

---

## 14. Parallelism: Multicore, SIMD, and Beyond

### Learning Perspective
Beyond pipelining (overlapping stages of sequential instructions), modern CPUs exploit parallelism in several other ways:

- **Multicore processors** — multiple independent CPU cores on a single chip, each capable of executing its own instruction stream simultaneously — genuine parallelism (not just overlap), letting truly independent tasks (or well-parallelized portions of one task) run at the same time.
- **Superscalar execution** — a single core capable of issuing and executing **multiple instructions per clock cycle** (as long as they're independent of each other), rather than strictly one at a time — a different mechanism from pipelining (which overlaps *stages*, not whole instructions within one cycle).
- **SIMD (Single Instruction, Multiple Data)** — a single instruction applies the **same operation** to **multiple data elements simultaneously** (e.g., adding 8 pairs of numbers in one instruction, rather than 8 separate add instructions) — heavily used for multimedia processing, graphics, and increasingly, machine learning workloads (connecting to `ai-fundamentals.md`'s mention of GPU-accelerated computation).
- **Hyper-threading / Simultaneous Multithreading (SMT)** — lets a single physical core appear as **two (or more) logical cores** to the OS, by maintaining duplicate sets of certain CPU state (registers) and interleaving execution of two instruction streams to better utilize the core's execution resources when one thread is stalled (e.g., waiting on memory) — not true parallelism (there's still only one actual set of execution units), but improves overall utilization.

### Interview Perspective
**Q: What's the difference between pipelining and superscalar execution?**
> Pipelining overlaps different *stages* of sequential instructions (while one instruction is in Execute, another is in Decode). Superscalar execution lets a single core issue and execute *multiple whole instructions* within the same clock cycle, as long as they don't depend on each other — a fundamentally different mechanism for increasing throughput, and the two are commonly combined in modern CPU designs (a superscalar, pipelined architecture).

**Q: What is SIMD, and why is it particularly valuable for workloads like image processing or ML?**
> SIMD lets a single instruction apply the same operation to multiple data elements at once — e.g., applying a brightness adjustment to 8 pixels, or performing 8 multiply-accumulate operations for a neural network layer, in one instruction rather than 8 separate ones. This matches extremely well with workloads that apply the same simple operation uniformly across large amounts of data (images, matrices, vectors), which is exactly the computational pattern underlying both multimedia processing and most machine learning computation — explaining why GPUs (built around massive SIMD-style parallelism) are so well suited to ML workloads.

**Q: Does hyper-threading double a CPU's actual performance, the way adding a second physical core would?**
> No — hyper-threading improves utilization of a single core's existing execution resources by interleaving two instruction streams, filling in gaps when one thread is stalled (e.g., waiting on a cache miss). But there's still only one set of actual execution units underneath, so the performance gain is typically much more modest than true parallelism from an actual additional physical core — often cited in the range of 15–30% improvement for suitable workloads, not a full 2x.

---

## PART 6 — PUTTING IT TOGETHER

## 15. Assembly Language & the Compilation Chain

### Learning Perspective
**Assembly language** is a human-readable, (mostly) one-to-one textual representation of a CPU's machine instructions — the lowest-level language humans typically write directly, sitting just above raw binary machine code.

**The compilation chain**, from source code to running program:
```
Source code (e.g., C, Python-compiled-variants)
    ↓ (compiler)
Assembly code (human-readable instructions)
    ↓ (assembler)
Machine code / object file (binary, CPU-specific instructions)
    ↓ (linker — combines multiple object files + libraries)
Executable
```

**A simple illustrative example** (x86-like assembly, conceptual):
```asm
MOV AX, 5      ; load the value 5 into register AX
ADD AX, 3      ; add 3 to the value in AX (AX now holds 8)
MOV [0x1000], AX   ; store the result from AX into memory address 0x1000
```
This directly mirrors the fetch-decode-execute cycle: each line is one instruction, fetched, decoded, and executed in turn.

### Interview Perspective
**Q: Where does assembly language sit in the chain from source code to a running program?**
> Source code is translated by a compiler into assembly code — a human-readable, roughly one-to-one textual representation of actual machine instructions. An assembler then converts that assembly into binary machine code (object files), and a linker combines multiple object files and any needed libraries into a final executable. Assembly sits just one level of abstraction above the raw binary the CPU actually executes.

**Q: Why would a developer ever write assembly directly today, given how rarely it's used in typical application development?**
> For extremely performance-critical code paths where a compiler's generated code isn't optimal enough (though modern compilers are very good, reducing how often this is truly necessary), for low-level systems/embedded programming with very tight hardware constraints, for writing bootloaders or OS kernel code that runs before higher-level abstractions exist, or for reverse-engineering/security research where understanding exactly what a compiled binary does is the goal.

---

## 16. Putting the Whole Stack Together

### Learning Perspective
A useful way to consolidate everything in this file: trace what happens, at the hardware level, when a single line of code like `x = x + 1` actually executes.

1. The **compiler** translates this into assembly instructions — likely a load, an add, and a store
2. The **fetch-decode-execute cycle** processes each resulting machine instruction in turn
3. **Registers** hold `x`'s value temporarily during the computation; the **ALU** performs the actual addition
4. If `x` isn't already in a register, the CPU checks **cache** first (hoping for a hit, given temporal/spatial locality), falling back to **RAM** on a miss
5. If the relevant memory page isn't even in RAM, a **page fault** occurs, and the OS (covered in `operating-systems.md`) loads it from disk via **virtual memory**
6. The result is written back — possibly to a register, and eventually back to memory
7. If this code runs inside a loop, **pipelining** keeps multiple iterations' instructions overlapping in different stages simultaneously, and **branch prediction** guesses whether the loop will continue, to keep the pipeline full

**This is the full "stack" computer architecture and operating systems together cover** — and why the two subjects are so often taught and asked about together: architecture explains *how the hardware executes instructions and manages memory at the physical level*, while the OS explains *how software is organized, scheduled, and abstracted on top of that hardware* for multiple programs to share it safely and efficiently.

### Interview Perspective
**Q: How do computer architecture and operating systems concepts relate to each other?**
> Computer architecture covers how hardware actually executes instructions and physically manages memory — registers, cache, pipelining, the memory hierarchy. The OS builds abstractions *on top of* that hardware — processes, virtual memory, file systems — letting multiple programs safely and efficiently share the same physical resources. Many OS concepts directly depend on underlying architectural support: virtual memory relies on the hardware's MMU and page table mechanisms; process scheduling relies on the CPU's ability to be interrupted and context-switched; multithreading relies on multiple cores or SMT. The two subjects are genuinely two halves of one coherent picture — hardware capability and software abstraction built on top of it.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Why two's complement | One zero representation + same hardware for +/- arithmetic |
| Floating-point imprecision | Many decimals (like 0.1) have no exact finite binary representation |
| NAND/NOR functional completeness | Any logic function can be built from just NAND (or just NOR) gates |
| Combinational vs. sequential circuits | No memory, output = f(current input) vs. has memory/state |
| Fetch-Decode-Execute | Read instruction → interpret it → perform the operation |
| CISC vs. RISC | Complex, fewer instructions vs. simple, uniform, more instructions, better pipelining |
| Memory hierarchy principle | Locality of reference — small fast tiers capture most of the benefit |
| Direct-mapped / set-associative / fully associative cache | One fixed line / one fixed set, N lines within it / anywhere |
| AMAT formula | Hit Time + (Miss Rate × Miss Penalty) |
| Three Cs of cache misses | Compulsory, capacity, conflict |
| CPU Time formula | Instruction Count × CPI × Clock Cycle Time |
| Amdahl's Law | Speedup is capped by the *unimproved* portion of the task |
| Pipelining | Overlaps instruction stages — assembly-line style, increases throughput not latency |
| 3 pipeline hazards | Structural (resource conflict), data (dependency), control (branches) |
| SIMD | One instruction, same op across many data elements at once |
| Hyper-threading | Better utilization of one core's resources — not true parallel execution |