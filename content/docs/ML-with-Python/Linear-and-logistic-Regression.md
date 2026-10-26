# Linear & Logistic Regression

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly, with worked examples where the math matters) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> Builds on `intro-to-ml.md` (where regression and classification were introduced as techniques) and `ai-fundamentals.md` (overfitting, evaluation metrics). This file goes into how these two foundational models actually work. Wherever the math matters, a full worked example is included. Redo each with different numbers to make the calculations stick.

---

## Part A — Regression Fundamentals

### 1. What Is Regression?

#### Learning Perspective
**Regression** models the relationship between a **continuous target variable** (the thing you want to predict) and one or more **explanatory features** (the inputs you predict from).

- **Dependent variable (target/response)** is the value being predicted, such as price or temperature.
- **Independent variables (features/predictors)** are the inputs used to make the prediction, such as square footage or advertising spend.

**Two main types:**
- **Simple regression** uses a **single** independent variable to estimate the dependent variable. *Example: predicting a house's price from its size alone.*
- **Multiple regression** uses **more than one** independent variable. *Example: predicting price from size, number of bedrooms, and location together.*

**Regression is widely applicable**, from **forecasting sales** and **estimating maintenance costs** to **predicting rainfall** and **disease spread**. Anywhere the goal is to predict a numeric quantity, regression is a natural starting point.

#### Interview Perspective
**Q: What is regression, and how is it different from classification?**
> Regression predicts a continuous numeric value, such as a price or a temperature, from input features. Classification predicts a discrete category. The distinction depends on the target variable: if it's a number on a continuous scale, it's regression; if it's a label from a fixed set, it's classification.

**Q: What's the difference between simple and multiple regression?**
> Simple regression uses one independent variable to predict the target; multiple regression uses two or more. Multiple regression can capture more of what drives the outcome, but it adds complexity and risks overfitting if too many variables are included.

---

## Part B — Linear Regression

### 2. Simple Linear Regression and Ordinary Least Squares

#### Learning Perspective
**Simple linear regression** fits a straight line to the data:

```
ŷ = β₀ + β₁x
```
- **ŷ** is the predicted value
- **β₀** is the **intercept**, the predicted value when x = 0
- **β₁** is the **slope**, how much ŷ changes for a one-unit increase in x

**The best-fit line is the one that minimizes errors.** The difference between an actual value and the predicted value is a **residual**: `residual = y − ŷ`. These errors are measured using **Mean Squared Error (MSE)**:

```
MSE = (1/n) × Σ (yᵢ − ŷᵢ)²
```

Residuals are **squared** so that positive and negative errors don't cancel out, and so that larger errors are penalized more heavily.

**This approach of choosing the line that minimizes the sum of squared errors is called Ordinary Least Squares (OLS).** For simple linear regression there is a closed-form solution:

```
β₁ = Σ (xᵢ − x̄)(yᵢ − ȳ) / Σ (xᵢ − x̄)²
β₀ = ȳ − β₁ x̄
```

**Worked example:** fit a line to these 5 points: (1, 2), (2, 4), (3, 5), (4, 4), (5, 5).

```
Step 1: means
x̄ = (1+2+3+4+5)/5 = 3
ȳ = (2+4+5+4+5)/5 = 4

Step 2: slope
Σ(x−x̄)(y−ȳ) = (−2)(−2) + (−1)(0) + (0)(1) + (1)(0) + (2)(1) = 4 + 0 + 0 + 0 + 2 = 6
Σ(x−x̄)²     = 4 + 1 + 0 + 1 + 4 = 10
β₁ = 6 / 10 = 0.6

Step 3: intercept
β₀ = 4 − 0.6 × 3 = 2.2

Fitted line:  ŷ = 2.2 + 0.6x
```

**Now compute the MSE:**
```
x=1: ŷ=2.8, residual = 2 − 2.8 = −0.8, squared = 0.64
x=2: ŷ=3.4, residual = 4 − 3.4 =  0.6, squared = 0.36
x=3: ŷ=4.0, residual = 5 − 4.0 =  1.0, squared = 1.00
x=4: ŷ=4.6, residual = 4 − 4.6 = −0.6, squared = 0.36
x=5: ŷ=5.2, residual = 5 − 5.2 = −0.2, squared = 0.04

Sum of squared errors = 2.40
MSE = 2.40 / 5 = 0.48
```
Any other line through this data would give a larger MSE. That is what "best fit" means.

**Interpreting the result:** the slope of 0.6 means each additional unit of x is associated with a 0.6 increase in y.

**Strengths and weaknesses of OLS:**
- **Easy to interpret.** Each coefficient has a clear meaning: the effect of that variable on the target.
- **Sensitive to outliers.** Because errors are *squared*, a single extreme point can pull the best-fit line far toward it and hurt accuracy for the rest of the data.

```python
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

model = LinearRegression().fit(X, y)
print(model.intercept_, model.coef_)   # 2.2, [0.6]
print(model.predict([[6]]))            # 5.8
```

#### Interview Perspective
**Q: What does OLS minimize, and why squared errors rather than absolute errors?**
> OLS minimizes the sum of squared residuals, the differences between actual and predicted values. Squaring prevents positive and negative errors from canceling out, penalizes large errors more heavily, and also gives a smooth, differentiable function, which makes it mathematically convenient and gives a clean closed-form solution.

**Q: Why is linear regression sensitive to outliers?**
> Because errors are squared, an outlier's error counts disproportionately. A single extreme point can drag the best-fit line toward it, distorting the fit for all the other points. Common remedies are removing or investigating outliers, transforming the data, or using a more robust method.

**Q: Given the points (1,2), (2,4), (3,5), (4,4), (5,5), what's the fitted line?**
> The means are x̄ = 3 and ȳ = 4. The slope is Σ(x−x̄)(y−ȳ) / Σ(x−x̄)² = 6/10 = 0.6, and the intercept is 4 − 0.6×3 = 2.2, so ŷ = 2.2 + 0.6x.

⭐ **Frequently asked with live math.** Be ready to compute a slope and intercept by hand for a small dataset.

---

### 3. Multiple Linear Regression

#### Learning Perspective
**Multiple linear regression extends simple linear regression** by using **multiple variables to predict outcomes** and to **analyze relationships between variables**:

```
ŷ = β₀ + β₁x₁ + β₂x₂ + … + βₙxₙ
```

Each coefficient βᵢ represents the effect of that feature on the target **while holding the other features constant**. That qualifier is what lets you analyze each variable's individual contribution.

*Example:* predicting a house price from size (x₁), bedrooms (x₂), and distance to the city center (x₃).

**The overfitting risk: adding too many variables can lead to overfitting.** A model with many features can start fitting noise in the training data rather than the true underlying pattern, performing well on training data but poorly on new data (see `ai-fundamentals.md`). Therefore **careful variable selection is necessary** to build a **balanced model** that is complex enough to capture real relationships but not so complex that it memorizes noise.

**Related issue, multicollinearity:** when two or more features are highly correlated with each other (for example, square footage and number of rooms), the model struggles to separate their individual effects, making coefficients unstable and harder to interpret.

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression().fit(X_train, y_train)   # X_train now has multiple columns
print(model.coef_)   # one coefficient per feature
```

#### Interview Perspective
**Q: How does multiple linear regression differ from simple linear regression, and what does each coefficient mean?**
> Multiple linear regression uses several independent variables instead of one. Each coefficient represents the expected change in the target for a one-unit increase in that feature, holding all the other features constant, which lets you isolate each variable's individual contribution.

**Q: Why can adding more variables to a regression model hurt it?**
> More variables give the model more flexibility, which can cause it to fit random noise in the training data rather than the real underlying pattern, which is overfitting. The model looks great on training data but generalizes poorly. Careful variable selection, regularization, or validating on held-out data helps keep the model balanced.

**Q: What is multicollinearity, and why is it a problem?**
> It's when predictor variables are strongly correlated with one another. The model can't cleanly separate their individual effects, so coefficient estimates become unstable and hard to interpret, even if overall predictions stay reasonable.

---

### 4. Nonlinear and Polynomial Regression

#### Learning Perspective
Real data doesn't always follow a straight line. **Nonlinear regression models complex relationships** using **polynomial, exponential, or logarithmic functions** when data does not fit a straight line.

- **Polynomial:** ŷ = β₀ + β₁x + β₂x² + … (for curves)
- **Exponential:** growth or decay patterns, such as population growth or compound interest
- **Logarithmic:** relationships that rise quickly and then level off

**Polynomial regression** fits curved data by adding powers of x as extra features. It remains linear in its *coefficients*, which is why it can still be solved with OLS-style methods.

**The overfitting warning: polynomial regression can overfit by capturing random noise rather than the underlying patterns.** A higher-degree polynomial can wiggle to pass through every training point, including the noisy ones, producing a curve that fits the training data nearly perfectly but predicts new data poorly.

```
Low degree   → may underfit (too simple to capture the curve)
Moderate     → captures the true pattern
Very high    → overfits (chases noise)
```

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline

model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
model.fit(X_train, y_train)
```

#### Interview Perspective
**Q: When would you use polynomial regression instead of simple linear regression?**
> When the relationship between the feature and target is clearly curved rather than straight. Adding polynomial terms lets the model capture that curvature. The trade-off is that a high polynomial degree can overfit, so the degree should be chosen carefully, typically using validation data or cross-validation.

**Q: Is polynomial regression a linear or nonlinear model?**
> It models a nonlinear relationship between x and y, but it's linear in its coefficients, since the model is a weighted sum of terms like x and x². That's why standard linear-regression fitting methods still work once the polynomial features are created.

**Q: How would you detect that a polynomial model is overfitting?**
> Compare performance on training versus validation data. If training error is very low but validation error is much higher, the model is likely fitting noise. Lowering the degree, adding more data, or using regularization are common fixes.

---

## Part C — Logistic Regression

### 5. What Is Logistic Regression?

#### Learning Perspective
Despite its name, **logistic regression is used for classification**, not for predicting continuous values. It is a **probability predictor and binary classifier**, **suitable for binary targets** (two outcomes, such as yes/no, spam/not spam, disease/no disease) and for **assessing feature impact** (how much each feature pushes the odds of one outcome).

**How it works:** instead of predicting a raw number, it predicts the **probability** that an example belongs to the positive class (a value between 0 and 1). It does this by passing a linear combination of the features through the **sigmoid (logistic) function**:

```
z = β₀ + β₁x₁ + … + βₙxₙ          (a linear combination, as in linear regression)
p = σ(z) = 1 / (1 + e^(−z))         (squashed into the range 0 to 1)
```

**Sigmoid behavior:**
- Large positive z → p close to 1
- Large negative z → p close to 0
- z = 0 → p = 0.5

**Worked example:**
```
z = 0  → p = 1 / (1 + e⁰)    = 1 / 2          = 0.50
z = 2  → p = 1 / (1 + e⁻²)   = 1 / 1.1353     ≈ 0.88
z = −2 → p = 1 / (1 + e²)    = 1 / 8.389      ≈ 0.12
```

**Turning probability into a class:** apply a **decision threshold**, typically 0.5. If p ≥ 0.5, predict class 1; otherwise class 0. The threshold can be adjusted depending on the cost of different errors (see precision/recall in `ai-fundamentals.md`).

**Assessing feature impact:** each coefficient shows how a feature changes the **log-odds** of the positive outcome. A positive coefficient increases the probability of class 1; a negative one decreases it, which makes logistic regression fairly interpretable.

```python
from sklearn.linear_model import LogisticRegression

clf = LogisticRegression().fit(X_train, y_train)
clf.predict_proba(X_test)   # probabilities for each class
clf.predict(X_test)         # class labels (0 or 1)
```

#### Interview Perspective
**Q: Why is logistic regression called "regression" if it's a classification algorithm?**
> Because it's built on a linear regression-style model: it computes a linear combination of the features. But instead of outputting that number directly, it passes it through the sigmoid function to produce a probability between 0 and 1, and then thresholds that probability to assign a class. The name is historical, but the task is classification.

**Q: What does the sigmoid function do, and why is it used?**
> It maps any real number to a value between 0 and 1, which can be interpreted as a probability. A linear model's raw output can be any number from negative to positive infinity, which makes no sense as a probability, so the sigmoid squashes it into a valid probability range.

**Q: How would you interpret a coefficient in logistic regression?**
> It represents the change in the log-odds of the positive class for a one-unit increase in that feature, holding the others constant. A positive coefficient raises the probability of the positive class; a negative one lowers it. This makes it useful for understanding which features matter and in which direction.

**Q: What's the default decision threshold, and when would you change it?**
> 0.5 is the usual default. You'd change it when the costs of errors are unequal. For example, in disease screening you might lower the threshold to catch more true cases (higher recall), accepting more false alarms.

---

### 6. Log-Loss: How Logistic Regression Measures Error

#### Learning Perspective
Linear regression uses MSE. Logistic regression instead **minimizes errors using log-loss** (also called **binary cross-entropy**), which is designed for probabilities.

```
Log-loss = −(1/n) × Σ [ yᵢ·ln(pᵢ) + (1 − yᵢ)·ln(1 − pᵢ) ]
```

**Intuition:** log-loss heavily **penalizes confident wrong predictions**.

**Worked example for a single example whose true label is y = 1:**
```
Predicted p = 0.9 (confident, correct):   loss = −ln(0.9) = 0.105   (small)
Predicted p = 0.5 (unsure):               loss = −ln(0.5) = 0.693   (moderate)
Predicted p = 0.1 (confident, wrong):     loss = −ln(0.1) = 2.303   (large)
```
The more confident and wrong the prediction, the larger the penalty grows. This pushes the model toward well-calibrated probabilities.

**Why not just use MSE for logistic regression?** Combined with the sigmoid, MSE produces a non-convex cost surface with flat regions and local minima, which makes optimization harder. Log-loss gives a **convex** cost function, so gradient descent can reliably find the global minimum.

#### Interview Perspective
**Q: What is log-loss, and why is it used for logistic regression instead of MSE?**
> Log-loss, or binary cross-entropy, measures how far predicted probabilities are from the true labels, and it penalizes confident wrong predictions very heavily. It's used instead of MSE because, with the sigmoid function, it produces a convex cost surface that gradient descent can optimize reliably, whereas MSE would create a non-convex surface prone to poor local behavior.

**Q: For a true label of 1, compare the loss when the model predicts 0.9 versus 0.1.**
> −ln(0.9) ≈ 0.105 versus −ln(0.1) ≈ 2.303. The confident wrong prediction is penalized more than twenty times as heavily as the confident correct one, which is exactly the behavior log-loss is designed to produce.

---

### 7. Gradient Descent and Stochastic Gradient Descent

#### Learning Perspective
Unlike OLS in simple linear regression, logistic regression has no closed-form solution. It is trained using **gradient descent**.

**Gradient descent is an iterative process to minimize the cost function**, which is **crucial for training logistic regression models**. The idea:

1. Start with initial (often random or zero) values for the coefficients.
2. Compute the **gradient**, the direction in which the cost increases fastest.
3. Move the coefficients a small step in the **opposite** direction (downhill).
4. Repeat until the cost stops decreasing meaningfully (convergence).

```
θ := θ − α × ∇J(θ)
```
- **θ** are the model parameters (coefficients)
- **α** is the **learning rate**, the step size
- **∇J(θ)** is the gradient of the cost function

**The learning rate matters:**
- **Too small:** training is very slow
- **Too large:** the steps overshoot the minimum, and the cost may oscillate or even diverge
- **Well-chosen:** steady progress toward the minimum

**Variants, which differ in how much data is used to compute each gradient step:**
| Variant | Data per update | Trade-off |
|---|---|---|
| **Batch gradient descent** | The entire dataset | Stable, smooth convergence, but slow and memory-heavy on large data |
| **Stochastic gradient descent (SGD)** | One example at a time | Much faster per update and efficient on large datasets, but noisier |
| **Mini-batch gradient descent** | A small batch of examples | A practical compromise, and the most common in practice |

**Why SGD is used for efficiency:** computing the gradient over an entire large dataset for every single step is expensive. SGD updates after each example (or small batch), reaching a good solution much faster on large datasets. Its noisiness can even help the model escape shallow local minima.

#### Interview Perspective
**Q: How does gradient descent work, in plain terms?**
> It's an iterative optimization method. Starting from initial parameter values, it repeatedly computes the gradient of the cost function, which points in the direction of steepest increase, and takes a small step in the opposite direction to reduce the cost. It repeats until the cost stops improving significantly. It's like walking downhill in fog, always stepping in the steepest downward direction you can feel.

**Q: What is the learning rate, and what happens if it's too large or too small?**
> It's the step size for each update. Too small, and training converges very slowly. Too large, and the steps can overshoot the minimum, causing the cost to bounce around or diverge. A well-chosen learning rate gives steady progress toward the minimum.

**Q: What's the difference between batch gradient descent and stochastic gradient descent?**
> Batch gradient descent computes each update using the entire dataset, giving stable but slow steps. Stochastic gradient descent updates using a single example (or small mini-batch) at a time, which is much faster per step and scales better to large datasets, at the cost of noisier updates. Mini-batch gradient descent is the common compromise.

⭐ **Extremely frequently asked.** Gradient descent underlies not just logistic regression but neural network training too, so be ready to explain it clearly, including the learning rate.

---

## Part D — Comparing the Two

### 8. Linear vs. Logistic Regression

#### Learning Perspective
| | Linear regression | Logistic regression |
|---|---|---|
| **Task** | Regression (predict a continuous number) | Classification (predict a class / probability) |
| **Output** | Any real number | A probability between 0 and 1 |
| **Key function** | Linear equation | Linear equation passed through the sigmoid |
| **Error measure** | Mean Squared Error (MSE) | Log-loss (binary cross-entropy) |
| **Optimization** | OLS closed-form solution (or gradient descent) | Gradient descent / SGD (no closed form) |
| **Example** | Predicting house price | Predicting whether a customer will churn |
| **Sensitive to** | Outliers (squared errors) | Class imbalance, the chosen threshold |

#### Interview Perspective
**Q: Summarize the key differences between linear and logistic regression.**
> Linear regression predicts a continuous number and is fit by minimizing squared error, often with a closed-form OLS solution. Logistic regression predicts the probability of a class by passing a linear combination through the sigmoid function, and it is trained by minimizing log-loss using gradient descent. Linear regression is for regression problems, logistic regression is for classification.

**Q: Can you use linear regression for a binary classification problem?**
> You technically can, but it's a poor choice. Linear regression can output values below 0 or above 1, which aren't valid probabilities, and it isn't designed to model a binary outcome. Logistic regression is built for this, keeping outputs in the 0–1 range and using an appropriate loss function.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Regression | Predicts a continuous target from explanatory features |
| Simple vs. multiple regression | One independent variable vs. two or more |
| Typical uses | Forecasting sales, estimating costs, predicting rainfall or disease spread |
| OLS | Chooses the line that minimizes the sum of squared errors (MSE) |
| Slope / intercept formula | β₁ = Σ(x−x̄)(y−ȳ)/Σ(x−x̄)², β₀ = ȳ − β₁x̄ |
| OLS weakness | Sensitive to outliers because errors are squared |
| Multiple linear regression | Several predictors; each coefficient holds the others constant |
| Too many variables | Risk of overfitting, so variable selection is needed |
| Multicollinearity | Correlated predictors make coefficients unstable |
| Nonlinear regression | Polynomial, exponential, or logarithmic fits for curved data |
| Polynomial overfitting | High degree fits noise instead of the real pattern |
| Logistic regression | Binary classifier and probability predictor via the sigmoid function |
| Sigmoid | Squashes any real number into the range 0 to 1 |
| Log-loss | Cost function that heavily penalizes confident wrong predictions |
| Gradient descent | Iteratively steps opposite the gradient to minimize the cost |
| Learning rate | Step size: too small is slow, too large overshoots or diverges |
| SGD vs. batch | One example per update (fast, noisy) vs. the whole dataset (stable, slow) |