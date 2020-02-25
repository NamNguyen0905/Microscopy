# Microscopy project for the USF-Health.

The current microscopy user utilizes the LeafLet JavaScript library to view the images. 

The step-by-step process to converting the files to view them in the LeafLet viewer:

1. Download the ZIPped image slides from the box, unzip it anywhere on your computer. 
2. Open up the Imagescope, and navigate to the directory where your image slides lay and open the image_slide_name.ini 
    Note: Imagescope is only available on Windows machines. 
3. As the image is displayed in Imagescroe, you can select and save the region of the image and convert it to .svs file. 
4. Convert the .svs file using the libvips library (Performed on the macOS machine according to instructions). 
    (vips dzsave name_of_slide_file.svs name_of_output_directory.zip  --background 0 --centre --layout google)
5. In your HTML file, add the necessary JS script to add the file and use it with LeafLet configuration.
          var slide_url_format = "{{path to the slide directory}}/tile_{z}_{x}_{y}.jpg"

          L.tileLayer(slide_url_format, {
            attribution: 'Slide images property and copyright YOUR NAME HERE',
            minZoom:2,
            maxZoom:8
          }).addTo(map);


The current repository contains two image slides to be instantly viewed in the index.html
To add the slides to the webpage, you need to navigate to the Project folder in BOX, into the "Slides for the viewer" folder. From there,
just download the image folder (EX: A7) and place it into the "Microscopy" folder into the "slides" folder. This will enable you to navigate
the landing page and locate the appropriate folder and view it in the Viewer. 

-2/25/2020
