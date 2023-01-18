import time
import psutil
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# while True:
#     display_usage(None,psutil.virtual_memory().percent,30)
#     time.sleep(0.5)

y=[]
def animate(i):
    memory_use_percent=psutil.virtual_memory().percent

    y.append(memory_use_percent)

    plt.cla()
    plt.plot(y,'r',label="real-time Memory usage")
    
    plt.tight_layout()

ani=FuncAnimation(plt.gcf(),animate,interval=1000)
plt.show()