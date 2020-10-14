# slowedandreverb
slowed+reverb generator

--------------------------------
[slowreverbgenerator.com](slowreverbgenerator.com)
--------------------------------

This is website I created to easily add high quality slow + reverb effects to any audio file. Simply drag and drop an audio file,
select your effect preferences and click the slow it down button. An audio player will appear to let you try out the song, and a 
download button will allow you to download the file.

This project was built using React.js and MaterialUI for the front end and the Express.js framework within Node.js to run the backend.

The front end consists of a hirearchy of multiple components, leveraging MaterialUI's package of components. The component hirearcby is
a bit loaded on the front page jsx. I would have ideally split it into a more organized structure, however this project was a learning
process.

The backend receives the file, applies the effects and sends the new file back as a response. The file is stored temporarily with a unique
Id so that conquerent requests don't have conflicting file names, and uses sox to apply the desired affects. While storing the file
in memory would be desireable to eliminate a disk write, sox must work with files from disk, and since the project is hosted on a
Digital Ocean Droplet instance, the main storage used is an SSD which gives minimal write time. Future updates to the project would
be to have the response of the request be returned in the form of a stream to allow for faster response times where users can receive
the file as its buffered.

The website is hosted in the cloud on a Digital Ocean droplet instance using a combination of PM2 and Serve to serve the files. Also, an 
NGINX reverse proxy is used.
