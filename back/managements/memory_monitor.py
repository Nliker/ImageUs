import psutil
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np
import os
from datetime import datetime
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='settings for monitoring memory')

    parser.add_argument('--load', '-l', type=str, help='load for npy file,if load was given it will show you just loaded plot')
    parser.add_argument('--interval', '-i', type=int, default=100, help='ms for monitoring interval')
    parser.add_argument('--time', '-t', type=int, default=300, help='sec for monitoring time')

    input_args = parser.parse_args()

    print(input_args)

    np_file_dir=os.path.dirname(os.path.realpath(__file__))+'/memory_history'

    if hasattr(input_args,'load') and input_args.load != None:
        file_path=np_file_dir+'/'+input_args.load
        print(file_path)
        if os.path.exists(file_path):
            temp=np.load(file_path)
            plt.plot(temp,'r',label="real-time Memory usage")
            plt.show() 
    else:
        if not os.path.exists(np_file_dir):
            os.mkdir(np_file_dir)
        save_file_path=''
        y=[]
        
        def animate_memory(i):
            global y
            global save_file_path
            
            if len(y)==0:
                now = datetime.now()
                date_time = now.strftime("%Y_%m_%d_%H_%M_%S")
                save_file_path=np_file_dir+'/'+date_time+'.npy'
                print(save_file_path)
                
                
            if len(y)>=(input_args.time*round(1000/input_args.interval)):
                np.save(save_file_path,y)
                y=[]
                
                return
            
            memory_use_percent=psutil.virtual_memory().percent
            
            y.append(memory_use_percent)


            plt.cla()
            plt.plot(y,'r',label="real-time Memory usage")
                    
            plt.tight_layout()
        
        ani=FuncAnimation(plt.gcf(),animate_memory,interval=input_args.interval)
        plt.show() 

