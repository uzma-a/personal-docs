# Supervised Learning Models

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly, with worked examples where the math matters) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Builds on `intro-to-ml.md` (the landscape), `linear-and-logistic-regression.md` (the two foundational models), and `ai-fundamentals.md` (overfitting, evaluation metrics). This file covers the other major supervised models: decision trees, regression trees, k-NN, SVM, and ensemble methods. Wherever the math matters, a full worked example is included. Redo each with different numbers to make the calculations stick.

---

## 1. Classification Overview

### Learning Perspective
**Classification** is a **supervised machine learning method** used to **predict labels on new data**. The model trains on labeled examples, then assigns a class to examples it has never seen.

**Applications:**
- **Churn prediction:** will this customer leave?
- **Customer segmentation:** which group does this customer belong to?
- **Loan default prediction:** will this borrower fail to repay?
- **Multiclass drug prescriptions:** which of several drugs is best for this patient?

The first three are typically binary (two outcomes) or a small set of categories. The drug example is naturally **multiclass**, with more than two possible labels.

### Interview Perspective
**Q: What is classification, and how does it differ from regression?**
> Classification predicts a discrete label, such as "churn" or "no churn," while regression predicts a continuous number. Both are supervised, meaning they learn from labeled data. The choice depends on whether the target variable is categorical or numeric.

**Q: Give some real-world classification examples.**
> Predicting customer churn, assigning customers to segments, predicting loan defaults, and choosing among several drugs to prescribe to a patient. The first three are usually binary or small-category problems; the drug example is a multiclass problem.

---

## 2. Multiclass Classification: One-vs-All and One-vs-One

### Learning Perspective
Some algorithms (like logistic regression and SVM) are natively **binary classifiers**. **Binary classifiers can be extended to multiclass classification** using two strategies:

- **One-versus-all (OvA, also called one-vs-rest):** train **one classifier per class**, each separating that class from *all the others combined*. To predict, run every classifier and pick the class whose classifier is most confident.
- **One-versus-one (OvO):** train **one classifier for every pair of classes**. To predict, each pairwise classifier "votes," and the class with the most votes wins.

**Worked example:** a drug-prescription problem with **4 classes** (Drug A, B, C, D).
```
One-vs-all:  4 classifiers
  A vs. {B,C,D},  B vs. {A,C,D},  C vs. {A,B,D},  D vs. {A,B,C}

One-vs-one:  N(N-1)/2 = 4×3/2 = 6 classifiers
  A-B, A-C, A-D, B-C, B-D, C-D
```

| | One-vs-all | One-vs-one |
|---|---|---|
| **Number of classifiers** | N | N(N−1)/2 |
| **Data per classifier** | The entire dataset | Only the two classes involved |
| **Scales with many classes** | Better (grows linearly) | Worse (grows quadratically) |
| **Each classifier's task** | Harder: one class vs. a large "rest" group, often imbalanced | Easier: two classes only |

### Interview Perspective
**Q: How do you extend a binary classifier to handle more than two classes?**
> Using one-versus-all, where you train one classifier per class that separates it from everything else, or one-versus-one, where you train a classifier for each pair of classes and let them vote. Both turn a multiclass problem into several binary problems.

**Q: With 10 classes, how many classifiers does each strategy need?**
> One-vs-all needs 10. One-vs-one needs 10×9/2 = 45. One-vs-one grows quadratically with the number of classes, which is why it becomes expensive with many classes, though each of its classifiers trains on less data.

---

## 3. Decision Trees

### Learning Perspective
A **decision tree classifies data by testing features at each node, branching based on test results, and assigning classes at leaf nodes**.

**Structure:**
- **Root node:** the first test, applied to all the data
- **Internal (decision) nodes:** each tests a feature (for example, "Age < 30?")
- **Branches:** the outcomes of a test, such as yes/no
- **Leaf nodes:** the final output, a class label (for classification)

*Example (loan default):*
```
            [Income > 50k?]
             /          \
           Yes           No
            |             |
    [Has prior default?]  → Predict: Default
        /        \
      Yes         No
       |           |
   Predict:    Predict:
   Default     No Default
```

**Training a decision tree involves two key ideas:**
1. **Selecting the features (and thresholds) that best split the data.** At each node, the algorithm tries candidate splits and chooses the one that makes the resulting groups as "pure" as possible (mostly one class). Split quality is measured by information gain or Gini impurity (Section 4).
2. **Pruning the tree to avoid overfitting.** A tree allowed to grow until every leaf is perfectly pure will memorize the training data, including its noise. Pruning cuts back branches that add little predictive value.

**Two ways to prune:**
- **Pre-pruning (early stopping):** stop growing the tree early, for example by limiting maximum depth or requiring a minimum number of samples per leaf
- **Post-pruning:** grow the full tree, then remove branches that don't improve performance on validation data

**Strengths:** easy to interpret and visualize, handle numeric and categorical data, and need little preprocessing (no feature scaling required).
**Weaknesses:** prone to overfitting, and unstable, since small changes in the data can produce a very different tree.

```python
from sklearn.tree import DecisionTreeClassifier

tree = DecisionTreeClassifier(max_depth=4, min_samples_leaf=5)  # pre-pruning
tree.fit(X_train, y_train)
tree.predict(X_test)
```

### Interview Perspective
**Q: How does a decision tree make a prediction?**
> It starts at the root and tests a feature at each node, following the branch that matches the result, until it reaches a leaf node, which assigns the predicted class. Each path from root to leaf is effectively a rule like "if income > 50k and no prior default, then no default."

**Q: Why do decision trees overfit, and how do you prevent it?**
> If allowed to grow without limits, a tree keeps splitting until each leaf is nearly pure, effectively memorizing the training data, including noise. You prevent this by pruning: pre-pruning limits growth (maximum depth, minimum samples per leaf), and post-pruning removes branches that don't help on validation data.

**Q: Why don't decision trees need feature scaling?**
> Each split compares a single feature against a threshold, so it only depends on the ordering of that feature's values, not their scale. This differs from distance-based models like k-NN and SVM, where scale matters a lot.

---

## 4. Split Quality: Information Gain and Gini Impurity

### Learning Perspective
To choose the best split, the tree needs a way to measure how **impure** a group is. **Information gain** and **Gini impurity** are the two standard measures.

**Entropy** measures disorder or impurity:
```
Entropy = − Σ pᵢ × log₂(pᵢ)
```
**Information gain** is the reduction in entropy from a split:
```
Information Gain = Entropy(parent) − [weighted average Entropy(children)]
```

**Gini impurity** measures the probability of misclassifying a randomly chosen example if it were labeled according to the node's class distribution:
```
Gini = 1 − Σ pᵢ²
```

For a **binary problem**: both are **0 for a perfectly pure node** (all one class), and both are **highest at a 50/50 mix** (entropy = 1, Gini = 0.5).

**Worked example:** a node has 10 samples: 6 of class A, 4 of class B. A candidate split produces a left child with 5 samples (4 A, 1 B) and a right child with 5 samples (2 A, 3 B).

*Parent node:*
```
pA = 0.6, pB = 0.4
Gini    = 1 − (0.6² + 0.4²) = 1 − (0.36 + 0.16) = 0.48
Entropy = −(0.6·log₂0.6 + 0.4·log₂0.4) = −(0.6×−0.737 + 0.4×−1.322) ≈ 0.971
```

*Left child (4 A, 1 B):*
```
pA = 0.8, pB = 0.2
Gini    = 1 − (0.64 + 0.04) = 0.32
Entropy = −(0.8·log₂0.8 + 0.2·log₂0.2) ≈ 0.722
```

*Right child (2 A, 3 B):*
```
pA = 0.4, pB = 0.6
Gini    = 1 − (0.16 + 0.36) = 0.48
Entropy ≈ 0.971
```

*Weighted average of children (each has weight 5/10 = 0.5):*
```
Weighted Gini    = 0.5×0.32 + 0.5×0.48  = 0.40
Weighted Entropy = 0.5×0.722 + 0.5×0.971 ≈ 0.847
```

*Quality of this split:*
```
Gini decrease    = 0.48 − 0.40  = 0.08
Information gain = 0.971 − 0.847 ≈ 0.125
```

The tree would evaluate many candidate splits like this and choose the one with the **largest information gain** (or largest Gini decrease). A perfect split, one producing two completely pure children, would reduce Gini all the way to 0.

**Gini vs. entropy in practice:** they usually produce very similar trees. Gini is slightly cheaper to compute (no logarithms), which is why it's the default in scikit-learn's `DecisionTreeClassifier`.

### Interview Perspective
**Q: What do information gain and Gini impurity measure?**
> Both measure how good a split is, based on how pure the resulting groups are. Information gain is the reduction in entropy (disorder) from splitting; Gini impurity measures the chance of mislabeling a random example in a node. Lower impurity after the split means a better split, and the tree picks whichever candidate split gives the biggest improvement.

**Q: A node has 8 samples of class A and 2 of class B. What's its Gini impurity?**
> pA = 0.8, pB = 0.2, so Gini = 1 − (0.64 + 0.04) = 0.32.

**Q: What's the Gini impurity of a perfectly pure node, and of a perfectly mixed binary node?**
> A pure node has Gini = 0, since there's no chance of misclassification. A 50/50 binary node has Gini = 1 − (0.25 + 0.25) = 0.5, the maximum for two classes.

⭐ **Frequently asked with live math.** Be ready to compute Gini or entropy for a given class distribution, and to compare two candidate splits.

---

## 5. Regression Trees

### Learning Perspective
**Regression trees are similar to decision trees but predict continuous values** by **recursively splitting data to maximize information gain** (more precisely, to maximize the reduction in error). Instead of assigning a class label at each leaf, a leaf **predicts a number**, typically the **average of the target values** of the training examples that landed in that leaf.

**Split quality uses Mean Squared Error (MSE):** the best split is the one that minimizes the MSE of the resulting groups. A split is good when the examples in each child have target values close to their group's average.

**Worked example:** predicting a house price (in $1000s) from size. The node contains 4 houses with prices **[100, 110, 300, 310]**.

*Parent node (no split yet):*
```
mean = (100+110+300+310)/4 = 205
MSE  = [(100−205)² + (110−205)² + (300−205)² + (310−205)²] / 4
     = [11025 + 9025 + 9025 + 11025] / 4 = 10025
```

*Candidate split: {100, 110} on the left, {300, 310} on the right:*
```
Left  mean = 105,  MSE = [(−5)² + (5)²]/2 = 25
Right mean = 305,  MSE = [(−5)² + (5)²]/2 = 25
Weighted MSE = 0.5×25 + 0.5×25 = 25
```

The split dropped the MSE from **10025 to 25**, a huge improvement. The tree would choose it. The leaves then predict **105** and **305**, the group averages.

**Same overfitting risk as classification trees:** growing until each leaf holds one example gives zero training error but poor generalization, so pruning and depth limits apply here too.

```python
from sklearn.tree import DecisionTreeRegressor

reg = DecisionTreeRegressor(max_depth=3)
reg.fit(X_train, y_train)
```

### Interview Perspective
**Q: How does a regression tree differ from a classification tree?**
> The structure is the same, but a regression tree predicts a continuous value, usually the average target value of the training examples in a leaf, instead of a class label. It also judges splits using MSE (how tightly target values cluster within each group) rather than a class-purity measure like Gini.

**Q: Why does a regression tree predict the mean of the leaf's values?**
> The mean is the single value that minimizes squared error for that group of examples, so it's the natural prediction when the split criterion is MSE.

**Q: What's a limitation of regression trees compared to linear regression?**
> They predict piecewise-constant values, so the prediction function is a set of flat steps rather than a smooth line, and they can't extrapolate beyond the range of target values seen in training. On the other hand, they capture nonlinear relationships and interactions without any manual feature engineering.

---

## 6. K-Nearest Neighbors (k-NN)

### Learning Perspective
**K-Nearest Neighbors (k-NN)** is a **supervised algorithm used for classification and regression** that **assigns labels based on the closest labeled data points**.

**How it works (classification):**
1. Choose k, the number of neighbors.
2. For a new point, compute its **distance** (commonly Euclidean) to every training point.
3. Find the **k closest** training points.
4. Predict the **majority class** among those k neighbors.

For **regression**, step 4 instead predicts the **average** of the k neighbors' target values.

**Euclidean distance:** `d = √[(x₁−a₁)² + (x₂−a₂)² + …]`

**Worked example:** training points are A(1,1) Red, B(2,2) Red, C(6,5) Blue, D(7,7) Blue, E(5,7) Blue. Classify a new point **(3,3)**.

```
Distances from (3,3):
B(2,2): √(1+1)   = 1.41   Red
A(1,1): √(4+4)   = 2.83   Red
C(6,5): √(9+4)   = 3.61   Blue
E(5,7): √(4+16)  = 4.47   Blue
D(7,7): √(16+16) = 5.66   Blue
```
- **k = 1:** nearest is B → **Red**
- **k = 3:** B (Red), A (Red), C (Blue) → 2 Red vs. 1 Blue → **Red**
- **k = 5:** 2 Red vs. 3 Blue → **Blue**

The prediction **changes with k**, which is why choosing k matters.

**Optimizing k-NN:** the source's guidance is to **test various k values and measure accuracy, considering class distribution and feature relevance**.
- **Test various k values and measure accuracy.** Evaluate on validation data (or with cross-validation) across a range of k and pick the best.
  - **Small k** (like 1): sensitive to noise, high variance, overfits
  - **Large k:** smooths too much, high bias, underfits (in the extreme, it just predicts the majority class)
  - Using an **odd k** for binary problems avoids tied votes
- **Consider class distribution.** If one class vastly outnumbers another, a large k lets the majority class dominate. Imbalanced data may need distance-weighted voting or resampling.
- **Consider feature relevance.** Irrelevant features add noise to the distance calculation and can swamp the useful ones. Feature selection helps.
- **Scale your features.** Because k-NN is distance-based, a feature with large numeric range (like salary in the tens of thousands) will dominate one with a small range (like age) unless features are normalized or standardized.

**Characteristics:**
- **Lazy learner:** there's no training phase. It just stores the data, and all computation happens at prediction time.
- **Slow predictions on large data**, since it must compare the new point to every training point.
- Suffers from the **curse of dimensionality**: in very high dimensions, distances become less meaningful.

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

knn = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))
knn.fit(X_train, y_train)
```

### Interview Perspective
**Q: How does k-NN work, and what does "lazy learner" mean?**
> To classify a new point, k-NN finds the k closest training points by distance and takes a majority vote of their labels (or averages their values for regression). It's called a lazy learner because it does no real training. It just memorizes the data, and all the work happens at prediction time, which makes predictions slow on large datasets.

**Q: How do you choose the value of k?**
> By testing a range of k values and measuring accuracy on validation data or with cross-validation. Small k is noisy and overfits; large k oversmooths and underfits. I'd also check class balance and use an odd k for binary problems to avoid ties.

**Q: Why is feature scaling critical for k-NN?**
> Because k-NN relies on distance. A feature with a large numeric range would dominate the distance calculation and effectively drown out features with smaller ranges. Normalizing or standardizing features puts them on comparable scales so each contributes fairly.

**Q: Why does k-NN struggle in high-dimensional data?**
> This is the curse of dimensionality: as dimensions increase, data becomes sparse and distances between points become more uniform, so the "nearest" neighbors are barely closer than any other points, and the distance measure loses its usefulness. Feature selection or dimensionality reduction helps.

---

## 7. Support Vector Machines (SVM)

### Learning Perspective
**Support Vector Machines (SVM)** build classifiers by **finding a hyperplane that maximizes the margin between two classes**.

**Key terms:**
- **Hyperplane:** the decision boundary separating the classes. In 2D it's a line, in 3D a plane, and in higher dimensions a hyperplane.
- **Margin:** the distance between the hyperplane and the nearest data points of each class. SVM picks the hyperplane with the **widest possible margin**, since a wider margin generally generalizes better.
- **Support vectors:** the training points **closest to the hyperplane**. They alone define it. Moving or removing any other point doesn't change the boundary.

**Why maximize the margin?** Many lines could separate the classes, but one with maximal clearance from both classes is the most robust to small variations in new data.

**Handling data that isn't linearly separable:**
- **Soft margin:** allows some points to fall inside the margin or be misclassified, controlled by the parameter **C**. A **small C** tolerates more violations (wider margin, simpler model); a **large C** penalizes violations heavily (narrower margin, risk of overfitting).
- **Kernel trick:** implicitly maps the data into a higher-dimensional space where it becomes separable, without actually computing the transformation. Common kernels: **linear**, **polynomial**, and **RBF (radial basis function)**.

**Strengths and limitations (from the source):**
- **Effective in high-dimensional spaces,** such as text classification with thousands of features
- **Sensitive to noise,** since noisy points near the boundary can become support vectors and distort the margin
- **Sensitive to large datasets,** because training time grows quickly with the number of samples

Like k-NN, SVM is distance-based, so **feature scaling is important**.

```python
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

svm = make_pipeline(StandardScaler(), SVC(kernel="rbf", C=1.0))
svm.fit(X_train, y_train)
```

### Interview Perspective
**Q: What is the core idea of an SVM?**
> It finds the hyperplane that separates two classes with the maximum possible margin, meaning the greatest distance to the nearest points of each class. The points closest to the boundary, called support vectors, are the only ones that define it. A wider margin tends to generalize better to new data.

**Q: What are support vectors, and why are they important?**
> They're the training points closest to the decision boundary, lying on or inside the margin. They alone determine the hyperplane's position, so the model effectively depends on just these critical points. Removing a non-support-vector point wouldn't change the model at all.

**Q: What does the kernel trick do?**
> It lets an SVM handle data that isn't linearly separable by implicitly mapping it into a higher-dimensional space where a separating hyperplane exists, without explicitly computing the high-dimensional coordinates. Common kernels include linear, polynomial, and RBF.

**Q: What does the C parameter control?**
> It controls the trade-off between margin width and misclassification. A small C allows more violations for a wider, simpler margin; a large C penalizes violations heavily, producing a narrower margin that fits training data more tightly and risks overfitting.

**Q: Why might SVM be a poor choice for very large datasets?**
> Training time grows rapidly with the number of samples (roughly between quadratic and cubic), so it becomes slow and memory-hungry on large datasets. Other models, like tree ensembles or linear models trained with SGD, scale better.

---

## 8. The Bias-Variance Tradeoff

### Learning Perspective
The **bias-variance tradeoff affects model accuracy**. A model's prediction error can be understood as having two main sources:

- **Bias** is error from **overly simple assumptions**. A high-bias model **underfits**: it misses real patterns and performs poorly on both training and test data. *Example: fitting a straight line to curved data.*
- **Variance** is error from **sensitivity to the specific training data**. A high-variance model **overfits**: it fits the training data (including noise) very well but performs poorly on new data. *Example: a fully grown decision tree.*

```
Total error ≈ Bias² + Variance + Irreducible noise
```

**The tradeoff:** making a model more complex typically **lowers bias but raises variance**, while making it simpler does the opposite. The goal is the sweet spot with the lowest total error.

| | High bias | High variance |
|---|---|---|
| **Problem** | Underfitting | Overfitting |
| **Training error** | High | Low |
| **Test error** | High | Much higher than training |
| **Typical cause** | Model too simple | Model too complex |
| **Examples** | Linear model on curved data; k-NN with very large k | Deep unpruned tree; k-NN with k=1 |

**Methods to manage bias and variance** (Section 9): **bagging, boosting, and random forests** are the main ensemble techniques for improving performance by tackling these two error sources.

### Interview Perspective
**Q: Explain the bias-variance tradeoff.**
> Bias is the error from a model being too simple to capture the real pattern, which causes underfitting. Variance is the error from a model being too sensitive to the specific training data, which causes overfitting. Increasing complexity usually reduces bias but increases variance, and the aim is to find the balance that minimizes total error on new data.

**Q: How can you tell from training and test error whether a model has high bias or high variance?**
> High bias shows up as high error on both training and test data, because the model can't even fit the training data well. High variance shows up as low training error but much higher test error, because the model fit the training data too closely, including noise.

**Q: Where do decision trees and k-NN fall on the bias-variance spectrum as you vary their settings?**
> A deep, unpruned decision tree has low bias but high variance; limiting its depth raises bias and lowers variance. Similarly, k-NN with k=1 has low bias but high variance, while a very large k has high bias but low variance. Their hyperparameters directly control where on the spectrum they sit.

⭐ **Extremely frequently asked.** Bias-variance is one of the most common ML interview topics.

---

## 9. Ensemble Methods: Bagging, Boosting, and Random Forests

### Learning Perspective
**Ensemble methods** combine multiple models to produce better predictions than any single model. The three main ideas:

### Bagging (Bootstrap Aggregating)
- Create many **bootstrapped** versions of the training data, each drawn **randomly with replacement** (so some examples repeat and others are left out).
- **Train a separate model on each** bootstrap sample, in parallel and independently.
- **Combine the predictions:** majority vote for classification, average for regression.
- **Main effect: reduces variance.** Averaging many high-variance models smooths out their individual quirks and errors.

### Boosting
- Train models **sequentially**, where **each new model focuses on the examples the previous models got wrong** (by giving those examples higher weight or fitting to the remaining errors).
- Combine them into a **weighted** sum.
- **Main effect: reduces bias** (and can also reduce variance), turning many "weak learners" into one strong learner. Examples: AdaBoost, Gradient Boosting, XGBoost.
- Can overfit if run for too many rounds, and is more sensitive to noisy data than bagging.

### Random Forests
**Random forests use bagging to train multiple decision trees on bootstrapped data, improving accuracy by reducing variance.** They add one more twist: at **each split**, each tree considers only a **random subset of the features**, not all of them. This **decorrelates** the trees, since if one feature were very strong, plain bagged trees would all split on it first and end up too similar. More diverse trees give a better ensemble.

**How a random forest predicts:**
- **Classification:** every tree votes, and the majority class wins
- **Regression:** the trees' predictions are averaged

**Handy properties:**
- **Out-of-bag (OOB) error:** each tree never sees about one-third of the data (the examples left out of its bootstrap sample). Those left-out examples provide a built-in validation estimate without needing a separate validation set.
- **Feature importance:** the forest can report how much each feature contributed to its splits.
- More robust to overfitting than a single tree, but **less interpretable**, since you can't read a single tree to explain a prediction.

| | Bagging / Random Forest | Boosting |
|---|---|---|
| **Training** | Parallel, independent models | Sequential, each corrects the last |
| **Primary goal** | Reduce variance | Reduce bias |
| **Base learners** | Deep, high-variance trees | Shallow, high-bias "weak" learners |
| **Overfitting risk** | Low | Higher if over-run or data is noisy |

```python
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

rf = RandomForestClassifier(n_estimators=200, oob_score=True)
rf.fit(X_train, y_train)
print(rf.oob_score_)             # built-in validation estimate
print(rf.feature_importances_)   # which features mattered

gb = GradientBoostingClassifier().fit(X_train, y_train)
```

### Interview Perspective
**Q: What is bagging, and what does it improve?**
> Bagging trains multiple models on different bootstrap samples (random samples drawn with replacement) of the training data and combines their predictions by voting or averaging. It mainly reduces variance, because averaging many independently trained, high-variance models cancels out their individual errors.

**Q: What's the difference between bagging and boosting?**
> Bagging trains models independently, in parallel, on bootstrapped samples and averages them, mainly to reduce variance. Boosting trains models sequentially, with each new model concentrating on the examples earlier models got wrong, mainly to reduce bias. Bagging uses strong, high-variance learners; boosting typically combines many weak ones.

**Q: How is a random forest different from simply bagging decision trees?**
> A random forest is bagging with an extra source of randomness: at every split, each tree considers only a random subset of the features. This decorrelates the trees so they don't all make the same splits on a dominant feature, which makes the ensemble's errors more independent and its averaging more effective.

**Q: What is out-of-bag error?**
> Each tree in a random forest is trained on a bootstrap sample that leaves out roughly a third of the data. Those left-out examples can be used to test that tree, and aggregating across trees gives a validation-style error estimate for free, without needing a separate held-out set.

**Q: Why does a random forest generally beat a single decision tree?**
> A single deep tree has high variance: small changes in the data produce very different trees and it overfits. A random forest averages many diverse trees, which cancels out much of that variance while keeping the low bias of deep trees, giving noticeably better accuracy and stability.

⭐ **Frequently asked.** Random forests and the bagging-vs-boosting distinction come up constantly.

---

## 10. Comparing the Models

### Learning Perspective
| Model | Task | Strengths | Weaknesses | Scaling needed? |
|---|---|---|---|---|
| **Logistic regression** | Classification | Simple, interpretable, outputs probabilities | Linear boundaries only | Helpful |
| **Decision tree** | Both | Highly interpretable, handles mixed data | Overfits, unstable | No |
| **Random forest** | Both | Accurate, robust, low variance | Less interpretable, slower | No |
| **k-NN** | Both | Simple, no training, flexible boundaries | Slow predictions, curse of dimensionality | **Yes** |
| **SVM** | Mainly classification | Strong in high dimensions | Slow on large data, sensitive to noise | **Yes** |

### Interview Perspective
**Q: How would you choose among these models for a new classification problem?**
> I'd start with a simple, interpretable baseline such as logistic regression or a shallow decision tree. If I need better accuracy, I'd try a random forest or boosted trees, which are strong defaults for tabular data. I'd consider SVM for high-dimensional data of moderate size, and k-NN for small datasets where a simple method is enough. Dataset size, interpretability needs, and whether features are on comparable scales all influence the choice, and I'd compare candidates with cross-validation.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Classification | Supervised method that predicts labels, e.g. churn, loan default |
| One-vs-all / one-vs-one | N classifiers (class vs. rest) / N(N−1)/2 pairwise classifiers |
| Decision tree | Tests features at nodes, branches on results, assigns classes at leaves |
| Training a tree | Choose best-splitting features, then prune to avoid overfitting |
| Pre- vs. post-pruning | Stop growth early (depth/min samples) vs. cut back a full tree |
| Gini impurity | 1 − Σpᵢ²; 0 when pure, 0.5 max for two classes |
| Entropy / information gain | −Σpᵢlog₂pᵢ; gain = parent entropy − weighted child entropy |
| Regression tree | Predicts the leaf's mean; splits judged by MSE |
| k-NN | Majority vote (or average) of the k closest labeled points |
| Choosing k | Test several k; small k overfits, large k underfits; scale features |
| k-NN weakness | Lazy and slow at prediction; curse of dimensionality |
| SVM | Hyperplane that maximizes the margin; support vectors define it |
| SVM kernel trick | Handles non-linear data by implicitly mapping to higher dimensions |
| SVM limits | Sensitive to noise and slow on large datasets |
| Bias vs. variance | Underfitting from simplicity vs. overfitting from sensitivity |
| Bagging | Parallel models on bootstrap samples; reduces variance |
| Boosting | Sequential models fixing prior errors; reduces bias |
| Random forest | Bagged trees plus random feature subsets at each split |
| OOB error | Free validation estimate from examples left out of each bootstrap |