# AI Fundamentals

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

---

## 1. AI, Machine Learning & Deep Learning — How They Relate

### Learning Perspective
These three terms are often used loosely, but they have a clear **nested relationship**:

- **Artificial Intelligence (AI)** — the broadest term: the ability of a computer system to perform tasks that would normally require **human intelligence** — reasoning, perception, decision-making, language understanding, and so on. AI includes everything from simple rule-based systems to the most advanced neural networks.
- **Machine Learning (ML)** — a **subset of AI** — systems that **learn patterns from data** rather than being explicitly programmed with fixed rules for every scenario. Instead of hand-coding logic, you feed the system examples, and it learns to generalize from them.
- **Deep Learning (DL)** — a **subset of ML** — uses **neural networks with many layers** ("deep" networks) to learn increasingly abstract representations of data, particularly effective for unstructured data like images, audio, and text.

```
AI  ⊃  Machine Learning  ⊃  Deep Learning
```

### Interview Perspective
**Q: How do AI, machine learning, and deep learning relate to each other?**
> They're nested, not separate categories. AI is the broadest goal — machines performing tasks associated with human intelligence. Machine learning is a subset of AI where systems learn patterns from data rather than following explicitly hand-coded rules. Deep learning is a further subset of machine learning, specifically using multi-layered neural networks, particularly effective for unstructured data like images and text.

**Q: Give an example of AI that is NOT machine learning.**
> A rule-based expert system — e.g., a chess-playing program using explicitly hand-coded heuristics and search rules rather than learning strategy from data — is AI (it performs a task requiring intelligence) but not ML, since there's no learning from examples involved.

---

## 2. Types of Machine Learning

### Learning Perspective
Machine learning approaches are generally grouped into three categories, based on what kind of data and feedback the system learns from:

- **Supervised learning** — the model learns from **labeled data** — input examples paired with the **correct answer** (the "label" or "target"). The model learns to map inputs to outputs, then generalizes to predict labels for new, unseen inputs.
  - **Classification** — predicting a **discrete category** (e.g., spam vs. not spam)
  - **Regression** — predicting a **continuous numeric value** (e.g., predicting a house's price)

- **Unsupervised learning** — the model learns from **unlabeled data**, finding **patterns or structure** on its own, without being told the "correct" answer.
  - **Clustering** — grouping similar data points together (e.g., customer segmentation)
  - **Dimensionality reduction** — compressing data into fewer variables while preserving important structure (e.g., PCA)

- **Reinforcement learning** — an **agent** learns by **interacting with an environment**, receiving **rewards or penalties** based on its actions, and gradually learning a strategy (**policy**) that maximizes cumulative reward over time — the paradigm behind systems that learn to play games or control robots through trial and error.

### Interview Perspective
**Q: What's the difference between supervised, unsupervised, and reinforcement learning?**
> Supervised learning trains on labeled data — the model learns to map known inputs to known correct outputs. Unsupervised learning works with unlabeled data, discovering patterns or groupings on its own, without a "correct answer" to learn from. Reinforcement learning has an agent learn through trial-and-error interaction with an environment, guided by rewards and penalties, rather than a fixed dataset of labeled examples.

**Q: What's the difference between classification and regression, within supervised learning?**
> Classification predicts a discrete category or class label (e.g., "spam" or "not spam"). Regression predicts a continuous numeric value (e.g., a price or a temperature). The distinction determines both the type of model/loss function used and how you'd evaluate performance.

⭐ **Extremely frequently asked** — the supervised/unsupervised/reinforcement distinction, and classification vs. regression, are foundational questions in almost any ML-adjacent interview.

---

## 3. The Machine Learning Workflow

### Learning Perspective
A typical supervised ML project follows a repeatable process:

1. **Data collection** — gathering relevant raw data
2. **Data preprocessing/cleaning** — handling missing values, removing duplicates/outliers, encoding categorical variables, normalizing/scaling numeric features
3. **Splitting the data** — dividing into **training**, **validation**, and **test** sets (commonly something like 70/15/15, though exact splits vary)
   - **Training set** — used to actually fit/train the model
   - **Validation set** — used to tune hyperparameters and compare models during development, without touching the final test set
   - **Test set** — used **only once**, at the very end, to get an unbiased estimate of how the model performs on genuinely unseen data
4. **Model selection & training** — choosing an appropriate algorithm and fitting it to the training data
5. **Evaluation** — measuring performance using appropriate metrics (see Section 6)
6. **Tuning** — adjusting hyperparameters, trying different features/models, based on validation performance
7. **Deployment & monitoring** — putting the model into production, and continuing to monitor its performance over time, since real-world data can shift (**model/data drift**)

### Interview Perspective
**Q: Why do you need three separate data splits — training, validation, and test — instead of just training and test?**
> The validation set lets you tune hyperparameters and compare different models *during development*, without touching the test set at all. If you used the test set for that tuning process, you'd effectively be "leaking" information from the test set into your model choices, making your final test performance an overly optimistic, biased estimate of real-world performance. The test set is reserved to be touched exactly once, at the very end, for a genuinely unbiased evaluation.

**Q: What is "data drift," and why does it matter after a model is deployed?**
> Data drift is when the statistical properties of real-world input data change over time, diverging from the distribution the model was originally trained on — causing model performance to silently degrade in production even though the model itself hasn't changed. This is why deployed models need ongoing monitoring and periodic retraining, not just a one-time training/evaluation cycle.

---

## 4. Overfitting & Underfitting

### Learning Perspective
Two of the most fundamental failure modes in machine learning:

- **Overfitting** — the model learns the **training data too well**, including its noise and idiosyncrasies, rather than the underlying general pattern. It performs great on training data but **poorly on new, unseen data** — it has essentially "memorized" rather than "generalized."
- **Underfitting** — the model is **too simple** to capture the underlying pattern in the data at all — it performs poorly on **both** training and test data.

**The bias-variance tradeoff** underlies this distinction:
- **High bias** (underfitting) — the model makes overly simplistic assumptions, missing real patterns
- **High variance** (overfitting) — the model is overly sensitive to the specific training data, capturing noise as if it were signal

**Common techniques to address overfitting:**
- **More training data**
- **Regularization** (e.g., L1/L2 penalties, which discourage overly complex models)
- **Simplifying the model** (fewer features/parameters)
- **Cross-validation** (see Section 5)
- **Early stopping** (halting training once validation performance stops improving)
- **Dropout** (specifically for neural networks — randomly disabling neurons during training to prevent over-reliance on specific paths)

### Interview Perspective
**Q: What's the difference between overfitting and underfitting?**
> Overfitting means the model fits the training data too closely — including its noise — so it performs well on training data but poorly on new, unseen data. Underfitting means the model is too simple to capture the real underlying pattern, performing poorly on both training and test data. Overfitting is a high-variance problem; underfitting is a high-bias problem.

**Q: How would you detect and address overfitting in a model you're training?**
> Detect it by comparing training performance to validation/test performance — a large gap (great training accuracy, much worse validation accuracy) is the classic sign. Address it via regularization, gathering more training data, simplifying the model, using cross-validation for more robust evaluation, or early stopping — halting training once validation performance plateaus or starts getting worse, even if training performance keeps improving.

⭐ **Extremely frequently asked** — be ready to both define overfitting/underfitting clearly *and* name concrete mitigation techniques; interviewers often ask both halves.

---

## 5. Model Evaluation Techniques

### Learning Perspective
- **Cross-validation** (commonly **k-fold cross-validation**) — instead of a single train/validation split, the data is divided into **k subsets ("folds")**; the model is trained k times, each time using a different fold as the validation set and the rest as training data. The results are averaged, giving a **more robust, less split-dependent estimate** of model performance than a single train/validation split would.

- **Confusion matrix** (for classification) — a table showing the counts of:
  - **True Positives (TP)** — correctly predicted positive
  - **True Negatives (TN)** — correctly predicted negative
  - **False Positives (FP)** — incorrectly predicted positive ("Type I error")
  - **False Negatives (FN)** — incorrectly predicted negative ("Type II error")

### Interview Perspective
**Q: What is k-fold cross-validation, and why is it preferred over a single train/validation split?**
> The data is split into k folds; the model trains k separate times, each time holding out a different fold for validation and using the rest for training, then the results are averaged. It's preferred because a single train/validation split can give a misleadingly optimistic or pessimistic result just by chance, depending on which specific data points ended up in each split — averaging across k different splits gives a more robust, reliable estimate of how the model will actually generalize.

**Q: What are the four cells of a confusion matrix, and what does each represent?**
> True Positives (correctly predicted positive), True Negatives (correctly predicted negative), False Positives (incorrectly predicted positive — a "false alarm"), and False Negatives (incorrectly predicted negative — a "miss"). Together they form the basis for calculating metrics like precision, recall, and accuracy.

---

## 6. Common Evaluation Metrics

### Learning Perspective
**For classification:**
- **Accuracy** — the proportion of predictions that were correct overall: `(TP + TN) / (TP + TN + FP + FN)`. Can be **misleading on imbalanced datasets** (e.g., if 95% of data is one class, a model that always predicts that class gets 95% accuracy while being useless).
- **Precision** — of everything predicted positive, how much was actually positive: `TP / (TP + FP)`. Matters when **false positives are costly** (e.g., flagging a legitimate email as spam).
- **Recall (Sensitivity)** — of everything that was actually positive, how much did the model correctly catch: `TP / (TP + FN)`. Matters when **false negatives are costly** (e.g., missing a fraudulent transaction, or missing a disease diagnosis).
- **F1 Score** — the **harmonic mean** of precision and recall, giving a single balanced metric when you care about both, especially useful for imbalanced datasets.

**For regression:**
- **Mean Absolute Error (MAE)** — average of the absolute differences between predicted and actual values
- **Mean Squared Error (MSE)** — average of the *squared* differences — penalizes larger errors more heavily than MAE
- **R² (R-squared)** — the proportion of variance in the target variable explained by the model — ranges roughly from 0 to 1 (higher is generally better; can even go negative for a poorly fit model)

### Interview Perspective
**Q: Why can accuracy be a misleading metric, and what would you use instead?**
> Accuracy can look great on an imbalanced dataset even when the model is essentially useless — e.g., a model that always predicts "not fraud" could achieve 99% accuracy if only 1% of transactions are actually fraudulent, while catching zero actual fraud cases. Precision, recall, and F1 score give a much more meaningful picture in these cases, since they specifically account for how well the model handles the minority (often more important) class.

**Q: When would you prioritize precision over recall, or vice versa?**
> Prioritize precision when false positives are more costly than false negatives — e.g., a spam filter incorrectly flagging an important email is worse than letting one spam email through. Prioritize recall when false negatives are more costly — e.g., in medical screening or fraud detection, missing a true positive case (a real disease, a real fraud) is far more dangerous than a false alarm that gets manually reviewed and dismissed.

⭐ **Extremely frequently asked** — the precision/recall tradeoff, with a concrete real-world example of when each matters more, is one of the single most common ML interview questions.

---

## 7. Neural Networks & Deep Learning Basics

### Learning Perspective
A **neural network** is a model loosely inspired by biological neurons, composed of layers of interconnected **nodes ("neurons")**:

- **Input layer** — receives the raw feature data
- **Hidden layer(s)** — intermediate layers that learn increasingly abstract representations of the data; a network with many hidden layers is what makes it "**deep**" learning
- **Output layer** — produces the final prediction (a class probability, a numeric value, etc.)

**Key components:**
- **Weights & biases** — learnable parameters that determine how strongly each connection influences the next layer; these are what actually get adjusted during training
- **Activation function** — a non-linear function applied at each neuron (e.g., **ReLU**, **sigmoid**, **softmax**), which is what allows a neural network to learn genuinely **non-linear** relationships — without activation functions, stacking layers would mathematically collapse into an equivalent single linear transformation, no matter how many layers you added
- **Forward propagation** — passing input data through the network, layer by layer, to produce an output/prediction
- **Loss function** — measures how wrong the model's prediction was compared to the actual target
- **Backpropagation** — the algorithm that calculates how much each weight contributed to the error, propagating that error information backward through the network
- **Gradient descent** — the optimization algorithm that uses those calculated gradients to actually **update the weights**, incrementally reducing the loss over many training iterations

### Interview Perspective
**Q: Why do neural networks need non-linear activation functions?**
> Without them, stacking multiple linear layers together is mathematically equivalent to just one single linear layer — no matter how many layers you add, the network could only ever learn linear relationships between inputs and outputs. Non-linear activation functions (like ReLU or sigmoid) are what give a deep network the ability to model genuinely complex, non-linear patterns in data.

**Q: Explain, at a high level, how a neural network actually learns from data.**
> Input data is passed forward through the network (forward propagation) to produce a prediction. A loss function compares that prediction to the actual target, quantifying the error. Backpropagation then calculates how much each individual weight in the network contributed to that error, working backward through the layers. Gradient descent uses those calculated gradients to nudge each weight in the direction that reduces the loss, and this process repeats over many iterations (epochs) until the model's predictions improve sufficiently.

---

## 8. Natural Language Processing (NLP) Basics

### Learning Perspective
**NLP** is the subfield of AI focused on enabling computers to **understand, interpret, and generate human language**.

**Foundational NLP concepts:**
- **Tokenization** — breaking text down into smaller units (**tokens**) — typically words or subwords — as the first step in most NLP pipelines
- **Stop words** — extremely common words (e.g., "the," "is," "and") often filtered out in traditional NLP pipelines, since they carry little distinguishing meaning for many tasks
- **Stemming/Lemmatization** — reducing words to their base/root form (e.g., "running" → "run"), so different forms of the same word are treated consistently
- **Embeddings** — representing words (or sentences/documents) as **dense numeric vectors**, capturing semantic meaning such that similar words end up with similar vector representations — a foundational technique underlying most modern NLP
- **Large Language Models (LLMs)** — modern NLP has largely shifted toward large, transformer-based neural networks (like the GPT family, Claude, and others) trained on massive text corpora, capable of a wide range of language tasks (generation, summarization, translation, question-answering) largely without task-specific engineering, in contrast to older, more manually-engineered NLP pipelines

### Interview Perspective
**Q: What is tokenization, and why is it typically the first step in an NLP pipeline?**
> Tokenization breaks raw text into smaller units — usually words or subwords — that downstream processing can work with. It's foundational because virtually every subsequent NLP step (removing stop words, stemming, generating embeddings, feeding data into a model) operates on these discrete tokens rather than raw, unstructured text.

**Q: What are word embeddings, and why are they useful compared to simpler text representations (like one-hot encoding)?**
> Embeddings represent words as dense numeric vectors that capture semantic meaning — words with similar meanings end up with similar (nearby) vector representations. This is far more useful than simpler representations like one-hot encoding, which treats every word as equally, maximally different from every other word, capturing no notion of meaning or relatedness at all.

---

## 9. Common Python AI/ML Libraries

### Learning Perspective
A quick map of the most commonly used libraries in the Python AI/ML ecosystem:

| Library | Primary use |
|---|---|
| **NumPy / Pandas** | Foundational numerical computing and data manipulation (covered in `numpy-and-pandas.md`) |
| **scikit-learn** | Classical/traditional machine learning — classification, regression, clustering, preprocessing, model evaluation utilities |
| **TensorFlow** | Deep learning framework (originally developed by Google), widely used in both research and production |
| **PyTorch** | Deep learning framework (originally developed by Meta/Facebook), especially popular in research settings for its flexibility |
| **Keras** | A high-level API (now integrated closely with TensorFlow) that simplifies building and training neural networks |
| **Matplotlib / Seaborn** | Data visualization, including visualizing model performance and data distributions |

### Interview Perspective
**Q: What's the difference between scikit-learn and a deep learning framework like TensorFlow/PyTorch?**
> scikit-learn is focused on classical machine learning algorithms (linear/logistic regression, decision trees, SVMs, clustering, etc.) with a simple, consistent API well-suited to structured/tabular data. TensorFlow and PyTorch are specifically built for constructing and training deep neural networks — offering the lower-level building blocks (layers, automatic differentiation, GPU acceleration) needed for deep learning, which scikit-learn doesn't provide.

---

## 10. AI Ethics & Limitations

### Learning Perspective
Understanding AI's limitations and ethical considerations is increasingly considered a core part of AI literacy, not a separate specialty:

- **Bias** — models can learn and even amplify biases present in their training data, leading to unfair or discriminatory outcomes (e.g., a hiring model trained on historically biased hiring data perpetuating that bias)
- **Explainability/interpretability** — some models (especially deep neural networks) function as "black boxes," making it hard to understand *why* a specific prediction was made — a significant concern in high-stakes domains (healthcare, lending, criminal justice) where decisions need to be justifiable
- **Overreliance/hallucination** (particularly relevant to modern LLMs) — models can produce confident-sounding but factually incorrect output, requiring human oversight rather than blind trust
- **Data privacy** — training data often includes sensitive personal information, raising questions about consent, anonymization, and appropriate use

### Interview Perspective
**Q: How can bias enter a machine learning model, and why is that a concern?**
> Bias typically enters through the training data itself — if historical data reflects existing societal or systemic biases, a model trained on it will learn and can even amplify those same patterns, since it's optimizing to replicate what's in the data, not to be "fair" by any independent standard. This is a concern because model outputs are often used to make real, consequential decisions (loans, hiring, sentencing recommendations), where perpetuating historical bias causes real harm.

**Q: Why does model explainability matter, particularly in high-stakes applications?**
> In domains like healthcare, lending, or criminal justice, decisions need to be justifiable and auditable — stakeholders (regulators, affected individuals, practitioners) often need to understand *why* a model made a specific prediction, not just *that* it made one. Complex models (especially deep neural networks) can be difficult to interpret, creating tension between using the most accurate model available and using one whose decisions can actually be explained and trusted.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| AI vs. ML vs. DL | Nested: AI ⊃ Machine Learning ⊃ Deep Learning |
| Supervised / unsupervised / reinforcement | Labeled data / unlabeled pattern-finding / trial-and-error with rewards |
| Classification vs. regression | Discrete category vs. continuous numeric value |
| Train / validation / test split | Fit the model / tune it / final unbiased evaluation (touched once) |
| Overfitting vs. underfitting | Memorizes training noise (high variance) vs. too simple to learn the pattern (high bias) |
| k-fold cross-validation | Averages performance across k train/validation splits — more robust than one split |
| Accuracy limitation | Misleading on imbalanced datasets |
| Precision vs. recall | Minimize false positives vs. minimize false negatives — choose based on which error is costlier |
| Why activation functions matter | Without them, stacked layers collapse into one linear transformation |
| Backpropagation + gradient descent | Calculate each weight's error contribution, then adjust weights to reduce loss |
| Tokenization | Breaking text into words/subwords — the first step of most NLP pipelines |
| Embeddings | Dense vectors capturing semantic meaning — similar words end up nearby |
| scikit-learn vs. TensorFlow/PyTorch | Classical ML algorithms vs. deep neural network construction/training |
| Bias in ML | Models can learn and amplify bias present in their training data |