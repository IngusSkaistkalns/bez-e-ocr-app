BezE Ocr App
==================

App that allows to upload image and gives back extracted text via tesseract

Test it here - https://bez-e-ocr-app.herokuapp.com/
Also try from mobile phones

Dependencies
--------------------------
* ruby 2.3
* node 6.3
* Tessaract - https://github.com/meh/ruby-tesseract-ocr, follow instructions.

At client side https://github.com/naptha/tesseract.js is used.

If problems with loading language tessdata, set correct TESSDATA_PREFIX - parent dir of tessdata.
For Ubutnu 16.x for example it is `/usr/share/tesseract-ocr`

**NOTE** - this setup was done only on Ubuntu 16.04, and after on Heroku

Run project
--------------------
* bundle install
* npm install
* foreman start -f Procfile.dev

Deployment production ENV
-------------------

Currently used these buildpcks on Heroku:

1. heroku/nodejs
2. heroku/ruby
3. https://github.com/AnyFetch/heroku-buildpack-tesseract
4. https://github.com/ddollar/heroku-buildpack-apt


Problems with tesseract
---------------------------

Be careful with version 3.04 and 3.03 are not compatable, so every requires different ruby gem version.
