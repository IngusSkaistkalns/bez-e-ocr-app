BezE Ocr App
==================

App that allows to upload image and gives back extracted text via tesseract

Dependencies
--------------------------
* ruby 2.3
* node 6.3
* Tessaract - https://github.com/meh/ruby-tesseract-ocr, follow instructions.

If problems with loading language tessdata, set correct TESSDATA_PREFIX - parent dir of tessdata.
For Ubutnu 16.x for example it is `/usr/share/tesseract-ocr`

Run project
--------------------
* bundle install
* npm install
* foreman start
