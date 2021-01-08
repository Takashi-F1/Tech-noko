import tkinter as tk
import random
import time
import pygame
from pygame import mixer
import sys

#jsから受け取るdata
# receive_data = sys.stdin.readline()
receive_data = "hamabe"

tanjiro = ("./img/tomi.png","./img/tan2.png")
hamabe = ("./img/hamabe.png","./img/hamabe1.png")
koba = ("./img/koba.PNG","./img/koba.PNG")
iwa = ("./img/iwa.PNG","./img/iwa.PNG")

pygame.init()
#img, word, sound 分岐
if receive_data.strip()=="tanjiro":
    img_list = tanjiro
    words=("がんばれ！","　寝るな！")
    sound=pygame.mixer.Sound("se26.wav")
elif receive_data.strip()=="hamabe":
    img_list = hamabe
    words=("お疲れ様♪","　大丈夫？")
    sound=pygame.mixer.Sound("se26.wav")
elif receive_data.strip()=="koba":
    img_list = koba
    words=("がんばれ！","　寝るな！","お疲れ様♪","　大丈夫？")
    sound=pygame.mixer.Sound("koba2.wav")
elif receive_data.strip()=="iwa":
    img_list = iwa
    words=("がんばれ！","　寝るな！","お疲れ様♪","　大丈夫？")
    sound=pygame.mixer.Sound("se26.wav")


# ウィンドウ作成
root = tk.Tk()
root.title("やる気UPｓ")
root.geometry("300x120+1230+600")
sound.play()
# 画像表示
#fileに適当なpng画像を指定してください。PGM; PPM; GIF; PNGの4形式のみ使用可能



# img_list = mijika
# words=("お疲れ様♪","　大丈夫？")
# words=("がんばれ！","　寝るな！")

wrd=random.choice(words)
##--------------------------------

haruna = tk.PhotoImage(file = random.choice(img_list))
canvas = tk.Canvas(bg="white", width=300, height=120)
canvas.place(x=0, y=0)
canvas.create_text(150,50,text=wrd,anchor=tk.NW,font=("Courier",20))
canvas.create_image(300, 0, image=haruna, anchor=tk.NE)

for x in range(0 , 35):
    canvas.move(1,-4.1,0)
    root.update()
    time.sleep(0.05)
    
root.after(3000, lambda: root.destroy())
# メインループ
root.mainloop()

