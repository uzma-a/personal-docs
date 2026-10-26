# Introduction to Machine Learning

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Builds on `ai-fundamentals.md`, which covers the ML workflow, overfitting, evaluation metrics, and neural network basics in more depth. This file focuses on the *landscape*: what ML is, how to choose a technique, and the tools, languages, libraries, and frameworks that make up the ML ecosystem.

---

## 1. AI vs. Machine Learning

### Learning Perspective
**Artificial intelligence (AI)** simulates human cognition: reasoning, perception, decision-making, and language understanding. It is the broad goal of making machines behave intelligently.

**Machine learning (ML)** is a subset of AI. It uses **algorithms** that learn patterns from data rather than following hand-written rules. Traditional ML typically **requires feature engineering**: a human decides which measurable properties of the data (the "features") the algorithm should look at.

**Example:** to predict house prices, a person might choose features such as square footage, number of bedrooms, and neighborhood, then let an algorithm learn how those features relate to price.

**Why the feature engineering point matters:** this is a key difference between traditional ML and deep learning. Deep learning (Section 8) can learn useful features automatically from raw data, such as pixels or text, which is why it dominates tasks like image recognition where hand-designing features is impractical.

```
AI  ⊃  Machine Learning  ⊃  Deep Learning
```

### Interview Perspective
**Q: What's the difference between AI and machine learning?**
> AI is the broad field of building systems that simulate human intelligence. Machine learning is a subset of AI where systems learn patterns from data using algorithms, instead of being explicitly programmed with rules for every case. Traditional ML also typically requires feature engineering, meaning a human selects which input features the model should learn from.

**Q: What is feature engineering, and why does it matter?**
> It's the process of selecting, creating, and transforming the input variables a model learns from. It matters because model quality often depends more on good features than on which algorithm is used. Deep learning reduces this burden by learning features automatically from raw data, which is a major reason it took over perception tasks like vision and speech.

---

## 2. Types of Machine Learning

### Learning Perspective
- **Supervised learning** trains on **labeled data**, where each example comes with the correct answer. The model learns to map inputs to outputs and then predicts labels for new, unseen data. *Example: emails labeled "spam" or "not spam."*
- **Unsupervised learning** finds **patterns in unlabeled data**, with no correct answers provided. *Example: grouping customers by purchasing behavior without predefined categories.*
- **Semi-supervised learning** trains on a **small subset of labeled data** combined with a larger pool of unlabeled data. It is useful when labeling is expensive or slow. *Example: a few hundred hand-labeled medical scans plus thousands of unlabeled ones.*

(Reinforcement learning, a fourth paradigm where an agent learns from rewards and penalties, is covered in `ai-fundamentals.md` and `agentic-ai-and-vibe-coding.md`.)

### Interview Perspective
**Q: Distinguish supervised, unsupervised, and semi-supervised learning.**
> Supervised learning uses fully labeled data to learn input-to-output mappings. Unsupervised learning uses unlabeled data to discover structure or patterns on its own. Semi-supervised learning sits between the two: it uses a small amount of labeled data alongside a larger amount of unlabeled data, which is valuable when obtaining labels is costly.

**Q: Why would a team choose semi-supervised learning?**
> Labeling data often requires expensive human expertise, such as doctors annotating medical images. Semi-supervised learning lets the model benefit from the small labeled set while also extracting structure from the much larger unlabeled set, typically giving better results than using only the few labeled examples.

---

## 3. Choosing a Machine Learning Technique

### Learning Perspective
There is no single best algorithm. Four key factors drive the choice:

1. **The type of problem to be solved.** Are you predicting a category, predicting a number, grouping similar items, or detecting unusual behavior?
2. **The available data.** Is it labeled or unlabeled? How much is there? Is it clean, structured, or messy?
3. **Available resources.** This includes compute power, time, budget, and team expertise. Deep learning may need GPUs, while a simple model may run on a laptop.
4. **The desired outcome.** Do you need the most accurate predictions, an explainable model, or fast real-time inference? These goals often conflict.

### Interview Perspective
**Q: How would you decide which ML technique to use for a new problem?**
> I'd start with the problem type (classification, regression, clustering, anomaly detection), then check what data is available, especially whether it's labeled and how much there is. Then I'd consider resources like compute and time, and the desired outcome, since accuracy, interpretability, and speed trade off. Often I'd start with a simple baseline model and only move to something more complex if it's justified.

---

## 4. Core ML Techniques

### Learning Perspective
- **Classification** categorizes new data into **discrete classes**. *Example: is this email spam or not? Which digit is in this image?* (Supervised)
- **Regression** predicts a **continuous numeric value**. *Example: predicting a house's price or tomorrow's temperature.* (Supervised)
- **Clustering** groups similar data points **without labels**. *Example: customer segmentation.* (Unsupervised)
- **Anomaly detection** identifies **unusual cases** that deviate from normal patterns. *Example: fraudulent credit card transactions or equipment failure warnings.*

| Technique | Learning type | Output | Typical example |
|---|---|---|---|
| Classification | Supervised | A category | Spam detection |
| Regression | Supervised | A number | Price prediction |
| Clustering | Unsupervised | Groups | Customer segments |
| Anomaly detection | Often unsupervised or semi-supervised | Normal vs. unusual | Fraud detection |

### Interview Perspective
**Q: What's the difference between classification and regression?**
> Classification predicts a discrete category, like "fraud" or "not fraud." Regression predicts a continuous numeric value, like a price. The choice depends on whether your target variable is categorical or numeric, and it determines which algorithms and evaluation metrics apply.

**Q: Why is anomaly detection often hard to treat as a standard classification problem?**
> Anomalies, such as fraud, are rare by definition, so the data is heavily imbalanced, with very few positive examples. Labeled examples are scarce, and new kinds of anomalies keep appearing that were never seen in training. That's why anomaly detection often relies on modeling what "normal" looks like and flagging deviations, rather than learning from many labeled examples of each anomaly type.

---

## 5. The ML Pipeline and Tool Modules

### Learning Perspective
Machine learning tools typically support the full **pipeline** with distinct modules:

1. **Data preprocessing:** cleaning, handling missing values, encoding categories, scaling features
2. **Model building:** choosing an algorithm and training it on the data
3. **Evaluation:** measuring performance on held-out data using appropriate metrics
4. **Optimization:** tuning hyperparameters and improving performance
5. **Deployment:** exporting the trained model and serving it in production

This is the same workflow described in `ai-fundamentals.md` (train/validation/test splits, tuning, deployment and monitoring), viewed here from the tooling side.

### Interview Perspective
**Q: What are the main stages of an ML pipeline, and why is preprocessing listed first?**
> The stages are data preprocessing, model building, evaluation, optimization, and deployment. Preprocessing comes first because model quality depends heavily on data quality. Models trained on messy, unscaled, or incomplete data tend to perform poorly regardless of how sophisticated the algorithm is.

---

## 6. Programming Languages for ML

### Learning Perspective
- **Python** is the dominant ML language, with a vast array of libraries covering every stage of ML (Section 8).
- **R** is commonly used for **statistical analysis and data exploration**, and is strong in academia and statistics-heavy work.
- **Julia** is suited to **high-performance numerical computing**, aiming for the speed of low-level languages with high-level readability.
- **Scala** is often used with big-data platforms like Apache Spark for large-scale data processing.
- **Java** is common in enterprise systems, so it is used where ML must integrate into existing large Java applications.
- **JavaScript** enables **web-based ML models** that run directly in the browser (for example, via TensorFlow.js).

### Interview Perspective
**Q: Why is Python so dominant in ML, and when would you choose another language?**
> Python dominates because of its readable syntax and its enormous ecosystem of ML libraries, which makes experimentation fast. I'd choose another language for specific needs: R for statistics-heavy analysis, Julia for high-performance numerical work, Scala or Java when integrating with big-data or enterprise stacks, and JavaScript when the model needs to run in a web browser.

---

## 7. Data Visualization Tools

### Learning Perspective
- **Matplotlib** and **Seaborn** are Python libraries for creating **customizable plots**. Seaborn is built on Matplotlib and offers higher-level statistical plots with nicer defaults.
- **ggplot2** is an R library that builds graphics **in layers**, adding axes, data points, trend lines, and labels step by step.
- **Tableau** provides **interactive data dashboards**, often used by analysts and business users with little or no code.

(Matplotlib was also introduced in `numpy-and-pandas.md`.)

### Interview Perspective
**Q: What's the relationship between Matplotlib and Seaborn?**
> Seaborn is built on top of Matplotlib. Matplotlib gives low-level, highly customizable control over plots, while Seaborn provides a higher-level interface for common statistical visualizations with more attractive defaults, so you can produce good-looking plots with less code.

**Q: What does it mean that ggplot2 builds graphics "in layers"?**
> You construct a chart incrementally: start with the data and axes, then add layers like points, lines, trend fits, and labels. Each layer is a separate component added to the plot, which makes complex charts composable and easy to modify.

---

## 8. Python Libraries for ML

### Learning Perspective
- **NumPy** provides **numerical computations** and fast multi-dimensional arrays.
- **Pandas** supports **data analysis and preparation** with DataFrames.
- **SciPy** provides **scientific computing** tools (optimization, statistics, signal processing) built on NumPy.
- **Scikit-learn** is for building **traditional machine learning models** (see Section 11).

**How they stack:** NumPy is the foundation, Pandas and SciPy build on it, and Scikit-learn uses all three.

```
NumPy  →  Pandas / SciPy  →  Scikit-learn
```

### Interview Perspective
**Q: What role does each of NumPy, Pandas, SciPy, and Scikit-learn play in a typical ML workflow?**
> NumPy handles fast numerical arrays, the foundation for everything else. Pandas loads, cleans, and prepares tabular data. SciPy provides scientific and statistical routines. Scikit-learn then takes the prepared data and provides algorithms for classification, regression, and clustering, plus tools for preprocessing and evaluation.

---

## 9. Deep Learning Frameworks

### Learning Perspective
**TensorFlow, Keras, Theano, and PyTorch** support the **design, training, and testing of neural networks**, used in areas like **computer vision** and **natural language processing**.

- **TensorFlow** is a widely used framework from Google, strong in production deployment.
- **Keras** is a high-level API for building neural networks quickly. It is integrated closely with TensorFlow.
- **PyTorch** is a framework from Meta, popular in research for its flexibility and intuitive, Python-like style.
- **Theano** is an earlier framework that influenced the others. Its development has been discontinued, so it is mostly of historical interest today.

### Interview Perspective
**Q: What's the difference between Keras and TensorFlow?**
> TensorFlow is the full, lower-level deep learning framework. Keras is a high-level API that makes defining and training neural networks simpler and more readable, and it runs on top of TensorFlow. Using Keras is like writing in a friendlier layer over TensorFlow's more detailed machinery.

**Q: Why might a team choose PyTorch over TensorFlow, or vice versa?**
> PyTorch is often preferred in research and experimentation for its flexibility and intuitive debugging. TensorFlow has traditionally been strong for production deployment and its surrounding tooling. In practice both are capable, and the choice often comes down to team familiarity and ecosystem fit.

---

## 10. Computer Vision, NLP, and Generative AI Tools

### Learning Perspective
**Computer vision tools** enable applications like **object detection, image classification, and facial recognition**.

**Natural language processing (NLP) tools** such as **NLTK, TextBlob, and Stanza** support **text processing, sentiment analysis, and language parsing**.
- **NLTK** is a long-standing toolkit for text processing, widely used for learning NLP.
- **TextBlob** is a simple, beginner-friendly API for sentiment analysis and basic NLP tasks.
- **Stanza** is a Stanford NLP library offering linguistic analysis such as parsing and entity recognition across many languages.

**Generative AI tools** use AI to **create new content**, including text, images, music, and other media, based on input data or prompts (covered in depth in `gen-ai-basic-software-development.md` and the other Gen AI files).

### Interview Perspective
**Q: Name some common computer vision and NLP tasks and the tools used for them.**
> Computer vision covers tasks like object detection, image classification, and facial recognition. NLP covers tasks like sentiment analysis, text processing, and parsing, with libraries such as NLTK, TextBlob, and Stanza. Both areas are heavily powered by deep learning frameworks like TensorFlow and PyTorch.

**Q: What distinguishes generative AI from traditional ML tasks like classification?**
> Traditional ML models typically analyze or predict, for example labeling an input or forecasting a value. Generative AI models create new content, such as text, images, or music, that resembles patterns learned from training data, typically in response to a prompt.

---

## 11. Scikit-learn

### Learning Perspective
**Scikit-learn** provides a consistent set of tools for the whole classical ML workflow:
- **Classification**
- **Regression**
- **Clustering**
- **Data preprocessing**
- **Model evaluation**
- **Exporting models for production use**

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)          # train
predictions = model.predict(X_test)  # predict
print(accuracy_score(y_test, predictions))  # evaluate
```

**Why Scikit-learn is popular:** nearly every model follows the same `fit` / `predict` interface, so you can swap algorithms with minimal code changes.

### Interview Perspective
**Q: What makes Scikit-learn easy to work with across different algorithms?**
> It uses a consistent API: almost every model supports `fit()` to train and `predict()` to make predictions, plus shared utilities for splitting data, preprocessing, and evaluation. Swapping from one algorithm to another often means changing a single line.

**Q: Is Scikit-learn used for deep learning?**
> Not really. Scikit-learn focuses on traditional ML algorithms. Deep learning with neural networks is typically done with TensorFlow, Keras, or PyTorch.

---

## 12. The Machine Learning Ecosystem

### Learning Perspective
The **machine learning ecosystem** is the network of **tools, frameworks, libraries, platforms, and processes** that collectively support developing and managing ML models.

| Layer | Examples |
|---|---|
| **Languages** | Python, R, Julia, Scala, Java, JavaScript |
| **Data and numerical libraries** | NumPy, Pandas, SciPy |
| **Classical ML** | Scikit-learn |
| **Deep learning frameworks** | TensorFlow, Keras, PyTorch, Theano |
| **Visualization** | Matplotlib, Seaborn, ggplot2, Tableau |
| **Domain tools** | Computer vision tools; NLP tools (NLTK, TextBlob, Stanza) |
| **Generative AI** | Tools that create text, images, music, and media |
| **Platforms and processes** | The pipeline: preprocessing, building, evaluation, optimization, deployment |

### Interview Perspective
**Q: What do we mean by the "ML ecosystem," and why does it matter?**
> It's the interconnected collection of languages, libraries, frameworks, platforms, and processes used to build and manage ML models. It matters because real ML work rarely uses a single tool. You combine, for example, Pandas for data prep, Scikit-learn or PyTorch for modeling, and Matplotlib for visualization, within a pipeline that also covers evaluation and deployment.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| AI vs. ML | AI simulates human cognition; ML learns from data via algorithms (and traditionally needs feature engineering) |
| Supervised / unsupervised / semi-supervised | Labeled data / unlabeled patterns / small labeled set + larger unlabeled set |
| Choosing a technique | Problem type, available data, resources, desired outcome |
| Classification vs. regression | Predicts a category vs. predicts a continuous number |
| Clustering | Groups similar points without labels |
| Anomaly detection | Flags unusual cases, e.g. fraud |
| ML pipeline | Preprocess → build → evaluate → optimize → deploy |
| Python's role | Dominant ML language thanks to its library ecosystem |
| R / Julia / Scala / Java / JS | Statistics / high-performance / big data / enterprise / in-browser ML |
| Matplotlib vs. Seaborn | Low-level control vs. high-level statistical plots built on Matplotlib |
| ggplot2 / Tableau | Layered graphics in R / interactive dashboards |
| NumPy → Pandas/SciPy → Scikit-learn | Arrays → data prep and science tools → classical ML models |
| Deep learning frameworks | TensorFlow, Keras (high-level on TF), PyTorch, Theano (legacy) |
| NLP tools | NLTK, TextBlob, Stanza |
| Generative AI | Creates new text, images, music, and media from prompts |
| Scikit-learn | Classical ML with a consistent `fit`/`predict` API |