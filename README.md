# Synrgise Typing Test SCORM Package

This SCORM package provides a typing test game where students can practice typing a series of words or characters while tracking their accuracy.

## Instructions

1. **Download the SCORM Package:**
   - Download the SCORM package as a zip file from [this link](https://github.com/Synrgise/SynrgiseTypingTestScorm/archive/refs/heads/main.zip).
   - Once downloaded, unzip the contents of the zip file.

2. **Update `data.json` File:**
   - Locate the `data.json` file within the unzipped package.
   - Open the `data.json` file using a text editor.
   - Update the following parameters:
     - **Time Limit:** Set the time limit for the game in seconds.
     - **Quotes/Text-Strings:** Provide an array of quotes or text-strings that the student will be presented with during the game. Each quote should be limited to no more than 500 characters.
   - Save the changes to the `data.json` file.

3. **Update `imsmanifest.xml` File:**
   - Locate the `imsmanifest.xml` file within the package.
   - Open the `imsmanifest.xml` file using a text editor.
   - Find the `<title>{Typing Game - Name}</title>` tags.
   - Replace `{Typing Game - Name}` with the desired name for your SCORM package.
   - Save the changes to the `imsmanifest.xml` file.

4. **Local Testing:**
   - To test the SCORM package locally, you use Python to run a local web server:
     - **For Windows:**
       - Download and install Python from [python.org](https://www.python.org/downloads/).
       - Open Command Prompt and navigate to the folder containing the unzipped SCORM package.
       - Run the command: `python -m http.server`.
     - **For Mac:**
       - Mac systems typically come with Python pre-installed.
       - Open Terminal and navigate to the folder containing the unzipped SCORM package.
       - Run the command: `python3 -m http.server`.
   - Once the server is running, open your web browser and navigate to `http://localhost:8000` to access the game and test it.

5. **Zip the Contents:**
   - Select all the files and folders within the package directory (excluding the directory itself).
   - Right-click on the selection and choose the option to compress or zip the files.
   - Ensure that the zip file contains the updated `data.json` and `imsmanifest.xml` files along with other necessary files.

6. **Upload to SCORM-Compatible LMS:**
   - Once the contents are zipped, you can upload the zip file to any SCORM 1.2 compatible Learning Management System (LMS).
   - Follow the instructions provided by your LMS to upload and deploy the SCORM package.

By following these instructions, you can customize the time limit, quotes, and title of the typing test game within the SCORM package and deploy it to your preferred SCORM-compatible LMS for student use.
