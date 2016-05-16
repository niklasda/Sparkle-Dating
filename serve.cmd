rem G:
rem cd G:\Projects\GitHub\Sparkle-Dating
cd Sparkle-Dating-App

start cmd /c "cordova serve"

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --new-window http://localhost:8000/browser/www/

cd ..

REM "D:\Program Files (x86)\Mozilla Firefox\firefox.exe" -height 800 -width 480 http://localhost:8000/browser/www/

REM "C:\Program Files\Internet Explorer\iexplore.exe"  http://localhost:8000/browser/www/

