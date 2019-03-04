mv app/* ./
git branch -D gh-pages 2>/dev/null
git branch gh-pages
git checkout gh-pages
git add --a
git commit -m 'deploy'
git push --set-upstream origin gh-pages -f
git checkout master
