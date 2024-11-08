import numpy as np
import datetime

# Define function
def f(t):
  return 1 / np.log(t + 1)

# Set integration limits
lower_limit = 1
upper_limit = 2777

# Generate t values
t_values = np.arange(lower_limit, upper_limit)

# Calculate function values
f_values = f(t_values)

# Calculate summation result
sum_f_values = np.sum(f_values)

# Set target value
target_value = 1_000_000_000

# Calculate A value
A = target_value / sum_f_values

# Generate result array
all_epochs = A * f(t_values)

# Set start date
start_date = datetime.date(2025, 1, 1)

# Generate date list (in 5-day increments)
date_list = [start_date + datetime.timedelta(days=5 * i) for i in range(len(all_epochs))]

# Combine all_epochs with dates to create output string
all_epochs_with_dates = "\n".join(f"{date}: {value}" for date, value in zip(date_list, all_epochs))
print(all_epochs_with_dates)
