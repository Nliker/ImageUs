import time
import psutil
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np
import os
np_file_path=os.path.dirname(os.path.realpath(__file__))+"np_save.npy"
# while True:
#     display_usage(None,psutil.virtual_memory().percent,30)
#     time.sleep(0.5)
def animate(i):
    memory_use_percent=psutil.virtual_memory().percent

    y.append(memory_use_percent)

    plt.cla()
    plt.plot(y,'r',label="real-time Memory usage")
            
    plt.tight_layout()
    
# if os.path.isfile(np_file_path):
y=np.load(np_file_path)

ani=FuncAnimation(plt.gcf(),animate,interval=100)
plt.show()
# else:
#     while True:
#         memory_use_percent=psutil.virtual_memory().percent
#         print(memory_use_percent)
        
#         time.sleep(1)