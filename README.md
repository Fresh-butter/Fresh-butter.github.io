# Personal Website Readme

## Project Overview
This project is a personal website created for CS6.201 - Introduction to Software Systems (Assignment 3). The website showcases personal information, educational background, skills, and includes interactive features like a text analyzer.

## GitHub Repository
The website is hosted on GitHub Pages at [https://Fresh-butter.github.io](https://Fresh-butter.github.io)

## Features
1. **About Section**: Personal information and profile
2. **Birthplace Section**: Information and images about Motihari, Bihar
3. **Education Section**: Academic background and achievements
4. **Skills Section**: Technical skills with proficiency indicators
5. **CV Section**: Downloadable CV
6. **Text Analyzer Tool**: Interactive text analysis functionality

## Technical Implementation Details

### HTML Structure
- Modular HTML with sections split into separate files
- Semantic HTML elements for better accessibility
- BEM-like naming conventions for CSS classes

### CSS Implementation
- Responsive design with mobile-first approach
- CSS variables for consistent theming
- Flexbox and Grid layouts

### JavaScript Features
1. **Dynamic Content Loading**: `main.js` loads section content dynamically
2. **User Interaction Tracking**: `tracker.js` logs all user interactions to console
3. **Text Analysis Tool**: `text-analyzer.js` provides text processing functionality

## Assumptions

### General Assumptions
1. Internet connection is required for loading some external resources (e.g., icons)
2. JavaScript is enabled in the user's browser
3. The site is viewed on a device with minimum screen width of 320px

### User Interaction Tracking (Q2)
1. All user interactions are logged to the browser console
2. Events tracked include page views, section views, and clicks on all elements
3. The tracking is implemented without external libraries
4. Privacy notice is assumed to be handled separately
5. The tracking format follows: `Timestamp_of_click, type of event (click/view), event object (drop-down,image, text etc.)`
6. Console logs will persist only during the current browser session

### Text Analyzer Tool (Q3)
1. Text analysis works best with English language text
2. For optimal analysis, at least 10,000 words are recommended
3. The tool processes text client-side without sending data to any server
4. Word lists for pronouns, prepositions, and articles are predefined and limited to common English terms
5. Text tokenization uses simple space-based splitting with basic cleaning
6. The analyzer has been tested with the provided sample text
7. Special symbols include punctuation and non-alphanumeric characters
8. Newlines are counted regardless of operating system conventions (CR, LF, or CRLF)


## Project Structure
Fresh-butter.github.io/ ├── assets/ │ ├── images/ │ │ └── profile.jpg │ ├── docs/ │ │ └── cv.pdf │ └── text/ │ └── sample.txt ├── css/ │ └── style.css ├── js/ │ ├── main.js │ ├── tracker.js │ └── text-analyzer.js ├── sections/ │ ├── about.html │ ├── birthplace.html │ ├── education.html │ ├── skills.html │ ├── cv.html │ └── text-analyzer.html ├── index.html └── README.md

## Using the Text Analyzer
1. Navigate to the Text Analyzer section by clicking its tab in the navigation menu
2. Enter or paste text in the provided textarea (sample text available in `assets/text/sample.txt`)
3. Click the "Analyze Text" button to process the input
4. View the analysis results in four categories:
   - Basic Text Statistics: letters, words, spaces, newlines and special symbols
   - Pronouns Analysis: count of pronouns grouped by type
   - Prepositions Analysis: count of prepositions grouped by type
   - Indefinite Articles Analysis: count of articles grouped by type
5. Click "Clear" to reset the text input and results




