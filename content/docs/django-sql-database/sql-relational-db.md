# SQL & Relational Databases

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. Data, Databases & SQL — Foundational Definitions

### Learning Perspective
**Data** is a collection of **facts** in words, numbers, and pictures — the raw material any application ultimately works with.

A **database** is a **repository of data** that provides functionality for **adding, modifying, and querying** that data — going beyond just storage, to include the tools for actually working with the data over time.

**SQL (Structured Query Language)** was designed to **manage data in relational databases**, and is useful for handling **structured data** — data organized into a predictable, consistent format (rows and columns), as opposed to loosely-structured or unstructured data (like free text or images).

### Interview Perspective
**Q: What is SQL, and what kind of database is it designed for?**
> SQL is a language designed specifically to manage data in relational databases — structured, tabular data organized into rows and columns. It's used both to define the database's structure and to insert, query, update, and delete the actual data within it.

**Q: What's the difference between "data" and a "database," in the strict sense?**
> Data is just the raw facts themselves — words, numbers, images. A database is the organized *repository* that stores that data and provides the functionality (adding, modifying, querying) to actually work with it — the database is the system; the data is what it holds.

---

## 2. Relational Databases

### Learning Perspective
**Relational databases** store **tabular data** as collections of **related items**, with **columns** containing item **properties**. Data is organized into **tables**, where:
- Each **row** represents a single record/item
- Each **column** represents a specific **property/attribute** of that item

**Relational databases are ideal for the optimized storage, retrieval, and processing of large volumes of** structured **data** — particularly when relationships between different types of data (e.g., customers and their orders) need to be modeled and queried reliably.

**RDBMS (Relational Database Management System)** — the software managing relational databases (e.g., MySQL, PostgreSQL, SQL Server, Oracle) — is a **mature and well-documented technology**, providing:
- **Flexibility** — a wide range of query capabilities via SQL
- **Reduced redundancy** — proper relational design avoids duplicating the same data across multiple places
- **Ease of backup and disaster recovery** — mature, well-established tooling for this exists
- **ACID compliance** — a set of guarantees ensuring reliable transaction processing (see Section 9)

### Interview Perspective
**Q: What defines a relational database?**
> Data is organized into related tables, where each table's columns represent the properties of the items it stores, and relationships between tables are established through shared key columns (see Section 7). This structure is what makes SQL's relational querying — particularly joins — possible.

**Q: What are some key benefits of using an RDBMS?**
> Maturity and extensive documentation/tooling, flexible querying via SQL, reduced data redundancy through proper relational design, established backup/disaster recovery practices, and ACID compliance — guaranteeing reliable, consistent transaction processing even under concurrent access or failure scenarios.

---

## 3. Relational vs. Non-Relational Databases

### Learning Perspective
**Non-relational databases** (often called **NoSQL**) provide a **flexible and scalable approach** to storing and retrieving data — typically not organized into strict tables with predefined columns, and often better suited to unstructured or rapidly-evolving data models, or to horizontal scaling across many servers.

**The core trade-off:**
- **Relational databases** — excel at **structured data**, complex relationships, and scenarios demanding strong consistency guarantees (ACID)
- **Non-relational databases** — excel at **flexibility** (schema can evolve without rigid upfront design) and **scalability** (many NoSQL systems are designed from the ground up for horizontal, distributed scaling)

Neither is universally "better" — the right choice depends on the specific data shape, consistency requirements, and scale of the application.

### Interview Perspective
**Q: What's the fundamental trade-off between relational and non-relational databases?**
> Relational databases excel at structured data with well-defined relationships, strong consistency (ACID compliance), and complex querying via SQL. Non-relational databases prioritize flexibility (data doesn't need a rigid, predefined schema) and scalability (many are built specifically for horizontal scaling across distributed servers) — often at the cost of some of the strict consistency guarantees relational systems provide by default.

**Q: When might you choose a non-relational database over a relational one?**
> When the data's structure is expected to evolve frequently and unpredictably (a rigid schema would be a constant obstacle), when you need to scale horizontally across many servers more easily than traditional relational systems typically allow, or when the data itself is naturally document-like, graph-like, or key-value-like rather than cleanly tabular.

---

## 4. The Entity-Relationship (ER) Model

### Learning Perspective
An **Entity-Relationship (ER) model** is a **tool for designing relational databases** — a conceptual blueprint used *before* actually creating tables, to plan out what data needs to be stored and how different pieces of data relate to each other.

**The translation from ER model to actual database structure:**
- **Entities** become **tables** (e.g., a "Book" entity becomes a `books` table)
- **Attributes** are translated into **columns** (e.g., a book's "title" and "pages" attributes become `title` and `pages` columns)
- **Relationships** between entities become the **foreign key** connections between tables (see Section 7)

### Interview Perspective
**Q: What is an Entity-Relationship model, and why would you create one before writing any SQL?**
> An ER model is a conceptual design tool for planning a relational database's structure — identifying the entities (things being tracked), their attributes (properties), and the relationships between them — before actually implementing tables. Designing it upfront helps catch structural issues (missing relationships, redundant data, unclear ownership of information) early, when they're cheap to fix, rather than after tables and data already exist.

**Q: How does an entity in an ER model map onto an actual SQL table?**
> The entity itself becomes a table, and each of its attributes becomes a column in that table — e.g., a "Customer" entity with attributes like name, email, and address becomes a `customers` table with corresponding `name`, `email`, and `address` columns.

---

## 5. Defining Database Objects: CREATE, ALTER, TRUNCATE, DROP

### Learning Perspective
Several SQL statements exist specifically to **define, change, or remove** database objects (like tables) — collectively part of what's called **DDL (Data Definition Language)**:

- **`CREATE`** — defines a **new** database object (e.g., `CREATE TABLE`)
- **`ALTER`** — **changes** the structure of an existing object (e.g., adding a new column to an existing table)
- **`TRUNCATE`** — removes **all rows** from a table, but **keeps the table structure itself** intact — much faster than deleting rows one by one, since it doesn't log individual row deletions
- **`DROP`** — **completely removes** the object itself (e.g., the entire table, structure and all)

```sql
CREATE TABLE books (id INT, title VARCHAR(100));
ALTER TABLE books ADD COLUMN rating FLOAT;
TRUNCATE TABLE books;   -- empties the table, keeps its structure
DROP TABLE books;       -- removes the table entirely
```

### Interview Perspective
**Q: What's the difference between `TRUNCATE` and `DROP`?**
> `TRUNCATE` removes all *rows* from a table but keeps the table's structure (columns, constraints) intact — you can immediately insert new data into the same table. `DROP` removes the table *entirely* — structure and all — as if it never existed; you'd need to `CREATE` it again from scratch to use it.

**Q: What's the difference between `TRUNCATE` and `DELETE` (without a `WHERE` clause)?**
> Both can remove all rows from a table, but `TRUNCATE` is typically much faster, since it deallocates the data pages directly rather than logging each individual row deletion (as `DELETE` does) — though this also means `TRUNCATE` is generally not easily undoable within a transaction in the same granular way row-by-row `DELETE` operations often are, depending on the specific database system.

---

## 6. The CREATE TABLE Statement

### Learning Perspective
The **`CREATE TABLE`** statement includes the definition of the **attributes of columns** in the table, including:
- **Names of columns**
- **Datatypes of columns** (e.g., `INT`, `VARCHAR`, `FLOAT`, `DATE`)
- **Optional values, if required**, such as the **Primary Key constraint** (and other constraints like `NOT NULL`, `UNIQUE`, `DEFAULT`)

```sql
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    rating FLOAT DEFAULT 0,
    published_date DATE
);
```

### Interview Perspective
**Q: What information does a `CREATE TABLE` statement need to specify for each column?**
> At minimum, the column's name and its datatype. Optionally, additional constraints — like `PRIMARY KEY` to designate a unique row identifier, `NOT NULL` to require a value, `UNIQUE` to enforce distinct values, or `DEFAULT` to specify a fallback value when none is provided.

---

## 7. Primary Keys & Foreign Keys

### Learning Perspective
- **Primary Key** — of a relational table, **uniquely identifies each row** in that table. No two rows can share the same primary key value, and (typically) a primary key column cannot contain `NULL`.
- **Foreign Key** — a **set of columns referring to a primary key of another entity** (table) — this is the mechanism that establishes and enforces **relationships** between tables in a relational database.

```sql
CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);
```

Here, `books.author_id` is a foreign key — its values must correspond to an existing `author_id` in the `authors` table, enforcing referential integrity (you can't have a book referencing an author that doesn't exist).

### Interview Perspective
**Q: What's the difference between a primary key and a foreign key?**
> A primary key uniquely identifies each row within its own table — no duplicates, generally not nullable. A foreign key is a column (or set of columns) in one table that references another table's primary key, establishing a relationship between the two tables and enforcing that the referencing value must correspond to an actual existing row in the referenced table.

**Q: Why does a foreign key relationship matter for data integrity?**
> It prevents "orphaned" or inconsistent data — e.g., without the foreign key constraint, you could insert a book row referencing an `author_id` that doesn't actually exist in the `authors` table. The foreign key constraint enforces referential integrity, ensuring relationships between tables always point to valid, existing data.

⭐ **Very frequently asked** — the primary key/foreign key distinction underlies almost everything else about relational databases; be ready to explain it clearly and give a concrete two-table example.

---

## 8. Basic SQL Statements: CREATE, INSERT, SELECT, UPDATE, DELETE

### Learning Perspective
The **basic SQL statements** cover the core operations you'll perform on data — often summarized alongside CRUD (Create/Read/Update/Delete):

```sql
-- CREATE TABLE — define a new table's structure
CREATE TABLE books (id INT PRIMARY KEY, title VARCHAR(100), rating FLOAT);

-- INSERT — add new rows of data
INSERT INTO books (id, title, rating) VALUES (1, 'Node Basics', 4.2);

-- SELECT — query/retrieve data
SELECT title, rating FROM books WHERE rating > 4;

-- UPDATE — modify existing data
UPDATE books SET rating = 4.5 WHERE id = 1;

-- DELETE — remove data
DELETE FROM books WHERE id = 1;
```

**Critical safety note:** `UPDATE` and `DELETE` statements **without a `WHERE` clause** affect **every row** in the table — a common, costly mistake. Always double-check the `WHERE` clause before running either in a real database, especially in production.

### Interview Perspective
**Q: What are the five basic SQL statements, and what does each do?**
> `CREATE TABLE` defines a new table's structure. `INSERT` adds new rows. `SELECT` retrieves/queries existing data. `UPDATE` modifies existing rows. `DELETE` removes rows. Together, `INSERT`/`SELECT`/`UPDATE`/`DELETE` map directly onto CRUD (Create/Read/Update/Delete).

**Q: What's a common, dangerous mistake with `UPDATE` or `DELETE` statements, and how do you avoid it?**
> Forgetting the `WHERE` clause — without it, the statement applies to *every single row* in the table, not just the intended one(s). Best practice is to first run the equivalent `SELECT ... WHERE ...` to confirm exactly which rows would be affected, before running the actual `UPDATE`/`DELETE` with that same `WHERE` condition.

---

## 9. ACID Compliance

### Learning Perspective
**ACID** is a set of properties guaranteeing reliable database transaction processing, and one of the core benefits of RDBMS technology:

- **Atomicity** — a transaction either completes **entirely**, or **not at all** — no partial updates left in an inconsistent state if something fails partway through
- **Consistency** — a transaction brings the database from one **valid state to another**, never violating defined rules/constraints (like foreign keys)
- **Isolation** — concurrent transactions **don't interfere** with each other — each transaction behaves as if it were running alone, even when others are happening simultaneously
- **Durability** — once a transaction is **committed**, it's **permanently saved**, even in the event of a system crash immediately afterward

### Interview Perspective
**Q: What does ACID stand for, and why does it matter for a relational database?**
> Atomicity (all-or-nothing transactions), Consistency (transactions only move the database between valid states), Isolation (concurrent transactions don't interfere with each other), and Durability (committed changes survive crashes). Together, these guarantees are why relational databases are trusted for critical operations — like financial transactions — where partial failures, corrupted concurrent updates, or lost committed data would be unacceptable.

**Q: Give a concrete example of why atomicity matters.**
> A bank transfer needs to both debit one account and credit another — if the system crashes after the debit but before the credit, atomicity guarantees the *entire* transaction rolls back rather than leaving money "missing." Without atomicity, a partial failure could leave the database in an inconsistent, incorrect state.

---

## 10. The ORDER BY Clause

### Learning Perspective
The **`ORDER BY`** clause is used in a SQL query to **sort the result set by a specified column**.

```sql
SELECT title, pages FROM book ORDER BY title;
```
This sorts the result set by the column named `title`.

**You can also specify the sort column by its position (sequence number)** in the selected columns, rather than by name:
```sql
SELECT title, pages FROM book ORDER BY 2;
```
This indicates the sort order is based on the values in the **second column** selected — `pages`, in this example.

**Additional common usage:**
```sql
SELECT title, pages FROM book ORDER BY pages DESC;        -- descending order
SELECT title, pages FROM book ORDER BY pages, title;       -- sort by multiple columns
```

### Interview Perspective
**Q: How would you sort query results by a specific column, and what's the alternative syntax using a column number?**
> `ORDER BY column_name` sorts by that column's name directly. Alternatively, `ORDER BY 2` sorts by the second column in the `SELECT` list, based on its position rather than its name — useful for brevity, though using explicit column names is generally more readable and less fragile (since column order in the query could change).

**Q: How would you sort by multiple columns, and what does that actually do?**
> `ORDER BY column1, column2` — sorts primarily by `column1`; for any rows where `column1`'s values are equal, `column2` is used as a tiebreaker to determine their relative order.

---

## 11. JOINs

### Learning Perspective
The **`JOIN`** operator **combines rows from two or more tables**, based on a **relationship between certain columns** in those tables. **The tables being joined are related by a common column** — usually the **primary key** of one table, which appears as a **foreign key** in the other.

```sql
SELECT books.title, authors.name
FROM books
JOIN authors ON books.author_id = authors.author_id;
```

**Combining three or more tables:** if you need to combine data from **three or more** different tables, you **add new tables to the joins** progressively:
> First, you combine table A and table B information by matching their shared attributes. Then, you join the information from table B and table C by matching their shared attributes.

```sql
SELECT books.title, authors.name, publishers.name
FROM books
JOIN authors ON books.author_id = authors.author_id
JOIN publishers ON books.publisher_id = publishers.publisher_id;
```

### Interview Perspective
**Q: What does a JOIN do, and what's the mechanism that connects the joined tables?**
> A JOIN combines rows from two or more tables into a single result set, based on a relationship defined by a shared column — typically a foreign key in one table matching the primary key of another. The `ON` clause specifies exactly which columns must match for rows to be combined.

**Q: How would you join data from three separate tables?**
> Chain the joins together — first join table A to table B on their shared relationship, then join the resulting combined data to table C on *its* shared relationship (often with table B, or sometimes A) — each additional `JOIN` clause progressively extends the combined result set.

---

## 12. Types of JOINs: INNER vs. OUTER

### Learning Perspective
SQL offers **several types of JOINs**, differing in exactly **which rows** get included in the result when a match isn't found on both sides:

- **`INNER JOIN`** — returns only rows where there's a **match in both tables** — the **intersection** of the two tables, based on the join condition. Rows without a matching counterpart in the other table are **excluded entirely**.

- **`OUTER JOIN`** (with three variants) — returns a **bigger data set** than `INNER JOIN`, including unmatched rows from one or both sides:
  - **`LEFT OUTER JOIN`** (or `LEFT JOIN`) — includes **all rows from the left table**, plus matching rows from the right table; unmatched right-side columns are filled with `NULL`
  - **`RIGHT OUTER JOIN`** (or `RIGHT JOIN`) — the mirror of `LEFT JOIN`; includes **all rows from the right table**, plus matching rows from the left, with unmatched left-side columns as `NULL`
  - **`FULL OUTER JOIN`** — includes **all rows from both tables**, matched where possible, with `NULL` filling in any unmatched side

```sql
-- Only books that HAVE a matching author
SELECT books.title, authors.name
FROM books
INNER JOIN authors ON books.author_id = authors.author_id;

-- ALL books, even ones with no author on file (author columns will be NULL for those)
SELECT books.title, authors.name
FROM books
LEFT JOIN authors ON books.author_id = authors.author_id;
```

**Summary:** "You can extract a data set corresponding to the **intersection** of the two tables involved (`INNER JOIN`), or choose a **bigger data set** (`OUTER JOIN` variants)."

### Interview Perspective
**Q: What's the difference between an INNER JOIN and a LEFT JOIN?**
> `INNER JOIN` returns only rows with a match in *both* tables — the intersection. `LEFT JOIN` returns *all* rows from the left table regardless of whether a match exists in the right table — unmatched rows simply get `NULL` for the right table's columns. `LEFT JOIN` is useful specifically when you want to preserve every row from one table even if it has no corresponding related data yet.

**Q: When would you use a LEFT JOIN instead of an INNER JOIN in practice?**
> When you need to see every record from the "primary" table regardless of whether related data exists — e.g., listing all customers along with any orders they've placed, but still wanting to see customers who haven't placed any orders yet (which an `INNER JOIN` would silently exclude, since there'd be no matching row in the orders table).

**Q: What does a FULL OUTER JOIN return that a LEFT or RIGHT JOIN doesn't?**
> It preserves unmatched rows from *both* tables simultaneously — not just the left (as in `LEFT JOIN`) or just the right (as in `RIGHT JOIN`), but both sides' otherwise-unmatched rows appear in the result, with `NULL` filling whichever side didn't have a match for that particular row.

⭐ **Extremely frequently asked** — JOIN types (especially INNER vs. LEFT) are among the single most common SQL interview questions; be ready to draw or describe a simple Venn-diagram-style explanation.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| SQL | Language for managing structured data in relational databases |
| Relational database | Tabular data (rows/columns) organized into related tables |
| RDBMS benefits | Flexibility, reduced redundancy, backup/recovery maturity, ACID compliance |
| Relational vs. non-relational | Structured/strict consistency vs. flexible schema/easier horizontal scale |
| ER model | Design tool — entities → tables, attributes → columns |
| `TRUNCATE` vs. `DROP` | Empties the table, keeps structure vs. removes the table entirely |
| `CREATE TABLE` essentials | Column names, datatypes, optional constraints (e.g., PRIMARY KEY) |
| Primary key vs. foreign key | Uniquely identifies rows in its own table vs. references another table's primary key |
| Basic SQL statements | CREATE, INSERT, SELECT, UPDATE, DELETE |
| ACID | Atomicity, Consistency, Isolation, Durability |
| `ORDER BY` | Sorts results by column name, or by column position number |
| JOIN | Combines rows from 2+ tables via a shared key column |
| 3+ table joins | Chain joins progressively — A+B, then that result + C |
| INNER JOIN | Only matching rows — the intersection |
| LEFT/RIGHT/FULL OUTER JOIN | Include unmatched rows from left / right / both tables, filled with NULL |