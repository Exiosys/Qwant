#!/bin/bash

rm -rf Qwant_News

echo -e "Hey hey ! Vous avez lancé \033[1;31m Setup.sh \033[0m permettant l'installation de l'environnement de travail."
echo -e "\033[0;36mClonage du répértoire gitlab [...] \033[0m"
git clone git@rendu-git.etna-alternance.net:module-6274/activity-34988/group-745046.git Qwant_News
echo -e "\033[0;32mClonage réussie. \033[0m"
cd Qwant_news
echo -e "\033[0;36mMise à jour des dépendances [...] \033[0m"

npm -v
if [[ $? != 0 ]] ; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        which -s brew
        if [[ $? != 0 ]] ; then
            # Install Homebrew
            ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        else
            brew update
        fi
    elif [[ "$OSTYPE" == "win32" ]]; then
        @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object wet.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
        cinst nodejs install
    fi
    brew install npm
else 
    npm update
fi

npm install jquery
echo -e "\033[0;32mJquery installé. \033[0m"
npm install tippy.js
echo -e "\033[0;32mTippy.js installé. \033[0m"
npm install moment
echo -e "\033[0;32mMoment installé. \033[0m"
npm install --save react react-copy-to-clipboard
echo -e "\033[0;32mReact-Copy-To-Clipboard installé. \033[0m"
echo -e "\033[0;32mMise à jour réussie. \033[0m"
echo -e "\033[0;36mLancement du serveu [...] \033[0m"
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome  http://localhost:6660/ --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
npm start